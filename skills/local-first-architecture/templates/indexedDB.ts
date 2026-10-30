export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('InternshipTrackerDB', 1);
    
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('resumes')) {
        db.createObjectStore('resumes');
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveResume = async (companyId: string, file: File): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('resumes', 'readwrite');
    const store = transaction.objectStore('resumes');
    const request = store.put(file, companyId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getResume = async (companyId: string): Promise<File | undefined> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('resumes', 'readonly');
    const store = transaction.objectStore('resumes');
    const request = store.get(companyId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteResume = async (companyId: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('resumes', 'readwrite');
    const store = transaction.objectStore('resumes');
    const request = store.delete(companyId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
