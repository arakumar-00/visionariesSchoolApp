import * as SecureStore from 'expo-secure-store';

// Secure storage utilities for sensitive data
export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Failed to save ${key} to secure storage:`, error);
      throw error;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Failed to retrieve ${key} from secure storage:`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Failed to remove ${key} from secure storage:`, error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      // Clear all auth-related keys
      const keysToRemove = [
        'auth-storage',
        'access_token',
        'refresh_token',
        'user_data',
      ];
      
      await Promise.all(
        keysToRemove.map(key => SecureStore.deleteItemAsync(key).catch(() => {}))
      );
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
    }
  },
};

// Token storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
} as const;