import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,  // Note the 'type' keyword
  type TooltipItem
} from "chart.js";
import "chartjs-adapter-date-fns";
import { FiArrowUpRight } from "react-icons/fi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface Exchange {
  name: string;
  color: string;
  data: number[];
  times: Array<{
    label: string;
    progress: number;
  }>;
}

const exchanges: Exchange[] = [
  {
    name: "NASDAQ",
    color: "#7F56D9", // Purple
    data: [11560, 11600, 11650, 11680, 11700],
    times: [
      { label: "10am", progress: 50 },
      { label: "11am", progress: 75 },
      { label: "12pm", progress: 90 }
    ]
  },
  {
    name: "SSE",
    color: "#12B76A", // Green
    data: [11400, 11450, 11500, 11550, 11600],
    times: [
      { label: "10am", progress: 30 },
      { label: "11am", progress: 60 },
      { label: "12pm", progress: 80 }
    ]
  },
  {
    name: "Euronext",
    color: "#F79009", // Orange
    data: [11600, 11650, 11700, 11750, 11800],
    times: [
      { label: "10am", progress: 40 },
      { label: "11am", progress: 80 },
      { label: "12pm", progress: 65 }
    ]
  }
];

const timeframes = ["1D", "1W", "1M", "3M", "1Y"];

const StockDashboard = () => {
  const [selectedExchange, setSelectedExchange] = useState<Exchange>(exchanges[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(timeframes[0]);

  const chartData = {
    labels: ["10 am", "10:30 am", "11 am", "11:30 am", "12 pm"],
    datasets: [{
      label: selectedExchange.name,
      data: selectedExchange.data,
      borderColor: selectedExchange.color,
      backgroundColor: `${selectedExchange.color}20`,
      tension: 0.4,
      borderWidth: 2,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 6
    }]
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#667085" }
      },
      y: {
        grid: { color: "#F2F4F7" },
        ticks: { 
          color: "#667085",
          callback: (value: number | string) => {
            if (typeof value === 'number') {
              return value.toLocaleString();
            }
            return value;
          }
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1D2939',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#344054',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    }
  };

  const stats = [
    { label: "High", value: "11,691.89", isPositive: false },
    { label: "Low", value: "11,470.47", isPositive: false },
    { label: "Volume", value: "2.4M", isPositive: false },
    { label: "Change", value: "+1.53%", isPositive: true }
  ];

  return (
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Market Dashboard</h3>
          <div className="flex items-center space-x-2">
            {exchanges.map((exchange) => (
              <button
                key={exchange.name}
                onClick={() => setSelectedExchange(exchange)}
                className={`w-3 h-3 rounded-full transition-all ${
                  selectedExchange.name === exchange.name ? 'scale-125' : 'opacity-40'
                }`}
                style={{ backgroundColor: exchange.color }}
                aria-label={exchange.name}
              />
            ))}
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex space-x-1 overflow-x-auto pb-1 scrollbar-hide">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 h-48">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Market Activity */}
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span>Today's Activity</span>
          <div className="flex space-x-4">
            {selectedExchange.times.map((time, i) => (
              <div key={i} className="text-center">
                <div>{time.label}</div>
                <div className="w-8 h-1 mt-1 bg-gray-100 rounded-full">
                  <div 
                    className="h-1 rounded-full" 
                    style={{ 
                      width: `${time.progress}%`,
                      backgroundColor: selectedExchange.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 p-4 border-t border-gray-200">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-1">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p 
              className={`text-sm font-medium ${
                stat.isPositive 
                  ? 'text-green-600' 
                  : stat.value.startsWith('-') 
                    ? 'text-red-600' 
                    : 'text-gray-900'
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-700">
          View Full Market Data <FiArrowUpRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default StockDashboard;