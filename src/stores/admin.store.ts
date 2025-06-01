import { create } from 'zustand';
import { adminService } from '../services/admin.service';
import type { IUser } from '../types';

interface AdminState {
    users: IUser[];
    currentUser: IUser | null;
    loading: boolean;
    error: string | null;
    getUsers: () => Promise<void>;
    getUserById: (id: string) => Promise<void>;
    createAdminUser: (userData: Partial<IUser>) => Promise<void>;
    updateUser: (id: string, userData: Partial<IUser>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,

    getUsers: async () => {
        set({ loading: true, error: null });
        try {
            const users = await adminService.getUsers();
            set({ users, loading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch users', loading: false });
        }
    },

    getUserById: async (id) => {
        set({ loading: true, error: null });
        try {
            const currentUser = await adminService.getUserById(id);
            set({ currentUser, loading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch user', loading: false });
        }
    },

    createAdminUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            await adminService.createAdminUser(userData);
            set({ loading: false });
            // Refresh users list
            useAdminStore.getState().getUsers();
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to create admin', loading: false });
        }
    },

    updateUser: async (id, userData) => {
        set({ loading: true, error: null });
        try {
            await adminService.updateUser(id, userData);
            set({ loading: false });
            // Refresh data
            useAdminStore.getState().getUsers();
        if (useAdminStore.getState().currentUser?.id === id) {
            useAdminStore.getState().getUserById(id);
        }
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to update user', loading: false });
        }
    },

    deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
            await adminService.deleteUser(id);
            set({ loading: false });
            // Refresh users list
            useAdminStore.getState().getUsers();
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to delete user', loading: false });
        }
    }
}));