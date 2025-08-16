import { useState } from 'react';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import { validateEmailList, validateSummary } from '../utils/validation';
import { handleApiError, isNetworkError } from '../utils/errorUtils';

/**
 * Custom hook for handling email functionality
 */
export const useEmailSender = () => {
  const [isSending, setIsSending] = useState(false);
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('Meeting Summary');

  const sendEmail = async summary => {
    try {
      validateSummary(summary);
      validateEmailList(recipients);

      setIsSending(true);

      const data = await apiService.sendEmail(summary, recipients, subject);
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

  return {
    recipients,
    setRecipients,
    subject,
    setSubject,
    isSending,
    sendEmail,
    resetEmailForm,
  };
};
