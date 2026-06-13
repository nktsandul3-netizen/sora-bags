"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/context/wishlist";
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

const accent = "#8A6248";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const recommendedProducts = [
  "suede-fringe-shoulder-bag-taupe",
  "premium-suede-shoulder-bag-black",
  "elegant-leather-shoulder-bag-cognac",
  "classic-leather-tote-bag-black",
]
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean)
  .slice(0, 4) as Product[];

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
  const { count: wishlistCount } = useWishlist();
  const [tab, setTab] = useState<AccountTab>(() => parseAccountTab(initialTab));

  useEffect(() => {
    setTab(parseAccountTab(searchParams.get("tab") ?? initialTab));
  }, [searchParams, initialTab]);

  function selectTab(next: AccountTab) {
    setTab(next);
    router.push(accountTabHref(next));
  }

  const firstName = profile.name.trim().split(/\s+/)[0] || profile.name;
  const activeTabLabel = ACCOUNT_TABS.find((item) => item.id === tab)?.label ?? "Консоль";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14"
    >
      <motion.section
        variants={fadeUp}
        className="relative overflow-hidden rounded-[24px] border border-[#e8e2dc] px-6 py-8 shadow-[0_24px_70px_rgba(41,31,23,0.06)] sm:px-10 sm:py-11 lg:px-14"
        style={{
          background:
            "linear-gradient(135deg, rgba(249,246,241,0.98), rgba(238,229,218,0.86)), radial-gradient(circle at 88% 18%, rgba(138,98,72,0.14), transparent 32%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #5f4636 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, #5f4636 0 1px, transparent 1px 11px)",
          }}
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              SÓRA private account
            </p>
            <h1 className="mt-5 font-serif text-[2.35rem] leading-[0.98] text-stone-950 sm:text-5xl lg:text-6xl">
              Здравствуйте, {firstName}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-stone-600 sm:text-base">
              Добро пожаловать в личный кабинет SÓRA. Здесь вы можете управлять
              заказами, избранными товарами и адресами доставки.
            </p>
          </div>
          <Link
            href="/bags"
            className="group inline-flex w-fit items-center justify-center rounded-full bg-stone-950 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(28,25,23,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b221b] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
          >
            Продолжить покупки
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.section>

      <div className="mt-8 lg:hidden">
        <details className="group rounded-[22px] border border-[#e8e8e8] bg-white shadow-[0_18px_45px_rgba(41,31,23,0.05)]">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-stone-900">
            <span>{activeTabLabel}</span>
            <span className="text-stone-400 transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <AccountNavigation
            activeTab={tab}
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
            <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">Аккаунт</p>
            <p className="mt-2 truncate text-sm text-stone-700">{profile.email}</p>
          </div>
          <AccountNavigation activeTab={tab} onNavigate={selectTab} className="mt-3" />
        </motion.aside>

        <motion.main
          key={tab}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="min-w-0"
        >
          {tab === "console" && (
            <ConsoleSection
              ordersCount={orders.length}
              addressesCount={addresses.length}
              wishlistCount={wishlistCount}
              onNavigate={selectTab}
            />
          )}
          {tab === "orders" && <SectionShell eyebrow="История покупок" title="Заказы"><OrdersSection orders={orders} /></SectionShell>}
          {tab === "addresses" && <SectionShell eyebrow="Доставка" title="Адреса"><AddressesSection addresses={addresses} /></SectionShell>}
          {tab === "wishlist" && <SectionShell eyebrow="Сохранённые модели" title="Избранное"><WishlistSection /></SectionShell>}
          {tab === "profile" && <SectionShell eyebrow="Персональная информация" title="Личные данные"><ProfileSection profile={profile} /></SectionShell>}
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
  return (
    <nav className={"space-y-1 " + className} aria-label="Навигация личного кабинета">
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
                ? "bg-[#f7f1eb] text-stone-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-950")
            }
          >
            <AccountIcon id={item.id} active={active} />
            <span className="flex-1">{item.menuLabel}</span>
            {active && <span className="h-px w-7" style={{ backgroundColor: accent }} />}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/account" })}
        className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-stone-400 transition duration-300 hover:bg-stone-50 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-[#8A6248]/25"
      >
        <AccountIcon id="logout" />
        <span className="flex-1">Выход</span>
      </button>
    </nav>
  );
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
  ordersCount,
  addressesCount,
  wishlistCount,
  onNavigate,
}: {
  ordersCount: number;
  addressesCount: number;
  wishlistCount: number;
  onNavigate: (tab: AccountTab) => void;
}) {
  const cards = [
    { tab: "orders" as const, label: "Заказы", value: String(ordersCount) },
    { tab: "wishlist" as const, label: "Избранное", value: String(wishlistCount) },
    { tab: "addresses" as const, label: "Адреса", value: String(addressesCount) },
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
      <RecommendationsSection />
      <BrandBenefitsSection />
    </div>
  );
}

