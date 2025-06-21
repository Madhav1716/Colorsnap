
import React, { useState, useRef } from 'react';
import { Upload, Download, Copy, Palette, Code2, FileImage, Check, Github, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import ColorPalette from '@/components/ColorPalette';
import CodeOutput from '@/components/CodeOutput';
import { extractColors } from '@/utils/colorExtractor';

export interface Color {
  hex: string;
  rgb: string;
  name: string;
}

const Index = () => {
  const [extractedColors, setExtractedColors] = useState<Color[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      
      // Create an image element to extract colors from
      const img = new Image();
      img.onload = async () => {
        const colors = await extractColors(img);
        setExtractedColors(colors);
        setIsProcessing(false);
        toast({
          title: "Colors extracted successfully!",
          description: `Found ${colors.length} dominant colors in your image.`,
        });
      };
      img.src = imageUrl;
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
      toast({
        title: "Error processing image",
        description: "Please try uploading a different image.",
        variant: "destructive",
      });
    }
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied to clipboard!",
      description: `${color} copied successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PaletteLift
                </h1>
                <p className="text-sm text-gray-600">Images to Color Palettes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Github className="w-4 h-4 mr-2" />
                Star
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500">
                <Heart className="w-4 h-4 mr-2" />
                Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Turn Images Into
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Perfect Color Palettes
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload any image and instantly extract dominant colors. Get ready-to-use Tailwind CSS themes and CSS variables in seconds.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <FileImage className="w-4 h-4 mr-2" />
              Browser-based
            </div>
            <div className="flex items-center">
              <Code2 className="w-4 h-4 mr-2" />
              Developer-ready
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Instant export
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Top Row - Image Upload and Color Palette */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Upload */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Drag and drop or click to upload an image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  isProcessing={isProcessing}
                  uploadedImage={uploadedImage}
                />
              </CardContent>
            </Card>

            {/* Right Column - Color Palette */}
            {extractedColors.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Extracted Colors
                  </CardTitle>
                  <CardDescription>
                    Click any color to copy to clipboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPalette
                    colors={extractedColors}
                    onCopyColor={handleCopyColor}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Bottom Row - Code Output */}
          {extractedColors.length > 0 && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code2 className="w-5 h-5 mr-2" />
                  Ready-to-use Code
                </CardTitle>
                <CardDescription>
                  Copy and paste into your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeOutput colors={extractedColors} />
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Made with <Heart className="w-4 h-4 inline text-red-500" /> for developers and designers
            </p>
            <p className="text-sm">
              All processing happens in your browser. No images are uploaded to servers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
