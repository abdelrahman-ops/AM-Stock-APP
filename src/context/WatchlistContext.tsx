import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { Stock } from '../types/stock'; // Assuming you have a Stock type

interface WatchlistItem {
  symbol: string;
  addedAt: Date;
  stockData?: Stock; // Optional full stock data
}

interface WatchlistState {
  watchlist: WatchlistItem[];
}

const initialWatchlistState: WatchlistState = {
  watchlist: []
};

const WatchlistContext = createContext<{
  state: WatchlistState;
  addToWatchlist: (symbol: string, stockData?: Stock) => Promise<void>;
  removeFromWatchlist: (symbol: string) => Promise<void>;
  isInWatchlist: (symbol: string) => boolean;
  getWatchlistStocks: () => WatchlistItem[];
  watchlistCount: number; // New property for watchlist count
}>({
  state: initialWatchlistState,
  addToWatchlist: async () => {},
  removeFromWatchlist: async () => {},
  isInWatchlist: () => false,
  getWatchlistStocks: () => [],
  watchlistCount: 0 // Initial count
});

export const WatchlistProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<WatchlistState>(() => {
    const saved = localStorage.getItem('demoWatchlist');
    return saved ? JSON.parse(saved) : initialWatchlistState;
  });

  useEffect(() => {
    localStorage.setItem('demoWatchlist', JSON.stringify(state));
  }, [state]);

  const isInWatchlist = useCallback((symbol: string) => {
    return state.watchlist.some(item => item.symbol === symbol);
  }, [state.watchlist]);

  const addToWatchlist = useCallback(async (symbol: string, stockData?: Stock) => {
    if (isInWatchlist(symbol)) {
      toast('Already in your watchlist', { icon: '⭐' });
      return;
    }
    
    const newItem = { symbol, addedAt: new Date(), stockData };
    setState(prev => ({
      ...prev,
      watchlist: [...prev.watchlist, newItem]
    }));
    toast.success(`Added ${symbol} to watchlist`);
  }, [isInWatchlist]);

  const removeFromWatchlist = useCallback(async (symbol: string) => {
    if (!isInWatchlist(symbol)) return;
    
    setState(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(item => item.symbol !== symbol)
    }));
    toast.success(`Removed ${symbol} from watchlist`);
  }, [isInWatchlist]);

  const getWatchlistStocks = useCallback(() => {
    return state.watchlist;
  }, [state.watchlist]);

  // Calculate watchlist count
  const watchlistCount = state.watchlist.length;

  return (
    <WatchlistContext.Provider value={{
      state,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      getWatchlistStocks,
      watchlistCount // Include count in the context value
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);