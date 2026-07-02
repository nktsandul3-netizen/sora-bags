import { createHash } from "node:crypto";
import { auth } from "@/auth";
import {
  analyticsEventsCollection,
  ObjectId,
  type AnalyticsEventDoc,
  type AnalyticsEventType,
} from "@/lib/mongodb";

const SESSION_COOKIE = "sora_analytics_session";

export interface TrackAnalyticsEventInput {
  type: AnalyticsEventType;
  productSlug?: string;
  productTitle?: string;
  sessionId?: string;
  userId?: string | null;
  orderId?: string;
  orderNumber?: string;
  amount?: number;
  quantity?: number;
  city?: string;
  country?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  path?: string;
}

export function analyticsSessionCookieName() {
  return SESSION_COOKIE;
}

export function createAnalyticsSessionId() {
  return `sa_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

export function readAnalyticsSessionId(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${SESSION_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function clientIpFromRequest(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

function hashIp(ip?: string) {
  if (!ip) return undefined;
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

export function trafficSourceFrom(input: {
  referrer?: string;
  utmSource?: string;
  path?: string;
}) {
  if (input.utmSource) return input.utmSource.toLowerCase();
  const path = input.path ?? "";
  try {
    const url = new URL(path, "https://sorabags.md");
    const utm = url.searchParams.get("utm_source");
    if (utm) return utm.toLowerCase();
  } catch {
    // ignore
  }
  const referrer = input.referrer?.toLowerCase() ?? "";
  if (!referrer) return "direct";
  if (referrer.includes("instagram")) return "instagram";
  if (referrer.includes("tiktok")) return "tiktok";
  if (referrer.includes("google")) return "google";
  if (referrer.includes("facebook")) return "facebook";
  if (referrer.includes("telegram") || referrer.includes("t.me")) return "telegram";
  if (referrer.includes("sorabags.md")) return "internal";
  return "referral";
}

function utmFromPath(path?: string) {
  try {
    const url = new URL(path ?? "", "https://sorabags.md");
    return {
      utmSource: url.searchParams.get("utm_source") ?? undefined,
      utmMedium: url.searchParams.get("utm_medium") ?? undefined,
      utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
    };
  } catch {
    return {};
  }
}

export async function trackAnalyticsEvent(input: TrackAnalyticsEventInput): Promise<void> {
  try {
    const events = await analyticsEventsCollection();
    const createdAt = new Date();
    const utm = utmFromPath(input.path);
    const source = input.source ?? trafficSourceFrom({
      referrer: input.referrer,
      utmSource: input.utmSource ?? utm.utmSource,
      path: input.path,
    });
    const doc: AnalyticsEventDoc = {
      type: input.type,
      productSlug: input.productSlug,
      productTitle: input.productTitle,
      userId: input.userId && ObjectId.isValid(input.userId) ? new ObjectId(input.userId) : null,
      sessionId: input.sessionId || "unknown",
      orderId: input.orderId && ObjectId.isValid(input.orderId) ? new ObjectId(input.orderId) : undefined,
      orderNumber: input.orderNumber,
      amount: input.amount,
      quantity: input.quantity,
      city: input.city,
      country: input.country,
      source,
      utmSource: input.utmSource ?? utm.utmSource,
      utmMedium: input.utmMedium ?? utm.utmMedium,
      utmCampaign: input.utmCampaign ?? utm.utmCampaign,
      ipHash: hashIp(input.ip),
      userAgent: input.userAgent?.slice(0, 500),
      referrer: input.referrer?.slice(0, 500),
      path: input.path?.slice(0, 500),
      createdAt,
    };
    await events.insertOne(doc);
  } catch (err) {
    console.warn("[analytics] event skipped:", err);
  }
}

export async function sessionUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}
