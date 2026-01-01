import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add auth token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle responses & errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = error.response.data;

      switch (status) {
        case 400:
          toast.error(data?.message || 'Bad Request');
          break;
        case 401:
          toast.error('Unauthorized. Please login again.');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access Forbidden');
          break;
        case 404:
          toast.error(data?.message || 'Resource Not Found');
          break;
        case 500:
          toast.error('Internal Server Error. Please try again later.');
          break;
        default:
          toast.error(data?.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network Error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// Helper function to handle API responses
export const handleApiResponse = <T>(response: AxiosResponse): T => {
  return response.data.data;
};

// Helper function to handle API errors
export const handleApiError = (error: AxiosError): never => {
  throw error;
};