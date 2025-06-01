// assets/stocks/index.ts
const images: Record<string, string> = {};

// List all your stock images
const imageFiles = import.meta.glob('../assets/stocks/*.{png,jpg,jpeg,svg}');

for (const path in imageFiles) {
    const imageName = path
        .replace('../assets/stocks/', '')
        .replace(/\..+$/, '');
        
    const mod = await imageFiles[path]() as { default: string };
    images[imageName] = mod.default;
}

export default images;