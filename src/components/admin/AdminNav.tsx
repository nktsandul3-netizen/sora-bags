"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { adminLogout } from "@/app/admin/actions";

interface NavItem {
  href: string;
  label: string;
  icon: keyof typeof ICONS;
  exact?: boolean;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Обзор", icon: "dashboard", exact: true },
  { href: "/admin/analytics", label: "Аналитика", icon: "analytics" },
  { href: "/admin/orders", label: "Заказы", icon: "orders" },
  { href: "/admin/payments", label: "Платежи", icon: "payments" },
  { href: "/admin/products", label: "Товары", icon: "products" },
  { href: "/admin/media", label: "Медиа", icon: "media" },
  { href: "/admin/customers", label: "Клиенты", icon: "customers" },
  { href: "/admin/newsletter", label: "Подписчики", icon: "newsletter" },
  { href: "/admin/reviews", label: "Отзывы", icon: "reviews" },
  { href: "/admin/coupons", label: "Купоны", icon: "coupons" },
  { href: "/admin/settings", label: "Настройки", icon: "settings" },
];

export default function AdminNav({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(item: NavItem): boolean {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  }

  const links = (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-2 text-sm tracking-wide transition-colors ${
              active
                ? "bg-[#A01D26] text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <span className="h-4 w-4 shrink-0">{ICONS[item.icon]}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 lg:hidden">
        <Link href="/admin" className="font-serif text-xl tracking-[0.2em] text-stone-900">
          SÓRA
        </Link>
        <button
          type="button"
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-stone-300 p-2 text-stone-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } border-b border-stone-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:w-56 lg:shrink-0 lg:border-b-0 lg:border-r lg:overflow-y-auto`}
      >
        <div className="hidden items-center gap-2 px-5 py-5 lg:flex">
          <Link href="/admin" className="font-serif text-xl tracking-[0.25em] text-stone-900">
            SÓRA
          </Link>
        </div>
        <div className="px-1 py-2 lg:py-0">{links}</div>

        <div className="border-t border-stone-200 p-4 lg:mt-4">
          <p className="mb-2 truncate px-2 text-xs text-stone-500">{userName}</p>
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-2 py-2 text-sm text-stone-600 transition-colors hover:text-[#A01D26]"
            >
              <span className="h-4 w-4 shrink-0">{ICONS.logout}</span>
              Выйти
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

const ICONS = {
  dashboard: icon("M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"),
  analytics: icon("M4 19V5M10 19V9M16 19v-6M22 19V3"),
  orders: icon("M6 2h9l5 5v15H6z"),
  payments: icon("M4 4h16v12H4z M2 20h20"),
  products: icon("M7 8V6a5 5 0 0110 0v2M4 8h16l-1 13H5z"),
  media: icon("M4 5h16v14H4z M8 11l3 3 5-6"),
  customers: icon("M9 8a3 3 0 100-6M3 20c0-3.3 2.7-6 6-6"),
  newsletter: icon("M4 6h16v12H4z M4 6l8 6 8-6"),
  reviews: icon("M12 2l2.4 4.8L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.6-1.2z"),
  coupons: icon("M4 8h16M4 16h16 M8 4v16"),
  settings: icon("M12 2v2M12 20v2M4 12H2M22 12h-2"),
  logout: icon("M14 4H6v16h8 M10 12h11"),
} as const;

function icon(d: string) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}