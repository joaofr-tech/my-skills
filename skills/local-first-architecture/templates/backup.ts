import { initDB } from './indexedDB';

// Convert File/Blob to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Convert Base64 to File
const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const exportData = async (): Promise<void> => {
  try {
    // 1. Get LocalStorage data
    const companies = localStorage.getItem('internship-tracker-companies');
    const baseline = localStorage.getItem('internship-tracker-baseline');
    const stories = localStorage.getItem('internship-tracker-stories');

    // 2. Get IndexedDB data (Resumes)
    const db = await initDB();
    const resumesData = await new Promise<Record<string, string>>((resolve, reject) => {
      const transaction = db.transaction('resumes', 'readonly');
      const store = transaction.objectStore('resumes');
      const request = store.openCursor();
      const result: Record<string, string> = {};
      
      request.onsuccess = async (e) => {
        const cursor = (e.target as IDBRequest).result;
        if (cursor) {
          const file = cursor.value as File;
          result[cursor.key as string] = await fileToBase64(file);
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      request.onerror = () => reject(request.error);
    });

    // 3. Construct backup object
    const backupData = {
      version: 1,
      timestamp: new Date().toISOString(),
      companies: companies ? JSON.parse(companies) : [],
      baseline: baseline ? JSON.parse(baseline) : [],
      stories: stories ? JSON.parse(stories) : [],
      resumes: resumesData,
    };

    // 4. Download JSON file
    const blob = new Blob([JSON.stringify(backupData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `internship_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export failed", error);
    alert("Failed to export data.");
  }
};

export const importData = async (file: File): Promise<void> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data.version || !data.companies) {
      throw new Error("Invalid backup file");
    }

    // 1. Restore LocalStorage
    localStorage.setItem('internship-tracker-companies', JSON.stringify(data.companies));
    if (data.baseline) localStorage.setItem('internship-tracker-baseline', JSON.stringify(data.baseline));
    if (data.stories) localStorage.setItem('internship-tracker-stories', JSON.stringify(data.stories));

    // 2. Restore IndexedDB
    if (data.resumes && Object.keys(data.resumes).length > 0) {
      const db = await initDB();
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('resumes', 'readwrite');
        const store = transaction.objectStore('resumes');
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
        
        for (const [id, base64] of Object.entries(data.resumes)) {
          const pdfFile = base64ToFile(base64 as string, 'resume.pdf');
          store.put(pdfFile, id);
        }
      });
    }

    alert("Backup restored successfully! The page will reload.");
    window.location.reload();
  } catch (error) {
    console.error("Import failed", error);
    alert("Failed to import data. Ensure the file is a valid backup.");
  }
};
