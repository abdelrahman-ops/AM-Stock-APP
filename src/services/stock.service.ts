import axios from 'axios';
import type { IStock } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const stocksService = {
    // Stock Management
    getStocks: async () => {
        const response = await axios.get(`${API_URL}/stocks`);
        console.log('service response: ', response);
        return response.data.data;
    },

    createStock: async (stockData: Partial<IStock>) => {
        const response = await axios.post(`${API_URL}/stocks`, stockData);
        return response.data;
    },

    updateStockPrices: async (updates: Partial<IStock>[]) => {
        const response = await axios.patch(`${API_URL}/stocks/prices`, { updates });
        return response.data;
    },

    getStockBySymbol: async (symbol: string) => {
        const response = await axios.get(`${API_URL}/stocks/${symbol}`);
        return response.data;
    },

    updateStock: async (symbol: string, stockData: Partial<IStock>) => {
        const response = await axios.put(`${API_URL}/stocks/${symbol}`, stockData);
        return response.data;
    },

    deleteStock: async (symbol: string) => {
        const response = await axios.delete(`${API_URL}/stocks/${symbol}`);
        return response.data;
    }
};