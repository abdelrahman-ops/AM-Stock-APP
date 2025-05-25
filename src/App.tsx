import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';
import ExploreStocks from './pages/ExploreStocks';
import StockDetail from './pages/StockDetail';
import {Watchlist}  from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
// import PortfolioStocks from './pages/PortfolioStocks';
// import PortfolioTransactions from './pages/PortfolioTransactions';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { DemoModeProvider } from './context/DemoModeContext';
import { TradingProvider } from './context/TradingContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { Toaster } from 'react-hot-toast';

function App() {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    return (
        <DemoModeProvider>
            <TradingProvider>
                <WatchlistProvider>
                    <div className="flex flex-col h-screen">
                    <Navbar 
                        sidebarExpanded={sidebarExpanded} 
                    />
                        <div className="flex flex-1 overflow-hidden pt-16">
                            <Sidebar 
                                expanded={sidebarExpanded} 
                                onToggle={() => setSidebarExpanded(!sidebarExpanded)} 
                            />
                            <main 
                                className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ease-in-out ${
                                    sidebarExpanded ? 'ml-64' : 'ml-20'
                                }`}
                            >
                                <div className="p-6 mx-auto max-w-7xl">
                                    <Routes>
                                        {/* <Route path="/" element={<Home />} /> */}
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/explore" element={<ExploreStocks />} />
                                        <Route path="/buy/:stockId" element={<StockDetail />} />
                                        <Route path="/watchlist" element={<Watchlist />} />
                                        <Route path="/portfolio" element={<Portfolio />} />
                                            {/* <Route path="/portfolio/stocks" element={<PortfolioStocks />} />
                                            <Route path="/portfolio/transactions" element={<PortfolioTransactions />} /> */}
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/admin" element={<Settings />} />
                                    </Routes>
                                </div>
                            </main>
                        </div>
                    </div>
                    <Toaster 
                        position="top-right"
                        toastOptions={{
                                duration: 3000,
                                style: {
                                borderRadius: '10px',
                            },
                        }}
                    />
                </WatchlistProvider>
            </TradingProvider>
        </DemoModeProvider>
    );
}

export default App;