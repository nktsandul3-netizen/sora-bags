"use client";

import { getBrandName, getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { localizeColorName, localizeProductImageAlt, localizeProductTitle } from "@/lib/product-i18n";
import { getCartRecommendations } from "@/lib/recommendations";
import { useLocale, useT } from "@/lib/useI18n";
import type { Product } from "@/lib/types";
import ProductImage from "./ProductImage";
import { useCart } from "@/context/cart";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function CartLineImage({ slug, colorName, title }: { slug: string; colorName: string; title: string }) {
  const product = getProduct(slug);
  const locale = useLocale();
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
      alt={localizeProductImageAlt(image?.alt, locale) || title}
      sizes="80px"
      className="h-20 w-20 rounded-xl bg-[#F9F6F3]"
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
      className="group flex gap-3 !bg-transparent p-0 shadow-none ring-0"
      aria-label={localizedTitle}
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <div
        className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={localizeProductImageAlt(image.alt, locale) || localizedTitle}
            fill
            sizes="72px"
            className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1 self-center bg-transparent">
        <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-[#1A1A1A] opacity-50">
          {getBrandName(product.brandSlug)}
        </p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#1A1A1A]">{localizedTitle}</p>
        <p className="mt-1.5 text-[13px] font-bold text-[#1A1A1A]">{formatPrice(product.price, locale)}</p>
      </div>
    </Link>
  );
}

function getItemCountLabel(count: number, locale: Locale, t: (key: string) => string) {
  if (locale === "ru") {
    const mod10 = count % 10;
    const mod100 = count % 100;
    const key =
      mod10 === 1 && mod100 !== 11
        ? "cart.itemCountOne"
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
          ? "cart.itemCountFew"
          : "cart.itemCountMany";
    return t(key).replace("{count}", String(count));
  }

  if (locale === "ro") {
    return t(count === 1 ? "cart.itemCountOne" : "cart.itemCountFew").replace("{count}", String(count));
  }

  return t(count === 1 ? "cart.itemCountOne" : "cart.itemCountMany").replace("{count}", String(count));
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
  const cartDeliveryNote = useMemo(() => {
    const first = items[0];
    if (!first) return null;
    const product = getProduct(first.slug);
    return product ? getDeliveryInfo(product, locale).leadTime : null;
  }, [items, locale]);

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
            <div className="hidden w-[34%] shrink-0 flex-col border-r border-[#F0EDEA] bg-[#F9F6F3] p-8 lg:flex">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#1A1A1A] opacity-50">
                SÓRA Atelier
              </p>
              <h2 className="mt-2 text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-[#1A1A1A]">
                {t("cart.recommendation")}
              </h2>
              <div className="mt-6 flex flex-col gap-5">
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
                      {getItemCountLabel(itemCount, locale, t)}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold uppercase tracking-[0.04em] text-stone-950 sm:text-4xl">
                      {t("common.cart")}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
                      {t("cart.freeDeliveryUnlocked")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label={t("cart.closeCart")}
                    className="-mr-1 -mt-1 flex h-11 w-11 items-center justify-center text-stone-900 transition hover:opacity-70"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </header>

              {items.length === 0 ? (
                <div className="mt-0 flex flex-1 -translate-y-10 flex-col items-center justify-center gap-6 px-6 text-center">
                  <div>
                    <p className="font-instrument text-[36px] text-stone-950 opacity-90">
                      {t("checkout.emptyCart")}
                    </p>
                    <p className="mt-2 text-[14px] text-stone-950 opacity-60">
                      {t("checkout.emptyCartHint")}
                    </p>
                  </div>
                  <Link
                    href={withLocalePath("/bags", locale)}
                    onClick={closeCart}
                    className="inline-flex h-[52px] items-center justify-center rounded-full bg-black px-8 text-[12px] font-medium uppercase tracking-widest text-white transition hover:bg-[#1A1A1A]"
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
                        const localizedTitle = product
                          ? localizeProductTitle(product, locale)
                          : localizeProductTitle(item.title, locale);

                        return (
                        <article
                          key={`${item.slug}-${item.color}-${item.purchaseKind}`}
                          className="relative grid grid-cols-[80px_1fr_auto] gap-x-4 gap-y-3 rounded-2xl border border-[#F0EDEA] bg-white px-4 py-4"
                        >
                          <Link href={withLocalePath(`/product/${item.slug}`, locale)} onClick={closeCart} className="row-span-2 block self-start">
                            <CartLineImage slug={item.slug} colorName={item.color} title={localizedTitle} />
                          </Link>

                          <div className="min-w-0 pr-8">
                            <Link
                              href={withLocalePath(`/product/${item.slug}`, locale)}
                              onClick={closeCart}
                              className="block text-[16px] font-medium leading-snug text-[#1A1A1A] hover:opacity-70"
                            >
                              {localizedTitle}
                            </Link>
                            <p className="mt-1.5 text-[13px] text-[#1A1A1A] opacity-60">
                              {localizeColorName(item.color, locale)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(item.slug, item.color, item.purchaseKind)}
                            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F5] text-[#1A1A1A] transition hover:bg-[#EBE8E4]"
                            aria-label={t("cart.removeItem")}
                          >
                            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                              <path d="M2 2l8 8M10 2 2 10" strokeLinecap="round" />
                            </svg>
                          </button>

                          <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:col-start-2 sm:col-end-4">
                            <div className="inline-flex h-9 w-28 items-center justify-between rounded-full bg-[#F5F3F0] px-1">
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty - 1, item.purchaseKind)}
                                className="flex h-8 w-8 items-center justify-center text-[#1A1A1A] opacity-60 transition hover:opacity-100"
                                aria-label={t("cart.decreaseQty")}
                              >
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                                  <path d="M3 8h10" strokeLinecap="round" />
                                </svg>
                              </button>
                              <span className="w-6 text-center text-sm leading-none text-[#1A1A1A]">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty + 1, item.purchaseKind)}
                                className="flex h-8 w-8 items-center justify-center text-[#1A1A1A] opacity-60 transition hover:opacity-100"
                                aria-label={t("cart.increaseQty")}
                              >
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                                  <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>
                            <p className="text-[15px] font-semibold leading-none text-[#1A1A1A]">
                              {formatPrice(item.price * item.qty, locale)}
                            </p>
                          </div>
                        </article>
                        );
                          })}
                        </section>
                      ))}
                  </div>

                  <footer className="border-t border-[#F0EDEA] bg-white px-5 py-5 sm:px-8">
                    <div className="mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em] text-stone-400">
                      <span>{getItemCountLabel(itemCount, locale, t)}</span>
                      <span>{t("checkout.free")}</span>
                    </div>
                    <div className="space-y-2">
                      {hasStandard && (
                        <Link
                          href={withLocalePath("/cart", locale)}
                          onClick={closeCart}
                          className="flex h-14 w-full items-center justify-between gap-4 rounded-2xl bg-black px-5 text-sm font-semibold tracking-[0.06em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#1A1A1A]"
                        >
                          <span>{hasMixedCart ? t("cart.goToCheckout") : t("checkout.placeOrder")}</span>
                          <span aria-hidden className="text-white/60">→</span>
                          <span>{formatPrice(standardTotal, locale)}</span>
                        </Link>
                      )}
                      {hasPreorder && (
                        <Link
                          href={withLocalePath("/cart", locale)}
                          onClick={closeCart}
                          className="flex h-14 w-full items-center justify-between gap-4 rounded-2xl bg-amber-600 px-5 text-sm font-semibold tracking-[0.06em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:bg-amber-700"
                        >
                          <span>{t("cart.goToPreorder")}</span>
                          <span aria-hidden className="text-white/60">→</span>
                          <span>{formatPrice(preorderTotal, locale)}</span>
                        </Link>
                      )}
                    </div>
                    <p className="mt-3 text-center text-xs leading-relaxed text-stone-400">
                      {[
                        cartDeliveryNote,
                        hasPreorder ? t("checkout.preorderHint") : t("cart.checkoutHint"),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
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
