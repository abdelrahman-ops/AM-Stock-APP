import { Link } from "react-router-dom";

export default function Wishlist() {
  // Fetch wishlist data
  const wishlist: { id: number; name: string; price: number }[] = [];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map(stock => (
            <div key={stock.id} className="border p-4 rounded-lg">
              <h3 className="font-bold">{stock.name}</h3>
              <p>Price: ${stock.price}</p>
              <Link 
                to={`/buy/${stock.id}`}
                className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm mt-3"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty</p>
      )}
    </div>
  );
}