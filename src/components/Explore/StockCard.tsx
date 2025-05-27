import { FiArrowUpRight, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { WatchlistButton } from "../../ui/common/WatchlistButton";
import { motion } from "framer-motion";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  high: number;
  low: number;
}

interface StockCardProps {
  stock: Stock;
  onTradeClick?: (symbol: string) => void;
}

const StockCard = ({ stock, onTradeClick }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  const trendIcon = isPositive ? 
    <FiTrendingUp className="text-green-500" /> : 
    <FiTrendingDown className="text-red-500" />;

  // Calculate range percentage
  const dayRangePercent = ((stock.price - stock.low) / (stock.high - stock.low)) * 100;

  return (
    <motion.div 
      whileHover={{ 
        y: -4, 
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
        borderColor: isPositive ? "#e5f7ee" : "#fee5e5"
      }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent flex flex-col h-full transition-all duration-200"
    >
      {/* Compact Header Row */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className={`text-lg font-bold ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stock.symbol.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">{stock.name}</h3>
            <p className="text-xs text-gray-500 truncate">{stock.symbol.replace('.CA', '')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <WatchlistButton 
            symbol={stock.symbol}
          />
        </div>
      </div>

      {/* Price & Performance */}
      <div className="px-4 py-3 flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {stock.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 ml-1">EGP</span>
        </div>
        <div className={`flex items-center gap-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {trendIcon}
          <span className="text-sm font-semibold">
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.percentChange.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Visual Range Indicator */}
      <div className="px-4 pb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Daily Range</span>
          <span>{stock.low.toFixed(2)} - {stock.high.toFixed(2)}</span>
        </div>
        <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full ${
              isPositive ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${dayRangePercent}%` }}
          />
        </div>
      </div>

      {/* Volume & Trade Button */}
      <div className="mt-auto px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Vol:</span> {(stock.volume / 1000).toFixed(0)}K
        </div>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onTradeClick?.(stock.symbol)}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-white ${
            isPositive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          } transition-colors shadow-sm`}
        >
          <FiArrowUpRight size={14} />
          <span>Trade</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StockCard;