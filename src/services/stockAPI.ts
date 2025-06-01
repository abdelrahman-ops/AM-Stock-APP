// services/stockAPI.ts
import axios from 'axios';
import type { StockItem } from '../types/stock';

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
};

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Main API functions
export const stockAPI = {
  async fetchAll(): Promise<StockItem[]> {
    try {
      const response = await apiClient.get<ApiResponse<StockItem[]>>('/stocks');
      console.log(response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch stocks');
      }
      return response.data.data;
    } catch (error) {
      console.error("Error fetching stocks:", error);
      throw new Error(axios.isAxiosError(error) 
        ? error.response?.data?.message || error.message 
        : 'Failed to fetch stocks');
    }
  },

  async fetchBySymbol(symbol: string): Promise<StockItem> {
    try {
      const response = await apiClient.get<ApiResponse<StockItem>>(`/stocks/${symbol}`);
      if (!response.data.success) {
        throw new Error(response.data.message || `Failed to fetch stock ${symbol}`);
      }
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching stock ${symbol}:`, error);
      throw new Error(axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : `Failed to fetch stock ${symbol}`);
    }
  },

  async fetchRealTimeData(symbols: string[]): Promise<StockItem[]> {
    try {
      const response = await apiClient.post<ApiResponse<StockItem[]>>('/stocks/realtime', { symbols });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch real-time data');
      }
      return response.data.data;
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      throw new Error(axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : 'Failed to fetch real-time data');
    }
  }
};


export const fetchStocks = stockAPI.fetchAll;
export const fetchStockBySymbol = stockAPI.fetchBySymbol;
export const fetchRealTimeData = stockAPI.fetchRealTimeData;