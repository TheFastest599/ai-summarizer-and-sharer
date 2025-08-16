/**
 * Validation utilities
 */

export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validateEmailList = emailString => {
  if (!emailString.trim()) {
    throw new Error('Please enter at least one recipient email');
  }

  const emails = emailString
    .split(',')
    .map(email => email.trim())
    .filter(Boolean);

  if (emails.length === 0) {
    throw new Error('Please enter valid email addresses');
  }

  const invalidEmails = emails.filter(email => !validateEmail(email));

  if (invalidEmails.length > 0) {
    throw new Error(`Invalid email format: ${invalidEmails.join(', ')}`);
  }

  return emails;
};

export const validateTranscript = transcript => {
  if (!transcript?.trim()) {
    throw new Error('Please provide a transcript first');
  }

  if (transcript.trim().length < 10) {
    throw new Error('Transcript is too short');
  }

  return true;
};

export const validateSummary = summary => {
  if (!summary?.trim()) {
    throw new Error('Please generate a summary first');
  }

  return true;
};
