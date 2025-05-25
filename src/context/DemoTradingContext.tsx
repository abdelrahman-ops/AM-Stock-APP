// src/context/DemoTradingContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PortfolioItem {
    symbol: string;
    quantity: number;
    avgPrice: number;
}

interface WatchlistItem {
    symbol: string;
    addedAt: Date;
}

interface DemoTradingState {
    balance: number;
    portfolio: PortfolioItem[];
    watchlist: WatchlistItem[];
    transactions: Transaction[];
}

interface Transaction {
    type: 'buy' | 'sell';
    symbol: string;
    quantity: number;
    price: number;
    date: Date;
}

const initialState: DemoTradingState = {
    balance: 1_000_000,
    portfolio: [],
    watchlist: [],
    transactions: []
};

const DemoTradingContext = createContext<{
    state: DemoTradingState;
    buyStock: (symbol: string, price: number, quantity: number) => void;
    sellStock: (symbol: string, price: number, quantity: number) => void;
    addToWatchlist: (symbol: string) => void;
    removeFromWatchlist: (symbol: string) => void;
    getPortfolioItem: (symbol: string) => PortfolioItem | undefined;
}>({
    state: initialState,
    buyStock: () => {},
    sellStock: () => {},
    addToWatchlist: () => {},
    removeFromWatchlist: () => {},
    getPortfolioItem: () => undefined
});

export const DemoTradingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [state, setState] = useState<DemoTradingState>(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem('demoTrading');
        return saved ? JSON.parse(saved) : initialState;
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('demoTrading', JSON.stringify(state));
    }, [state]);

    const buyStock = (symbol: string, price: number, quantity: number) => {
        const totalCost = price * quantity;
        
        if (totalCost > state.balance) {
        throw new Error('Insufficient funds');
    }

    setState(prev => {
    // Check if already in portfolio
    const existingIndex = prev.portfolio.findIndex(item => item.symbol === symbol);
    let newPortfolio = [...prev.portfolio];
    
    if (existingIndex >= 0) {
        // Update existing position
        const existing = newPortfolio[existingIndex];
        const newAvgPrice = ((existing.avgPrice * existing.quantity) + (price * quantity)) / 
                        (existing.quantity + quantity);
        
        newPortfolio[existingIndex] = {
        ...existing,
        quantity: existing.quantity + quantity,
        avgPrice: newAvgPrice
        };
    } else {
        // Add new position
        newPortfolio.push({
        symbol,
        quantity,
        avgPrice: price
        });
    }

    return {
        ...prev,
        balance: prev.balance - totalCost,
        portfolio: newPortfolio,
        transactions: [
        ...prev.transactions,
        {
            type: 'buy',
            symbol,
            quantity,
            price,
            date: new Date()
        }
        ]
    };
    });
};

    const sellStock = (symbol: string, price: number, quantity: number) => {
        setState(prev => {
        const existingIndex = prev.portfolio.findIndex(item => item.symbol === symbol);
        
        if (existingIndex < 0) {
            throw new Error('Stock not in portfolio');
        }

        const existing = prev.portfolio[existingIndex];
        
        if (existing.quantity < quantity) {
            throw new Error('Not enough shares to sell');
        }

        const newPortfolio = [...prev.portfolio];
        const saleValue = price * quantity;
        
        if (existing.quantity === quantity) {
            // Remove completely if selling all
            newPortfolio.splice(existingIndex, 1);
        } else {
            // Reduce quantity if partial sale
            newPortfolio[existingIndex] = {
            ...existing,
            quantity: existing.quantity - quantity
            };
        }

        return {
            ...prev,
            balance: prev.balance + saleValue,
            portfolio: newPortfolio,
            transactions: [
            ...prev.transactions,
            {
                type: 'sell',
                symbol,
                quantity,
                price,
                date: new Date()
            }
            ]
        };
        });
    };

    const addToWatchlist = (symbol: string) => {
        setState(prev => {
        if (prev.watchlist.some(item => item.symbol === symbol)) {
            return prev; // Already in watchlist
        }
        
        return {
            ...prev,
            watchlist: [
            ...prev.watchlist,
            {
                symbol,
                addedAt: new Date()
            }
            ]
        };
        });
    };

    const removeFromWatchlist = (symbol: string) => {
        setState(prev => ({
        ...prev,
        watchlist: prev.watchlist.filter(item => item.symbol !== symbol)
        }));
    };

    const getPortfolioItem = (symbol: string) => {
        return state.portfolio.find(item => item.symbol === symbol);
    };

    return (
        <DemoTradingContext.Provider value={{
            state,
            buyStock,
            sellStock,
            addToWatchlist,
            removeFromWatchlist,
            getPortfolioItem
        }}>
            {children}
        </DemoTradingContext.Provider>
    );
};

export const useDemoTrading = () => useContext(DemoTradingContext);