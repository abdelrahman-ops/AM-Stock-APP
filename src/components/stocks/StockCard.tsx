// components/stocks/StockCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiVolume2 } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import type { IStock } from '../../types';

interface StockCardProps {
    stock: IStock;
    theme: 'light' | 'dark';
    isFavorite: boolean;
    onToggleFavorite: (symbol: string) => void;
}

const StockCard: React.FC<StockCardProps> = ({ 
    stock, 
    theme, 
    isFavorite, 
    onToggleFavorite 
}) => {
    const { symbol, name, price, change, volume, exchange, sector } = stock;
    const isUp = change >= 0;

    return (
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        whileHover={{ y: -5 }}
        className={`rounded-xl shadow-sm overflow-hidden border ${
            theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } transition-all duration-300 hover:shadow-md`}
        >
        <div className="p-5">
            <div className="flex justify-between items-start mb-3">
            <div>
                <h2 className="text-xl font-bold">{symbol}</h2>
                <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {exchange}
                </p>
            </div>
            <button
                onClick={() => onToggleFavorite(symbol)}
                className="text-xl focus:outline-none"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorite ? (
                <FaStar className="text-yellow-400" />
                ) : (
                <FaRegStar className={
                    theme === 'dark' 
                    ? 'text-gray-500 hover:text-yellow-400' 
                    : 'text-gray-300 hover:text-yellow-400'
                } />
                )}
            </button>
            </div>

            <p className={`mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
            {name}
            </p>

            <div className="flex justify-between items-center mb-4">
            <div>
                <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                {price !== undefined ? `EGP ${price.toFixed(2)}` : 'N/A'}
                </span>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                isUp 
                ? 'bg-green-500/10 text-green-500' 
                : 'bg-red-500/10 text-red-500'
            }`}>
                {isUp ? <FiTrendingUp /> : <FiTrendingDown />}
                <span className="font-medium">{change.toFixed(2)}%</span>
            </div>
            </div>

            <div className={`flex justify-between text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
            <div className="flex items-center gap-1">
                <FiVolume2 />
                <span>{volume.toLocaleString()}</span>
            </div>
            {sector && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                theme === 'dark' 
                    ? 'bg-blue-900/30 text-blue-300' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                {sector}
                </span>
            )}
            </div>
        </div>
        </motion.div>
    );
};

export default StockCard;