function RecommendationsSection() {
  return (
    <section className="rounded-[24px] border border-[#e8e8e8] bg-[#fbfaf8] p-5 sm:p-7 lg:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">Рекомендации</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-950 sm:text-4xl">
            Подобрано специально для вас
          </h2>
        </div>
        <Link href="/bags" className="hidden text-sm font-medium text-stone-500 transition hover:text-stone-950 sm:inline">
          Все модели →
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
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group overflow-hidden rounded-[20px] border border-[#e8e8e8] bg-white shadow-[0_16px_38px_rgba(41,31,23,0.04)]"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f0eb]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.title}
              fill
              sizes="(min-width: 1280px) 220px, (min-width: 640px) 45vw, 90vw"
              className="object-contain object-center p-5 transition-transform duration-700 ease-out group-hover:scale-[1.055]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
          )}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 rounded-full bg-white/95 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-900 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Смотреть
          </span>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm leading-snug text-stone-800 transition-colors group-hover:text-stone-950">
            {product.title}
          </h3>
          <p className="mt-2 text-sm font-medium tracking-wide text-stone-950">
            {formatPrice(product.price)}
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
  const benefits = ["Made in Italy", "Натуральная кожа", "Гарантия качества", "Быстрая доставка"];
  return (
    <section className="rounded-[24px] border border-[#e8e8e8] bg-white p-6 shadow-[0_18px_45px_rgba(41,31,23,0.04)] sm:p-8">
      <h2 className="font-serif text-3xl text-stone-950">Преимущества SÓRA</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <motion.div
            key={benefit}
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-[#fbfaf8] px-4 py-4 text-sm text-stone-700"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f1e8df] text-[#8A6248]">
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
      <div className="mt-7">{children}</div>
    </section>
  );
}

function OrdersSection({ orders }: { orders: OrderView[] }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        text="У вас пока нет заказов."
        ctaHref="/bags"
        ctaLabel="В каталог"
      />
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          whileHover={{ y: -2 }}
          className="rounded-[20px] border border-[#e8e8e8] bg-[#fdfcfb] p-5 transition-shadow hover:shadow-[0_14px_36px_rgba(41,31,23,0.055)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-stone-950">№ {order.number}</p>
              <p className="text-xs text-stone-400">
                {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              {order.status}
            </span>
          </div>

          <ul className="mt-4 divide-y divide-stone-100 border-t border-stone-100">
            {order.items.map((it, i) => (
              <li
                key={`${order.id}-${i}`}
                className="flex justify-between gap-3 py-2.5 text-sm"
              >
                <span className="text-stone-700">
                  {it.title}
                  <span className="text-stone-400"> · {it.color} · {it.qty} шт.</span>
                </span>
                <span className="shrink-0 text-stone-900">
                  {formatPrice(it.price * it.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex justify-between border-t border-stone-100 pt-3 text-sm font-semibold">
            <span className="text-stone-700">Итого</span>
            <span className="text-stone-950">{formatPrice(order.total)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AddressesSection({ addresses }: { addresses: AddressView[] }) {
  const router = useRouter();
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
    <div className="space-y-5">
      {addresses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <motion.div
              key={a.id}
              whileHover={{ y: -3 }}
              className="relative rounded-[20px] border border-[#e8e8e8] bg-[#fdfcfb] p-5"
            >
              {a.isDefault && (
                <span className="absolute right-4 top-4 rounded-full bg-stone-900 px-2.5 py-1 text-[11px] font-medium text-white">
                  Основной
                </span>
              )}
              <p className="text-sm font-semibold text-stone-950">{a.label}</p>
              <p className="mt-2 text-sm text-stone-600">{a.recipient}</p>
              <p className="text-sm text-stone-600">{a.phone}</p>
              <p className="text-sm text-stone-600">
                {a.city}, {a.street}
              </p>
              {a.comment && (
                <p className="mt-1 text-xs text-stone-400">{a.comment}</p>
              )}
              <div className="mt-4 flex gap-3 text-xs">
                {!a.isDefault && (
                  <button
                    disabled={pending}
                    onClick={() => runAction(() => setDefaultAddress(a.id))}
                    className="font-medium text-stone-700 underline-offset-2 hover:underline disabled:opacity-50"
                  >
                    Сделать основным
                  </button>
                )}
                <button
                  disabled={pending}
                  onClick={() => runAction(() => deleteAddress(a.id))}
                  className="text-stone-400 underline-offset-2 hover:text-red-600 hover:underline disabled:opacity-50"
                >
                  Удалить
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}

      {showForm ? (
        <div className="rounded-[20px] border border-[#e8e8e8] bg-[#fdfcfb] p-5">
          <h3 className="mb-4 font-serif text-2xl text-stone-950">Новый адрес</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Название (Дом, Работа…)"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              className={fieldClass}
            />
            <input
              placeholder="Получатель"
              value={form.recipient}
              onChange={(e) => setForm({ ...form, recipient: e.target.value })}
              className={fieldClass}
            />
            <input
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={fieldClass}
            />
            <input
              placeholder="Город"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={fieldClass}
            />
            <input
              placeholder="Улица, дом, квартира"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              className={fieldClass + " sm:col-span-2"}
            />
            <input
              placeholder="Комментарий (необязательно)"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className={fieldClass + " sm:col-span-2"}
            />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="h-4 w-4 accent-stone-900"
            />
            Сделать основным адресом
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
              {pending ? "Сохраняем…" : "Сохранить адрес"}
            </button>
            {addresses.length > 0 && (
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full px-5 py-2.5 text-sm text-stone-500 hover:text-stone-800"
              >
                Отмена
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="rounded-full border border-[#d8d0c8] px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:bg-stone-50"
        >
          + Добавить адрес
        </button>
      )}
    </div>
  );
}

function WishlistSection() {
  const { items } = useWishlist();
  const favorites = products.filter((p) => items.includes(p.slug));

  if (favorites.length === 0) {
    return (
      <EmptyState
        text="В избранном пока пусто. Нажимайте на сердечко у понравившихся моделей."
        ctaHref="/bags"
        ctaLabel="В каталог"
      />
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-stone-500">Сохранено: {favorites.length}</p>
        <Link
          href="/wishlist"
          className="text-sm font-medium text-stone-700 underline-offset-2 hover:underline"
        >
          Открыть избранное
        </Link>
      </div>
      <ProductGrid products={favorites} />
    </div>
  );
}

function ProfileSection({ profile }: { profile: ProfileView }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(profile.name);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fieldClass =
    "w-full rounded-2xl border border-[#e8e8e8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A6248] focus:ring-2 focus:ring-[#8A6248]/10";

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
    <div className="max-w-lg space-y-5">
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-stone-400">Имя</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
          E-mail
        </label>
        <input value={profile.email} disabled className={fieldClass + " bg-stone-50 text-stone-400"} />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}
      {saved && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
          Сохранено
        </p>
      )}

      <button
        disabled={pending || name.trim() === profile.name}
        onClick={save}
        className="rounded-full bg-stone-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2b221b] disabled:opacity-60"
      >
        {pending ? "Сохраняем…" : "Сохранить"}
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
    <div className="rounded-[20px] border border-dashed border-[#ddd4cc] bg-[#fbfaf8] px-5 py-16 text-center">
      <p className="text-stone-500">{text}</p>
      <Link
        href={ctaHref}
        className="mt-6 inline-block rounded-full bg-stone-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2b221b]"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}