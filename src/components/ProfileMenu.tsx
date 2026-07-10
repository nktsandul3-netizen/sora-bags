"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Heart,
  LayoutGrid,
  LogOut,
  MapPin,
  Package,
  User,
  type LucideProps,
} from "lucide-react";
import { accountTabHref } from "@/lib/account-tabs";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

const iconProps: LucideProps = {
  size: 18,
  strokeWidth: 1.5,
  className: "shrink-0 text-[#1A1A1A]",
  "aria-hidden": true,
};

const menuIcons: Record<string, ComponentType<LucideProps>> = {
  console: LayoutGrid,
  orders: Package,
  wishlist: Heart,
  addresses: MapPin,
  profile: User,
  logout: LogOut,
};

const menuItems = [
  { id: "console", labelKey: "account.console", href: accountTabHref("console") },
  { id: "orders", labelKey: "account.orders", href: accountTabHref("orders") },
  { id: "wishlist", labelKey: "common.wishlist", href: accountTabHref("wishlist") },
  { id: "addresses", labelKey: "account.addresses", href: accountTabHref("addresses") },
  { id: "profile", labelKey: "account.profile", href: accountTabHref("profile") },
] as const;

const itemClass =
  "flex h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-[14px] text-[#1A1A1A] transition-colors hover:bg-[#F9F6F3]";

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
        className={`text-current transition ${overlay ? "hover:opacity-75" : "hover:opacity-60"}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="6.2" r="2.8" stroke="#111" strokeWidth={1.25} strokeLinecap="round" fill="none" />
          <path
            d="M4.2 16.2 C4.2 13.2 6.6 11 10 11 C13.4 11 15.8 13.2 15.8 16.2"
            stroke="#111"
            strokeWidth={1.25}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </Link>
    );
  }

  const triggerClass = iconOnly
    ? `transition ${overlay ? "hover:opacity-100" : "hover:opacity-60"}`
    : `border-b-2 pb-0.5 ${overlay ? "text-sm font-medium text-white transition hover:text-white" : "text-sm font-medium text-stone-800 transition hover:text-stone-950"}`;

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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <circle cx="10" cy="6.2" r="2.8" stroke="#111" strokeWidth={1.25} strokeLinecap="round" fill="none" />
            <path
              d="M4.2 16.2 C4.2 13.2 6.6 11 10 11 C13.4 11 15.8 13.2 15.8 16.2"
              stroke="#111"
              strokeWidth={1.25}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          t("account.profile")
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 min-w-[220px] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5"
        >
          {menuItems.map((item) => {
            const Icon = menuIcons[item.id];
            return (
              <Link
                key={item.id}
                href={withLocalePath(item.href, locale)}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={itemClass}
              >
                {Icon ? <Icon {...iconProps} /> : null}
                {t(item.labelKey)}
              </Link>
            );
          })}

          <div className="mx-1 my-2 h-px bg-[#F0EDEA]" aria-hidden />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: withLocalePath("/", locale) });
            }}
            className={`w-full text-left text-[#6B7280] hover:text-[#1A1A1A] ${itemClass}`}
          >
            <LogOut {...iconProps} className="shrink-0 text-[#6B7280]" />
            {t("account.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
