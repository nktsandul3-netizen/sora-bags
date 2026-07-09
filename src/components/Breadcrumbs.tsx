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
    <nav className="flex h-12 flex-wrap items-center text-[12px] font-normal text-[#111]">
      <Link
        href={withLocalePath("/", locale)}
        className="opacity-45 transition hover:opacity-80"
      >
        {locale === "ru" ? "Главная" : locale === "ro" ? "Acasă" : "Home"}
      </Link>
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center">
          <span className="mx-2 opacity-25" aria-hidden>
            /
          </span>
          {it.href ? (
            <Link
              href={withLocalePath(it.href, locale)}
              className="opacity-45 transition hover:opacity-80"
            >
              {it.label}
            </Link>
          ) : (
            <span className="opacity-45">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
