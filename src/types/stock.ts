export interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: number;
  description?: string;
  changePercent?: number;
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