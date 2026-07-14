"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getBrandName, getFeaturedColorIndex } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import { getColorFamilies } from "@/lib/color-taxonomy";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeProductImageAlt, localizeProductTitle } from "@/lib/product-i18n";
import ProductColorSwatches, { getColorImages } from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import QuickViewModal from "./QuickViewModal";
import { getDeliveryInfo } from "@/lib/delivery";

/** Compact product card for the homepage blue capsule grid. */
export default function CapsuleProductCard({ product }: { product: Product }) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewMounted, setQuickViewMounted] = useState(false);
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
  const showSwatches = colors.length > 1;
  const galleryFit = product.galleryFit ?? "cover";
  const primaryFit = primary?.fit ?? galleryFit;
  const mobileBackgroundBlend = getColorFamilies(activeColor?.name ?? "").includes("white")
    ? ""
    : " max-lg:mix-blend-darken";
  const delivery = getDeliveryInfo({ status: product.status ?? "pre_order" }, locale);

  return (
    <div
      className="group flex h-full min-h-[420px] flex-col border border-[#F0EDE9] bg-[#FFFFFF] max-md:min-h-0 max-md:border-transparent max-md:shadow-none md:shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="relative shrink-0">
        <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="block touch-manipulation">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--background)]">
            {primary?.src ? (
              <Image
                src={primary.src}
                alt={localizeProductImageAlt(primary.alt, locale) || localizedTitle}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                quality={80}
                loading="lazy"
                fetchPriority="low"
                className={
                  (primaryFit === "contain"
                    ? "object-contain object-center"
                    : "object-cover object-center max-md:object-contain") +
                  mobileBackgroundBlend +
                  " transition-transform duration-[700ms] ease-out md:group-hover:scale-[1.04]"
                }
              />
            ) : null}

            <div className="pointer-events-none absolute left-[12px] top-[12px] z-10 flex flex-col gap-1.5">
              {onSale ? (
                <span className="bg-white/90 px-2 py-1 text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-[#1A1A1A]">
                  {t("catalog.badgeSale")}
                </span>
              ) : null}
              {product.isNew ? (
                <span className="bg-white/90 px-2 py-1 text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-[#1A1A1A]">
                  {t("catalog.badgeNew")}
                </span>
              ) : null}
            </div>

            <div className="absolute right-[12px] top-[12px] z-10">
              <WishlistButton slug={product.slug} variant="card" />
            </div>
          </div>
        </Link>
      </div>

      {/* Fixed swatch row so cards without colors stay aligned with neighbors */}
      <div className="shrink-0 px-3 pt-3.5">
        <div className="flex min-h-10 items-end">
          {showSwatches ? (
            <ProductColorSwatches
              productSlug={product.slug}
              colors={colors}
              previewIndex={previewIdx}
              defaultIndex={defaultColorIdx}
              onPreview={setPreviewIdx}
              className="flex-nowrap"
            />
          ) : null}
        </div>
      </div>

      <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="mt-3 flex shrink-0 flex-col px-3">
        <p className="text-[11px] font-normal uppercase tracking-[0.08em] text-[#111]/36">
          {getBrandName(product.brandSlug)}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-[14px] font-normal leading-5 text-[#151515]">
          {localizedTitle}
        </h3>
      </Link>

      <div className="mt-auto flex flex-col px-3 pb-4 pt-3.5">
        <div className="flex min-h-5 items-baseline gap-2">
          {onSale ? (
            <span className="price-strike text-[13px] font-normal text-[#111]/40">
              {formatPrice(product.oldPrice!, locale)}
            </span>
          ) : null}
          <span className="text-[15px] font-medium text-[#111]">
            {formatPrice(product.price, locale)}
          </span>
        </div>
        <p className="mt-1.5 min-h-4 text-[12px] font-normal leading-4 text-[#111]/48">
          {delivery.badge}
        </p>
        <button
          type="button"
          onClick={() => {
            setQuickViewMounted(true);
            setQuickViewOpen(true);
          }}
          className="mt-3 flex h-11 w-full shrink-0 items-center justify-center border border-[#111] bg-transparent text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white"
        >
          {t("common.buy")}
        </button>
      </div>

      {quickViewMounted ? (
        <QuickViewModal
          product={product}
          open={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
          initialColorIdx={displayIdx}
        />
      ) : null}
    </div>
  );
}
