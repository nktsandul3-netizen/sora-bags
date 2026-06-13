"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getBrandName } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { useIsDesktop } from "@/lib/useIsDesktop";
import ProductImage from "./ProductImage";
import ProductColorSwatches, { getColorImages } from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import QuickViewModal from "./QuickViewModal";

export default function ProductCard({ product }: { product: Product }) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [imageHovered, setImageHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewMounted, setQuickViewMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
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
  const showSwatches = colors.length > 1;
  const delivery = getDeliveryInfo(product);

  function openQuickView() {
    setQuickViewMounted(true);
    setQuickViewOpen(true);
  }

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
        <div
          className="relative h-0 w-full overflow-hidden rounded-lg bg-white pb-[130%]"
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
                alt={primary.alt || product.title}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                quality={90}
                className={
                  "object-contain object-center transition-transform duration-[700ms] ease-out " +
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
                  alt={secondary!.alt || product.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  quality={90}
                  className={
                    "object-contain object-center transition-transform duration-[700ms] ease-out " +
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
          <span className="rounded-sm bg-stone-900/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-sm">
            {delivery.badge}
          </span>
          {onSale && (
            <span className="rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-800 shadow-sm backdrop-blur-sm">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-800 shadow-sm backdrop-blur-sm">
              New
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 z-10">
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
          className="mt-3 px-0.5"
        />
      ) : null}

      <Link href={`/product/${product.slug}`} className={"flex flex-1 flex-col px-0.5 " + (showSwatches ? "mt-2.5" : "mt-3.5")}>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
          {getBrandName(product.brandSlug)}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-stone-700 transition-colors group-hover:text-stone-950">
          {product.title}
        </h3>
      </Link>

      <div className="relative mt-2 h-10 px-0.5 lg:mt-2.5 lg:h-11">
        <div className="flex h-full items-center gap-2 transition-all duration-300 group-hover:pointer-events-none group-hover:-translate-y-1 group-hover:opacity-0 max-lg:hidden">
          <span
            className={
              "text-[13px] tracking-wide " +
              (onSale ? "font-semibold text-[--c-accent]" : "font-medium text-stone-950")
            }
          >
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-[12px] text-stone-400 line-through">
              {formatPrice(product.oldPrice!)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={openQuickView}
          className="absolute inset-x-0 top-0 flex h-10 translate-y-2 items-center justify-center rounded-md bg-stone-950 px-4 text-[12px] font-semibold text-white opacity-0 shadow-sm transition-all duration-300 ease-out hover:bg-stone-800 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100 lg:h-11 lg:text-[13px]"
        >
          Купить {formatPrice(product.price)}
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