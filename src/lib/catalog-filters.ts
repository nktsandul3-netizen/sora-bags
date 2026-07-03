import type { Locale } from "@/lib/i18n";
import { localizeColorName } from "@/lib/product-i18n";
import type { Product } from "@/lib/types";

export interface CatalogFilters {
  priceMin: string;
  priceMax: string;
  categories: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
  strapTypes: string[];
  closureTypes: string[];
  availability: string[];
}

export type MultiSelectFilterKey = Exclude<keyof CatalogFilters, "priceMin" | "priceMax">;

export interface CatalogFilterOption {
  value: string;
  label: string;
}

export interface CatalogFacets {
  categories: CatalogFilterOption[];
  colors: CatalogFilterOption[];
  materials: CatalogFilterOption[];
  sizes: CatalogFilterOption[];
  strapTypes: CatalogFilterOption[];
  closureTypes: CatalogFilterOption[];
  availability: CatalogFilterOption[];
}

export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  priceMin: "",
  priceMax: "",
  categories: [],
  colors: [],
  materials: [],
  sizes: [],
  strapTypes: [],
  closureTypes: [],
  availability: [],
};

const bagCategoryLabels: Record<string, string> = {
  "tote-bag": "Tote Bag",
  "shoulder-bag": "Shoulder Bag",
  "crossbody-bag": "Crossbody Bag",
  satchel: "Satchel",
  "hobo-bag": "Hobo Bag",
  "bucket-bag": "Bucket Bag",
  clutch: "Clutch",
  backpack: "Backpack",
  "mini-bag": "Mini Bag",
  "wallet-cardholder": "Wallet / Cardholder",
  "cosmetic-bag": "Cosmetic Bag",
  "travel-bag": "Travel Bag",
};

const sizeLabels: Record<string, Record<Locale, string>> = {
  mini: { ru: "Mini", ro: "Mini", en: "Mini" },
  small: { ru: "Small", ro: "Small", en: "Small" },
  medium: { ru: "Medium", ro: "Medium", en: "Medium" },
  large: { ru: "Large", ro: "Large", en: "Large" },
};

const strapTypeLabels: Record<string, Record<Locale, string>> = {
  "crossbody-strap": { ru: "Ремень crossbody", ro: "Curea crossbody", en: "Crossbody strap" },
  "shoulder-strap": { ru: "Плечевой ремень", ro: "Curea de umăr", en: "Shoulder strap" },
  "top-handle": { ru: "Верхняя ручка", ro: "Mâner superior", en: "Top handle" },
  "no-strap": { ru: "Без ремня", ro: "Fără curea", en: "No strap" },
};

const closureTypeLabels: Record<string, Record<Locale, string>> = {
  zipper: { ru: "Молния", ro: "Fermoar", en: "Zipper" },
  magnetic: { ru: "Магнит", ro: "Magnetic", en: "Magnetic" },
  flap: { ru: "Клапан", ro: "Clapetă", en: "Flap" },
  drawstring: { ru: "Шнурок", ro: "Șnur", en: "Drawstring" },
  "open-top": { ru: "Открытый верх", ro: "Deschisă sus", en: "Open top" },
};

const availabilityLabels: Record<string, Record<Locale, string>> = {
  "in-stock": { ru: "В наличии", ro: "În stoc", en: "In stock" },
  "out-of-stock": { ru: "Нет в наличии", ro: "Indisponibil", en: "Out of stock" },
};

function optionFromLabels(value: string, locale: Locale, labels: Record<string, Record<Locale, string>>) {
  return { value, label: labels[value]?.[locale] ?? labels[value]?.en ?? value };
}

function normalize(value: string) {
  return value.toLocaleLowerCase("ru").replace(/ё/g, "е");
}

function productText(product: Product) {
  return normalize(
    [
      product.slug,
      product.title,
      product.categorySlug,
      product.material,
      product.description,
      ...(product.highlights ?? []),
      ...(product.specs ?? []).flatMap((spec) => [spec.label, spec.value]),
    ].join(" "),
  );
}

function getSpecText(product: Product, labels: string[]) {
  const normalizedLabels = labels.map(normalize);
  return normalize(
    (product.specs ?? [])
      .filter((spec) => normalizedLabels.includes(normalize(spec.label)))
      .map((spec) => spec.value)
      .join(" "),
  );
}

