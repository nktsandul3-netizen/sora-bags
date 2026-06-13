/**
 * Простой in-memory rate limiter (скользящее окно по ключу).
 *
 * Подходит для одного инстанса (dev / небольшой self-hosted прод).
 * Для горизонтально масштабируемого деплоя (несколько serverless-инстансов)
 * замените хранилище на Redis/Upstash — интерфейс совместим.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterMs: 0 };
  }

  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterMs: 0 };
}

/** Достаёт IP клиента из заголовков запроса (за прокси/CDN). */
export function clientIpFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}