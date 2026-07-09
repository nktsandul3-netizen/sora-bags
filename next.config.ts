import type { NextConfig } from "next";

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
    return [
      { source: "/info/dostavka", destination: "/info/oplata-i-dostavka", permanent: true },
      { source: "/info/oplata", destination: "/info/oplata-i-dostavka", permanent: true },
    ];
  },
};

export default nextConfig;
