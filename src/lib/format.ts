import { defaultLocale, type Locale } from "@/lib/i18n";

const localeMap: Record<Locale, string> = {
  ru: "ru-RU",
  ro: "ro-RO",
  en: "en-US",
};

const currencyLabel: Record<Locale, string> = {
  ru: "MDL",
  ro: "MDL",
  en: "MDL",
};

export function formatPrice(value: number, locale: Locale = defaultLocale): string {
  return `${new Intl.NumberFormat(localeMap[locale]).format(value)} ${currencyLabel[locale]}`;
}

export function formatDate(value: string | Date, locale: Locale = defaultLocale): string {
  return new Date(value).toLocaleDateString(localeMap[locale]);
}

export function formatDateTime(value: string | Date, locale: Locale = defaultLocale): string {
  return new Date(value).toLocaleString(localeMap[locale], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}