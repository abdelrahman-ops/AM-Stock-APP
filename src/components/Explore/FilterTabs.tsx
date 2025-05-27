
interface FilterTabsProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

export function FilterTabs({ activeFilter, setActiveFilter }: FilterTabsProps) {
    const tabs = [
        { id: 'all', label: 'All Stocks' },
        { id: 'gainers', label: 'Top Gainers' },
        { id: 'losers', label: 'Top Losers' },
        { id: 'active', label: 'Most Active' },
    ];

    return (
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-1 transition ${
                activeFilter === tab.id
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
            >
                
                {tab.label}
            </button>
            ))}
        </div>
        </div>
    );
}