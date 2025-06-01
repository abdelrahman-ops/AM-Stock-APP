import {api} from './api';
import type { IUser } from '../types';

export const usersService = {
    // User Authentication
    registerUser: async (userData: Partial<IUser>) => {
        const response = await api.post("/users/register", userData);
        return response.data;
    },

    loginUser: async (credentials: { email: string; password: string }) => {
        const response = await api.post("/users/login", credentials);
        console.log('login user service response: ', response.data);
        return {
            token: response.data.token,
            user: response.data.data,
        };
    },

    getUserProfile: async () => {
        const response = await api.get("/users/profile");
        return response.data;
    },

    updateUserProfile: async (profileData: Partial<IUser>) => {
        const response = await api.put("/users/profile", profileData);
        return response.data;
    }
};