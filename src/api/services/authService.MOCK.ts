import { LoginRequest, LoginResponse, User } from '@/types';

// MOCK USER DATA - Sagittarius VP ♐
const MOCK_USER: User = {
  id: 1,
  username: 'admin',
  fullName: 'Vice President - Membership & Training',
  email: 'vp.membership@jcidanang.com',
  phone: '+84 123 456 789',
  dateOfBirth: '2003-12-04',
  zodiacSign: 'Sagittarius',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sagittarius',
  organization: 'JCI Danang Junior Club',
  position: 'Vice President - Membership & Training',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
};

// MOCK CREDENTIALS
const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

const mockAuthService = {
  /**
   * Mock Login - No API call
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (
      credentials.username === MOCK_CREDENTIALS.username &&
      credentials.password === MOCK_CREDENTIALS.password
    ) {
      // Generate mock token
      const mockToken = `mock_token_${Date.now()}`;

      return {
        token: mockToken,
        user: MOCK_USER,
      };
    } else {
      throw new Error('Invalid username or password');
    }
  },

  /**
   * Mock Logout
   */
  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user (from localStorage)
   */
  getCurrentUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }
    return JSON.parse(userStr);
  },

  /**
   * Store auth data
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

export default mockAuthService;