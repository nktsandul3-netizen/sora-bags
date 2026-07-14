import "server-only";

import { getBrandName, getFeaturedColorIndex, products } from "@/lib/data";
import type { Locale } from "@/lib/i18n";
import { localizeProductTitle } from "@/lib/product-i18n";
import type { SearchResultDTO } from "@/lib/search-types";

export function searchProducts(
  rawQuery: string,
  locale: Locale,
  limit = 8,
): SearchResultDTO[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  return products
    .filter((product) => {
      const localizedTitle = localizeProductTitle(product, locale);
      const brandName = getBrandName(product.brandSlug);
      return (
        product.title.toLowerCase().includes(query) ||
        localizedTitle.toLowerCase().includes(query) ||
        brandName.toLowerCase().includes(query)
      );
    })
    .slice(0, limit)
    .map((product) => {
      const color =
        product.colors[getFeaturedColorIndex(product)] ?? product.colors[0];
      const thumbSrc =
        color?.images?.[0]?.src ??
        product.images?.[0]?.src ??
        product.colors.flatMap((item) => item.images ?? [])[0]?.src;

      return {
        slug: product.slug,
        title: localizeProductTitle(product, locale),
        brandName: getBrandName(product.brandSlug),
        price: product.price,
        section: product.section,
        thumbSrc,
        thumbHex: color?.hex ?? "#d6d3d1",
      };
    });
}
