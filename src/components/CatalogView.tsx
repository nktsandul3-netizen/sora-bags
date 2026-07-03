"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CategoryDef, Product } from "@/lib/types";
import {
  bagMenuCategories,
  compareByCuratedBagGrid,
  compareByCategoryThenNewest,
  compareByNewest,
} from "@/lib/data";
import {
  buildCatalogFacets,
  countActiveCatalogFilters,
  EMPTY_CATALOG_FILTERS,
  productMatchesCatalogFilters,
  type CatalogFilters,
  type MultiSelectFilterKey,
} from "@/lib/catalog-filters";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { categoryName } from "@/lib/catalog-i18n";
import ProductGrid from "./ProductGrid";

type SortKey = "new" | "price-asc" | "price-desc";

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

export default function CatalogView({
  title,
  description,
  products,
  categories,
  basePath,
  activeSlug,
  heroBanner,
}: {
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
  };
}) {
  const locale = useLocale();
  const t = useT();
  const sortLabels: Record<SortKey, string> = {
    new: t("catalog.sortNew"),
    "price-asc": t("catalog.sortPriceAsc"),
    "price-desc": t("catalog.sortPriceDesc"),
  };
  const [showFilter, setShowFilter] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("new");
  const perPage = 60;
  const [visible, setVisible] = useState(60);
  const [applied, setApplied] = useState<CatalogFilters>(EMPTY_CATALOG_FILTERS);
  const [draft, setDraft] = useState<CatalogFilters>(EMPTY_CATALOG_FILTERS);
  const [openMenu, setOpenMenu] = useState<"sort" | null>(null);
  const groupByCategory = activeSlug === "vse-sumki" || activeSlug === "vse-aksessuary";
  const useCuratedBagOrder = categories?.[0]?.section === "bags";

  const facets = useMemo(() => buildCatalogFacets(products, locale), [locale, products]);

  const filtered = useMemo(() => {
    const list = products.filter((product) => productMatchesCatalogFilters(product, applied));
    if (sortKey === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (useCuratedBagOrder) list.sort((a, b) => compareByCuratedBagGrid(a, b, activeSlug));
    else list.sort(groupByCategory ? compareByCategoryThenNewest : compareByNewest);
    return list;
  }, [products, applied, sortKey, groupByCategory, useCuratedBagOrder, activeSlug]);

  const shown = filtered.slice(0, visible);
  const activeCount = countActiveCatalogFilters(applied);
  const isBags = categories?.[0]?.section === "bags";
  const sectionLabel = isBags ? t("nav.bags") : t("nav.accessories");
  const navCategories = isBags
    ? bagMenuCategories
    : categories?.filter((c) => c.slug !== "vse-aksessuary");
  const productCountLabel =
    locale === "ru" ? "товаров" : locale === "ro" ? "produse" : "products";

  function openDrawer() {
    setDraft(applied);
    setShowFilter(true);
  }
  function closeDrawer() {
    setDraft(applied);
    setShowFilter(false);
  }
  function applyDraft() {
    setApplied(draft);
    setVisible(perPage);
    setShowFilter(false);
  }
  function resetDraft() {
    setDraft(EMPTY_CATALOG_FILTERS);
    setApplied(EMPTY_CATALOG_FILTERS);
    setVisible(perPage);
  }
  function toggle(key: MultiSelectFilterKey, value: string) {
    setDraft((d) => {
      const arr = d[key] as string[];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...d, [key]: next };
    });
  }

  const copyTone = heroBanner?.copyTone ?? "dark";
  const isLightCopy = copyTone === "light";

  const heroCopyBlock = heroBanner?.copy ? (
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

  const copyOverlayClass =
    heroBanner?.copyOverlayClass ?? "items-center justify-center";

  const heroMediaFilterClass =
    heroBanner?.mediaFilterClass ?? "catalog-hero-media";

  return (
    <>
      {heroBanner ? (
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
                  heroMediaFilterClass +
                  " catalog-hero-image block h-auto w-full max-w-none"
                }
              />
              {heroBanner.copy ? (
                <div
                  className={
                    "absolute inset-0 flex px-6 sm:px-10 " + copyOverlayClass
                  }
                >
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
                  : heroBanner.aspectClass ?? "aspect-[2/1] sm:aspect-[5/2]")
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
              {heroBanner.copy ? (
                <div
                  className={
                    "absolute inset-0 flex px-6 sm:px-10 " + copyOverlayClass
                  }
                >
                  {heroCopyBlock}
                </div>
              ) : null}
            </div>
          )}
        </section>
      ) : null}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7">
      <h1 className="sr-only">{title}</h1>
      {description ? <p className="sr-only">{description}</p> : null}

      {navCategories && basePath ? (
        <nav className="mb-7 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center justify-center gap-6 text-[11px] font-medium leading-none text-stone-500 sm:gap-7">
            {navCategories.map((c) => {
              const href =
                c.slug === "vse-sumki" || c.slug === "vse-aksessuary"
                  ? basePath
                  : `${basePath}/${c.slug}`;
              return (
                <Link
                  key={c.slug}
                  href={withLocalePath(href, locale)}
                  className={
                    "whitespace-nowrap transition hover:text-stone-950 " +
                    (c.slug === activeSlug
                      ? "font-semibold text-stone-950"
                      : "text-stone-500")
                  }
                >
                  {categoryName(c.slug, c.name, locale)}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}

      {/* Панель управления: фильтр / сортировка / количество товаров */}
      <div className="relative mb-7 flex items-center justify-between gap-4 border-b border-stone-200 pb-3 text-[10px] font-medium text-stone-950">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openDrawer}
            className="inline-flex h-7 min-w-[64px] items-center justify-center gap-1.5 rounded-sm border border-stone-100 bg-white px-3 text-[9px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition hover:border-stone-300"
          >
            <span>{t("catalog.filter")}</span>
            {activeCount > 0 && (
              <span className="rounded-full bg-stone-900 px-1 py-px text-[8px] leading-none text-white">
                {activeCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((m) => (m === "sort" ? null : "sort"))}
              className="inline-flex h-7 min-w-[108px] items-center justify-between gap-2 rounded-sm border border-stone-100 bg-white px-3 text-[9px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition hover:border-stone-300"
            >
              <span>{t("catalog.sortBy")}</span>
              <Chevron open={openMenu === "sort"} />
            </button>
            {openMenu === "sort" && (
              <Menu onClose={() => setOpenMenu(null)} align="right">
                {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSortKey(key);
                      setOpenMenu(null);
                    }}
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
        </div>

        <span className="whitespace-nowrap text-[11px] text-stone-800">
          {filtered.length} {productCountLabel}
        </span>
      </div>

      <ProductGrid products={shown} />

      {filtered.length > visible && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + perPage)}
            className="border border-stone-200 px-16 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-950 transition hover:border-stone-950"
          >
            {t("catalog.more")}
          </button>
        </div>
      )}

      {/* Выезжающая панель фильтра слева */}
      <div
        className={
          "fixed inset-0 z-50 transition-opacity duration-300 " +
          (showFilter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
        aria-hidden={!showFilter}
      >
        <button
          type="button"
          aria-label="Закрыть фильтр"
          onClick={closeDrawer}
          className="absolute inset-0 bg-stone-900/30"
        />
        <aside
          className={
            "absolute left-0 top-0 flex h-full w-[88vw] max-w-[360px] flex-col bg-white shadow-xl transition-transform duration-300 ease-out " +
            (showFilter ? "translate-x-0" : "-translate-x-full")
          }
          role="dialog"
          aria-label={t("catalog.filter")}
        >
          <button
            type="button"
            onClick={closeDrawer}
            className="flex items-center justify-between px-6 py-5 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-900"
          >
            {t("catalog.hideFilter")}
            <CloseIcon />
          </button>

          <div className="flex-1 overflow-y-auto px-6">
            <FilterSection title={t("catalog.price")}>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder={t("catalog.from")}
                  value={draft.priceMin}
                  onChange={(e) => setDraft((d) => ({ ...d, priceMin: e.target.value }))}
                  className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900"
                />
                <span className="text-stone-400">—</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder={t("catalog.to")}
                  value={draft.priceMax}
                  onChange={(e) => setDraft((d) => ({ ...d, priceMax: e.target.value }))}
                  className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900"
                />
              </div>
            </FilterSection>

            {facets.categories.length > 0 && (
              <FilterSection title={t("catalog.category")}>
                <CheckboxList
                  items={facets.categories}
                  selected={draft.categories}
                  onToggle={(value) => toggle("categories", value)}
                />
              </FilterSection>
            )}

            {navCategories && basePath && (
              <FilterSection title={sectionLabel}>
                <div className="flex flex-col gap-1">
                  {navCategories.map((c) => (
                    <Link
                      key={c.slug}
                      href={withLocalePath(`${basePath}/${c.slug}`, locale)}
                      className={
                        "py-1 text-[13px] transition " +
                        (c.slug === activeSlug
                          ? "font-medium text-stone-950"
                          : "text-stone-600 hover:text-stone-950")
                      }
                    >
                      {categoryName(c.slug, c.name, locale)}
                    </Link>
                  ))}
                </div>
              </FilterSection>
            )}

            {facets.colors.length > 0 && (
              <FilterSection title={t("catalog.color")}>
                <CheckboxList
                  items={facets.colors}
                  selected={draft.colors}
                  onToggle={(value) => toggle("colors", value)}
                />
              </FilterSection>
            )}

            {facets.materials.length > 0 && (
              <FilterSection title={t("catalog.material")}>
                <CheckboxList
                  items={facets.materials}
                  selected={draft.materials}
                  onToggle={(value) => toggle("materials", value)}
                />
              </FilterSection>
            )}

            {facets.sizes.length > 0 && (
              <FilterSection title={t("catalog.size")}>
                <CheckboxList
                  items={facets.sizes}
                  selected={draft.sizes}
                  onToggle={(value) => toggle("sizes", value)}
                />
              </FilterSection>
            )}

            {facets.strapTypes.length > 0 && (
              <FilterSection title={t("catalog.strapType")}>
                <CheckboxList
                  items={facets.strapTypes}
                  selected={draft.strapTypes}
                  onToggle={(value) => toggle("strapTypes", value)}
                />
              </FilterSection>
            )}

            {facets.closureTypes.length > 0 && (
              <FilterSection title={t("catalog.closureType")}>
                <CheckboxList
                  items={facets.closureTypes}
                  selected={draft.closureTypes}
                  onToggle={(value) => toggle("closureTypes", value)}
                />
              </FilterSection>
            )}

            {facets.availability.length > 0 && (
              <FilterSection title={t("catalog.availability")}>
                <CheckboxList
                  items={facets.availability}
                  selected={draft.availability}
                  onToggle={(value) => toggle("availability", value)}
                />
              </FilterSection>
            )}

          </div>

          <div className="flex items-center gap-4 border-t border-stone-200 px-6 py-4">
            <button
              type="button"
              onClick={applyDraft}
              className="flex-1 border border-stone-900 bg-stone-900 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-stone-800"
            >
              {t("catalog.apply")}
            </button>
            <button
              type="button"
              onClick={resetDraft}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
            >
              {t("catalog.reset")}
            </button>
          </div>
        </aside>
      </div>
      </div>
    </>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
            className="flex cursor-pointer items-center gap-2.5 text-[13px] text-stone-700"
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

function Menu({
  children,
  onClose,
  align = "left",
}: {
  children: React.ReactNode;
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}