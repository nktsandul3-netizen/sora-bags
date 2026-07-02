export const locales = ["ro", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ro";

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function localeFromPathname(pathname: string | null | undefined): Locale {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) {
    const stripped = `/${parts.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

export function pathWithoutLocale(pathname: string | null | undefined): string {
  return stripLocaleFromPathname(pathname || "/");
}

export function withLocalePath(pathname: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:|#)/.test(pathname)) return pathname;
  const clean = stripLocaleFromPathname(pathname.startsWith("/") ? pathname : `/${pathname}`);
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export function switchLocalePath(pathname: string | null | undefined, locale: Locale): string {
  return withLocalePath(pathWithoutLocale(pathname), locale);
}

export function localeFromCookieHeader(cookieHeader: string | null | undefined): Locale {
  const match = (cookieHeader ?? "").match(/(?:^|; )sora_locale=([^;]+)/);
  const value = match ? decodeURIComponent(match[1]) : undefined;
  return isLocale(value) ? value : defaultLocale;
}

export function localeFromRequest(request: Request): Locale {
  return localeFromCookieHeader(request.headers.get("cookie"));
}

export type LocalizedString = string | Partial<Record<Locale, string>>;

export function getLocalizedText(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value[defaultLocale] ?? value.en ?? value.ro ?? "";
}
