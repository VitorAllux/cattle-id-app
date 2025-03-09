import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export const AuthResource = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data && response.data.access_token) {
        await AsyncStorage.setItem('token', response.data.access_token);

        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;

        return response.data;
      }

      throw new Error('Token não encontrado na resposta');
    } catch (error) {
      console.error('Erro no login:', error);

      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  },

  getUser: async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },
};
