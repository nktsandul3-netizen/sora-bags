"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import {
  getStoreAddress,
  getStoreFloor,
  getStoreHours,
  getStoreName,
  siteStoreCategorySlugs,
  storePageCopy,
  type StoreLocation,
} from "@/lib/stores";
import { categoryName } from "@/lib/catalog-i18n";
import StoreExclusiveServices from "@/components/stores/StoreExclusiveServices";

function CategoryIcon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: "h-5 w-5 shrink-0",
    "aria-hidden": true,
  } as const;

  if (id === "card-holders-women") {
    return (
      <svg {...common}>
        <rect x="5" y="7" width="14" height="10" rx="1.5" />
        <path d="M8 11h8" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "womens-wallets-women") {
    return (
      <svg {...common}>
        <rect x="4" y="7" width="16" height="10" rx="1.5" />
        <path d="M16 11h3" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "womens-scarves-women") {
    return (
      <svg {...common}>
        <path d="M6 8c3 2 9 2 12 0v8c-3 2-9 2-12 0V8Z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "bag-charms") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="3" />
        <path d="M10.5 10.5 18 18" strokeLinecap="round" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M8 10V8a4 4 0 1 1 8 0v2" strokeLinecap="round" />
      <path d="M5 10h14l-1 11H6L5 10Z" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StoreDetailContent({
  store,
  locale,
}: {
  store: StoreLocation;
  locale: Locale;
}) {
  const copy = storePageCopy[locale];
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoursOpen, setHoursOpen] = useState(false);
  const name = getStoreName(store, locale);
  const address = getStoreAddress(store, locale);
  const floor = getStoreFloor(store, locale);
  const hours = getStoreHours(store, locale);
  const phoneHref = `tel:${store.phone.replace(/\s/g, "")}`;

  return (
    <>
      <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col bg-white lg:min-h-[calc(100dvh-5rem)] lg:flex-row">
      {/* Gallery */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 lg:aspect-auto lg:min-h-[calc(100dvh-5rem)] lg:w-[65%]">
        {store.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={name}
            fill
            priority={i === 0}
            quality={i === 0 ? 90 : 80}
            sizes="(min-width: 1024px) 65vw, 100vw"
            className={
              "object-cover transition-opacity duration-700 ease-in-out " +
              (i === activeSlide ? "opacity-100" : "opacity-0")
            }
          />
        ))}

        {store.images.length > 1 ? (
          <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2">
            {store.images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`${copy.slide} ${i + 1}`}
                aria-current={i === activeSlide}
                onClick={() => setActiveSlide(i)}
                className={
                  "h-1.5 rounded-full transition-all duration-300 " +
                  (i === activeSlide ? "w-6 bg-stone-950" : "w-1.5 bg-stone-400 hover:bg-stone-600")
                }
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Info panel */}
      <div className="flex w-full flex-col px-6 py-8 sm:px-10 lg:w-[35%] lg:py-12 lg:pl-10 lg:pr-12">
        <h1 className="text-lg font-bold uppercase leading-snug tracking-[0.04em] text-stone-950 sm:text-xl">
          {name}
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-stone-600">{address}</p>

        <div className="mt-4 border border-stone-200 bg-[#f8f6f3] px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            {copy.locatedOn}
          </p>
          <p className="mt-1 font-serif text-xl text-stone-950">{floor}</p>
        </div>

        <div className="mt-5 space-y-2">
          <a
            href={phoneHref}
            className="block text-sm text-stone-900 underline decoration-stone-400 underline-offset-4 transition hover:decoration-stone-900"
          >
            {store.phone}
          </a>
          <a
            href={`mailto:${store.email}`}
            className="block text-sm text-stone-900 underline decoration-stone-400 underline-offset-4 transition hover:decoration-stone-900"
          >
            {store.email}
          </a>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setHoursOpen((v) => !v)}
            aria-expanded={hoursOpen}
            className="flex w-full items-center justify-between bg-[#f0ebe3] px-4 py-3.5 text-left text-sm font-medium text-stone-900 transition hover:bg-[#e8e2d9]"
          >
            <span>{copy.workingHours}</span>
            <ChevronDown open={hoursOpen} />
          </button>
          {hoursOpen ? (
            <div className="space-y-1 border border-t-0 border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
              {hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.06em] text-stone-950">
            {copy.categories}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
            {siteStoreCategorySlugs.map((slug) => (
              <li key={slug} className="flex items-center gap-2.5 text-sm text-stone-800">
                <CategoryIcon id={slug} />
                <span>{categoryName(slug, slug, locale)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-10">
          <a
            href={store.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center border border-[#1a56db] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#1a56db] transition hover:bg-[#1a56db] hover:text-white"
          >
            {copy.showRoute}
          </a>
        </div>
      </div>
    </div>
      <StoreExclusiveServices locale={locale} />
    </>
  );
}
