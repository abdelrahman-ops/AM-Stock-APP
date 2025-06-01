import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
    TbUserSquareRounded, TbLayoutDashboardFilled, TbLogout, TbChevronRight, TbX,
    TbSettings2, TbLogin
} from "react-icons/tb";
import { BiHomeSmile, BiWallet } from "react-icons/bi";
import { TiHeartOutline } from "react-icons/ti";
import { useWatchlistStore } from '../stores/watchlistStore';
import { useMediaQuery } from 'react-responsive';
import { RiAdminLine, RiStockLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../stores/ThemeContext';
import { useAuthStore } from '../stores/auth.store';

interface SidebarProps {
    expanded: boolean;
    onToggle: () => void;
    onClose?: () => void;
}

const Sidebar = ({ expanded, onToggle, onClose }: SidebarProps) => {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const watchlistCount = useWatchlistStore(state => state.getWatchlistCount());
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { theme } = useThemeStore();
    
    // Auth state
    const { 
        user, 
        isAuthenticated, 
        isAdmin, 
        isSuperAdmin, 
        isDemo,
        logout 
    } = useAuthStore();
    const isAdminUser = isAdmin() || isSuperAdmin();

    // Auto-close submenus when collapsing sidebar
    useEffect(() => {
        if (!expanded) {
            setActiveSubmenu(null);
        }
    }, [expanded]);

    // Close sidebar when clicking outside (mobile only)
    useEffect(() => {
        if (!isMobile || !expanded || !onClose) return;
        
        const handleClickOutside = (e: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, expanded, onClose]);

    const toggleSubmenu = (menu: string) => {
        setActiveSubmenu(activeSubmenu === menu ? null : menu);
    };

    // Theme classes
    const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-[#08203e]';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
    const activeBg = theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-500/10';
    const activeText = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
    const demoBadgeColor = theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-500';

    const sidebarClasses = `
        fixed top-0 left-0 z-50 h-full transition-all duration-300 ease-in-out
        ${isMobile ? 'w-72 shadow-2xl' : 'w-20'}
        ${expanded ? (isMobile ? 'translate-x-0' : 'w-72') : (isMobile ? '-translate-x-full' : 'w-20')}
        ${bgColor} ${textColor}
        overflow-visible
    `;

    const navItemClasses = (isActive: boolean) => `
        flex items-center rounded-xl p-3 text-sm font-medium transition-all duration-200
        ${isActive ? `${activeBg} ${activeText}` : `${textColor} ${hoverBg} hover:text-blue-500`}
        w-full
    `;

    const submenuItemClasses = (isActive: boolean) => `
        flex items-center px-3 py-2 text-xs rounded-lg transition-all duration-200
        ${isActive ? `${activeBg} ${activeText}` : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} ${hoverBg} hover:text-blue-500`}
        w-full
    `;

    // Navigation items data - reordered with Portfolio before Admin and Settings
    const navItems = [
        { path: "/", icon: <BiHomeSmile className='w-6 h-6' />, label: "Home" },
        { path: "/stocks", icon: <RiStockLine className='w-6 h-6' />, label: "Explore Stocks" },
        { 
            path: "/watchlist", 
            icon: (
                <div className="relative">
                    <TiHeartOutline className='w-6 h-6' />
                    {isAuthenticated() && watchlistCount > 0 && (
                        <span className={`absolute -top-1 -right-1 px-1 text-[10px] font-medium rounded-full ${
                            theme === 'dark' ? 'bg-purple-500' : 'bg-blue-500'
                        } text-white`}>
                            {watchlistCount}
                        </span>
                    )}
                </div>
            ), 
            label: "Watchlist",
            badge: isAuthenticated() && watchlistCount > 0 ? watchlistCount : null
        },
        { path: "/wallet", icon: <BiWallet className='w-6 h-6' />, label: "Wallet" }
    ];

    // Portfolio submenu items
    const portfolioItems = [
        { path: "/portfolio/dashboard", icon: <TbLayoutDashboardFilled className='w-4 h-4' />, label: "Dashboard" },
        { path: "/portfolio/stocks", icon: <RiStockLine className='w-4 h-4' />, label: "My Stocks" },
        { path: "/portfolio/transactions", icon: <BiWallet className='w-4 h-4' />, label: "Transactions" }
    ];

    // Admin and Settings items (separate for better organization)
    const adminAndSettingsItems = [
        { path: "/settings", icon: <TbSettings2 className='w-6 h-6' />, label: "Settings" },
        { 
            path: "/admin/dashboard", 
            icon: <RiAdminLine className='w-6 h-6' />, 
            label: "Admin Panel",
            adminOnly: true 
        }
    ];

    return (
        <div 
            className={sidebarClasses}
            ref={sidebarRef}
            style={{
                backdropFilter: isMobile ? 'blur(10px)' : 'none',
                backgroundColor: isMobile 
                    ? theme === 'dark' 
                        ? 'rgba(17, 24, 39, 0.95)' 
                        : 'rgba(255, 255, 255, 0.95)'
                    : undefined
            }}
        >
            {/* <div className="flex flex-col h-full p-4 overflow-y-auto"></div> */}
            <div className="flex flex-col h-full p-4 ">
                {/* Logo and Toggle */}
                <div className={`flex items-center justify-between mb-8 px-2 pb-4 border-b ${borderColor}`}>
                    {expanded ? (
                        <Link 
                            to="/" 
                            className="flex items-center group" 
                            onClick={isMobile ? onClose : undefined}
                        >
                            <motion.span 
                                className='text-3xl font-bold bg-gradient-to-r from-[#30c5d2] to-[#471069] bg-clip-text text-transparent'
                                whileHover={{ scale: 1.1 }}
                            >
                                AM
                            </motion.span>
                            <motion.span className={`text-3xl font-bold text-[#471069]`} whileHover={{ scale: 1.1 }}>
                                Stock
                            </motion.span>
                        </Link>
                    ) : (
                        <Link 
                            to="/" 
                            className="flex items-center justify-center w-full group"
                            onClick={isMobile ? onClose : undefined}
                        >
                            <motion.div className="flex" whileHover={{ scale: 1.1 }}>
                                <span className='text-3xl font-bold bg-gradient-to-r from-[#30c5d2] to-[#471069] bg-clip-text text-transparent'>AM</span>
                            </motion.div>
                        </Link>
                    )}
                    
                    <div className="flex items-center gap-2">
                        {isMobile && expanded && (
                            <motion.button 
                                onClick={onClose}
                                className={`p-2 rounded-full `}
                                whileTap={{ scale: 0.9 }}
                            >
                                <TbX className="w-5 h-5" />
                            </motion.button>
                        )}
                        
                        {!isMobile && (
                            <motion.button 
                                onClick={onToggle}
                                className={`p-2 rounded-full `}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <TbChevronRight className={`w-5 h-5 transition-transform ${!expanded && 'rotate-180'}`} />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {/* Regular navigation items */}
                        {navItems.map((item) => (
                            <motion.li
                                key={item.path}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <NavLink 
                                    to={item.path}
                                    className={({ isActive }) => navItemClasses(isActive)}
                                    end
                                    onClick={isMobile ? onClose : undefined}
                                    onMouseEnter={() => setHoveredItem(item.path)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="relative">
                                        {item.icon}
                                        <AnimatePresence>
                                            {!expanded && hoveredItem === item.path && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className={`absolute left-full ml-2 px-3 py-1 rounded-md text-sm whitespace-nowrap z-50 ${
                                                        theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-md'
                                                    } ${textColor}`}
                                                >
                                                    <div className="relative">
                                                        {item.label}
                                                        {item.badge && (
                                                            <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-500 text-white">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {expanded && (
                                        <>
                                            <span className="ml-3">{item.label}</span>
                                            {item.badge && (
                                                <span className={`ml-auto px-2 py-0.5 text-xs font-medium rounded-full ${
                                                    theme === 'dark' ? 'bg-purple-500' : 'bg-blue-500'
                                                } text-white`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </motion.li>
                        ))}

                        {/* Portfolio with submenu - now placed before Admin and Settings */}
                        <motion.li
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                onClick={() => toggleSubmenu('portfolio')}
                                className={`w-full flex items-center rounded-xl p-3 text-sm font-medium transition-all duration-200 ${
                                    activeSubmenu === 'portfolio'
                                    ? `${activeBg} ${activeText}`
                                    : `${textColor} ${hoverBg} hover:text-blue-500`
                                }`}
                                onMouseEnter={() => setHoveredItem('portfolio')}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="relative">
                                    <TbUserSquareRounded className='w-6 h-6' />
                                    <AnimatePresence>
                                        {!expanded && hoveredItem === 'portfolio' && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className={`absolute left-full ml-2 px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                                                    theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-md'
                                                } ${textColor}`}
                                            >
                                                <div className="relative">
                                                    Portfolio
                                                    {isDemo() && (
                                                        <span className={`ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full ${demoBadgeColor} text-white`}>
                                                            Demo
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {expanded && (
                                    <>
                                        <span className="ml-3">Portfolio</span>
                                        {isDemo() && (
                                            <span className={`ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full ${demoBadgeColor} text-white`}>
                                                Demo
                                            </span>
                                        )}
                                        <TbChevronRight className={`ml-auto w-4 h-4 transition-transform ${
                                            activeSubmenu === 'portfolio' && 'rotate-90'
                                        }`} />
                                    </>
                                )}
                            </button>
                            <AnimatePresence>
                                {expanded && activeSubmenu === 'portfolio' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-8 mt-1 space-y-1">
                                            {portfolioItems.map((item) => (
                                                <NavLink
                                                    key={item.path}
                                                    to={item.path}
                                                    className={({ isActive }) => submenuItemClasses(isActive)}
                                                    onClick={isMobile ? onClose : undefined}
                                                >
                                                    {item.icon}
                                                    <span className="ml-2">{item.label}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.li>

                        {/* Admin and Settings items */}
                        {adminAndSettingsItems.map((item) => {
                            if (item.adminOnly && !isAdminUser) return null;
                            
                            return (
                                <motion.li
                                    key={item.path}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <NavLink 
                                        to={item.path}
                                        className={({ isActive }) => navItemClasses(isActive)}
                                        end
                                        onClick={isMobile ? onClose : undefined}
                                        onMouseEnter={() => setHoveredItem(item.path)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <div className="relative">
                                            {item.icon}
                                            <AnimatePresence>
                                                {!expanded && hoveredItem === item.path && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className={`absolute left-full ml-2 px-3 py-1 rounded-md text-sm whitespace-nowrap z-50 ${
                                                            theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-md'
                                                        } ${textColor}`}
                                                    >
                                                        <div className="relative">
                                                            {item.label}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        {expanded && (
                                            <span className="ml-3">{item.label}</span>
                                        )}
                                    </NavLink>
                                </motion.li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom Section - User Profile or Login */}
                <div className="mt-auto pt-4">
                    {isAuthenticated() ? (
                        <motion.div 
                            className={`flex items-center p-3 rounded-xl transition-colors ${hoverBg} ${
                                !expanded ? 'justify-center' : ''
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                                theme === 'dark' ? 'bg-gradient-to-br from-purple-600 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                            }`}>
                                {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                            </div>
                            {expanded && (
                                <>
                                    <div className="ml-3 overflow-hidden">
                                        <p className={`text-sm font-medium truncate ${textColor}`}>
                                            {user?.firstname} {user?.lastname}
                                        </p>
                                        <p className={`text-xs truncate ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
                                            {user?.email}
                                            {isDemo() && (
                                                <span className={`ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full ${demoBadgeColor} text-white`}>
                                                    Demo
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <button 
                                        className={`ml-auto p-1 rounded-full ${hoverBg}`}
                                        onClick={logout}
                                        aria-label="Logout"
                                    >
                                        <TbLogout className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className={`flex items-center p-3 rounded-xl transition-colors ${hoverBg}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <NavLink 
                                to="/login" 
                                className="flex items-center w-full"
                                onClick={isMobile ? onClose : undefined}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                }`}>
                                    <TbLogin className="w-6 h-6" />
                                </div>
                                {expanded && (
                                    <span className="ml-3 text-sm font-medium">Sign In</span>
                                )}
                            </NavLink>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;