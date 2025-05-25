// src/components/Explore/StocksTable.tsx
import { Link } from "react-router-dom";
import type { Stock } from "../../types/stock";

interface StocksTableProps {
  stocks: Stock[];
  onAddToWishlist: (id: string) => void;
}

export default function StocksTable({ stocks, onAddToWishlist }: StocksTableProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock) => {
            const isPositive = stock.percentChange >= 0;
            return (
              <tr key={stock._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${stock.price.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? '+' : ''}{stock.change.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? '+' : ''}{stock.percentChange.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stock.volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link 
                      to={`/buy/${stock.symbol}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Trade
                    </Link>
                    <button 
                      onClick={() => onAddToWishlist(stock.symbol)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Watch
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}