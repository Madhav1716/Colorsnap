import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const BlogTailwindTheme: React.FC = () => (
  <>
    <Helmet>
      <title>How to Get Tailwind Theme from Image – ColorSnap Blog</title>
      <meta name="description" content="Learn how to generate a custom Tailwind CSS theme from any image using ColorSnap. Step-by-step guide for designers and developers." />
      <link rel="canonical" href="https://colorsnap.design/blog/how-to-get-tailwind-theme-from-image" />
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
          <h1 className="text-3xl font-bold mb-6">How to Get Tailwind Theme from Image</h1>
          <p className="mb-6">Tailwind CSS is a powerful framework for building modern websites, and creating a custom theme from an image can make your project stand out. Follow these steps to generate a Tailwind theme:</p>
          <ol className="list-decimal list-inside mb-6 space-y-4">
            <li>
              <strong>Step 1: Extract Colors</strong><br />
              Use a tool like ColorSnap to upload your image and extract a palette of dominant colors in HEX format.
            </li>
            <li>
              <strong>Step 2: Update Tailwind Config</strong><br />
              Add the extracted colors to your <code>tailwind.config.js</code> file. For example:
              <pre className="bg-gray-100 rounded p-4 mt-2 overflow-x-auto text-sm"><code>{`module.exports = {
  theme: {
    colors: {
      primary: '#FF5733',
      secondary: '#33FF57',
      // Add more colors from your palette
    }
  }
}`}</code></pre>
            </li>
            <li>
              <strong>Step 3: Apply to Your Project</strong><br />
              Use the custom colors in your Tailwind classes, like <code>bg-primary</code> or <code>text-secondary</code>, to style your site.
            </li>
          </ol>
          <p className="mt-8 text-lg font-semibold">Start creating your custom Tailwind theme now with <a href="/" className="text-logo-orange underline hover:no-underline">ColorSnap.Design</a>!</p>
        </article>
      </main>
      <Footer />
    </div>
  </>
);

export default BlogTailwindTheme; 