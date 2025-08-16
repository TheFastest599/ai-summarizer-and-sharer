import { useState } from 'react';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import { validateTranscript } from '../utils/validation';
import { handleApiError, isNetworkError } from '../utils/errorUtils';

/**
 * Custom hook for handling AI summarization
 */
export const useSummarizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');

  const generateSummary = async (transcript, customPrompt) => {
    try {
      validateTranscript(transcript);
      setIsGenerating(true);

      const data = await apiService.summarizeTranscript(
        transcript,
        customPrompt
      );
      setSummary(data.summary);
      toast.success('Summary generated successfully!');

      return data.summary;
    } catch (error) {
      console.error('Summarization error:', error);

      const errorMessage = handleApiError(error);
      toast.error(errorMessage);

      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearSummary = () => setSummary('');

  return {
    summary,
    setSummary,
    isGenerating,
    generateSummary,
    clearSummary,
  };
};
