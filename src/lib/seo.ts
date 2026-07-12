import type { Metadata } from "next";
import { brand } from "@/lib/config";
import { getBrandName, getFeaturedColorIndex } from "@/lib/data";
import { defaultLocale, locales, withLocalePath, type Locale } from "@/lib/i18n";
import {
  localizeColorName,
  localizeProductDescription,
  localizeProductTitle,
} from "@/lib/product-i18n";
import type { Product } from "@/lib/types";

export const siteOrigin = `https://${brand.domain}`;

export function absoluteUrl(pathname: string) {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteOrigin}${path}`;
}

export function localizedAbsoluteUrl(pathname: string, locale: Locale) {
  return absoluteUrl(withLocalePath(pathname, locale));
}

/** hreflang map for RU/RO/EN + x-default (Romanian is the storefront default). */
export function localeAlternates(pathname: string) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [locale, withLocalePath(pathname, locale)]),
  );
  languages["x-default"] = withLocalePath(pathname, defaultLocale);
  return languages;
}

function truncateSeoText(value: string, max = 158) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const clipped = text.slice(0, max - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 80 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

function productKindLabel(product: Product, locale: Locale) {
  if (product.section === "accessories") {
    if (locale === "ro") return "accesoriu din piele italiană";
    if (locale === "en") return "Italian leather accessory";
    return "итальянский кожаный аксессуар";
  }
  if (locale === "ro") return "geantă din piele italiană";
  if (locale === "en") return "Italian leather bag";
  return "итальянская кожаная сумка";
}

export function productSeoTitle(product: Product, locale: Locale) {
  const title = localizeProductTitle(product, locale);
  return `${title} — ${productKindLabel(product, locale)} | ${brand.name}`;
}

export function productSeoDescription(product: Product, locale: Locale) {
  const title = localizeProductTitle(product, locale);
  const colorIdx = getFeaturedColorIndex(product);
  const color = product.colors[colorIdx];
  const colorName = color ? localizeColorName(color, locale) : "";
  const description = localizeProductDescription(product, locale);
  const price = `${product.price} MDL`;

  const lead =
    locale === "ro"
      ? `${title}${colorName ? ` (${colorName})` : ""} — ${productKindLabel(product, locale)}. Preț ${price}. Livrare în Moldova.`
      : locale === "en"
        ? `${title}${colorName ? ` (${colorName})` : ""} — ${productKindLabel(product, locale)}. Price ${price}. Delivery across Moldova.`
        : `${title}${colorName ? ` (${colorName})` : ""} — ${productKindLabel(product, locale)}. Цена ${price}. Доставка по Молдове.`;

  return truncateSeoText(`${lead} ${description}`);
}

export function getProductPrimaryImage(product: Product) {
  const colorIdx = getFeaturedColorIndex(product);
  const colorImages = product.colors[colorIdx]?.images ?? [];
  const image = colorImages.find((img) => img.src) ?? product.images?.find((img) => img.src);
  return image?.src ? absoluteUrl(image.src) : absoluteUrl("/og-image.jpg");
}

function getProductImages(product: Product) {
  const colorIdx = getFeaturedColorIndex(product);
  const colorImages = (product.colors[colorIdx]?.images ?? [])
    .map((img) => img.src)
    .filter(Boolean);
  const fallback = (product.images ?? []).map((img) => img.src).filter(Boolean);
  const urls = [...colorImages, ...fallback].map((src) => absoluteUrl(src));
  return [...new Set(urls)].slice(0, 8);
}

function availabilityUrl(product: Product) {
  if (product.status === "out_of_stock") return "https://schema.org/OutOfStock";
  if (product.status === "pre_order") return "https://schema.org/PreOrder";
  return "https://schema.org/InStock";
}

export function buildPageMetadata({
  path,
  locale,
  title,
  description,
  absoluteTitle = false,
  index = true,
  image,
}: {
  path: string;
  locale: Locale;
  title: string;
  description?: string;
  absoluteTitle?: boolean;
  index?: boolean;
  image?: string;
}): Metadata {
  const canonical = withLocalePath(path, locale);
  const languages = localeAlternates(path);
  const ogImage = image ?? absoluteUrl("/og-image.jpg");

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    openGraph: {
      type: "website",
      siteName: brand.name,
      title,
      description,
      url: canonical,
      locale,
      alternateLocale: locales.filter((code) => code !== locale),
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export function buildProductJsonLd(
  product: Product,
  locale: Locale,
  breadcrumbs?: { name: string; path: string }[],
) {
  const title = localizeProductTitle(product, locale);
  const description = localizeProductDescription(product, locale);
  const url = localizedAbsoluteUrl(`/product/${product.slug}`, locale);
  const images = getProductImages(product);
  const brandName = getBrandName(product.brandSlug);

  const productLd: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: title,
    description: truncateSeoText(description, 300),
    image: images.length ? images : [absoluteUrl("/og-image.jpg")],
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    material: product.material,
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "MDL",
      price: String(product.price),
      availability: availabilityUrl(product),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: brand.name,
        url: siteOrigin,
      },
    },
  };

  const graph: Record<string, unknown>[] = [productLd];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: localizedAbsoluteUrl(crumb.path, locale),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.legalName,
    url: siteOrigin,
    logo: absoluteUrl("/favicon.png"),
    email: brand.email,
    telephone: brand.phones[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chișinău",
      addressCountry: "MD",
    },
    sameAs: [brand.social.instagram, brand.social.tiktok].filter(Boolean),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: siteOrigin,
    inLanguage: [...locales],
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: siteOrigin,
    },
  };
}
