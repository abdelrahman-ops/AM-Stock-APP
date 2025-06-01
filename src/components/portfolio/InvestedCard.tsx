import { ChevronRight } from 'lucide-react';
import Button from '../common/Button';

interface InvestedCardProps {
  invested: number;
  total: number;
}

const InvestedCard = ({ invested, total }: InvestedCardProps) => {
  const percentage = (invested / total) * 100;

  return (
    <div className="p-5 mb-6 bg-white border border-gray-100 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-600">Total Invested</span>
        <Button />
      </div>
      <p className="text-3xl font-bold text-gray-900">${invested.toLocaleString()}</p>
      <div className="w-full h-2 mt-3 bg-gray-100 rounded-full">
        <div
          className="h-2 bg-gradient-to-r from-[#6425FE] to-[#9D7BFF] rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <p className="text-xs text-gray-500">{Math.round(percentage)}% of portfolio</p>
        <p className="text-xs font-medium text-[#6425FE] flex items-center">
          Details <ChevronRight className="w-3 h-3 ml-1" />
        </p>
      </div>
    </div>
  );
};

export default InvestedCard;
