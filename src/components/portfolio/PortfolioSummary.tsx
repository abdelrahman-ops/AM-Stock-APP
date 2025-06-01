import { useQuery } from '@tanstack/react-query';
// import { useStockStore } from '../../stores/stockStore';
import BalanceCard from './BalanceCard';
import InvestedCard from './InvestedCard';
import TopStockCard from './TopStockCard';
import type { StockItem } from '../../types/stock';
import { fetchStocks } from '../../services/stockAPI';

const PortfolioSummary = () => {
  const { data: stocks = []} = useQuery<StockItem[]>({
        queryKey: ['egyptian-stocks'],
        queryFn: fetchStocks,
        refetchInterval: 60_000,
    });
  console.log('summary says: ',stocks);
  

  if (!stocks || stocks.length < 3 || !stocks[2]) {
    return (
      <div className="w-full p-6 bg-white rounded-2xl shadow">
        <p className="text-gray-500">Not enough data to display portfolio summary.</p>
      </div>
    );
  }

  const topStock = stocks[2];
  const portfolioGrowth = 5.63;
  const balance = 14032.56;
  const invested = 7532.21;
  const chartData = [12000, 12500, 13000, 13200, 13500, 14032];

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-200">
      <BalanceCard balance={balance} growth={portfolioGrowth} />
      <InvestedCard invested={invested} total={balance} />
      <TopStockCard stock={topStock} investedValue={1500} chartData={chartData} />
    </div>
  );
};

export default PortfolioSummary;
