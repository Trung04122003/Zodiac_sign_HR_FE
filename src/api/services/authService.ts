import axiosInstance, { handleApiResponse } from '../axios.config';
import { ApiResponse, LoginRequest, LoginResponse, User } from '@/types';

const authService = {
  /**
   * Login user
   * POST /api/auth/login
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );
    const data = handleApiResponse<LoginResponse>(response);
    return data;
  },

  /**
   * Logout user (optional - backend might not have this endpoint)
   */
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Ignore error if endpoint doesn't exist
      console.log('Logout endpoint not available, clearing local data only');
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return handleApiResponse<User>(response);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse<User>>('/auth/profile', data);
    return handleApiResponse<User>(response);
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