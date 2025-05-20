export default function Portfolio() {
  // Fetch portfolio data
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Portfolio</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Shares</th>
              <th>Avg Price</th>
              <th>Current Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map(item => (
              <tr key={item.stock.id}>
                <td>{item.stock.name}</td>
                <td>{item.shares}</td>
                <td>${item.avgPrice}</td>
                <td>${item.currentValue}</td>
                <td>
                  <button 
                    onClick={() => sellStock(item.stock.id)}
                    className="text-red-600 hover:underline"
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}