"use client";

import Link from "next/link";
import { withLocalePath } from "@/lib/i18n";
import { useLocale } from "@/lib/useI18n";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const locale = useLocale();
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-stone-400">
      <Link href={withLocalePath("/", locale)} className="hover:text-stone-700">
        {locale === "ru" ? "Главная" : locale === "ro" ? "Acasă" : "Home"}
      </Link>
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5">
          <span>/</span>
          {it.href ? (
            <Link href={withLocalePath(it.href, locale)} className="hover:text-stone-700">
              {it.label}
            </Link>
          ) : (
            <span className="text-stone-600">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}