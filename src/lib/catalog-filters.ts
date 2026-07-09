import type { Locale } from "@/lib/i18n";
import { COLOR_FAMILY_ORDER, colorFamilyLabel, colorFamilySwatch, getColorFamilies } from "@/lib/color-taxonomy";
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

export type CatalogSortKey = "new" | "price-asc" | "price-desc";

export type MultiSelectFilterKey = Exclude<keyof CatalogFilters, "priceMin" | "priceMax">;

export interface CatalogFilterOption {
  value: string;
  label: string;
  /** Цвет кружка-иконки (только для фильтра по цвету). */
  swatch?: string;
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

/** Precomputed attributes for O(1) filter matching. */
export interface ProductFilterIndex {
  product: Product;
  categories: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
  strapTypes: string[];
  closureTypes: string[];
  availability: string[];
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

const MULTI_FILTER_KEYS: MultiSelectFilterKey[] = [
  "categories",
  "colors",
  "materials",
  "sizes",
  "strapTypes",
  "closureTypes",
  "availability",
];

/** URL query keys — short, stable, only non-default values are written. */
const URL_KEYS = {
  priceMin: "min",
  priceMax: "max",
  categories: "cat",
  colors: "color",
  materials: "mat",
  sizes: "size",
  strapTypes: "strap",
  closureTypes: "close",
  availability: "avail",
  sort: "sort",
} as const;

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
  const colorFamilies = new Set<string>();
  const materials = new Set<string>();
  const sizes = new Set<string>();
  const strapTypes = new Set<string>();
  const closureTypes = new Set<string>();
  const availability = new Set<string>();
  const seen = new Set<string>();

  for (const product of products) {
    if (seen.has(product.slug)) continue;
    seen.add(product.slug);

    getProductCategories(product).forEach((value) => categories.add(value));
    product.colors.forEach((color) =>
      getColorFamilies(color.name).forEach((family) => colorFamilies.add(family)),
    );
    if (product.material) materials.add(product.material);
    getProductSizes(product).forEach((value) => sizes.add(value));
    getProductStrapTypes(product).forEach((value) => strapTypes.add(value));
    getProductClosureTypes(product).forEach((value) => closureTypes.add(value));
    getProductAvailability(product).forEach((value) => availability.add(value));
  }

