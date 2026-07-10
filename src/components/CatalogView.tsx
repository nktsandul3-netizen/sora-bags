"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CategoryDef, Product } from "@/lib/types";
import {
  shopBagMenuCategories,
  shopAccessoryMenuCategories,
  compareByCuratedBagGrid,
  compareByCategoryThenNewest,
  compareByNewest,
} from "@/lib/data";
import {
  areCatalogFiltersEqual,
  buildCatalogFacets,
  buildProductFilterIndexes,
  catalogSearchParamsEqual,
  catalogStateToSearchParams,
  countActiveCatalogFilters,
  EMPTY_CATALOG_FILTERS,
  filterProductsByCatalogFilters,
  parseCatalogFiltersFromSearchParams,
  parseCatalogSort,
  toggleCatalogFilterValue,
  type CatalogFilters,
  type CatalogSortKey,
  type MultiSelectFilterKey,
} from "@/lib/catalog-filters";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { categoryName } from "@/lib/catalog-i18n";
import ProductGrid from "./ProductGrid";

const PER_PAGE = 60;

type CatalogViewProps = {
  title: string;
  description?: string;
  products: Product[];
  categories?: CategoryDef[];
  basePath?: string;
  activeSlug?: string;
  crumbs: { label: string; href?: string }[];
  heroBanner?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    objectPosition?: string;
    copy?: { title: string; description: string };
    copyTone?: "light" | "dark";
    bgClassName?: string;
    fit?: "cover" | "contain" | "full-width";
    aspectClass?: string;
    copyOverlayClass?: string;
    mediaFilterClass?: string;
    /** Soft top gradient so white overlay header stays readable on bright heroes */
    topScrim?: boolean;
  };
};

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={"h-3.5 w-3.5 transition-transform " + (open ? "rotate-180" : "")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export default function CatalogView(props: CatalogViewProps) {
  return (
    <Suspense fallback={<CatalogViewFallback title={props.title} heroBanner={props.heroBanner} />}>
      <CatalogViewInner {...props} />
    </Suspense>
  );
}

function CatalogViewFallback({
  title,
  heroBanner,
}: {
  title: string;
  heroBanner?: CatalogViewProps["heroBanner"];
}) {
  return (
    <>
      {heroBanner ? <HeroBanner heroBanner={heroBanner} /> : null}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7">
        <h1 className="sr-only">{title}</h1>
        <div className="flex items-center justify-center py-20 text-sm text-stone-500">
          …
        </div>
      </div>
    </>
  );
}

function CatalogViewInner({
  title,
  description,
  products,
  categories,
  basePath,
  activeSlug,
  heroBanner,
}: CatalogViewProps) {
  const locale = useLocale();
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sortLabels: Record<CatalogSortKey, string> = {
    new: t("catalog.sortNew"),
    "price-asc": t("catalog.sortPriceAsc"),
    "price-desc": t("catalog.sortPriceDesc"),
  };

  // URL is the single source of truth for filters + sort (shareable, refresh-safe).
  const filters = useMemo(
    () => parseCatalogFiltersFromSearchParams(searchParams),
    [searchParams],
  );
  const sortKey = useMemo(
    () => parseCatalogSort(searchParams.get("sort")),
    [searchParams],
  );

  const [showFilter, setShowFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState<"sort" | null>(null);
  const queryKey = searchParams.toString();
  const [pageState, setPageState] = useState({ key: queryKey, visible: PER_PAGE });
  const visible = pageState.key === queryKey ? pageState.visible : PER_PAGE;

  const writeUrl = useCallback(
    (nextFilters: CatalogFilters, nextSort: CatalogSortKey) => {
      const nextParams = catalogStateToSearchParams(nextFilters, nextSort, searchParams);
      const currentParams = new URLSearchParams(searchParams.toString());
      if (catalogSearchParamsEqual(nextParams, currentParams)) return;
      const qs = nextParams.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const updateFilters = useCallback(
    (updater: (prev: CatalogFilters) => CatalogFilters) => {
      const next = updater(filters);
      if (areCatalogFiltersEqual(filters, next)) return;
      writeUrl(next, sortKey);
    },
    [filters, sortKey, writeUrl],
  );

  const updateSort = useCallback(
    (nextSort: CatalogSortKey) => {
      if (nextSort === sortKey) {
        setOpenMenu(null);
        return;
      }
      writeUrl(filters, nextSort);
      setOpenMenu(null);
    },
    [filters, sortKey, writeUrl],
  );

  const resetFilters = useCallback(() => {
    writeUrl(EMPTY_CATALOG_FILTERS, sortKey);
  }, [sortKey, writeUrl]);

  const toggle = useCallback(
    (key: MultiSelectFilterKey, value: string) => {
      updateFilters((prev) => toggleCatalogFilterValue(prev, key, value));
    },
    [updateFilters],
  );

  const indexes = useMemo(() => buildProductFilterIndexes(products), [products]);
  const facets = useMemo(() => buildCatalogFacets(products, locale), [locale, products]);

  const groupByCategory = activeSlug === "vse-sumki" || activeSlug === "vse-aksessuary";
  const useCuratedBagOrder = categories?.[0]?.section === "bags";

  const filtered = useMemo(() => {
    const list = filterProductsByCatalogFilters(indexes, filters);
    if (sortKey === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (useCuratedBagOrder) list.sort((a, b) => compareByCuratedBagGrid(a, b, activeSlug));
    else list.sort(groupByCategory ? compareByCategoryThenNewest : compareByNewest);
    return list;
  }, [indexes, filters, sortKey, groupByCategory, useCuratedBagOrder, activeSlug]);

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);
  const activeCount = countActiveCatalogFilters(filters);
  const hasActiveFilters = activeCount > 0;
  const isBags = categories?.[0]?.section === "bags";
  const navCategories = isBags
    ? shopBagMenuCategories
    : categories?.[0]?.section === "accessories"
      ? shopAccessoryMenuCategories
      : categories?.filter((c) => c.slug !== "vse-aksessuary");
  const productCountLabel = t("catalog.productsLabel");

  // Lock body scroll while the mobile filter drawer is open.
  useEffect(() => {
    if (!showFilter) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showFilter]);

  return (
    <>
      {heroBanner ? <HeroBanner heroBanner={heroBanner} /> : null}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7">
        <h1 className="sr-only">{title}</h1>
        {description ? <p className="sr-only">{description}</p> : null}

        {navCategories && basePath ? (
          <nav className="mb-5 w-full overflow-x-auto border-b border-[#EDE9E5] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex h-11 min-w-max items-center justify-center gap-6 text-[12px] font-normal leading-none tracking-[0.01em]">
              <Link
                href={withLocalePath(basePath, locale)}
                className={
                  "whitespace-nowrap text-[#111] transition hover:opacity-100 " +
                  (activeSlug === "vse-sumki" || activeSlug === "vse-aksessuary"
                    ? "opacity-100"
                    : "opacity-[0.42]")
                }
              >
                {t("catalog.all")}
              </Link>
              {navCategories.map((c) => {
                const href = `${basePath}/${c.slug}`;
                return (
                  <Link
                    key={c.slug}
                    href={withLocalePath(href, locale)}
                    className={
                      "whitespace-nowrap text-[#111] transition hover:opacity-100 " +
                      (c.slug === activeSlug ? "opacity-100" : "opacity-[0.42]")
                    }
                  >
                    {categoryName(c.slug, c.name, locale)}
                  </Link>
                );
              })}
            </div>
          </nav>
        ) : null}

        <div className="relative mb-7 flex w-full flex-wrap items-center gap-3 text-[#111] sm:gap-2.5">
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[18px] border border-[#E9E2DC] bg-white px-4 text-[12.5px] font-normal transition hover:bg-[#FBF8F6]"
            aria-expanded={showFilter}
          >
            <span>{t("catalog.filter")}</span>
            {activeCount > 0 && (
              <span className="rounded-full bg-[#111] px-1.5 py-px text-[10px] leading-none text-white">
                {activeCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((m) => (m === "sort" ? null : "sort"))}
              className="inline-flex h-9 items-center justify-between gap-2 rounded-[18px] border border-[#E9E2DC] bg-white px-4 text-[12.5px] font-normal transition hover:bg-[#FBF8F6]"
              aria-expanded={openMenu === "sort"}
            >
              <span>{t("catalog.sortBy")}</span>
              <Chevron open={openMenu === "sort"} />
            </button>
            {openMenu === "sort" && (
              <Menu onClose={() => setOpenMenu(null)} align="left">
                {(Object.keys(sortLabels) as CatalogSortKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updateSort(key)}
                    className={
                      "block w-full px-5 py-2.5 text-left text-[13px] normal-case tracking-normal transition hover:bg-stone-50 " +
                      (key === sortKey ? "text-stone-400" : "text-stone-800")
                    }
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </Menu>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-9 items-center rounded-[18px] px-3 text-[12.5px] text-[#111]/42 transition hover:text-[#111]"
            >
              {t("catalog.reset")}
            </button>
          )}

          <div className="ml-auto flex h-9 items-center gap-2 whitespace-nowrap text-[12px] leading-none text-[#111]/42">
            {isPending && (
              <span className="inline-flex items-center gap-1.5" aria-live="polite">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#111]/40" />
                {t("catalog.filtering")}
              </span>
            )}
            <span>
              {filtered.length} {productCountLabel}
            </span>
          </div>
        </div>

        <div
          className={
            "transition-opacity duration-150 " + (isPending ? "opacity-60" : "opacity-100")
          }
          aria-busy={isPending}
        >
          {filtered.length === 0 ? (
            <EmptyFilteredState
              hasActiveFilters={hasActiveFilters}
              onReset={resetFilters}
            />
          ) : (
            <>
              <ProductGrid products={shown} />
              {filtered.length > visible && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setPageState({ key: queryKey, visible: visible + PER_PAGE })
                    }
                    className="border border-stone-200 px-16 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-950 transition hover:border-stone-950"
                  >
                    {t("catalog.more")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <FilterDrawer
          open={showFilter}
          onClose={() => setShowFilter(false)}
          filters={filters}
          facets={facets}
          activeCount={activeCount}
          onToggle={toggle}
          onPriceChange={(field, value) =>
            updateFilters((prev) => ({ ...prev, [field]: value }))
          }
          onReset={resetFilters}
        />
      </div>
    </>
  );
}

function EmptyFilteredState({
  hasActiveFilters,
  onReset,
}: {
  hasActiveFilters: boolean;
  onReset: () => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
      <p className="font-serif text-xl text-stone-950 sm:text-2xl">
        {hasActiveFilters ? t("catalog.emptyFiltered") : t("catalog.empty")}
      </p>
      {hasActiveFilters ? (
        <>
          <p className="mt-3 max-w-md text-sm text-stone-500">
            {t("catalog.emptyFilteredHint")}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-6 border border-stone-900 bg-stone-900 px-8 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-stone-800"
          >
            {t("catalog.reset")}
          </button>
        </>
      ) : null}
    </div>
  );
}

function FilterDrawer({
  open,
  onClose,
  filters,
  facets,
  activeCount,
  onToggle,
  onPriceChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  facets: ReturnType<typeof buildCatalogFacets>;
  activeCount: number;
  onToggle: (key: MultiSelectFilterKey, value: string) => void;
  onPriceChange: (field: "priceMin" | "priceMax", value: string) => void;
  onReset: () => void;
}) {
  const t = useT();

  return (
    <div
      className={
        "fixed inset-0 z-50 transition-opacity duration-300 " +
        (open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
      }
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={t("catalog.hideFilter")}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/30"
      />
      <aside
        className={
          "absolute left-0 top-0 flex h-full w-[min(100vw,360px)] flex-col bg-white shadow-xl transition-transform duration-300 ease-out sm:w-[88vw] sm:max-w-[360px] " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
        role="dialog"
        aria-modal="true"
        aria-label={t("catalog.filter")}
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-900"
          >
            {t("catalog.hideFilter")}
            <CloseIcon />
          </button>
          {activeCount > 0 && (
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-700">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6">
          <FilterSection title={t("catalog.price")}>
            <div className="flex items-center gap-3">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={t("catalog.from")}
                value={filters.priceMin}
                onChange={(e) => onPriceChange("priceMin", e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-900"
              />
              <span className="text-stone-400">—</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={t("catalog.to")}
                value={filters.priceMax}
                onChange={(e) => onPriceChange("priceMax", e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-900"
              />
            </div>
          </FilterSection>

          {facets.colors.length > 0 && (
            <FilterSection title={t("catalog.color")}>
              <ColorCheckboxList
                items={facets.colors}
                selected={filters.colors}
                onToggle={(value) => onToggle("colors", value)}
              />
            </FilterSection>
          )}

          {facets.materials.length > 0 && (
            <FilterSection title={t("catalog.material")}>
              <CheckboxList
                items={facets.materials}
                selected={filters.materials}
                onToggle={(value) => onToggle("materials", value)}
              />
            </FilterSection>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-stone-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-stone-900 bg-stone-900 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-stone-800"
          >
            {t("catalog.apply")}
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={activeCount === 0}
            className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("catalog.reset")}
          </button>
        </div>
      </aside>
    </div>
  );
}

function HeroBanner({ heroBanner }: { heroBanner: NonNullable<CatalogViewProps["heroBanner"]> }) {
  const copyTone = heroBanner.copyTone ?? "dark";
  const isLightCopy = copyTone === "light";
  const copyOverlayClass = heroBanner.copyOverlayClass ?? "items-center justify-center";
  const heroMediaFilterClass = heroBanner.mediaFilterClass ?? "catalog-hero-media";
  const topScrim = heroBanner.topScrim ? (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[120px]"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 100%)",
      }}
    />
  ) : null;

  const heroCopyBlock = heroBanner.copy ? (
    <div
      className={
        "max-w-2xl text-center " +
        (isLightCopy
          ? "text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]"
          : "text-stone-600")
      }
    >
      <h2
        className={
          "font-sans text-2xl font-bold uppercase tracking-[0.32em] sm:text-3xl lg:text-4xl lg:tracking-[0.38em] " +
          (isLightCopy
            ? "text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]"
            : "text-stone-600")
        }
      >
        {heroBanner.copy.title}
      </h2>
      <p
        className={
          "mx-auto mt-4 max-w-xl font-sans text-sm font-normal leading-relaxed tracking-[0.04em] sm:mt-5 sm:text-base sm:leading-7 " +
          (isLightCopy
            ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
            : "text-stone-500")
        }
      >
        {heroBanner.copy.description}
      </p>
    </div>
  ) : null;

  return (
    <section
      className={
        "catalog-hero-section relative overflow-hidden " +
        (heroBanner.bgClassName ?? "bg-[#7b4426]")
      }
    >
      {heroBanner.fit === "full-width" ? (
        <>
          <Image
            src={heroBanner.src}
            alt={heroBanner.alt}
            width={heroBanner.width ?? 2560}
            height={heroBanner.height ?? 1440}
            priority
            quality={90}
            sizes="100vw"
            className={
              heroMediaFilterClass + " catalog-hero-image block h-auto w-full max-w-none"
            }
          />
          {topScrim}
          {heroBanner.copy ? (
            <div className={"absolute inset-0 z-[2] flex px-6 sm:px-10 " + copyOverlayClass}>
              {heroCopyBlock}
            </div>
          ) : null}
        </>
      ) : (
        <div
          className={
            "relative w-full " +
            (heroBanner.fit === "contain"
              ? ""
              : (heroBanner.aspectClass ?? "aspect-[2/1] sm:aspect-[5/2]"))
          }
        >
          <Image
            src={heroBanner.src}
            alt={heroBanner.alt}
            fill={heroBanner.fit !== "contain"}
            width={heroBanner.fit === "contain" ? heroBanner.width : undefined}
            height={heroBanner.fit === "contain" ? heroBanner.height : undefined}
            priority
            quality={90}
            sizes="100vw"
            className={
              heroBanner.fit === "contain"
                ? heroMediaFilterClass + " block h-auto w-full max-w-none"
                : heroMediaFilterClass + " size-full object-cover"
            }
            style={
              heroBanner.fit === "contain"
                ? undefined
                : { objectPosition: heroBanner.objectPosition ?? "50% 62%" }
            }
          />
          {topScrim}
          {heroBanner.copy ? (
            <div className={"absolute inset-0 z-[2] flex px-6 sm:px-10 " + copyOverlayClass}>
              {heroCopyBlock}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-stone-100 py-4" open>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-medium uppercase tracking-[0.14em] text-stone-900 [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-stone-400 transition-transform group-open:rotate-180">
          <Chevron />
        </span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function CheckboxList({
  items,
  selected,
  onToggle,
}: {
  items: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
      {items.map((item) => {
        const checked = selected.includes(item.value);
        return (
          <label
            key={item.value}
            className="flex min-h-9 cursor-pointer items-center gap-2.5 text-[13px] text-stone-700"
          >
            <span
              className={
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition " +
                (checked ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300")
              }
            >
              {checked && (
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={() => onToggle(item.value)}
            />
            <span className="leading-snug">{item.label}</span>
          </label>
        );
      })}
    </div>
  );
}

const MULTI_SWATCH_GRADIENT =
  "conic-gradient(from 90deg, #c41e3a, #e07a2f, #e8c547, #4a5d3a, #34517a, #7a5c8a, #c41e3a)";

function ColorCheckboxList({
  items,
  selected,
  onToggle,
}: {
  items: { value: string; label: string; swatch?: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex max-h-64 flex-col gap-2.5 overflow-y-auto pr-1">
      {items.map((item) => {
        const checked = selected.includes(item.value);
        return (
          <label
            key={item.value}
            className="flex min-h-9 cursor-pointer items-center gap-2.5 text-[13px] text-stone-700"
          >
            <span
              className={
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition " +
                (checked ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300")
              }
            >
              {checked && (
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={() => onToggle(item.value)}
            />
            <span
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 rounded-full border border-stone-300/70"
              style={
                item.swatch
                  ? { backgroundColor: item.swatch }
                  : { background: MULTI_SWATCH_GRADIENT }
              }
            />
            <span className="leading-snug">{item.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function Menu({
  children,
  onClose,
  align = "left",
}: {
  children: ReactNode;
  onClose: () => void;
  align?: "left" | "right";
}) {
  return (
    <>
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        className="fixed inset-0 z-10 cursor-default"
      />
      <div
        className={
          "absolute top-full z-20 mt-2 min-w-[200px] border border-stone-200 bg-white py-1 shadow-lg " +
          (align === "right" ? "right-0" : "left-0")
        }
      >
        {children}
      </div>
    </>
  );
}
