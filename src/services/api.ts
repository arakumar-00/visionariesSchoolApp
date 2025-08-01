import { 
  LoginRequest, 
  LoginResponse, 
  SignupRequest, 
  DashboardData, 
  UserDirectoryEntry, 
  Notification, 
  User,
  ApiResponse,
  PaginatedResponse 
} from '@/src/types';

// Configuration for API toggle
const API_CONFIG = {
  USE_MOCK_DATA: true, // Toggle this to switch between mock and real API
  BASE_URL: 'https://api.visionariesschool.edu', // Real API base URL
  MOCK_DELAY: 800, // Simulate network delay for mocks
};

// Mock data imports
import dashboardMock from '@/src/mocks/dashboard.json';
import userDirectoryMock from '@/src/mocks/userDirectory.json';
import notificationsMock from '@/src/mocks/notifications.json';
import authMock from '@/src/mocks/auth.json';

// Utility function to simulate network delay
const simulateDelay = (ms: number = API_CONFIG.MOCK_DELAY): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      // Simulate login validation
      if (credentials.email && credentials.password) {
        return authMock.loginResponse as ApiResponse<LoginResponse>;
      }
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }
    
    // Real API call would go here
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async signup(userData: SignupRequest): Promise<ApiResponse<any>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return authMock.signupResponse as ApiResponse<any>;
    }
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async getProfile(): Promise<ApiResponse<User>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return authMock.profileResponse as ApiResponse<User>;
    }
    
    // Real API would include Authorization header with token
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/profile`);
    return response.json();
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<LoginResponse>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return authMock.loginResponse as ApiResponse<LoginResponse>;
    }
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  },
};

// Dashboard API
export const dashboardApi = {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return {
        success: true,
        data: dashboardMock as DashboardData
      };
    }
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/dashboard`);
    return response.json();
  },
};

// User Directory API
export const userApi = {
  async getUserDirectory(
    page: number = 1, 
    limit: number = 50,
    role?: string
  ): Promise<ApiResponse<PaginatedResponse<UserDirectoryEntry>>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      let filteredData = userDirectoryMock.data;
      
      if (role) {
        filteredData = userDirectoryMock.data.filter(user => user.role === role);
      }
      
      return {
        success: true,
        data: {
          ...userDirectoryMock,
          data: filteredData
        } as PaginatedResponse<UserDirectoryEntry>
      };
    }
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(role && { role })
    });
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/users?${params}`);
    return response.json();
  },
};

// Notifications API
export const notificationsApi = {
  async getNotifications(
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return {
        success: true,
        data: notificationsMock as PaginatedResponse<Notification>
      };
    }
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/notifications?${params}`);
    return response.json();
  },

  async markAsRead(notificationId: string): Promise<ApiResponse<any>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return { success: true, message: 'Notification marked as read' };
    }
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
    return response.json();
  },
};

// Export API configuration for external access
export { API_CONFIG };