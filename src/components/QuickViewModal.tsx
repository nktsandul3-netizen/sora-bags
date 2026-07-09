"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart";
import { getBrandName } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { getPurchaseKind, getPurchaseKindForItem } from "@/lib/purchase-kind";
import {
  localizeColorName,
  localizeProductDescription,
  localizeProductHighlights,
  localizeProductSpec,
  localizeProductTitle,
  getVisibleProductSpecs,
} from "@/lib/product-i18n";
import { getColorImages, getColorSwatchImage } from "./ProductColorSwatches";
import ProductImage from "./ProductImage";
import WishlistButton from "./WishlistButton";
import PreorderStatusBadge from "./PreorderStatusBadge";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
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

function AccordionSection({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-t border-stone-200">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-[15px] text-stone-800 transition hover:text-stone-950 [&::-webkit-details-marker]:hidden">
        <span className="text-stone-500">{icon}</span>
        <span className="flex-1">{title}</span>
        <span className="ml-2 flex h-4 w-4 shrink-0 items-center justify-center text-[#9CA3AF]" aria-hidden>
          <svg viewBox="0 0 16 16" className="h-4 w-4 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M8 3.25v9.5M3.25 8h9.5" />
          </svg>
          <svg viewBox="0 0 16 16" className="hidden h-4 w-4 group-open:block" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M3.25 8h9.5" />
          </svg>
        </span>
      </summary>
      <div className="pb-5 pl-7 text-sm leading-relaxed text-stone-600">{children}</div>
    </details>
  );
}

const sectionIcons = {
  description: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M7 4.75h10a1 1 0 0 1 1 1v13.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.75a1 1 0 0 1 1-1z" />
      <path d="M9.5 9h5M9.5 12.5h5M9.5 16h3" strokeLinecap="round" />
    </svg>
  ),
  specs: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M8.75 8.5V7a3.25 3.25 0 0 1 6.5 0v1.5" strokeLinecap="round" />
      <path d="M6.5 8.5h11l1 11.5h-13l1-11.5z" strokeLinejoin="round" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M3.5 7h10v10h-10z" strokeLinejoin="round" />
      <path d="M13.5 10h4l3 3v4h-7" strokeLinejoin="round" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  ),
  highlights: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M12 4.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z" strokeLinejoin="round" />
    </svg>
  ),
};

