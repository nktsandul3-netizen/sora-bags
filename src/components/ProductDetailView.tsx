"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, ProductImageAsset } from "@/lib/types";
import { getFeaturedColorIndex } from "@/lib/data";
import { useCart } from "@/context/cart";
import { brand } from "@/lib/config";
import { primaryStore } from "@/lib/stores";
import { formatPrice } from "@/lib/format";
import { useLocale, useT } from "@/lib/useI18n";
import { getPurchaseKindForItem } from "@/lib/purchase-kind";
import {
  localizeColorName,
  localizeProductDescription,
  localizeProductHighlights,
  localizeProductImageAlt,
  localizeProductSpec,
  localizeProductTitle,
  localizeStaticText,
  getVisibleProductSpecs,
} from "@/lib/product-i18n";
import ProductImage from "./ProductImage";
import ProductColorSwatches from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import PreorderStatusBadge from "./PreorderStatusBadge";
import BrandStories from "./BrandStories";
import TrustNotes from "./TrustNotes";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8.5 4.5h2l1.2 4.8a1 1 0 0 1-.46 1.08l-1.52 1.01a11 11 0 0 0 5.6 5.6l1.01-1.52a1 1 0 0 1 1.08-.46l4.8 1.2v2a1 1 0 0 1-1 1A14.5 14.5 0 0 1 7.5 5.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function MessengerIcon({ name }: { name: "whatsapp" | "telegram" | "viber" }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5 text-[#111]",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;
  if (name === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.25 8.25 0 0 1-1.26-4.4c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.84c0 4.55-3.71 8.25-8.25 8.25Zm4.52-6.18c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    );
  }
  if (name === "telegram") {
    return (
      <svg {...common}>
        <path d="M21.94 4.64 18.9 19a1.2 1.2 0 0 1-1.79.72l-4.36-3.22-2.1 2.02c-.23.23-.43.43-.88.43l.31-4.46 8.11-7.33c.35-.31-.08-.49-.55-.18L7.7 13.13l-4.32-1.35c-.94-.29-.96-.94.2-1.39l16.9-6.52c.78-.29 1.47.18 1.46 1.07Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12.5 2C8 2 3.6 2.3 3.6 8.1v6.2c0 2 1.3 3.6 2.8 4.2v3a.6.6 0 0 0 1 .43l2.5-2.4c.86.05 1.74.05 2.6 0 4.5 0 8.9-.3 8.9-6.1V8.1C21.4 2.3 17 2 12.5 2Zm4.9 12.1c-.4.85-1.5 1.4-2.3 1.55-.25.05-.55.1-.95-.05-.95-.35-2.3-.85-3.95-2.3a10.7 10.7 0 0 1-2.6-3.55c-.2-.55-.3-1-.3-1.45 0-.6.3-1 .6-1.25.2-.2.45-.3.7-.3h.5c.2 0 .35.05.55.45.2.45.65 1.55.7 1.65.05.1.1.25 0 .4-.1.2-.2.3-.35.45-.1.1-.25.25-.1.5.15.25.65 1.05 1.4 1.7.95.85 1.7 1.1 1.95 1.25.2.1.35.05.5-.1.15-.2.6-.7.75-.95.15-.25.3-.2.5-.1.2.05 1.25.6 1.45.7.2.1.35.15.4.25.05.1.05.5-.15.95Z" />
    </svg>
  );
}

function getImages(product: Product, colorIdx: number): ProductImageAsset[] {
  return product.colors[colorIdx]?.images ?? product.images ?? [];
}

type ProductSpec = NonNullable<Product["specs"]>[number];

const specGroupOrder = [
  "Размеры",
  "Особенности",
  "Материал и уход",
  "Доставка и возврат",
] as const;

type SpecGroupTitle = (typeof specGroupOrder)[number];

const dimensionSpecLabels = new Set(["Размер", "Размеры", "Ширина", "Объём", "Совместимость"]);
const deliverySpecLabels = new Set(["Доставка", "Возврат"]);
const materialSpecLabels = new Set(["Материал", "Кожа", "Материалы", "Подкладка", "Фурнитура", "Отделка", "Страна производства", "Уход"]);

function getSpecGroupTitle(label: string): SpecGroupTitle {
  if (dimensionSpecLabels.has(label)) return "Размеры";
  if (deliverySpecLabels.has(label)) return "Доставка и возврат";
  if (materialSpecLabels.has(label)) return "Материал и уход";
  return "Особенности";
}

function groupProductSpecs(specs: ProductSpec[]): { title: SpecGroupTitle; specs: ProductSpec[] }[] {
  const grouped = new Map<SpecGroupTitle, ProductSpec[]>();
  for (const title of specGroupOrder) {
    grouped.set(title, []);
  }
  for (const spec of specs) {
    grouped.get(getSpecGroupTitle(spec.label))?.push(spec);
  }
  return specGroupOrder
    .map((title) => ({ title, specs: grouped.get(title) ?? [] }))
    .filter((group) => group.specs.length > 0);
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
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ItalyFlagIcon() {
  return (
    <span className="inline-flex h-2 w-3 shrink-0 overflow-hidden" aria-hidden>
      <span className="h-full flex-1 bg-[#009246]" />
      <span className="h-full flex-1 bg-white" />
      <span className="h-full flex-1 bg-[#ce2b37]" />
    </span>
  );
}

function isPureLeatherMaterial(value: string) {
  const text = value.trim().toLowerCase();
  const hasLeather = text.includes("кож") || /\b(leather|calf)\b/.test(text);
  if (!hasLeather) return false;

  const mixedMaterialMarkers = [
    "+",
    "&",
    "замша",
    "suede",
    "рафи",
    "raffia",
    "rattan",
    "солом",
    "straw",
    "шелк",
    "шёлк",
    "silk",
    "плетёный материал",
    "плетеный материал",
    "details",
    "trim",
  ];

  return !mixedMaterialMarkers.some((marker) => text.includes(marker));
}

function hasPureLeatherMaterial(product: Product) {
  if (isPureLeatherMaterial(product.material)) return true;

  return product.specs?.some((spec) => {
    const label = spec.label.trim().toLowerCase();
    const isMaterialSpec = label === "материал" || label === "материалы" || label === "кожа";
    return isMaterialSpec && isPureLeatherMaterial(spec.value);
  });
}

function getInitialColorIdx(product: Product, colorParam: string | null) {
  if (colorParam) {
    const normalized = colorParam.trim().toLowerCase();
    const idx = product.colors.findIndex((c) => c.name.trim().toLowerCase() === normalized);
    if (idx >= 0) return idx;
  }
  return getFeaturedColorIndex(product);
}

export default function ProductDetailView({
  product,
  brandName,
}: {
  product: Product;
  brandName: string;
}) {
  const { add, openCart } = useCart();
  const locale = useLocale();
  const t = useT();
  const searchParams = useSearchParams();
  const initialColorIdx = useMemo(
    () => getInitialColorIdx(product, searchParams.get("color")),
    [product, searchParams],
  );
  const [colorIdx, setColorIdx] = useState(initialColorIdx);
  const [imageIdx, setImageIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [showStickyBuy, setShowStickyBuy] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const addToCartRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetch(`/api/products/${product.slug}/view`, { method: "POST" }).catch(() => {});
  }, [product.slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColorIdx(initialColorIdx);
    setImageIdx(0);
  }, [initialColorIdx, product.slug]);

  const color = product.colors[colorIdx];
  const images = getImages(product, colorIdx);
  const safeImageIdx = images.length ? Math.min(imageIdx, images.length - 1) : 0;
  const activeImage = images[safeImageIdx];
  const onSale = product.oldPrice && product.oldPrice > product.price;
  const hasGallery = images.length > 1;
  const canNavigateMedia = hasGallery || product.colors.length > 1;
  const canBuy = product.status !== "out_of_stock";
  const purchaseKind = getPurchaseKindForItem(product, color.name);
  const isPreorder = purchaseKind === "preorder";
  const galleryFit = product.galleryFit ?? "cover";
  const showLeatherBadge = hasPureLeatherMaterial(product);
  const activeImageFit = activeImage?.fit ?? galleryFit;
  const galleryHoverClass =
    activeImageFit === "contain" ? "" : "transition-transform duration-700 group-hover:scale-[1.018]";
  const localizedColor = localizeColorName(color, locale);
  const localizedDescription = localizeProductDescription(product, locale);
  const localizedTitle = localizeProductTitle(product, locale);
  const specGroups = useMemo(() => groupProductSpecs(getVisibleProductSpecs(product.specs)), [product.specs]);
  const leftSpecGroups = specGroups.filter((group) => group.title === "Размеры" || group.title === "Особенности");
  const rightSpecGroups = specGroups.filter((group) => group.title === "Материал и уход" || group.title === "Доставка и возврат");
  const reserveMessage = `${t("pdp.reserveMessage")}: ${localizedTitle}, ${t(
    "catalog.color",
  ).toLowerCase()}: ${localizedColor}`;
  const contactOptions = [
    {
      name: "WhatsApp" as const,
      icon: "whatsapp" as const,
      href: `${brand.social.whatsapp}?text=${encodeURIComponent(reserveMessage)}`,
      hint: t("pdp.messageReady"),
    },
    {
      name: "Telegram" as const,
      icon: "telegram" as const,
      href: brand.social.telegram,
      hint: t("pdp.openChat"),
    },
    {
      name: "Viber" as const,
      icon: "viber" as const,
      href: brand.social.viber,
      hint: t("pdp.openChat"),
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageIdx(0);
  }, [colorIdx]);

  useEffect(() => {
    const target = addToCartRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;

    const media = window.matchMedia("(max-width: 1023px)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBuy(media.matches && !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" },
    );

    const sync = () => {
      if (!media.matches) {
        setShowStickyBuy(false);
        return;
      }
      observer.observe(target);
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mobileContactOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileContactOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileContactOpen]);

  function handleAdd() {
    if (!canBuy) return;
    add({
      slug: product.slug,
      title: product.title,
      brand: brandName,
      price: product.price,
      color: color.name,
      purchaseKind,
    });
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const buyLabel = canBuy
    ? added
      ? `${isPreorder ? t("common.addedToPreorder") : t("common.addedToCart")} ✓`
      : isPreorder
        ? t("common.placePreorder")
        : t("common.addToCart")
    : t("common.outOfStock");

  function showImage(direction: "prev" | "next") {
    if (hasGallery) {
      setImageIdx((current) =>
        direction === "next"
          ? (current + 1) % images.length
          : (current - 1 + images.length) % images.length,
      );
      return;
    }
    if (product.colors.length < 2) return;
    setImageIdx(0);
    setColorIdx((current) =>
      direction === "next"
        ? (current + 1) % product.colors.length
        : (current - 1 + product.colors.length) % product.colors.length,
    );
  }

  return (
    <div className="mt-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <div>
        <div
          className="group relative flex h-[100svh] max-h-[100svh] touch-pan-y items-center justify-center overflow-hidden rounded-2xl bg-[var(--background)] lg:aspect-[4/5] lg:h-auto lg:max-h-none"
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null || !canNavigateMedia) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) < 40) return;
            showImage(dx < 0 ? "next" : "prev");
          }}
        >
            {activeImage?.src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${colorIdx}-${safeImageIdx}-${activeImage.src}`}
                src={activeImage.src}
                alt={localizeProductImageAlt(activeImage.alt, locale) || localizedTitle}
                loading="eager"
                className={
                  "relative z-10 max-h-[78svh] max-w-[85vw] object-contain object-center " +
                  "lg:absolute lg:inset-[3%] lg:h-[94%] lg:w-[94%] lg:max-h-none lg:max-w-none " +
                  (activeImageFit === "contain" ? "lg:object-contain" : "lg:object-cover lg:object-center") +
                  (galleryHoverClass ? ` ${galleryHoverClass}` : "")
                }
              />
            ) : (
              <ProductImage
                key={`${colorIdx}-${safeImageIdx}-placeholder`}
                hex={color.hex}
                section={product.section}
                alt={localizedTitle}
                sizes="(min-width: 1024px) 50vw, 100vw"
                imageClassName="object-contain object-center max-h-[78svh] max-w-[85vw] lg:max-h-none lg:max-w-none"
                className="relative z-10 flex h-auto w-auto items-center justify-center lg:absolute lg:inset-[3%] lg:h-[94%] lg:w-[94%]"
              />
            )}

          {canNavigateMedia && (
            <>
              <button
                type="button"
                aria-label={t("common.previousPhoto")}
                onClick={() => showImage("prev")}
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4C8C0] bg-white/95 text-[#111] shadow-[0_3px_12px_rgba(28,25,23,0.12)] outline-none transition hover:bg-white hover:shadow-[0_5px_16px_rgba(28,25,23,0.16)] focus:outline-none focus-visible:outline-none"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label={t("common.nextPhoto")}
                onClick={() => showImage("next")}
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4C8C0] bg-white/95 text-[#111] shadow-[0_3px_12px_rgba(28,25,23,0.12)] outline-none transition hover:bg-white hover:shadow-[0_5px_16px_rgba(28,25,23,0.16)] focus:outline-none focus-visible:outline-none"
              >
                <ArrowIcon direction="right" />
              </button>

              <div className="absolute right-4 top-4 z-20 text-[11px] font-medium tabular-nums tracking-[0.12em] text-[#111]/55">
                {hasGallery ? `${safeImageIdx + 1}/${images.length}` : `${colorIdx + 1}/${product.colors.length}`}
              </div>

              {hasGallery ? (
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3.5 py-2 shadow-[0_8px_28px_rgba(28,25,23,0.1)] backdrop-blur-md">
                  {images.map((image, i) => {
                    const active = i === safeImageIdx;
                    return (
                      <button
                        key={`${image.alt}-dot-${i}`}
                        type="button"
                        aria-label={`${t("common.photo")} ${i + 1}`}
                        aria-current={active ? "true" : undefined}
                        onClick={() => setImageIdx(i)}
                        className="group/dot flex h-5 w-5 items-center justify-center"
                      >
                        <span
                          aria-hidden
                          className={
                            "block rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                            (active
                              ? "h-[7px] w-7 bg-[#111] shadow-[0_1px_4px_rgba(17,17,17,0.28)]"
                              : "h-[7px] w-[7px] bg-[#111]/22 ring-1 ring-[#111]/12 group-hover/dot:bg-[#111]/40 group-hover/dot:ring-[#111]/25")
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>

      </div>

      <div className="self-start">
        <div className="notranslate relative -mx-4 overflow-hidden bg-[#F7F3F0] sm:-mx-6 lg:mx-0 lg:rounded-2xl">
          <div className="relative bg-[#F7F3F0] p-6 sm:p-7 lg:p-9">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 leading-none">
          <span className="product-detail-badge product-detail-badge-delay-1 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#111] opacity-60 lg:text-[12px]">
            <ItalyFlagIcon />
            {t("common.madeInItaly")}
          </span>
          {showLeatherBadge && (
            <span className="product-detail-badge product-detail-badge-delay-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#111] opacity-60 lg:text-[12px]">
              {t("common.genuineLeather")}
            </span>
          )}
        </div>
        <h1 className="product-detail-title-reveal mt-4 font-sans text-[20px] font-normal leading-[1.3] tracking-[-0.01em] text-[#111] lg:text-[22px]">
          {localizedTitle}
        </h1>

        <div className="product-detail-price-reveal mt-4 flex items-baseline gap-2.5">
          {onSale && (
            <span className="price-strike text-[16px] font-normal text-stone-400">
              {formatPrice(product.oldPrice!, locale)}
            </span>
          )}
          <span
            className={
              "text-[22px] font-bold leading-none tracking-[-0.01em] lg:text-[24px] " +
              (onSale ? "text-sale" : "text-[#111]")
            }
          >
            {formatPrice(product.price, locale)}
          </span>
        </div>

        <PreorderStatusBadge
          status={isPreorder ? "pre_order" : product.status}
          className="product-detail-status-reveal mt-3 !text-[13px] lg:!text-[14px]"
          pulse
        />

        <div className="mt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#111]/70 lg:text-[12px]">
            {t("catalog.color")}:{" "}
            <span className="font-semibold text-[#111]">{localizedColor}</span>
          </p>
          {product.colors.length > 0 ? (
            <div className="mt-3">
              <ProductColorSwatches
                productSlug={product.slug}
                colors={product.colors}
                defaultIndex={colorIdx}
                size="md"
                onSelect={setColorIdx}
              />
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            ref={addToCartRef}
            type="button"
            onClick={() => setContactOpen((v) => !v)}
            aria-expanded={contactOpen}
            className="min-h-[46px] w-full rounded-sm bg-stone-950 px-7 py-[1.125rem] text-base font-medium text-white outline-none transition hover:bg-stone-800 active:bg-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111] focus-visible:outline-offset-[3px] lg:text-[17px]"
          >
            {t("pdp.reserveButton")}
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!canBuy}
                className="flex h-12 flex-1 items-center justify-center rounded-sm border border-[#E8E2DD] bg-[#FFFBF9] px-5 text-[14px] font-medium text-[#111] outline-none transition hover:bg-white active:bg-[#F7F3F0] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111] focus-visible:outline-offset-[3px] lg:text-[15px]"
              >
                {buyLabel}
              </button>
              <WishlistButton slug={product.slug} variant="pdp" />
            </div>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: contactOpen ? "1fr" : "0fr" }}
              aria-hidden={!contactOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  inert={!contactOpen ? true : undefined}
                  className={
                    "mt-3 overflow-hidden rounded-2xl border border-[#EDE6E0] bg-white transition-[opacity,transform] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none motion-reduce:transform-none " +
                    (contactOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1.5 opacity-0")
                  }
                >
                  <div className="border-b border-[#F1EBE6] p-3">
                    <a
                      href={`tel:${primaryStore.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3.5 rounded-2xl border border-[#EDE6E0] bg-white px-[18px] py-4 outline-none transition hover:bg-[#FBF8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111] focus-visible:outline-offset-[3px]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EDE6E0] bg-[#F7F3F0] text-[#111]">
                        <PhoneIcon />
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block text-[12px] font-normal leading-snug text-[#111]/45">
                          {t("pdp.directCall")}
                        </span>
                        <span className="mt-0.5 block text-[20px] font-semibold leading-tight tracking-[0.01em] text-[#111]">
                          {primaryStore.phone}
                        </span>
                        <span className="mt-1 block text-[12px] font-normal leading-snug text-[#111]/40">
                          {t("pdp.tapToCall")}
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="divide-y divide-[#F1EBE6]">
                    {contactOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setContactOpen(false)}
                        className="group flex h-16 items-center gap-3.5 px-[18px] transition hover:bg-[#FBF8F6]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EDE6E0] bg-[#F7F3F0] text-[#111]">
                          <MessengerIcon name={option.icon} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-medium text-[#111]">{option.name}</span>
                          <span className="block text-[12px] text-[#111]/40">{option.hint}</span>
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0 text-[#111] opacity-[0.16]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden
                        >
                          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustNotes className="mt-6 space-y-2.5 px-0.5" />

        <BrandStories productSlug={product.slug} className="mt-8 origin-top-left scale-90 justify-start" />
          </div>
        </div>
      </div>
      </div>

        {mobileContactOpen ? (
          <div
            className="fixed inset-0 z-[70] flex items-end bg-black/35 backdrop-blur-[2px] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("pdp.reserveButton")}
          >
            <button
              type="button"
              aria-label={t("common.close")}
              onClick={() => setMobileContactOpen(false)}
              className="absolute inset-0"
            />
            <div className="relative z-10 w-full overflow-hidden rounded-t-[24px] border-t border-[#EDE6E0] bg-[#F7F3F0] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_rgba(28,25,23,0.18)]">
              <div className="flex items-center justify-between border-b border-[#E8E0DA] px-5 py-4">
                <p className="text-[16px] font-semibold text-[#111]">{t("pdp.reserveButton")}</p>
                <button
                  type="button"
                  aria-label={t("common.close")}
                  onClick={() => setMobileContactOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[24px] font-light leading-none text-[#111]"
                >
                  ×
                </button>
              </div>

              <div className="p-3">
                <a
                  href={`tel:${primaryStore.phone.replace(/\s/g, "")}`}
                  onClick={() => setMobileContactOpen(false)}
                  className="flex items-center gap-3.5 rounded-2xl border border-[#E4DBD4] bg-white px-4 py-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3F0] text-[#111]">
                    <PhoneIcon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] text-[#111]/48">{t("pdp.directCall")}</span>
                    <span className="mt-0.5 block text-[19px] font-semibold text-[#111]">
                      {primaryStore.phone}
                    </span>
                  </span>
                </a>
              </div>

              <div className="mx-3 overflow-hidden rounded-2xl border border-[#E4DBD4] bg-white">
                {contactOptions.map((option, index) => (
                  <a
                    key={`mobile-${option.name}`}
                    href={option.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileContactOpen(false)}
                    className={
                      "flex min-h-16 items-center gap-3.5 px-4 py-3 " +
                      (index > 0 ? "border-t border-[#F0EAE5]" : "")
                    }
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3F0] text-[#111]">
                      <MessengerIcon name={option.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-[#111]">{option.name}</span>
                      <span className="mt-0.5 block text-[12px] text-[#111]/45">{option.hint}</span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-[#111]/25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden
                    >
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {showStickyBuy ? (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EDE5DF] bg-[#F7F3F0]/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-[#111]">{localizedTitle}</p>
                <p className="mt-0.5 text-[15px] font-semibold text-[#111]">
                  {formatPrice(product.price, locale)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileContactOpen(true)}
                aria-expanded={mobileContactOpen}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm bg-stone-950 px-5 text-[13px] font-medium text-white transition hover:bg-stone-800 active:bg-stone-900"
              >
                {t("pdp.reserveButton")}
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-10 w-full lg:mt-14">
          <div className="grid w-full gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] xl:gap-x-16">
            <div className="border-b border-stone-200 lg:border-b-0">
              <section className="border-t border-stone-200 py-5">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="text-[13px] font-medium leading-none text-stone-500">
                    {localizeStaticText("Описание", locale)}
                  </h2>
                  <span className="text-sm leading-none text-stone-400" aria-hidden>
                    −
                  </span>
                </div>
                <div className="mt-4 text-[12px] leading-[1.65] text-stone-700">
                  <p className="whitespace-pre-line">{localizedDescription}</p>
                  {product.highlights && product.highlights.length > 0 && (
                    <ul className="mt-4 list-disc space-y-1.5 pl-4">
                      {localizeProductHighlights(product, locale).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>

            {(rightSpecGroups.length > 0 || leftSpecGroups.length > 0) && (
              <div className="grid w-full gap-x-10 gap-y-0 lg:grid-cols-2 xl:gap-x-14">
                <div className="border-b border-stone-200">
                  {rightSpecGroups.map((group) => (
                    <section key={group.title} className="border-t border-stone-200 py-5">
                      <div className="flex items-center justify-between gap-6">
                        <h2 className="text-[13px] font-medium leading-none text-stone-500">
                          {localizeStaticText(group.title, locale)}
                        </h2>
                        <span className="text-sm leading-none text-stone-400" aria-hidden>
                          −
                        </span>
                      </div>
                      <ul className="mt-4 list-disc space-y-1.5 pl-4 text-[12px] leading-[1.65] text-stone-700">
                        {group.specs.map((s) => {
                          const localized = localizeProductSpec(s, locale);
                          return (
                            <li key={`${group.title}-${s.label}`}>
                              <span className="font-medium text-stone-800">{localized.label}:</span>{" "}
                              {localized.value}
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))}
                </div>

                <div className="border-b border-stone-200">
                  {leftSpecGroups.map((group) => (
                    <section key={group.title} className="border-t border-stone-200 py-5">
                      <div className="flex items-center justify-between gap-6">
                        <h2 className="text-[13px] font-medium leading-none text-stone-500">
                          {localizeStaticText(group.title, locale)}
                        </h2>
                        <span className="text-sm leading-none text-stone-400" aria-hidden>
                          −
                        </span>
                      </div>
                      <ul className="mt-4 list-disc space-y-1.5 pl-4 text-[12px] leading-[1.65] text-stone-700">
                        {group.specs.map((s) => {
                          const localized = localizeProductSpec(s, locale);
                          return (
                            <li key={`${group.title}-${s.label}`}>
                              <span className="font-medium text-stone-800">{localized.label}:</span>{" "}
                              {localized.value}
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}