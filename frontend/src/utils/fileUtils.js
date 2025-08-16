/**
 * File handling utilities
 */

export const readTextFile = file => {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'text/plain') {
      reject(new Error('Please upload a .txt file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const validateFile = file => {
  if (!file) {
    throw new Error('No file selected');
  }

  if (file.type !== 'text/plain') {
    throw new Error('Please upload a .txt file');
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File size should be less than 10MB');
  }

  return true;
};
