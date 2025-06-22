import { metadata } from "../metadata";

export function applyMetadata() {
  // Apply basic meta tags
  updateMetaTag("title", metadata.title);
  updateMetaTag("description", metadata.description);
  updateMetaTag("keywords", metadata.keywords.join(", "));
  updateMetaTag("author", metadata.creator);
  updateMetaTag(
    "robots",
    `${metadata.robots.index ? "index" : "noindex"}, ${
      metadata.robots.follow ? "follow" : "nofollow"
    }`
  );

  // Apply Open Graph tags
  updateMetaTag("og:title", metadata.openGraph.title);
  updateMetaTag("og:description", metadata.openGraph.description);
  updateMetaTag("og:url", metadata.openGraph.url);
  updateMetaTag("og:site_name", metadata.openGraph.siteName);
  updateMetaTag("og:type", metadata.openGraph.type);
  updateMetaTag("og:locale", metadata.openGraph.locale);

  if (metadata.openGraph.images && metadata.openGraph.images.length > 0) {
    const image = metadata.openGraph.images[0];
    updateMetaTag("og:image", image.url);
    updateMetaTag("og:image:width", image.width.toString());
    updateMetaTag("og:image:height", image.height.toString());
    updateMetaTag("og:image:alt", image.alt);
  }

  // Apply Twitter Card tags
  updateMetaTag("twitter:card", metadata.twitter.card);
  updateMetaTag("twitter:title", metadata.twitter.title);
  updateMetaTag("twitter:description", metadata.twitter.description);
  if (metadata.twitter.images && metadata.twitter.images.length > 0) {
    updateMetaTag("twitter:image", metadata.twitter.images[0]);
  }

  // Apply canonical URL
  updateLinkTag("canonical", metadata.alternates.canonical);

  // Apply theme color
  updateMetaTag("theme-color", metadata.themeColor);
  updateMetaTag("msapplication-TileColor", metadata.themeColor);

  // Apply viewport
  updateMetaTag(
    "viewport",
    `width=${metadata.viewport.width}, initial-scale=${metadata.viewport.initialScale}, maximum-scale=${metadata.viewport.maximumScale}`
  );

  // Apply format detection
  updateMetaTag(
    "format-detection",
    `email=${metadata.formatDetection.email ? "yes" : "no"}, address=${
      metadata.formatDetection.address ? "yes" : "no"
    }, telephone=${metadata.formatDetection.telephone ? "yes" : "no"}`
  );

  // Apply Apple-specific tags
  updateMetaTag(
    "apple-mobile-web-app-capable",
    metadata.appleWebApp.capable ? "yes" : "no"
  );
  updateMetaTag(
    "apple-mobile-web-app-status-bar-style",
    metadata.appleWebApp.statusBarStyle
  );
  updateMetaTag("apple-mobile-web-app-title", metadata.appleWebApp.title);

  // Apply other meta tags
  if (metadata.other) {
    Object.entries(metadata.other).forEach(([key, value]) => {
      updateMetaTag(key, value);
    });
  }

  // Apply verification codes
  if (metadata.verification) {
    Object.entries(metadata.verification).forEach(([key, value]) => {
      if (value) {
        updateMetaTag(`${key}-site-verification`, value);
      }
    });
  }
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

// Function to update title specifically
export function updateTitle(title: string) {
  document.title = title;
}

// Function to update description specifically
export function updateDescription(description: string) {
  updateMetaTag("description", description);
}

// Function to update Open Graph image
export function updateOGImage(
  imageUrl: string,
  width = 1200,
  height = 630,
  alt = ""
) {
  updateMetaTag("og:image", imageUrl);
  updateMetaTag("og:image:width", width.toString());
  updateMetaTag("og:image:height", height.toString());
  if (alt) {
    updateMetaTag("og:image:alt", alt);
  }
}
