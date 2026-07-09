"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, type CartItem, type PurchaseKind } from "@/context/cart";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { localizeColorName, localizeProductTitle } from "@/lib/product-i18n";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductImage from "@/components/ProductImage";
import CheckoutForm from "@/components/CheckoutForm";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    standardItems,
    preorderItems,
    standardTotal,
    preorderTotal,
    setQty,
    remove,
    clearKind,
  } = useCart();
  const locale = useLocale();
  const t = useT();
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
    const localizedTitle = product ? localizeProductTitle(product, locale) : localizeProductTitle(it.title, locale);

    return (
      <div
        key={`${it.slug}-${it.color}-${it.purchaseKind}`}
        className="relative grid grid-cols-[80px_1fr_auto] gap-x-4 gap-y-3 rounded-2xl border border-[#F0EDEA] bg-white px-4 py-4"
      >
        <Link href={withLocalePath(`/product/${it.slug}`, locale)} className="row-span-2 block self-start">
          <ProductImage
            hex={thumbHex}
            section={product?.section ?? "bags"}
            src={thumbSrc}
            alt={localizedTitle}
            sizes="80px"
            className="h-20 w-20 rounded-xl bg-[#F9F6F3]"
            imageClassName="object-contain object-center"
          />
        </Link>
        <div className="min-w-0 pr-8">
          <Link
            href={withLocalePath(`/product/${it.slug}`, locale)}
            className="block text-[16px] font-medium leading-snug text-[#1A1A1A] hover:opacity-70"
          >
            {localizedTitle}
          </Link>
          <p className="mt-1.5 text-[13px] text-[#1A1A1A] opacity-60">
            {localizeColorName(it.color, locale)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => remove(it.slug, it.color, it.purchaseKind)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F3F0] text-[#1A1A1A] transition hover:bg-[#EBE8E4]"
          aria-label={t("cart.removeItem")}
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
          </svg>
        </button>

        <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:col-start-2 sm:col-end-4">
          <div className="inline-flex h-9 w-28 items-center justify-between rounded-full bg-[#F5F3F0] px-1">
            <button
              type="button"
              onClick={() => setQty(it.slug, it.color, it.qty - 1, it.purchaseKind)}
              className="flex h-8 w-8 items-center justify-center text-[#1A1A1A] opacity-60 transition hover:opacity-100"
              aria-label={t("cart.decreaseQty")}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M3 8h10" strokeLinecap="round" />
              </svg>
            </button>
            <span className="w-6 text-center text-sm leading-none text-[#1A1A1A]">{it.qty}</span>
            <button
              type="button"
              onClick={() => setQty(it.slug, it.color, it.qty + 1, it.purchaseKind)}
              className="flex h-8 w-8 items-center justify-center text-[#1A1A1A] opacity-60 transition hover:opacity-100"
              aria-label={t("cart.increaseQty")}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M8 3v10M3 8h10" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <span className="text-[15px] font-semibold leading-none text-[#1A1A1A]">
            {formatPrice(it.price * it.qty, locale)}
          </span>
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

      {hasMixedCart && (
        <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50/80 px-5 py-4 text-sm leading-relaxed text-amber-950">
          {t("checkout.mixedCartHint")}
        </div>
      )}

      <div className="mt-6 space-y-8">
        {hasStandard && (
          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.06em] text-stone-950">
                {t("checkout.standardSectionTitle")}
              </h2>
              <div className="space-y-3">{standardItems.map(renderCartItem)}</div>
              <CartTrustNotes />
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
              <CartTrustNotes />
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

      </div>
    </div>
  );
}

function CartTrustNotes() {
  const t = useT();
  const items = [
    { key: "fitting" as const, label: t("cart.trustFitting"), icon: <FittingIcon /> },
    { key: "exchange" as const, label: t("cart.trustExchange"), icon: <ExchangeIcon /> },
    { key: "cod" as const, label: t("cart.trustCod"), icon: <CodIcon /> },
  ];

  return (
    <ul className="mt-6 space-y-2.5 px-1">
      {items.map((item) => (
        <li
          key={item.key}
          className="flex items-center gap-2.5 text-[13px] leading-snug text-[#1A1A1A] opacity-60"
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function FittingIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M5.5 2.5h5l1 3.5H4.5l1-3.5Z" strokeLinejoin="round" />
      <path d="M4.5 6v7.5h7V6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5h3" strokeLinecap="round" />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M3.5 6.5h8.2l-2-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 9.5H4.3l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="2.5" y="4" width="11" height="8" rx="1.2" />
      <path d="M2.5 6.5h11" strokeLinecap="round" />
      <path d="M5 10h2.5" strokeLinecap="round" />
    </svg>
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
    <aside className="h-fit rounded-[24px] border border-[#F0EDEA] bg-[#fbfaf8] p-5 lg:sticky lg:top-6">
      <h2 className="text-xl font-semibold uppercase tracking-[0.06em] text-stone-950">{t("checkout.summary")}</h2>
      <div className="mt-3 rounded-[20px] border border-[#EDE9E5] bg-white p-5">
        <div className="space-y-2 text-sm">
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
        <div className="mt-4 flex justify-between border-t border-[#F0EBE6] pt-4">
          <span className="font-semibold text-stone-900">{t("checkout.total")}</span>
          <span className="text-lg font-semibold text-stone-950">
            {formatPrice(total, locale)}
          </span>
        </div>
      </div>

      <CheckoutForm items={items} total={total} mode={mode} onSuccess={onSuccess} />
    </aside>
  );
}