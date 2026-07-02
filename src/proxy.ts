import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Оптимистичная защита раздела /admin.
 *
 * Внимание: это лишь первый, «дешёвый» рубеж — proxy выполняется вне основного
 * рантайма приложения и не должен считаться единственной защитой (см. доки Next 16).
 * Авторитетная проверка роли admin делается в src/lib/admin/guard.ts (requireAdmin),
 * который вызывается в layout админки и в каждом server action.
 *
 * Здесь мы лишь проверяем наличие cookie сессии Auth.js и редиректим гостей
 * на /admin/login, не дёргая БД.
 */
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const requestedLocale = segments[0];
  const hasLocale = isLocale(requestedLocale);
  const cookieLocale = request.cookies.get("sora_locale")?.value;
  const fallbackLocale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const locale = hasLocale ? requestedLocale : fallbackLocale;
  const internalPathname = hasLocale
    ? `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/"
    : pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Любой непрефиксованный путь (в т.ч. внутренний redirect из server action,
  // signIn/signOut, NextAuth pages) переотправляем на текущую локаль из cookie
  // sora_locale. ro используется только когда локаль ещё не известна.
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${fallbackLocale}` : `/${fallbackLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Страница входа и эндпоинты Auth.js доступны без сессии.
  if (internalPathname === "/admin/login") {
    const res = rewriteWithLocale(request, internalPathname, locale);
    res.cookies.set("sora_locale", locale, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  if (internalPathname.startsWith("/admin")) {
    const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));
    if (!hasSession) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const res = rewriteWithLocale(request, internalPathname, locale);
  res.cookies.set("sora_locale", locale, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/ru/:path*",
    "/ro/:path*",
    "/en/:path*",
  ],
};

function rewriteWithLocale(request: NextRequest, pathname: string, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const headers = new Headers(request.headers);
  headers.set("x-sora-locale", locale);
  return NextResponse.rewrite(url, { request: { headers } });
}