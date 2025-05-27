import { FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { LuBell } from "react-icons/lu";
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';


interface NavbarProps {
    sidebarExpanded: boolean;
    onToggleSidebar: () => void;
}

const Navbar = ({ sidebarExpanded, onToggleSidebar }: NavbarProps) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const username = "John";
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const isAuthenticated = false;

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

    // Close menus when resizing to desktop
    useEffect(() => {
        if (!isMobile) {
            setSearchExpanded(false);
            setProfileMenuOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            <header className={`fixed top-0 z-50 w-full py-3 bg-white shadow-sm border-b border-gray-100`}>
                <div className="flex items-center justify-between h-full px-4 md:px-6 mx-auto max-w-7xl">
                    {/* Left side - Hamburger and Welcome */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger menu button - only on mobile */}
                        {isMobile && (
                            <button 
                                className="p-2 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                                onClick={onToggleSidebar}
                                aria-label="Toggle sidebar"
                            >
                                {sidebarExpanded ? (
                                    <FiX className="w-5 h-5" />
                                ) : (
                                    <FiMenu className="w-5 h-5" />
                                )}
                            </button>
                        )}

                        {/* Welcome message - hidden on mobile when search is expanded */}
                        <div className={`text-lg font-medium text-gray-800 transition-all duration-200 
                            
                            ${ sidebarExpanded && ! isMobile ? 'ml-52' : ''}
                            ${!sidebarExpanded && !isMobile ? 'ml-9':''} 
                            ${ isMobile && searchExpanded ? 'opacity-0 w-0' : 'opacity-100'}
                        `}
                        >
                            Hello, {username}!
                        </div>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Search bar - desktop */}
                        <div className="hidden md:block relative w-64 lg:w-80">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search for stocks..." 
                                className="w-full h-9 pl-10 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Search button - mobile */}
                        <button 
                            className={`md:hidden p-2 text-gray-600 rounded-full hover:bg-gray-100 transition-colors ${
                                searchExpanded ? 'text-blue-500 bg-blue-50' : ''
                            }`}
                            onClick={() => setSearchExpanded(!searchExpanded)}
                            aria-label="Search"
                        >
                            <FiSearch className="w-5 h-5" />
                        </button>

                        {/* Notification button */}
                        <button 
                            className="p-2 text-gray-600 rounded-full hover:bg-gray-100 relative transition-colors"
                            aria-label="Notifications"
                        >
                            <LuBell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        
                        {/* Profile dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                className="flex items-center gap-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                aria-label="Profile menu"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                                    {isAuthenticated ? (<CgProfile className="w-4 h-4" />) : (username.charAt(0))}
                                </div>
                                {!isMobile && (
                                    <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                                        profileMenuOpen ? 'rotate-180' : ''
                                    }`} />
                                )}
                            </button>
                            
                            {/* Profile dropdown menu */}
                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-800">{username}</p>
                                        <p className="text-xs text-gray-500 truncate">john@example.com</p>
                                    </div>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Your Profile
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100">
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Expanded search on mobile */}
                {searchExpanded && (
                    <div 
                        ref={searchRef}
                        className="absolute top-full left-0 right-0 px-4 py-2 md:hidden bg-white shadow-md border-t border-gray-100"
                    >
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search for stocks..." 
                                className="w-full h-10 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                autoFocus
                            />
                        </div>
                    </div>
                )}
            </header>
        </>
        
    );
};

export default Navbar;