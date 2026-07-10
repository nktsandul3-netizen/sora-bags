"use client";

import { useMemo, useState, useTransition } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { useWishlist } from "@/context/wishlist";
import { localizeColorName, localizeProductImageAlt, localizeProductTitle } from "@/lib/product-i18n";
import { getAccountRecommendations } from "@/lib/recommendations";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/types";
import {
  ACCOUNT_TABS,
  accountTabHref,
  parseAccountTab,
  type AccountTab,
} from "@/lib/account-tabs";
import {
  addAddress,
  deleteAddress,
  setDefaultAddress,
  updateProfile,
  type ActionResult,
} from "@/app/account/actions";
import type { AddressView, OrderView, ProfileView } from "@/lib/account";
import { getAddressLabelDisplay, getAddressLabelOptions } from "@/lib/address-label";

const accent = "#8A6248";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function AccountDashboard({
  profile,
  addresses,
  orders,
  initialTab,
}: {
  profile: ProfileView;
  addresses: AddressView[];
  orders: OrderView[];
  initialTab?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useT();
  const { count: wishlistCount } = useWishlist();
  const activeTab = parseAccountTab(searchParams.get("tab") ?? initialTab);

  function selectTab(next: AccountTab) {
    router.push(withLocalePath(accountTabHref(next), locale));
  }

  const firstName = profile.name.trim().split(/\s+/)[0] || profile.name;
  const activeTabLabel = accountTabLabel(activeTab, t);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14"
    >
      {activeTab === "console" && (
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-[24px] bg-[#F9F3EC] px-6 py-8 sm:px-10 sm:py-11 lg:px-14"
        >
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
                {t("account.privateAccount")}
              </p>
              <h1 className="mt-5 font-serif text-[2.35rem] leading-[0.98] text-stone-950 sm:text-5xl lg:text-6xl">
                {t("account.hello")}, {firstName}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-stone-600 sm:text-base">
                {t("account.welcome")}
              </p>
            </div>
            <Link
              href={withLocalePath("/bags", locale)}
              className="group inline-flex w-fit items-center justify-center rounded-full bg-stone-950 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b221b] focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            >
              {t("account.continueShopping")}
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.section>
      )}

      <div className={(activeTab === "console" ? "mt-8 " : "") + "lg:hidden"}>
        <details className="group rounded-[22px] border border-[#e8e8e8] bg-white shadow-[0_18px_45px_rgba(41,31,23,0.05)]">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-stone-900">
            <span>{activeTabLabel}</span>
            <span className="text-stone-400 transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <AccountNavigation
            activeTab={activeTab}
            onNavigate={selectTab}
            className="border-t border-stone-100 p-2"
          />
        </details>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-start">
        <motion.aside
          variants={fadeUp}
          className="sticky top-28 hidden rounded-[24px] border border-[#e8e8e8] bg-white p-3 shadow-[0_20px_60px_rgba(41,31,23,0.055)] lg:block"
        >
          <div className="border-b border-stone-100 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">{t("common.profile")}</p>
            <p className="mt-2 text-sm text-stone-600">{t("account.manageAccount")}</p>
          </div>
          <AccountNavigation activeTab={activeTab} onNavigate={selectTab} className="mt-3" />
        </motion.aside>

        <motion.main
          key={activeTab}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="min-w-0"
        >
          {activeTab === "console" && (
            <ConsoleSection
              orders={orders}
              ordersCount={orders.length}
              addressesCount={addresses.length}
              wishlistCount={wishlistCount}
              onNavigate={selectTab}
            />
          )}
          {activeTab === "orders" && <SectionShell eyebrow={t("account.purchaseHistory")} title={t("account.orders")}><OrdersSection orders={orders} /></SectionShell>}
          {activeTab === "addresses" && <SectionShell eyebrow={t("account.delivery")} title={t("account.addresses")}><AddressesSection addresses={addresses} /></SectionShell>}
          {activeTab === "wishlist" && <SectionShell eyebrow={t("account.savedModels")} title={t("common.wishlist")}><WishlistSection /></SectionShell>}
          {activeTab === "profile" && <SectionShell eyebrow={t("account.personalInfo")} title={t("account.personalData")}><ProfileSection profile={profile} /></SectionShell>}
        </motion.main>
      </div>
    </motion.div>
  );
}

function AccountNavigation({
  activeTab,
  onNavigate,
  className = "",
}: {
  activeTab: AccountTab;
  onNavigate: (tab: AccountTab) => void;
  className?: string;
}) {
  const t = useT();
  const locale = useLocale();
  return (
    <nav className={"space-y-4 " + className} aria-label={t("common.profile")}>
      {ACCOUNT_TABS.map((item) => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={
              "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8A6248]/25 " +
              (active
                ? "bg-[#F9F3EC] text-stone-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-950")
            }
          >
            <AccountIcon id={item.id} active={active} />
            <span className="flex-1">{accountTabLabel(item.id, t)}</span>
            {active && <span className="h-px w-7" style={{ backgroundColor: accent }} />}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: withLocalePath("/account", locale) })}
        className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-stone-400 transition duration-300 hover:bg-stone-50 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-[#8A6248]/25"
      >
        <AccountIcon id="logout" />
        <span className="flex-1">{t("account.logout")}</span>
      </button>
    </nav>
  );
}

function accountTabLabel(tab: AccountTab, t: ReturnType<typeof useT>) {
  if (tab === "console") return t("account.console");
  if (tab === "orders") return t("account.orders");
  if (tab === "wishlist") return t("common.wishlist");
  if (tab === "addresses") return t("account.addresses");
  return t("account.profile");
}

function AccountIcon({
  id,
  active = false,
}: {
  id: AccountTab | "logout";
  active?: boolean;
}) {
  const common = "h-[18px] w-[18px]";
  const stroke = active ? accent : "currentColor";

  if (id === "orders") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke={stroke} strokeWidth="1.45">
        <path d="M6.5 4.75h11v14.5h-11z" />
        <path d="M9 8h6M9 12h6M9 16h3.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "wishlist") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke={stroke} strokeWidth="1.45">
        <path d="M8 4.75h8v15l-4-3-4 3z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "addresses") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke={stroke} strokeWidth="1.45">
        <path d="M12 20s6-5.4 6-10.2A6 6 0 0 0 6 9.8C6 14.6 12 20 12 20Z" />
        <circle cx="12" cy="9.8" r="2.1" />
      </svg>
    );
  }
  if (id === "profile") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke={stroke} strokeWidth="1.45">
        <circle cx="12" cy="8.25" r="3.1" />
        <path d="M5.8 19.25c.7-3.4 3-5.1 6.2-5.1s5.5 1.7 6.2 5.1" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "logout") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.45">
        <path d="M10.5 5.5h-4v13h4" />
        <path d="M13 8.5 16.5 12 13 15.5M8.5 12h7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke={stroke} strokeWidth="1.45">
      <path d="M5 5.5h6v6H5zM13 5.5h6v6h-6zM5 13.5h6v5H5zM13 13.5h6v5h-6z" />
    </svg>
  );
}

