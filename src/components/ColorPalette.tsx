
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
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

  return (
    <div className="space-y-4">
      {/* Color Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            className="group relative"
          >
            <div
              className="w-full h-20 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-4 border-white"
              style={{ backgroundColor: color.hex }}
              onClick={() => handleCopyColor(color.hex)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                {copiedColor === color.hex ? (
                  <Check className="w-5 h-5 text-white opacity-100" />
                ) : (
                  <Copy className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="font-medium text-gray-900 text-sm">{color.name}</p>
              <p className="text-xs text-gray-600 font-mono">{color.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Color List */}
      <div className="space-y-2 mt-6">
        <h4 className="font-medium text-gray-900">Color Values</h4>
        <div className="space-y-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleCopyColor(color.hex)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <p className="font-medium text-gray-900">{color.name}</p>
                  <p className="text-sm text-gray-600">{color.rgb}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                  {color.hex}
                </code>
                {copiedColor === color.hex ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
