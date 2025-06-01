import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StockCard from '../StockCard';
import Button from '../common/Button';
import { useStockStore } from '../../stores/stockStore';

const REFRESH_INTERVAL = 60_000; // 60 seconds

const MyStocks = () => {
  const navigate = useNavigate();
  const { 
    stocks, 
    fetchStocks, 
    isLoading, 
    error,
    startRealTimeUpdates,
    stopRealTimeUpdates
  } = useStockStore();

  // Display first 5 stocks with fallback handling
  const displayedStocks = useMemo(() => 
    stocks
      .slice(0)
      .filter((stock) => {
        // const excludedIds = [1254875, 1254876, 1254575];
        const excludedIds = [52, 53, 54];
        return !excludedIds.includes(stock.id);
      })
      .map((stock, index) => ({
        ...stock,
        id: typeof stock.id === 'number' ? stock.id : index,
        name: stock.name || 'Unknown Company',
        price: stock.price || 0,
        change: stock.change || 0
      })), 
    [stocks]
);

  console.log('displayedStocks: ',displayedStocks);
  

  useEffect(() => {
    fetchStocks();
    startRealTimeUpdates(REFRESH_INTERVAL);
    
    return () => {
      stopRealTimeUpdates();
    };
  }, [fetchStocks, startRealTimeUpdates, stopRealTimeUpdates]);

  return (
    <div className="w-full rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 font-mono">My Stocks</h1>
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#6425FE] hover:bg-[#6425FE]/10 rounded-lg transition-colors"
          aria-label="View all stocks"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {isLoading && !stocks.length && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div key={`skeleton-${index}`} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {error && !stocks.length && (
        <div className="p-4 text-center text-red-500 bg-red-50 rounded-xl">
          {error}
          <button 
            onClick={fetchStocks}
            className="block mx-auto mt-2 text-sm text-[#6425FE] hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {displayedStocks.map((stock, index) => {
          const isLast = index === displayedStocks.length - 1;

          return (
            <div key={stock.id} className="relative h-full">
              {isLast && (
                <>
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-white rounded-xl" />
                  <Button
                    arrowDirection="right"
                    className="absolute z-20 flex items-center gap-2 font-medium transition-all transform -translate-x-1/2 -translate-y-1/2 rounded-lg ml-13 top-1/2 left-3/4 hover:scale-105 whitespace-nowrap"
                    iconClassName="w-4 h-4"
                    navigateTo="/portfolio"
                    aria-label="View more stocks"
                  />
                </>
              )}
              <StockCard {...stock} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyStocks;