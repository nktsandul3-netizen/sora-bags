import type { MetadataRoute } from "next";
import {
  brands,
  products,
  productsByBrand,
  shopAccessoryMenuCategories,
  shopBagMenuCategories,
} from "@/lib/data";
import { infoPages } from "@/lib/info";
import { locales, withLocalePath } from "@/lib/i18n";
import { siteOrigin } from "@/lib/seo";

/**
 * Indexable storefront paths (locale-agnostic).
 * Excludes cart/account/wishlist/admin/auth/print, redirects, and query/filter URLs.
 */
const staticPaths = [
  "/",
  "/bags",
  "/accessories",
  "/new",
  "/sale",
  "/bestsellers",
  "/contacts",
  "/collections/amalfi-woven",
  "/collections/venezia-intreccio",
  "/capsule/blue",
] as const;

function isActiveProduct(status: (typeof products)[number]["status"]) {
  // Keep in_stock / pre_order / undefined (treated as available in catalog).
  return status !== "out_of_stock";
}

function collectCanonicalPaths(): string[] {
  const paths = new Set<string>();

  for (const path of staticPaths) {
    paths.add(path);
  }

  for (const category of shopBagMenuCategories) {
    paths.add(`/bags/${category.slug}`);
  }

  for (const category of shopAccessoryMenuCategories) {
    paths.add(`/accessories/${category.slug}`);
  }

  for (const product of products) {
    if (!product.slug || !isActiveProduct(product.status)) continue;
    paths.add(`/product/${product.slug}`);
  }

  for (const brandItem of brands) {
    if (productsByBrand(brandItem.slug).some((p) => isActiveProduct(p.status))) {
      paths.add(`/brand/${brandItem.slug}`);
    }
  }

  for (const page of infoPages) {
    paths.add(`/info/${page.slug}`);
  }

  return [...paths].sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  for (const pathname of collectCanonicalPaths()) {
    for (const locale of locales) {
      const url = `${siteOrigin}${withLocalePath(pathname, locale)}`;
      if (seen.has(url)) continue;
      seen.add(url);
      // No lastModified: catalog data has no reliable updatedAt.
      // No changeFrequency / priority: optional and often ignored by Google.
      entries.push({ url });
    }
  }

  return entries;
}
