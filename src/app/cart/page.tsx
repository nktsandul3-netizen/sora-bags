"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeProductTitle } from "@/lib/product-i18n";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductImage from "@/components/ProductImage";
import CheckoutForm from "@/components/CheckoutForm";

export default function CartPage() {
  const router = useRouter();
  const { items, total, setQty, remove, clear } = useCart();
  const locale = useLocale();
  const t = useT();

  function handleOrdered(order: { id: string; number: string }) {
    clear();
    router.push(`${withLocalePath("/order-confirmation", locale)}?order=${encodeURIComponent(order.number)}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-stone-950">{t("checkout.emptyCart")}</h1>
        <p className="mt-4 text-stone-600">
          {t("checkout.emptyCartText")}
        </p>
        <Link
          href={withLocalePath("/bags", locale)}
          className="mt-8 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {t("home.toCatalog")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: t("common.cart") }]} />
      <h1 className="mt-5 mb-8 font-serif text-3xl text-stone-950 sm:text-4xl">
        {t("common.cart")}
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {items.map((it) => {
            const product = getProduct(it.slug);
            const color = product?.colors.find((c) => c.name === it.color);
            const thumbSrc =
              color?.images?.[0]?.src ??
              product?.images?.[0]?.src ??
              product?.colors.flatMap((c) => c.images ?? [])[0]?.src;
            const thumbHex = color?.hex ?? product?.colors[0]?.hex ?? "#d6d3d1";
            const delivery = product ? getDeliveryInfo(product, locale) : null;
            const localizedTitle = product ? localizeProductTitle(product, locale) : localizeProductTitle(it.title, locale);

            return (
            <div key={it.slug + it.color} className="flex gap-4 py-5">
              <Link href={withLocalePath(`/product/${it.slug}`, locale)} className="block shrink-0">
                <ProductImage
                  hex={thumbHex}
                  section={product?.section ?? "bags"}
                  src={thumbSrc}
                  alt={localizedTitle}
                  sizes="80px"
                  className="h-24 w-20 rounded-xl"
                  imageClassName="object-cover object-center"
                />
              </Link>
              <div className="flex-1">
                <Link
                  href={withLocalePath(`/product/${it.slug}`, locale)}
                  className="text-sm leading-snug text-stone-800 hover:text-stone-950"
                >
                  {localizedTitle}
                </Link>
                <p className="mt-1 text-xs text-stone-400">
                  {it.brand} · {it.color}
                </p>
                {delivery && (
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                    {delivery.leadTime}
                  </p>
                )}
                <button
                  onClick={() => remove(it.slug, it.color)}
                  className="mt-2 text-xs text-stone-400 underline-offset-2 hover:text-stone-700 hover:underline"
                >
                  {t("common.delete")}
                </button>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-semibold text-stone-950">
                  {formatPrice(it.price * it.qty, locale)}
                </span>
                <div className="flex items-center rounded-full border border-stone-200">
                  <button
                    onClick={() => setQty(it.slug, it.color, it.qty - 1)}
                    className="px-3 py-1 text-stone-500 hover:text-stone-900"
                    aria-label={t("cart.decreaseQty")}
                  >
                    −
                  </button>
                  <span className="w-7 text-center text-sm">{it.qty}</span>
                  <button
                    onClick={() => setQty(it.slug, it.color, it.qty + 1)}
                    className="px-3 py-1 text-stone-500 hover:text-stone-900"
                    aria-label={t("cart.increaseQty")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            );
          })}
          <div className="py-4">
            <button
              onClick={clear}
              className="text-xs text-stone-400 hover:text-stone-700"
            >
              {t("common.delete")}
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 p-6">
          <h2 className="font-serif text-xl text-stone-950">{t("checkout.summary")}</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">{t("checkout.items")}</span>
              <span className="text-stone-900">{formatPrice(total, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">{t("checkout.delivery")}</span>
              <span className="text-stone-900">
                {total >= 15000 ? t("checkout.free") : t("checkout.byTariff")}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-stone-200 pt-4">
            <span className="font-semibold text-stone-900">{t("checkout.total")}</span>
            <span className="text-lg font-semibold text-stone-950">
              {formatPrice(total, locale)}
            </span>
          </div>

          <CheckoutForm items={items} total={total} onSuccess={handleOrdered} />
        </aside>
      </div>
    </div>
  );
}