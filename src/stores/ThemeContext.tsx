// src/stores/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme when store rehydrates
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
        }
      },
    }
  )
);

// Initialize based on system preference if no stored preference
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('theme-storage');
  if (!storedTheme) {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    useThemeStore.setState({ theme: systemDark ? 'dark' : 'light' });
  }
}