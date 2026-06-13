"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CategoryDef, Product } from "@/lib/types";
import { bagMenuCategories, getBrandName } from "@/lib/data";
import ProductGrid from "./ProductGrid";
import Breadcrumbs from "./Breadcrumbs";

type SortKey = "new" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortKey, string> = {
  new: "новизне",
  "price-asc": "возрастанию цены",
  "price-desc": "убыванию цены",
};

const PER_PAGE_OPTIONS = [30, 60, 90];

interface Filters {
  priceMin: string;
  priceMax: string;
  genders: string[];
  brands: string[];
  colors: string[];
  materials: string[];
  countries: string[];
}

const EMPTY_FILTERS: Filters = {
  priceMin: "",
  priceMax: "",
  genders: [],
  brands: [],
  colors: [],
  materials: [],
  countries: [],
};

function specValue(product: Product, label: string): string | undefined {
  return product.specs?.find((s) => s.label === label)?.value;
}

function getGender(product: Product): string | undefined {
  return specValue(product, "Пол");
}

function getCountry(product: Product): string | undefined {
  return specValue(product, "Страна производства");
}

function countActive(filters: Filters): number {
  return (
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0) +
    filters.genders.length +
    filters.brands.length +
    filters.colors.length +
    filters.materials.length +
    filters.countries.length
  );
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={"h-4 w-4 transition-transform " + (open ? "rotate-180" : "")}
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
  crumbs,
}: {
  title: string;
  description?: string;
  products: Product[];
  categories?: CategoryDef[];
  basePath?: string;
  activeSlug?: string;
  crumbs: { label: string; href?: string }[];
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("new");
  const [perPage, setPerPage] = useState(60);
  const [visible, setVisible] = useState(60);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [openMenu, setOpenMenu] = useState<"sort" | "per" | null>(null);

  const facets = useMemo(() => {
    const genders = new Set<string>();
    const brandSlugs = new Set<string>();
    const colors = new Set<string>();
    const materials = new Set<string>();
    const countries = new Set<string>();
    for (const p of products) {
      const g = getGender(p);
      if (g) genders.add(g);
      brandSlugs.add(p.brandSlug);
      p.colors.forEach((c) => colors.add(c.name));
      if (p.material) materials.add(p.material);
      const country = getCountry(p);
      if (country) countries.add(country);
    }
    return {
      genders: [...genders].sort(),
      brands: [...brandSlugs].sort((a, b) =>
        getBrandName(a).localeCompare(getBrandName(b), "ru"),
      ),
      colors: [...colors].sort((a, b) => a.localeCompare(b, "ru")),
      materials: [...materials].sort((a, b) => a.localeCompare(b, "ru")),
      countries: [...countries].sort((a, b) => a.localeCompare(b, "ru")),
    };
  }, [products]);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (applied.priceMin && p.price < Number(applied.priceMin)) return false;
      if (applied.priceMax && p.price > Number(applied.priceMax)) return false;
      const g = getGender(p);
      if (applied.genders.length && (!g || !applied.genders.includes(g))) return false;
      if (applied.brands.length && !applied.brands.includes(p.brandSlug)) return false;
      if (
        applied.colors.length &&
        !p.colors.some((c) => applied.colors.includes(c.name))
      )
        return false;
      if (applied.materials.length && !applied.materials.includes(p.material))
        return false;
      const country = getCountry(p);
      if (applied.countries.length && (!country || !applied.countries.includes(country)))
        return false;
      return true;
    });
    if (sortKey === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, applied, sortKey]);

  const shown = filtered.slice(0, visible);
  const activeCount = countActive(applied);
  const isBags = categories?.[0]?.section === "bags";
  const sectionLabel = isBags ? "Виды сумок" : "Виды аксессуаров";
  const navCategories = isBags ? bagMenuCategories : categories;

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
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setVisible(perPage);
  }
  function toggle(key: keyof Filters, value: string) {
    setDraft((d) => {
      const arr = d[key] as string[];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...d, [key]: next };
    });
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={crumbs} />
      <header className="mt-5 mb-5">
        <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
            {description}
          </p>
        ) : null}
      </header>

      {/* Панель управления: фильтр / сортировка / показывать по N */}
      <div className="relative mb-5 flex items-center justify-between gap-4 border-y border-stone-200 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-700 sm:mb-7 sm:justify-start sm:gap-8">
        <button
          type="button"
          onClick={openDrawer}
          className="flex items-center gap-2 transition hover:text-stone-950"
        >
          <FilterIcon />
          <span className="hidden xs:inline">Показать фильтр</span>
          <span className="xs:hidden">Фильтр</span>
          {activeCount > 0 && (
            <span className="rounded-full bg-stone-900 px-1.5 py-0.5 text-[10px] leading-none text-white">
              {activeCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu((m) => (m === "sort" ? null : "sort"))}
            className="flex items-center gap-1.5 transition hover:text-stone-950"
          >
            <span className="hidden xs:inline">Сортировать по</span>
            <span className="xs:hidden">Сортировка:</span>
            <span className="text-stone-400">{SORT_LABELS[sortKey]}</span>
            <Chevron open={openMenu === "sort"} />
          </button>
          {openMenu === "sort" && (
            <Menu onClose={() => setOpenMenu(null)} align="right">
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
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
                  {SORT_LABELS[key]}
                </button>
              ))}
            </Menu>
          )}
        </div>

        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setOpenMenu((m) => (m === "per" ? null : "per"))}
            className="flex items-center gap-1.5 transition hover:text-stone-950"
          >
            Показывать по <span className="text-stone-400">{perPage}</span>
            <Chevron open={openMenu === "per"} />
          </button>
          {openMenu === "per" && (
            <Menu onClose={() => setOpenMenu(null)}>
              {PER_PAGE_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setPerPage(n);
                    setVisible(n);
                    setOpenMenu(null);
                  }}
                  className={
                    "block w-full px-5 py-2.5 text-left text-[13px] normal-case tracking-normal transition hover:bg-stone-50 " +
                    (n === perPage ? "text-stone-400" : "text-stone-800")
                  }
                >
                  {n}
                </button>
              ))}
            </Menu>
          )}
        </div>
      </div>

      <ProductGrid products={shown} />

      {filtered.length > visible && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + perPage)}
            className="border border-stone-200 px-16 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-950 transition hover:border-stone-950"
          >
            Показать ещё
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
          aria-label="Фильтр"
        >
          <button
            type="button"
            onClick={closeDrawer}
            className="flex items-center justify-between px-6 py-5 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-900"
          >
            Скрыть фильтр
            <CloseIcon />
          </button>

          <div className="flex-1 overflow-y-auto px-6">
            <FilterSection title="Цена">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="от"
                  value={draft.priceMin}
                  onChange={(e) => setDraft((d) => ({ ...d, priceMin: e.target.value }))}
                  className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900"
                />
                <span className="text-stone-400">—</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="до"
                  value={draft.priceMax}
                  onChange={(e) => setDraft((d) => ({ ...d, priceMax: e.target.value }))}
                  className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900"
                />
              </div>
            </FilterSection>

            {facets.genders.length > 0 && (
              <FilterSection title="Пол">
                <CheckboxList
                  items={facets.genders.map((g) => ({ value: g, label: g }))}
                  selected={draft.genders}
                  onToggle={(v) => toggle("genders", v)}
                />
              </FilterSection>
            )}

            <FilterSection title="Бренд">
              <CheckboxList
                items={facets.brands.map((b) => ({ value: b, label: getBrandName(b) }))}
                selected={draft.brands}
                onToggle={(v) => toggle("brands", v)}
              />
            </FilterSection>

            {navCategories && basePath && (
              <FilterSection title={sectionLabel}>
                <div className="flex flex-col gap-1">
                  {navCategories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`${basePath}/${c.slug}`}
                      className={
                        "py-1 text-[13px] transition " +
                        (c.slug === activeSlug
                          ? "font-medium text-stone-950"
                          : "text-stone-600 hover:text-stone-950")
                      }
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </FilterSection>
            )}

            <FilterSection title="Цвет">
              <CheckboxList
                items={facets.colors.map((c) => ({ value: c, label: c }))}
                selected={draft.colors}
                onToggle={(v) => toggle("colors", v)}
              />
            </FilterSection>

            <FilterSection title="Материал">
              <CheckboxList
                items={facets.materials.map((m) => ({ value: m, label: m }))}
                selected={draft.materials}
                onToggle={(v) => toggle("materials", v)}
              />
            </FilterSection>

            {facets.countries.length > 0 && (
              <FilterSection title="Производство">
                <CheckboxList
                  items={facets.countries.map((c) => ({ value: c, label: c }))}
                  selected={draft.countries}
                  onToggle={(v) => toggle("countries", v)}
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
              Применить
            </button>
            <button
              type="button"
              onClick={resetDraft}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
            >
              Сбросить
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

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M3 5h18M6 12h12M10 19h4" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}