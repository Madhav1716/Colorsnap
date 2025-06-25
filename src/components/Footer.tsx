import React, { useState } from "react";
import { Twitter, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Handle email copy functionality
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("maddyisbuilding@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle newsletter signup (placeholder for form submission)
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your email service API (e.g., Buttondown, Mailchimp)
    console.log("Subscribed with email:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 2000);
  };

  return (
    <footer
      className="border-t bg-logo-light/80 backdrop-blur-sm mt-12 sm:mt-20"
      itemScope
      itemType="https://schema.org/WebApplication"
    >
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6 text-left">
          {/* ColorSnap Branding */}
          <div>
            <h3 className="font-semibold text-logo-navy mb-3">ColorSnap</h3>
            <p className="text-sm text-logo-navy/80">
              Transform your images into perfect color palettes instantly. Free,
              private, and lightning-fast color extraction tool.
            </p>
            <meta itemProp="name" content="ColorSnap" />
            <meta
              itemProp="description"
              content="Extract color palettes from images with HEX, RGB, and Tailwind CSS support. Free, private, and fast."
            />
            <meta itemProp="url" content="https://colorsnap.design" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-logo-navy mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="text-logo-blue hover:text-logo-orange text-sm block"
                aria-label="About ColorSnap">
                About ColorSnap
              </Link>
              <Link
                to="/faq"
                className="text-logo-blue hover:text-logo-orange text-sm block"
                aria-label="Frequently Asked Questions">
                Frequently Asked Questions
              </Link>
              <Link
                to="/privacy"
                className="text-logo-blue hover:text-logo-orange text-sm block focus:outline-logo-blue"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-logo-navy mb-3">Features</h3>
            <ul className="text-sm text-logo-navy/80 space-y-1">
              <li>HEX, RGB, HSL, CMYK, LAB formats</li>
              <li>Tailwind CSS integration</li>
              <li>Privacy-first processing</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col items-start text-left">
            <h3 className="font-semibold text-logo-navy mb-3">Connect With Us</h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-1 items-start sm:items-center relative">
              <button
                onClick={handleCopyEmail}
                className="text-gray-400 hover:text-logo-blue transition p-1 focus:outline-logo-blue"
                title="Copy email"
                aria-label="Copy email address"
              >
                <Mail size={18} strokeWidth={1.5} />
              </button>
              {copied && (
                <span className="absolute left-0 sm:left-auto sm:right-0 -bottom-7 sm:bottom-auto sm:top-8 flex items-center gap-1 text-xs font-semibold bg-logo-blue/90 text-white px-3 py-1 rounded-lg shadow-lg animate-fade-in-up z-10">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </span>
              )}
              <a
                href="https://x.com/colorsnapdesign"
                className="text-gray-400 hover:text-logo-blue transition p-1 focus:outline-logo-blue"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
              {/* <a
                href="https://instagram.com/colorsnapdesign"
                className="text-gray-400 hover:text-logo-blue transition p-1 focus:outline-logo-blue"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a> */}
            </div>
            {/* <h3 className="font-semibold text-logo-navy mt-4 mb-2">
              Stay Inspired
            </h3>
            <form
              onSubmit={handleNewsletterSignup}
              className="flex flex-col sm:flex-row gap-2 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="text-sm p-2 rounded border border-logo-navy/20 focus:outline-logo-blue"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="text-sm p-2 bg-logo-blue text-white rounded hover:bg-logo-orange focus:outline-logo-blue"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <span className="text-xs text-logo-blue mt-2">
                Thanks for subscribing!
              </span>
            )} */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-6 text-center text-logo-navy/80">
          <p className="mb-2 text-sm sm:text-base">
            © {new Date().getFullYear()} ColorSnap. Free and made for the creative
            community.
          </p>
          <p className="text-xs sm:text-sm">
            ColorSnap is a powerful online image color picker tool that extracts
            dominant colors from images. Use it to generate HEX codes, RGB values,
            Tailwind CSS color themes, and CSS Variables. Perfect for developers,
            designers, and digital creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;