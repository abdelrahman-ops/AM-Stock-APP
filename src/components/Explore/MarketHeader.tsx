import { FiGrid, FiList, FiSearch } from "react-icons/fi";

// MarketHeader.tsx
interface MarketHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
}

export function MarketHeader({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange
}: MarketHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          EGX Market Explorer
        </h1>
        <p className="text-gray-600 mt-1">Real-time Egyptian stock market data and analytics</p>
      </div>
      
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search stocks..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onViewModeChange('cards')}
            className={`p-2 rounded-md transition ${
              viewMode === 'cards' 
              ? 'bg-white shadow-sm text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="Card view"
          >
            <FiGrid size={20} />
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`p-2 rounded-md transition ${
              viewMode === 'table' 
              ? 'bg-white shadow-sm text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="Table view"
          >
            <FiList size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}