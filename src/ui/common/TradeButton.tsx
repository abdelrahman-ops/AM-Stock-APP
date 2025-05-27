import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useTradingStore } from '../../../draft/tradingStore';

interface TradeButtonProps {
  stock: {
    symbol: string;
    price: number;
  };
  type: 'buy' | 'sell';
  ownedQuantity?: number;
}

export const TradeButton: React.FC<TradeButtonProps> = ({ stock, type, ownedQuantity = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { buyStock, sellStock } = useTradingStore();

  const handleTrade = () => {
    try {
      if (type === 'buy') {
        buyStock(stock.symbol, stock.price, quantity);
      } else {
        sellStock(stock.symbol, stock.price, quantity);
      }
      setIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const maxQuantity = type === 'buy' 
    ? Math.floor(1_000_000 / stock.price) // Simplified for demo
    : ownedQuantity;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`px-4 py-2 rounded-md ${
          type === 'buy' 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {type === 'buy' ? 'Buy' : 'Sell'}
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-xl font-bold">
              {type === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
            </Dialog.Title>

            <div className="mt-4">
              <label className="block mb-2">
                Quantity:
                <input
                  type="number"
                  min="1"
                  max={maxQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(maxQuantity, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <p className="text-sm text-gray-600">
                Max: {maxQuantity} shares ({type === 'buy' ? 'based on your balance' : 'based on your holdings'})
              </p>
              <p className="mt-2 font-semibold">
                Total: {(stock.price * quantity).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'EGP'
                })}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleTrade}
                className={`px-4 py-2 rounded-md text-white ${
                  type === 'buy' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                Confirm {type === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};