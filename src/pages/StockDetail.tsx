import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Stock = {
  name: string;
  price: number;
};

export default function StockDetail() {
  const { stockId } = useParams();
  const [stock, setStock] = useState<Stock>({ name: '', price: 0 });

  // Fetch detailed stock data based on stockId
  useEffect(() => {
    // Placeholder fetch logic; replace with real API call
    if (stockId) {
      // Simulate fetching stock data
      setStock({
        name: `Stock ${stockId}`,
        price: 100 + Number(stockId),
      });
    }
  }, [stockId]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{stock.name}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Stock Details */}
        <div>
          <p>Current Price: ${stock.price}</p>
          {/* More details */}
        </div>
        
        {/* Buy Form */}
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-4">Purchase Shares</h2>
          <form>
            <input type="number" placeholder="Quantity" />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-3"
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}