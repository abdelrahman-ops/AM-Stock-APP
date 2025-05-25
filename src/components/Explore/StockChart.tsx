import { Line } from "react-chartjs-2";
import {
  LineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface StockChartProps {
  stock: any;
  library: 'chartjs' | 'recharts';
  chartType: 'price' | 'performance';
}

export default function StockChart({ stock, library, chartType }: StockChartProps) {
  const prepareChartData = () => {
    if (chartType === 'price') {
      return [
        { name: 'Open', value: parseFloat(stock.open) },
        { name: 'High', value: parseFloat(stock.high) },
        { name: 'Low', value: parseFloat(stock.low) },
        { name: 'Close', value: parseFloat(stock.close) },
      ];
    } else {
      return [
        { name: 'Current', value: parseFloat(stock.close) },
        { name: '52W High', value: parseFloat(stock.fifty_two_week.high) },
        { name: '52W Low', value: parseFloat(stock.fifty_two_week.low) },
      ];
    }
  };

  const data = prepareChartData();

  if (library === 'chartjs') {
    return (
      <Line 
        data={{
          labels: data.map(item => item.name),
          datasets: [
            {
              label: 'Price ($)',
              data: data.map(item => item.value),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              tension: 0.1
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }}
      />
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {chartType === 'price' ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={['auto', 'auto']} />
          <RechartsTooltip />
          <Bar dataKey="value" fill="#3b82f6" name="Price ($)" />
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={['auto', 'auto']} />
          <RechartsTooltip />
          <RechartsLine 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }} 
            name="Price ($)"
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}