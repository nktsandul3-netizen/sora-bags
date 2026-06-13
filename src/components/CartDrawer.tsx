"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart";
import { getProduct, products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
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

function RecommendationCard() {
  const product =
    products.find((item) => item.slug === "premium-suede-shoulder-bag-black") ?? products[0];
  const image = product.colors[0]?.images?.[0] ?? product.images?.[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block" aria-label={product.title}>
      <div className="relative h-28 overflow-hidden rounded-lg bg-stone-100">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.title}
            fill
            sizes="320px"
            className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
        Вам также понравится
      </p>
      <p className="mt-1 text-sm text-stone-900">{product.title}</p>
    </Link>
  );
}

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, remove, setQty } = useCart();

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
            aria-label="Корзина"
          >
            <div className="hidden w-[38%] border-r border-stone-200 p-8 lg:block">
              <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-stone-950">
                Вам также понравится
              </h2>
              <div className="mt-8">
                <RecommendationCard />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="px-6 pt-7 sm:px-9">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-semibold uppercase tracking-[0.04em] text-stone-950">
                      Корзина
                    </h2>
                    <p className="mt-4 text-sm text-stone-600">
                      {total >= 15000
                        ? "Вы получили бесплатную доставку."
                        : "Доставка рассчитывается при оформлении заказа."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label="Закрыть корзину"
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
                  <p className="font-serif text-3xl text-stone-950">Корзина пуста</p>
                  <Link
                    href="/bags"
                    onClick={closeCart}
                    className="mt-7 rounded-full bg-stone-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                  >
                    В каталог
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-2 sm:px-9">
                    <div className="divide-y divide-stone-200">
                      {items.map((item) => (
                        <article key={`${item.slug}-${item.color}`} className="grid grid-cols-[80px_1fr_auto] gap-4 py-7">
                          <Link href={`/product/${item.slug}`} onClick={closeCart} className="block">
                            <CartLineImage slug={item.slug} colorName={item.color} title={item.title} />
                          </Link>

                          <div className="min-w-0">
                            <p className="text-sm text-stone-500">{item.brand}</p>
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="mt-1 block text-lg font-semibold leading-snug text-stone-950 hover:text-stone-700"
                            >
                              {item.title}
                            </Link>
                            <p className="mt-1 text-sm text-stone-500">Цвет: {item.color}</p>

                            <label className="mt-4 flex items-center gap-3 text-sm font-medium text-stone-800">
                              <span className="h-5 w-5 border border-stone-400" aria-hidden />
                              Добавить подарочную упаковку
                            </label>

                            <div className="mt-5 inline-flex items-center border border-stone-200">
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty - 1)}
                                className="px-3 py-1.5 text-stone-500 transition hover:text-stone-950"
                                aria-label="Уменьшить количество"
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.color, item.qty + 1)}
                                className="px-3 py-1.5 text-stone-500 transition hover:text-stone-950"
                                aria-label="Увеличить количество"
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
                              aria-label="Удалить товар"
                            >
                              ×
                            </button>
                            <p className="text-lg font-medium text-stone-950">
                              {formatPrice(item.price * item.qty)}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <footer className="border-t border-stone-200 px-6 py-6 sm:px-9">
                    <p className="text-sm text-stone-600">
                      Налоги включены. Доставка рассчитывается при оформлении.
                    </p>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="mt-5 flex w-full items-center justify-center gap-5 rounded-md bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-stone-800"
                    >
                      Оформить заказ
                      <span aria-hidden>—</span>
                      <span>{formatPrice(total)}</span>
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
