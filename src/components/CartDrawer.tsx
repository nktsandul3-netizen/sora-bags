"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart";
import { getBrandName, getProduct } from "@/lib/data";
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
      className="h-24 w-20 rounded-[1.2rem] bg-[#f7f3ee] shadow-sm"
      imageClassName="object-contain object-center"
    />
  );
}

function RecommendationCard({ product, locale }: { product: Product; locale: Locale }) {
  const image = product.colors[0]?.images?.[0] ?? product.images?.[0];
  const localizedTitle = localizeProductTitle(product, locale);

  return (
    <Link
      href={withLocalePath(`/product/${product.slug}`, locale)}
      className="group flex gap-3 rounded-2xl border border-white/70 bg-white/80 p-2.5 shadow-sm shadow-stone-200/50 transition duration-300 hover:bg-white"
      aria-label={localizedTitle}
    >
      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f8f4ee]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || localizedTitle}
            fill
            sizes="56px"
            className="object-contain object-center p-1.5 transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-400">
          {getBrandName(product.brandSlug)}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-stone-900">{localizedTitle}</p>
        <p className="mt-1 text-[11px] font-semibold text-stone-950">{formatPrice(product.price, locale)}</p>
      </div>
    </Link>
  );
}

function getItemCountLabel(count: number, locale: Locale) {
  if (locale === "ru") {
    const mod10 = count % 10;
    const mod100 = count % 100;
    const word =
      mod10 === 1 && mod100 !== 11
        ? "товар"
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
          ? "товара"
          : "товаров";

    return `${count} ${word}`;
  }

  if (locale === "ro") {
    return count === 1 ? "1 produs" : `${count} produse`;
  }

  return count === 1 ? "1 item" : `${count} items`;
}

