---
name: local-first-architecture
description: >-
  Use this skill when the user asks to implement a local-first, serverless application architecture using LocalStorage for JSON data and IndexedDB for binary files (like PDFs or Images), including backup (import/export) features.
---

# Local-First Architecture

This skill provides the standard pattern for building React/TypeScript applications that persist all data locally on the user's device, completely eliminating the need for a backend database.

## Architecture Guidelines

1. **Text & JSON Data:** Must be stored in \localStorage\. Use a custom hook like \useLocalStorage\ to sync React state with \localStorage\.
2. **Binary Data (Files/PDFs/Images):** Must be stored in \IndexedDB\ to bypass the 5MB \localStorage\ limit. Do NOT store Base64 strings in \localStorage\.
3. **Data Loss Mitigation:** Since data is local to the domain and browser, you MUST implement a Backup (Export/Import) feature that bundles all \localStorage\ data and \IndexedDB\ files into a single \.json\ file.

## Templates

*   [IndexedDB Wrapper](./templates/indexedDB.ts) - Utility for storing and retrieving \File\ objects.
*   [Backup Utility](./templates/backup.ts) - Logic for exporting/importing the full state as a \.json\ file (converting binaries to Base64 in transit).

When applying this pattern, copy these templates into the user's project (usually in \src/utils/\) and adjust the database names and object store names.
