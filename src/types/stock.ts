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

export interface StockItem {
  id: number,
  companyName: string;
  ticker: string;
  price: number;
  change: number;
  logo?: string;
  trendData?: number[];
  chart?: string;
}