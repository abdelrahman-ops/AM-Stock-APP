import React, { useEffect, useState } from 'react';
import { useStocksStore } from '../stores/stock.store';
import { useThemeStore } from '../stores/ThemeContext';
import type { IStock } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/stocks/SearchBar';
import ViewToggle from '../components/stocks/ViewToggle';
import StockCard from '../components/stocks/StockCard';
import StockTable from '../components/stocks/StockTable';

const ExploreStocks: React.FC = () => {
    const { stocks, loading, error, getStocks } = useStocksStore();
    const { theme } = useThemeStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [filters, setFilters] = useState({
        sector: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'default',
        onlyGainers: false,
        onlyLosers: false,
    });
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Get initial search term from URL params
    const initialSearchTerm = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        getStocks();
    }, [getStocks]);

    // Update URL when search term changes
    useEffect(() => {
        if (searchTerm) {
            searchParams.set('q', searchTerm);
            setSearchParams(searchParams, { replace: true });
        } else {
            searchParams.delete('q');
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchTerm, searchParams, setSearchParams]);

    const toggleFavorite = (symbol: string) => {
        setFavorites(prev => 
            prev.includes(symbol) 
                ? prev.filter(s => s !== symbol) 
                : [...prev, symbol]
        );
    };

    const filteredStocks = stocks.filter(stock => {
        // Search filter
        const matchesSearch = 
            !searchTerm || 
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
            stock.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Sector filter
        const matchesSector = 
            !filters.sector || stock.sector === filters.sector;
        
        // Price filters
        const matchesMinPrice = 
            !filters.minPrice || (stock.price && stock.price >= Number(filters.minPrice));
        
        const matchesMaxPrice = 
            !filters.maxPrice || (stock.price && stock.price <= Number(filters.maxPrice));
        
        // Gainers/Losers filters
        const matchesGainers = 
            !filters.onlyGainers || (stock.change && stock.change > 0);
        
        const matchesLosers = 
            !filters.onlyLosers || (stock.change && stock.change < 0);
        
        return (
            matchesSearch && 
            matchesSector && 
            matchesMinPrice && 
            matchesMaxPrice && 
            matchesGainers && 
            matchesLosers
        );
    });

    const sortedStocks = [...filteredStocks].sort((a, b) => {
        switch (filters.sortBy) {
            case 'price-high':
                return (b.price || 0) - (a.price || 0);
            case 'price-low':
                return (a.price || 0) - (b.price || 0);
            case 'change-high':
                return (b.change || 0) - (a.change || 0);
            case 'change-low':
                return (a.change || 0) - (b.change || 0);
            case 'volume-high':
                return (b.volume || 0) - (a.volume || 0);
            case 'volume-low':
                return (a.volume || 0) - (b.volume || 0);
            case 'favorites':
                return favorites.includes(b.symbol) ? 1 : favorites.includes(a.symbol) ? -1 : 0;
            default:
                return 0;
        }
    });

    const sectors = [...new Set(stocks.map(stock => stock.sector).filter(Boolean))];
    const refreshData = () => {
        getStocks();
    };

    const resetFilters = () => {
        setFilters({
            sector: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'default',
            onlyGainers: false,
            onlyLosers: false,
        });
        setSearchTerm('');
    };

    return (
        <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                
                    {/* Header and view mode */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {searchTerm ? `Search: "${searchTerm}"` : 'Explore Stocks'}
                            </h1>
                            <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {searchTerm ? 'Search results' : 'Discover and analyze market opportunities'}
                            </p>
                        </div>
                        
                        <ViewToggle 
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            theme={theme}
                            loading={loading}
                            refreshData={getStocks}
                        />
                    </div>

                    {/* Search and filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <SearchBar 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            theme={theme}
                        />
                        
                        {/* Filter button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} transition-colors`}
                        >
                            <FiFilter />
                            <span>Filters</span>
                            {showFilters && (
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">
                                    {Object.values(filters).filter(Boolean).length}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Filters panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} overflow-hidden`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Sector
                                        </label>
                                        <select
                                        value={filters.sector}
                                        onChange={(e) => setFilters({...filters, sector: e.target.value})}
                                        className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                        >
                                        <option value="">All Sectors</option>
                                        {sectors.map(sector => (
                                            <option key={sector} value={sector}>{sector}</option>
                                        ))}
                                        </select>
                                    </div>
                                
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Min Price
                                        </label>
                                        <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiDollarSign className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                                            className={`w-full pl-8 pr-4 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                        />
                                        </div>
                                    </div>
                                
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Max Price
                                        </label>
                                        <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiDollarSign className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                                            className={`w-full pl-8 pr-4 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                        />
                                        </div>
                                    </div>
                                
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Sort By
                                        </label>
                                        <select
                                        value={filters.sortBy}
                                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                                        className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                        >
                                        <option value="default">Default</option>
                                        <option value="price-high">Price (High to Low)</option>
                                        <option value="price-low">Price (Low to High)</option>
                                        <option value="change-high">Change % (High to Low)</option>
                                        <option value="change-low">Change % (Low to High)</option>
                                        <option value="volume-high">Volume (High to Low)</option>
                                        <option value="volume-low">Volume (Low to High)</option>
                                        <option value="favorites">Favorites First</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <label className={`flex items-center gap-2 cursor-pointer ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <input
                                        type="checkbox"
                                        checked={filters.onlyGainers}
                                        onChange={(e) => setFilters({...filters, onlyGainers: e.target.checked, onlyLosers: e.target.checked ? false : filters.onlyLosers})}
                                        className="rounded"
                                        />
                                        <span className="flex items-center gap-1">
                                        <FiTrendingUp className="text-green-500" />
                                        Only Gainers
                                        </span>
                                    </label>
                                
                                    <label className={`flex items-center gap-2 cursor-pointer ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <input
                                        type="checkbox"
                                        checked={filters.onlyLosers}
                                        onChange={(e) => setFilters({...filters, onlyLosers: e.target.checked, onlyGainers: e.target.checked ? false : filters.onlyGainers})}
                                        className="rounded"
                                        />
                                        <span className="flex items-center gap-1">
                                        <FiTrendingDown className="text-red-500" />
                                        Only Losers
                                        </span>
                                    </label>
                                </div>
                                
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={resetFilters}
                                        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Loading state */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-12"
                    >
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {searchTerm ? 'Searching stocks...' : 'Loading market data...'}
                        </p>
                    </motion.div>
                )}

                {/* Error state */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 border-red-700' : 'bg-red-100 border-red-300'} border mb-6`}
                    >
                        <div className="flex items-center gap-2 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Error:</span>
                            <span>{error}</span>
                        </div>
                        <button
                            onClick={refreshData}
                            className="mt-2 text-sm text-blue-500 hover:underline"
                        >
                            Try again
                        </button>
                    </motion.div>
                )}

                {/* Content */}
                {!loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {searchTerm 
                                    ? `Found ${filteredStocks.length} matching stocks`
                                    : `Showing ${filteredStocks.length} of ${stocks.length} stocks`}
                            </p>
                            
                            {filteredStocks.length === 0 && (
                                <button
                                    onClick={resetFilters}
                                    className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>

                        {/* Empty state */}
                        {filteredStocks.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-lg font-medium mb-1">No stocks found</h3>
                                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {searchTerm
                                        ? 'No stocks match your search criteria'
                                        : 'Try adjusting your filters'}
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
                                >
                                    Reset Filters
                                </button>
                            </motion.div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <AnimatePresence>
                                    {sortedStocks.map((stock: IStock) => (
                                        <StockCard 
                                            key={stock.id} 
                                            stock={stock} 
                                            theme={theme} 
                                            isFavorite={favorites.includes(stock.symbol)}
                                            onToggleFavorite={toggleFavorite}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <StockTable 
                                stocks={sortedStocks} 
                                theme={theme}
                                favorites={favorites}
                                toggleFavorite={toggleFavorite}
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ExploreStocks;