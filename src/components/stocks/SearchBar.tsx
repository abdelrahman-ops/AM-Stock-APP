import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, theme }) => {
    return (
        <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
            </div>
            <input
                type="text"
                placeholder="Search stocks by symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                    theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-400'
                } focus:outline-none focus:ring-1 ${
                    theme === 'dark' ? 'focus:ring-blue-600' : 'focus:ring-blue-300'
                } transition-colors`}
            />
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Clear search"
                >
                    <FiX className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;