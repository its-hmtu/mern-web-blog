import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReq = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
        });
        setIsLoading(false);
        return response.data;
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'An error occurred.');
        throw err;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { isLoading, sendReq, error, clearError };
};
