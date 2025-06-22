import ColorThief from "colorthief";
import { Color } from "@/pages/Index";

// Extended color names with more accurate mappings
const colorNames = [
  {
    name: "Red",
    ranges: [
      [255, 0, 0],
      [220, 20, 60],
      [178, 34, 34],
    ],
  },
  {
    name: "Crimson",
    ranges: [
      [220, 20, 60],
      [199, 21, 133],
    ],
  },
  {
    name: "Pink",
    ranges: [
      [255, 192, 203],
      [255, 20, 147],
      [219, 112, 147],
    ],
  },
  {
    name: "Orange",
    ranges: [
      [255, 165, 0],
      [255, 140, 0],
      [255, 69, 0],
    ],
  },
  {
    name: "Yellow",
    ranges: [
      [255, 255, 0],
      [255, 215, 0],
      [255, 255, 224],
    ],
  },
  {
    name: "Lime",
    ranges: [
      [0, 255, 0],
      [50, 205, 50],
      [144, 238, 144],
    ],
  },
  {
    name: "Green",
    ranges: [
      [0, 128, 0],
      [34, 139, 34],
      [46, 139, 87],
    ],
  },
  {
    name: "Teal",
    ranges: [
      [0, 128, 128],
      [72, 209, 204],
      [64, 224, 208],
    ],
  },
  {
    name: "Cyan",
    ranges: [
      [0, 255, 255],
      [173, 216, 230],
      [135, 206, 235],
    ],
  },
  {
    name: "Blue",
    ranges: [
      [0, 0, 255],
      [30, 144, 255],
      [70, 130, 180],
    ],
  },
  {
    name: "Navy",
    ranges: [
      [0, 0, 128],
      [25, 25, 112],
      [47, 84, 150],
    ],
  },
  {
    name: "Purple",
    ranges: [
      [128, 0, 128],
      [147, 0, 211],
      [138, 43, 226],
    ],
  },
  {
    name: "Violet",
    ranges: [
      [238, 130, 238],
      [221, 160, 221],
      [186, 85, 211],
    ],
  },
  {
    name: "Magenta",
    ranges: [
      [255, 0, 255],
      [199, 21, 133],
      [219, 112, 147],
    ],
  },
  {
    name: "Brown",
    ranges: [
      [165, 42, 42],
      [139, 69, 19],
      [160, 82, 45],
    ],
  },
  {
    name: "Tan",
    ranges: [
      [210, 180, 140],
      [245, 245, 220],
      [255, 228, 196],
    ],
  },
  {
    name: "Beige",
    ranges: [
      [245, 245, 220],
      [255, 250, 240],
      [250, 235, 215],
    ],
  },
  {
    name: "Gray",
    ranges: [
      [128, 128, 128],
      [169, 169, 169],
      [192, 192, 192],
    ],
  },
  {
    name: "Silver",
    ranges: [
      [192, 192, 192],
      [211, 211, 211],
      [220, 220, 220],
    ],
  },
  {
    name: "White",
    ranges: [
      [255, 255, 255],
      [248, 248, 255],
      [245, 245, 245],
    ],
  },
  {
    name: "Black",
    ranges: [
      [0, 0, 0],
      [25, 25, 25],
      [47, 47, 47],
    ],
  },
];

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function getColorName(r: number, g: number, b: number): string {
  let closestName = "Custom Color";
  let minDistance = Infinity;

  for (const color of colorNames) {
    for (const range of color.ranges) {
      const distance = Math.sqrt(
        Math.pow(r - range[0], 2) +
          Math.pow(g - range[1], 2) +
          Math.pow(b - range[2], 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestName = color.name;
      }
    }
  }

  // Special cases for very dark or light colors
  if (r < 30 && g < 30 && b < 30) {
    return "Black";
  }

  if (r > 240 && g > 240 && b > 240) {
    return "White";
  }

  // Add saturation and lightness modifiers
  const [h, s, l] = rgbToHsl(r, g, b);

  if (l < 20) return `Dark ${closestName}`;
  if (l > 80) return `Light ${closestName}`;
  if (s < 15) return `Gray ${closestName}`;
  if (s > 85) return `Vibrant ${closestName}`;

  return closestName;
}

function getColorContrast(r: number, g: number, b: number): "light" | "dark" {
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "dark" : "light";
}

export async function extractColors(image: HTMLImageElement): Promise<Color[]> {
  return new Promise((resolve, reject) => {
    try {
      // Use ColorThief to get the color palette
      const colorThief = new ColorThief();

      // Get the dominant color
      const dominantColor = colorThief.getColor(image);

      // Get the color palette (up to 8 colors)
      const palette = colorThief.getPalette(image, 8);

      // Combine dominant color with palette, removing duplicates
      const allColors = [dominantColor, ...palette];
      const uniqueColors = allColors.filter(
        (color, index, self) =>
          index ===
          self.findIndex(
            (c) =>
              Math.abs(c[0] - color[0]) < 10 &&
              Math.abs(c[1] - color[1]) < 10 &&
              Math.abs(c[2] - color[2]) < 10
          )
      );

      // Convert to our Color format
      const colors: Color[] = uniqueColors.slice(0, 8).map(([r, g, b]) => {
        const hex = rgbToHex(r, g, b);
        const rgb = `rgb(${r}, ${g}, ${b})`;
        const name = getColorName(r, g, b);
        const contrast = getColorContrast(r, g, b);

        return {
          hex,
          rgb,
          name,
          contrast,
        };
      });

      resolve(colors);
    } catch (error) {
      console.error("Error extracting colors with ColorThief:", error);

      // Fallback to canvas-based extraction if ColorThief fails
      fallbackExtraction(image).then(resolve).catch(reject);
    }
  });
}

// Fallback extraction method using canvas
async function fallbackExtraction(image: HTMLImageElement): Promise<Color[]> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

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
    const colorMap = new Map<
      string,
      { count: number; r: number; g: number; b: number }
    >();

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
        const contrast = getColorContrast(value.r, value.g, value.b);

        return {
          hex,
          rgb,
          name,
          contrast,
        };
      });

    resolve(sortedColors);
  });
}
