import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
    TbUserSquareRounded, TbLayoutDashboardFilled, TbLogout, TbChevronRight, TbX,
    TbSettings2
} from "react-icons/tb";
import { BiHomeSmile, BiWallet } from "react-icons/bi";
import { TiHeartOutline } from "react-icons/ti";
import { useWatchlistStore } from '../stores/watchlistStore';
import { useMediaQuery } from 'react-responsive';
import { RiAdminLine, RiStockLine } from "react-icons/ri";

interface SidebarProps {
    expanded: boolean;
    onToggle: () => void;
    onClose?: () => void;
}

const Sidebar = ({ expanded, onToggle, onClose }: SidebarProps) => {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const watchlistCount = useWatchlistStore(state => state.getWatchlistCount());
    const isMobile = useMediaQuery({ maxWidth: 768 });

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
            const sidebar = document.querySelector('.sidebar-container');
            if (sidebar && !sidebar.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, expanded, onClose]);

    const toggleSubmenu = (menu: string) => {
        setActiveSubmenu(activeSubmenu === menu ? null : menu);
    };

    const sidebarClasses = `
        sidebar-container fixed top-0 left-0 z-50 h-full bg-white transition-all duration-300 ease-in-out
        ${isMobile ? 'w-64 shadow-xl' : 'w-20'}
        ${expanded ? (isMobile ? 'translate-x-0' : 'w-64') : (isMobile ? '-translate-x-full' : 'w-20')}
    `;

    return (
        <div className={sidebarClasses}>
            <div className="flex flex-col h-full p-4">
                {/* Logo and Toggle */}
                <div className="flex items-center justify-between mb-8 px-2">
                    {expanded ? (
                        <Link to="/" className="flex items-center" onClick={isMobile ? onClose : undefined}>
                            <span className='text-2xl font-bold text-blue-800'>A</span>
                            <span className='text-2xl font-bold text-red-800'>M</span>
                            <span className="text-2xl font-bold text-gray-800">Stock</span>
                        </Link>
                    ) : (
                        <Link to="/" className="flex items-center justify-center w-full" onClick={isMobile ? onClose : undefined}>
                            <span className='text-2xl font-bold text-blue-800'>A</span>
                            <span className='text-2xl font-bold text-red-800'>M</span>
                        </Link>
                    )}
                    
                    <div className="flex items-center gap-2">
                        {isMobile && expanded && (
                            <button 
                                onClick={onClose}
                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                            >
                                <TbX className="w-5 h-5" />
                            </button>
                        )}
                        
                        {!isMobile && (
                            <button 
                                onClick={onToggle}
                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                            >
                                <TbChevronRight className={`w-5 h-5 transition-transform ${!expanded && 'rotate-180'}`} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                        <li>
                            <NavLink 
                                to="/"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                                end
                                onClick={isMobile ? onClose : undefined}
                            >
                                <BiHomeSmile className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Home</span>}
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink 
                                to="/dashboard"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                                end
                                onClick={isMobile ? onClose : undefined}
                            >
                                <TbLayoutDashboardFilled className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Dashboard</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/wallet"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                                end
                            >
                                <BiWallet className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Wallet</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/explore"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                            >
                                <RiStockLine className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Explore Stocks</span>}
                            </NavLink>
                        </li>

                        {/* Watchlist with count */}
                        <li>
                            <NavLink 
                                to="/watchlist"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                                onClick={isMobile ? onClose : undefined}
                            >
                                <div className="relative">
                                    <TiHeartOutline className='w-5 h-5 flex-shrink-0' />
                                    {!expanded && watchlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 px-1 text-[10px] font-medium bg-blue-500 text-white rounded-full">
                                            {watchlistCount}
                                        </span>
                                    )}
                                </div>
                                {expanded && <span className="ml-3">Watchlist</span>}
                                {expanded && watchlistCount > 0 && (
                                    <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
                                        {watchlistCount}
                                    </span>
                                )}
                            </NavLink>
                        </li>

                        {/* Portfolio with submenu */}
                        <li>
                            <button
                                onClick={() => toggleSubmenu('portfolio')}
                                className={`w-full flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                activeSubmenu === 'portfolio'
                                ? "bg-blue-500/10 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`}
                            >
                                <TbUserSquareRounded className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Portfolio</span>}
                                {expanded && (
                                <TbChevronRight className={`ml-auto w-4 h-4 transition-transform ${
                                    activeSubmenu === 'portfolio' && 'rotate-90'
                                }`} />
                                )}
                            </button>
                            {expanded && activeSubmenu === 'portfolio' && (
                                <div className="ml-8 mt-1 space-y-1">
                                <NavLink
                                    to="/portfolio/stocks"
                                    className={({ isActive }) => 
                                    `block px-3 py-2 text-xs rounded-lg transition-colors ${
                                        isActive 
                                        ? "bg-blue-500/10 text-blue-600" 
                                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                    }`
                                    }
                                    onClick={isMobile ? onClose : undefined}
                                >
                                    My Stocks
                                </NavLink>
                                <NavLink
                                    to="/portfolio/transactions"
                                    className={({ isActive }) => 
                                    `block px-3 py-2 text-xs rounded-lg transition-colors ${
                                        isActive 
                                        ? "bg-blue-500/10 text-blue-600" 
                                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                    }`
                                    }
                                    onClick={isMobile ? onClose : undefined}
                                >
                                    Transactions
                                </NavLink>
                            </div>
                        )}
                        </li>

                        <li>
                            <NavLink 
                                to="/settings"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                            >
                                <TbSettings2 className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Settings</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/admin/login"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                            >
                                <RiAdminLine className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Admin Panel</span>}
                            </NavLink>
                        </li>
                    </ul>
                </nav>


                {/* User Profile */}
                <div className={`mt-auto flex items-center border-t-2 border-indigo-400 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${
                    !expanded ? 'justify-center' : ''
                    }`}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        JD
                    </div>
                    {expanded && (
                        <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                        <p className="text-xs text-gray-500 truncate">john@example.com</p>
                        </div>
                    )}
                    {expanded && (
                        <button className="ml-auto p-1 text-gray-500 rounded-full hover:bg-gray-200">
                        <TbLogout className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;