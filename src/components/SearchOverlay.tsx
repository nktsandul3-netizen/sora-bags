"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products, getBrandName } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeProductTitle } from "@/lib/product-i18n";
import ProductImage from "./ProductImage";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const t = useT();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          localizeProductTitle(p, locale).toLowerCase().includes(q) ||
          getBrandName(p.brandSlug).toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, locale]);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-stone-900/40" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 bg-white shadow-xl">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full bg-transparent text-lg outline-none placeholder:text-stone-400"
            />
            <button
              onClick={onClose}
              aria-label={t("common.close")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto py-3">
            {query.trim() && results.length === 0 && (
              <p className="py-6 text-center text-sm text-stone-500">
                {t("search.noResults")} <span>&quot;{query}&quot;</span>.
              </p>
            )}
            <ul className="divide-y divide-stone-100">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={withLocalePath(`/product/${p.slug}`, locale)}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 transition hover:bg-stone-50"
                  >
                    <ProductImage
                      hex={p.colors[0].hex}
                      section={p.section}
                      className="h-14 w-14 shrink-0 rounded-xl"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-wide text-stone-400">
                        {getBrandName(p.brandSlug)}
                      </p>
                      <p className="truncate text-sm text-stone-800">{localizeProductTitle(p, locale)}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-stone-900">
                      {formatPrice(p.price, locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {!query.trim() && (
              <p className="py-6 text-center text-sm text-stone-400">
                {t("search.hint")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}