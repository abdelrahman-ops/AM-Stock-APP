export interface Stock {
  _id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  high: number;
  low: number;
  exchange: string;
  fiftyTwoWeek?: {
    high: number;
    low: number;
  };
}

export interface StockCardProps {
  stock: Stock;
  onTradeClick?: (symbol: string) => void;
  onDetailsClick?: (symbol: string) => void;
}

// export interface StockItem {
//   // id: number,
//   // name: string;
//   // ticker: string;
//   // price: number;
//   // change: number;
//   // logo?: string;
//   // trendData?: number[];
//   // chart?: string;
// }

export interface StockItem {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange?: number;
  volume?: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  sector: string;
  high?: number;
  low?: number;
  ticker: string;
  exchange?: string;
  trendData?: number[];
  logo: string;
  chart: string;
  isFavorite?: boolean;
}

export type ViewMode = 'cards' | 'table';
export type FilterType = 'all' | 'gainers' | 'losers' | 'active' | 'favorites';