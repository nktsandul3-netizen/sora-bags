"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart";
import { getBrandName } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { getColorImages } from "./ProductColorSwatches";
import ProductImage from "./ProductImage";
import WishlistButton from "./WishlistButton";

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
        <span className="relative flex h-4 w-4 items-center justify-center text-stone-500" aria-hidden>
          <span className="absolute h-px w-3.5 bg-current" />
          <span className="absolute h-3.5 w-px bg-current transition-transform duration-200 group-open:scale-y-0" />
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
  const [mounted, setMounted] = useState(false);
  const [colorIdx, setColorIdx] = useState(initialColorIdx);
  const [imageIdx, setImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setColorIdx(initialColorIdx);
      setImageIdx(0);
      setAdded(false);
    }
  }, [open, initialColorIdx]);

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

  if (!mounted) return null;

  const brandName = getBrandName(product.brandSlug);
  const color = product.colors[colorIdx] ?? product.colors[0];
  const images = color ? getColorImages(color) : [];
  const galleryImages = images.length > 0 ? images : product.images ?? [];
  const safeImageIdx = galleryImages.length
    ? Math.min(imageIdx, galleryImages.length - 1)
    : 0;
  const activeImage = galleryImages[safeImageIdx];
  const hasGallery = galleryImages.length > 1;
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
  const delivery = getDeliveryInfo(product);
  const canBuy = product.status !== "out_of_stock";

  function handleAdd() {
    if (!canBuy || !color) return;
    add({
      slug: product.slug,
      title: product.title,
      brand: brandName,
      price: product.price,
      color: color.name,
    });
    onClose();
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function showImage(direction: "prev" | "next") {
    if (!hasGallery) return;
    setImageIdx((current) =>
      direction === "next"
        ? (current + 1) % galleryImages.length
        : (current - 1 + galleryImages.length) % galleryImages.length,
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
              aria-label="Закрыть"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-md transition hover:scale-105 hover:text-stone-950"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="overflow-y-auto lg:flex lg:w-full lg:overflow-visible">
              {/* Фото */}
              <div className="relative shrink-0 bg-stone-50 lg:w-[46%]">
                <div className="group relative aspect-[4/5] max-h-[44vh] w-full sm:max-h-[50vh] lg:h-full lg:max-h-none lg:min-h-[560px]">
                  <ProductImage
                    key={`${colorIdx}-${safeImageIdx}-${activeImage?.src ?? "placeholder"}`}
                    hex={color?.hex ?? "#d6d3d1"}
                    section={product.section}
                    src={activeImage?.src}
                    alt={activeImage?.alt ?? product.title}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    imageClassName="object-contain object-center"
                    className="absolute inset-0 h-full w-full"
                  />

                  {hasGallery && (
                    <>
                      <button
                        type="button"
                        aria-label="Предыдущее фото"
                        onClick={() => showImage("prev")}
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-stone-900 shadow-sm backdrop-blur transition hover:bg-white"
                      >
                        <ArrowIcon direction="left" />
                      </button>
                      <button
                        type="button"
                        aria-label="Следующее фото"
                        onClick={() => showImage("next")}
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-stone-900 shadow-sm backdrop-blur transition hover:bg-white"
                      >
                        <ArrowIcon direction="right" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1.5 shadow-sm backdrop-blur">
                        {galleryImages.map((image, i) => (
                          <button
                            key={`${image.src}-dot-${i}`}
                            type="button"
                            aria-label={`Фото ${i + 1}`}
                            onClick={() => setImageIdx(i)}
                            className={
                              "h-1.5 rounded-full transition-all " +
                              (i === safeImageIdx ? "w-5 bg-stone-950" : "w-1.5 bg-stone-400")
                            }
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Контент */}
              <div className="flex-1 px-5 pb-7 pt-5 sm:px-8 sm:pt-7 lg:overflow-y-auto">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-400">
                  {brandName}
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pr-10">
                  <h2 className="font-serif text-2xl leading-snug text-stone-950">
                    {product.title}
                  </h2>
                  <span className="flex items-baseline gap-2">
                    <span className={"text-xl font-semibold " + (onSale ? "text-[--c-accent]" : "text-stone-950")}>
                      {formatPrice(product.price)}
                    </span>
                    {onSale && (
                      <span className="text-sm text-stone-400 line-through">
                        {formatPrice(product.oldPrice!)}
                      </span>
                    )}
                  </span>
                </div>

                {/* Цвета (фото-миниатюры) */}
                <div className="mt-5">
                  <p className="text-sm text-stone-700">
                    Цвет: <span className="text-stone-500">{color?.name}</span>
                  </p>
                  {product.colors.length > 1 && (
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {product.colors.map((c, i) => {
                        const thumb = getColorImages(c)[0];
                        const selected = i === colorIdx;
                        return (
                          <button
                            key={`${c.name}-${i}`}
                            type="button"
                            onClick={() => setColorIdx(i)}
                            aria-label={c.name}
                            title={c.name}
                            className={
                              "relative h-16 w-16 overflow-hidden rounded-xl border bg-stone-50 transition " +
                              (selected
                                ? "border-stone-950 ring-1 ring-stone-950"
                                : "border-stone-200 hover:border-stone-400")
                            }
                          >
                            {thumb ? (
                              <ProductImage
                                hex={c.hex}
                                section={product.section}
                                src={thumb.src}
                                alt={thumb.alt || c.name}
                                sizes="64px"
                                imageClassName="object-contain object-center"
                                className="absolute inset-0 h-full w-full"
                              />
                            ) : (
                              <span
                                className="absolute inset-2 rounded-lg"
                                style={{ backgroundColor: c.hex }}
                              />
                            )}
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
                    className="flex-1 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {canBuy ? (added ? "Добавлено в корзину ✓" : "Добавить в корзину") : "Нет в наличии"}
                  </button>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200">
                    <WishlistButton slug={product.slug} />
                  </span>
                </div>

                <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-stone-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  {delivery.title} · {delivery.leadTime}
                </p>

                {/* Аккордеоны */}
                <div className="mt-6 border-b border-stone-200">
                  <AccordionSection icon={sectionIcons.description} title="Описание">
                    <p className="whitespace-pre-line">{product.description}</p>
                  </AccordionSection>
                  <AccordionSection icon={sectionIcons.specs} title="Характеристики">
                    <dl className="space-y-2">
                      <div className="flex justify-between gap-6">
                        <dt className="text-stone-500">Материал</dt>
                        <dd className="text-right text-stone-800">{product.material}</dd>
                      </div>
                      {product.specs?.map((s) => (
                        <div key={s.label} className="flex justify-between gap-6">
                          <dt className="text-stone-500">{s.label}</dt>
                          <dd className="text-right text-stone-800">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </AccordionSection>
                  <AccordionSection icon={sectionIcons.delivery} title="Доставка и возврат">
                    <p>{delivery.description}</p>
                    <p className="mt-2">• Доставка по Кишинёву и всей Молдове.</p>
                    <p>• Возврат и обмен в течение 14 дней.</p>
                    <p>• Гарантия 30 дней на производственные дефекты.</p>
                  </AccordionSection>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="mt-5 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-stone-900 transition hover:text-stone-600"
                >
                  Все детали товара
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
