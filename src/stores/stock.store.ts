import { create } from 'zustand';
import { stocksService } from '../services/stock.service';
import type { IStock } from '../types';

interface StocksState {
    stocks: IStock[];
    currentStock: IStock | null;
    loading: boolean;
    error: string | null;
    getStocks: () => Promise<void>;
    getStockBySymbol: (symbol: string) => Promise<void>;
    createStock: (stockData: Partial<IStock>) => Promise<void>;
    updateStock: (symbol: string, stockData: Partial<IStock>) => Promise<void>;
    updateStockPrices: (updates: Partial<IStock>[]) => Promise<void>;
    deleteStock: (symbol: string) => Promise<void>;
}

    export const useStocksStore = create<StocksState>((set) => ({
    stocks: [],
    currentStock: null,
    loading: false,
    error: null,

    getStocks: async () => {
        set({ loading: true, error: null });
        try {
            const stocks = await stocksService.getStocks();
            console.log('store response: ', stocks);
        set({ stocks, loading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch stocks', loading: false });
        }
    },

    getStockBySymbol: async (symbol) => {
        set({ loading: true, error: null });
        try {
        const currentStock = await stocksService.getStockBySymbol(symbol);
        set({ currentStock, loading: false });
        } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Failed to fetch stock', loading: false });
        }
    },

    createStock: async (stockData) => {
        set({ loading: true, error: null });
        try {
        await stocksService.createStock(stockData);
        set({ loading: false });
        // Refresh stocks list
        useStocksStore.getState().getStocks();
        } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Failed to create stock', loading: false });
        }
    },

    updateStock: async (symbol, stockData) => {
        set({ loading: true, error: null });
        try {
        await stocksService.updateStock(symbol, stockData);
        set({ loading: false });
        // Refresh data
        useStocksStore.getState().getStocks();
        if (useStocksStore.getState().currentStock?.symbol === symbol) {
            useStocksStore.getState().getStockBySymbol(symbol);
        }
        } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Failed to update stock', loading: false });
        }
    },

    updateStockPrices: async (updates) => {
        set({ loading: true, error: null });
        try {
        await stocksService.updateStockPrices(updates);
        set({ loading: false });
        // Refresh stocks list
        useStocksStore.getState().getStocks();
        } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Failed to update prices', loading: false });
        }
    },

    deleteStock: async (symbol) => {
        set({ loading: true, error: null });
        try {
        await stocksService.deleteStock(symbol);
        set({ loading: false });
        // Refresh stocks list
        useStocksStore.getState().getStocks();
        } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Failed to delete stock', loading: false });
        }
    }
}));