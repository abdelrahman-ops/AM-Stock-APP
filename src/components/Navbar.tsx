import { FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { LuBell } from "react-icons/lu";
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThemeStore } from '../stores/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TbLogin, TbLogout, TbMoon, TbSettings2, TbSun } from 'react-icons/tb';
import { useAuthStore } from '../stores/auth.store';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    sidebarExpanded: boolean;
    onToggleSidebar: () => void;
}

const Navbar = ({ sidebarExpanded, onToggleSidebar }: NavbarProps) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const { user, isAuthenticated } = useAuthStore();
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, toggleTheme } = useThemeStore();
    const navigate = useNavigate();

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchExpanded && searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchExpanded(false);
            }
            if (profileMenuOpen && profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchExpanded, profileMenuOpen]);

    // Focus input when search expands
    useEffect(() => {
        if (searchExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchExpanded]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/stocks?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setSearchExpanded(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        } else if (e.key === 'Escape') {
            setSearchExpanded(false);
        }
    };

    const username = isAuthenticated() ? `${user?.firstname}` : "Guest";

    // Theme classes
    const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
    const activeBg = theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-500/10';
    const activeText = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

    return (
        <header className={`fixed top-0 z-50 w-full py-3 transition-colors duration-300 ${bgColor} ${borderColor} border-b shadow-sm`}>
            <div className="flex items-center justify-between h-full px-4 md:px-6 mx-auto max-w-7xl">
                {/* Left side - Hamburger and Welcome */}
                <div className="flex items-center gap-4">
                    {/* Hamburger menu button - only on mobile */}
                    {isMobile && (
                        <motion.button 
                            className={`p-2 rounded-full transition-colors ${hoverBg}`}
                            onClick={onToggleSidebar}
                            aria-label="Toggle sidebar"
                            whileTap={{ scale: 0.9 }}
                        >
                            {sidebarExpanded ? (
                                <FiX className="w-5 h-5" />
                            ) : (
                                <FiMenu className="w-5 h-5" />
                            )}
                        </motion.button>
                    )}

                    {/* Welcome message - hidden when search is expanded on mobile */}
                    <AnimatePresence>
                        {(!isMobile || !searchExpanded) && (
                            <motion.div 
                                className={`text-lg font-medium transition-all duration-200 ${textColor} 
                                ${ sidebarExpanded && !isMobile ? 'ml-62' : !sidebarExpanded && !isMobile ? 'ml-9' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Hello, <span className="font-semibold">{username}</span>!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Search bar - desktop */}
                    <div className="hidden md:block relative w-64 lg:w-80">
                        <div className="relative">
                            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input 
                                ref={inputRef}
                                type="text" 
                                placeholder="Search stocks, companies..." 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                className={`w-full h-10 pl-10 pr-4 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30 text-white' 
                                        : 'border border-gray-200 focus:border-blue-500 focus:ring-blue-500/50'
                                }`}
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <FiX className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Search button - mobile */}
                    <motion.button 
                        className={`md:hidden p-2 rounded-full transition-colors ${
                            searchExpanded 
                                ? `${activeBg} ${activeText}`
                                : `${hoverBg} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                        }`}
                        onClick={() => {
                            setSearchExpanded(!searchExpanded);
                            if (searchExpanded && searchQuery.trim()) {
                                handleSearchSubmit();
                            }
                        }}
                        aria-label={searchExpanded ? "Search and go" : "Search"}
                        whileTap={{ scale: 0.9 }}
                    >
                        {searchExpanded ? (
                            <span className="text-sm font-medium">Go</span>
                        ) : (
                            <FiSearch className="w-5 h-5" />
                        )}
                    </motion.button>

                    {/* Notification button - hidden when search is expanded on mobile */}
                    {(!isMobile || !searchExpanded) && (
                        <motion.button 
                            className={`p-2 rounded-full relative transition-colors ${hoverBg} ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}
                            aria-label="Notifications"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <LuBell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </motion.button>
                    )}

                    {/* Theme toggle - hidden when search is expanded on mobile */}
                    {(!isMobile || !searchExpanded) && (
                        <motion.button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${hoverBg}`}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <TbSun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <TbMoon className="w-5 h-5 text-gray-600" />
                            )}
                        </motion.button>
                    )}
                    
                    {/* Profile dropdown - hidden when search is expanded on mobile */}
                    {(!isMobile || !searchExpanded) && (
                        <div className="relative" ref={profileRef}>
                            <motion.button 
                                className={`flex items-center gap-1 p-1 rounded-full transition-colors ${
                                    profileMenuOpen ? `${activeBg} ${activeText}` : hoverBg
                                }`}
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                aria-label="Profile menu"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                                    theme === 'dark' 
                                        ? 'bg-gradient-to-br from-purple-600 to-blue-500' 
                                        : 'bg-gradient-to-br from-blue-500 to-purple-500'
                                }`}>
                                    {isAuthenticated() ? (
                                        `${user?.firstname?.charAt(0)}${user?.lastname?.charAt(0)}`
                                    ) : (
                                        <CgProfile className="w-4 h-4" />
                                    )}
                                </div>
                                {!isMobile && (
                                    <FiChevronDown className={`w-4 h-4 transition-transform ${
                                        profileMenuOpen ? 'rotate-180' : ''
                                    } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                )}
                            </motion.button>
                            
                            {/* Profile dropdown menu */}
                            <AnimatePresence>
                                {profileMenuOpen && (
                                    <motion.div 
                                        className={`absolute right-0 mt-2 rounded-lg shadow-lg py-1 z-50 w-56 ${
                                            theme === 'dark' 
                                                ? 'bg-gray-800 border-gray-700' 
                                                : 'bg-white border-gray-100'
                                        } border`}
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                    >
                                        {isAuthenticated() ? (
                                            <>
                                                <div className={`px-4 py-3 ${
                                                    theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                                                } border-b`}>
                                                    <p className={`text-sm font-medium ${textColor}`}>{username}</p>
                                                    <p className={`text-xs ${
                                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                    } truncate`}>{user?.email}</p>
                                                </div>
                                                <div className="py-1">
                                                    <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                                        theme === 'dark' 
                                                            ? 'text-gray-300 hover:bg-gray-700' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}>
                                                        <CgProfile className="w-4 h-4" />
                                                        Your Profile
                                                    </button>
                                                    <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                                        theme === 'dark' 
                                                            ? 'text-gray-300 hover:bg-gray-700' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}>
                                                        <TbSettings2 className="w-4 h-4" />
                                                        Settings
                                                    </button>
                                                    <button 
                                                        onClick={toggleTheme}
                                                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                                            theme === 'dark' 
                                                                ? 'text-gray-300 hover:bg-gray-700' 
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {theme === 'dark' ? (
                                                            <>
                                                                <TbSun className="w-4 h-4" />
                                                                Light Mode
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TbMoon className="w-4 h-4" />
                                                                Dark Mode
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                <div className={`py-1 border-t ${
                                                    theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                                                }`}>
                                                    <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                                        theme === 'dark' 
                                                            ? 'text-red-400 hover:bg-gray-700' 
                                                            : 'text-red-600 hover:bg-gray-100'
                                                    }`}>
                                                        <TbLogout className="w-4 h-4" />
                                                        Sign out
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-1">
                                                <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                                    theme === 'dark' 
                                                        ? 'text-gray-300 hover:bg-gray-700' 
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}>
                                                    <TbLogin className="w-4 h-4" />
                                                    Sign In
                                                </button>
                                                <button 
                                                    onClick={toggleTheme}
                                                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                                        theme === 'dark' 
                                                            ? 'text-gray-300 hover:bg-gray-700' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {theme === 'dark' ? (
                                                        <>
                                                            <TbSun className="w-4 h-4" />
                                                            Light Mode
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TbMoon className="w-4 h-4" />
                                                            Dark Mode
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Expanded search on mobile */}
            <AnimatePresence>
                {searchExpanded && (
                    <motion.div 
                        ref={searchRef}
                        className={`absolute top-full left-0 right-0 px-4 py-3 md:hidden shadow-md ${bgColor} border-t ${borderColor}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="relative flex items-center gap-2">
                            <div className="relative flex-1">
                                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    placeholder="Search stocks, companies..." 
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    className={`w-full h-10 pl-10 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        theme === 'dark' 
                                            ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30 text-white' 
                                            : 'border border-gray-200 focus:border-blue-500 focus:ring-blue-500/50'
                                    }`}
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <FiX className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </button>
                                )}
                            </div>
                            <motion.button
                                onClick={handleSearchSubmit}
                                disabled={!searchQuery.trim()}
                                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                    searchQuery.trim() 
                                        ? theme === 'dark' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-500 text-white'
                                        : theme === 'dark' 
                                            ? 'bg-gray-700 text-gray-400' 
                                            : 'bg-gray-200 text-gray-500'
                                }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                Go
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;