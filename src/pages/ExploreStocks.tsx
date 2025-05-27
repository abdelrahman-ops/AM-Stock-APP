import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";

import { fetchStocks } from "../services/stockAPI";
import type { Stock } from "../types/stock";

import SectionHeader from "../components/Explore/SectionHeader";
import { MarketHeader } from "../components/Explore/MarketHeader";
import { TrendingStockCard } from "../components/Explore/TrendingStockCard";
import { FilterTabs } from "../components/Explore/FilterTabs";
import MarketOverviewCards from "../components/Explore/MarketOverviewCards";
import StocksDisplay from "../components/Explore/StocksDisplay";

import { LoadingSpinner } from "../ui/common/LoadingSpinner";
import NoDataDisplay from "../ui/common/NoDataDisplay";
import ErrorDisplay from "../ui/common/ErrorDisplay";

export default function ExploreStocks() {
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: stocks = [], isLoading, error } = useQuery<Stock[]>({
        queryKey: ['egyptian-stocks'],
        queryFn: fetchStocks,
        refetchInterval: 60_000,
    });

    // Filter and transform data
    const filteredStocks = stocks.filter(stock => {
        if (activeFilter === 'gainers') return stock.percentChange > 0;
        if (activeFilter === 'losers') return stock.percentChange < 0;
        if (activeFilter === 'active') return stock.volume > 1000000;
        if (searchQuery) {
            return stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    const handleAddToWatchlist = (symbol: string) => {
        console.log(`Added ${symbol} to watchlist`);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay error={error} />;
    if (stocks.length === 0) return <NoDataDisplay />;

    return (
        <div className="container mx-auto px-4 py-8">
            <MarketHeader 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            <MarketOverviewCards stocks={stocks} />

            <SectionHeader 
                icon={<FiTrendingUp className="text-blue-500" />}
                title="Trending Stocks"
                subtitle="Most actively traded stocks today"
            />
            
            <TrendingStocksSection 
                stocks={stocks}
            />

            <FilterTabs 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <SectionHeader 
                icon={<BsCollection className="text-blue-500"/>}
                title={viewMode === 'cards' ? 'All Stocks' : 'Stock Market Table'} 
                subtitle={`Showing ${filteredStocks.length} stocks`}
            />

            <StocksDisplay 
                viewMode={viewMode}
                stocks={filteredStocks}
                onWatchlistAdd={handleAddToWatchlist}
            />
        </div>
    );
}

interface TrendingStocksSectionProps {
    stocks: Stock[];
}

function TrendingStocksSection({ stocks }: TrendingStocksSectionProps) {
    const trendingStocks = [...stocks]
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {trendingStocks.map((stock, index) => (
                <motion.div
                    key={stock._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <TrendingStockCard 
                        stock={stock} 
                        rank={index + 1}
                    />
                </motion.div>
            ))}
        </div>
    );
}