export default function QuickViewModal({
  product,
  open,
  onClose,
  initialColorIdx = 0,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
  initialColorIdx?: number;
}) {
  const { add, openCart } = useCart();
  const [selection, setSelection] = useState(() => ({
    open,
    productSlug: product.slug,
    initialColorIdx,
    colorIdx: initialColorIdx,
    imageIdx: 0,
  }));
  const [added, setAdded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const selectionIsStale =
    selection.open !== open ||
    selection.productSlug !== product.slug ||
    selection.initialColorIdx !== initialColorIdx;
  const colorIdx = selectionIsStale ? initialColorIdx : selection.colorIdx;
  const imageIdx = selectionIsStale ? 0 : selection.imageIdx;
  const locale = useLocale();
  const t = useT();

  function setSelectedColorIdx(nextColorIdx: number) {
    setSelection({
      open,
      productSlug: product.slug,
      initialColorIdx,
      colorIdx: nextColorIdx,
      imageIdx: 0,
    });
  }

  function setSelectedImageIdx(nextImageIdx: number | ((current: number) => number)) {
    setSelection((current) => {
      const base = current.open === open &&
        current.productSlug === product.slug &&
        current.initialColorIdx === initialColorIdx
        ? current
        : {
            open,
            productSlug: product.slug,
            initialColorIdx,
            colorIdx: initialColorIdx,
            imageIdx: 0,
          };

      return {
        ...base,
        imageIdx:
          typeof nextImageIdx === "function" ? nextImageIdx(base.imageIdx) : nextImageIdx,
      };
    });
  }

  const showAdded = selectionIsStale ? false : added;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const brandName = getBrandName(product.brandSlug);
  const color = product.colors[colorIdx] ?? product.colors[0];
  const images = color ? getColorImages(color) : [];
  const galleryImages = images.length > 0 ? images : product.images ?? [];
  const safeImageIdx = galleryImages.length
    ? Math.min(imageIdx, galleryImages.length - 1)
    : 0;
  const activeImage = galleryImages[safeImageIdx];
  const hasGallery = galleryImages.length > 1;
  const canNavigateMedia = hasGallery || product.colors.length > 1;
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
  const delivery = getDeliveryInfo(product, locale);
  const canBuy = product.status !== "out_of_stock";
  const purchaseKind = color ? getPurchaseKindForItem(product, color.name) : getPurchaseKind(product);
  const isPreorder = purchaseKind === "preorder";
  const swatchImageClass =
    (product.galleryFit ?? "cover") === "contain"
      ? "object-contain object-center p-0.5"
      : "object-cover object-center";
  const localizedColor = localizeColorName(color, locale);
  const localizedDescription = localizeProductDescription(product, locale);
  const localizedTitle = localizeProductTitle(product, locale);

  function handleAdd() {
    if (!canBuy || !color) return;
    add({
      slug: product.slug,
      title: product.title,
      brand: brandName,
      price: product.price,
      color: color.name,
      purchaseKind,
    });
    onClose();
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function showImage(direction: "prev" | "next") {
    if (hasGallery) {
      setSelectedImageIdx((current) =>
        direction === "next"
          ? (current + 1) % galleryImages.length
          : (current - 1 + galleryImages.length) % galleryImages.length,
      );
      return;
    }
    if (product.colors.length < 2) return;
    setSelectedColorIdx(
      direction === "next"
        ? (colorIdx + 1) % product.colors.length
        : (colorIdx - 1 + product.colors.length) % product.colors.length,
    );
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[90] flex items-end justify-center bg-stone-950/45 backdrop-blur-[2px] sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_30px_90px_rgba(28,25,23,0.3)] sm:rounded-[24px] lg:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="absolute right-4 top-4 z-20 flex items-center justify-center text-stone-700 transition hover:text-stone-950 sm:right-5 sm:top-5 sm:h-9 sm:w-9 sm:rounded-full sm:border sm:border-[#EEE] sm:bg-white/90 sm:text-stone-800 sm:backdrop-blur sm:hover:bg-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-[18px] sm:w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="min-h-0 overflow-y-auto lg:flex lg:w-full lg:overflow-visible">
              {/* Фото */}
              <div className="relative shrink-0 bg-gradient-to-br from-stone-50 via-[#f7f1e9] to-white p-3 lg:w-[46%]">
                <div
                  className="group relative aspect-[4/5] max-h-[44vh] w-full overflow-hidden rounded-[22px] border border-white/80 bg-white/70 shadow-[0_20px_60px_-42px_rgba(28,25,23,0.8)] ring-1 ring-stone-950/10 sm:max-h-[50vh] lg:h-full lg:max-h-none lg:min-h-[560px]"
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
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div
                      className="absolute -left-16 -top-14 h-44 w-44 rounded-full opacity-25 blur-3xl"
                      style={{ backgroundColor: color?.hex ?? "#d6d3d1" }}
                    />
                    <div className="absolute inset-x-10 bottom-4 h-20 rounded-full bg-stone-950/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.92),transparent_35%)]" />
                  </div>
                  <div className="absolute inset-2 overflow-hidden rounded-[17px] bg-white/75 shadow-inner ring-1 ring-white/80">
                    <ProductImage
                      key={`${colorIdx}-${safeImageIdx}-${activeImage?.src ?? "placeholder"}`}
                      hex={color?.hex ?? "#d6d3d1"}
                      section={product.section}
                      src={activeImage?.src}
                      alt={activeImage?.alt ?? localizedTitle}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      imageClassName="object-contain object-center"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>

                  {canNavigateMedia && (
                    <>
                      <button
                        type="button"
                        aria-label={t("common.previousPhoto")}
                        onClick={() => showImage("prev")}
                        className="absolute left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-stone-900 opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur transition hover:bg-white group-hover:opacity-100 md:flex"
                      >
                        <ArrowIcon direction="left" />
                      </button>
                      <button
                        type="button"
                        aria-label={t("common.nextPhoto")}
                        onClick={() => showImage("next")}
                        className="absolute right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-stone-900 opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur transition hover:bg-white group-hover:opacity-100 md:flex"
                      >
                        <ArrowIcon direction="right" />
                      </button>
                      {hasGallery ? (
                        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
                          {galleryImages.map((image, i) => (
                            <button
                              key={`${image.src}-dot-${i}`}
                              type="button"
                              aria-label={`${t("common.photo")} ${i + 1}`}
                              onClick={() => setSelectedImageIdx(i)}
                              className="flex items-center justify-center p-1"
                            >
                              <span
                                aria-hidden
                                className={
                                  "block h-1.5 rounded-full transition-all " +
                                  (i === safeImageIdx
                                    ? "w-5 bg-stone-950"
                                    : "w-1.5 bg-stone-400/70")
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

              {/* Контент */}
              <div className="flex-1 px-5 pb-7 pt-5 sm:px-8 sm:pt-7 lg:overflow-y-auto">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-400">
                  {brandName}
                </p>
                <h2 className="mt-1.5 pr-10 font-serif text-2xl leading-snug text-stone-950">
                  {localizedTitle}
                </h2>
                <div className="my-4">
                  <span className="flex items-baseline gap-2">
                    {onSale && (
                      <span className="price-strike text-sm font-normal text-stone-400">
                        {formatPrice(product.oldPrice!, locale)}
                      </span>
                    )}
                    <span
                      className={
                        "text-[28px] font-semibold tracking-[-0.02em] " +
                        (onSale ? "text-sale" : "text-[#1A1A1A]")
                      }
                    >
                      {formatPrice(product.price, locale)}
                    </span>
                  </span>
                  <PreorderStatusBadge status={product.status} className="mt-2" />
                </div>

                {/* Цвета (фото-миниатюры) */}
                <div className="mt-5">
                  <p className="text-sm text-stone-700">
                    {t("catalog.color")}: <span className="text-stone-500">{localizedColor}</span>
                  </p>
                  {product.colors.length > 1 && (
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {product.colors.map((c, i) => {
                        const thumb = getColorSwatchImage(c);
                        const selected = i === colorIdx;
                        return (
                          <button
                            key={`${c.name}-${i}`}
                            type="button"
                            onClick={() => setSelectedColorIdx(i)}
                            aria-label={localizeColorName(c, locale)}
                            title={localizeColorName(c, locale)}
                            className={
                              "relative box-border h-12 w-12 overflow-hidden rounded-[10px] bg-transparent p-0.5 transition " +
                              (selected
                                ? "border-[1.5px] border-[#111]"
                                : "border border-[#E5E0DC] hover:border-stone-400")
                            }
                          >
                            <span className="relative block h-full w-full overflow-hidden rounded-[7px]">
                              {thumb ? (
                                <ProductImage
                                  hex={c.hex}
                                  section={product.section}
                                  src={thumb.src}
                                  alt={thumb.alt || c.name}
                                  sizes="48px"
                                  unoptimized
                                  imageClassName={swatchImageClass}
                                  className="absolute inset-0 h-full w-full"
                                />
                              ) : (
                                <span
                                  className="absolute inset-0"
                                  style={{ backgroundColor: c.hex }}
                                />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Кнопки */}
                <div className="mt-6 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!canBuy}
                    className="flex h-12 flex-1 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-semibold tracking-wide text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {canBuy
                      ? showAdded
                        ? `${isPreorder ? t("common.addedToPreorder") : t("common.addedToCart")} ✓`
                        : isPreorder
                          ? t("common.placePreorder")
                          : t("common.addToCart")
                      : t("common.outOfStock")}
                  </button>
                  <WishlistButton slug={product.slug} variant="ring" />
                </div>

                <p className="mt-2.5 text-center text-[12px] text-[#6B7280]">
                  {t("catalog.freeShipReturnTrust")}
                </p>

                {/* Аккордеоны */}
                <div className="mt-6 border-b border-stone-200">
                  <AccordionSection icon={sectionIcons.description} title={t("catalog.description")}>
                    <p className="whitespace-pre-line">{localizedDescription}</p>
                  </AccordionSection>
                  {product.highlights && product.highlights.length > 0 && (
                    <AccordionSection icon={sectionIcons.highlights} title={t("catalog.highlights")}>
                      <ul className="space-y-2">
                        {localizeProductHighlights(product, locale).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-stone-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionSection>
                  )}
                  <AccordionSection icon={sectionIcons.specs} title={t("catalog.specs")}>
                    <dl className="space-y-2">
                      {getVisibleProductSpecs(product.specs).map((s) => {
                        const localized = localizeProductSpec(s, locale);
                        return (
                          <div key={s.label} className="flex justify-between gap-6">
                            <dt className="text-stone-500">{localized.label}</dt>
                            <dd className="text-right text-stone-800">{localized.value}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </AccordionSection>
                  <AccordionSection icon={sectionIcons.delivery} title={t("catalog.deliveryReturns")}>
                    <p>{delivery.description}</p>
                  </AccordionSection>
                </div>

                <Link
                  href={withLocalePath(`/product/${product.slug}`, locale)}
                  onClick={onClose}
                  className="mt-5 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-stone-900 transition hover:text-stone-600"
                >
                  {t("catalog.details")}
                  <ArrowIcon direction="right" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
