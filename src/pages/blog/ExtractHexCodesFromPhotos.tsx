import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const ExtractHexCodesFromPhotos: React.FC = () => (
  <>
    <Helmet>
      <title>Extract HEX Codes from Image – Free Photo Color Picker | ColorSnap</title>
      <meta name="description" content="Upload any photo and instantly get accurate HEX color codes. Use ColorSnap to extract colors from photos online — free, fast, and no signup required." />
      <link rel="canonical" href="https://colorsnap.design/blog/extract-hex-codes-from-photos" />
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
          <h1 className="text-3xl font-bold mb-6">Extract HEX Codes from Photos – Free Online Tool</h1>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
            <p>Photos are full of color inspiration — but how do you extract exact HEX codes from an image without manually zooming, clicking, and copying?</p>
            <p className="mt-2">Meet ColorSnap, the free browser-based tool that lets you upload any image or photo and instantly get its HEX color codes with pixel-perfect accuracy. No need for Photoshop or color picker extensions — just upload and go.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">What is a HEX Code?</h2>
            <p>A HEX color code is a six-digit code used in web development and design to represent a color. For example:</p>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              <span className="inline-block px-3 py-1 rounded bg-[#FF5733] text-white font-mono">#FF5733</span>
              <span className="inline-block px-3 py-1 rounded bg-[#3498DB] text-white font-mono">#3498DB</span>
            </div>
            <p>These codes are essential in:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Website design (HTML/CSS)</li>
              <li>Branding and logo creation</li>
              <li>UI/UX styling</li>
              <li>App development</li>
              <li>Marketing assets</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Why Use ColorSnap to Extract HEX Colors?</h2>
            <p>Traditional methods (like Photoshop or eyedropper tools) are:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>❌ Time-consuming</li>
              <li>❌ Require software</li>
              <li>❌ Not mobile-friendly</li>
            </ul>
            <p className="mt-2">ColorSnap changes the game:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border">Feature</th>
                    <th className="px-3 py-2 border">Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border">🔼 Upload & Extract</td>
                    <td className="px-3 py-2 border">Works in seconds</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">🎯 Accurate HEX</td>
                    <td className="px-3 py-2 border">Detects top 5–6 dominant colors</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">🔄 Refreshable</td>
                    <td className="px-3 py-2 border">Regenerate color suggestions</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">📋 Copy Ready</td>
                    <td className="px-3 py-2 border">One-click HEX copy</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">📱 Mobile Support</td>
                    <td className="px-3 py-2 border">Extract from gallery instantly</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">How to Use ColorSnap to Extract HEX Codes from an Image</h2>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Go to <a href="/" className="text-logo-orange underline hover:no-underline">colorsnap.design</a></li>
              <li>Click "Upload Image" and select a photo</li>
              <li>View the extracted colors (displayed as color blocks + HEX)</li>
              <li>Click any block to copy the HEX code</li>
              <li>Export palette as Tailwind/CSS/JSON if needed</li>
            </ol>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Real Example</h2>
            <p>Photo: <span className="font-mono bg-gray-100 px-2 py-1 rounded">sunset-beach.jpg</span></p>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              <span className="inline-block px-3 py-1 rounded bg-[#FF9642] text-white font-mono">#FF9642</span>
              <span className="inline-block px-3 py-1 rounded bg-[#2D2C6B] text-white font-mono">#2D2C6B</span>
              <span className="inline-block px-3 py-1 rounded bg-[#6E90C2] text-white font-mono">#6E90C2</span>
              <span className="inline-block px-3 py-1 rounded bg-[#F1ECE6] text-gray-800 font-mono">#F1ECE6</span>
              <span className="inline-block px-3 py-1 rounded bg-[#424242] text-white font-mono">#424242</span>
            </div>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>#FF9642 – Sunset Orange</li>
              <li>#2D2C6B – Deep Purple</li>
              <li>#6E90C2 – Cool Sky Blue</li>
              <li>#F1ECE6 – Sand White</li>
              <li>#424242 – Rock Gray</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Who Is This For?</h2>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>🎨 Designers picking colors from inspiration photos</li>
              <li>👩‍💻 Web developers translating image themes to UI styles</li>
              <li>🛍️ Marketers aligning ads with campaign visuals</li>
              <li>🖌️ Artists using real-world photos for digital work</li>
              <li>🧠 Brand teams extracting palette from product photos</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">FAQs</h2>
            <div className="space-y-4">
              <div>
                <strong>Q: How accurate is the HEX extraction?</strong>
                <p>A: Extremely accurate. We use pixel clustering and contrast-based filtering.</p>
              </div>
              <div>
                <strong>Q: Can I download the palette?</strong>
                <p>A: Yes, as HEX, CSS, Tailwind, or JSON.</p>
              </div>
              <div>
                <strong>Q: Do I need to create an account?</strong>
                <p>A: Nope! 100% free, no login required.</p>
              </div>
              <div>
                <strong>Q: Does it work on mobile?</strong>
                <p>A: Yes — upload directly from mobile gallery or camera.</p>
              </div>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Final Thoughts</h2>
            <p>HEX codes are the building blocks of modern design — and ColorSnap makes it easier than ever to grab them straight from real-world photos. Whether you're styling a website or designing for a client, you'll never struggle to find the perfect color again.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p className="font-semibold">Extract HEX codes from your next photo →<br /><a href="/" className="text-logo-orange underline hover:no-underline">Try ColorSnap Free</a></p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  </>
);

export default ExtractHexCodesFromPhotos; 