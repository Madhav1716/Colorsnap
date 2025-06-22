# Next.js-Style Metadata System for PaletteLift

## Overview

This project now uses a Next.js-style metadata system that provides centralized, type-safe SEO management for your React application.

## 🎯 Features

- **Centralized Configuration**: All SEO metadata in one place (`src/metadata.ts`)
- **Type Safety**: Full TypeScript support
- **Dynamic Updates**: Update metadata programmatically
- **Next.js Compatible**: Similar API to Next.js metadata
- **Automatic Application**: Metadata applied on component mount

## 📁 File Structure

```
src/
├── metadata.ts              # Main metadata configuration
├── utils/
│   └── metadata.ts          # Metadata utility functions
├── hooks/
│   └── useMetadata.ts       # Custom hooks for metadata
└── pages/
    └── Index.tsx            # Example usage
```

## 🚀 Usage

### 1. Basic Usage in Components

```tsx
import { useMetadata } from "@/hooks/useMetadata";

const MyComponent = () => {
  // Apply default metadata
  useMetadata();

  return <div>My Component</div>;
};
```

### 2. Page-Specific Metadata

```tsx
import { usePageMetadata } from "@/hooks/useMetadata";

const AboutPage = () => {
  // Override specific metadata for this page
  usePageMetadata(
    "About Us - PaletteLift",
    "Learn more about PaletteLift and our mission",
    "/about-preview.jpg"
  );

  return <div>About Page</div>;
};
```

### 3. Dynamic Metadata Updates

```tsx
import { useMetadata } from "@/hooks/useMetadata";

const DynamicPage = () => {
  const { updateTitle, updateDescription } = useMetadata();

  const handleUserAction = () => {
    updateTitle("New Title - PaletteLift");
    updateDescription("Updated description");
  };

  return <div>Dynamic Page</div>;
};
```

## ⚙️ Configuration

### Main Metadata Configuration (`src/metadata.ts`)

```typescript
export const metadata = {
  title: "🎨 Extract Color Palette from Image – PaletteLift",
  description: "Upload image to get HEX, RGB, Tailwind CSS theme & CSS variables instantly...",
  keywords: ["extract color from image", "color palette generator", ...],
  openGraph: {
    title: "PaletteLift – Extract Color Palette from Image",
    description: "Get HEX, RGB, and Tailwind CSS themes from any image...",
    url: "https://palettelift.com",
    // ... more OG properties
  },
  twitter: {
    card: "summary_large_image",
    title: "PaletteLift – Extract Color Palette from Image",
    // ... more Twitter properties
  },
  // ... more metadata properties
};
```

### Available Metadata Properties

- **Basic**: `title`, `description`, `keywords`, `author`
- **Open Graph**: `openGraph.title`, `openGraph.description`, `openGraph.images`, etc.
- **Twitter**: `twitter.card`, `twitter.title`, `twitter.images`, etc.
- **SEO**: `robots`, `canonical`, `verification`
- **PWA**: `manifest`, `themeColor`, `appleWebApp`
- **Viewport**: `viewport.width`, `viewport.initialScale`

## 🔧 Customization

### Adding New Metadata Properties

1. **Update the metadata configuration** in `src/metadata.ts`
2. **Add handling logic** in `src/utils/metadata.ts`
3. **Update TypeScript types** if needed

### Example: Adding Custom Meta Tags

```typescript
// In src/metadata.ts
export const metadata = {
  // ... existing properties
  custom: {
    "custom-property": "custom-value",
    "another-property": "another-value",
  },
};

// In src/utils/metadata.ts
// Add handling in applyMetadata function
if (metadata.custom) {
  Object.entries(metadata.custom).forEach(([key, value]) => {
    updateMetaTag(key, value);
  });
}
```

## 🎨 Styling and Branding

### Updating Brand Information

To update your brand information, modify these properties in `src/metadata.ts`:

```typescript
export const metadata = {
  title: "Your Brand Name - Your Tagline",
  openGraph: {
    siteName: "Your Brand Name",
    // ...
  },
  twitter: {
    // ...
  },
  themeColor: "#your-brand-color",
  // ...
};
```

### Updating URLs

Replace all instances of `"https://palettelift.com"` with your actual domain:

```typescript
export const metadata = {
  openGraph: {
    url: "https://yourdomain.com",
    // ...
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
  metadataBase: new URL("https://yourdomain.com"),
  // ...
};
```

## 📱 PWA Support

The metadata system includes PWA support with:

- **Web Manifest**: Automatic manifest linking
- **Apple Touch Icons**: iOS home screen support
- **Theme Colors**: Browser UI theming
- **Viewport Settings**: Mobile optimization

## 🔍 SEO Features

### Automatic SEO Tags

The system automatically generates:

- ✅ Meta description
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Robots directives
- ✅ Structured data (JSON-LD)
- ✅ Favicon links
- ✅ Theme colors

### Search Engine Verification

Add your verification codes:

```typescript
export const metadata = {
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  // ...
};
```

## 🚀 Performance

### Optimizations

- **Lazy Loading**: Metadata applied only when needed
- **Efficient Updates**: Only changed properties are updated
- **Minimal DOM Manipulation**: Reuses existing meta tags when possible

### Best Practices

1. **Use the hook in page components** rather than individual components
2. **Avoid frequent metadata updates** during user interactions
3. **Cache metadata updates** for better performance
4. **Use descriptive titles** that include your brand name

## 🔄 Migration from Static Meta Tags

If you're migrating from static meta tags in `index.html`:

1. **Remove static meta tags** from `index.html`
2. **Add them to the metadata configuration** in `src/metadata.ts`
3. **Use the `useMetadata` hook** in your components
4. **Test thoroughly** to ensure all tags are applied correctly

## 🐛 Troubleshooting

### Common Issues

1. **Meta tags not updating**: Ensure you're using the hook in the correct component
2. **Duplicate meta tags**: The system automatically handles duplicates
3. **Missing properties**: Check that the property is handled in `applyMetadata()`

### Debug Mode

Add this to see metadata updates in the console:

```typescript
// In src/utils/metadata.ts
function updateMetaTag(name: string, content: string) {
  console.log(`Updating meta tag: ${name} = ${content}`);
  // ... existing code
}
```

## 📚 Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org Structured Data](https://schema.org/)

---

This metadata system provides a robust, maintainable solution for SEO management in your React application, following modern best practices and providing excellent developer experience.