function includesAny(text: string, needles: string[]) {
  return needles.some((needle) => text.includes(normalize(needle)));
}

function getProductCategories(product: Product) {
  const text = productText(product);
  const values = new Set<string>();
  const categorySlugs = [product.categorySlug, ...(product.additionalCategorySlugs ?? [])];

  if (categorySlugs.includes("tote-bags-women") || includesAny(text, ["tote", "тоут", "shopper", "шоппер"])) {
    values.add("tote-bag");
  }
  if (categorySlugs.includes("shoulder-bags-women") || includesAny(text, ["shoulder", "плечев", "на плече"])) {
    values.add("shoulder-bag");
  }
  if (categorySlugs.includes("crossbody-bags-women") || includesAny(text, ["crossbody", "кроссбоди", "через плечо"])) {
    values.add("crossbody-bag");
  }
  if (categorySlugs.includes("handbags-women") || categorySlugs.includes("bowling-bags") || includesAny(text, ["satchel", "kelly", "top handle", "боулинг"])) {
    values.add("satchel");
  }
  if (includesAny(text, ["hobo", "хобо"])) values.add("hobo-bag");
  if (categorySlugs.includes("bucket-bags-women") || includesAny(text, ["bucket", "мешок", "ведро"])) values.add("bucket-bag");
  if (categorySlugs.includes("clutches") || includesAny(text, ["clutch", "клатч", "pouch", "фермуар"])) {
    values.add("clutch");
  }
  if (includesAny(text, ["backpack", "рюкзак"])) values.add("backpack");
  if (includesAny(text, ["mini", "мини"])) values.add("mini-bag");
  if (categorySlugs.includes("womens-wallets-women") || categorySlugs.includes("card-holders-women") || includesAny(text, ["wallet", "cardholder", "card holder", "кошелек", "кошелёк", "картхолдер"])) {
    values.add("wallet-cardholder");
  }
  if (includesAny(text, ["cosmetic", "косметич"])) values.add("cosmetic-bag");
  if (includesAny(text, ["travel", "weekender", "путешеств", "дорожн"])) values.add("travel-bag");

  return [...values];
}

function getProductSizes(product: Product) {
  const text = productText(product);
  const sizeText = getSpecText(product, ["Размер", "Size", "Dimensiune"]);
  const numbers = [...sizeText.matchAll(/\d+(?:[.,]\d+)?/g)].map((match) => Number(match[0].replace(",", ".")));
  const maxDimension = numbers.length > 0 ? Math.max(...numbers) : undefined;

  if (includesAny(text, ["mini", "мини"])) return ["mini"];
  if (!maxDimension) return [];
  if (maxDimension <= 20) return ["mini"];
  if (maxDimension <= 27) return ["small"];
  if (maxDimension <= 35) return ["medium"];
  return ["large"];
}

function getProductStrapTypes(product: Product) {
  const text = productText(product);
  const strapText = getSpecText(product, ["Ремень", "Ручка", "Ручки", "Strap", "Handle", "Mâner", "Mânere"]);
  const values = new Set<string>();

  if (product.categorySlug === "crossbody-bags-women" || includesAny(text, ["crossbody", "кроссбоди", "через плечо"])) {
    values.add("crossbody-strap");
  }
  if (includesAny(strapText + " " + text, ["плечев", "на плече", "shoulder strap", "shoulder bag", "curea de umar", "curea de umăr"])) {
    values.add("shoulder-strap");
  }
  if (includesAny(strapText + " " + text, ["top handle", "верхняя ручка", "верхние ручки", "ручка", "ручки", "handle", "maner", "mâner"])) {
    values.add("top-handle");
  }
  if (product.categorySlug === "clutches" && values.size === 0) values.add("no-strap");

  return [...values];
}

