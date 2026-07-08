"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, ProductImageAsset } from "@/lib/types";
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
  localizeProductSpec,
  localizeProductTitle,
  localizeStaticText,
  getVisibleProductSpecs,
} from "@/lib/product-i18n";
import ProductImage from "./ProductImage";
import { getColorSwatchImage } from "./ProductColorSwatches";
import WishlistButton from "./WishlistButton";
import PreorderStatusBadge from "./PreorderStatusBadge";
import BrandStories from "./BrandStories";

const reserveButton: Record<string, string> = {
  ru: "Заказать по телефону",
  ro: "Rezervă în magazin",
  en: "Reserve in store",
};

const reserveLabel: Record<string, string> = {
  ru: "Здравствуйте! Хочу забронировать в магазине",
  ro: "Bună ziua! Doresc să rezerv în magazin",
  en: "Hello! I would like to reserve in store",
};

const phoneCallCopy: Record<string, { title: string; hint: string }> = {
  ru: { title: "Позвонить напрямую", hint: "Нажмите, чтобы позвонить" },
  ro: { title: "Sună direct", hint: "Apasă pentru apel" },
  en: { title: "Call directly", hint: "Tap to call" },
};

const contactHints: Record<string, { whatsapp: string; telegram: string; viber: string }> = {
  ru: {
    whatsapp: "Сообщение уже готово",
    telegram: "Открыть чат",
    viber: "Открыть чат",
  },
  ro: {
    whatsapp: "Mesajul este deja pregătit",
    telegram: "Deschide chatul",
    viber: "Deschide chatul",
  },
  en: {
    whatsapp: "Message is ready to send",
    telegram: "Open chat",
    viber: "Open chat",
  },
};

const leatherBadgeLabel: Record<string, string> = {
  ru: "100% натуральная кожа",
  ro: "100% piele naturală",
  en: "100% genuine leather",
};

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
    className: "h-5 w-5",
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
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
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

function LeatherHideIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-[18px] w-[18px] shrink-0 text-[#7a4f2d]" aria-hidden>
      <path
        d="M22 6h20c.6 7.7 5.3 12.2 14 11.3l5 10.4c-7.8 3.8-9.8 9.8-5 17.4L46 58c-6.9-4.9-21.1-4.9-28 0L8 45.1c4.8-7.6 2.8-13.6-5-17.4l5-10.4c8.7.9 13.4-3.6 14-11.3Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.4"
      />
      <path
        d="M23.8 11.5h16.4M10.4 25.4c4.4.9 8.3.1 11.6-2.4M53.6 25.4c-4.4.9-8.3.1-11.6-2.4M14 42.6c3.9-1 7.4-.5 10.7 1.4M50 42.6c-3.9-1-7.4-.5-10.7 1.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        opacity="0.55"
      />
    </svg>
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
  if (!colorParam) return 0;
  const normalized = colorParam.trim().toLowerCase();
  const idx = product.colors.findIndex((c) => c.name.trim().toLowerCase() === normalized);
  return idx >= 0 ? idx : 0;
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
  const backdropImage = images[0] ?? activeImage;
  const onSale = product.oldPrice && product.oldPrice > product.price;
  const hasGallery = images.length > 1;
  const canNavigateMedia = hasGallery || product.colors.length > 1;
  const canBuy = product.status !== "out_of_stock";
  const purchaseKind = getPurchaseKindForItem(product, color.name);
  const isPreorder = purchaseKind === "preorder";
  const galleryFit = product.galleryFit ?? "cover";
  const showLeatherBadge = hasPureLeatherMaterial(product);
  const activeImageFit = activeImage?.fit ?? galleryFit;
  const swatchImageClass =
    galleryFit === "contain"
      ? "object-contain object-center p-1"
      : "object-cover object-center";
  const galleryImageClass =
    activeImageFit === "contain"
      ? "object-contain object-center p-3 sm:p-4"
      : "object-cover object-center";
  const localizedColor = localizeColorName(color, locale);
  const localizedDescription = localizeProductDescription(product, locale);
  const localizedTitle = localizeProductTitle(product, locale);
  const specGroups = useMemo(() => groupProductSpecs(getVisibleProductSpecs(product.specs)), [product.specs]);
  const leftSpecGroups = specGroups.filter((group) => group.title === "Размеры" || group.title === "Особенности");
  const rightSpecGroups = specGroups.filter((group) => group.title === "Материал и уход" || group.title === "Доставка и возврат");
  const reserveMessage = `${reserveLabel[locale] ?? reserveLabel.ru}: ${localizedTitle}, ${t(
    "catalog.color",
  ).toLowerCase()}: ${localizedColor}`;
  const contactOptions = [
    {
      name: "WhatsApp" as const,
      icon: "whatsapp" as const,
      href: `${brand.social.whatsapp}?text=${encodeURIComponent(reserveMessage)}`,
      color: "#25D366",
      hint: contactHints[locale]?.whatsapp ?? contactHints.ru.whatsapp,
    },
    {
      name: "Telegram" as const,
      icon: "telegram" as const,
      href: brand.social.telegram,
      color: "#229ED9",
      hint: contactHints[locale]?.telegram ?? contactHints.ru.telegram,
    },
    {
      name: "Viber" as const,
      icon: "viber" as const,
      href: brand.social.viber,
      color: "#7360F2",
      hint: contactHints[locale]?.viber ?? contactHints.ru.viber,
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageIdx(0);
  }, [colorIdx]);

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
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br from-stone-50 via-[#f7f1e9] to-white shadow-[0_24px_70px_-42px_rgba(28,25,23,0.75)] ring-1 ring-stone-950/10">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute -left-20 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl"
              style={{ backgroundColor: color.hex }}
            />
            <div className="absolute inset-x-8 bottom-6 h-28 rounded-full bg-stone-950/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.95),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.42),transparent_52%)]" />
          </div>
          <div className="absolute inset-3 overflow-hidden rounded-[22px] bg-white/70 shadow-inner ring-1 ring-white/70">
            {activeImage?.src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${colorIdx}-${safeImageIdx}-${activeImage.src}`}
                src={activeImage.src}
                alt={activeImage.alt ?? localizedTitle}
                loading="eager"
                className={`relative z-10 h-full w-full transition-transform duration-700 group-hover:scale-[1.018] ${galleryImageClass}`}
              />
            ) : (
              <ProductImage
                key={`${colorIdx}-${safeImageIdx}-placeholder`}
                hex={color.hex}
                section={product.section}
                alt={localizedTitle}
                sizes="(min-width: 1024px) 50vw, 100vw"
                imageClassName="object-contain object-center"
                className="h-full w-full"
              />
            )}
          </div>

          {canNavigateMedia && (
            <>
              <button
                type="button"
                aria-label={t("common.previousPhoto")}
                onClick={() => showImage("prev")}
                className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 text-stone-900 shadow-[0_14px_35px_-18px_rgba(28,25,23,0.8)] backdrop-blur-md transition hover:scale-105 hover:bg-white"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label={t("common.nextPhoto")}
                onClick={() => showImage("next")}
                className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 text-stone-900 shadow-[0_14px_35px_-18px_rgba(28,25,23,0.8)] backdrop-blur-md transition hover:scale-105 hover:bg-white"
              >
                <ArrowIcon direction="right" />
              </button>

              <div className="absolute right-5 top-5 z-20 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[11px] font-medium tabular-nums tracking-[0.12em] text-stone-700 shadow-sm backdrop-blur-md">
                {hasGallery ? `${safeImageIdx + 1}/${images.length}` : `${colorIdx + 1}/${product.colors.length}`}
              </div>

              {hasGallery ? (
              <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full border border-white/70 bg-white/70 px-2 py-1 shadow-[0_12px_30px_-20px_rgba(28,25,23,0.7)] backdrop-blur-md">
                {images.map((image, i) => (
                  <button
                    key={`${image.alt}-dot-${i}`}
                    type="button"
                    aria-label={`${t("common.photo")} ${i + 1}`}
                    onClick={() => setImageIdx(i)}
                    className="flex items-center justify-center p-2"
                  >
                    <span
                      aria-hidden
                      className={
                        "block h-1.5 rounded-full transition-all " +
                        (i === safeImageIdx ? "w-7 bg-stone-950" : "w-1.5 bg-stone-400/70")
                      }
                    />
                  </button>
                ))}
              </div>
              ) : null}
            </>
          )}
        </div>

      </div>

      <div className="self-start">
        <div className="relative -mx-4 overflow-hidden sm:-mx-6 lg:mx-0 lg:rounded-3xl">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {backdropImage?.src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`backdrop-${colorIdx}-${backdropImage.src}`}
                src={backdropImage.src}
                alt=""
                className="h-full w-full scale-[1.85] object-cover blur-3xl saturate-[1.35]"
              />
            ) : null}
            <div
              className="absolute inset-0 opacity-[0.32]"
              style={{ backgroundColor: color.hex }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/68 to-white/95" />
          </div>
          <div className="relative p-6 sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-center gap-3.5 leading-none">
          <span className="product-detail-brand-reveal inline-flex h-[27px] items-center text-[15px] font-medium text-stone-950">
            SÓRA
          </span>
          <div className="product-detail-badge product-detail-badge-delay-1 inline-flex items-center gap-2 rounded-[5px] bg-white px-2.5 py-1.5 text-[14px] font-medium leading-none text-stone-800 shadow-sm ring-1 ring-stone-200/70">
            <span className="flex h-4 w-5 overflow-hidden rounded-[2px]" aria-hidden>
              <span className="flex-1 bg-[#009246]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#ce2b37]" />
            </span>
            Made in Italy
          </div>
          {showLeatherBadge && (
            <div className="product-detail-badge product-detail-badge-delay-2 inline-flex items-center gap-1.5 rounded-[5px] bg-white px-2 py-1.5 text-[12px] font-medium leading-none text-stone-700 shadow-sm ring-1 ring-stone-200/70">
              <LeatherHideIcon />
              {leatherBadgeLabel[locale] ?? leatherBadgeLabel.ru}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-5">
          <h1 className="product-detail-title-reveal min-w-0 flex-1 font-sans text-[17px] font-normal leading-[1.25] tracking-[-0.01em] text-stone-950 sm:text-[19px]">
            {localizedTitle}
          </h1>
          <div className="product-detail-price-reveal flex shrink-0 items-baseline gap-2 pt-0.5">
            {onSale && (
              <span className="price-strike text-[16px] font-normal text-stone-400">
                {formatPrice(product.oldPrice!, locale)}
              </span>
            )}
            <span
              className={
                "leading-none tracking-[-0.01em] " +
                (onSale
                  ? "text-[20px] font-bold text-sale sm:text-[22px]"
                  : "text-[18px] font-normal text-stone-950 sm:text-[20px]")
              }
            >
              {formatPrice(product.price, locale)}
            </span>
          </div>
        </div>
        <PreorderStatusBadge
          status={isPreorder ? "pre_order" : product.status}
          className="product-detail-status-reveal mt-2"
          pulse
        />
        <div className="mt-8">
          <p className="text-base text-stone-950">
            <span className="font-semibold">{t("catalog.color")}</span>{" "}
            <span className="font-normal text-stone-500">{localizedColor}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colors.map((c, i) => {
              const thumb = getColorSwatchImage(c);
              const selected = i === colorIdx;
              const cName = localizeColorName(c, locale);
              const cStatus = localizeStaticText(c.status, locale);
              return (
                <button
                  key={`${c.name}-${i}`}
                  type="button"
                  onClick={() => setColorIdx(i)}
                  aria-label={cName}
                  aria-pressed={selected}
                  title={cStatus ? `${cName} — ${cStatus}` : cName}
                  className={
                    "relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden bg-stone-50 transition sm:h-[4.5rem] sm:w-[4.5rem] " +
                    (selected
                      ? "ring-1 ring-stone-950"
                      : "ring-1 ring-transparent hover:ring-stone-300")
                  }
                >
                  <ProductImage
                    hex={c.hex}
                    section={product.section}
                    src={thumb?.src}
                    alt={thumb?.alt ?? c.name}
                    sizes="64px"
                    unoptimized
                    imageClassName={swatchImageClass}
                    className="h-full w-full"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canBuy}
            className="w-full rounded-sm bg-stone-950 px-7 py-[1.125rem] text-base font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {canBuy
              ? added
                ? `${isPreorder ? t("common.addedToPreorder") : t("common.addedToCart")} ✓`
                : isPreorder
                  ? t("common.placePreorder")
                  : t("common.addToCart")
              : t("common.outOfStock")}
          </button>
          <div className="flex flex-col">
            <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setContactOpen((v) => !v)}
              aria-expanded={contactOpen}
              className="flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-sm border border-stone-200 bg-white px-5 py-4 text-base font-medium text-stone-950 outline-none transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-stone-300 hover:bg-[#fafafa] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.995] active:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111] focus-visible:outline-offset-[3px] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              {reserveButton[locale] ?? reserveButton.ru}
              <svg
                viewBox="0 0 24 24"
                className={
                  "h-5 w-5 shrink-0 transition-transform duration-[225ms] ease-out motion-reduce:transition-none " +
                  (contactOpen ? "rotate-180" : "rotate-0")
                }
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="h-14 w-14">
              <WishlistButton slug={product.slug} variant="square" />
            </div>
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
                    "mt-3 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_12px_40px_-18px_rgba(28,25,23,0.45)] transition-[opacity,transform] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none motion-reduce:transform-none " +
                    (contactOpen
                      ? "pointer-events-auto opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 -translate-y-1.5")
                  }
                >
              <div className="border-b border-stone-100 p-2.5 sm:p-3">
                <a
                  href={`tel:${primaryStore.phone.replace(/\s/g, "")}`}
                  className="flex min-h-14 items-center gap-3 rounded-lg border border-[#e1e1e1] bg-white px-3.5 py-3 outline-none transition-[background-color,border-color,transform] duration-150 hover:border-[#bdbdbd] hover:bg-[#fafafa] active:scale-[0.995] active:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111] focus-visible:outline-offset-[3px] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  <span className="flex h-9 w-9 shrink-0 self-center items-center justify-center rounded-full border border-stone-100 bg-white text-stone-900">
                    <PhoneIcon />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-xs font-medium leading-snug text-stone-600">
                      {phoneCallCopy[locale]?.title ?? phoneCallCopy.ru.title}
                    </span>
                    <span className="mt-0.5 block text-lg font-bold leading-tight tracking-tight text-[#111] sm:text-xl">
                      {primaryStore.phone}
                    </span>
                    <span className="mt-1 block text-[11px] leading-snug text-stone-500">
                      {phoneCallCopy[locale]?.hint ?? phoneCallCopy.ru.hint}
                    </span>
                  </span>
                </a>
              </div>
              <div className="divide-y divide-stone-100">
                {contactOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setContactOpen(false)}
                    className="group flex items-center gap-4 px-5 py-3.5 transition hover:bg-stone-50"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition group-hover:scale-105"
                      style={{ backgroundColor: option.color }}
                    >
                      <MessengerIcon name={option.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-stone-950">{option.name}</span>
                      <span className="block text-xs text-stone-400">{option.hint}</span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-stone-500"
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

        <BrandStories productSlug={product.slug} className="mt-8 scale-110 origin-top-left justify-start" />
          </div>
        </div>
      </div>
      </div>

        <div className="mt-16 w-full lg:mt-24">
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