import { FiStar } from 'react-icons/fi';
import { useWatchlist } from '../../context/WatchlistContext';
import { useEffect, useState } from 'react';

interface WatchlistButtonProps {
  symbol: string;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ symbol }) => {
  const { 
    isInWatchlist, 
    addToWatchlist, 
    removeFromWatchlist 
  } = useWatchlist();
  const [isWatched, setIsWatched] = useState(false);

  // Sync with context state
  useEffect(() => {
    setIsWatched(isInWatchlist(symbol));
  }, [isInWatchlist, symbol]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWatched) {
      removeFromWatchlist(symbol)
        .then(() => setIsWatched(false))
        .catch(err => console.error("Failed to remove:", err));
    } else {
      addToWatchlist(symbol)
        .then(() => setIsWatched(true))
        .catch(err => console.error("Failed to add:", err));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        isWatched 
          ? 'text-yellow-500 fill-yellow-500 hover:bg-yellow-50' 
          : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
      }`}
      aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <FiStar 
        className={`w-5 h-5 transition-colors 
          ${
        isWatched 
          ? 'text-yellow-500 fill-yellow-500 hover:bg-yellow-50' 
          : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
      }`}
      />
    </button>
  );
};