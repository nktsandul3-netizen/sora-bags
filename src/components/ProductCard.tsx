"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getBrandName } from "@/lib/data";
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
  const displayIdx = previewIdx ?? 0;
  const activeColor = colors[displayIdx] ?? colors[0];
  const colorImages = activeColor ? getColorImages(activeColor) : [];
  const primary = colorImages[0];
  const secondary = colorImages[1];
  // Вторую картинку (свап по наведению) грузим только на десктопе — на телефоне
  // ховера нет, поэтому это лишняя загрузка, которая тормозит каталог.
  const hasSwap = Boolean(isDesktop && secondary && secondary.src !== primary?.src);
  const showSecondary = imageHovered && previewIdx === null && hasSwap;
  const showSwatches = colors.length > 0;
  const galleryFit = product.galleryFit ?? "cover";
  const cardImageClass =
    galleryFit === "contain"
      ? "object-contain object-center p-1 sm:p-2"
      : "object-cover object-center";

  function openQuickView() {
    setQuickViewMounted(true);
    setQuickViewOpen(true);
  }

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="block">
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-stone-950/20 bg-white"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
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
            <span className="rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-800 shadow-sm backdrop-blur-sm">
              {t("catalog.badgeSale")}
            </span>
          )}
          {product.isNew && (
            <span className="rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-800 shadow-sm backdrop-blur-sm">
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
          className="absolute inset-x-0 top-0 flex h-9 translate-y-2 items-center justify-center rounded-md bg-stone-950 px-3 text-[11px] font-semibold text-white opacity-0 shadow-sm transition-all duration-300 ease-out hover:bg-stone-800 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100 sm:h-10 sm:px-4 sm:text-[12px] lg:h-14 lg:text-[13px]"
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