import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Color } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";
import { trackCodeCopy } from "@/utils/analytics";

interface CodeOutputProps {
  colors: Color[];
}

const CodeOutput = ({ colors }: CodeOutputProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const generateTailwindConfig = () => {
    const colorObj = colors.reduce((acc, color, index) => {
      const key = color.name.toLowerCase().replace(/\s+/g, "-");
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
${Object.entries(colorObj)
  .map(([key, value]) => `        '${key}': '${value}',`)
  .join("\n")}
      }
    }
  }
}`;
  };

  const generateCSSVariables = () => {
    const cssVars = colors
      .map((color, index) => {
        const name = color.name.toLowerCase().replace(/\s+/g, "-");
        const rgb = color.rgb.match(/\d+/g)?.join(", ") || "";
        return `  --color-${name}: ${color.hex};\n  --color-${name}-rgb: ${rgb};`;
      })
      .join("\n");

    return `:root {
${cssVars}
  --color-primary: ${colors[0]?.hex || "#000000"};
  --color-secondary: ${colors[1]?.hex || "#666666"};
  --color-accent: ${colors[2]?.hex || "#999999"};
}`;
  };

  const generateSassVariables = () => {
    return (
      colors
        .map((color, index) => {
          const name = color.name.toLowerCase().replace(/\s+/g, "-");
          return `$color-${name}: ${color.hex};`;
        })
        .join("\n") +
      `

// Semantic variables
$primary: ${colors[0]?.hex || "#000000"};
$secondary: ${colors[1]?.hex || "#666666"};
$accent: ${colors[2]?.hex || "#999999"};`
    );
  };

  const generateJSONOutput = () => {
    const colorData = colors.map((color, index) => ({
      name: color.name,
      hex: color.hex,
      rgb: color.rgb,
      contrast: color.contrast,
      index,
    }));

    return JSON.stringify(colorData, null, 2);
  };

  const generateCSVOutput = () => {
    const headers = ["Name", "HEX", "RGB", "Contrast"];
    const rows = colors.map((color) => [
      color.name,
      color.hex,
      color.rgb,
      color.contrast,
    ]);

    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  const generateFigmaTokens = () => {
    const tokens = colors.reduce((acc, color, index) => {
      const key = color.name.toLowerCase().replace(/\s+/g, "-");
      acc[`color.${key}`] = {
        value: color.hex,
        type: "color" as const,
        description: `Extracted color: ${color.name}`,
      };
      return acc;
    }, {} as Record<string, { value: string; type: "color"; description: string }>);

    return JSON.stringify({ tokens }, null, 2);
  };

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    trackCodeCopy(type.toLowerCase());
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Code copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const tailwindCode = generateTailwindConfig();
  const cssCode = generateCSSVariables();
  const sassCode = generateSassVariables();
  const jsonCode = generateJSONOutput();
  const csvCode = generateCSVOutput();
  const figmaCode = generateFigmaTokens();

  return (
    <div className="space-y-4">
      <Tabs defaultValue="tailwind" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="tailwind" className="text-xs">
            Tailwind
          </TabsTrigger>
          <TabsTrigger value="css" className="text-xs">
            CSS
          </TabsTrigger>
          <TabsTrigger value="sass" className="text-xs">
            Sass
          </TabsTrigger>
          <TabsTrigger value="json" className="text-xs">
            JSON
          </TabsTrigger>
          <TabsTrigger value="csv" className="text-xs">
            CSV
          </TabsTrigger>
          <TabsTrigger value="figma" className="text-xs">
            Figma
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tailwind" className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-left">
              Tailwind Configuration
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(tailwindCode, "Tailwind config")}
              className="flex items-center space-x-2">
              {copiedCode === "Tailwind config" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-left">
            <pre className="text-sm text-gray-100 text-left">
              <code>{tailwindCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="css" className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-left">CSS Custom Properties</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(cssCode, "CSS variables")}
              className="flex items-center space-x-2">
              {copiedCode === "CSS variables" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-left">
            <pre className="text-sm text-gray-100 text-left">
              <code>{cssCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="sass" className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-left">Sass Variables</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(sassCode, "Sass variables")}
              className="flex items-center space-x-2">
              {copiedCode === "Sass variables" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-left">
            <pre className="text-sm text-gray-100 text-left">
              <code>{sassCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="json" className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-left">JSON Output</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(jsonCode, "JSON data")}
              className="flex items-center space-x-2">
              {copiedCode === "JSON data" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-left">
            <pre className="text-sm text-gray-100 text-left">
              <code>{jsonCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="csv" className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-left">CSV Export</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(csvCode, "CSV data")}
              className="flex items-center space-x-2">
              {copiedCode === "CSV data" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-left">
            <pre className="text-sm text-gray-100 text-left">
              <code>{csvCode}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="figma" className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-left">Figma Tokens</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(figmaCode, "Figma tokens")}
              className="flex items-center space-x-2">
              {copiedCode === "Figma tokens" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>Copy</span>
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-left">
            <pre className="text-sm text-gray-100 text-left">
              <code>{figmaCode}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeOutput;
