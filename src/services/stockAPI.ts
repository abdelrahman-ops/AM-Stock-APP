import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchStocks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stocks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stocks from backend:", error);
        throw error;
    }
};

export const fetchStockBySymbol = async (symbol: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stocks/${symbol}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching stock ${symbol}:`, error);
        throw error;
    }
};

export const fetchRealTimeData = async (symbols: string[]) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/stocks/realtime`, {
        symbols
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching real-time data:", error);
        throw error;
    }
};