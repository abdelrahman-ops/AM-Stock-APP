/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiSearch, FiMenu } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { LuBell } from "react-icons/lu";
import { useState } from 'react';

interface NavbarProps {
  sidebarExpanded: boolean;
  onToggleSidebar: () => void;
}

const Navbar = ({ sidebarExpanded, onToggleSidebar }: NavbarProps) => {
  const username = "John"; // Replace with actual user data
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`fixed top-0 z-40 py-4 bg-white shadow-sm transition-all duration-300 ${
      sidebarExpanded ? 'left-64 right-0' : 'left-20 right-0'
    }`}>
      <div className="flex items-center justify-between h-full px-4 md:px-6 mx-auto">
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-600 rounded-full hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Welcome message */}
        <div className="hidden md:block text-lg font-semibold text-gray-800">
          Hello, {username}!
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search bar - desktop */}
          <div className="hidden md:block relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for stocks and more" 
              className="w-64 lg:w-96 h-10 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb]"
            />
          </div>

          {/* Search button - mobile */}
          <button 
            className="md:hidden p-2 text-gray-600 rounded-full hover:bg-gray-100"
            onClick={() => setSearchExpanded(!searchExpanded)}
          >
            <FiSearch className="w-6 h-6" />
          </button>

          {/* Expanded search on mobile */}
          {searchExpanded && (
            <div className="absolute top-16 left-0 right-0 px-4 md:hidden">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for stocks..." 
                  className="w-full h-10 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb]"
                  autoFocus
                />
              </div>
            </div>
          )}

          <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100 relative">
            <LuBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
            <CgProfile className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <div className="px-3 py-2 text-sm font-medium text-gray-900">Hello, {username}!</div>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              <LuBell className="w-5 h-5 mr-3" />
              Notifications
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              <CgProfile className="w-5 h-5 mr-3" />
              Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;