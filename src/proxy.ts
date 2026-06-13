import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  // Страница входа и эндпоинты Auth.js доступны без сессии.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));
  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};