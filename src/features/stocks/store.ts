import { create } from "zustand";

type Stock = {
    symbol: string;
    price: number;
    name: string;
};

type Store = {
    stocks: Stock[];
    setStocks: (data: Stock[]) => void;
};

export const useStockStore = create<Store>((set) => ({
    stocks: [],
    setStocks: (data) => set({ stocks: data }),
}));
