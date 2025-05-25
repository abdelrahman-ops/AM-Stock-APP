// src/ui/common/ErrorDisplay.tsx
import { FiBarChart2 } from 'react-icons/fi';

interface ErrorDisplayProps {
  error: unknown;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto mt-10">
      <div className="flex flex-col items-center text-center">
        <div className="bg-red-100 p-3 rounded-full">
          <FiBarChart2 className="text-red-500 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-red-800 mt-4">Market Data Unavailable</h3>
        <p className="text-red-600 mt-2">
          {error instanceof Error ? error.message : 'Failed to load stock data'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}