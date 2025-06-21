
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Color } from '@/pages/Index';
import { useToast } from '@/hooks/use-toast';

interface CodeOutputProps {
  colors: Color[];
}

const CodeOutput = ({ colors }: CodeOutputProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const generateTailwindConfig = () => {
    const colorObj = colors.reduce((acc, color, index) => {
      const key = color.name.toLowerCase().replace(/\s+/g, '-');
      acc[key] = color.hex;
      if (index === 0) acc.primary = color.hex;
      if (index === 1) acc.secondary = color.hex;
      if (index === 2) acc.accent = color.hex;
      return acc;
    }, {} as Record<string, string>);

    return `// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
${Object.entries(colorObj).map(([key, value]) => `        '${key}': '${value}',`).join('\n')}
      }
    }
  }
}`;
  };

  const generateCSSVariables = () => {
    const cssVars = colors.map((color, index) => {
      const name = color.name.toLowerCase().replace(/\s+/g, '-');
      const rgb = color.rgb.match(/\d+/g)?.join(', ') || '';
      return `  --color-${name}: ${color.hex};\n  --color-${name}-rgb: ${rgb};`;
    }).join('\n');

    return `:root {
${cssVars}
  --color-primary: ${colors[0]?.hex || '#000000'};
  --color-secondary: ${colors[1]?.hex || '#666666'};
  --color-accent: ${colors[2]?.hex || '#999999'};
}`;
  };

  const generateSassVariables = () => {
    return colors.map((color, index) => {
      const name = color.name.toLowerCase().replace(/\s+/g, '-');
      return `$color-${name}: ${color.hex};`;
    }).join('\n') + `

// Semantic variables
$primary: ${colors[0]?.hex || '#000000'};
$secondary: ${colors[1]?.hex || '#666666'};
$accent: ${colors[2]?.hex || '#999999'};`;
  };

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Code copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const tailwindCode = generateTailwindConfig();
  const cssCode = generateCSSVariables();
  const sassCode = generateSassVariables();

  return (
    <div className="space-y-4">
      <Tabs defaultValue="tailwind" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
          <TabsTrigger value="css">CSS Variables</TabsTrigger>
          <TabsTrigger value="sass">Sass Variables</TabsTrigger>
        </TabsList>

        <TabsContent value="tailwind" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Tailwind Configuration</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(tailwindCode, 'Tailwind config')}
              className="flex items-center space-x-2"
            >
              {copiedCode === 'Tailwind config' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{tailwindCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="css" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">CSS Custom Properties</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(cssCode, 'CSS variables')}
              className="flex items-center space-x-2"
            >
              {copiedCode === 'CSS variables' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{cssCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="sass" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Sass Variables</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(sassCode, 'Sass variables')}
              className="flex items-center space-x-2"
            >
              {copiedCode === 'Sass variables' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{sassCode}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeOutput;
