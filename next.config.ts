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
  // Hide the Next.js "N" badge so it doesn't cover checkout UI in local preview.
  devIndicators: false,
  outputFileTracingExcludes: {
    "/*": ["./public/**/*"],
  },
  images: {
    qualities: [75, 86, 90, 100],
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
