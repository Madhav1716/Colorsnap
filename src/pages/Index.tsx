
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Palette className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PaletteLift
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Images to Color Palettes</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-600 text-xs sm:text-sm">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Star</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 text-xs sm:text-sm">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Support</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Turn Images Into
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Perfect Color Palettes
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Upload any image and instantly extract dominant colors. Get ready-to-use Tailwind CSS themes and CSS variables in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <FileImage className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Browser-based
            </div>
            <div className="flex items-center">
              <Code2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Developer-ready
            </div>
            <div className="flex items-center">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Instant export
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
          {/* Top Row - Image Upload and Color Palette */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column - Upload */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Upload Image
                </CardTitle>
                <CardDescription className="text-sm">
                  Drag and drop or click to upload an image
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
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
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Extracted Colors
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Click any color to copy to clipboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
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
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Ready-to-use Code
                </CardTitle>
                <CardDescription className="text-sm">
                  Copy and paste into your project
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CodeOutput colors={extractedColors} />
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2 text-sm sm:text-base">
              Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 inline text-red-500" /> for developers and designers
            </p>
            <p className="text-xs sm:text-sm">
              All processing happens in your browser. No images are uploaded to servers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
