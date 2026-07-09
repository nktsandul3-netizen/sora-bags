import type { Locale } from "@/lib/i18n";
import { COLOR_FAMILY_ORDER, colorFamilyLabel, colorFamilySwatch, getColorFamilies } from "@/lib/color-taxonomy";
import type { Product } from "@/lib/types";

export interface CatalogFilters {
  priceMin: string;
  priceMax: string;
  colors: string[];
  materials: string[];
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
  colors: CatalogFilterOption[];
  materials: CatalogFilterOption[];
}

/** Precomputed attributes for O(1) filter matching. */
export interface ProductFilterIndex {
  product: Product;
  colors: string[];
  materials: string[];
}

export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  priceMin: "",
  priceMax: "",
  colors: [],
  materials: [],
};

const MULTI_FILTER_KEYS: MultiSelectFilterKey[] = ["colors", "materials"];

/** URL query keys — short, stable, only non-default values are written. */
const URL_KEYS = {
  priceMin: "min",
  priceMax: "max",
  colors: "color",
  materials: "mat",
  sort: "sort",
} as const;

/** Legacy query keys from older filter UI — stripped on write so they don't linger. */
const LEGACY_FILTER_URL_KEYS = ["cat", "size", "strap", "close", "avail"] as const;

export function countActiveCatalogFilters(filters: CatalogFilters) {
  return (
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0) +
    filters.colors.length +
    filters.materials.length
  );
}

export function buildCatalogFacets(products: Product[], locale: Locale): CatalogFacets {
  const colorFamilies = new Set<string>();
  const materials = new Set<string>();
  const seen = new Set<string>();

  for (const product of products) {
    if (seen.has(product.slug)) continue;
    seen.add(product.slug);

    product.colors.forEach((color) =>
      getColorFamilies(color.name).forEach((family) => colorFamilies.add(family)),
    );
    if (product.material) materials.add(product.material);
  }

  return {
    colors: COLOR_FAMILY_ORDER.filter((key) => colorFamilies.has(key)).map((key) => ({
      value: key,
      label: colorFamilyLabel(key, locale),
      swatch: colorFamilySwatch(key),
    })),
    materials: [...materials]
      .sort((a, b) => a.localeCompare(b, locale))
      .map((value) => ({ value, label: value })),
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
    colors: product.colors.flatMap((color) => getColorFamilies(color.name)),
    materials: product.material ? [product.material] : [],
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
  if (!matchesSelected(filters.colors, index.colors)) return false;
  if (!matchesSelected(filters.materials, index.materials)) return false;

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
    colors: uniqueSorted(input.colors),
    materials: uniqueSorted(input.materials),
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
    colors: readList(URL_KEYS.colors),
    materials: readList(URL_KEYS.materials),
  });
}

type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null;
};

const FILTER_URL_KEY_SET = new Set<string>([
  ...Object.values(URL_KEYS),
  ...LEGACY_FILTER_URL_KEYS,
]);

export function catalogStateToSearchParams(
  filters: CatalogFilters,
  sort: CatalogSortKey,
  current?: URLSearchParams | { toString(): string },
): URLSearchParams {
  const next = new URLSearchParams();

  // Preserve unrelated query keys (utm, etc.), drop legacy filter keys.
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
