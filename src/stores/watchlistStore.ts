import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import type { Stock } from '../types/stock';
import type { WatchlistItem } from '../types/watchlist';

interface WatchlistState {
  watchlist: WatchlistItem[];
  hydrated: boolean;
  addToWatchlist: (symbol: string, stockData?: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
  getWatchlistCount: () => number;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      hydrated: false,

      addToWatchlist: (symbol, stockData) => {
        if (get().isInWatchlist(symbol)) {
          toast('Already in your watchlist', { icon: '⭐' });
          return;
        }

        const newItem: WatchlistItem = {
          symbol,
          addedAt: new Date(),
          stockData
        };

        set(state => ({
          watchlist: [...state.watchlist, newItem]
        }));

        toast.success(`Added ${symbol} to watchlist`);
      },

      removeFromWatchlist: (symbol) => {
        if (!get().isInWatchlist(symbol)) return;

        set(state => ({
          watchlist: state.watchlist.filter(item => item.symbol !== symbol)
        }));

        toast.success(`Removed ${symbol} from watchlist`);
      },

      isInWatchlist: (symbol) => {
        return get().watchlist.some(item => item.symbol === symbol);
      },

      getWatchlistCount: () => {
        return get().watchlist.length;
      }
    }),
    {
      name: 'demoWatchlist',
      partialize: state => ({ watchlist: state.watchlist }),
    }
  )
);
