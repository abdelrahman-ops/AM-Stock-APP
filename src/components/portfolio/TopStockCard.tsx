import { SiTesla } from "react-icons/si";

interface TopStockCardProps {
  stock: {
    name: string;
    ticker: string;
    change: number;
    price: number;
  };
  investedValue: number;
  chartData: number[];
}

const TopStockCard = ({ stock, investedValue, chartData }: TopStockCardProps) => {
  const isPositive = stock.change >= 0;
  const min = Math.min(...chartData);
  const max = Math.max(...chartData);

  const chartPoints = chartData.map((val, i) => {
    const x = i * (100 / (chartData.length - 1));
    const y = 40 - ((val - min) / (max - min)) * 35;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div>
      <div className="flex justify-between mb-4 flex-col">
        <span className="text-sm text-gray-500 pb-2">Top Stock</span>
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2 mt-1">
            <div className="p-1.5 bg-white border border-gray-100 rounded-lg">
              <SiTesla className="w-5 h-5 text-[#E82127]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{stock.name}</h3>
          </div>
          <div className="flex items-center gap-2 flex-col">
            <span className="text-sm text-gray-500">{stock.ticker}</span>
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} %
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <span className="text-xs text-gray-500">Invested Value</span>
          <p className="text-base font-semibold">${investedValue.toFixed(2)}</p>
        </div>
        <div className="flex-1">
          <span className="text-xs text-gray-500">Current Value</span>
          <p className="text-base font-semibold">${stock.price.toFixed(2)}</p>
        </div>
        <div className="flex-1 relative h-16 min-w-[100px]">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive ? "#10B98130" : "#EF444430"} />
                <stop offset="100%" stopColor={isPositive ? "#10B98100" : "#EF444400"} />
              </linearGradient>
            </defs>
            <polygon points={`0,40 ${chartPoints} 100,40`} fill="url(#chartGradient)" />
            <polyline
              points={chartPoints}
              fill="none"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TopStockCard;
