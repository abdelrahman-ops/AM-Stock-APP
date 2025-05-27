import { FiStar } from 'react-icons/fi';
import { useWatchlistStore } from '../../stores/watchlistStore';
import { useCallback } from 'react';

interface WatchlistButtonProps {
  symbol: string;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ symbol }) => {
  // Use Zustand selectors to get only what we need
  const isInWatchlist = useWatchlistStore(useCallback(
    (state) => state.isInWatchlist(symbol),
    [symbol]
  ));
  
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  return (
    <button
  onClick={handleClick}
  className={`
    p-2 rounded-full transition-colors duration-200
    ${isInWatchlist 
      ? 'text-yellow-500 hover:bg-yellow-50' 
      : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
    }
  `}
  aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
>
  <FiStar
    className={`
      w-5 h-5 transition-all duration-200
      ${isInWatchlist ? 'fill-current scale-110' : 'scale-100'}
    `}
  />
</button>
  );
};