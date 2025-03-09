import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResource } from '../resources/AuthResource';

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const loadUser = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        const userData = await AuthResource.getUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};
