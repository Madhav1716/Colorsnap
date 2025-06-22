import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Palette, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

// Page-specific metadata for 404
const notFoundMetadata = {
  title: 'Page Not Found - ColorSnap | 404 Error',
  description: 'The page you\'re looking for doesn\'t exist. Return to ColorSnap\'s color palette generator or explore our other pages.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://colorsnap.design/404',
  },
};

const NotFound = () => {
  return (
    <>
      {/* SEO Metadata with react-helmet-async */}
      <Helmet>
        <title>{notFoundMetadata.title}</title>
        <meta name="description" content={notFoundMetadata.description} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={notFoundMetadata.alternates.canonical} />
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
                    <h1 className="text-xl sm:text-2xl font-bold text-logo-navy">
                      ColorSnap
                    </h1>
                    <p className="text-xs sm:text-sm text-logo-blue">
                      Images to Color Palettes
                    </p>
                  </div>
                </Link>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="text-logo-navy border-logo-navy hover:bg-logo-orange hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* 404 Error */}
            <div className="mb-8">
              <h1 className="text-8xl sm:text-9xl font-bold text-logo-navy mb-4">
                404
              </h1>
              <h2 className="text-3xl sm:text-4xl font-bold text-logo-navy mb-4">
                Page Not Found
              </h2>
              <p className="text-lg sm:text-xl text-logo-navy/80 mb-8 max-w-2xl mx-auto">
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link to="/">
                <Button size="lg" className="bg-logo-orange hover:bg-logo-orange-dark text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="border-logo-navy text-logo-navy hover:bg-logo-navy hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-logo-navy">Need Help?</CardTitle>
                <CardDescription className="text-logo-navy/80">
                  Here are some helpful pages to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link to="/" className="group">
                    <div className="text-center p-4 rounded-lg border-2 border-transparent group-hover:border-logo-orange transition-colors">
                      <Palette className="w-8 h-8 mx-auto mb-3 text-logo-orange" />
                      <h3 className="font-semibold text-logo-navy mb-2">Color Generator</h3>
                      <p className="text-sm text-logo-navy/80">
                        Extract colors from your images
                      </p>
                    </div>
                  </Link>
                  <Link to="/faq" className="group">
                    <div className="text-center p-4 rounded-lg border-2 border-transparent group-hover:border-logo-orange transition-colors">
                      <HelpCircle className="w-8 h-8 mx-auto mb-3 text-logo-orange" />
                      <h3 className="font-semibold text-logo-navy mb-2">FAQ</h3>
                      <p className="text-sm text-logo-navy/80">
                        Find answers to common questions
                      </p>
                    </div>
                  </Link>
                  <Link to="/about" className="group">
                    <div className="text-center p-4 rounded-lg border-2 border-transparent group-hover:border-logo-orange transition-colors">
                      <Info className="w-8 h-8 mx-auto mb-3 text-logo-orange" />
                      <h3 className="font-semibold text-logo-navy mb-2">About</h3>
                      <p className="text-sm text-logo-navy/80">
                        Learn more about ColorSnap
                      </p>
                    </div>
                  </Link>
                </div>
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

export default NotFound;
