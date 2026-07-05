"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, type CartItem, type PurchaseKind } from "@/context/cart";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDeliveryInfo } from "@/lib/delivery";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeColorName, localizeProductTitle } from "@/lib/product-i18n";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductImage from "@/components/ProductImage";
import CheckoutForm from "@/components/CheckoutForm";

function getCartItemCountLabel(count: number, locale: Locale) {
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

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    total,
    standardItems,
    preorderItems,
    standardTotal,
    preorderTotal,
    setQty,
    remove,
    clear,
    clearKind,
  } = useCart();
  const locale = useLocale();
  const t = useT();
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const hasStandard = standardItems.length > 0;
  const hasPreorder = preorderItems.length > 0;
  const hasMixedCart = hasStandard && hasPreorder;

  function handleOrdered(order: { id: string; number: string; kind: PurchaseKind }) {
    clearKind(order.kind);
    router.push(
      `${withLocalePath("/order-confirmation", locale)}?order=${encodeURIComponent(order.number)}&kind=${order.kind}`,
    );
  }

  function renderCartItem(it: CartItem) {
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
      <div
        key={`${it.slug}-${it.color}-${it.purchaseKind}`}
        className="grid grid-cols-[80px_1fr] gap-4 rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60 sm:grid-cols-[96px_1fr_auto]"
      >
        <Link href={withLocalePath(`/product/${it.slug}`, locale)} className="block shrink-0">
          <ProductImage
            hex={thumbHex}
            section={product?.section ?? "bags"}
            src={thumbSrc}
            alt={localizedTitle}
            sizes="80px"
            className="h-24 w-20 rounded-[1.2rem] bg-[#f7f3ee] shadow-sm"
            imageClassName="object-contain object-center"
          />
        </Link>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">{it.brand}</p>
          <Link
            href={withLocalePath(`/product/${it.slug}`, locale)}
            className="mt-1.5 block text-base font-semibold leading-snug text-stone-950 hover:text-stone-700"
          >
            {localizedTitle}
          </Link>
          <p className="mt-2 inline-flex rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">
            {t("catalog.color")}: {localizeColorName(it.color, locale)}
          </p>
          {delivery && (
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              {delivery.leadTime}
            </p>
          )}
          <button
            onClick={() => remove(it.slug, it.color, it.purchaseKind)}
            className="mt-3 text-xs font-medium text-stone-400 underline-offset-2 hover:text-stone-700 hover:underline"
          >
            {t("common.delete")}
          </button>
        </div>

        <div className="col-span-2 flex items-center justify-between border-t border-stone-100 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
          <span className="text-base font-semibold text-stone-950">
            {formatPrice(it.price * it.qty, locale)}
          </span>
          <div className="flex items-center rounded-full border border-stone-200 bg-stone-50">
            <button
              onClick={() => setQty(it.slug, it.color, it.qty - 1, it.purchaseKind)}
              className="px-3 py-1 text-stone-500 hover:text-stone-900"
              aria-label={t("cart.decreaseQty")}
            >
              −
            </button>
            <span className="w-7 text-center text-sm">{it.qty}</span>
            <button
              onClick={() => setQty(it.slug, it.color, it.qty + 1, it.purchaseKind)}
              className="px-3 py-1 text-stone-500 hover:text-stone-900"
              aria-label={t("cart.increaseQty")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: t("common.cart") }]} />
      <div className="mt-5 mb-8 rounded-[2rem] bg-[#fbfaf8] p-5 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
          {getCartItemCountLabel(itemCount, locale)}
        </p>
        <div className="mt-2">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.04em] text-stone-950 sm:text-5xl">
            {t("common.cart")}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600">
            {total >= 15000 ? t("cart.freeDeliveryUnlocked") : t("cart.deliveryCalculated")}
          </p>
        </div>
      </div>

      {hasMixedCart && (
        <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50/80 px-5 py-4 text-sm leading-relaxed text-amber-950">
          {t("checkout.mixedCartHint")}
        </div>
      )}

      <div className="space-y-8">
        {hasStandard && (
          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.06em] text-stone-950">
                {t("checkout.standardSectionTitle")}
              </h2>
              <div className="space-y-3">{standardItems.map(renderCartItem)}</div>
            </div>
            <CartCheckoutSummary
              mode="standard"
              items={standardItems}
              total={standardTotal}
              locale={locale}
              onSuccess={handleOrdered}
            />
          </section>
        )}

        {hasPreorder && (
          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.06em] text-stone-950">
                {t("checkout.preorderSectionTitle")}
              </h2>
              <div className="space-y-3">{preorderItems.map(renderCartItem)}</div>
            </div>
            <CartCheckoutSummary
              mode="preorder"
              items={preorderItems}
              total={preorderTotal}
              locale={locale}
              onSuccess={handleOrdered}
            />
          </section>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={clear}
            className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-stone-400 hover:border-stone-300 hover:text-stone-700"
          >
            {t("common.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartCheckoutSummary({
  mode,
  items,
  total,
  locale,
  onSuccess,
}: {
  mode: PurchaseKind;
  items: CartItem[];
  total: number;
  locale: Locale;
  onSuccess: (order: { id: string; number: string; kind: PurchaseKind }) => void;
}) {
  const t = useT();
  return (
    <aside className="h-fit rounded-[1.75rem] border border-stone-200 bg-[#fbfaf8] p-5 shadow-sm shadow-stone-200/60 lg:sticky lg:top-28">
      <h2 className="text-xl font-semibold uppercase tracking-[0.06em] text-stone-950">{t("checkout.summary")}</h2>
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
      <div className="mt-4 flex justify-between rounded-2xl bg-white px-4 py-3">
        <span className="font-semibold text-stone-900">{t("checkout.total")}</span>
        <span className="text-lg font-semibold text-stone-950">
          {formatPrice(total, locale)}
        </span>
      </div>

      <CheckoutForm items={items} total={total} mode={mode} onSuccess={onSuccess} />
    </aside>
  );
}