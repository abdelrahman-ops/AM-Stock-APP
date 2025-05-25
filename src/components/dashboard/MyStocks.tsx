import StockCard from '../StockCard';
import { stocks } from '../../data/stocks';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/common/Button';

const MyStocks = () => {
    const navigate = useNavigate();
    
    return (
        <div className="w-full rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 font-mono">My Stocks</h1>
                <button 
                    onClick={() => navigate('/portfolio')}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#6425FE] hover:bg-[#6425FE]/10 rounded-lg transition-colors"
                >
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stocks.map((stock, index) => (
                    <div key={stock.id} className="relative h-full">
                        {index === stocks.length - 1 && (
                            <>
                                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-white rounded-xl" />
                                    <Button 
                                        arrowDirection="right" 
                                        className="absolute z-20 flex items-center gap-2 font-medium transition-all transform -translate-x-1/2 -translate-y-1/2 rounded-lg ml-13 top-1/2 left-3/4 hover:scale-105 whitespace-nowrap " 
                                        iconClassName="w-4 h-4" 
                                        navigateTo="/portfolio"
                                    />
                            </>
                        )}
                        <StockCard 
                            id={stock.id}
                            companyName={stock.companyName}
                            ticker={stock.ticker}
                            price={stock.price}
                            change={stock.change}
                            trendData={stock.trendData}
                            logo={stock.logo}
                            chart={stock.chart}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyStocks;