import type { MetadataRoute } from "next";
import {
  brands,
  products,
  shopAccessoryMenuCategories,
  shopBagMenuCategories,
} from "@/lib/data";
import { infoPages } from "@/lib/info";
import { locales, withLocalePath } from "@/lib/i18n";
import { siteOrigin, sitemapLanguageAlternates } from "@/lib/seo";

const staticPaths = [
  "/",
  "/bags",
  "/accessories",
  "/new",
  "/sale",
  "/bestsellers",
  "/brands",
  "/contacts",
  "/collections/amalfi-woven",
  "/collections/venezia-intreccio",
  "/capsule/blue",
  "/info/nashi-magaziny",
] as const;

function entry(
  pathname: string,
  options: {
    priority?: number;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  } = {},
): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = sitemapLanguageAlternates(pathname);

  return locales.map((locale) => ({
    url: `${siteOrigin}${withLocalePath(pathname, locale)}`,
    lastModified: now,
    changeFrequency: options.changeFrequency ?? "weekly",
    priority: options.priority ?? 0.7,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    urls.push(
      ...entry(path, {
        priority: path === "/" ? 1 : path === "/bags" || path === "/accessories" ? 0.9 : 0.8,
        changeFrequency: path === "/" ? "daily" : "weekly",
      }),
    );
  }

  for (const category of shopBagMenuCategories) {
    urls.push(...entry(`/bags/${category.slug}`, { priority: 0.8 }));
  }

  for (const category of shopAccessoryMenuCategories) {
    urls.push(...entry(`/accessories/${category.slug}`, { priority: 0.75 }));
  }

  for (const product of products) {
    urls.push(
      ...entry(`/product/${product.slug}`, {
        priority: 0.85,
        changeFrequency: "weekly",
      }),
    );
  }

  for (const brandItem of brands) {
    urls.push(...entry(`/brand/${brandItem.slug}`, { priority: 0.6 }));
  }

  for (const page of infoPages) {
    urls.push(
      ...entry(`/info/${page.slug}`, {
        priority: 0.5,
        changeFrequency: "monthly",
      }),
    );
  }

  return urls;
}
