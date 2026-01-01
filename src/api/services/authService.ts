import axiosInstance, { handleApiResponse } from '../axios.config';
import { ApiResponse, LoginRequest, LoginResponse, User } from '@/types';

const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );
    return handleApiResponse(response);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return handleApiResponse(response);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse<User>>('/auth/profile', data);
    return handleApiResponse(response);
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await axiosInstance.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },

  /**
   * Store auth token and user data
   */
  storeAuthData: (token: string, user: User): void => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Get stored auth token
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  /**
   * Get stored user data
   */
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },
};

export default authService;