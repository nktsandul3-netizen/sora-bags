import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Разрешаем максимальное качество для баннера
    qualities: [75, 90, 100],
  },
  async redirects() {
    return [
      { source: "/info/dostavka", destination: "/info/oplata-i-dostavka", permanent: true },
      { source: "/info/oplata", destination: "/info/oplata-i-dostavka", permanent: true },
    ];
  },
};

export default nextConfig;
