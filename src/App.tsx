import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';
import ExploreStocks from './pages/ExploreStocks';
import StockDetail from './pages/StockDetail';
import { Watchlist } from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import Home from './pages/Home';

function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);

  // Auto-close sidebar on mobile route changes
  const location = useLocation();
  useEffect(() => {
    if (isMobile) {
      setSidebarExpanded(false);
    }
  }, [location.pathname, isMobile]);

  // Auto-toggle sidebar based on screen size
  useEffect(() => {
    setSidebarExpanded(!isMobile);
  }, [isMobile]);

  return (
        <div className="flex flex-col h-screen">
          <Navbar 
            sidebarExpanded={sidebarExpanded}
            onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} 
          />
          <div className="flex flex-1 overflow-hidden pt-16">
            <Sidebar 
              expanded={sidebarExpanded} 
              onToggle={() => setSidebarExpanded(!sidebarExpanded)}
              onClose={() => setSidebarExpanded(false)}
            />
            <main className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ${
              !isMobile && (sidebarExpanded ? 'ml-64' : 'ml-20')
            }`}>
              <div className="p-6 mx-auto max-w-7xl">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/explore" element={<ExploreStocks />} />
                  <Route path="/buy/:stockId" element={<StockDetail />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Settings />} />
                </Routes>
              </div>
            </main>
          </div>
          <Toaster position="top-right" />
        </div>
  );
}

export default App;