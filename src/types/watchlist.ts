import type { Stock } from "./stock";

export interface WatchlistItem {
    symbol: string;
    addedAt: Date;
    stockData?: Stock;
}