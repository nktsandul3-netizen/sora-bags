"use client";

import { useId } from "react";
import Link from "next/link";
import type { ProductColor } from "@/lib/types";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeColorName } from "@/lib/product-i18n";

export const MAX_SWATCHES = 5;
const VISIBLE_BEFORE_OVERFLOW = MAX_SWATCHES - 1;

export function getColorImages(color: ProductColor) {
  return (color.images ?? []).filter((img) => img.src);
}

/** Primary shot for color picker / card thumbnails (gallery order wins; front-card override). */
export function getColorSwatchImage(color: ProductColor) {
  const images = getColorImages(color);
  if (!images.length) return undefined;
  const frontCard = images.find((img) => /-front-card\.(?:png|jpe?g|webp)(?:\?|$)/i.test(img.src));
  if (frontCard) return frontCard;
  return images[0];
}

export function getProductColorHref(productSlug: string, colorName: string) {
  return `/product/${productSlug}?color=${encodeURIComponent(colorName)}`;
}

type SwatchSize = "sm" | "md";

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

function LeatherTexture({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const patternId = `leather-grain-${uid}`;

  return (
    <svg
      aria-hidden
      className={"pointer-events-none absolute inset-0 h-full w-full " + className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse">
          <path
            d="M0 4 L4 0 M-1 1 L1 -1 M3 5 L5 3"
            stroke="currentColor"
            strokeWidth="0.45"
            fill="none"
          />
          <path
            d="M0 0 L4 4 M-1 3 L1 5 M3 -1 L5 1"
            stroke="currentColor"
            strokeWidth="0.35"
            fill="none"
            opacity="0.65"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function swatchShellClass(size: SwatchSize) {
  // True arch: rounded-t-full = semicircle top when height > width/2
  return size === "md"
    ? "h-8 w-[22px] rounded-t-full"
    : "h-[26px] w-[18px] rounded-t-full";
}

function ColorSwatchFace({
  color,
  size,
}: {
  color: ProductColor;
  size: SwatchSize;
}) {
  return (
    <span
      className={
        "relative block overflow-hidden " +
        swatchShellClass(size) +
        " shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
      }
      style={{ backgroundColor: color.hex }}
    >
      <LeatherTexture className="text-black/20 mix-blend-multiply" />
      <LeatherTexture className="text-white/15 mix-blend-overlay" />
    </span>
  );
}

function ColorSwatch({
  color,
  highlighted,
  href,
  onPreview,
  onSelect,
  label,
  size = "sm",
}: {
  color: ProductColor;
  highlighted: boolean;
  href?: string;
  onPreview: () => void;
  onSelect?: () => void;
  label: string;
  size?: SwatchSize;
}) {
  const shell =
    "group/swatch relative flex shrink-0 flex-col items-center gap-1 outline-none transition " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]";

  const underline = (
    <span
      aria-hidden
      className={
        "block h-[2px] w-full rounded-full bg-[#111] transition-opacity duration-150 " +
        (highlighted ? "opacity-100" : "opacity-0 group-hover/swatch:opacity-40")
      }
    />
  );

  const face = <ColorSwatchFace color={color} size={size} />;

  if (onSelect) {
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={highlighted}
        title={label}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        onTouchStart={onPreview}
        onClick={onSelect}
        className={shell}
      >
        {face}
        {underline}
      </button>
    );
  }

  return (
    <Link
      href={href!}
      aria-label={label}
      title={label}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      onTouchStart={onPreview}
      className={shell}
    >
      {face}
      {underline}
    </Link>
  );
}

export default function ProductColorSwatches({
  productSlug,
  colors,
  previewIndex = null,
  defaultIndex = 0,
  onPreview,
  onSelect,
  size = "sm",
  className = "",
}: {
  productSlug: string;
  colors: ProductColor[];
  previewIndex?: number | null;
  defaultIndex?: number;
  onPreview?: (index: number | null) => void;
  /** When set, swatches act as buttons (PDP / Quick View) instead of links. */
  onSelect?: (index: number) => void;
  size?: SwatchSize;
  className?: string;
  /** @deprecated Photo fit no longer used — hex + leather texture swatches. */
  swatchFit?: "cover" | "contain";
}) {
  const locale = useLocale();
  const t = useT();
  if (colors.length === 0) return null;

  // PDP / Quick View need every color; cards keep compact overflow.
  const swatchItems = onSelect
    ? colors.map((color, index) => ({ type: "color" as const, color, index }))
    : getSwatchItems(colors);
  const highlightIndex = previewIndex ?? defaultIndex;
  const overflowSize =
    size === "md"
      ? "inline-flex h-8 w-[22px] shrink-0 items-center justify-center rounded-t-full"
      : "inline-flex h-[26px] w-[18px] shrink-0 items-center justify-center rounded-t-full";

  return (
    <div
      className={"flex flex-wrap items-end gap-3 " + className}
      onMouseLeave={() => onPreview?.(null)}
    >
      {swatchItems.map((item) =>
        item.type === "color" ? (
          <ColorSwatch
            key={`${item.color.name}-${item.index}`}
            color={item.color}
            highlighted={item.index === highlightIndex}
            href={
              onSelect
                ? undefined
                : withLocalePath(getProductColorHref(productSlug, item.color.name), locale)
            }
            onPreview={() => onPreview?.(item.index)}
            onSelect={onSelect ? () => onSelect(item.index) : undefined}
            label={localizeColorName(item.color, locale)}
            size={size}
          />
        ) : (
          <Link
            key="overflow"
            href={withLocalePath(`/product/${productSlug}`, locale)}
            className={
              overflowSize +
              " border border-[#EDE9E5] bg-white text-[10px] font-medium leading-none text-[#111]/60 transition hover:border-[#111]"
            }
            aria-label={`${t("common.moreColors")} ${item.count}`}
          >
            +{item.count}
          </Link>
        ),
      )}
    </div>
  );
}
