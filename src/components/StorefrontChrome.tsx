"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import CartDrawer from "@/components/CartDrawer";
import VideoWidget from "@/components/VideoWidget";
import { isHeroOverlayPath } from "@/lib/catalog-banner";
import { stripLocaleFromPathname } from "@/lib/i18n";
import { MenuOpenProvider } from "@/context/menu-open";

/**
 * Прячет витринный «обвес» (анонс-бар, шапку, подвал) в разделе /admin,
 * чтобы админ-панель занимала весь экран без магазинной навигации.
 * Сами header/footer рендерятся на сервере и передаются пропсами.
 */
export default function StorefrontChrome({
  announcementBar,
  header,
  footer,
  children,
}: {
  announcementBar: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const path = stripLocaleFromPathname(pathname || "/");
  const isAdmin = path.startsWith("/admin");
  const isHome = path === "/";
  const isHeroOverlay = isHeroOverlayPath(pathname);

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <MenuOpenProvider>
      {header}
      <main className={"flex-1 " + (isHeroOverlay ? "relative" : "")}>{children}</main>
      {footer}
      <CartDrawer />
      {isHome ? <VideoWidget /> : null}
    </MenuOpenProvider>
  );
}