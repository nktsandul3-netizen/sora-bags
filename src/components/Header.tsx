"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { brand } from "@/lib/config";
import { bagMenuCategories, accessoryCategories } from "@/lib/data";
import { navInfoPages } from "@/lib/info";
import { accountTabHref } from "@/lib/account-tabs";
import { useCart } from "@/context/cart";
import { useWishlist } from "@/context/wishlist";
import SearchOverlay from "./SearchOverlay";
import ProfileMenu from "./ProfileMenu";
import { useSession } from "next-auth/react";
import { isHeroOverlayPath } from "@/lib/catalog-banner";

const navHoverLine =
  "relative inline-flex flex-col items-center pb-1.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100";
const navLinkClass =
  navHoverLine +
  " gap-1 py-1 text-[14px] font-medium uppercase tracking-[0.16em] text-stone-800 after:bg-stone-900 transition hover:text-stone-950";
const overlayTextShadow =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)]";
const overlayNavLinkClass =
  navHoverLine +
  " gap-1 py-1 text-[16px] font-semibold uppercase tracking-[0.15em] text-white after:bg-white transition hover:text-white/90 " +
  overlayTextShadow;
const overlayLogoClass =
  "text-white " + overlayTextShadow + " drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]";
const overlayIconClass =
  "text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.85))_drop-shadow(0_2px_8px_rgba(0,0,0,0.5))]";

