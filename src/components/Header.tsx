"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/lib/config";
import { useCart } from "@/context/cart";
import { useWishlist } from "@/context/wishlist";
import { useMenuOpen } from "@/context/menu-open";
import ProfileMenu from "./ProfileMenu";
import { locales, switchLocalePath, withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { persistLocaleCookie } from "@/context/locale";

function BrandLogoLink({
  overlay,
  size,
}: {
  overlay: boolean;
  size: "mobile" | "desktop";
}) {
  const locale = useLocale();
  const t = useT();
  const nameClass =
    size === "desktop"
      ? "font-serif text-[32px] font-normal uppercase leading-none tracking-[0.2em]"
      : "font-serif text-[1.55rem] font-normal uppercase leading-none tracking-[0.26em] sm:text-[2rem] sm:tracking-[0.2em]";

  return (
    <Link
      href={withLocalePath("/", locale)}
      className={
        "group flex flex-col items-center text-center transition-opacity hover:opacity-95 " +
        (overlay ? "text-white" : "text-stone-950")
      }
    >
      <span className={nameClass}>{brand.name}</span>
      <span
        className={
          "mt-1 inline-flex items-center gap-2 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.3em] " +
          (overlay ? "text-white/80" : "text-stone-500 group-hover:text-stone-600")
        }
      >
        <span
          className={"h-px w-4 " + (overlay ? "bg-white/40" : "bg-stone-400/70")}
          aria-hidden
        />
        {t("common.madeInItaly")}
        <span
          className={"h-px w-4 " + (overlay ? "bg-white/40" : "bg-stone-400/70")}
          aria-hidden
        />
      </span>
    </Link>
  );
}

function StoreLocatorLink({ overlay, compact = false }: { overlay: boolean; compact?: boolean }) {
  const locale = useLocale();
  const t = useT();
  return (
    <Link
      href={withLocalePath("/info/nashi-magaziny", locale)}
      className={
        "inline-flex items-center gap-2 px-1 py-1 text-[11px] font-medium uppercase tracking-[0.14em] transition " +
        (overlay
          ? "text-white/85 hover:text-white"
          : "text-[#111] opacity-85 hover:opacity-100")
      }
      aria-label={t("nav.stores")}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <path d="M12 21s7-5.15 7-11a7 7 0 1 0-14 0c0 5.85 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.35" />
      </svg>
      {compact ? null : <span className="hidden whitespace-nowrap md:inline">{t("nav.stores")}</span>}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const t = useT();
  const { menuOpen, setMenuOpen } = useMenuOpen();
  const iconHoverClass = "hover:opacity-60";

  return (
    <header className="relative z-50 box-border h-[72px] min-h-[72px] max-h-[72px] border-b border-[#EDE5DF] bg-[#F7F3F0] text-[#111]">
      {/* Mobile */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 text-[#111] sm:px-6 lg:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="-ml-1 inline-flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-[#111] transition hover:opacity-60 sm:px-3 sm:py-2"
            onClick={() => setMenuOpen(true)}
            aria-label={t("common.menu")}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <StoreLocatorLink overlay={false} />
        </div>

        <BrandLogoLink overlay={false} size="mobile" />

        <div className="flex shrink-0 items-center gap-3">
          <ProfileMenu overlay={false} iconOnly />
          <CartIcon hoverClassName={iconHoverClass} />
          <LanguageSwitcher overlay={false} reversed />
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden h-[72px] max-w-7xl items-center justify-between px-8 lg:flex">
        <div className="flex translate-y-0.5 items-center text-[#111]">
          <StoreLocatorLink overlay={false} />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <BrandLogoLink overlay={false} size="desktop" />
        </div>

        <div className="flex h-[72px] items-center text-[#111]">
          <div className="header-icons flex items-center gap-6">
            <WishlistIcon hoverClassName={iconHoverClass} />
            <ProfileMenu overlay={false} iconOnly />
            <CartIcon hoverClassName={iconHoverClass} />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("common.menu")}
            className="ml-7 inline-flex items-center gap-2 px-0 text-[13px] font-medium uppercase leading-none tracking-[0.12em] text-[#111] opacity-85 transition hover:opacity-100"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="block" aria-hidden>
              <line x1="1" y1="1.2" x2="17" y2="1.2" stroke="#111" strokeWidth={1.25} strokeLinecap="round" />
              <line x1="1" y1="6" x2="17" y2="6" stroke="#111" strokeWidth={1.25} strokeLinecap="round" />
              <line x1="1" y1="10.8" x2="17" y2="10.8" stroke="#111" strokeWidth={1.25} strokeLinecap="round" />
            </svg>
            {t("common.menu")}
          </button>
          <LanguageSwitcher overlay={false} reversed />
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 17.2 L3.8 11.1 C2.6 9.9 2 8.7 2 7.3 C2 5.4 3.5 4 5.4 4 C6.6 4 7.5 4.5 8.3 5.6 L10 7.8 L11.7 5.6 C12.5 4.5 13.4 4 14.6 4 C16.5 4 18 5.4 18 7.3 C18 8.7 17.4 9.9 16.2 11.1 L10 17.2Z"
        stroke="#111"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function HandbagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6.2 7.2 L6.2 5.6 C6.2 3.5 7.9 1.8 10 1.8 C12.1 1.8 13.8 3.5 13.8 5.6 L13.8 7.2"
        stroke="#111"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3.5 7.2 H16.5 L15.6 16.8 H4.4 L3.5 7.2Z"
        stroke="#111"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function WishlistIcon({
  hoverClassName = "hover:opacity-60",
}: {
  hoverClassName?: string;
}) {
  const { count } = useWishlist();
  const t = useT();
  const locale = useLocale();
  return (
    <Link
      href={withLocalePath("/wishlist", locale)}
      aria-label={t("common.wishlist")}
      className={`relative text-current transition ${hoverClassName}`}
    >
      <HeartIcon />
      {count > 0 && (
        <span className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C08A4A] text-[11px] font-medium leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

function CartIcon({ hoverClassName = "hover:opacity-60" }: { hoverClassName?: string }) {
  const { count, openCart } = useCart();
  const t = useT();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={t("common.cart")}
      className={`relative text-current transition ${hoverClassName}`}
    >
      <HandbagIcon />
      {count > 0 && (
        <span className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C08A4A] text-[11px] font-medium leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

/**
 * Текущая query-строка (+ hash) для сохранения при смене языка.
 * useSearchParams здесь не используется намеренно: компонент рендерится в
 * глобальном Header на каждой странице, и на статически пререндеренных
 * страницах это привело бы к ошибке Suspense-границы при сборке.
 */
function useCurrentUrlSuffix() {
  const pathname = usePathname();
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const update = () => setSuffix(window.location.search + window.location.hash);
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [pathname]);
  return suffix;
}

function LanguageSwitcher({ overlay = false, reversed = false }: { overlay?: boolean; reversed?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const suffix = useCurrentUrlSuffix();
  const languageOptions = reversed ? [...locales].reverse() : locales;

  return (
    <div
      className={
        "inline-flex shrink-0 flex-row items-center text-[11px] uppercase tracking-[0.06em] " +
        (overlay
          ? "ml-6 border-l border-white/20 pl-6"
          : "ml-6 gap-3 border-l border-[#EDE5DF] pl-6")
      }
    >
      {languageOptions.map((item, index) => (
        <span key={item} className="inline-flex items-center">
          {overlay && index > 0 ? (
            <span className="mx-1.5 text-white/40" aria-hidden>
              ·
            </span>
          ) : null}
          <Link
            href={switchLocalePath(pathname, item) + suffix}
            onClick={(e) => {
              const live = window.location.search + window.location.hash;
              e.preventDefault();
              persistLocaleCookie(item);
              // Browser URL still has /en|/ru|/ro; usePathname() may be the rewritten path without it.
              router.push(switchLocalePath(window.location.pathname, item) + live);
              router.refresh();
            }}
            className={
              "uppercase transition " +
              (item === locale
                ? overlay
                  ? "font-medium text-white opacity-100"
                  : "font-medium text-[#111] opacity-100"
                : overlay
                  ? "text-white opacity-40 hover:opacity-100"
                  : "text-[#111] opacity-40 hover:opacity-80")
            }
          >
            {item}
          </Link>
        </span>
      ))}
    </div>
  );
}

type MenuLinkKind = "catalog" | "collection" | "category";

type MenuLink = {
  label: string;
  href: string;
  kind: MenuLinkKind;
};

type MenuSection = {
  id: "shop" | "collections" | "info";
  label: string;
  links: MenuLink[];
};

function MobileMenu({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const suffix = useCurrentUrlSuffix();
  const [activeSection, setActiveSection] = useState<"shop" | "collections" | "info" | null>("shop");

  const sections: MenuSection[] = [
    {
      id: "shop",
      label: t("nav.shop"),
      links: [
        { label: t("catalog.allCatalog"), href: withLocalePath("/bags", locale), kind: "catalog" },
        {
          label: t("nav.foulardSilk"),
          href: withLocalePath("/accessories/womens-scarves-women", locale),
          kind: "category",
        },
        { label: t("nav.charms"), href: withLocalePath("/accessories/bag-charms", locale), kind: "category" },
        {
          label: t("nav.wallets"),
          href: withLocalePath("/accessories/wallets-cardholders", locale),
          kind: "category",
        },
      ],
    },
    {
      id: "collections",
      label: t("nav.collections"),
      links: [
        {
          label: t("nav.amalfiCollection"),
          href: withLocalePath("/collections/amalfi-woven", locale),
          kind: "collection",
        },
        {
          label: t("nav.veneziaCollection"),
          href: withLocalePath("/collections/venezia-intreccio", locale),
          kind: "collection",
        },
      ],
    },
    {
      id: "info",
      label: t("nav.info"),
      links: [
        { label: t("nav.about"), href: withLocalePath("/info/o-nas", locale), kind: "category" },
        { label: t("nav.stores"), href: withLocalePath("/info/nashi-magaziny", locale), kind: "category" },
        { label: t("nav.warranty"), href: withLocalePath("/info/garantiya", locale), kind: "category" },
        {
          label: t("nav.materialsCare"),
          href: withLocalePath("/info/materialy-i-uhod", locale),
          kind: "category",
        },
        {
          label: t("nav.paymentDelivery"),
          href: withLocalePath("/info/oplata-i-dostavka", locale),
          kind: "category",
        },
      ],
    },
  ];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const linkSpacing = (_sectionId: MenuSection["id"], links: MenuLink[], index: number) => {
    if (index === links.length - 1) return "mb-0";
    return "mb-1";
  };

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderLink = (sectionId: MenuSection["id"], l: MenuLink, index: number, links: MenuLink[]) => {
    const spacing = linkSpacing(sectionId, links, index);
    const active = isLinkActive(l.href);
    const linkClass =
      "flex h-9 items-center text-[15px] font-normal tracking-[0.02em] outline-none transition-[color,transform] duration-[160ms] ease-out hover:translate-x-[2px] focus:outline-none focus-visible:outline-none " +
      (active ? "text-[#111]" : "text-[#6B6560] hover:text-[#111]");

    return (
      <li key={l.href} className={spacing}>
        <Link href={l.href} onClick={onClose} className={linkClass}>
          {l.label}
        </Link>
      </li>
    );
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 hidden bg-black/35 backdrop-blur-md lg:block" onClick={onClose} />
      <div className="absolute inset-0 bg-white lg:left-auto lg:w-[42%] lg:min-w-[440px] lg:max-w-[560px] lg:rounded-l-[28px] lg:shadow-[-24px_0_80px_rgba(0,0,0,0.18)]">
        <div className="relative flex h-full flex-col overflow-y-auto bg-white">
          <div className="flex items-center justify-end px-5 pb-2 pt-5 sm:px-8 sm:pt-7 lg:px-10 lg:pt-7">
            <button
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:bg-stone-800 lg:h-11 lg:w-11"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-8 pb-8 pt-2 sm:px-10 sm:pt-4 lg:px-16 lg:pb-10 lg:pt-4">
            <ul>
              {sections.map((section) => {
                const open = activeSection === section.id;
                return (
                  <li key={section.id} className="border-b border-[#F1EBE6] last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setActiveSection(open ? null : section.id)}
                      className={
                        "block w-full text-left text-[20px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-[160ms] hover:text-[#111] " +
                        (open ? "mb-6 pb-0 pt-4 text-[#111]" : "py-4 text-[#6B6560]")
                      }
                    >
                      {section.label}
                    </button>
                    {open ? (
                      <ul className="pb-6">
                        {section.links.map((link, index) =>
                          renderLink(section.id, link, index, section.links),
                        )}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-[#F1EBE6] px-8 py-6 sm:px-10 lg:px-16">
            <div className="flex gap-3 text-[11px] font-medium uppercase tracking-[0.18em]">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={switchLocalePath(pathname, item) + suffix}
                  onClick={(e) => {
                    const live = window.location.search + window.location.hash;
                    e.preventDefault();
                    persistLocaleCookie(item);
                    router.push(switchLocalePath(window.location.pathname, item) + live);
                    router.refresh();
                    onClose();
                  }}
                  className={
                    "transition " +
                    (item === locale ? "text-stone-950" : "text-stone-400 hover:text-stone-700")
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}