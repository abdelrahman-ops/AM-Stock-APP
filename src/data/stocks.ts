import type { StockItem } from "../types/stock"
import nvidia from '../assets/nvidia.png';
import meta from '../assets/meta.png';
import tesla from '../assets/tesla.png';
import apple from '../assets/apple.png';
import amd from '../assets/amd.png';
import nividiaChart from '../assets/trend/nividiaChart.png';
import metaChart from '../assets/trend/metaChart.png';
import teslaChart from '../assets/trend/teslaChart.png';
import appleChart from '../assets/trend/appleChart.png';
import amdChart from '../assets/trend/amdChart.png';

export const stocks : StockItem[] = [
    {
        id:0,
        companyName: 'Nvidia', 
        ticker: 'NVDA', 
        price: 203.65, 
        change: 5.63,
        logo: nvidia,
        trendData: [190, 195, 200, 198, 203, 205, 203.65],
        chart: nividiaChart,
    },
    {
        id:1,
        companyName: 'Meta', 
        ticker: 'META', 
        price: 151.74, 
        change: -4.44,
        logo: meta,
        trendData: [190, 195, 200, 198, 203, 205, 151.74],
        chart: metaChart,
    },
    {
        id:2,
        companyName: 'Tesla Inc', 
        ticker: 'TSLA', 
        price: 177.90, 
        change: 17.63,
        logo: tesla,
        trendData: [190, 195, 200, 198, 203, 205, 177.90],
        chart: teslaChart,
    },
    { 
        id:3,
        companyName: 'Apple Inc', 
        ticker: 'AAPL', 
        price: 145.93, 
        change: 23.41,
        logo: apple,
        trendData: [165,160, 162, 160, 161, 159, 160,154, 156, 150, 155, 154, 153, 132, 145.93],
        chart: appleChart,
    },
    { 
        id:4,
        companyName: 'AMD INC ', 
        ticker: 'AMD', 
        price: 75.40, 
        change: 0,
        logo: amd,
        trendData: [190, 195, 200, 198, 203, 205,190, 195, 200, 198, 203, 205, 75.40],
        chart: amdChart,
    }
]