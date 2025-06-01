export interface IUser {
    id: string;
    email: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    role: 'user' | 'admin' | 'superadmin';
    kycStatus: 'not_started' | 'pending' | 'verified' | 'rejected';
    balance: number;
    isDemo: boolean;
}

export interface IStock {
    id: number;
    symbol: string;
    name: string;
    exchange: string;
    sector?: string;
    price?: number;
    change: number;
    volume: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserStock{
    id: string;
    userId: string;
    stockId: string;
    quantity: number;
    avgPrice: number;
}

export interface ITransactions{
    id: string;
    userId: string;
    type: 'deposit' | 'withdraw' | 'buy' | 'sell';
    amount: number;
    timestamp: Date | string;
    status: 'executed' | 'pending';
}

export interface IOrder {
    id: string;
    userId: string;
    stockId: string;
    type: 'buy' | 'sell';
    status: 'executed' | 'pending';
    amount: number;
    timestamp: Date | string;
    }

export interface IWatchlist {
    id: string;
    userId: string;
    stockId: string;
}

export interface IKYC {
    id: string;
    userId: string;
    nationalId: string;
    selfieUrl: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface INotifications {
    id: string;
    userId: string;
    message: string;
    read: boolean;
}



export interface StockItem {
    id: number;
    symbol: string;
    companyName: string;
    price: number;
    change: number;
    percentChange: number;
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

