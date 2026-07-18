import type { Metadata } from "next";
import { Instrument_Serif, Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
import JsonLd from "@/components/JsonLd";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";

const GOOGLE_ADS_ID = "AW-18331915961";

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
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(`https://${brand.domain}`),
    title: {
      default: `${brand.name} — ${tagline}`,
      template: `%s — ${brand.name}`,
    },
    description,
    // Canonical + hreflang are set per-route via buildPageMetadata / page generateMetadata.
    // Do not set home canonical here — nested pages would inherit it.
    icons: {
      icon: [{ url: "/favicon.png", sizes: "800x800", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "800x800", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      siteName: brand.name,
      title: `${brand.name} — ${tagline}`,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${brand.name} Italy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} — ${tagline}`,
      description,
      images: ["/og-image.jpg"],
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebsiteJsonLd()} />
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