  return {
    categories: makeOptions(categories, Object.keys(bagCategoryLabels), bagCategoryLabels),
    colors: COLOR_FAMILY_ORDER.filter((key) => colorFamilies.has(key)).map((key) => ({
      value: key,
      label: colorFamilyLabel(key, locale),
      swatch: colorFamilySwatch(key),
    })),
    materials: [...materials]
      .sort((a, b) => a.localeCompare(b, locale))
      .map((value) => ({ value, label: value })),
    sizes: makeLocalizedOptions(sizes, ["mini", "small", "medium", "large"], locale, sizeLabels),
    strapTypes: makeLocalizedOptions(
      strapTypes,
      ["crossbody-strap", "shoulder-strap", "top-handle", "no-strap"],
      locale,
      strapTypeLabels,
    ),
    closureTypes: makeLocalizedOptions(
      closureTypes,
      ["zipper", "magnetic", "flap", "drawstring", "open-top"],
      locale,
      closureTypeLabels,
    ),
    availability: makeLocalizedOptions(
      availability,
      ["in-stock", "out-of-stock"],
      locale,
      availabilityLabels,
    ),
  };
}

/** Within one facet: OR. Across facets: AND. Empty facet = no constraint. */
function matchesSelected(selected: string[], values: string[]) {
  if (selected.length === 0) return true;
  const valueSet = new Set(values);
  return selected.some((value) => valueSet.has(value));
}

function parsePriceBound(raw: string): number | undefined {
  if (!raw.trim()) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function buildProductFilterIndex(product: Product): ProductFilterIndex {
  return {
    product,
    categories: getProductCategories(product),
    colors: product.colors.flatMap((color) => getColorFamilies(color.name)),
    materials: product.material ? [product.material] : [],
    sizes: getProductSizes(product),
    strapTypes: getProductStrapTypes(product),
    closureTypes: getProductClosureTypes(product),
    availability: getProductAvailability(product),
  };
}

export function buildProductFilterIndexes(products: Product[]): ProductFilterIndex[] {
  const seen = new Set<string>();
  const indexes: ProductFilterIndex[] = [];
  for (const product of products) {
    if (seen.has(product.slug)) continue;
    seen.add(product.slug);
    indexes.push(buildProductFilterIndex(product));
  }
  return indexes;
}

export function indexMatchesCatalogFilters(index: ProductFilterIndex, filters: CatalogFilters) {
  const min = parsePriceBound(filters.priceMin);
  const max = parsePriceBound(filters.priceMax);

  if (min !== undefined && index.product.price < min) return false;
  if (max !== undefined && index.product.price > max) return false;
  if (!matchesSelected(filters.categories, index.categories)) return false;
  if (!matchesSelected(filters.colors, index.colors)) return false;
  if (!matchesSelected(filters.materials, index.materials)) return false;
  if (!matchesSelected(filters.sizes, index.sizes)) return false;
  if (!matchesSelected(filters.strapTypes, index.strapTypes)) return false;
  if (!matchesSelected(filters.closureTypes, index.closureTypes)) return false;
  if (!matchesSelected(filters.availability, index.availability)) return false;

  return true;
}

export function productMatchesCatalogFilters(product: Product, filters: CatalogFilters) {
  return indexMatchesCatalogFilters(buildProductFilterIndex(product), filters);
}

export function filterProductsByCatalogFilters(
  indexes: ProductFilterIndex[],
  filters: CatalogFilters,
): Product[] {
  return indexes
    .filter((index) => indexMatchesCatalogFilters(index, filters))
    .map((index) => index.product);
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function normalizeCatalogFilters(input: CatalogFilters): CatalogFilters {
  return {
    priceMin: input.priceMin.trim(),
    priceMax: input.priceMax.trim(),
    categories: uniqueSorted(input.categories),
    colors: uniqueSorted(input.colors),
    materials: uniqueSorted(input.materials),
    sizes: uniqueSorted(input.sizes),
    strapTypes: uniqueSorted(input.strapTypes),
    closureTypes: uniqueSorted(input.closureTypes),
    availability: uniqueSorted(input.availability),
  };
}

export function areCatalogFiltersEqual(a: CatalogFilters, b: CatalogFilters) {
  const na = normalizeCatalogFilters(a);
  const nb = normalizeCatalogFilters(b);
  if (na.priceMin !== nb.priceMin || na.priceMax !== nb.priceMax) return false;
  for (const key of MULTI_FILTER_KEYS) {
    if (na[key].length !== nb[key].length) return false;
    if (na[key].some((value, i) => value !== nb[key][i])) return false;
  }
  return true;
}

export function toggleCatalogFilterValue(
  filters: CatalogFilters,
  key: MultiSelectFilterKey,
  value: string,
): CatalogFilters {
  const current = filters[key];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return normalizeCatalogFilters({ ...filters, [key]: next });
}

export function parseCatalogSort(value: string | null | undefined): CatalogSortKey {
  if (value === "price-asc" || value === "price-desc" || value === "new") return value;
  return "new";
}

export function parseCatalogFiltersFromSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParamsLike,
): CatalogFilters {
  const readList = (key: string) =>
    uniqueSorted(
      (params.get(key) ?? "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean),
    );

  return normalizeCatalogFilters({
    priceMin: params.get(URL_KEYS.priceMin) ?? "",
    priceMax: params.get(URL_KEYS.priceMax) ?? "",
    categories: readList(URL_KEYS.categories),
    colors: readList(URL_KEYS.colors),
    materials: readList(URL_KEYS.materials),
    sizes: readList(URL_KEYS.sizes),
    strapTypes: readList(URL_KEYS.strapTypes),
    closureTypes: readList(URL_KEYS.closureTypes),
    availability: readList(URL_KEYS.availability),
  });
}

type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null;
};

const FILTER_URL_KEY_SET = new Set<string>(Object.values(URL_KEYS));

export function catalogStateToSearchParams(
  filters: CatalogFilters,
  sort: CatalogSortKey,
  current?: URLSearchParams | { toString(): string },
): URLSearchParams {
  const next = new URLSearchParams();

  // Preserve unrelated query keys (utm, etc.)
  if (current) {
    const existing = new URLSearchParams(current.toString());
    for (const [key, value] of existing.entries()) {
      if (!FILTER_URL_KEY_SET.has(key)) next.set(key, value);
    }
  }

  const normalized = normalizeCatalogFilters(filters);
  if (normalized.priceMin) next.set(URL_KEYS.priceMin, normalized.priceMin);
  if (normalized.priceMax) next.set(URL_KEYS.priceMax, normalized.priceMax);
  for (const key of MULTI_FILTER_KEYS) {
    if (normalized[key].length > 0) next.set(URL_KEYS[key], normalized[key].join(","));
  }
  if (sort !== "new") next.set(URL_KEYS.sort, sort);

  return next;
}

export function catalogSearchParamsEqual(a: URLSearchParams, b: URLSearchParams) {
  const keys = new Set([...a.keys(), ...b.keys()]);
  for (const key of keys) {
    if ((a.get(key) ?? "") !== (b.get(key) ?? "")) return false;
  }
  return true;
}
