// Analytics configuration and utilities
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = "GA_MEASUREMENT_ID"; // Replace with your actual GA ID

// Initialize Google Analytics
export function initializeAnalytics() {
  if (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID !== "GA_MEASUREMENT_ID"
  ) {
    // Load Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track color extraction events
export function trackColorExtraction(colorsCount: number) {
  trackEvent("color_extraction", "engagement", "colors_extracted", colorsCount);
}

// Track code copy events
export function trackCodeCopy(codeType: string) {
  trackEvent("code_copy", "engagement", codeType);
}

// Track image upload events
export function trackImageUpload(fileSize: number) {
  trackEvent("image_upload", "engagement", "file_size", fileSize);
}
