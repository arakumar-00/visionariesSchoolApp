// Core type definitions for the VisionariesSchoolApp

export type UserRole = 'student' | 'teacher' | 'parent' | 'staff' | 'driver' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  phone?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

export interface DashboardMetrics {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
  upcomingEvents: number;
}

export interface WalletSnapshot {
  balance: number;
  lastTransaction?: {
    amount: number;
    description: string;
    date: string;
  };
  pendingPayments: number;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  type: 'academic' | 'sports' | 'cultural' | 'parent-meeting' | 'other';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface DashboardData {
  user: User;
  metrics: DashboardMetrics;
  wallet: WalletSnapshot;
  upcomingEvents: UpcomingEvent[];
  notifications: Notification[];
}

export interface UserDirectoryEntry {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  phone?: string;
  profileImage?: string;
  department?: string;
  subjects?: string[];
  grade?: string;
  parentOf?: string[]; // student IDs for parents
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}