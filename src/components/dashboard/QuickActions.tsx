// components/dashboard/QuickActions.jsx
export const QuickActions = () => {
  return (
    <section className="p-4 bg-white rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
      <div className="flex gap-4">
        <button className="bg-[#6425FE] text-white px-6 py-2 rounded-lg hover:bg-[#4e1dc7] transition">
          Buy Stocks
        </button>
        <button className="px-6 py-2 transition bg-gray-100 rounded-lg hover:bg-gray-200">
          Deposit Funds
        </button>
      </div>
    </section>
  );
};