export default function Portfolio() {
  // Fetch portfolio data
  // Example mock data for demonstration
  const portfolio = [
    {
      stock: { id: 1, name: "AAPL" },
      shares: 10,
      avgPrice: 150,
      currentValue: 1700,
    },
    {
      stock: { id: 2, name: "GOOGL" },
      shares: 5,
      avgPrice: 1200,
      currentValue: 6500,
    },
  ];

  // Dummy sellStock function
  const sellStock = (stockId: number) => {
    alert(`Sell stock with id: ${stockId}`);
  };
  
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