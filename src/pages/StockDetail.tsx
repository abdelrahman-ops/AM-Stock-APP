import { useParams } from 'react-router-dom';

export default function StockDetail() {
  const { stockId } = useParams();
  // Fetch detailed stock data based on stockId
  
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