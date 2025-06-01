// src/components/Explore/StocksDisplay.tsx
import { AnimatePresence, motion } from "framer-motion";
import StockCard from "./StockCard";
import StocksTable from "./StocksTable";
import type { StockItem } from "../../types/stock";

interface StocksDisplayProps {
  viewMode: 'cards' | 'table';
  stocks: StockItem[];
  onWatchlistAdd: (symbol: string) => void;
}

export default function StocksDisplay({ viewMode, stocks, onWatchlistAdd }: StocksDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stocks.map((stock) => (
              <StockCard 
                key={stock.id}
                
              />
            ))}
          </div>
        ) : (
          <StocksTable 
            stocks={stocks}
            onAddToWishlist={onWatchlistAdd}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}