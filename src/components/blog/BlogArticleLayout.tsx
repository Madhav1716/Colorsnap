import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogArticleLayoutProps {
  title: string;
  date: string;
  author?: string;
  children: React.ReactNode;
}

const BlogArticleLayout: React.FC<BlogArticleLayoutProps> = ({ title, date, author = "ColorSnap Team", children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
            <img src="/favicon-512x512.webp" alt="ColorSnap Logo" className="w-full h-full object-contain" loading="lazy" decoding="async" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-logo-navy">ColorSnap</h1>
            <p className="text-xs sm:text-sm text-logo-blue">Images to Color Palettes</p>
          </div>
        </a>
        <Badge className="hidden sm:inline-block bg-logo-orange text-white ml-4">Blog</Badge>
      </div>
    </header>
    <main className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl">
      <Card className="p-0 md:p-0 shadow-lg border-0 bg-white/95">
        <div className="px-6 pt-6 pb-2 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-logo-navy leading-tight mb-1">{title}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>By {author}</span>
              <span className="hidden sm:inline">•</span>
              <span>{date}</span>
            </div>
          </div>
          <Badge className="sm:hidden bg-logo-orange text-white">Blog</Badge>
        </div>
        <div className="prose prose-snap prose-indigo max-w-none px-6 py-6 sm:py-8 text-base sm:text-lg">
          {children}
        </div>
      </Card>
    </main>
  </div>
);

export default BlogArticleLayout; 