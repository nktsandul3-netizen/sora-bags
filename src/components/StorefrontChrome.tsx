"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import CartDrawer from "@/components/CartDrawer";
import ProtectImages from "@/components/ProtectImages";
import { stripLocaleFromPathname } from "@/lib/i18n";
import { MenuOpenProvider } from "@/context/menu-open";

const VideoWidget = dynamic(() => import("@/components/VideoWidget"), {
  ssr: false,
});

/**
 * Прячет витринный «обвес» (шапку, подвал) в разделе /admin,
 * чтобы админ-панель занимала весь экран без магазинной навигации.
 * Сами header/footer рендерятся на сервере и передаются пропсами.
 */
export default function StorefrontChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const path = stripLocaleFromPathname(pathname || "/");
  const isAdmin = path.startsWith("/admin");
  const isPrintCatalog = path === "/catalog/print";
  const isProduct = path.startsWith("/product/");

  if (isAdmin || isPrintCatalog) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <MenuOpenProvider>
      <ProtectImages />
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      <CartDrawer />
      {isProduct ? <VideoWidget /> : null}
    </MenuOpenProvider>
  );
}
