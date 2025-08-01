// Navigation mapping based on user roles
import { UserRole } from '@/src/types';

export const roleNavigationMap: Record<UserRole, string> = {
  student: '/(tabs)/student',
  teacher: '/(tabs)/teacher', 
  parent: '/(tabs)/parent',
  staff: '/(tabs)/staff',
  driver: '/(tabs)/driver',
  admin: '/(tabs)/admin',
};

export const getNavigationRouteForRole = (role: UserRole): string => {
  return roleNavigationMap[role] || '/(tabs)/student';
};

// Screen accessibility by role
export const rolePermissions: Record<UserRole, string[]> = {
  student: ['dashboard', 'assignments', 'grades', 'schedule', 'profile'],
  teacher: ['dashboard', 'classes', 'students', 'grades', 'schedule', 'profile'],
  parent: ['dashboard', 'children', 'payments', 'communications', 'profile'],
  staff: ['dashboard', 'users', 'reports', 'settings', 'profile'],
  driver: ['dashboard', 'routes', 'students', 'schedule', 'profile'],
  admin: ['dashboard', 'users', 'analytics', 'settings', 'reports', 'profile'],
};

export const hasPermission = (userRole: UserRole, screen: string): boolean => {
  return rolePermissions[userRole]?.includes(screen) || false;
};