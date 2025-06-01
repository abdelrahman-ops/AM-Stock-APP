// components/stocks/StockTable.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiVolume2, FiLayers } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import type { IStock } from '../../types';

interface StockTableProps {
    stocks: IStock[];
    theme: 'light' | 'dark';
    favorites: string[];
    toggleFavorite: (symbol: string) => void;
}

const StockTable: React.FC<StockTableProps> = ({ 
    stocks, 
    theme, 
    favorites, 
    toggleFavorite 
}) => {
    return (
        <div className={`overflow-x-auto rounded-lg border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}>
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center gap-1">
                    <span>Favorite</span>
                </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Symbol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center gap-1">
                    <FiVolume2 />
                    <span>Volume</span>
                </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center gap-1">
                    <FiLayers />
                    <span>Sector</span>
                </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Exchange
                </th>
            </tr>
            </thead>
            <tbody className={`divide-y ${
            theme === 'dark' ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'
            }`}>
            <AnimatePresence>
                {stocks.map((stock) => (
                <motion.tr
                    key={stock.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                >
                    <td className="px-6 py-4 whitespace-nowrap">
                    <button
                        onClick={() => toggleFavorite(stock.symbol)}
                        className="text-lg focus:outline-none"
                        aria-label={favorites.includes(stock.symbol) ? "Remove from favorites" : "Add to favorites"}
                    >
                        {favorites.includes(stock.symbol) ? (
                        <FaStar className="text-yellow-400" />
                        ) : (
                        <FaRegStar className={theme === 'dark' ? 'text-gray-400' : 'text-gray-300'} />
                        )}
                    </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{stock.symbol}</div>
                    </td>
                    <td className="px-6 py-4">
                    <div className="text-sm">{stock.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">
                        {stock.price !== undefined ? `EGP ${stock.price.toFixed(2)}` : 'N/A'}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-1 ${
                        stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {stock.change >= 0 ? <FiArrowUp /> : <FiArrowDown />}
                        <span>{stock.change.toFixed(2)}%</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{stock.volume.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {stock.sector && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                        theme === 'dark' 
                            ? 'bg-blue-900/50 text-blue-300' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                        {stock.sector}
                        </span>
                    )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {stock.exchange}
                    </td>
                </motion.tr>
                ))}
            </AnimatePresence>
            </tbody>
        </table>
        </div>
    );
};

export default StockTable;