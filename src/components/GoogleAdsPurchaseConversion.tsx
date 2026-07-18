"use client";

import { useEffect } from "react";

const SEND_TO = "AW-18331915961/_gBICKjcvtIcELmtq6VE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires the Google Ads "Purchase" conversion once per order on the
 * confirmation page. Dedupes refreshes via sessionStorage.
 */
export default function GoogleAdsPurchaseConversion({
  transactionId,
  value,
}: {
  transactionId?: string;
  value?: number;
}) {
  useEffect(() => {
    if (!transactionId) return;

    const dedupeKey = `gads_purchase_${transactionId}`;
    try {
      if (sessionStorage.getItem(dedupeKey)) return;
    } catch {
      // ignore storage failures
    }

    const fire = () => {
      if (typeof window.gtag !== "function") return false;
      window.gtag("event", "conversion", {
        send_to: SEND_TO,
        value: Number.isFinite(value) && (value as number) > 0 ? value : 1.0,
        currency: "MDL",
        transaction_id: transactionId,
      });
      try {
        sessionStorage.setItem(dedupeKey, "1");
      } catch {
        // ignore
      }
      return true;
    };

    if (fire()) return;

    // gtag may still be loading from <head>
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (fire() || Date.now() - started > 8000) {
        window.clearInterval(timer);
      }
    }, 200);

    return () => window.clearInterval(timer);
  }, [transactionId, value]);

  return null;
}
