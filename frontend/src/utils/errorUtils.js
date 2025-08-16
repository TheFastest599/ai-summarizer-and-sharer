/**
 * Error handling utilities for API responses
 */

export const handleApiError = error => {
  console.error('API Error:', error);

  // Axios error structure
  if (error.response) {
    // Server responded with error status (4xx, 5xx)
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data.error || 'Invalid request. Please check your input.';
      case 401:
        return 'Unauthorized. Please check your API keys.';
      case 403:
        return 'Forbidden. You do not have permission to perform this action.';
      case 404:
        return 'Service not found. Please check if the backend is running.';
      case 429:
        return 'Rate limit exceeded. Please try again later.';
      case 500:
        return data.error || 'Internal server error. Please try again.';
      default:
        return data.error || data.message || `Server error (${status})`;
    }
  } else if (error.request) {
    // Network error (no response received)
    return 'Network error. Please check your connection and ensure the backend is running.';
  } else if (error.code === 'ECONNABORTED') {
    // Request timeout
    return 'Request timeout. The server is taking too long to respond.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export const isNetworkError = error => {
  return error.request && !error.response;
};

export const isTimeoutError = error => {
  return error.code === 'ECONNABORTED';
};

export const getErrorStatus = error => {
  return error.response?.status || null;
};
