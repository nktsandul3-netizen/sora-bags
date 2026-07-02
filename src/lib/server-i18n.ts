import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

export async function getServerLocale(): Promise<Locale> {
  const value = (await headers()).get("x-sora-locale");
  return isLocale(value ?? undefined) ? value as Locale : defaultLocale;
}

export async function getServerT() {
  const locale = await getServerLocale();
  return (key: TranslationKey) => translate(locale, key);
}
