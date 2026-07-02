"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { localizeColorName, localizeProductTitle } from "@/lib/product-i18n";
import { getCartRecommendations } from "@/lib/recommendations";
import { useLocale, useT } from "@/lib/useI18n";
import type { Product } from "@/lib/types";
import ProductImage from "./ProductImage";

function CartLineImage({ slug, colorName, title }: { slug: string; colorName: string; title: string }) {
  const product = getProduct(slug);
  const color = product?.colors.find((item) => item.name === colorName);
  const image =
    color?.images?.[0] ??
    product?.images?.[0] ??
    product?.colors.flatMap((item) => item.images ?? [])[0];

  return (
    <ProductImage
      hex={color?.hex ?? product?.colors[0]?.hex ?? "#d6d3d1"}
      section={product?.section ?? "bags"}
      src={image?.src}
      alt={image?.alt ?? title}
      sizes="80px"
      className="h-24 w-20 rounded-xl bg-stone-50"
      imageClassName="object-contain object-center"
    />
  );
}

function RecommendationCard({ product, locale }: { product: Product; locale: Locale }) {
  const image = product.colors[0]?.images?.[0] ?? product.images?.[0];
  const localizedTitle = localizeProductTitle(product, locale);

  return (
    <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="group block" aria-label={localizedTitle}>
      <div className="relative h-28 overflow-hidden rounded-lg bg-white">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || localizedTitle}
            fill
            sizes="320px"
            className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-snug text-stone-900">{localizedTitle}</p>
    </Link>
  );
}

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, remove, setQty } = useCart();
  const locale = useLocale();
  const t = useT();
  const recommendations = useMemo(
    () => getCartRecommendations(items.map((item) => item.slug), 3),
    [items],
  );

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeCart, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[95] bg-stone-950/35 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={closeCart}
        >
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[760px] bg-white shadow-[-24px_0_70px_rgba(28,25,23,0.18)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            aria-label={t("common.cart")}
          >
            <div className="hidden w-[38%] border-r border-stone-200 p-8 lg:block">
              <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-stone-950">
                {t("cart.recommendation")}
              </h2>
              <div className="mt-8 space-y-7">
                {recommendations.map((product) => (
                  <RecommendationCard key={product.slug} product={product} locale={locale} />
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="px-6 pt-7 sm:px-9">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-semibold uppercase tracking-[0.04em] text-stone-950">
                      {t("common.cart")}
                    </h2>
                    <p className="mt-4 text-sm text-stone-600">
                      {total >= 15000
                        ? t("cart.freeDeliveryUnlocked")
                        : t("cart.deliveryCalculated")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label={t("cart.closeCart")}
                    className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-full text-stone-900 transition hover:bg-stone-100"
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                      <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-5 h-0.5 w-full bg-stone-950" />
              </header>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <p className="font-serif text-3xl text-stone-950">{t("checkout.emptyCart")}</p>
                  <Link
                    href={withLocalePath("/bags", locale)}
                    onClick={closeCart}
                    className="mt-7 rounded-full bg-stone-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                  >
                    {t("home.toCatalog")}
                  </Link>
                </div>
              ) : (
                <>
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-2 sm:px-9">
                    <div className="divide-y divide-stone-200">
                      {items.map((item) => {
                        const product = getProduct(item.slug);
                        const delivery = product ? getDeliveryInfo(product, locale) : null;
                        const localizedTitle = product
                          ? localizeProductTitle(product, locale)
                          : localizeProductTitle(item.title, locale);

                        return (
                        <article key={`${item.slug}-${item.color}`} className="grid grid-cols-[80px_1fr_auto] gap-4 py-7">
                          <Link href={withLocalePath(`/product/${item.slug}`, locale)} onClick={closeCart} className="block">
                            <CartLineImage slug={item.slug} colorName={item.color} title={localizedTitle} />
                          </Link>

                          <div className="min-w-0">
                            <p className="text-sm text-stone-500">{item.brand}</p>
                            <Link
                              href={withLocalePath(`/product/${item.slug}`, locale)}
                              onClick={closeCart}
                              className="mt-1 block text-lg font-semibold leading-snug text-stone-950 hover:text-stone-700"
                            >
                              {localizedTitle}
                            </Link>
                            <p className="mt-1 text-sm text-stone-500">{t("catalog.color")}: {localizeColorName(item.color, locale)}</p>
                            {delivery && (
                              <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                                {delivery.leadTime}
                              </p>
                            )}

                            <div className="mt-4 inline-flex items-center border border-stone-200">
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty - 1)}
                                className="px-3 py-1.5 text-stone-500 transition hover:text-stone-950"
                                aria-label={t("cart.decreaseQty")}
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty + 1)}
                                className="px-3 py-1.5 text-stone-500 transition hover:text-stone-950"
                                aria-label={t("cart.increaseQty")}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <button
                              type="button"
                              onClick={() => remove(item.slug, item.color)}
                              className="text-stone-400 transition hover:text-stone-900"
                              aria-label={t("cart.removeItem")}
                            >
                              ×
                            </button>
                            <p className="text-lg font-medium text-stone-950">
                              {formatPrice(item.price * item.qty, locale)}
                            </p>
                          </div>
                        </article>
                        );
                      })}
                    </div>
                  </div>

                  <footer className="border-t border-stone-200 px-6 py-6 sm:px-9">
                    <Link
                      href={withLocalePath("/cart", locale)}
                      onClick={closeCart}
                      className="flex w-full items-center justify-center gap-5 rounded-md bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-stone-800"
                    >
                      {t("checkout.placeOrder")}
                      <span aria-hidden>—</span>
                      <span>{formatPrice(total, locale)}</span>
                    </Link>
                  </footer>
                </>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
