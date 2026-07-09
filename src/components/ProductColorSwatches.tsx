"use client";

import Link from "next/link";
import type { ProductColor } from "@/lib/types";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeColorName } from "@/lib/product-i18n";
import ProductImage from "./ProductImage";

export const MAX_SWATCHES = 5;
const VISIBLE_BEFORE_OVERFLOW = MAX_SWATCHES - 1;

export function getColorImages(color: ProductColor) {
  return (color.images ?? []).filter((img) => img.src);
}

/** Front-facing shot for color picker / card thumbnails (avoids angle or inside views). */
export function getColorSwatchImage(color: ProductColor) {
  const images = getColorImages(color);
  if (!images.length) return undefined;
  const frontCard = images.find((img) => /-front-card\.(?:png|jpe?g|webp)(?:\?|$)/i.test(img.src));
  if (frontCard) return frontCard;
  const front = images.find((img) =>
    /\/[^/]*front(?!-alt)[^/?]*\.(?:png|jpe?g|webp)(?:\?|$)/i.test(img.src),
  );
  return front ?? images[0];
}

export function getProductColorHref(productSlug: string, colorName: string) {
  return `/product/${productSlug}?color=${encodeURIComponent(colorName)}`;
}

type SwatchItem =
  | { type: "color"; color: ProductColor; index: number }
  | { type: "overflow"; count: number };

function getSwatchItems(colors: ProductColor[]): SwatchItem[] {
  if (colors.length <= MAX_SWATCHES) {
    return colors.map((color, index) => ({ type: "color", color, index }));
  }
  const visible = colors.slice(0, VISIBLE_BEFORE_OVERFLOW).map((color, index) => ({
    type: "color" as const,
    color,
    index,
  }));
  return [...visible, { type: "overflow", count: colors.length - VISIBLE_BEFORE_OVERFLOW }];
}

function ColorSwatch({
  color,
  highlighted,
  href,
  onPreview,
  label,
  swatchFit = "cover",
}: {
  color: ProductColor;
  highlighted: boolean;
  href: string;
  onPreview: () => void;
  label: string;
  swatchFit?: "cover" | "contain";
}) {
  const thumb = getColorSwatchImage(color);
  const hasThumb = Boolean(thumb?.src);
  const swatchImageClass =
    swatchFit === "contain"
      ? "object-contain object-center p-0.5"
      : "object-cover object-center";

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      onTouchStart={onPreview}
      className={
        "relative box-border flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white transition-all duration-200 ease-out " +
        (highlighted
          ? "border border-transparent ring-1 ring-[#111] ring-offset-2"
          : "border border-[#EDE9E5]")
      }
    >
      {hasThumb ? (
        <ProductImage
          hex={color.hex}
          section="accessories"
          src={thumb!.src}
          alt=""
          sizes="24px"
          unoptimized
          imageClassName={swatchImageClass}
          className="block size-full overflow-hidden rounded-full bg-stone-50"
        />
      ) : (
        <span
          className="block size-full overflow-hidden rounded-full"
          style={{ backgroundColor: color.hex }}
        />
      )}
    </Link>
  );
}

export default function ProductColorSwatches({
  productSlug,
  colors,
  previewIndex = null,
  defaultIndex = 0,
  onPreview,
  swatchFit = "cover",
  className = "",
}: {
  productSlug: string;
  colors: ProductColor[];
  previewIndex?: number | null;
  defaultIndex?: number;
  onPreview?: (index: number | null) => void;
  swatchFit?: "cover" | "contain";
  className?: string;
}) {
  const locale = useLocale();
  const t = useT();
  if (colors.length === 0) return null;

  const swatchItems = getSwatchItems(colors);
  const highlightIndex = previewIndex ?? defaultIndex;

  return (
    <div
      className={"flex flex-wrap items-center gap-2 " + className}
      onMouseLeave={() => onPreview?.(null)}
    >
      {swatchItems.map((item) =>
        item.type === "color" ? (
          <ColorSwatch
            key={`${item.color.name}-${item.index}`}
            color={item.color}
            highlighted={item.index === highlightIndex}
            href={withLocalePath(getProductColorHref(productSlug, item.color.name), locale)}
            onPreview={() => onPreview?.(item.index)}
            label={localizeColorName(item.color, locale)}
            swatchFit={swatchFit}
          />
        ) : (
          <Link
            key="overflow"
            href={withLocalePath(`/product/${productSlug}`, locale)}
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#EDE9E5] bg-white text-[10px] font-medium leading-none text-[#111]/60 transition hover:border-[#111]"
            aria-label={`${t("common.moreColors")} ${item.count}`}
          >
            +{item.count}
          </Link>
        ),
      )}
    </div>
  );
}