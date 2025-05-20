import { Link } from "react-router-dom";

export default function ExploreStocks() {
  // Fetch stocks data here
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Stocks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map through stocks */}
        {stocks.map(stock => (
          <div key={stock.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{stock.name}</h3>
            <p>Price: ${stock.price}</p>
            <div className="flex gap-2 mt-3">
              <Link 
                to={`/buy/${stock.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Buy
              </Link>
              <button 
                onClick={() => addToWishlist(stock.id)}
                className="border px-3 py-1 rounded text-sm"
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}