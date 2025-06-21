
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Color } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface ColorPaletteProps {
  colors: Color[];
  onCopyColor: (color: string) => void;
}

const ColorPalette = ({ colors, onCopyColor }: ColorPaletteProps) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (color: string) => {
    onCopyColor(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Helper functions to convert colors
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const rgbToLab = (r: number, g: number, b: number) => {
    // Simple approximation - not precise but good enough for display
    const x = r * 0.412453 + g * 0.357580 + b * 0.180423;
    const y = r * 0.212671 + g * 0.715160 + b * 0.072169;
    const z = r * 0.019334 + g * 0.119193 + b * 0.950227;

    const l = y > 0.008856 ? 116 * Math.pow(y / 100, 1/3) - 16 : 903.3 * y / 100;
    const a = 500 * (Math.pow(x / 95.047, 1/3) - Math.pow(y / 100, 1/3));
    const bLab = 200 * (Math.pow(y / 100, 1/3) - Math.pow(z / 108.883, 1/3));

    return {
      l: Math.round(l * 100) / 100,
      a: Math.round(a * 100) / 100,
      b: Math.round(bLab * 100) / 100
    };
  };

  const getColorFormats = (color: Color) => {
    const rgb = hexToRgb(color.hex);
    if (!rgb) return null;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const lab = rgbToLab(rgb.r, rgb.g, rgb.b);

    return {
      hex: color.hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`,
      lab: `${lab.l}, ${lab.a}, ${lab.b}`
    };
  };

  return (
    <div className="space-y-4">
      {/* Color Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            className="group relative"
          >
            <div
              className="w-full h-16 sm:h-20 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-4 border-white"
              style={{ backgroundColor: color.hex }}
              onClick={() => handleCopyColor(color.hex)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                {copiedColor === color.hex ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white opacity-100" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="font-medium text-gray-900 text-xs sm:text-sm">{color.name}</p>
              <p className="text-xs text-gray-600 font-mono">{color.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Color Format Tabs */}
      <div className="mt-6">
        <Tabs defaultValue="hex" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hex" className="text-xs sm:text-sm">HEX</TabsTrigger>
            <TabsTrigger value="rgb" className="text-xs sm:text-sm">RGB</TabsTrigger>
            <TabsTrigger value="hsl" className="text-xs sm:text-sm">HSL</TabsTrigger>
            <TabsTrigger value="cmyk" className="text-xs sm:text-sm">CMYK</TabsTrigger>
            <TabsTrigger value="lab" className="text-xs sm:text-sm">LAB</TabsTrigger>
          </TabsList>

          <TabsContent value="hex" className="space-y-2 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 text-sm">HEX Values</h4>
              <p className="text-xs text-gray-600">Web design, Tailwind, CSS</p>
            </div>
            {colors.map((color, index) => {
              const formats = getColorFormats(color);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCopyColor(formats?.hex || color.hex)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-gray-900 text-sm">{color.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {formats?.hex || color.hex}
                    </code>
                    {copiedColor === (formats?.hex || color.hex) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="rgb" className="space-y-2 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 text-sm">RGB Values</h4>
              <p className="text-xs text-gray-600">Canvas, CSS filters, digital design</p>
            </div>
            {colors.map((color, index) => {
              const formats = getColorFormats(color);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCopyColor(formats?.rgb || color.rgb)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-gray-900 text-sm">{color.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {formats?.rgb || color.rgb}
                    </code>
                    {copiedColor === (formats?.rgb || color.rgb) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="hsl" className="space-y-2 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 text-sm">HSL Values</h4>
              <p className="text-xs text-gray-600">Advanced color manipulation</p>
            </div>
            {colors.map((color, index) => {
              const formats = getColorFormats(color);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCopyColor(formats?.hsl || '')}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-gray-900 text-sm">{color.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {formats?.hsl || ''}
                    </code>
                    {copiedColor === formats?.hsl ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="cmyk" className="space-y-2 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 text-sm">CMYK Values</h4>
              <p className="text-xs text-gray-600">Print design</p>
            </div>
            {colors.map((color, index) => {
              const formats = getColorFormats(color);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCopyColor(formats?.cmyk || '')}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-gray-900 text-sm">{color.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {formats?.cmyk || ''}
                    </code>
                    {copiedColor === formats?.cmyk ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="lab" className="space-y-2 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 text-sm">LAB Values</h4>
              <p className="text-xs text-gray-600">Accessible design contrast</p>
            </div>
            {colors.map((color, index) => {
              const formats = getColorFormats(color);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCopyColor(formats?.lab || '')}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-gray-900 text-sm">{color.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {formats?.lab || ''}
                    </code>
                    {copiedColor === formats?.lab ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ColorPalette;
