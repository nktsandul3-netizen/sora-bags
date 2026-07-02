import { compareByNewest, productHasPhotos, products } from "@/lib/data";
import type { Product } from "@/lib/types";

function getCategorySlugs(product: Product): string[] {
  return [product.categorySlug, ...(product.additionalCategorySlugs ?? [])];
}

function categoryOverlap(source: Product, candidate: Product): number {
  const sourceCategories = new Set(getCategorySlugs(source));
  return getCategorySlugs(candidate).filter((slug) => sourceCategories.has(slug)).length;
}

function isOnSale(product: Product): boolean {
  return Boolean(product.oldPrice && product.oldPrice > product.price);
}

function availabilityScore(product: Product): number {
  if (product.status === "out_of_stock") return -100;
  if (product.status === "pre_order") return -5;
  return 0;
}

function preferredSection(sources: Product[]): "bags" | "accessories" | undefined {
  if (sources.length === 0) return undefined;

  const bagCount = sources.filter((product) => product.section === "bags").length;
  return bagCount >= sources.length / 2 ? "bags" : "accessories";
}

function scoreCandidate(
  candidate: Product,
  sources: Product[],
  targetPrice?: number,
): number {
  if (sources.length === 0) {
    let score = 0;
    if (candidate.isNew) score += 10;
    if (isOnSale(candidate)) score += 6;
    score += availabilityScore(candidate);
    return score;
  }

  let score = 0;
  const maxOverlap = Math.max(...sources.map((source) => categoryOverlap(source, candidate)));
  score += maxOverlap * 30;

  const section = preferredSection(sources);
  if (section && candidate.section === section) score += 25;

  if (sources.some((source) => source.brandSlug === candidate.brandSlug)) score += 5;

  if (targetPrice) {
    const diff = Math.abs(candidate.price - targetPrice) / targetPrice;
    if (diff <= 0.15) score += 15;
    else if (diff <= 0.35) score += 8;
  }

  if (candidate.isNew) score += 8;
  if (isOnSale(candidate)) score += 6;
  score += availabilityScore(candidate);

  return score;
}

function pickWithCategoryDiversity(scored: Array<{ product: Product; score: number }>, limit: number): Product[] {
  const picked: Product[] = [];
  const categoryCounts = new Map<string, number>();

  for (const { product } of scored) {
    if (picked.length >= limit) break;

    const count = categoryCounts.get(product.categorySlug) ?? 0;
    if (picked.length >= 2 && count >= 2) continue;

    picked.push(product);
    categoryCounts.set(product.categorySlug, count + 1);
  }

  if (picked.length < limit) {
    for (const { product } of scored) {
      if (picked.length >= limit) break;
      if (!picked.some((item) => item.slug === product.slug)) picked.push(product);
    }
  }

  return picked.slice(0, limit);
}

export function getProductRecommendations(
  sourceSlugs: string[],
  options: {
    limit?: number;
    excludeSlugs?: string[];
    section?: "bags" | "accessories";
  } = {},
): Product[] {
  const limit = options.limit ?? 4;
  const exclude = new Set([...(options.excludeSlugs ?? []), ...sourceSlugs]);

  const sources = sourceSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean) as Product[];

  const targetPrice =
    sources.length > 0
      ? sources.reduce((sum, product) => sum + product.price, 0) / sources.length
      : undefined;

  const section = options.section ?? preferredSection(sources);

  const pool = products.filter((product) => {
    if (!productHasPhotos(product) || exclude.has(product.slug)) return false;
    if (section && product.section !== section) return false;
    return true;
  });

  const scored = pool
    .map((product) => ({
      product,
      score: scoreCandidate(product, sources, targetPrice),
    }))
    .sort((a, b) => b.score - a.score || compareByNewest(a.product, b.product));

  return pickWithCategoryDiversity(scored, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getProductRecommendations([product.slug], {
    limit,
    excludeSlugs: [product.slug],
    section: product.section,
  });
}

export function getCartRecommendations(cartSlugs: string[], limit = 3): Product[] {
  if (cartSlugs.length === 0) {
    return getProductRecommendations([], {
      limit,
      section: "bags",
    });
  }

  return getProductRecommendations(cartSlugs, {
    limit,
    excludeSlugs: cartSlugs,
  });
}

export function getAccountRecommendations(purchasedSlugs: string[], limit = 4): Product[] {
  const uniqueSlugs = [...new Set(purchasedSlugs)];

  if (uniqueSlugs.length > 0) {
    return getProductRecommendations(uniqueSlugs, {
      limit,
      excludeSlugs: uniqueSlugs,
    });
  }

  return getCartRecommendations([], limit);
}
