import type { Metadata } from "next";
import { Instrument_Serif, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/config";
import { CartProvider } from "@/context/cart";
import { WishlistProvider } from "@/context/wishlist";
import { LocaleProvider } from "@/context/locale";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StorefrontChrome from "@/components/StorefrontChrome";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getServerLocale } from "@/lib/server-i18n";

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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-stone-900">
        <LocaleProvider locale={locale}>
          <SessionProviderWrapper>
            <CartProvider>
              <WishlistProvider>
                <AnalyticsTracker />
                <StorefrontChrome header={<Header />} footer={<Footer />}>
                  {children}
                </StorefrontChrome>
              </WishlistProvider>
            </CartProvider>
          </SessionProviderWrapper>
        </LocaleProvider>
      </body>
    </html>
  );
}