import { getAuthToken, setAuthToken } from './../storage';
import axios from 'axios';
import { ENV } from './../../environment';

const api = axios.create({
    baseURL: ENV.API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

(async () => {
    const token = await getAuthToken();
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
})();

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });

        await setAuthToken(response.data.access_token);

        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;

        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await removeAuthToken();
        delete api.defaults.headers.Authorization;
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
};

export default api;
