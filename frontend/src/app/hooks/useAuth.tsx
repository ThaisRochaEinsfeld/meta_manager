import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('metamanager_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('metamanager_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const loggedUser = await api.login(username, password);
      const newUser: User = {
        id: String(loggedUser.id),
        username: loggedUser.email,
        email: loggedUser.email,
        name: loggedUser.name,
      };

      setUser(newUser);
      localStorage.setItem('metamanager_user', JSON.stringify(newUser));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('metamanager_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
