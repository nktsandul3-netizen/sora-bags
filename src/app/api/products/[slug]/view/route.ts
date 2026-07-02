import { incrementProductViewCount } from "@/lib/admin/products";
import { analyticsEventsCollection } from "@/lib/mongodb";
import {
  analyticsSessionCookieName,
  clientIpFromRequest,
  createAnalyticsSessionId,
  readAnalyticsSessionId,
  sessionUserId,
  trackAnalyticsEvent,
} from "@/lib/analytics";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const sessionId = readAnalyticsSessionId(request) ?? createAnalyticsSessionId();
    const userId = await sessionUserId();
    const since = new Date(Date.now() - 30 * 60 * 1000);
    const events = await analyticsEventsCollection();
    const recent = await events.findOne({
      type: "product_view",
      productSlug: slug,
      sessionId,
      createdAt: { $gte: since },
    });
    if (!recent) {
      await Promise.all([
        incrementProductViewCount(slug),
        trackAnalyticsEvent({
          type: "product_view",
          productSlug: slug,
          sessionId,
          userId,
          ip: clientIpFromRequest(request),
          userAgent: request.headers.get("user-agent") ?? undefined,
          referrer: request.headers.get("referer") ?? undefined,
          path: request.headers.get("referer") ?? undefined,
        }),
      ]);
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(analyticsSessionCookieName(), sessionId, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  } catch {
    return Response.json({ ok: false });
  }
}