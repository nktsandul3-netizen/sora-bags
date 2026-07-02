"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_STORAGE_KEY = "sora-analytics-session";

function getClientSessionId() {
  let id = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id = `sa_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
    window.localStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  document.cookie = `sora_analytics_session=${encodeURIComponent(id)}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  return id;
}

export function sendAnalyticsEvent(payload: {
  type: "visit" | "wishlist_add" | "cart_add" | "checkout_start";
  productSlug?: string;
  productTitle?: string;
  quantity?: number;
  path?: string;
}) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({
    sessionId: getClientSessionId(),
    path: window.location.pathname + window.location.search,
    ...payload,
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/event", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    sendAnalyticsEvent({ type: "visit", path: window.location.pathname + window.location.search });
  }, [pathname]);

  return null;
}
