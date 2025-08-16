import axios from 'axios';

/**
 * API service for handling backend communication using Axios
 */

const API_BASE_URL = '/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  config => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Response error:', error);

    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }

    if (error.response) {
      // Server responded with error status
      const errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        'Server error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check if the backend is running.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

class ApiService {
  async summarizeTranscript(transcript, customPrompt) {
    try {
      const response = await apiClient.post('/summarize', {
        transcript,
        customPrompt: customPrompt?.trim() || undefined,
      });

      return response.data;
    } catch (error) {
      console.error('Summarization error:', error);
      throw error;
    }
  }

  async sendEmail(summary, recipients, subject) {
    try {
      const emailList = recipients
        .split(',')
        .map(email => email.trim())
        .filter(Boolean);

      const response = await apiClient.post('/send-email', {
        summary,
        recipients: emailList,
        subject: subject.trim() || 'Meeting Summary',
      });

      return response.data;
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}

export default new ApiService();
