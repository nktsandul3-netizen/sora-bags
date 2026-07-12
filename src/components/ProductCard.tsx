"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getBrandName, getFeaturedColorIndex } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import { findColorIndexForFilterFamilies } from "@/lib/color-taxonomy";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeProductImageAlt, localizeProductTitle } from "@/lib/product-i18n";
import ProductImage from "./ProductImage";
import ProductColorSwatches, { getColorImages, getProductColorHref } from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import PreorderStatusBadge from "./PreorderStatusBadge";

function CardNavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={
        "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center " +
        "rounded-full border border-stone-200/80 bg-white/85 text-stone-800 shadow-sm " +
        "backdrop-blur-sm transition hover:bg-white " +
        "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto " +
        "duration-200 " +
        (direction === "prev" ? "left-2.5" : "right-2.5")
      }
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        {direction === "prev" ? (
          <path d="M10 3 L5 8 L10 13" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3 L11 8 L6 13" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function ProductCard({
  product,
  activeFilterColors = [],
}: {
  product: Product;
  /** Color family keys from catalog URL `?color=` (e.g. `blue`). */
  activeFilterColors?: string[];
}) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [imageIdx, setImageIdx] = useState(0);
  const isDesktop = useIsDesktop();
  const locale = useLocale();
  const t = useT();
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
  const localizedTitle = localizeProductTitle(product, locale);
  const colors = product.colors;
  const defaultColorIdx = getFeaturedColorIndex(product);
  const filterKey = activeFilterColors.join(",");

  const filterColorIdx = useMemo(
    () =>
      findColorIndexForFilterFamilies(
        colors.map((color) => color.name),
        activeFilterColors,
      ),
    [colors, activeFilterColors],
  );

  // When the catalog color filter changes, drop manual/hover preview so the card follows the filter.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewIdx(null);
  }, [filterKey, product.slug]);

  const displayIdx = previewIdx ?? filterColorIdx ?? defaultColorIdx;
  const activeColor = colors[displayIdx] ?? colors[0];
  const colorImages = activeColor ? getColorImages(activeColor) : [];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageIdx(0);
  }, [displayIdx, product.slug]);

  const safeImageIdx =
    colorImages.length > 0 ? ((imageIdx % colorImages.length) + colorImages.length) % colorImages.length : 0;
  const activeImage = colorImages[safeImageIdx] ?? colorImages[0];
  const canCycleImages = Boolean(isDesktop && colorImages.length > 1);
  const showSwatches = colors.length > 1;
  const galleryFit = product.galleryFit ?? "cover";
  const activeImageFit = activeImage?.fit ?? galleryFit;
  const cardImageClass =
    activeImageFit === "contain"
      ? "object-contain object-center"
      : "object-cover object-center max-md:object-contain";
  const productHref = withLocalePath(
    activeColor
      ? getProductColorHref(product.slug, activeColor.name)
      : `/product/${product.slug}`,
    locale,
  );

  const hoverReveal =
    "opacity-100 max-lg:opacity-100 lg:opacity-0 lg:pointer-events-none " +
    "lg:transition-opacity lg:duration-200 " +
    "lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto";

  function stepImage(dir: 1 | -1) {
    if (colorImages.length < 2) return;
    setImageIdx((current) => (current + dir + colorImages.length) % colorImages.length);
  }

  return (
    <div
      className={
        "group flex flex-col border border-transparent bg-transparent transition-[border-color] duration-200 " +
        "md:hover:border-[#1A1A1A]"
      }
    >
      <div className="relative aspect-[4/5] h-full w-full">
        <div className="relative h-full w-full overflow-hidden rounded-none border border-[#E8E4DF] bg-[var(--background)] p-0 transition-[border-color] duration-200 max-md:border-transparent md:group-hover:border-transparent">
          <Link
            href={productHref}
            className="absolute inset-0 z-0 block touch-manipulation"
            aria-label={localizedTitle}
          >
            {activeImage?.src ? (
              <Image
                key={`${displayIdx}-${safeImageIdx}-${activeImage.src}`}
                src={activeImage.src}
                alt={localizeProductImageAlt(activeImage.alt, locale) || localizedTitle}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                quality={88}
                className={cardImageClass + " transition-opacity duration-300 ease-out"}
              />
            ) : (
              <ProductImage
                key={`${displayIdx}-placeholder-${activeColor?.hex}`}
                hex={activeColor?.hex ?? "#d6d3d1"}
                section={product.section}
                className="absolute inset-0 h-auto w-auto"
                imageClassName="object-contain object-center"
              />
            )}
          </Link>

          {canCycleImages && (
            <>
              <CardNavArrow
                direction="prev"
                label={t("common.previousPhoto")}
                onClick={() => stepImage(-1)}
              />
              <CardNavArrow
                direction="next"
                label={t("common.nextPhoto")}
                onClick={() => stepImage(1)}
              />
            </>
          )}

          <div
            className={
              "pointer-events-none absolute left-3 top-3 z-10 hidden flex-col gap-1.5 lg:flex " +
              "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            }
          >
            {onSale && (
              <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-stone-800 shadow-sm backdrop-blur-md">
                {t("catalog.badgeSale")}
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-stone-800 shadow-sm backdrop-blur-md">
                {t("catalog.badgeNew")}
              </span>
            )}
          </div>

          <div className={"absolute right-3 top-3 z-20 hidden lg:block " + hoverReveal}>
            <WishlistButton slug={product.slug} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2 px-3">
        <Link href={productHref} className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-normal leading-[1.35] tracking-[-0.01em] text-[#2D2D2D]">
            {getBrandName(product.brandSlug)} {localizedTitle}
          </h3>
        </Link>
        <span className="shrink-0 lg:hidden">
          <WishlistButton slug={product.slug} variant="compact" />
        </span>
      </div>

      <div className="mt-2 px-3">
        <div className="flex items-baseline gap-2">
          {onSale && (
            <span className="price-strike text-[14px] font-normal text-[#2D2D2D]/40">
              {formatPrice(product.oldPrice!, locale)}
            </span>
          )}
          <span
            className={
              onSale
                ? "text-[15px] font-normal text-sale"
                : "text-[15px] font-normal text-[#2D2D2D]"
            }
          >
            {formatPrice(product.price, locale)}
          </span>
        </div>
        <PreorderStatusBadge status={product.status} compact className="mt-2" />
      </div>

      <div className={"mt-3 flex min-h-10 items-end px-3 pb-3 " + hoverReveal}>
        {showSwatches ? (
          <ProductColorSwatches
            productSlug={product.slug}
            colors={colors}
            previewIndex={previewIdx}
            defaultIndex={filterColorIdx ?? defaultColorIdx}
            onPreview={setPreviewIdx}
          />
        ) : null}
      </div>
    </div>
  );
}
