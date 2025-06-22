import React from "react";
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Shield, Eye, Lock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Page-specific metadata for Privacy
const privacyMetadata = {
  title: 'Privacy Policy - ColorSnap | Your Data Stays Private',
  description:
    'Learn how ColorSnap protects your privacy. No data collection, local processing only. Your images never leave your device. Read our complete privacy policy.',
  keywords: [
    'ColorSnap privacy policy',
    'color palette tool privacy',
    'image color extractor privacy',
    'no data collection',
    'local processing',
    'privacy-first design tool',
    'ColorSnap data protection',
    'color extraction privacy',
    'browser-based color tool',
    'private color palette generator',
  ],
  openGraph: {
    title: 'Privacy Policy - ColorSnap | Your Data Stays Private',
    description:
      'Learn how ColorSnap protects your privacy. No data collection, local processing only. Your images never leave your device.',
    url: 'https://colorsnap.design/privacy',
    siteName: 'ColorSnap',
    images: [
      {
        url: 'https://colorsnap.design/privacy-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'ColorSnap privacy policy - protecting your data',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - ColorSnap | Your Data Stays Private',
    description:
      'Learn how ColorSnap protects your privacy. No data collection, local processing only.',
    images: ['https://colorsnap.design/privacy-preview.jpg'],
    creator: '@ColorSnapDesign',
    site: '@ColorSnapDesign',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://colorsnap.design/privacy',
  },
};

const Privacy = () => {
  const privacyFeatures = [
    {
      icon: Eye,
      title: "No Image Storage",
      description: "Your uploaded images are never stored on our servers. All processing happens locally in your browser.",
    },
    {
      icon: Lock,
      title: "Local Processing",
      description: "Color extraction happens entirely on your device. Your images never leave your computer or mobile device.",
    },
    {
      icon: Shield,
      title: "No Tracking",
      description: "We don't track your usage or collect personal information. Your privacy is our top priority.",
    },
  ];

  return (
    <>
      {/* SEO Metadata with react-helmet-async */}
      <Helmet>
        <title>{privacyMetadata.title}</title>
        <meta name="description" content={privacyMetadata.description} />
        <meta name="keywords" content={privacyMetadata.keywords.join(', ')} />
        <link rel="canonical" href={privacyMetadata.alternates.canonical} />
        {/* Open Graph */}
        <meta property="og:title" content={privacyMetadata.openGraph.title} />
        <meta property="og:description" content={privacyMetadata.openGraph.description} />
        <meta property="og:image" content={privacyMetadata.openGraph.images[0].url} />
        <meta property="og:image:alt" content={privacyMetadata.openGraph.images[0].alt} />
        <meta property="og:url" content={privacyMetadata.openGraph.url} />
        <meta property="og:type" content={privacyMetadata.openGraph.type} />
        <meta property="og:site_name" content={privacyMetadata.openGraph.siteName} />
        {/* Twitter */}
        <meta name="twitter:card" content={privacyMetadata.twitter.card} />
        <meta name="twitter:title" content={privacyMetadata.twitter.title} />
        <meta name="twitter:description" content={privacyMetadata.twitter.description} />
        <meta name="twitter:image" content={privacyMetadata.twitter.images[0]} />
        <meta name="twitter:creator" content={privacyMetadata.twitter.creator} />
        <meta name="twitter:site" content={privacyMetadata.twitter.site} />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy - ColorSnap',
            description: 'Learn how ColorSnap protects your privacy with no data collection and local processing only.',
            url: 'https://colorsnap.design/privacy',
            isPartOf: {
              '@type': 'WebSite',
              name: 'ColorSnap',
              url: 'https://colorsnap.design'
            },
            publisher: {
              '@type': 'Organization',
              name: 'ColorSnap'
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                      src="/favicon-512x512.png" 
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="text-[#23394a]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#23394a] mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your privacy is fundamental to ColorSnap. We believe in transparency and protecting your data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                Privacy-First
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-2" />
                No Data Collection
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-2" />
                Local Processing
              </div>
            </div>
          </div>

          {/* Privacy Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#23394a] text-center mb-12">
              How We Protect Your Privacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {privacyFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f5a94d] to-[#fc6c2c] rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-[#23394a] to-[#49a8b0] text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Try ColorSnap?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Experience privacy-first color extraction with complete peace of mind.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-[#23394a] hover:bg-gray-100"
                  onClick={() => window.location.href = '/'}
                >
                  Start Using ColorSnap
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Privacy; 