// components/ViewToggle/ViewToggle.tsx
import React from 'react';
import { FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';

interface ViewToggleProps {
    viewMode: 'grid' | 'table';
    setViewMode: (mode: 'grid' | 'table') => void;
    theme: 'light' | 'dark';
    loading: boolean;
    refreshData: () => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
    viewMode,
    setViewMode,
    theme,
    loading,
    refreshData
}) => {
    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? (theme === 'dark' ? 'bg-blue-800' : 'bg-blue-100') : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')}`}
                aria-label="Grid view"
            >
                <FiGrid className="text-lg" />
            </button>
            <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md ${viewMode === 'table' ? (theme === 'dark' ? 'bg-blue-800' : 'bg-blue-100') : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')}`}
                aria-label="Table view"
            >
                <FiList className="text-lg" />
            </button>
            <button
                onClick={refreshData}
                className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                aria-label="Refresh data"
            >
                <FiRefreshCw className={`text-lg ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
    );
};

export default ViewToggle;