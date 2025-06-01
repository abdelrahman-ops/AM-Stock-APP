import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { FiTrendingUp } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TrendChartProps {
  data?: number[] | string | null;
  width?: number;
  height?: number;
  positiveColor?: string;
  negativeColor?: string;
  compact?: boolean;
  showIndicator?: boolean;
}

const TrendChart: React.FC<TrendChartProps> = ({
  data = [],
  width = 80,
  height = 40,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  compact = false,
  showIndicator = true
}) => {
  // Process and validate data
  let processedData: number[] = [];
  
  try {
    // Handle string data (comma-separated values)
    if (typeof data === 'string') {
      processedData = data.split(',')
        .map(item => parseFloat(item.trim()))
        .filter(num => !isNaN(num));
    } 
    // Handle array data
    else if (Array.isArray(data)) {
      processedData = data.map(num => typeof num === 'number' ? num : parseFloat(num));
    }
  } catch (error) {
    console.error('Error processing chart data:', error);
    processedData = [];
  }

  // Ensure we have at least 2 valid data points
  const isValidData = processedData.length >= 2;
  let isPositive = true;
  let chartColor = positiveColor;

  if (isValidData) {
    // Ensure even number of data points for better rendering
    if (processedData.length % 2 !== 0) {
      processedData = [...processedData, processedData[processedData.length - 1]];
    }
    isPositive = processedData[processedData.length - 1] >= processedData[0];
    chartColor = isPositive ? positiveColor : negativeColor;
  }

  // Calculate min/max values only if we have valid data
  const minValue = isValidData ? Math.min(...processedData) : 0;
  const maxValue = isValidData ? Math.max(...processedData) : 0;
  const range = maxValue - minValue || 1;

  // Normalize data for consistent chart rendering
  const normalizedData = isValidData 
    ? processedData.map(val => ((val - minValue) / range) * 100)
    : [];

  // Empty state rendering
  if (!isValidData) {
    return (
      <div className={`${compact ? 'w-14 h-7' : 'w-20 h-10'} flex flex-col items-center justify-center text-gray-400`}>
        <FiTrendingUp className="opacity-50" size={compact ? 14 : 18} />
        <span className="text-[8px] mt-0.5">No data</span>
      </div>
    );
  }


  // Gradient background for the chart area
  const gradientFill = (context: import('chart.js').ScriptableContext<'line'>) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${chartColor}40`);
    gradient.addColorStop(1, `${chartColor}00`);
    return gradient;
  };

  // Chart configuration
  const chartData = {
    labels: Array(processedData.length).fill(''),
    datasets: [
      {
        data: normalizedData,
        borderColor: chartColor,
        backgroundColor: gradientFill,
        borderWidth: compact ? 1.8 : 2.2,
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: chartColor,
        pointHoverBorderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: compact ? 0 : 1000,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: !compact,
        intersect: false,
        mode: 'index' as const,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 8,
        caretPadding: 8,
        displayColors: false,
        callbacks: {
          label: (context: import('chart.js').TooltipItem<'line'>) => {
            const originalValue = processedData[context.dataIndex];
            return `${originalValue.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: {
        borderCapStyle: 'round' as const,
        borderJoinStyle: 'round' as const,
        cubicInterpolationMode: 'monotone' as const
      },
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 2
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className={`relative ${compact ? 'w-14 h-7' : 'w-20 h-10'}`}>
      <Line 
        data={chartData} 
        options={chartOptions}
        width={width}
        height={height}
        redraw={compact}
      />
      
      {/* Enhanced indicator with animation */}
      {showIndicator && (
        <div className={`absolute ${compact ? 'bottom-0 right-0' : '-top-1 -right-1'} 
          flex items-center justify-center`}>
          <div className={`animate-pulse ${compact ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'} 
            rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>
      )}
      
      {/* Current value indicator for non-compact mode */}
      {/* {!compact && (
        <div className={`absolute -bottom-1 -right-1 text-[8px] font-medium 
          ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {processedData[processedData.length - 1].toFixed(1)}
        </div>
      )} */}
    </div>
  );
};

export default TrendChart;