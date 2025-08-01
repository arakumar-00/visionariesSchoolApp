import { useEffect } from 'react';
import { useAuthStore, tokenUtils } from '@/src/store/authStore';
import { authApi } from '@/src/services/api';

export const useAuth = () => {
  const { 
    user, 
    tokens, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    setLoading,
    setTokens 
  } = useAuthStore();

  // Auto-refresh token logic
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!tokens || !isAuthenticated) return;

      if (tokenUtils.isTokenExpired(tokens.expiresAt)) {
        // Token is expired, logout user
        logout();
        return;
      }

      if (tokenUtils.shouldRefreshToken(tokens.expiresAt)) {
        try {
          const response = await authApi.refreshToken(tokens.refreshToken);
          if (response.success && response.data) {
            setTokens(response.data.tokens);
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
      }
    };

    // Check token status every minute
    const interval = setInterval(checkAndRefreshToken, 60000);
    
    // Check immediately on mount
    checkAndRefreshToken();

    return () => clearInterval(interval);
  }, [tokens, isAuthenticated, logout, setTokens]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      if (response.success && response.data) {
        login(response.data.user, response.data.tokens);
        return { success: true };
      }
      return { success: false, error: response.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  };
};