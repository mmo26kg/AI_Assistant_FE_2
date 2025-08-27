import { useState } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

const API_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    if (!API_BASE) {
      setAuthState(prev => ({ ...prev, error: 'Thiếu NEXT_PUBLIC_STRAPI_URL' }));
      return false;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        cache: 'no-store'
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = data?.error || `Đăng nhập thất bại (${response.status})`;
        throw new Error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      }

      // Store user data
      try {
        sessionStorage.setItem('user', JSON.stringify(data.user));
      } catch {
        console.warn('Failed to store user data in sessionStorage');
      }

      setAuthState({
        user: data.user,
        loading: false,
        error: null,
      });

      return true;
    } catch (error: any) {
      const errorMessage = error instanceof TypeError
        ? 'Không kết nối được máy chủ. Kiểm tra API_BASE & server.'
        : error.message || 'Có lỗi xảy ra';

      setAuthState({
        user: null,
        loading: false,
        error: errorMessage,
      });

      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    if (!API_BASE) {
      setAuthState(prev => ({ ...prev, error: 'Thiếu NEXT_PUBLIC_STRAPI_URL' }));
      return false;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`${API_BASE}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        cache: 'no-store',
        mode: 'cors'
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.message || `Đăng ký thất bại (${response.status})`;
        throw new Error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      }

      // Store auth token
      try {
        localStorage.setItem('authToken', data.jwt);
      } catch {
        console.warn('Failed to store auth token in localStorage');
      }

      setAuthState({
        user: null, // User needs to login after registration
        loading: false,
        error: null,
      });

      return true;
    } catch (error: any) {
      const errorMessage = error instanceof TypeError
        ? 'Không kết nối được máy chủ. Kiểm tra API_BASE & server.'
        : error.message || 'Có lỗi xảy ra';

      setAuthState({
        user: null,
        loading: false,
        error: errorMessage,
      });

      return false;
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    login,
    register,
    clearError,
  };
};
