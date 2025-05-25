import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

interface Transaction {
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  date: Date;
}

interface TradingState {
  balance: number;
  portfolio: PortfolioItem[];
  transactions: Transaction[];
}

const initialTradingState: TradingState = {
  balance: 1_000_000,
  portfolio: [],
  transactions: []
};

const TradingContext = createContext<{
  state: TradingState;
  buyStock: (symbol: string, price: number, quantity: number) => void;
  sellStock: (symbol: string, price: number, quantity: number) => void;
  getPortfolioItem: (symbol: string) => PortfolioItem | undefined;
}>({
  state: initialTradingState,
  buyStock: () => {},
  sellStock: () => {},
  getPortfolioItem: () => undefined
});

export const TradingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<TradingState>(() => {
    const saved = localStorage.getItem('demoTrading');
    return saved ? JSON.parse(saved) : initialTradingState;
  });

  useEffect(() => {
    localStorage.setItem('demoTrading', JSON.stringify(state));
  }, [state]);

  const buyStock = (symbol: string, price: number, quantity: number) => {
    const totalCost = price * quantity;
    
    try {
      if (totalCost > state.balance) {
        throw new Error('Insufficient funds');
      }

      setState(prev => {
        const existingIndex = prev.portfolio.findIndex(item => item.symbol === symbol);
        let newPortfolio = [...prev.portfolio];
        
        if (existingIndex >= 0) {
          const existing = newPortfolio[existingIndex];
          const newAvgPrice = ((existing.avgPrice * existing.quantity) + (price * quantity)) / 
                            (existing.quantity + quantity);
          
          newPortfolio[existingIndex] = {
            ...existing,
            quantity: existing.quantity + quantity,
            avgPrice: newAvgPrice
          };
        } else {
          newPortfolio.push({
            symbol,
            quantity,
            avgPrice: price
          });
        }

        toast.success(`Successfully bought ${quantity} shares of ${symbol}`);
        
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
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const sellStock = (symbol: string, price: number, quantity: number) => {
    try {
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
          newPortfolio.splice(existingIndex, 1);
        } else {
          newPortfolio[existingIndex] = {
            ...existing,
            quantity: existing.quantity - quantity
          };
        }

        toast.success(`Successfully sold ${quantity} shares of ${symbol}`);
        
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
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const getPortfolioItem = (symbol: string) => {
    return state.portfolio.find(item => item.symbol === symbol);
  };

  return (
    <TradingContext.Provider value={{
      state,
      buyStock,
      sellStock,
      getPortfolioItem
    }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => useContext(TradingContext);