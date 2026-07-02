"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { accountTabHref } from "@/lib/account-tabs";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

function MenuIcon({ name }: { name: string }) {
  const cls = "h-5 w-5 shrink-0 text-stone-700";
  switch (name) {
    case "console":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "orders":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M8 8h8l-1.5 10H9.5L8 8Z" strokeLinejoin="round" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
        </svg>
      );
    case "wishlist":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5c2 0 3.2 1.3 4 2.5.8-1.2 2-2.5 4-2.5 3 0 4.5 3 3 6C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
        </svg>
      );
    case "addresses":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" />
        </svg>
      );
    case "logout":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
          <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

const menuItems = [
  { id: "console", labelKey: "account.console", href: accountTabHref("console") },
  { id: "orders", labelKey: "account.orders", href: accountTabHref("orders") },
  { id: "wishlist", labelKey: "common.wishlist", href: accountTabHref("wishlist") },
  { id: "addresses", labelKey: "account.addresses", href: accountTabHref("addresses") },
  { id: "profile", labelKey: "account.profile", href: accountTabHref("profile") },
] as const;

export default function ProfileMenu({
  overlay = false,
  iconOnly = false,
}: {
  overlay?: boolean;
  iconOnly?: boolean;
}) {
  const { status } = useSession();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const onAccount = pathname.startsWith("/account");

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  if (status !== "authenticated") {
    return (
      <Link
        href={withLocalePath("/account", locale)}
        aria-label={t("common.profile")}
        className={`inline-flex h-9 w-9 items-center justify-center transition ${overlay ? "hover:opacity-75" : "hover:opacity-60"}`}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 origin-center scale-x-[1.08]" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
          <circle cx="12" cy="8.25" r="3.25" />
          <path d="M5.5 20.25c0-3.75 2.9-6 6.5-6s6.5 2.25 6.5 6" strokeLinecap="round" />
        </svg>
      </Link>
    );
  }

  const triggerClass = iconOnly
    ? `inline-flex h-9 w-9 items-center justify-center transition ${overlay ? "hover:opacity-75" : "hover:opacity-60"}`
    : `border-b-2 pb-0.5 ${overlay ? "text-sm font-medium text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] transition hover:text-white/90" : "text-sm font-medium text-stone-800 transition hover:text-stone-950"}`;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("common.profile")}
        className={`${triggerClass} ${!iconOnly && (open || onAccount) ? (overlay ? "border-white" : "border-stone-900") : !iconOnly ? "border-transparent" : ""}`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {iconOnly ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 origin-center scale-x-[1.08]" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
            <circle cx="12" cy="8.25" r="3.25" />
            <path d="M5.5 20.25c0-3.75 2.9-6 6.5-6s6.5 2.25 6.5 6" strokeLinecap="round" />
          </svg>
        ) : (
          t("account.profile")
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-56 border border-stone-200 bg-white py-2 shadow-xl shadow-stone-900/10"
        >
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={withLocalePath(item.href, locale)}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-800 transition hover:bg-stone-50"
            >
              <MenuIcon name={item.id} />
              {t(item.labelKey)}
            </Link>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: withLocalePath("/", locale) });
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-stone-800 transition hover:bg-stone-50"
          >
            <MenuIcon name="logout" />
              {t("account.logout")}
          </button>
        </div>
      )}
    </div>
  );
}