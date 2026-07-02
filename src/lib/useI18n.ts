"use client";

import { usePathname } from "next/navigation";
import { localeFromPathname, type Locale } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}

export function useT() {
  const locale = useLocale();
  return (key: TranslationKey) => translate(locale, key);
}
