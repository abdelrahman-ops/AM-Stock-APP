import { FiStar, FiPlus, FiArrowUpRight, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useWatchlist } from '../context/WatchlistContext';
import { LoadingSpinner } from '../ui/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDemoMode } from '../context/DemoModeContext';

export const Watchlist = () => {
  const { state } = useWatchlist();
  const { isDemoMode } = useDemoMode();

  const renderStockCard = (item) => {
    const isPositive = item.stockData?.change >= 0;
    
    return (
      <motion.div 
        key={item.symbol}
        whileHover={{ 
          y: -4, 
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          borderColor: isPositive ? "#e5f7ee" : "#fee5e5"
        }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent flex flex-col h-full transition-all duration-200"
      >
        {/* Compact Header Row */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isPositive ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <span className={`text-lg font-bold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.symbol.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate">
                {item.stockData?.name || item.symbol}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {item.symbol.replace('.CA', '')}
              </p>
            </div>
          </div>
          
          {isDemoMode && (
            <span className="text-[10px] font-medium bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
              DEMO
            </span>
          )}
        </div>

        {/* Price & Performance */}
        {item.stockData ? (
          <>
            <div className="px-4 py-3 flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {item.stockData.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 ml-1">EGP</span>
              </div>
              <div className={`flex items-center gap-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <FiTrendingUp className="text-green-500" />
                ) : (
                  <FiTrendingDown className="text-red-500" />
                )}
                <span className="text-sm font-semibold">
                  {isPositive ? '+' : ''}{item.stockData.change.toFixed(2)} ({item.stockData.percentChange.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Visual Range Indicator */}
            <div className="px-4 pb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Daily Range</span>
                <span>{item.stockData.low.toFixed(2)} - {item.stockData.high.toFixed(2)}</span>
              </div>
              <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`absolute h-full ${
                    isPositive ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${((item.stockData.price - item.stockData.low) / 
                             (item.stockData.high - item.stockData.low)) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Volume & Trade Button */}
            <div className="mt-auto px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span className="font-medium">Vol:</span> {(item.stockData.volume / 1000).toFixed(0)}K
              </div>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-white ${
                  isPositive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                } transition-colors shadow-sm`}
              >
                <FiArrowUpRight size={14} />
                <span>Trade</span>
              </motion.button>
            </div>
          </>
        ) : (
          <div className="p-4 text-center">
            <div className="bg-gray-100 rounded-lg p-4">
              <FiStar className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-500">
                Data not available for {item.symbol}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Added {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with action button */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Watchlist</h2>
          <p className="text-sm text-gray-500 mt-1">
            {state.watchlist.length} {state.watchlist.length === 1 ? 'stock' : 'stocks'} tracked
          </p>
        </div>
        <Link 
          to="/explore" 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={16} />
          Add Stocks
        </Link>
      </div>
      
      {/* Content area */}
      <div className="p-6">
        {state.watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {state.watchlist.map(renderStockCard)}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
              <FiStar className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Add stocks to your watchlist to track their performance and get updates
            </p>
            <Link 
              to="/explore" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <FiPlus size={16} />
              Browse Stocks
            </Link>
          </div>
        )}
      </div>

      {/* Footer stats */}
      {state.watchlist.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      )}
    </div>
  );
};