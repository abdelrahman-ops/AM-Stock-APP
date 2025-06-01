import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usersService } from '../services/users.service';
import type { IUser } from '../types';

interface AuthState {
    user: IUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    register: (userData: Partial<IUser>) => Promise<void>;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    getProfile: () => Promise<void>;
    updateProfile: (profileData: Partial<IUser>) => Promise<void>;
    isAuthenticated: () => boolean;
    isDemo: () => boolean;
    isAdmin: () => boolean;
    isSuperAdmin: () => boolean;
    hasRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
        user: null,
        token: null,
        loading: false,
        error: null,

        register: async (userData) => {
            set({ loading: true, error: null });
            const { user, token } = await usersService.registerUser(userData);
            set({ user, token, loading: false });
        },

        login: async (credentials) => {
            set({ loading: true, error: null });
            const { user, token } = await usersService.loginUser(credentials);
            set({ user, token, loading: false });
        },

        logout: () => {
            set({ user: null, token: null });
            localStorage.removeItem('token');
        },

        getProfile: async () => {
            set({ loading: true, error: null });
            try {
            const user = await usersService.getUserProfile();
            set({ user, loading: false });
            } catch {
            set({ user: null, token: null, loading: false, error: 'Session expired' });
            }
        },

        updateProfile: async (profileData) => {
            set({ loading: true, error: null });
            const user = await usersService.updateUserProfile(profileData);
            set({ user, loading: false });
        },

        isAuthenticated: () => !!get().user && !!get().token,
        isDemo: () => !!get().user?.isDemo,
        isAdmin: () => get().user?.role === 'admin',
        isSuperAdmin: () => get().user?.role === 'superadmin',
        hasRole: (roles) => roles.includes(get().user?.role || ''),
        }),
        {
        name: 'auth-store', // Key in localStorage
        partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);