export default function CartDrawer() {
  const {
    items,
    total,
    standardItems,
    preorderItems,
    standardTotal,
    preorderTotal,
    isOpen,
    closeCart,
    remove,
    setQty,
  } = useCart();
  const locale = useLocale();
  const t = useT();
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const hasStandard = standardItems.length > 0;
  const hasPreorder = preorderItems.length > 0;
  const hasMixedCart = hasStandard && hasPreorder;
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
            className="absolute right-0 top-0 flex h-full w-full max-w-[920px] overflow-hidden bg-[#fbfaf8] shadow-[-24px_0_80px_rgba(28,25,23,0.2)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            aria-label={t("common.cart")}
          >
            <div className="hidden w-[34%] shrink-0 flex-col border-r border-stone-200/80 bg-[#f4eee6] p-5 lg:flex">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                SORA Atelier
              </p>
              <h2 className="mt-2 text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-stone-950">
                {t("cart.recommendation")}
              </h2>
              <div className="mt-5 space-y-2.5">
                {recommendations.map((product) => (
                  <RecommendationCard key={product.slug} product={product} locale={locale} />
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="px-5 pt-6 sm:px-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                      {getItemCountLabel(itemCount, locale)}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold uppercase tracking-[0.04em] text-stone-950 sm:text-4xl">
                      {t("common.cart")}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
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
                  <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8">
                    {hasMixedCart && (
                      <p className="mb-4 rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-950">
                        {t("checkout.mixedCartHint")}
                      </p>
                    )}
                    {[
                      { title: t("checkout.standardSectionTitle"), items: standardItems },
                      { title: t("checkout.preorderSectionTitle"), items: preorderItems },
                    ]
                      .filter((section) => section.items.length > 0)
                      .map((section) => (
                        <section key={section.title} className="space-y-3">
                          {hasMixedCart && (
                            <h3 className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                              {section.title}
                            </h3>
                          )}
                          {section.items.map((item) => {
                        const product = getProduct(item.slug);
                        const delivery = product ? getDeliveryInfo(product, locale) : null;
                        const localizedTitle = product
                          ? localizeProductTitle(product, locale)
                          : localizeProductTitle(item.title, locale);

                        return (
                        <article
                          key={`${item.slug}-${item.color}-${item.purchaseKind}`}
                          className="grid grid-cols-[80px_1fr] gap-4 rounded-[1.35rem] border border-stone-200/80 bg-white p-3.5 shadow-sm shadow-stone-200/60 sm:grid-cols-[80px_1fr_auto] sm:p-4"
                        >
                          <Link href={withLocalePath(`/product/${item.slug}`, locale)} onClick={closeCart} className="block">
                            <CartLineImage slug={item.slug} colorName={item.color} title={localizedTitle} />
                          </Link>

                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">{item.brand}</p>
                            <Link
                              href={withLocalePath(`/product/${item.slug}`, locale)}
                              onClick={closeCart}
                              className="mt-1.5 block text-base font-semibold leading-snug text-stone-950 hover:text-stone-700 sm:text-lg"
                            >
                              {localizedTitle}
                            </Link>
                            <p className="mt-2 inline-flex rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">
                              {t("catalog.color")}: {localizeColorName(item.color, locale)}
                            </p>
                            {delivery && (
                              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                                {delivery.leadTime}
                              </p>
                            )}

                            <div className="mt-4 inline-flex items-center rounded-full border border-stone-200 bg-stone-50">
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty - 1, item.purchaseKind)}
                                className="px-3 py-1.5 text-stone-500 transition hover:text-stone-950"
                                aria-label={t("cart.decreaseQty")}
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty + 1, item.purchaseKind)}
                                className="px-3 py-1.5 text-stone-500 transition hover:text-stone-950"
                                aria-label={t("cart.increaseQty")}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="col-span-2 flex items-center justify-between border-t border-stone-100 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                            <button
                              type="button"
                              onClick={() => remove(item.slug, item.color, item.purchaseKind)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-400 transition hover:bg-stone-100 hover:text-stone-900"
                              aria-label={t("cart.removeItem")}
                            >
                              ×
                            </button>
                            <p className="text-base font-semibold text-stone-950 sm:text-lg">
                              {formatPrice(item.price * item.qty, locale)}
                            </p>
                          </div>
                        </article>
                        );
                          })}
                        </section>
                      ))}
                  </div>

                  <footer className="border-t border-stone-200 bg-white/90 px-5 py-5 shadow-[0_-18px_40px_rgba(28,25,23,0.07)] backdrop-blur sm:px-8">
                    <div className="mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em] text-stone-400">
                      <span>{getItemCountLabel(itemCount, locale)}</span>
                      <span>{total >= 15000 ? t("checkout.free") : t("checkout.byTariff")}</span>
                    </div>
                    <div className="space-y-2">
                      {hasStandard && (
                        <Link
                          href={withLocalePath("/cart", locale)}
                          onClick={closeCart}
                          className="flex w-full items-center justify-between gap-4 rounded-[1rem] bg-stone-950 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:-translate-y-0.5 hover:bg-stone-800"
                        >
                          <span>{hasMixedCart ? t("cart.goToCheckout") : t("checkout.placeOrder")}</span>
                          <span aria-hidden className="text-stone-500">→</span>
                          <span>{formatPrice(standardTotal, locale)}</span>
                        </Link>
                      )}
                      {hasPreorder && (
                        <Link
                          href={withLocalePath("/cart", locale)}
                          onClick={closeCart}
                          className="flex w-full items-center justify-between gap-4 rounded-[1rem] bg-amber-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-900/10 transition hover:-translate-y-0.5 hover:bg-amber-700"
                        >
                          <span>{t("cart.goToPreorder")}</span>
                          <span aria-hidden className="text-amber-200">→</span>
                          <span>{formatPrice(preorderTotal, locale)}</span>
                        </Link>
                      )}
                    </div>
                    <p className="mt-3 text-center text-xs leading-relaxed text-stone-400">
                      {hasPreorder ? t("checkout.preorderHint") : t("cart.checkoutHint")}
                    </p>
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
