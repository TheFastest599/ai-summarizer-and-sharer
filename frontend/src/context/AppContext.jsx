import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import { readTextFile, validateFile } from '../utils/fileUtils';
import {
  validateTranscript,
  validateEmailList,
  validateSummary,
} from '../utils/validation';
import { handleApiError } from '../utils/errorUtils';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // Transcript state
  const [transcript, setTranscript] = useState('');

  // Summary state
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  // Email state
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('Meeting Summary');
  const [isSending, setIsSending] = useState(false);

  // Transcript actions
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

  // Summary actions
  const generateSummary = async (transcriptText, prompt) => {
    try {
      validateTranscript(transcriptText || transcript);
      setIsGenerating(true);

      const data = await apiService.summarizeTranscript(
        transcriptText || transcript,
        prompt || customPrompt
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

  // Function to clean text by removing think tags
  const cleanThinkTags = text => {
    return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  };

  // Function to convert markdown to HTML for email
  const renderMarkdownForEmail = text => {
    if (!text) return '';

    const cleanedText = cleanThinkTags(text);

    return (
      cleanedText
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Bullet points
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        // Headers
        .replace(
          /^#{1}\s+(.*$)/gm,
          '<h1 style="font-size: 1.5rem; font-weight: bold; margin: 1rem 0;">$1</h1>'
        )
        .replace(
          /^#{2}\s+(.*$)/gm,
          '<h2 style="font-size: 1.25rem; font-weight: bold; margin: 0.875rem 0;">$1</h2>'
        )
        .replace(
          /^#{3}\s+(.*$)/gm,
          '<h3 style="font-size: 1.125rem; font-weight: bold; margin: 0.75rem 0;">$1</h3>'
        )
        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" style="color: #3b82f6; text-decoration: underline;" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        // Line breaks
        .replace(/\n/g, '<br/>')
        // Wrap consecutive list items in ul with styling
        .replace(/(<li>.*?<\/li>)(?:\s*<br\/>\s*<li>.*?<\/li>)*/gs, match => {
          return `<ul style="margin: 0.5rem 0; padding-left: 1.5rem; list-style-type: disc;">${match.replace(
            /<br\/>/g,
            ''
          )}</ul>`;
        })
    );
  };

  // Email actions
  const sendEmail = async summaryText => {
    try {
      // Clean and convert the summary text to HTML
      const cleanSummary = cleanThinkTags(summaryText || summary);
      const htmlContent = renderMarkdownForEmail(summaryText || summary);

      validateSummary(cleanSummary);
      validateEmailList(recipients);

      setIsSending(true);

      const data = await apiService.sendEmail(htmlContent, recipients, subject);
      toast.success(`Email sent successfully to ${data.sent} recipient(s)!`);

      // Clear recipients after successful send
      setRecipients('');

      return data;
    } catch (error) {
      console.error('Email sending error:', error);
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  const resetEmailForm = () => {
    setRecipients('');
    setSubject('Meeting Summary');
  };

  // Reset all state
  const resetAll = () => {
    clearTranscript();
    clearSummary();
    resetEmailForm();
    setCustomPrompt('');
  };

  const value = {
    // State
    transcript,
    summary,
    customPrompt,
    recipients,
    subject,
    isGenerating,
    isSending,

    // Setters
    setTranscript,
    setSummary,
    setCustomPrompt,
    setRecipients,
    setSubject,

    // Actions
    handleFileUpload,
    generateSummary,
    sendEmail,
    clearTranscript,
    clearSummary,
    resetEmailForm,
    resetAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
