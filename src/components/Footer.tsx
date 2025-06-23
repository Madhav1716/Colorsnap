import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-logo-light/80 backdrop-blur-sm mt-12 sm:mt-20">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-logo-navy mb-3">ColorSnap</h3>
            <p className="text-sm text-logo-navy/80">
              Transform your images into perfect color palettes instantly.
              Free, private, and lightning-fast color extraction tool.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-logo-navy mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="text-logo-blue hover:text-logo-orange text-sm block"
                aria-label="About ColorSnap"
              >
                About ColorSnap
              </Link>
              <Link
                to="/faq"
                className="text-logo-blue hover:text-logo-orange text-sm block"
                aria-label="Frequently Asked Questions"
              >
                Frequently Asked Questions
              </Link>
              <Link
                to="/privacy"
                className="text-logo-blue hover:text-logo-orange text-sm block"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-logo-navy mb-3">Features</h3>
            <ul className="text-sm text-logo-navy/80 space-y-1">
              <li>HEX, RGB, HSL, CMYK, LAB formats</li>
              <li>Tailwind CSS integration</li>
              <li>Privacy-first processing</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-logo-navy/80">
          <p className="mb-2 text-sm sm:text-base">
            Free, open, and made for the creative community.
          </p>
          <p className="text-xs sm:text-sm">
            ColorSnap is a powerful online image color picker tool that extracts dominant colors
            from images. Use it to generate HEX codes, RGB values, Tailwind CSS color themes, and
            CSS Variables. Perfect for developers, designers, and digital creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 