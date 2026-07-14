"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import type { SearchResponseDTO, SearchResultDTO } from "@/lib/search-types";
import { useLocale, useT } from "@/lib/useI18n";
import { useOverlayA11y } from "@/hooks/useOverlayA11y";
import ProductImage from "./ProductImage";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const t = useT();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultDTO[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useOverlayA11y({
    open: true,
    onClose,
    containerRef: dialogRef,
    initialFocusRef: inputRef,
  });

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: trimmed,
          locale,
          limit: "8",
        });
        const response = await fetch(`/api/search?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Search failed: ${response.status}`);
        const payload = (await response.json()) as SearchResponseDTO;
        setResults(payload.results);
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setResults([]);
        setStatus("error");
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query, locale]);

  function updateQuery(value: string) {
    setQuery(value);
    if (value.trim()) {
      setStatus("loading");
    } else {
      setResults([]);
      setStatus("idle");
    }
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label={t("common.close")}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40"
      />
      <div
        ref={dialogRef}
        id="global-search"
        role="dialog"
        aria-modal="true"
        aria-label={t("common.search")}
        tabIndex={-1}
        className="absolute inset-x-0 top-0 bg-white shadow-xl"
      >
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full bg-transparent text-lg outline-none placeholder:text-stone-400"
            />
            <button
              type="button"
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
            {status === "loading" ? (
              <p className="py-6 text-center text-sm text-stone-400">
                {t("common.loading")}
              </p>
            ) : null}
            {query.trim() &&
              status !== "loading" &&
              results.length === 0 && (
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
                      hex={p.thumbHex}
                      section={p.section}
                      src={p.thumbSrc}
                      alt={p.title}
                      sizes="56px"
                      className="h-14 w-14 shrink-0 rounded-xl"
                      imageClassName="object-contain object-center"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-wide text-stone-400">
                        {p.brandName}
                      </p>
                      <p className="truncate text-sm text-stone-800">{p.title}</p>
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