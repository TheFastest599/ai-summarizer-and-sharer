import { useState } from 'react';
import toast from 'react-hot-toast';
import { readTextFile, validateFile } from '../utils/fileUtils';

/**
 * Custom hook for handling file upload and transcript management
 */
export const useTranscript = () => {
  const [transcript, setTranscript] = useState('');

  const handleFileUpload = async file => {
    try {
      validateFile(file);
      const content = await readTextFile(file);
      setTranscript(content);
      toast.success('File uploaded successfully!');
      return content;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const clearTranscript = () => setTranscript('');

  return {
    transcript,
    setTranscript,
    handleFileUpload,
    clearTranscript,
  };
};
