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
import PreorderStatusBadge from "./PreorderStatusBadge";

export default function ProductCard({ product }: { product: Product }) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [imageHovered, setImageHovered] = useState(false);
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
  const showSwatches = colors.length > 1;
  const galleryFit = product.galleryFit ?? "cover";
  const cardImageClass =
    galleryFit === "contain"
      ? "object-contain object-center"
      : "object-cover object-center";

  return (
    <div className="group flex flex-col">
      <div
        className="relative aspect-[4/5] h-full w-full"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <div className="relative h-full w-full overflow-hidden rounded-none border border-[#E8E4DF] bg-white p-0 transition duration-500 group-hover:-translate-y-0.5">
          <Link
            href={withLocalePath(`/product/${product.slug}`, locale)}
            className="absolute inset-0 z-0 block"
            aria-label={localizedTitle}
          >
            {primary?.src ? (
              <>
                <div
                  className={
                    "absolute inset-[18px] transition-opacity duration-300 ease-out " +
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
                      "absolute inset-[18px] transition-opacity duration-300 ease-out " +
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
                  "absolute inset-[18px] h-auto w-auto transition-transform duration-[700ms] ease-out " +
                  (imageHovered && previewIdx === null ? "scale-[1.04]" : "scale-100")
                }
                imageClassName="object-contain object-center"
              />
            )}
          </Link>

          <div className="pointer-events-none absolute left-3 top-3 z-10 hidden flex-col gap-1.5 lg:flex">
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

          <div className="absolute right-3 top-3 z-20 hidden lg:block">
            <WishlistButton slug={product.slug} />
          </div>
        </div>
      </div>

      {/* Свотчи → бренд 12px; бренд → название 4px; название → цена 14px; цена → статус 6px */}
      <div className="mt-3.5 flex min-h-6 items-center justify-between gap-2 px-0.5">
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

      <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="mt-3 flex flex-col px-0.5">
        <p className="text-[11px] font-normal uppercase tracking-[0.08em] text-[#111]/36">
          {getBrandName(product.brandSlug)}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-[14px] font-normal leading-5 text-[#151515] transition-colors group-hover:opacity-80">
          {localizedTitle}
        </h3>
      </Link>

      <div className="mt-3.5 px-0.5">
        <div className="flex items-baseline gap-2">
          {onSale && (
            <span className="price-strike text-[13px] font-normal text-[#111]/40">
              {formatPrice(product.oldPrice!, locale)}
            </span>
          )}
          <span
            className={
              onSale ? "text-[15px] font-medium text-sale" : "text-[15px] font-medium text-[#111]"
            }
          >
            {formatPrice(product.price, locale)}
          </span>
        </div>
        <PreorderStatusBadge status={product.status} compact className="mt-1.5" />
      </div>
    </div>
  );
}
