// Performance monitoring utilities
// Track Core Web Vitals and other performance metrics

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

// Track Core Web Vitals
export function trackCoreWebVitals() {
  if (typeof window === "undefined") return;

  // First Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const fcp = entries[entries.length - 1];
    console.log("FCP:", fcp.startTime);
    // Send to analytics
    trackPerformanceMetric("FCP", fcp.startTime);
  }).observe({ entryTypes: ["paint"] });

  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lcp = entries[entries.length - 1];
    console.log("LCP:", lcp.startTime);
    trackPerformanceMetric("LCP", lcp.startTime);
  }).observe({ entryTypes: ["largest-contentful-paint"] });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      const firstInputEntry = entry as FirstInputEntry;
      console.log(
        "FID:",
        firstInputEntry.processingStart - firstInputEntry.startTime
      );
      trackPerformanceMetric(
        "FID",
        firstInputEntry.processingStart - firstInputEntry.startTime
      );
    });
  }).observe({ entryTypes: ["first-input"] });

  // Cumulative Layout Shift
  new PerformanceObserver((entryList) => {
    let cls = 0;
    entryList.getEntries().forEach((entry) => {
      const layoutShiftEntry = entry as LayoutShiftEntry;
      if (!layoutShiftEntry.hadRecentInput) {
        cls += layoutShiftEntry.value;
      }
    });
    console.log("CLS:", cls);
    trackPerformanceMetric("CLS", cls);
  }).observe({ entryTypes: ["layout-shift"] });
}

// Track Time to First Byte
export function trackTTFB() {
  if (typeof window === "undefined") return;

  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  if (navigation) {
    const ttfb = navigation.responseStart - navigation.requestStart;
    console.log("TTFB:", ttfb);
    trackPerformanceMetric("TTFB", ttfb);
  }
}

// Track image load performance
export function trackImageLoad(imageUrl: string) {
  const startTime = performance.now();

  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Image load time for ${imageUrl}:`, loadTime);
      trackPerformanceMetric("IMAGE_LOAD", loadTime, imageUrl);
      resolve();
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${imageUrl}`);
      resolve();
    };
    img.src = imageUrl;
  });
}

// Track color extraction performance
export function trackColorExtractionPerformance(startTime: number) {
  const extractionTime = performance.now() - startTime;
  console.log("Color extraction time:", extractionTime);
  trackPerformanceMetric("COLOR_EXTRACTION", extractionTime);
}

// Send performance metrics to analytics
function trackPerformanceMetric(metric: string, value: number, label?: string) {
  // You can integrate this with your analytics service
  // For now, we'll just log it
  console.log(
    `Performance Metric - ${metric}:`,
    value,
    label ? `(${label})` : ""
  );

  // Example: Send to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "performance_metric", {
      event_category: "performance",
      event_label: metric,
      value: Math.round(value),
      custom_parameter: label,
    });
  }
}

// Get overall performance score
export function getPerformanceScore(): number {
  if (typeof window === "undefined") return 0;

  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  if (!navigation) return 0;

  // Simple scoring based on load time
  const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

  if (loadTime < 1000) return 100;
  if (loadTime < 2000) return 90;
  if (loadTime < 3000) return 80;
  if (loadTime < 4000) return 70;
  if (loadTime < 5000) return 60;
  return 50;
}

// Initialize performance tracking
export function initializePerformanceTracking() {
  trackCoreWebVitals();
  trackTTFB();

  // Track performance after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const score = getPerformanceScore();
      console.log("Performance Score:", score);
      trackPerformanceMetric("PERFORMANCE_SCORE", score);
    }, 1000);
  });
}
