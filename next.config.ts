import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
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
