import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ExploreStocks from './pages/ExploreStocks';
import StockDetail from './pages/StockDetail';
import Wishlist from './pages/Wishlist';
import Portfolio from './pages/Portfolio';
// import PortfolioStocks from './pages/PortfolioStocks';
// import PortfolioTransactions from './pages/PortfolioTransactions';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

function App() {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    return (
        <div className="flex flex-col h-screen">
        <Navbar 
            sidebarExpanded={sidebarExpanded} 
            // onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} 
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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/explore" element={<ExploreStocks />} />
                            <Route path="/buy/:stockId" element={<StockDetail />} />
                            <Route path="/wishlist" element={<Wishlist />} />
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
    );
}

export default App;