"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/lib/config";
import { bagMenuCategories, accessoryCategories } from "@/lib/data";
import { useCart } from "@/context/cart";
import { useWishlist } from "@/context/wishlist";
import { useMenuOpen } from "@/context/menu-open";
import ProfileMenu from "./ProfileMenu";
import { isHeroOverlayPath } from "@/lib/catalog-banner";
import { locales, switchLocalePath, withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import { categoryName } from "@/lib/catalog-i18n";

const overlayTextShadow =
  "[text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_3px_16px_rgba(0,0,0,0.75),0_0_1px_rgba(255,255,255,0.65)]";
const overlayLogoClass =
  "text-white " + overlayTextShadow + " drop-shadow-[0_3px_18px_rgba(0,0,0,0.75)]";
const overlayIconClass =
  "text-white [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.95))_drop-shadow(0_3px_12px_rgba(0,0,0,0.75))_drop-shadow(0_0_1px_rgba(255,255,255,0.9))]";

function BrandLogoLink({
  overlay,
  size,
}: {
  overlay: boolean;
  size: "mobile" | "desktop";
}) {
  const locale = useLocale();
  const nameClass =
    size === "desktop"
      ? "font-serif text-[2.25rem] font-normal uppercase leading-none tracking-[0.48em] xl:text-[2.6rem] xl:tracking-[0.52em]"
      : "font-serif text-[2rem] font-normal uppercase leading-none tracking-[0.38em]";

  const originClass =
    "mt-1.5 inline-flex -translate-x-2.5 items-center gap-2 text-[8px] font-medium uppercase tracking-[0.36em] sm:-translate-x-3 sm:text-[9px] xl:mt-2 xl:-translate-x-4 xl:text-[9px] xl:tracking-[0.42em]";

  return (
    <Link
      href={withLocalePath("/", locale)}
      className={
        "group flex flex-col items-center text-center transition-opacity hover:opacity-95 " +
        (overlay ? overlayLogoClass : "text-stone-950")
      }
    >
      <span className={nameClass}>{brand.name}</span>
      <span
        className={
          originClass +
          (overlay ? " text-white/90 " + overlayTextShadow : " text-stone-500 group-hover:text-stone-600")
        }
      >
        <span
          className={"h-px w-3.5 " + (overlay ? "bg-white/45" : "bg-stone-400/70")}
          aria-hidden
        />
        {brand.madeIn}
        <span
          className={"h-px w-3.5 " + (overlay ? "bg-white/45" : "bg-stone-400/70")}
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
        "inline-flex items-center gap-2 px-1 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] transition " +
        (overlay
          ? "text-white " + overlayTextShadow + " hover:text-white/75"
          : "text-stone-950 hover:text-stone-500")
      }
      aria-label={t("nav.stores")}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.45" aria-hidden>
        <path d="M12 21s7-5.15 7-11a7 7 0 1 0-14 0c0 5.85 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.35" />
      </svg>
      {compact ? null : <span>OUR STORES</span>}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const t = useT();
  const { menuOpen, setMenuOpen } = useMenuOpen();
  const isHeroOverlay = isHeroOverlayPath(pathname);
  const iconHoverClass = isHeroOverlay ? "hover:opacity-75" : "hover:opacity-60";
  const iconToneClass = isHeroOverlay ? overlayIconClass : "text-stone-800";

  return (
    <header
      className={
        isHeroOverlay
          ? "absolute left-0 right-0 top-0 z-50 bg-gradient-to-b from-black/60 via-black/35 to-black/0 pb-2 text-white"
          : "relative z-50 border-b border-stone-200/80 bg-white text-stone-900"
      }
    >
      {/* Mobile */}
      <div className={`mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:h-14 sm:px-6 lg:hidden ${iconToneClass}`}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={
              "-ml-1 inline-flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 transition sm:px-3 sm:py-2 " +
              (isHeroOverlay
                ? "bg-[#6f808d]/90 text-white backdrop-blur-[2px]"
                : "bg-[#788899] text-white hover:bg-[#6f7f8c]")
            }
            onClick={() => setMenuOpen(true)}
            aria-label={t("common.menu")}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] xs:inline">
              {t("common.menu")}
            </span>
          </button>
          <StoreLocatorLink overlay={isHeroOverlay} />
        </div>

        <BrandLogoLink overlay={isHeroOverlay} size="mobile" />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <CartIcon hoverClassName={iconHoverClass} />
          <LanguageSwitcher overlay={isHeroOverlay} reversed />
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden max-w-7xl px-6 lg:block">
        <div className="grid min-h-[92px] grid-cols-3 items-center">
          <div className={`flex items-center justify-self-start ${iconToneClass}`}>
            <StoreLocatorLink overlay={isHeroOverlay} />
          </div>

          <BrandLogoLink overlay={isHeroOverlay} size="desktop" />

          <div className={`flex items-center gap-4 justify-self-end lg:gap-5 ${iconToneClass}`}>
            <WishlistIcon hoverClassName={iconHoverClass} />
            <ProfileMenu overlay={isHeroOverlay} iconOnly />
            <CartIcon hoverClassName={iconHoverClass} />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("common.menu")}
              className={
                "inline-flex items-center gap-3 px-0 py-1 text-[13px] font-medium uppercase tracking-[0.2em] transition " +
                (isHeroOverlay
                  ? "text-white hover:text-white/75"
                  : "text-stone-950 hover:text-stone-500")
              }
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
              {t("common.menu")}
            </button>
            <LanguageSwitcher overlay={isHeroOverlay} reversed />
          </div>
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function HeaderIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 origin-center scale-x-[1.08]" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
      {children}
    </svg>
  );
}

