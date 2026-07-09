"use client";

import { useLocaleContext } from "@/context/locale";
import type { Locale } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

export function useLocale(): Locale {
  return useLocaleContext();
}

export function useT() {
  const locale = useLocale();
  return (key: TranslationKey) => translate(locale, key);
}
