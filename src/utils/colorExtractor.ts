
import { Color } from '@/pages/Index';

// Color names for common colors
const colorNames = [
  { name: 'Deep Blue', range: [0, 120, 200] },
  { name: 'Ocean Blue', range: [30, 144, 255] },
  { name: 'Sky Blue', range: [135, 206, 235] },
  { name: 'Mint Green', range: [152, 251, 152] },
  { name: 'Forest Green', range: [34, 139, 34] },
  { name: 'Sunset Orange', range: [255, 140, 0] },
  { name: 'Coral Pink', range: [255, 127, 80] },
  { name: 'Deep Purple', range: [147, 0, 211] },
  { name: 'Royal Purple', range: [120, 81, 169] },
  { name: 'Charcoal', range: [54, 69, 79] },
  { name: 'Warm Gray', range: [128, 128, 128] },
  { name: 'Cream', range: [255, 253, 208] },
];

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getColorName(r: number, g: number, b: number): string {
  let closestName = 'Custom Color';
  let minDistance = Infinity;

  for (const color of colorNames) {
    const distance = Math.sqrt(
      Math.pow(r - color.range[0], 2) +
      Math.pow(g - color.range[1], 2) +
      Math.pow(b - color.range[2], 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestName = color.name;
    }
  }

  // If the color is very dark, call it a dark variant
  if (r < 50 && g < 50 && b < 50) {
    return 'Dark Charcoal';
  }
  
  // If the color is very light, call it a light variant
  if (r > 200 && g > 200 && b > 200) {
    return 'Light Gray';
  }

  return closestName;
}

export async function extractColors(image: HTMLImageElement): Promise<Color[]> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve([]);
      return;
    }

    // Resize canvas for faster processing
    const maxSize = 200;
    const ratio = Math.min(maxSize / image.width, maxSize / image.height);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Color frequency map
    const colorMap = new Map<string, { count: number; r: number; g: number; b: number }>();
    
    // Sample every 4th pixel for performance
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];
      
      // Skip transparent pixels
      if (alpha < 128) continue;
      
      // Group similar colors (reduce precision)
      const groupedR = Math.floor(r / 10) * 10;
      const groupedG = Math.floor(g / 10) * 10;
      const groupedB = Math.floor(b / 10) * 10;
      
      const key = `${groupedR},${groupedG},${groupedB}`;
      
      if (colorMap.has(key)) {
        colorMap.get(key)!.count++;
      } else {
        colorMap.set(key, { count: 1, r: groupedR, g: groupedG, b: groupedB });
      }
    }
    
    // Convert to array and sort by frequency
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 8) // Take top 8 colors
      .map(([key, value]) => {
        const hex = rgbToHex(value.r, value.g, value.b);
        const rgb = `rgb(${value.r}, ${value.g}, ${value.b})`;
        const name = getColorName(value.r, value.g, value.b);
        
        return {
          hex,
          rgb,
          name
        };
      });

    resolve(sortedColors);
  });
}
