import { z } from "zod";
import { isLocale, localeFromRequest } from "@/lib/i18n";
import { translate } from "@/lib/messages";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";
import { searchProducts } from "@/lib/search";

const querySchema = z.object({
  q: z.string().trim().min(1).max(80),
  locale: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(20).default(8),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    q: url.searchParams.get("q") ?? "",
    locale: url.searchParams.get("locale") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });
  const fallbackLocale = localeFromRequest(request);

  if (!parsed.success) {
    return Response.json(
      { error: translate(fallbackLocale, "api.errBadRequest") },
      { status: 400 },
    );
  }

  const locale = isLocale(parsed.data.locale)
    ? parsed.data.locale
    : fallbackLocale;
  const limiter = rateLimit(
    `search:${clientIpFromHeaders(request.headers)}`,
    { limit: 60, windowMs: 60_000 },
  );

  if (!limiter.ok) {
    return Response.json(
      { error: translate(locale, "api.errTooMany") },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(limiter.retryAfterMs / 1000)),
        },
      },
    );
  }

  return Response.json({
    results: searchProducts(parsed.data.q, locale, parsed.data.limit),
  });
}
