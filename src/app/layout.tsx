import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/config";
import { CartProvider } from "@/context/cart";
import { WishlistProvider } from "@/context/wishlist";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import StorefrontChrome from "@/components/StorefrontChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-stone-900">
        <SessionProviderWrapper>
          <CartProvider>
            <WishlistProvider>
              <StorefrontChrome
                announcementBar={<AnnouncementBar />}
                header={<Header />}
                footer={<Footer />}
              >
                {children}
              </StorefrontChrome>
            </WishlistProvider>
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}