function getProductClosureTypes(product: Product) {
  const text = getSpecText(product, ["Застёжка", "Застежка", "Замок", "Closure", "Închidere", "Încuietoare"]);
  const values = new Set<string>();

  if (includesAny(text, ["молни", "zip", "zipper", "fermoar"])) values.add("zipper");
  if (includesAny(text, ["магнит", "magnetic", "magnet"])) values.add("magnetic");
  if (includesAny(text, ["клапан", "flap", "clapet"])) values.add("flap");
  if (includesAny(text, ["шнур", "drawstring", "кулиск", "șnur", "snur"])) values.add("drawstring");
  if (includesAny(text, ["открытый верх", "open top", "без застеж", "без застёж"])) values.add("open-top");

  return [...values];
}

function getProductAvailability(product: Product) {
  if (product.status === "out_of_stock") return ["out-of-stock"];
  if (product.status === "pre_order") return [];
  return ["in-stock"];
}

function makeOptions(values: Set<string>, order: string[], labels: Record<string, string>) {
  return order
    .filter((value) => values.has(value))
    .map((value) => ({ value, label: labels[value] ?? value }));
}

function makeLocalizedOptions(values: Set<string>, order: string[], locale: Locale, labels: Record<string, Record<Locale, string>>) {
  return order.filter((value) => values.has(value)).map((value) => optionFromLabels(value, locale, labels));
}

export function countActiveCatalogFilters(filters: CatalogFilters) {
  return (
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0) +
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    filters.sizes.length +
    filters.strapTypes.length +
    filters.closureTypes.length +
    filters.availability.length
  );
}

export function buildCatalogFacets(products: Product[], locale: Locale): CatalogFacets {
  const categories = new Set<string>();
  const colors = new Set<string>();
  const materials = new Set<string>();
  const sizes = new Set<string>();
  const strapTypes = new Set<string>();
  const closureTypes = new Set<string>();
  const availability = new Set<string>();

  for (const product of products) {
    getProductCategories(product).forEach((value) => categories.add(value));
    product.colors.forEach((color) => colors.add(color.name));
    if (product.material) materials.add(product.material);
    getProductSizes(product).forEach((value) => sizes.add(value));
    getProductStrapTypes(product).forEach((value) => strapTypes.add(value));
    getProductClosureTypes(product).forEach((value) => closureTypes.add(value));
    getProductAvailability(product).forEach((value) => availability.add(value));
  }

  return {
    categories: makeOptions(categories, Object.keys(bagCategoryLabels), bagCategoryLabels),
    colors: [...colors]
      .sort((a, b) => localizeColorName(a, locale).localeCompare(localizeColorName(b, locale), locale))
      .map((value) => ({ value, label: localizeColorName(value, locale) })),
    materials: [...materials].sort((a, b) => a.localeCompare(b, locale)).map((value) => ({ value, label: value })),
    sizes: makeLocalizedOptions(sizes, ["mini", "small", "medium", "large"], locale, sizeLabels),
    strapTypes: makeLocalizedOptions(strapTypes, ["crossbody-strap", "shoulder-strap", "top-handle", "no-strap"], locale, strapTypeLabels),
    closureTypes: makeLocalizedOptions(closureTypes, ["zipper", "magnetic", "flap", "drawstring", "open-top"], locale, closureTypeLabels),
    availability: makeLocalizedOptions(availability, ["in-stock", "out-of-stock"], locale, availabilityLabels),
  };
}

function matchesSelected(selected: string[], values: string[]) {
  return selected.length === 0 || values.some((value) => selected.includes(value));
}

export function productMatchesCatalogFilters(product: Product, filters: CatalogFilters) {
  const min = filters.priceMin ? Number(filters.priceMin) : undefined;
  const max = filters.priceMax ? Number(filters.priceMax) : undefined;

  if (typeof min === "number" && !Number.isNaN(min) && product.price < min) return false;
  if (typeof max === "number" && !Number.isNaN(max) && product.price > max) return false;
  if (!matchesSelected(filters.categories, getProductCategories(product))) return false;
  if (!matchesSelected(filters.colors, product.colors.map((color) => color.name))) return false;
  if (!matchesSelected(filters.materials, product.material ? [product.material] : [])) return false;
  if (!matchesSelected(filters.sizes, getProductSizes(product))) return false;
  if (!matchesSelected(filters.strapTypes, getProductStrapTypes(product))) return false;
  if (!matchesSelected(filters.closureTypes, getProductClosureTypes(product))) return false;
  if (!matchesSelected(filters.availability, getProductAvailability(product))) return false;

  return true;
}
