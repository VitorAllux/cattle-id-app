import axios from 'axios';
import { ENV } from '../../environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

(async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
})();
