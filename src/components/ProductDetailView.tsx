"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product, ProductImageAsset } from "@/lib/types";
import { useCart } from "@/context/cart";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import ProductImage from "./ProductImage";
import WishlistButton from "./WishlistButton";

function getImages(product: Product, colorIdx: number): ProductImageAsset[] {
  return product.colors[colorIdx]?.images ?? product.images ?? [];
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
  const searchParams = useSearchParams();
  const initialColorIdx = useMemo(
    () => getInitialColorIdx(product, searchParams.get("color")),
    [product, searchParams],
  );
  const [colorIdx, setColorIdx] = useState(initialColorIdx);
  const [imageIdx, setImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${product.slug}/view`, { method: "POST" }).catch(() => {});
  }, [product.slug]);

  useEffect(() => {
    setColorIdx(initialColorIdx);
    setImageIdx(0);
  }, [initialColorIdx, product.slug]);

  const color = product.colors[colorIdx];
  const images = getImages(product, colorIdx);
  const safeImageIdx = images.length ? Math.min(imageIdx, images.length - 1) : 0;
  const activeImage = images[safeImageIdx];
  const onSale = product.oldPrice && product.oldPrice > product.price;
  const hasGallery = images.length > 1;
  const isLifestyle = activeImage?.src.includes("lifestyle");
  const delivery = getDeliveryInfo(product);
  const canBuy = product.status !== "out_of_stock";

  useEffect(() => {
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
    });
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function showImage(direction: "prev" | "next") {
    if (!hasGallery) return;
    setImageIdx((current) =>
      direction === "next"
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length,
    );
  }

  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-2">
      <div className="grid gap-3">
        <div className="group relative overflow-hidden rounded-3xl bg-stone-50">
          <ProductImage
            key={`${colorIdx}-${safeImageIdx}-${activeImage?.src ?? "placeholder"}`}
            hex={color.hex}
            section={product.section}
            src={activeImage?.src}
            alt={activeImage?.alt ?? product.title}
            sizes="(min-width: 1024px) 50vw, 100vw"
            imageClassName={
              "object-center transition-transform duration-700 group-hover:scale-[1.015] " +
              (isLifestyle ? "object-cover object-[50%_35%]" : "object-contain")
            }
            className={isLifestyle ? "aspect-[3/4] w-full" : "aspect-[4/5] w-full"}
          />

          {hasGallery && (
            <>
              <button
                type="button"
                aria-label="Предыдущее фото"
                onClick={() => showImage("prev")}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 text-stone-900 opacity-0 shadow-sm backdrop-blur transition hover:bg-white group-hover:opacity-100 max-lg:opacity-100"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Следующее фото"
                onClick={() => showImage("next")}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 text-stone-900 opacity-0 shadow-sm backdrop-blur transition hover:bg-white group-hover:opacity-100 max-lg:opacity-100"
              >
                <ArrowIcon direction="right" />
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/75 px-3 py-2 shadow-sm backdrop-blur">
                {images.map((image, i) => (
                  <button
                    key={`${image.alt}-dot-${i}`}
                    type="button"
                    aria-label={`Показать фото ${i + 1}`}
                    onClick={() => setImageIdx(i)}
                    className={
                      "h-1.5 rounded-full transition-all " +
                      (i === safeImageIdx ? "w-6 bg-stone-950" : "w-1.5 bg-stone-400")
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {(images.length > 0 ? images : product.colors.map((c) => ({ src: "", alt: c.name }))).map(
            (image, i) => (
              <button
                key={`${colorIdx}-${image.src}-${i}`}
                type="button"
                onClick={() => setImageIdx(i)}
                className={
                  "overflow-hidden rounded-2xl border bg-stone-50 transition " +
                  (i === safeImageIdx
                    ? "border-stone-950 opacity-100"
                    : "border-transparent opacity-70 hover:border-stone-300 hover:opacity-100")
                }
              >
                <ProductImage
                  key={`${colorIdx}-${image.src}-${i}`}
                  hex={color.hex}
                  section={product.section}
                  src={image.src || undefined}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 12vw, 25vw"
                  imageClassName="object-contain object-center"
                  className="aspect-square w-full"
                />
              </button>
            ),
          )}
        </div>
      </div>

      <div>
        <Link
          href={`/brand/${product.brandSlug}`}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400 hover:text-stone-700"
        >
          {brandName}
        </Link>
        <h1 className="mt-2 font-serif text-2xl leading-snug text-stone-950 sm:text-3xl">
          {product.title}
        </h1>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-stone-950">
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-lg text-stone-400 line-through">
              {formatPrice(product.oldPrice!)}
            </span>
          )}
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-stone-700">
            Цвет: <span className="text-stone-500">{color.name}</span>
            {color.status && (
              <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                {color.status}
              </span>
            )}
          </p>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {product.colors.map((c, i) => (
              <button
                key={`${c.name}-${i}`}
                type="button"
                onClick={() => setColorIdx(i)}
                aria-label={c.name}
                title={c.status ? `${c.name} — ${c.status}` : c.name}
                className={
                  "h-9 w-9 rounded-full border-2 transition " +
                  (i === colorIdx
                    ? "border-stone-900 ring-2 ring-stone-900/15"
                    : "border-stone-200 hover:border-stone-400")
                }
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <p className="flex items-center gap-2.5 text-sm font-medium tracking-wide text-stone-900">
            <span className="h-1.5 w-1.5 rounded-full bg-stone-400" aria-hidden />
            {delivery.title}
          </p>
          <p className="mt-1.5 pl-[18px] text-sm text-stone-600">
            {delivery.leadTime}
          </p>
          <p className="mt-3 pl-[18px] text-[13px] leading-relaxed text-stone-500">
            {delivery.description}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!canBuy}
          className="mt-5 w-full rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {canBuy ? (added ? "Добавлено в корзину ✓" : "Добавить в корзину") : "Нет в наличии"}
        </button>
        <div className="mt-3">
          <WishlistButton slug={product.slug} variant="full" />
        </div>

        <p className="mt-8 whitespace-pre-line leading-relaxed text-stone-600">
          {product.description}
        </p>

        <dl className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
          <div className="flex justify-between gap-6 py-3 text-sm">
            <dt className="text-stone-500">Материал</dt>
            <dd className="text-right text-stone-800">{product.material}</dd>
          </div>
          {product.specs?.map((s) => (
            <div key={s.label} className="flex justify-between gap-6 py-3 text-sm">
              <dt className="text-stone-500">{s.label}</dt>
              <dd className="text-right text-stone-800">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-2 text-sm text-stone-500">
          <p>• Доставка по Кишинёву и всей Молдове.</p>
          <p>• Возврат и обмен в течение 14 дней.</p>
          <p>• Гарантия 30 дней на производственные дефекты.</p>
        </div>
      </div>
    </div>
  );
}