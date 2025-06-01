import tesla from '../assets/stocks/tesla.png';
import nvidia from '../assets/stocks/nvidia.png';
import apple from '../assets/stocks/apple.png';
import amd from '../assets/stocks/amd.png';
import meta from '../assets/stocks/meta.png';


const stockImages: Record<string, string> = {
    'tesla.png': tesla,
    'nvidia.png': nvidia,
    'apple.png': apple,
    'amd.png': amd,
    'meta.png': meta,
};

export const getStockImage = (path: string) => {
    const filename = path.split('/').pop() || '';
    return stockImages[filename] || '';
};