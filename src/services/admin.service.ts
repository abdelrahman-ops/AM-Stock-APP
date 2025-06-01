import axios from 'axios';
import type { IUser } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const adminService = {
    createAdminUser: async (userData: Partial<IUser>) => {
        const response = await axios.post(`${API_URL}/admin/create-admin`, userData);
        return response.data;
    },

    getUsers: async () => {
        const response = await axios.get(`${API_URL}/admin`);
        return response.data;
    },

    getUserById: async (id: string) => {
        const response = await axios.get(`${API_URL}/admin/${id}`);
        return response.data;
    },

    updateUser: async (id: string, userData: Partial<IUser>) => {
        const response = await axios.put(`${API_URL}/admin/${id}`, userData);
        return response.data;
    },

    deleteUser: async (id: string) => {
        const response = await axios.delete(`${API_URL}/admin/${id}`);
        return response.data;
    }
};