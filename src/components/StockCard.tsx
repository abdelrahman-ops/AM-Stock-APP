import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import type { StockItem } from '../types/stock';
import { getStockImage } from '../utils/stockImages';
import TrendChart from './TrendChart';

type CardTheme = {
    bg: string;
    text: string;
    accent: string;
    chart: string;
    button: string;
    border: string;
    shadow: string;
    hoverBg: string;
};

const cardThemes: CardTheme[] = [
    {
        bg: 'bg-gradient-to-br from-[#A6F7E2] to-[#8AE2FF]',
        text: 'text-[#005F6A]',
        accent: 'text-[#0088A3]',
        chart: '#0088A3',
        button: 'bg-white text-[#005F6A] hover:bg-[#005F6A] hover:text-white',
        border: 'border-[#8AE2FF]/30',
        shadow: 'shadow-md hover:shadow-lg',
        hoverBg: 'hover:from-[#9CEFDA] hover:to-[#7DD5FF]'
    },
    {
        bg: 'bg-gradient-to-br from-[#B79BFF] to-[#D6A3FB]',
        text: 'text-[#4A1E8F]',
        accent: 'text-[#7F3DFF]',
        chart: '#7F3DFF',
        button: 'bg-white text-[#4A1E8F] hover:bg-[#4A1E8F] hover:text-white',
        border: 'border-[#D6A3FB]/30',
        shadow: 'shadow-md hover:shadow-lg',
        hoverBg: 'hover:from-[#AD8AFF] hover:to-[#CC94F7]'
    },
    {
        bg: 'bg-gradient-to-br from-[#FFE5A5] to-[#FFC97E]',
        text: 'text-[#7A4A00]',
        accent: 'text-[#FF9F1C]',
        chart: '#FF9F1C',
        button: 'bg-white text-[#7A4A00] hover:bg-[#7A4A00] hover:text-white',
        border: 'border-[#FFC97E]/30',
        shadow: 'shadow-md hover:shadow-lg',
        hoverBg: 'hover:from-[#FFDC92] hover:to-[#FFBC65]'
    },
    {
        bg: 'bg-gradient-to-br from-[#C7FFA5] to-[#A5FFD8]',
        text: 'text-[#006B3A]',
        accent: 'text-[#00C853]',
        chart: '#00C853',
        button: 'bg-white text-[#006B3A] hover:bg-[#006B3A] hover:text-white',
        border: 'border-[#A5FFD8]/30',
        shadow: 'shadow-md hover:shadow-lg',
        hoverBg: 'hover:from-[#B8F598] hover:to-[#94F5CC]'
    },
    {
        bg: 'bg-gradient-to-br from-[#F8A5FF] to-[#FFA5D8]',
        text: 'text-[#8F006E]',
        accent: 'text-[#E91E63]',
        chart: '#E91E63',
        button: 'bg-white text-[#8F006E] hover:bg-[#8F006E] hover:text-white',
        border: 'border-[#FFA5D8]/30',
        shadow: 'shadow-md hover:shadow-lg',
        hoverBg: 'hover:from-[#F094FF] hover:to-[#FF94CF]'
    },
];

interface StockCardProps extends StockItem {
    onClick?: () => void;
    className?: string;
    compact?: boolean;
    showTradeButton?: boolean;
    isWatchlisted?: boolean;
    onWatchlistToggle?: () => void;
    trendData?: number[];
}

const StockCard: React.FC<StockCardProps> = ({
    id,
    logo,
    name = 'Unknown Company',
    ticker = '',
    price = 0,
    change = 0,
    onClick,
    className = '',
    trendData,
    compact = false,
}) => {
    const isPositive = change >= 0;
    const changePercentage = Math.abs(change).toFixed(2);
    const theme = cardThemes[id % cardThemes.length];
    const displayTicker = ticker || name.substring(0, 4).toUpperCase();

    const imageSrc = getStockImage(logo);

    // Use provided trendData or generate sample data based on price
    const chartData = trendData || [
        price * 0.96,
        price * 0.98,
        price * 0.99,
        price * 1.01,
        price * 1.02,
        price
    ];

    return (
        <div className={`
            relative h-full rounded-xl ${theme.bg} ${theme.border} ${theme.shadow}
            p-4 transition-all duration-300 flex flex-col group
            hover:translate-y-[-2px] ${theme.hoverBg} ${className}
        `}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="relative shrink-0 w-8 h-8 rounded-lg bg-white/80 p-1 border border-white/30">
                        {imageSrc ? (
                            <img 
                                src={imageSrc} 
                                alt={name}
                                className="object-contain w-full h-full"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/40x40?text=${displayTicker.substring(0,2)}`;
                                }}
                            />
                        ) : (
                            <div className={`w-full h-full rounded-md flex items-center justify-center text-xs font-bold ${theme.text}`}>
                                {displayTicker.substring(0,2)}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-xs font-semibold truncate ${theme.text}`}>
                            {name.length > 12 ? `${name.substring(0, 10)}..` : name}
                        </h3>
                        <p className="text-[0.65rem] text-gray-700 font-medium">
                            {displayTicker}
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                    <span className={`text-[0.65rem] px-2 py-1 rounded-md font-medium flex items-center gap-0.5 ${
                        isPositive ? 'bg-green-50/80 text-green-800' : 'bg-red-50/80 text-red-800'
                    }`}>
                        {isPositive ? <FiArrowUp size={10} /> : <FiArrowDown size={10} />}
                        {changePercentage}%
                    </span>
                </div>
            </div>

            {/* Price and Chart */}
            <div className="flex items-end justify-between mt-auto">
                <div className="flex-1">
                    <p className="mb-0.5 text-[0.65rem] text-gray-700">Current Value</p>
                    <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
                </div>
                
                {/* Chart */}
                <div className={`${compact ? 'w-14 h-7' : 'w-20 h-10'}`}>
                    <TrendChart 
                        data={chartData} 
                        positiveColor={theme.chart}
                        negativeColor="#ef4444"
                        compact={compact}
                    />
                </div>
            </div>

            {/* Trade Button on Hover */}
            {onClick && (
                <div className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-xl bg-black/10 backdrop-blur-[1px]">
                    <button 
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg ${theme.button} shadow-md`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        Trade Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default StockCard;