function HeartIcon() {
  return (
    <HeaderIcon>
      <path
        d="M12 20.25s-7.25-4.35-9.25-8.9C1.45 8.4 3.15 5.25 6.3 5.25c1.8 0 3.15 1.05 3.95 2.15.8-1.1 2.15-2.15 3.95-2.15 3.15 0 4.85 3.15 3.55 6.1-2 4.55-9.25 8.9-9.25 8.9z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </HeaderIcon>
  );
}

function HandbagIcon() {
  return (
    <HeaderIcon>
      <path d="M8.75 9.25V7.75a3.25 3.25 0 0 1 6.5 0v1.5" strokeLinecap="round" />
      <path d="M6.75 9.25h10.5l1.15 11.5H5.6L6.75 9.25z" strokeLinejoin="round" />
      <path d="M6.25 13.75h11.5" strokeLinecap="round" />
    </HeaderIcon>
  );
}

function WishlistIcon({
  hoverClassName = "hover:bg-stone-100",
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
      className={`relative inline-flex h-9 w-9 items-center justify-center transition ${hoverClassName} ${count > 0 ? "text-[#C96A1A]" : ""}`}
    >
      <HeartIcon />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#C96A1A] px-1 text-[9px] font-semibold leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

function CartIcon({ hoverClassName = "hover:bg-stone-100" }: { hoverClassName?: string }) {
  const { count, openCart } = useCart();
  const t = useT();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={t("common.cart")}
      className={`relative inline-flex h-9 w-9 items-center justify-center transition ${hoverClassName} ${count > 0 ? "text-[#C96A1A]" : ""}`}
    >
      <HandbagIcon />
      {count > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C96A1A] px-1 text-[10px] font-semibold leading-none text-white"
        >
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
    <div className="inline-flex shrink-0 flex-row items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] sm:gap-1.5 sm:text-[11px]">
      {languageOptions.map((item) => (
        <Link
          key={item}
          href={switchLocalePath(pathname, item) + suffix}
          onClick={(e) => {
            const live = window.location.search + window.location.hash;
            e.preventDefault();
            router.push(switchLocalePath(pathname, item) + live);
            router.refresh();
          }}
          className={
            "rounded-full px-0.5 py-0.5 transition " +
            (item === locale
              ? overlay
                ? "text-white"
                : "text-stone-950"
              : overlay
                ? "text-white/60 hover:text-white/90"
                : "text-stone-400 hover:text-stone-700")
          }
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

function CatIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[26px] w-[26px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const bagCategoryIcons: Record<string, React.ReactNode> = {
  clutches: (
    <CatIcon>
      <rect x="3.5" y="8.5" width="17" height="8.4" rx="1.4" />
      <path d="M3.7 9.3 12 14l8.3-4.7" />
    </CatIcon>
  ),
  vanity: (
    <CatIcon>
      <rect x="4.6" y="9" width="14.8" height="9.6" rx="2.2" />
      <path d="M9 9a3 3 0 0 1 6 0" />
      <path d="M12 9v2.4" />
    </CatIcon>
  ),
  "bucket-bags-women": (
    <CatIcon>
      <path d="M7 9.6h10l-1.15 8.9H8.15z" />
      <path d="M8 9.6c0-3.4 8-3.4 8 0" />
    </CatIcon>
  ),
  "bowling-bags": (
    <CatIcon>
      <path d="M5 13.2c0-3.3 3.1-5.1 7-5.1s7 1.8 7 5.1v4.3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <path d="M9.2 8.5c.8-1.7 4.8-1.7 5.6 0" />
    </CatIcon>
  ),
  "handbags-women": (
    <CatIcon>
      <path d="M5.6 10.6h12.8v7.4a.7.7 0 0 1-.7.7H6.3a.7.7 0 0 1-.7-.7z" />
      <path d="M9 10.6a3 3 0 0 1 6 0" />
      <path d="M11.1 13.6h1.8v1.7h-1.8z" />
    </CatIcon>
  ),
  "rectangular-bags": (
    <CatIcon>
      <rect x="7" y="9.6" width="10" height="9.2" rx="0.9" />
      <path d="M9.5 9.6a2.5 2.5 0 0 1 5 0" />
    </CatIcon>
  ),
  "tote-bags-women": (
    <CatIcon>
      <path d="M6.5 9.6h11l-1 9.2h-9z" />
      <path d="M8.8 9.6c0-2.3 1-3.3 2-3.3s2 1 2 3.3" />
      <path d="M11.2 9.6c0-2.3 1-3.3 2-3.3s2 1 2 3.3" />
    </CatIcon>
  ),
  "shoulder-bags-women": (
    <CatIcon>
      <rect x="7.4" y="11" width="9.2" height="7.8" rx="1.2" />
      <path d="M9 11C9 6 15 6 15 11" />
    </CatIcon>
  ),
  "crossbody-bags-women": (
    <CatIcon>
      <rect x="5.8" y="10.6" width="12.4" height="8.2" rx="1.4" />
      <path d="M5.8 13.6h12.4" />
      <path d="M11.1 13.6h1.8v1.6h-1.8z" />
      <path d="M8 10.6 9.4 8h5.2L16 10.6" />
    </CatIcon>
  ),
};

const accessoryCategoryIcons: Record<string, React.ReactNode> = {
  "card-holders-women": (
    <CatIcon>
      <rect x="3.2" y="6.3" width="17.6" height="11.2" rx="0.6" />
      <path d="M4.8 8.6h14.4" />
      <path d="M5.2 11.3h6.8" />
    </CatIcon>
  ),
  "womens-wallets-women": (
    <CatIcon>
      <path d="M4.2 8.2h15.6v8.7a1.2 1.2 0 0 1-1.2 1.2H5.4a1.2 1.2 0 0 1-1.2-1.2z" />
      <path d="M5 8.7c2.6 2.2 11.4 2.2 14 0" />
      <path d="M15.7 12.9h3.2" />
    </CatIcon>
  ),
  "womens-scarves-women": (
    <CatIcon>
      <path d="M5.5 8.2c3.4 1.9 9.6 1.9 13 0" />
      <path d="M6.8 8.2 8.2 16.6 12 14.1 15.8 16.6 17.2 8.2" />
      <path d="M10.1 9.8 9.6 13.2" />
      <path d="M13.9 9.8 14.4 13.2" />
    </CatIcon>
  ),
  "bag-charms": (
    <CatIcon>
      <circle cx="12" cy="7.3" r="2.1" />
      <path d="M12 9.4v2.8" />
      <circle cx="12" cy="15.7" r="2.7" />
    </CatIcon>
  ),
};

function MobileMenu({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const suffix = useCurrentUrlSuffix();
  const [activeSection, setActiveSection] = useState<"new" | "bags" | "accessories" | "info" | null>(null);

  const sections: {
    id: "new" | "bags" | "accessories" | "info";
    label: string;
    links: { label: string; href: string; icon?: React.ReactNode }[];
  }[] = [
    {
      id: "new",
      label: t("nav.new"),
      links: [
        { label: t("nav.new"), href: withLocalePath("/new", locale) },
      ],
    },
    {
      id: "bags",
      label: t("nav.bags"),
      links: [
        { label: t("catalog.allBags"), href: withLocalePath("/bags", locale) },
        ...bagMenuCategories.map((c) => ({
          label: categoryName(c.slug, c.name, locale),
          href: withLocalePath(`/bags/${c.slug}`, locale),
          icon: bagCategoryIcons[c.slug],
        })),
      ],
    },
    {
      id: "accessories",
      label: t("nav.accessories"),
      links: [
        { label: t("catalog.allAccessories"), href: withLocalePath("/accessories", locale) },
        ...accessoryCategories
          .filter((c) => c.slug !== "vse-aksessuary")
          .map((c) => ({
            label: categoryName(c.slug, c.name, locale),
            href: withLocalePath(`/accessories/${c.slug}`, locale),
            icon: accessoryCategoryIcons[c.slug],
          })),
      ],
    },
    {
      id: "info",
      label: t("nav.info"),
      links: [
        { label: t("nav.about"), href: withLocalePath("/info/o-nas", locale) },
        { label: t("nav.stores"), href: withLocalePath("/info/nashi-magaziny", locale) },
        { label: t("nav.warranty"), href: withLocalePath("/info/garantiya", locale) },
        { label: t("nav.paymentDelivery"), href: withLocalePath("/info/oplata-i-dostavka", locale) },
        { label: t("nav.gifts"), href: withLocalePath("/info/podarochnye-sertifikaty", locale) },
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

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 hidden bg-black/35 backdrop-blur-md lg:block" onClick={onClose} />
      <div className="absolute inset-0 bg-white lg:left-auto lg:w-[42%] lg:min-w-[440px] lg:max-w-[560px] lg:rounded-l-[28px] lg:shadow-[-24px_0_80px_rgba(0,0,0,0.18)]">
      <div className="relative flex h-full flex-col overflow-y-auto">
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
                <li key={section.id} className="border-b border-stone-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActiveSection(open ? null : section.id)}
                    className={
                      "block w-full py-4 text-left text-[1.65rem] font-normal leading-snug tracking-[0.01em] text-stone-950 transition hover:opacity-60 sm:text-[1.8rem] lg:py-3.5 lg:text-[1.35rem]"
                    }
                  >
                    <span className="menu-hover-underline">{section.label}</span>
                  </button>
                  {open ? (
                    <ul className="pb-5 lg:pb-4">
                      {section.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={onClose}
                            className="flex items-center gap-3 py-2 text-[1.05rem] leading-snug text-stone-500 transition hover:text-stone-950 sm:text-[1.15rem] lg:py-1.5 lg:text-[0.95rem]"
                          >
                            {l.icon ? (
                              <span className="text-stone-700">{l.icon}</span>
                            ) : null}
                            <span className="menu-hover-underline">{l.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-stone-100 px-8 py-6 sm:px-10 lg:px-16">
          <div className="flex gap-3 text-[11px] font-medium uppercase tracking-[0.18em]">
            {locales.map((item) => (
              <Link
                key={item}
                href={switchLocalePath(pathname, item) + suffix}
                onClick={(e) => {
                  const live = window.location.search + window.location.hash;
                  e.preventDefault();
                  router.push(switchLocalePath(pathname, item) + live);
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