import type { NextConfig } from "next";

const lumaProductSlugRedirects = [
  "tote-sand",
  "backpack-black",
  "belt-bag-black",
  "cosmetic-bag-beige",
  "bag-charm-cognac",
  "gift-set-black",
  "pegasus-leather-bag-charm",
  "dachshund-leather-bag-charm",
  "silk-bow-bag-charm",
  "dachshund-mix-bag-charm",
] as const;

const nextConfig: NextConfig = {
  // Allow opening the local site via 127.0.0.1 as well as localhost.
  // Without this, Next blocks /_next/* from 127.0.0.1 and client JS never hydrates
  // (hero slider won't auto-advance, dots won't work).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Hide the Next.js "N" badge so it doesn't cover checkout UI in local preview.
  devIndicators: false,
  outputFileTracingExcludes: {
    "/*": ["./public/**/*"],
  },
  images: {
    // Vercel Image Optimization currently returns 402
    // (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), which breaks product photos
    // in browsers. Masters are already WebP at catalog sizes — serve them
    // directly and skip the optimizer until the plan/quota is restored.
    unoptimized: true,
    formats: ["image/webp"],
    qualities: [75, 78, 80, 82, 85, 86, 88, 90, 92, 100],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 960, 1080, 1200, 1440, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/products/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-sora-bamboo-studio-mobile-v2.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-venezia-banner-poster-mobile-v2.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-sora-bamboo-studio-v3.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-venezia-banner-poster.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/tile-sale-mobile.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/tile-bags-mobile.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/banners/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/og-image.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/favicon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    const productRedirects = lumaProductSlugRedirects.flatMap((slug) => [
      {
        source: `/product/luma-${slug}`,
        destination: `/product/sora-${slug}`,
        permanent: true,
      },
      {
        source: `/:locale(ro|ru|en)/product/luma-${slug}`,
        destination: `/:locale/product/sora-${slug}`,
        permanent: true,
      },
    ]);

    return [
      { source: "/info/dostavka", destination: "/info/oplata-i-dostavka", permanent: true },
      { source: "/info/oplata", destination: "/info/oplata-i-dostavka", permanent: true },
      {
        source: "/brand/luma-atelier",
        destination: "/brand/sora-atelier",
        permanent: true,
      },
      {
        source: "/:locale(ro|ru|en)/brand/luma-atelier",
        destination: "/:locale/brand/sora-atelier",
        permanent: true,
      },
      ...productRedirects,
    ];
  },
};

export default nextConfig;
