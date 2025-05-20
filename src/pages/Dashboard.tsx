import PortfolioSummary from "../components/dashboard/PortfolioSummary";
import MyStocks from "../components/dashboard/MyStocks";
import { QuickActions } from "../components/dashboard/QuickActions";
import StockDashboard from "../components/dashboard/StockDashboard";

export default function Dashboard() {
    return (
        <div className="min-h-screen p-4 md:p-6 bg-gray-50">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                <div className="lg:col-span-3">
                    <MyStocks />
                </div>
                <div className="lg:col-span-1">
                    <PortfolioSummary />
                </div>
                <div className="lg:col-span-1">
                    <StockDashboard />
                </div>
            </div>
            <QuickActions />
        </div>
    );
}