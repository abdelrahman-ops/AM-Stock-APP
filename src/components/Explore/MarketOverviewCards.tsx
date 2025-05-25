// src/components/Explore/MarketOverviewCards.tsx
import { FiAward, FiBarChart2, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import OverviewCard from "./OverviewCard";
import type { Stock } from "../../types/stock";

interface MarketOverviewCardsProps {
  stocks: Stock[];
}

export default function MarketOverviewCards({ stocks }: MarketOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <OverviewCard 
        title="Total Stocks" 
        value={stocks.length} 
        icon={<FiBarChart2 />} 
        gradient="from-indigo-600 to-blue-600"
      />
      
      <OverviewCard 
        title="Top Gainer" 
        value={stocks.reduce((max, stock) => 
          stock.percentChange > max.percentChange ? stock : max
        ).symbol}
        change={Math.max(...stocks.map(s => s.percentChange))}
        icon={<FiTrendingUp />}
        gradient="from-green-600 to-emerald-600"
      />
      
      <OverviewCard 
        title="Most Active" 
        value={stocks.reduce((max, stock) => 
          stock.volume > max.volume ? stock : max
        ).symbol}
        volume={Math.max(...stocks.map(s => s.volume))}
        icon={<FiAward />}
        gradient="from-purple-600 to-fuchsia-600"
      />
      
      <OverviewCard 
        title="EGX 30 Index" 
        value="24,856.42" 
        change={1.25}
        icon={<FiDollarSign />}
        gradient="from-amber-600 to-orange-600"
      />
    </div>
  );
}