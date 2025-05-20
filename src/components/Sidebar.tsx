import { NavLink, Link } from 'react-router-dom';
import { 
    TbUserSquareRounded, TbSearch, TbLayoutDashboardFilled, 
    TbSettings2, TbLogout, TbChevronRight 
} from "react-icons/tb";
import { RiStockLine, RiAdminLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { useState } from 'react';

interface SidebarProps {
    expanded: boolean;
    onToggle: () => void;
}

const Sidebar = ({ expanded, onToggle }: SidebarProps) => {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (menu: string) => {
        setActiveSubmenu(activeSubmenu === menu ? null : menu);
    };

    return (
        <div className={`fixed top-0 left-0 z-50 h-full bg-white transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-20'}`}>
            <div className="flex flex-col h-full p-4">
                {/* Logo and Toggle */}
                <div className="flex items-center justify-between mb-8 px-2">
                    {expanded ? (
                        <Link to="/" className="flex items-center">
                        <span className='text-2xl font-bold text-blue-800'>A</span>
                        <span className='text-2xl font-bold text-red-800'>M</span>
                        <span className="text-2xl font-bold text-gray-800">Stock</span>
                        </Link>
                    ) : (
                        <Link to="/" className="flex items-center justify-center w-full">
                        <span className='text-2xl font-bold text-blue-800'>A</span>
                        <span className='text-2xl font-bold text-red-800'>M</span>
                        </Link>
                    )}
                    <button 
                        onClick={onToggle}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                    >
                        <TbChevronRight className={`w-5 h-5 transition-transform ${!expanded && 'rotate-180'}`} />
                    </button>
                </div>

                {/* Search (only visible when expanded) */}
                {expanded && (
                    <div className="relative mb-6 mx-2">
                        <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        />
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1">
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
                            >
                                <TbLayoutDashboardFilled className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Dashboard</span>}
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

                        <li>
                            <NavLink 
                                to="/wishlist"
                                className={({ isActive }) => 
                                `flex items-center rounded-lg p-3 text-sm font-medium transition-colors ${
                                    isActive 
                                    ? "bg-blue-500/10 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                                }
                            >
                                <GrFavorite className='w-5 h-5 flex-shrink-0' />
                                {expanded && <span className="ml-3">Wishlist</span>}
                                {expanded && (
                                <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
                                    3
                                </span>
                                )}
                            </NavLink>
                        </li>

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
                <div className={`mt-auto flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${
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