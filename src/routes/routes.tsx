import { Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import StockDetailPage from '../pages/StockDetailPage';
import PortfolioPage from '../pages/PortfolioPage';
import ExploreStocks from '../pages/ExploreStocks';
import Register from '../pages/Register';
import Login from '../pages/Login';
import WatchlistPage from '../pages/WatchlistPage';
import WalletPage from '../pages/WalletPage';
import Settings from '../pages/Settings';
import DashboardPage from '../pages/DashboardPage';
import { ProtectedRoute } from './ProtectedRoute';


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks" element={<ExploreStocks />} />
            <Route path="/stock/:symbol" element={<StockDetailPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                    <Route path="/watchlist" element={<WatchlistPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/portfolio" element={<PortfolioPage />} >
                        <Route path="dashboard" element={<DashboardPage />} />
                        {/* <Route path="stocks" element={<MyStocksPage />} /> */}
                        {/* <Route path="transactions" element={<TransactionsPage />} /> */}
                    </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute adminOnly />}>
                {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
            </Route>
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}
