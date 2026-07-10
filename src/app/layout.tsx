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
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { locales, withLocalePath } from "@/lib/i18n";

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const tagline = t("brand.tagline");
  const description = t("brand.description");
  const languages = Object.fromEntries(
    locales.map((code) => [code, withLocalePath("/", code)]),
  ) as Record<string, string>;

  return {
    metadataBase: new URL(`https://${brand.domain}`),
    title: {
      default: `${brand.name} — ${tagline}`,
      template: `%s — ${brand.name}`,
    },
    description,
    alternates: {
      languages,
    },
    other: {
      google: "notranslate",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  return (
    <html
      lang={locale}
      translate="no"
      className={`${inter.variable} ${playfair.variable} ${instrumentSerif.variable} notranslate h-full antialiased`}
    >
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
