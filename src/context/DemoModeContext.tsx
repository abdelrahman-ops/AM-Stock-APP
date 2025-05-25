/* eslint-disable react-refresh/only-export-components */
// src/context/DemoModeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Theme = 'light' | 'dark' | 'demo-light' | 'demo-dark';

interface DemoModeContextType {
    isDemoMode: boolean;
    theme: Theme;
    toggleDemoMode: () => void;
    toggleTheme: () => void;
}

const DemoModeContext = createContext<DemoModeContextType>({
    isDemoMode: false,
    theme: 'light',
    toggleDemoMode: () => {},
    toggleTheme: () => {},
});

export const DemoModeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');
    const navigate = useNavigate();

    // Initialize from localStorage
    useEffect(() => {
        const savedDemoMode = localStorage.getItem('isDemoMode') === 'true';
        const savedTheme = localStorage.getItem('theme') as Theme || 'light';
        setIsDemoMode(savedDemoMode);
        setTheme(savedTheme);
    }, []);

    // Apply theme class to body
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleDemoMode = () => {
        const newMode = !isDemoMode;
        setIsDemoMode(newMode);
        localStorage.setItem('isDemoMode', String(newMode));
        
        if (newMode) {
        navigate('/demo-welcome');
        setTheme('demo-light');
        } else {
        navigate('/');
        setTheme('light');
        }
    };

    const toggleTheme = () => {
        setTheme(prev => {
        if (prev === 'light') return 'dark';
        if (prev === 'dark') return isDemoMode ? 'demo-light' : 'light';
        if (prev === 'demo-light') return 'demo-dark';
        return 'demo-light';
        });
    };

    return (
        <DemoModeContext.Provider value={{ isDemoMode, theme, toggleDemoMode, toggleTheme }}>
        {children}
        </DemoModeContext.Provider>
    );
};

export const useDemoMode = () => useContext(DemoModeContext);