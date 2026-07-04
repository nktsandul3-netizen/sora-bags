import {
  accessoryCategories,
  bagCategories,
  brands,
  getBrandName,
  getFeaturedColorIndex,
  products,
} from "@/lib/data";
import { localizeColorName, localizeProductTitle } from "@/lib/product-i18n";
import type { CategoryDef, Product } from "@/lib/types";

export interface CatalogCategoryGroup {
  category: CategoryDef;
  products: Product[];
}

export interface CatalogSection {
  id: "bags" | "accessories";
  title: string;
  categories: CatalogCategoryGroup[];
  productCount: number;
  coverImage?: string;
}

function getProductImage(product: Product): string | undefined {
  if (product.images?.[0]?.src) return product.images[0].src;

  const colorIdx = getFeaturedColorIndex(product);
  const color = product.colors[colorIdx] ?? product.colors[0];
  if (!color) return undefined;

  const images = (color.images ?? []).filter((img) => img.src);
  if (!images.length) return undefined;

  const front = images.find((img) =>
    /\/[^/]*front(?!-alt)[^/?]*\.(?:png|jpe?g|webp)$/i.test(img.src),
  );
  return front?.src ?? images[0]?.src;
}

export function getCatalogProductImage(product: Product): string | undefined {
  return getProductImage(product);
}

export function getCatalogColorNames(product: Product): string[] {
  return product.colors.map((color) => localizeColorName(color, "ru"));
}

export function getCatalogColorSwatches(product: Product): { name: string; hex: string }[] {
  return product.colors.map((color) => ({ name: localizeColorName(color, "ru"), hex: color.hex }));
}

/** Only products with a real photo belong in the printed catalog — no "photo coming soon" placeholders. */
function hasPrintableImage(product: Product): boolean {
  return Boolean(getProductImage(product));
}

export function getCatalogSections(): CatalogSection[] {
  const sortProducts = (items: Product[]) =>
    [...items]
      .filter(hasPrintableImage)
      .sort((a, b) => localizeProductTitle(a, "ru").localeCompare(localizeProductTitle(b, "ru"), "ru"));

  const bagGroups = bagCategories
    .map((category) => ({
      category,
      products: sortProducts(products.filter((p) => p.section === "bags" && p.categorySlug === category.slug)),
    }))
    .filter((group) => group.products.length > 0);

  const accessoryGroups = accessoryCategories
    .filter((category) => category.slug !== "vse-aksessuary")
    .map((category) => ({
      category,
      products: sortProducts(
        products.filter((p) => p.section === "accessories" && p.categorySlug === category.slug),
      ),
    }))
    .filter((group) => group.products.length > 0);

  const sections: CatalogSection[] = [
    {
      id: "bags",
      title: "Сумки",
      categories: bagGroups,
      productCount: bagGroups.reduce((sum, group) => sum + group.products.length, 0),
    },
    {
      id: "accessories",
      title: "Аксессуары",
      categories: accessoryGroups,
      productCount: accessoryGroups.reduce((sum, group) => sum + group.products.length, 0),
    },
  ];

  return sections
    .filter((section) => section.productCount > 0)
    .map((section) => {
      const firstProduct = section.categories[0]?.products[0];
      return {
        ...section,
        coverImage: firstProduct ? getProductImage(firstProduct) : undefined,
      };
    });
}

export function getCatalogSummary() {
  const sections = getCatalogSections();
  const totalProducts = sections.reduce((sum, section) => sum + section.productCount, 0);
  return {
    totalProducts,
    sections,
    brands: brands.map((brand) => brand.name),
    generatedAt: new Date(),
  };
}

export function getCatalogProductMeta(product: Product) {
  return {
    title: localizeProductTitle(product, "ru"),
    brand: getBrandName(product.brandSlug),
    image: getCatalogProductImage(product),
    colors: getCatalogColorNames(product),
    swatches: getCatalogColorSwatches(product),
    urlPath: `/product/${product.slug}`,
  };
}
