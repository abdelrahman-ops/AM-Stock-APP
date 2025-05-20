
import type { StockItem } from '../types/stock';

const cardThemes = [
    {
        bg: 'bg-gradient-to-br from-[#A6F7E2] to-[#8AE2FF]',
        text: 'text-[#005F6A]',
        chart: '#0088A3',
    },
    {
        bg: 'bg-gradient-to-br from-[#B79BFF] to-[#D6A3FB]',
        text: 'text-[#4A1E8F]',
        chart: '#7F3DFF',
    },
    {
        bg: 'bg-gradient-to-br from-[#FFE5A5] to-[#FFC97E]',
        text: 'text-[#7A4A00]',
        chart: '#FF9F1C',
    },
    {
        bg: 'bg-gradient-to-br from-[#C7FFA5] to-[#A5FFD8]',
        text: 'text-[#006B3A]',
        chart: '#00C853',
    },
    {
        bg: 'bg-gradient-to-br from-[#F8A5FF] to-[#FFA5D8]',
        text: 'text-[#8F006E]',
        chart: '#E91E63',
    },
];

const StockCard: React.FC<StockItem> = ({
    id,
    logo,
    companyName,
    ticker,
    price,
    change,
    chart
}) => {
    const isPositive = change >= 0;
    const theme = cardThemes[id % cardThemes.length];
    
    return (
        <div className={`relative h-full rounded-xl ${theme.bg} p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {logo ? (
                        <img 
                            src={logo} 
                            alt={companyName}
                            className="object-contain w-8 h-8 p-1 bg-white border border-white rounded-lg shadow-sm"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://placehold.co/32x32?text=${ticker.substring(0,2)}`;
                            }}
                        />
                    ) : (
                        <div className={`w-8 h-8 rounded-lg ${theme.bg} flex items-center justify-center text-xs font-medium shadow-inner`}>
                            {ticker.substring(0,2)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-xs font-semibold truncate ${theme.text}`}>{companyName}</h3>
                        <p className="text-[0.65rem] text-gray-600">{ticker}</p>
                    </div>
                </div>
                
                <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-md ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(change)}%
                </span>
            </div>

            {/* Price and Chart */}
            <div className="flex items-end justify-between mt-auto">
                <div className="flex-1">
                    <p className="mb-0.5 text-[0.65rem] text-gray-600">Current Value</p>
                    <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
                </div>
                
                {/* Mini Chart */}
                <div className="relative w-16 h-8 ml-2">
                    <img src={chart} alt="Stock chart" className="object-contain w-full h-full" />
                </div>
            </div>

            {/* Trade Button on Hover */}
            <button className={`absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 hover:opacity-100 rounded-xl ${theme.bg}`}>
                <span className={`px-3 py-1.5 text-xs font-medium rounded-lg bg-white ${theme.text} shadow-md`}>
                    Trade
                </span>
            </button>
        </div>
    );
};

export default StockCard;