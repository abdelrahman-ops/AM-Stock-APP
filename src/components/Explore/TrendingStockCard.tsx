import { useNavigate } from "react-router-dom";
import { useDemoMode } from "../../context/DemoModeContext";
import { useTrading } from '../../context/TradingContext';
import { Tooltip } from "../../ui/common/Tooltip";
import { WatchlistButton } from "../../ui/common/WatchlistButton";
import type { Stock } from "../../types/stock";

interface TrendingStockCardProps {
  stock: Stock;
  rank: number;
}

const TrendingStockCard = ({ stock, rank }: TrendingStockCardProps) => {
  const navigate = useNavigate();
  const { isDemoMode } = useDemoMode();
  const { getPortfolioItem } = useTrading();

  const isPositive = stock.percentChange >= 0;
  const truncatedName = stock.name.length > 20 ? `${stock.name.substring(0, 20)}...` : stock.name;
  const portfolioItem = getPortfolioItem(stock.symbol);

  const handleCardClick = () => {
    navigate(`/buy/${stock.symbol}`, {
      state: { 
        demoMode: isDemoMode,
        stockData: stock 
      }
    });
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-all duration-200 h-full flex flex-col cursor-pointer hover:border-gray-200 ${
        isDemoMode ? 'bg-gray-50' : ''
      }`}
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        {/* Rank indicator */}
        <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
          rank === 1 ? 'bg-amber-100 text-amber-800' :
          rank === 2 ? 'bg-gray-100 text-gray-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          <span className="font-bold text-sm">{rank}</span>
        </div>
        
        {/* Stock info */}
        <div className="min-w-0 flex-1">
          <Tooltip content={stock.name} disabled={stock.name.length <= 20}>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition truncate">
              {truncatedName}
            </h3>
          </Tooltip>
          <p className="text-gray-500 text-xs truncate">{stock.symbol.replace('.CA', '')}</p>
        </div>
        
        {/* Watchlist button */}
        <WatchlistButton symbol={stock.symbol} />
      </div>

      {/* Price and performance */}
      <div className="mt-auto space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-500 text-xs">Price</p>
            <p className="text-lg font-bold text-gray-900">
              {stock.price.toFixed(2)} {isDemoMode ? 'DEMO' : 'EGP'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Change</p>
            <div className={`flex items-center justify-end gap-1 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? '↑' : '↓'}
              <span className="font-medium">
                {isPositive ? '+' : ''}{stock.percentChange.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Ownership indicator */}
        {portfolioItem && (
          <div className="pt-2 mt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              You own <span className="font-medium">{portfolioItem.quantity}</span> shares
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingStockCard;