import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  growth: number;
}

const BalanceCard = ({ balance, growth }: BalanceCardProps) => {
  const isPositive = growth >= 0;

  return (
    <div className="p-5 mb-4 bg-gradient-to-r from-[#F6F5FF] to-[#F0EEFF] rounded-xl border border-[#F0EEFF]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-600">Available Balance</span>
        <span className="text-xs px-2 py-1 bg-[#6425FE]/10 text-[#6425FE] rounded-full">Live</span>
      </div>
      <p className="text-3xl font-bold text-gray-900">${balance.toLocaleString()}</p>
      <div className="flex items-center mt-3">
        <span className={`text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {Math.abs(growth)}%
        </span>
        <span className="ml-2 text-xs text-gray-500">vs last month</span>
      </div>
    </div>
  );
};

export default BalanceCard;