function BrandLogoLink({
  overlay,
  size,
}: {
  overlay: boolean;
  size: "mobile" | "desktop";
}) {
  const nameClass =
    size === "desktop"
      ? "font-serif text-[3.4rem] font-semibold uppercase leading-none tracking-[0.36em] xl:text-[3.95rem]"
      : "font-serif text-[2.5rem] font-semibold uppercase leading-none tracking-[0.32em]";

  const originClass =
    "mt-2 inline-flex -translate-x-2.5 items-center gap-2.5 text-[9px] font-medium uppercase tracking-[0.38em] sm:-translate-x-3 sm:text-[10px] xl:mt-2.5 xl:-translate-x-4 xl:text-[11px] xl:tracking-[0.44em]";

  return (
    <Link
      href="/"
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

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const closeMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHeroOverlay = isHeroOverlayPath(pathname);
  const isNewSection = pathname === "/new";
  const linkClass = isHeroOverlay ? overlayNavLinkClass : navLinkClass;
  const iconHoverClass = isHeroOverlay ? "hover:bg-white/10" : "hover:bg-stone-100";
  const iconToneClass = isHeroOverlay ? overlayIconClass : "text-stone-800";

  function openMenu(section: string) {
    if (closeMenuTimeout.current) {
      clearTimeout(closeMenuTimeout.current);
      closeMenuTimeout.current = null;
    }
    setOpenSection(section);
  }

  function closeMenu() {
    closeMenuTimeout.current = setTimeout(() => setOpenSection(null), 160);
  }

  return (
    <header
      className={
        isHeroOverlay
          ? "absolute left-0 right-0 top-0 z-50 bg-gradient-to-b from-black/60 via-black/35 to-black/0 pb-2 text-white"
          : "relative z-50 border-b border-stone-200/80 bg-white text-stone-900"
      }
    >
      {/* Mobile */}
      <div className={`mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:hidden ${iconToneClass}`}>
        <button
          className={`-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full ${iconHoverClass}`}
          onClick={() => setMobileOpen(true)}
          aria-label="Меню"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>

        <BrandLogoLink overlay={isHeroOverlay} size="mobile" />

        <div className="flex translate-x-2 items-center gap-0.5 sm:translate-x-5 sm:-mr-3">
          <IconButton label="Поиск" onClick={() => setSearchOpen(true)} hoverClassName={iconHoverClass}>
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
          </IconButton>
          <CartIcon overlay={isHeroOverlay} hoverClassName={iconHoverClass} />
        </div>
      </div>

      {/* Desktop — Lancaster two-row layout */}
      <div className="relative mx-auto hidden max-w-7xl px-6 lg:block">
        <div className="grid min-h-[104px] grid-cols-3 items-center">
          <div className={`flex items-center justify-self-start ${iconToneClass}`}>
            <IconButton label="Поиск" onClick={() => setSearchOpen(true)} hoverClassName={iconHoverClass}>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" strokeLinecap="round" />
              </svg>
            </IconButton>
          </div>

          <BrandLogoLink overlay={isHeroOverlay} size="desktop" />

          <div className={`flex translate-x-3 items-center gap-4 justify-self-end sm:translate-x-5 lg:-mr-3 lg:translate-x-6 xl:translate-x-7 ${iconToneClass}`}>
            <WishlistIcon hoverClassName={iconHoverClass} />
            <ProfileMenu overlay={isHeroOverlay} iconOnly />
            <CartIcon overlay={isHeroOverlay} hoverClassName={iconHoverClass} />
          </div>
        </div>

        <nav className="flex min-h-[58px] items-center justify-center gap-10 pb-4 pt-3 xl:gap-12">
          <Link
            href="/new"
            className={linkClass + (isNewSection ? " after:scale-x-100" : "")}
          >
            Новинки
          </Link>

          <MegaMenu
            label="Сумки"
            href="/bags"
            open={openSection === "bags"}
            onOpen={() => openMenu("bags")}
            onClose={closeMenu}
            links={bagMenuCategories.map((c) => ({ label: c.name, href: `/bags/${c.slug}` }))}
            title="Виды сумок"
            linkClassName={linkClass}
            overlay={isHeroOverlay}
            wide
          />

          <MegaMenu
            label="Аксессуары"
            href="/accessories"
            open={openSection === "acc"}
            onOpen={() => openMenu("acc")}
            onClose={closeMenu}
            links={accessoryCategories.map((c) => ({ label: c.name, href: `/accessories/${c.slug}` }))}
            title="Виды аксессуаров"
            columns={3}
            linkClassName={linkClass}
            overlay={isHeroOverlay}
            wide
          />

          <MegaMenu
            label="Покупателям"
            open={openSection === "info"}
            onOpen={() => openMenu("info")}
            onClose={closeMenu}
            links={[
              ...navInfoPages.map((p) => ({ label: p.title, href: `/info/${p.slug}` })),
              { label: "Контакты", href: "/contacts" },
            ]}
            title="Информация"
            columns={3}
            linkClassName={linkClass}
            overlay={isHeroOverlay}
            wide
          />
        </nav>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function IconButton({
  label,
  onClick,
  children,
  hoverClassName = "hover:bg-stone-100",
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  hoverClassName?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-14 w-14 items-center justify-center rounded-full transition ${hoverClassName}`}
    >
      {children}
    </button>
  );
}

function HeaderIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 origin-center scale-x-[1.12]" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      {children}
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <HeaderIcon>
      <path d="M8 3.75h8v17.5l-4-3.25L8 21.25V3.75z" strokeLinejoin="round" />
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
  return (
    <Link
      href="/wishlist"
      aria-label="Избранное"
      className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full transition ${hoverClassName}`}
    >
      <BookmarkIcon />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#c4a574] px-1 text-[9px] font-semibold leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

function CartIcon({
  overlay = false,
  hoverClassName = "hover:bg-stone-100",
}: {
  overlay?: boolean;
  hoverClassName?: string;
}) {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Корзина"
      className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full transition ${hoverClassName}`}
    >
      <HandbagIcon />
      {count > 0 && (
        <span
          className={`absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none ${overlay ? "bg-[#c4a574] text-white" : "bg-[#c4a574] text-white"}`}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

function MegaMenu({
  label,
  href,
  title,
  links,
  open,
  onOpen,
  onClose,
  linkClassName = navLinkClass,
  overlay = false,
  wide = false,
  columns = 4,
}: {
  label: string;
  href?: string;
  title: string;
  links: { label: string; href: string }[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  linkClassName?: string;
  overlay?: boolean;
  wide?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 2
      ? "grid grid-cols-2 gap-x-10 gap-y-3.5"
      : columns === 3
        ? "grid grid-cols-2 gap-x-10 gap-y-3.5 sm:grid-cols-3"
        : "grid grid-cols-2 gap-x-10 gap-y-3.5 sm:grid-cols-3 lg:grid-cols-4";
  const pathname = usePathname();
  const isCurrentSection = href
    ? pathname === href || pathname.startsWith(`${href}/`)
    : false;
  const showMenu = href ? open && !isCurrentSection : open;

  return (
    <div
      className={
        (wide ? "static" : "static lg:relative") +
        " flex h-full items-center"
      }
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {href ? (
        <Link
          href={href}
          className={linkClassName + (open || isCurrentSection ? " after:scale-x-100" : "")}
          onClick={onClose}
        >
          {label}
        </Link>
      ) : (
        <button
          className={linkClassName + (open || isCurrentSection ? " after:scale-x-100" : "")}
          type="button"
        >
          {label}
        </button>
      )}

      {showMenu && wide ? (
        <div className="absolute left-0 right-0 top-full z-50">
          <div className="h-3" aria-hidden />
          <div
            className={
              overlay
                ? "bg-black/18 backdrop-blur-[2px]"
                : "border-t border-stone-100 bg-white shadow-lg shadow-stone-900/5"
            }
          >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
              <p className={`mb-5 text-base font-semibold ${overlay ? "text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.65)]" : "text-stone-950"}`}>{title}</p>
              <ul className={gridClass}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        overlay
                          ? "text-[13px] font-semibold uppercase tracking-[0.08em] text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.65)] transition hover:text-white/80"
                          : "text-[13px] font-medium uppercase tracking-[0.06em] text-stone-600 transition hover:text-stone-950"
                      }
                      onClick={onClose}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : showMenu ? (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
          <div className="w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-900/5">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              {title}
            </p>
            <ul className="grid gap-0.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-lg px-2 py-1.5 text-sm text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { status } = useSession();
  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Каталог",
      links: [
        { label: "Новинки", href: "/new" },
        { label: "Все сумки", href: "/bags" },
        { label: "Все аксессуары", href: "/accessories" },
        { label: "Избранное", href: "/wishlist" },
      ],
    },
    { title: "Сумки", links: bagMenuCategories.map((c) => ({ label: c.name, href: `/bags/${c.slug}` })) },
    { title: "Аксессуары", links: accessoryCategories.map((c) => ({ label: c.name, href: `/accessories/${c.slug}` })) },
    {
      title: "Покупателям",
      links: [
        ...navInfoPages.map((p) => ({ label: p.title, href: `/info/${p.slug}` })),
        { label: "Контакты", href: "/contacts" },
      ],
    },
  ];

  if (status === "authenticated") {
    groups.unshift({
      title: "Мой профиль",
      links: [
        { label: "Консоль", href: accountTabHref("console") },
        { label: "Мои покупки", href: accountTabHref("orders") },
        { label: "Wishlist", href: accountTabHref("wishlist") },
        { label: "Мои адреса", href: accountTabHref("addresses") },
        { label: "Анкета", href: accountTabHref("profile") },
      ],
    });
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-stone-900/40" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-serif text-2xl font-bold uppercase tracking-[0.18em]">
            {brand.name}
          </span>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                {g.title}
              </p>
              <ul className="grid gap-0.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="block rounded-lg px-2 py-1.5 text-[15px] text-stone-700 hover:bg-stone-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}