import Button from '../../ui/common/Button';
import { stocks } from '../../data/stocks';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { SiTesla } from "react-icons/si";

const PortfolioSummary = () => {
  const topStock = stocks[2];
  const isPositive = topStock.change >= 0;
  const portfolioGrowth = 5.63;
  // const previousPrice = topStock.price / (1 + topStock.change/100);

  // Mock portfolio history data
  const portfolioHistory = [12000, 12500, 13000, 13200, 13500, 14032];

  // Calculate chart points
  const minValue = Math.min(...portfolioHistory);
  const maxValue = Math.max(...portfolioHistory);
  const chartPoints = portfolioHistory.map((val, i) => {
    const x = i * (100 / (portfolioHistory.length - 1));
    const y = 40 - ((val - minValue) / (maxValue - minValue)) * 35;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
      {/* Balance Card */}
      <div className="p-5 mb-4 bg-gradient-to-r from-[#F6F5FF] to-[#F0EEFF] rounded-xl border border-[#F0EEFF]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-600">Available Balance</span>
          <span className="text-xs px-2 py-1 bg-[#6425FE]/10 text-[#6425FE] rounded-full">Live</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">${(14032.56).toLocaleString()}</p>
        <div className="flex items-center mt-3">
          <span className={`text-sm flex items-center ${portfolioGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {portfolioGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(portfolioGrowth)}%
          </span>
          <span className="ml-2 text-xs text-gray-500">vs last month</span>
        </div>
      </div>

      {/* Invested Card */}
      <div className="p-5 mb-6 bg-white border border-gray-100 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-600">Total Invested</span>
          <Button />
        </div>
        <p className="text-3xl font-bold text-gray-900">${(7532.21).toLocaleString()}</p>
        <div className="w-full h-2 mt-3 bg-gray-100 rounded-full">
          <div 
            className="h-2 bg-gradient-to-r from-[#6425FE] to-[#9D7BFF] rounded-full" 
            style={{ width: `${(7532.21 / 14032.56) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">{Math.round((7532.21 / 14032.56) * 100)}% of portfolio</p>
          <p className="text-xs font-medium text-[#6425FE] flex items-center">
            Details <ChevronRight className="w-3 h-3 ml-1" />
          </p>
        </div>
      </div>

      {/* Top Performing Stock - New Design */}
		<div className=" ">
		{/* Header */}
		<div className="flex justify-between mb-4 flex-col">
			<span className="text-sm text-gray-500 pb-2">Top Stock</span>
			<div className='flex flex-row  justify-between'>
				<div className="flex items-center gap-2 mt-1">
					<div className="p-1.5 bg-white border border-gray-100 rounded-lg">
					<SiTesla className="w-5 h-5 text-[#E82127]" />
					</div>
					<h3 className="text-lg font-bold text-gray-900">{topStock.companyName}</h3>
				</div>
				<div className="flex items-center gap-2 flex-col">
					<span className="text-sm text-gray-500">{topStock.ticker}</span>
					<span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
						{isPositive ? '+' : ''}{topStock.change.toFixed(2)}%
					</span>
				</div>
			</div>
			
		</div>

		{/* Values and Chart Row - All items inline */}
		<div className="flex items-center justify-between gap-4">
			{/* Invested Value */}
			<div className="flex-1">
			<span className="text-xs text-gray-500">Invested Value</span>
			<p className="text-base font-semibold">${(1500).toFixed(2)}</p>
			</div>
			
			{/* Current Value */}
			<div className="flex-1">
			<span className="text-xs text-gray-500">Current Value</span>
			<p className="text-base font-semibold">${topStock.price.toFixed(2)}</p>
			</div>
			
			{/* Mini Chart - Reduced width */}
			<div className="flex-1 relative h-16 min-w-[100px]">
			<svg viewBox="0 0 100 40" className="w-full h-full">
				<defs>
				<linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor={isPositive ? "#10B98130" : "#EF444430"} />
					<stop offset="100%" stopColor={isPositive ? "#10B98100" : "#EF444400"} />
				</linearGradient>
				</defs>
				<polygon 
				points={`0,40 ${chartPoints} 100,40`} 
				fill="url(#chartGradient)"
				/>
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
    </div>
  );
};

export default PortfolioSummary;