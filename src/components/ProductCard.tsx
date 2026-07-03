"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getBrandName, getFeaturedColorIndex } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeProductTitle } from "@/lib/product-i18n";
import ProductImage from "./ProductImage";
import ProductColorSwatches, { getColorImages } from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import QuickViewModal from "./QuickViewModal";
import PreorderStatusBadge from "./PreorderStatusBadge";

export default function ProductCard({ product }: { product: Product }) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [imageHovered, setImageHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewMounted, setQuickViewMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const locale = useLocale();
  const t = useT();
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
  const localizedTitle = localizeProductTitle(product, locale);
  const colors = product.colors;
  const defaultColorIdx = getFeaturedColorIndex(product);
  const displayIdx = previewIdx ?? defaultColorIdx;
  const activeColor = colors[displayIdx] ?? colors[0];
  const colorImages = activeColor ? getColorImages(activeColor) : [];
  const primary = colorImages[0];
  const secondary = colorImages[1];
  // Вторую картинку (свап по наведению) грузим только на десктопе — на телефоне
  // ховера нет, поэтому это лишняя загрузка, которая тормозит каталог.
  const hasSwap = Boolean(isDesktop && secondary && secondary.src !== primary?.src);
  const showSecondary = imageHovered && previewIdx === null && hasSwap;
  const showSwatches = colors.length > 0;
  const cardImageClass = "object-cover object-center";

  function openQuickView() {
    setQuickViewMounted(true);
    setQuickViewOpen(true);
  }

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="block">
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-stone-50 via-[#f7f1e9] to-white shadow-[0_18px_55px_-42px_rgba(28,25,23,0.65)] ring-1 ring-stone-950/10 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_26px_70px_-44px_rgba(28,25,23,0.85)]"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-8 bottom-3 h-16 rounded-full bg-stone-950/10 blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_16%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.36),transparent_56%)]" />
        </div>
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
                alt={primary.alt || localizedTitle}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                quality={90}
                className={
                  cardImageClass +
                  " transition-transform duration-[700ms] ease-out " +
                  (imageHovered && previewIdx === null ? "scale-[1.04]" : "scale-100")
                }
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
                  alt={secondary!.alt || localizedTitle}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  quality={90}
                  className={
                    cardImageClass +
                    " transition-transform duration-[700ms] ease-out " +
                    (showSecondary ? "scale-[1.04]" : "scale-100")
                  }
                />
              </div>
            )}
          </>
        ) : (
          <ProductImage
            key={`${displayIdx}-placeholder-${activeColor?.hex}`}
            hex={activeColor?.hex ?? "#d6d3d1"}
            section={product.section}
            className={
              "absolute inset-0 h-full w-full transition-transform duration-[700ms] ease-out " +
              (imageHovered && previewIdx === null ? "scale-[1.04]" : "scale-100")
            }
            imageClassName="object-cover object-center"
          />
        )}

        <div className="pointer-events-none absolute left-3 top-3 z-10 hidden flex-col gap-1.5 lg:flex">
          {onSale && (
            <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-800 shadow-sm backdrop-blur-md">
              {t("catalog.badgeSale")}
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-800 shadow-sm backdrop-blur-md">
              {t("catalog.badgeNew")}
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 z-10 hidden lg:block">
          <WishlistButton slug={product.slug} />
        </div>

        </div>
      </Link>
      </div>

      {showSwatches ? (
        <ProductColorSwatches
          productSlug={product.slug}
          colors={colors}
          previewIndex={previewIdx}
          defaultIndex={defaultColorIdx}
          onPreview={setPreviewIdx}
          className="mt-2 px-0.5 sm:mt-3"
        />
      ) : null}

      <div className="mt-1.5 px-0.5 sm:mt-2.5 lg:hidden">
        <WishlistButton slug={product.slug} variant="compact" />
      </div>

      <Link href={withLocalePath(`/product/${product.slug}`, locale)} className={"flex flex-1 flex-col px-0.5 " + (showSwatches ? "mt-1.5 sm:mt-2.5" : "mt-2.5 sm:mt-3.5")}>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
          {getBrandName(product.brandSlug)}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[10px] font-normal leading-snug tracking-[-0.01em] text-stone-700 transition-colors group-hover:text-stone-950 sm:text-[10.5px]">
          {localizedTitle}
        </h3>
      </Link>

      <div className="relative mt-1.5 px-0.5 sm:mt-2 lg:mt-2.5">
        <div className="transition-all duration-300 group-hover:pointer-events-none group-hover:-translate-y-1 group-hover:opacity-0 max-lg:hidden">
          <div className="flex items-baseline gap-2">
            {onSale && (
              <span className="price-strike text-[12px] font-normal text-stone-400">
                {formatPrice(product.oldPrice!, locale)}
              </span>
            )}
            <span
              className={
                "tracking-wide " +
                (onSale ? "text-[14px] font-bold text-sale" : "text-[13px] font-medium text-stone-950")
              }
            >
              {formatPrice(product.price, locale)}
            </span>
          </div>
          <PreorderStatusBadge status={product.status} compact className="mt-1.5" />
        </div>
        <div className="mb-1.5 lg:hidden">
          <div className="flex items-baseline gap-2">
            {onSale && (
              <span className="price-strike text-[10px] font-normal text-stone-400">
                {formatPrice(product.oldPrice!, locale)}
              </span>
            )}
            <span
              className={
                "font-bold uppercase tracking-[0.08em] " +
                (onSale ? "text-[12px] text-sale" : "text-[11px] text-stone-950")
              }
            >
              {formatPrice(product.price, locale)}
            </span>
          </div>
          <PreorderStatusBadge status={product.status} compact className="mt-1.5" />
        </div>
        <button
          type="button"
          onClick={openQuickView}
          className="absolute inset-x-0 top-0 flex h-7 translate-y-2 items-center justify-center rounded-md bg-stone-950 px-2 text-[9px] font-semibold text-white opacity-0 shadow-sm transition-all duration-300 ease-out hover:bg-stone-800 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100 sm:h-8 sm:px-2.5 sm:text-[10px] lg:h-9 lg:text-[11px]"
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