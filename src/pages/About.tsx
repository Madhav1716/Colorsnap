import React from 'react';
import { Palette, Code2, Shield, Zap, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { usePageMetadata } from "@/hooks/useMetadata";

// Page-specific metadata
const aboutMetadata = {
  title: 'About ColorSnap - Free Color Palette Generator for Designers',
  description:
    'Learn about ColorSnap, a free, privacy-first tool for extracting color palettes from images. Built for designers and developers with HEX, RGB, and Tailwind CSS support.',
  keywords: [
    'ColorSnap about',
    'color palette generator about',
    'free color palette tool',
    'privacy-first design tool',
    'color extraction tool for designers',
    'about ColorSnap color palette generator',
    'best color palette tool for developers',
  ],
  openGraph: {
    title: 'About ColorSnap - Free Color Palette Generator',
    description:
      'Discover ColorSnap\'s mission to empower designers with free, privacy-first color palette extraction. Supports HEX, RGB, and Tailwind CSS.',
    url: 'https://colorsnap.design/about',
    siteName: 'ColorSnap',
    images: [
      {
        url: 'https://colorsnap.design/about-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'ColorSnap team building free color palette generator',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ColorSnap - Free Color Palette Generator',
    description:
      'Learn about ColorSnap\'s mission to provide free, privacy-first color palette extraction for designers and developers.',
    images: ['https://colorsnap.design/about-preview.jpg'],
    creator: '@ColorSnapDesign',
    site: '@ColorSnapDesign',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://colorsnap.design/about',
  },
};

const features = [
  {
    icon: Palette,
    title: 'Advanced Color Extraction',
    description:
      'Uses ColorThief algorithm to extract dominant colors from any image with precision and accuracy.',
  },
  {
    icon: Code2,
    title: 'Developer-Ready Output',
    description:
      'Get HEX, RGB, HSL, CMYK, and LAB color codes plus ready-to-use Tailwind CSS and CSS variables.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Design',
    description:
      'All processing happens in your browser. Your images never leave your device, ensuring complete privacy.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant color extraction powered by optimized algorithms. No waiting, no delays.',
  },
  {
    icon: Users,
    title: 'Built for Professionals',
    description:
      'Designed for designers, developers, and digital creators who need reliable color tools.',
  },
  {
    icon: Heart,
    title: 'Completely Free',
    description:
      'No registration, no hidden fees, no limitations. Use ColorSnap for any project, commercial or personal.',
  },
];

const useCases = [
  {
    title: 'Web Design',
    description:
      'Extract brand colors from logos and create cohesive color schemes for websites and applications.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Generate color palettes from inspiration images to maintain visual consistency across interfaces.',
  },
  {
    title: 'Brand Development',
    description:
      'Analyze competitor branding or create color schemes from mood boards and inspiration images.',
  },
  {
    title: 'Content Creation',
    description:
      'Match colors from photos for social media graphics, presentations, and digital content.',
  },
  {
    title: 'Development',
    description:
      'Get instant Tailwind CSS color codes and CSS variables for rapid prototyping and development.',
  },
  {
    title: 'Print Design',
    description:
      'Extract colors for print materials, ensuring consistency between digital and physical media.',
  },
];

const About: React.FC = () => {
  const navigate = useNavigate();

  usePageMetadata(
    aboutMetadata.title,
    aboutMetadata.description,
    aboutMetadata.openGraph.images[0]?.url
  );

  return (
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
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-vivid-teal">
                      ColorSnap
                    </h1>
                    <p className="text-xs sm:text-sm text-dark-charcoal">
                      Images to Color Palettes
                    </p>
                  </div>
                </Link>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-dark-charcoal border-dark-charcoal hover:bg-vivid-teal hover:text-white"
                aria-label="Return to previous page"
              >
                ← Back to Tool
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dark-charcoal mb-6">
              About ColorSnap
            </h1>
            <p className="text-lg sm:text-xl text-slate-gray mb-8">
              ColorSnap is a powerful, privacy-first color extraction tool designed for modern designers and developers.
              We believe great design starts with great colors, and we're here to make color palette creation effortless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center text-sm text-slate-gray">
                <Shield className="w-4 h-4 mr-2 text-vivid-teal" />
                Privacy-First
              </div>
              <div className="flex items-center text-sm text-slate-gray">
                <Zap className="w-4 h-4 mr-2 text-vivid-teal" />
                Lightning Fast
              </div>
              <div className="flex items-center text-sm text-slate-gray">
                <Heart className="w-4 h-4 mr-2 text-vivid-teal" />
                Completely Free
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-dark-charcoal text-center mb-12">
              Why Choose ColorSnap?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  role="region"
                  aria-label={feature.title}
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-vivid-teal to-bright-coral rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-dark-charcoal">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-gray">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-dark-charcoal text-center mb-12">
              Perfect For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  role="region"
                  aria-label={useCase.title}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-charcoal">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-gray">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-vivid-teal to-bright-coral text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Extract Colors?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Start creating beautiful color palettes from your images today.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-white text-dark-charcoal px-6 py-3 rounded-lg hover:bg-slate-100 focus:ring-2 focus:ring-soft-lavender"
                  aria-label="Try ColorSnap color palette generator"
                >
                  Try ColorSnap Now
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
  );
};

export default About;