function ConsoleSection({
  orders,
  ordersCount,
  addressesCount,
  wishlistCount,
  onNavigate,
}: {
  orders: OrderView[];
  ordersCount: number;
  addressesCount: number;
  wishlistCount: number;
  onNavigate: (tab: AccountTab) => void;
}) {
  const t = useT();
  const cards = [
    { tab: "orders" as const, label: t("account.orders"), value: String(ordersCount) },
    { tab: "wishlist" as const, label: t("common.wishlist"), value: String(wishlistCount) },
    { tab: "addresses" as const, label: t("account.addresses"), value: String(addressesCount) },
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <motion.button
            key={c.tab}
            type="button"
            whileHover={{ y: -4, scale: 1.015 }}
            onClick={() => onNavigate(c.tab)}
            className="rounded-[20px] border border-[#e8e8e8] bg-white p-6 text-left shadow-[0_18px_45px_rgba(41,31,23,0.045)] transition hover:border-[#d8c8bb]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-400">{c.label}</p>
            <p className="mt-4 font-serif text-5xl leading-none text-stone-950">{c.value}</p>
          </motion.button>
        ))}
      </section>
      <RecommendationsSection orders={orders} />
      <BrandBenefitsSection />
    </div>
  );
}

function RecommendationsSection({ orders }: { orders: OrderView[] }) {
  const locale = useLocale();
  const t = useT();
  const recommendedProducts = useMemo(
    () => getAccountRecommendations(orders.flatMap((order) => order.items.map((item) => item.slug)), 4),
    [orders],
  );
  return (
    <section className="rounded-[24px] bg-[#FBF8F6] p-5 sm:p-7 lg:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">{t("account.recommendations")}</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-950 sm:text-4xl">
            {t("account.recommendedForYou")}
          </h2>
        </div>
        <Link href={withLocalePath("/bags", locale)} className="hidden text-sm font-medium text-stone-500 transition hover:text-stone-950 sm:inline">
          {t("account.allModels")} →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {recommendedProducts.map((product) => (
          <RecommendationCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

function RecommendationCard({ product }: { product: Product }) {
  const image = getProductImage(product);
  const locale = useLocale();
  const localizedTitle = localizeProductTitle(product, locale);
  const modelName = localizedTitle.split(/\s*[—–-]\s*/)[0]?.trim() || localizedTitle;
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group overflow-hidden rounded-[20px] bg-white"
    >
      <Link href={withLocalePath(`/product/${product.slug}`, locale)} className="flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden bg-white">
          {image ? (
            <Image
              src={image.src}
              alt={localizeProductImageAlt(image.alt, locale) || localizedTitle}
              fill
              sizes="(min-width: 1280px) 220px, (min-width: 640px) 45vw, 90vw"
              className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-stone-50" />
          )}
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          <h3 className="h-5 truncate text-[15px] font-medium leading-5 text-[#111] transition-colors group-hover:text-stone-950">
            {modelName}
          </h3>
          <p className="mt-1.5 text-[13px] font-normal leading-5 text-[#111] opacity-50">
            {formatPrice(product.price, locale)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

function getProductImage(product: Product) {
  return product.images?.[0] ?? product.colors[0]?.images?.[0] ?? null;
}

function BrandBenefitsSection() {
  const t = useT();
  const benefits = [t("common.madeInItaly"), t("account.naturalLeather"), t("account.qualityWarranty"), t("account.fastDelivery")];
  return (
    <section className="rounded-[24px] border border-[#e8e8e8] bg-white p-6 shadow-[0_18px_45px_rgba(41,31,23,0.04)] sm:p-8">
      <h2 className="font-serif text-3xl text-stone-950">{t("account.benefits")}</h2>
      <div className="-mx-1 mt-6 flex flex-nowrap gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {benefits.map((benefit) => (
          <motion.div
            key={benefit}
            whileHover={{ y: -2 }}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-stone-100 bg-[#fbfaf8] px-4 py-2.5 text-sm text-stone-700"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f1e8df] text-[11px] text-[#8A6248]">
              ✓
            </span>
            <span className="font-medium">{benefit}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-[#e8e8e8] bg-white p-5 shadow-[0_20px_60px_rgba(41,31,23,0.045)] sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl text-stone-950 sm:text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function customerOrderStatusLabel(status: string, t: ReturnType<typeof useT>) {
  const labels: Record<string, string> = {
    new: t("account.orderAccepted"),
    processing: t("account.confirmingDetails"),
    shipped: t("account.shippedToDelivery"),
    delivered: t("status.delivered"),
    cancelled: t("status.cancelled"),
    Новый: t("account.orderAccepted"),
    "В обработке": t("account.confirmingDetails"),
    Отправлен: t("account.shippedToDelivery"),
    Доставлен: t("status.delivered"),
    Отменён: t("status.cancelled"),
  };

  return labels[status] ?? status;
}

function OrdersSection({ orders }: { orders: OrderView[] }) {
  const locale = useLocale();
  const t = useT();
  if (orders.length === 0) {
    return (
      <EmptyState
        text={t("account.noOrders")}
        ctaHref={withLocalePath("/bags", locale)}
        ctaLabel={t("home.toCatalog")}
      />
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          whileHover={{ y: -2 }}
          className="rounded-[20px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_12px_28px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-[14px] font-medium leading-5 text-[#111]">№ {order.number}</p>
              <p className="text-[12px] font-normal leading-5 text-[#111] opacity-45">
                {new Date(order.createdAt).toLocaleDateString(locale === "ru" ? "ru-RU" : locale === "ro" ? "ro-RO" : "en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className="rounded-full bg-[#F5F3F0] px-3 py-1 text-xs font-medium text-stone-600">
              {customerOrderStatusLabel(order.status, t)}
            </span>
          </div>

          <ul className="mt-4 border-t border-black/[0.06] pt-1">
            {order.items.map((it, i) => {
              const product = products.find((candidate) => candidate.slug === it.slug);
              const title = product ? localizeProductTitle(product, locale) : it.title;
              const color = product
                ? localizeColorName(
                    product.colors.find((candidate) => candidate.name === it.color) ?? it.color,
                    locale,
                  )
                : it.color;
              return (
                <li
                  key={`${order.id}-${i}`}
                  className="flex items-baseline py-3"
                >
                  <span className="min-w-0 flex-1 pr-6 text-[15px] font-normal leading-5 text-[#111]">
                    {title}
                    <span className="text-[#111] opacity-45"> · {color} · {it.qty} {t("account.units")}</span>
                  </span>
                  <span className="w-[110px] shrink-0 text-right text-[15px] font-normal leading-5 text-[#111] tabular-nums">
                    {formatPrice(it.price * it.qty, locale)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex items-baseline border-t border-black/[0.06] pt-4">
            <span className="min-w-0 flex-1 pr-6 text-[11px] font-medium uppercase tracking-[0.12em] text-[#111] opacity-40">
              {t("account.total")}
            </span>
            <span className="w-[110px] shrink-0 text-right text-[15px] font-medium leading-5 text-[#111] tabular-nums">
              {formatPrice(order.total, locale)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AddressesSection({ addresses }: { addresses: AddressView[] }) {
  const router = useRouter();
  const t = useT();
  const locale = useLocale();
  const labelOptions = getAddressLabelOptions(locale);
  const [pending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    label: "",
    recipient: "",
    phone: "",
    city: "",
    street: "",
    comment: "",
    isDefault: false,
  });

  function runAction(fn: () => Promise<ActionResult>, onOk?: () => void) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (res.ok) {
        onOk?.();
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  const fieldClass =
    "w-full rounded-2xl border border-[#e8e8e8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A6248] focus:ring-2 focus:ring-[#8A6248]/10";

  return (
    <div>
      {addresses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <motion.div
              key={a.id}
              whileHover={{ y: -3 }}
              className="relative rounded-[20px] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]"
            >
              {a.isDefault && (
                <span className="absolute right-4 top-4 inline-flex h-[26px] items-center rounded-full bg-[#F2EDE8] px-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#8C7A65]">
                  {t("account.defaultAddress")}
                </span>
              )}
              <p className={"text-[16px] font-medium leading-6 text-[#111] " + (a.isDefault ? "pr-24" : "")}>
                {getAddressLabelDisplay(a.label, locale)}
              </p>
              <div className="mt-3 space-y-0.5 text-[14px] font-normal leading-[22px] text-[#111] opacity-70">
                <p>{a.recipient}</p>
                <p>{a.phone}</p>
                <p>
                  {a.city}, {a.street}
                </p>
                {a.comment ? <p className="opacity-80">{a.comment}</p> : null}
              </div>
              <div className="mt-5 flex gap-4">
                {!a.isDefault && (
                  <button
                    disabled={pending}
                    onClick={() => runAction(() => setDefaultAddress(a.id))}
                    className="text-[13px] font-medium text-black/35 transition hover:text-black/65 disabled:opacity-40"
                  >
                    {t("account.makeDefault")}
                  </button>
                )}
                <button
                  disabled={pending}
                  onClick={() => runAction(() => deleteAddress(a.id))}
                  className="text-[13px] font-normal text-black/35 transition hover:text-black/65 disabled:opacity-30"
                >
                  {t("common.delete")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}

      {showForm ? (
        <div className="mt-6 rounded-[20px] border border-[#e8e8e8] bg-[#fdfcfb] p-5">
          <h3 className="mb-4 font-serif text-2xl text-stone-950">{t("account.newAddress")}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                {t("account.addressType")}
              </span>
              <div className="flex flex-wrap gap-2">
                {labelOptions.map((option) => {
                  const active = form.label === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setForm({ ...form, label: option.value })}
                      className={
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition " +
                        (active
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-[#e8e8e8] bg-white text-stone-600 hover:border-stone-400")
                      }
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <input
                placeholder={t("account.addressTypePlaceholder")}
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                autoComplete="address-line3"
                className={fieldClass}
              />
              <span className="block text-xs text-stone-400">
                {t("account.addressTypeHint")}
              </span>
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                {t("account.recipient")}
              </span>
              <input
                placeholder={t("account.recipientPlaceholder")}
                value={form.recipient}
                onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                autoComplete="name"
                className={fieldClass}
              />
              <span className="block text-xs text-stone-400">
                {t("account.recipientHint")}
              </span>
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                {t("account.mobilePhone")}
              </span>
              <input
                placeholder="+373 ..."
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="tel"
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                {t("checkout.city")}
              </span>
              <input
                placeholder={t("account.cityPlaceholder")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                autoComplete="address-level2"
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                {t("checkout.address")}
              </span>
              <input
                placeholder={t("account.addressPlaceholder")}
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                autoComplete="street-address"
                className={fieldClass}
              />
              <span className="block text-xs text-stone-400">
                {t("account.addressHint")}
              </span>
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                {t("account.deliveryComment")}
              </span>
              <input
                placeholder={t("account.commentPlaceholder")}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className={fieldClass}
              />
            </label>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="h-4 w-4 accent-stone-900"
            />
            {t("account.makeDefaultAddress")}
          </label>
          <div className="mt-4 flex gap-3">
            <button
              disabled={pending}
              onClick={() =>
                runAction(
                  () => addAddress(form),
                  () => {
                    setForm({
                      label: "",
                      recipient: "",
                      phone: "",
                      city: "",
                      street: "",
                      comment: "",
                      isDefault: false,
                    });
                    if (addresses.length > 0) setShowForm(false);
                  },
                )
              }
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2b221b] disabled:opacity-60"
            >
              {pending ? t("account.saving") : t("account.saveAddress")}
            </button>
            {addresses.length > 0 && (
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full px-5 py-2.5 text-sm text-stone-500 hover:text-stone-800"
              >
                {t("common.cancel")}
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[24px] border border-[#EDE9E5] bg-white px-5 text-[14px] font-medium text-[#111] transition hover:bg-[#FBF7F4]"
        >
          {t("account.addAddress")}
        </button>
      )}
    </div>
  );
}

function WishlistSection() {
  const { items } = useWishlist();
  const locale = useLocale();
  const t = useT();
  const favorites = products.filter((p) => items.includes(p.slug));

  if (favorites.length === 0) {
    return (
      <EmptyState
        text={t("account.wishlistHint")}
        ctaHref={withLocalePath("/bags", locale)}
        ctaLabel={t("home.toCatalog")}
      />
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-stone-500">{t("account.savedCount")}: {favorites.length}</p>
        <Link
          href={withLocalePath("/wishlist", locale)}
          className="text-sm font-medium text-stone-700 underline-offset-2 hover:underline"
        >
          {t("account.openWishlist")}
        </Link>
      </div>
      <ProductGrid products={favorites} />
    </div>
  );
}

function ProfileSection({ profile }: { profile: ProfileView }) {
  const router = useRouter();
  const t = useT();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(profile.name);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fieldClass =
    "h-12 w-full rounded-[24px] border border-[#EDE9E5] bg-white px-[18px] text-[15px] text-[#111] outline-none transition focus:border-[#D8CEC6] focus:outline-none focus:ring-0 disabled:bg-[#FBF8F6] disabled:text-[#111]/50";

  function save() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await updateProfile({ name });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className="max-w-lg">
      <div>
        <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-[#111] opacity-45">
          {t("account.name")}
        </label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
          className={fieldClass}
        />
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-[#111] opacity-45">
          {t("auth.emailPlaceholder")}
        </label>
        <input value={profile.email} disabled className={fieldClass} />
      </div>

      {error && (
        <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}
      {saved && (
        <p className="mt-5 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
          {t("account.saved")}
        </p>
      )}

      <button
        disabled={pending || name.trim() === profile.name}
        onClick={save}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#2A2A2A] px-7 text-[14px] font-medium text-white transition hover:bg-[#1A1A1A] disabled:opacity-60"
      >
        {pending ? t("account.saving") : t("common.save")}
      </button>
    </div>
  );
}

function EmptyState({
  text,
  ctaHref,
  ctaLabel,
}: {
  text: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="rounded-[20px] bg-[#FBF8F6] px-5 py-16 text-center">
      <p className="mx-auto max-w-md text-[15px] font-normal leading-relaxed text-[#111] opacity-60">
        {text}
      </p>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-stone-950 px-6 text-[13px] font-medium tracking-[0.04em] text-white transition hover:bg-[#2b221b]"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}