import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { stockAPI } from '../services/stockAPI';
import type { StockItem } from '../types/stock';

type ViewMode = 'cards' | 'table';
type FilterType = 'all' | 'gainers' | 'losers' | 'active' | 'favorites';

interface Filters {
  activeFilter: FilterType;
  searchQuery: string;
  sector?: string;
}

interface StockState {
  stocks: StockItem[];
  trendingStocks: StockItem[];
  selectedStock: StockItem | null;
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  viewMode: ViewMode;
  filters: Filters;
  realTimeInterval: NodeJS.Timeout | null;
  sectors: string[];

  // Derived state getters
  filteredStocks: StockItem[];
  getStockBySymbol: (symbol: string) => StockItem | undefined;
  
  // Actions
  fetchStocks: () => Promise<void>;
  fetchStockBySymbol: (symbol: string) => Promise<void>;
  startRealTimeUpdates: (interval?: number) => void;
  stopRealTimeUpdates: () => void;
  toggleFavorite: (symbol: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setActiveFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  setSectorFilter: (sector: string | undefined) => void;
  refreshData: () => Promise<void>;
}

export const useStockStore = create<StockState>()(
  devtools(
    persist(
      (set, get) => ({
        stocks: [],
        trendingStocks: [],
        selectedStock: null,
        favorites: [],
        isLoading: false,
        error: null,
        viewMode: 'cards',
        filters: {
          activeFilter: 'all',
          searchQuery: '',
          sector: undefined
        },
        realTimeInterval: null,
        sectors: [],

        // Derived getters
        get filteredStocks() {
          const { stocks, filters, favorites } = get();
          const { activeFilter, searchQuery, sector } = filters;
          
          return stocks.filter((stock) => {
            // Search filter
            const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Sector filter
            const matchesSector = !sector || stock.sector === sector;
            
            // Active filter
            switch (activeFilter) {
              case 'gainers':
                return matchesSearch && matchesSector && (stock.changePercent ?? 0) > 0;
              case 'losers':
                return matchesSearch && matchesSector && (stock.changePercent ?? 0) < 0;
              case 'active':
                return matchesSearch && matchesSector && (stock.volume ?? 0) > 1000000;
              case 'favorites':
                return matchesSearch && matchesSector && favorites.includes(stock.symbol);
              default:
                return matchesSearch && matchesSector;
            }
          });
        },

        getStockBySymbol: (symbol: string) => {
          return get().stocks.find(stock => stock.symbol === symbol);
        },

        // Actions
        fetchStocks: async () => {
          set({ isLoading: true, error: null });
          try {
            const stocks = await stockAPI.fetchAll();
            const sectors = Array.from(new Set(stocks.map(stock => stock.sector)));
            
            console.log(stocks);
            
            set({ 
              stocks: stocks.map(stock => ({
                ...stock,
                isFavorite: get().favorites.includes(stock.symbol)
              })),
              sectors,
              isLoading: false 
            });
          } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to fetch stocks';
            set({ error, isLoading: false });
            throw err;
          }
        },

        fetchStockBySymbol: async (symbol: string) => {
          set({ isLoading: true, error: null });
          try {
            const stock = await stockAPI.fetchBySymbol(symbol);
            set({ 
              selectedStock: {
                ...stock,
                isFavorite: get().favorites.includes(stock.symbol)
              },
              isLoading: false 
            });
          } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to fetch stock';
            set({ error, isLoading: false });
            throw err;
          }
        },

        startRealTimeUpdates: (interval = 30000) => {
          const { realTimeInterval, stopRealTimeUpdates } = get();
          if (realTimeInterval) {
            stopRealTimeUpdates();
          }

          const updateStocks = async () => {
            const { stocks, favorites } = get();
            if (stocks.length === 0) return;

            try {
              const updatedStocks = await stockAPI.fetchRealTimeData(
                stocks.map(s => s.symbol)
              );
              
              set({
                stocks: updatedStocks.map(stock => ({
                  ...stock,
                  isFavorite: favorites.includes(stock.symbol)
                })),
                trendingStocks: get().trendingStocks.map(stock => {
                  const updated = updatedStocks.find(s => s.symbol === stock.symbol);
                  return updated ? { ...updated, isFavorite: stock.isFavorite } : stock;
                }),
                selectedStock: updatedStocks.find(
                  s => s.symbol === get().selectedStock?.symbol
                ) || get().selectedStock
              });
            } catch (err) {
              console.error('Real-time update failed:', err);
            }
          };

          // Initial update
          updateStocks();
          
          // Set up interval
          const intervalId = setInterval(updateStocks, interval);
          set({ realTimeInterval: intervalId });
        },

        stopRealTimeUpdates: () => {
          const { realTimeInterval } = get();
          if (realTimeInterval) {
            clearInterval(realTimeInterval);
            set({ realTimeInterval: null });
          }
        },

        toggleFavorite: (symbol) => {
          set((state) => {
            const isFavorite = state.favorites.includes(symbol);
            const favorites = isFavorite
              ? state.favorites.filter(s => s !== symbol)
              : [...state.favorites, symbol];
            
            return {
              favorites,
              stocks: state.stocks.map(stock => 
                stock.symbol === symbol ? { ...stock, isFavorite: !isFavorite } : stock
              ),
              trendingStocks: state.trendingStocks.map(stock => 
                stock.symbol === symbol ? { ...stock, isFavorite: !isFavorite } : stock
              ),
              selectedStock: state.selectedStock?.symbol === symbol
                ? { ...state.selectedStock, isFavorite: !isFavorite }
                : state.selectedStock
            };
          });
        },

        refreshData: async () => {
          await get().fetchStocks();
        },

        setViewMode: (mode) => set({ viewMode: mode }),
        setActiveFilter: (filter) =>
          set((state) => ({
            filters: { ...state.filters, activeFilter: filter },
          })),
        setSearchQuery: (query) =>
          set((state) => ({
            filters: { ...state.filters, searchQuery: query },
          })),
        setSectorFilter: (sector) =>
          set((state) => ({
            filters: { ...state.filters, sector },
          })),
      }),
      {
        name: 'stock-storage',
        partialize: (state) => ({
          viewMode: state.viewMode,
          filters: state.filters,
          favorites: state.favorites,
        }),
      }
    )
  )
);

// Initialize store with default data
export const initializeStockStore = async () => {
  const store = useStockStore.getState();
  await store.fetchStocks();
  store.startRealTimeUpdates();
};