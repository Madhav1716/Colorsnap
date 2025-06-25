import React, { useState, useCallback, useMemo } from "react";
import {
  Upload,
  Download,
  Copy,
  Palette,
  Code2,
  FileImage,
  Check,
  Github,
  Heart,
  Info,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import ColorPalette from "@/components/ColorPalette";
import CodeOutput from "@/components/CodeOutput";
import { extractColors } from "@/utils/colorExtractor";
import { trackColorExtraction, trackImageUpload } from "@/utils/analytics";
import { trackColorExtractionPerformance } from "@/utils/performance";
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";
import { usePageMetadata } from "@/hooks/useMetadata";

export interface Color {
  hex: string;
  rgb: string;
  name: string;
  contrast: "light" | "dark";
}

// Page-specific metadata for Index
const indexMetadata = {
  title: "🎨 Extract Color Palette from Image – ColorSnap",
  description:
    "Upload image to get HEX, RGB, Tailwind CSS theme & CSS variables instantly. Free, private, and fast color palette generator tool for designers and developers.",
  keywords: [
    "extract color from image",
    "image color picker",
    "color palette generator",
    "tailwind css theme",
    "get hex from image",
    "rgb color extractor",
    "css variables from image colors",
    "color extraction tool",
    "design color palette",
    "web design colors",
    "color scheme generator",
    "image to colors",
    "color picker tool",
    "hex color codes",
    "rgb color values",
    "color palette",
    "color extractor",
    "image colors",
    "HEX codes",
    "RGB values",
    "Tailwind CSS",
    "color picker",
    "design tools",
    "web design",
    "color scheme generator",
    "free tool",
    "browser-based",
    "privacy-first",
    "free color palette tool",
    "color palette generator for designers",
    "best color palette tool",
    "color extraction for developers"
  ],
  openGraph: {
    title: "ColorSnap – Extract Color Palette from Image",
    description:
      "Get HEX, RGB, and Tailwind CSS themes from any image. Generate color palettes instantly with ColorSnap. Free online color extraction tool for designers and developers.",
    url: "https://colorsnap.design",
    siteName: "ColorSnap",
    images: [
      {
        url: "https://colorsnap.design/preview.jpg",
        width: 1200,
        height: 630,
        alt: "ColorSnap - Color palette extraction tool showing vibrant color swatches and HEX codes",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorSnap – Extract Color Palette from Image",
    description:
      "Get HEX, RGB, and Tailwind CSS themes from any image. Generate color palettes instantly with ColorSnap.",
    images: ["https://colorsnap.design/preview.jpg"],
    creator: "@colorsnap",
    site: "@colorsnap",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://colorsnap.design",
  },
};

const Index = () => {
  const [extractedColors, setExtractedColors] = useState<Color[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const { toast } = useToast();

  usePageMetadata(
    indexMetadata.title,
    indexMetadata.description,
    indexMetadata.openGraph.images[0]?.url
  );

  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      const startTime = performance.now();

      try {
        // Track image upload
        trackImageUpload(file.size);

        // Store filename for accessibility
        setUploadedFileName(file.name);

        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);

        // Create an image element to extract colors from
        const img = new Image();
        img.onload = async () => {
          try {
            const colors = await extractColors(img);
            setExtractedColors(colors);
            setIsProcessing(false);

            // Track color extraction
            trackColorExtraction(colors.length);
            trackColorExtractionPerformance(startTime);

            toast({
              title: "Colors extracted successfully!",
              description: `Found ${colors.length} dominant colors in your image using ColorThief.`,
            });
          } catch (error) {
            console.error("Error extracting colors:", error);
            setIsProcessing(false);
            toast({
              title: "Error extracting colors",
              description: "Please try uploading a different image.",
              variant: "destructive",
            });
          }
        };
        img.src = imageUrl;
      } catch (error) {
        console.error("Error processing image:", error);
        setIsProcessing(false);
        toast({
          title: "Error processing image",
          description: "Please try uploading a different image.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const handleCopyColor = useCallback(
    (color: string) => {
      navigator.clipboard.writeText(color);
      toast({
        title: "Copied to clipboard!",
        description: `${color} copied successfully.`,
      });
    },
    [toast]
  );

  // Memoize the color display check
  const hasColors = useMemo(
    () => extractedColors.length > 0,
    [extractedColors.length]
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                      src="/favicon-512x512.webp" 
                      alt="ColorSnap Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#23394a]">
                      ColorSnap
                    </h1>
                    <p className="text-xs sm:text-sm text-[#49a8b0]">
                      Images to Color Palettes
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 text-xs sm:text-sm"
                  onClick={() => window.open('https://buymeacoffee.com/maddy.17', '_blank')}>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#23394a] mb-4 sm:mb-6">
              Turn Images Into
              <span className="text-[#fc6c2c] block">
                Perfect Color Palettes
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Upload an image to instantly get HEX, RGB, and Tailwind-compatible
              color palettes. 100% privacy-first and works in your browser.
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
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
                    uploadedFileName={uploadedFileName || undefined}
                  />
                </CardContent>
              </Card>

              {/* Right Column - Color Palette */}
              {hasColors && (
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
            {hasColors && (
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
        <Footer />
      </div>
    </>
  );
};

export default Index;
