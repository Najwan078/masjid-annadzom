import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi, setToken, removeToken, getToken, LoginResponse } from '../services/api';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

interface User {
  name: string;
  role: 'admin' | 'pengurus' | 'jamaah';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// ─────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUserFromStorage = (): User | null => {
  const stored = localStorage.getItem('masjid_user');
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

// ─────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromStorage);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await authApi.login(username, password);

      // Simpan JWT token
      setToken(response.access_token);

      // Simpan info user
      const userInfo: User = {
        name: response.user_name,
        role: response.user_role as User['role'],
      };
      setUser(userInfo);
      localStorage.setItem('masjid_user', JSON.stringify(userInfo));

      return { success: true };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan saat login';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('masjid_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !!getToken(),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
