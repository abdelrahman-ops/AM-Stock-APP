import { useDemoTrading } from '../context/DemoTradingContext';

export const PortfolioOverview = () => {
  const { state } = useDemoTrading();

  const portfolioValue = state.portfolio.reduce((total, item) => {
    // In a real app, you'd fetch current prices here
    // For demo, we'll just use the average price
    return total + (item.avgPrice * item.quantity);
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-600 text-sm">Available Balance</h3>
          <p className="text-2xl font-bold">
            {state.balance.toLocaleString('en-US', {
              style: 'currency',
              currency: 'EGP'
            })}
          </p>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-600 text-sm">Portfolio Value</h3>
          <p className="text-2xl font-bold">
            {portfolioValue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'EGP'
            })}
          </p>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-600 text-sm">Total Value</h3>
          <p className="text-2xl font-bold">
            {(state.balance + portfolioValue).toLocaleString('en-US', {
              style: 'currency',
              currency: 'EGP'
            })}
          </p>
        </div>
      </div>

      {state.portfolio.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shares</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.portfolio.map((item) => (
                <tr key={item.symbol}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.avgPrice.toFixed(2)} EGP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(item.avgPrice * item.quantity).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'EGP'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Your portfolio is empty</p>
      )}
    </div>
  );
};