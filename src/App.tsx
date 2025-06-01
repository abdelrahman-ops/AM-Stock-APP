import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import AppRoutes from './routes/routes';
import { useThemeStore } from './stores/ThemeContext';

function App() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);
    const { theme } = useThemeStore();

    // Auto-close sidebar on mobile route changes
    const location = useLocation();
    useEffect(() => {
        if (isMobile) {
        setSidebarExpanded(false);
        }
    }, [location.pathname, isMobile]);

    // Auto-toggle sidebar based on screen size
    useEffect(() => {
        setSidebarExpanded(!isMobile);
    }, [isMobile]);

    // Apply dark mode class to root element
    useEffect(() => {
        if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className={`flex flex-col h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar 
                    sidebarExpanded={sidebarExpanded}
                    onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} 
                />
                <div className="flex flex-1 overflow-hidden pt-16">
                    <Sidebar 
                        expanded={sidebarExpanded} 
                        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
                        onClose={() => setSidebarExpanded(false)}
                    />
                    <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
                        !isMobile && (sidebarExpanded ? 'ml-64 pl-6' : 'ml-20')
                        }`}
                    >
                        <div className="min-h-full bg-white dark:bg-gray-800">
                            <div className="mx-auto max-w-7xl">
                                <AppRoutes />
                            </div>
                        </div>
                    </main>
                </div>
                <Toaster 
                    position="top-right" 
                    toastOptions={{
                    className: 'bg-white dark:bg-gray-700 dark:text-white',
                    success: {
                        className: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200',
                        iconTheme: {
                        primary: 'green',
                        secondary: 'white',
                        },
                    },
                    error: {
                        className: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
                    },
                    }}
                />
            </div>
        </div>
    );
}

export default App;