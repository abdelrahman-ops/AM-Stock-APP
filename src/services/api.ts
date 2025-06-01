import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);