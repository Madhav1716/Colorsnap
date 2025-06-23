import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import BlogBestFreePalette2025 from "./pages/blog/BestFreePalette2025";
import BlogExtractColor from "./pages/blog/ExtractColor";
import BlogTailwindTheme from "./pages/blog/TailwindTheme";
import ExtractHexCodesFromPhotos from "./pages/blog/ExtractHexCodesFromPhotos";
import ImageToTailwindTheme from "./pages/blog/ImageToTailwindTheme";
import BestFreePaletteTools2025Compare from "./pages/blog/BestFreePaletteTools2025Compare";
import PhotoToCssGradientGenerator from "./pages/blog/PhotoToCssGradientGenerator";
import ExtractDominantColorBranding from "./pages/blog/ExtractDominantColorBranding";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SpeedInsights />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/blog/best-free-color-palette-generators-2025" element={<BlogBestFreePalette2025 />} />
              <Route path="/blog/extract-color-from-image-free" element={<BlogExtractColor />} />
              <Route path="/how-to-get-tailwind-theme-from-image" element={<BlogTailwindTheme />} />
              <Route path="/blog/extract-hex-codes-from-photos" element={<ExtractHexCodesFromPhotos />} />
              <Route path="/blog/image-to-tailwind-theme" element={<ImageToTailwindTheme />} />
              <Route path="/blog/best-free-color-palette-tools-2025-compare" element={<BestFreePaletteTools2025Compare />} />
              <Route path="/blog/photo-to-css-gradient-generator" element={<PhotoToCssGradientGenerator />} />
              <Route path="/blog/extract-dominant-color-from-image-branding" element={<ExtractDominantColorBranding />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
