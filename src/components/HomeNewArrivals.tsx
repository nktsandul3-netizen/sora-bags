"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getBrandName, getFeaturedColorIndex } from "@/lib/data";
import { withLocalePath } from "@/lib/i18n";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeProductImageAlt, localizeProductTitle } from "@/lib/product-i18n";
import ProductImage from "./ProductImage";
import ProductColorSwatches, { getColorImages } from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import QuickViewModal from "./QuickViewModal";
import PreorderStatusBadge from "./PreorderStatusBadge";

function isLifestyleImage(src?: string) {
  return Boolean(src?.includes("lifestyle"));
}

function cardImageClassName(
  src: string | undefined,
  hovered: boolean,
  galleryFit: "cover" | "contain" = "cover",
) {
  const fit = isLifestyleImage(src)
    ? "object-cover object-[50%_35%]"
    : galleryFit === "contain"
      ? "object-contain object-center"
      : "object-cover object-center";

  return (
    fit +
    " transition-transform duration-700 " +
    (hovered ? "scale-[1.03]" : "scale-100")
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShowcaseCard({ product }: { product: Product }) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [imageHovered, setImageHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewMounted, setQuickViewMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const locale = useLocale();
  const t = useT();
  const onSale = product.oldPrice && product.oldPrice > product.price;
  const localizedTitle = localizeProductTitle(product, locale);
  const colors = product.colors;
  const defaultColorIdx = getFeaturedColorIndex(product);
  const displayIdx = previewIdx ?? defaultColorIdx;
  const activeColor = colors[displayIdx] ?? colors[0];
  const colorImages = activeColor ? getColorImages(activeColor) : [];
  const primary = colorImages[0];
  const secondary = colorImages[1];
  const hasSwap = Boolean(isDesktop && secondary && secondary.src !== primary?.src);
  const showSecondary = imageHovered && previewIdx === null && hasSwap;
  const showSwatches = colors.length > 1;
  const galleryFit = product.galleryFit ?? "cover";
  const cardFrameClass =
    "relative aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-white/80 shadow-[0_18px_55px_-42px_rgba(28,25,23,0.65)] ring-1 ring-stone-950/10 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_26px_70px_-44px_rgba(28,25,23,0.85)] " +
    (galleryFit === "contain" ? "bg-white" : "bg-gradient-to-br from-stone-50 via-[#f7f1e9] to-white");
  function openQuickView() {
    setQuickViewMounted(true);
    setQuickViewOpen(true);
  }

  return (
    <div className="group block min-w-0">
      <div className="relative">
        <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="block">
        <div
          className={cardFrameClass}
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
        {galleryFit !== "contain" ? (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-8 bottom-3 h-16 rounded-full bg-stone-950/10 blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_16%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.36),transparent_56%)]" />
          </div>
        ) : null}
        {primary?.src ? (
          <>
            <div
              className={
                "absolute inset-0 transition-opacity duration-300 ease-out " +
                (showSecondary ? "opacity-0" : "opacity-100")
              }
            >
              <Image
                key={`${displayIdx}-primary-${primary.src}`}
                src={primary.src}
                alt={localizeProductImageAlt(primary.alt, locale) || localizedTitle}
                fill
                sizes="(min-width: 1024px) 25vw, 82vw"
                quality={90}
                className={cardImageClassName(primary.src, imageHovered && previewIdx === null, galleryFit)}
              />
            </div>
            {hasSwap && (
              <div
                className={
                  "absolute inset-0 transition-opacity duration-300 ease-out " +
                  (showSecondary ? "opacity-100" : "opacity-0")
                }
              >
                <Image
                  key={`${displayIdx}-secondary-${secondary!.src}`}
                  src={secondary!.src}
                  alt={localizeProductImageAlt(secondary!.alt, locale) || localizedTitle}
                  fill
                  sizes="(min-width: 1024px) 25vw, 82vw"
                  quality={90}
                  className={cardImageClassName(secondary!.src, showSecondary, galleryFit)}
                />
              </div>
            )}
          </>
        ) : (
          <ProductImage
            key={`${displayIdx}-placeholder-${activeColor?.hex}`}
            hex={activeColor?.hex ?? "#d6d3d1"}
            section={product.section}
            alt={localizedTitle}
            sizes="(min-width: 1024px) 25vw, 82vw"
            imageClassName={cardImageClassName(undefined, imageHovered && previewIdx === null, galleryFit)}
            className="h-full w-full"
          />
        )}

        <div className="absolute left-3 top-3 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-950 lg:flex">
          {onSale && (
            <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 shadow-sm backdrop-blur-md">
              {t("catalog.badgeSale")}
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 shadow-sm backdrop-blur-md">
              {t("catalog.badgeNew")}
            </span>
          )}
          {product.hasVideo && (
            <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 shadow-sm backdrop-blur-md">
              {t("catalog.badgeVideo")}
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 hidden lg:block">
          <WishlistButton slug={product.slug} />
        </div>

        </div>
      </Link>
      </div>

      {/* Свотчи → бренд 12px; бренд → название 4px; название → цена 14px; цена → статус 6px */}
      <div className="mt-3.5 flex min-h-6 items-center justify-between gap-2 px-1">
        {showSwatches ? (
          <ProductColorSwatches
            productSlug={product.slug}
            colors={colors}
            previewIndex={previewIdx}
            defaultIndex={defaultColorIdx}
            onPreview={setPreviewIdx}
            swatchFit={galleryFit}
          />
        ) : (
          <span aria-hidden />
        )}
        <span className="lg:hidden">
          <WishlistButton slug={product.slug} variant="compact" />
        </span>
      </div>

      <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="mt-3 flex flex-col px-1">
        <p className="text-[11px] font-normal uppercase tracking-[0.08em] text-[#111]/36">
          {getBrandName(product.brandSlug)}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-[14px] font-normal leading-5 text-[#151515]">
          {localizedTitle}
        </h3>
      </Link>

      <div className="relative mt-3.5 px-1">
        {/* Десктоп: цена + статус, по ховеру заменяются кнопкой */}
        <div className="hidden transition-all duration-300 group-hover:pointer-events-none group-hover:-translate-y-1 group-hover:opacity-0 lg:block">
          <p className="text-[15px] font-medium text-[#111]">{formatPrice(product.price, locale)}</p>
          <PreorderStatusBadge status={product.status} compact className="mt-1.5" />
        </div>
        {/* Мобильные: цена, статус и кнопка в обычном потоке — без наложений */}
        <div className="lg:hidden">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="text-[15px] font-medium text-[#111]">
              {formatPrice(product.price, locale)}
            </span>
            <PreorderStatusBadge status={product.status} compact />
          </div>
          <button
            type="button"
            onClick={openQuickView}
            className="mt-2 flex h-9 w-full items-center justify-center rounded-md border border-stone-950 bg-stone-950 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white shadow-sm transition hover:bg-white hover:text-stone-950"
          >
            {t("common.buy")}
          </button>
        </div>
        {/* Десктоп: кнопка появляется по ховеру поверх цены */}
        <button
          type="button"
          onClick={openQuickView}
          className="absolute inset-x-1 top-0 hidden h-9 translate-y-2 items-center justify-center rounded-md border border-stone-950 bg-stone-950 px-2 text-[11px] font-semibold text-white opacity-0 shadow-sm transition-all duration-300 ease-out hover:bg-white hover:text-stone-950 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          {t("common.buy")} {formatPrice(product.price, locale)}
        </button>
      </div>

      {quickViewMounted && (
        <QuickViewModal
          product={product}
          open={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
          initialColorIdx={displayIdx}
        />
      )}
    </div>
  );
}

export default function HomeNewArrivals({
  products,
  catalogHref = "/new",
}: {
  products: Product[];
  catalogHref?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useT();
  const catalogPath = withLocalePath(catalogHref, locale);

  function scroll(direction: "left" | "right") {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction === "left" ? -rail.clientWidth : rail.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <Link
          href={catalogPath}
          className="inline-block text-base font-semibold uppercase tracking-[0.12em] text-stone-950 transition-colors duration-150 hover:text-stone-600"
        >
          {t("home.newArrivals")}
        </Link>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label={t("a11y.previousProducts")}
          onClick={() => scroll("left")}
          className="absolute left-2 top-[40%] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 backdrop-blur transition hover:bg-white hover:text-stone-950 lg:flex"
        >
          <ArrowIcon direction="left" />
        </button>

        <div
          ref={railRef}
          className="grid auto-cols-[46vw] grid-flow-col gap-0 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:auto-cols-[34vw] sm:px-6 lg:auto-cols-[19vw] lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div key={product.slug} className="px-2 lg:px-3">
              <ShowcaseCard product={product} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label={t("a11y.nextProducts")}
          onClick={() => scroll("right")}
          className="absolute right-2 top-[40%] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 backdrop-blur transition hover:bg-white hover:text-stone-950 lg:flex"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href={catalogPath}
          className="border border-stone-200 px-16 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-950 transition hover:border-stone-950"
        >
          {t("home.viewAllNew")}
        </Link>
      </div>
    </section>
  );
}