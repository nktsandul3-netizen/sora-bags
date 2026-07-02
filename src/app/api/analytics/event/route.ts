import { NextResponse } from "next/server";
import { z } from "zod";
import {
  analyticsSessionCookieName,
  clientIpFromRequest,
  createAnalyticsSessionId,
  readAnalyticsSessionId,
  sessionUserId,
  trackAnalyticsEvent,
} from "@/lib/analytics";

const eventSchema = z.object({
  type: z.enum(["visit", "wishlist_add", "cart_add", "checkout_start"]),
  productSlug: z.string().trim().optional(),
  productTitle: z.string().trim().optional(),
  sessionId: z.string().trim().optional(),
  quantity: z.coerce.number().int().positive().optional(),
  path: z.string().trim().optional(),
});

export async function POST(request: Request) {
  let payload: z.infer<typeof eventSchema>;
  try {
    payload = eventSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sessionId = payload.sessionId ?? readAnalyticsSessionId(request) ?? createAnalyticsSessionId();
  const userId = await sessionUserId();
  await trackAnalyticsEvent({
    ...payload,
    sessionId,
    userId,
    ip: clientIpFromRequest(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
    referrer: request.headers.get("referer") ?? undefined,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(analyticsSessionCookieName(), sessionId, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
