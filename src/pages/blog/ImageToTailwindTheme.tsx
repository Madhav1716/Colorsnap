import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const ImageToTailwindTheme: React.FC = () => (
  <>
    <Helmet>
      <title>Convert Image to Tailwind Theme in Seconds – No Code Needed – ColorSnap Blog</title>
      <meta name="description" content="Transform any image into a ready-to-use Tailwind CSS color theme effortlessly with ColorSnap's auto-extraction." />
      <link rel="canonical" href="https://colorsnap.design/blog/image-to-tailwind-theme" />
    </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/favicon-512x512.png" alt="ColorSnap Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-logo-navy">ColorSnap</h1>
                  <p className="text-xs sm:text-sm text-logo-blue">Images to Color Palettes</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        <article>
          <p className="text-sm text-gray-500 mb-2">Posted on June 23, 2025 by ColorSnap Team</p>
          <h1 className="text-3xl font-bold mb-6">Convert Image to Tailwind Theme in Seconds – No Code Needed</h1>
          <h2 className="text-xl font-semibold mt-8 mb-4">What is a Tailwind theme and why it matters</h2>
          <p>[Add content here]</p>
          <h2 className="text-xl font-semibold mt-8 mb-4">Step-by-step: Upload → Extract → Export</h2>
          <p>[Add content here]</p>
          <h2 className="text-xl font-semibold mt-8 mb-4">Example Tailwind config code snippet</h2>
          <p>[Add content here]</p>
          <h2 className="text-xl font-semibold mt-8 mb-4">Tips to fit color themes into UI design</h2>
          <p>[Add content here]</p>
        </article>
      </main>
      <Footer />
    </div>
  </>
);

export default ImageToTailwindTheme; 