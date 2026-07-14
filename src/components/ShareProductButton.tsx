"use client";

import { useState } from "react";
import { useT } from "@/lib/useI18n";

export default function ShareProductButton({
  title,
  url,
}: {
  title: string;
  /** Absolute or relative URL. Defaults to the current page. */
  url?: string;
}) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  async function handle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const shareUrl =
      url && /^https?:\/\//i.test(url)
        ? url
        : url
          ? new URL(url, window.location.origin).toString()
          : window.location.href;

    const shareData: ShareData = {
      title,
      text: title,
      url: shareUrl,
    };

    try {
      if (
        typeof navigator.share === "function" &&
        (!navigator.canShare || navigator.canShare(shareData))
      ) {
        await navigator.share(shareData);
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore — some browsers block clipboard without a secure context.
    }
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={copied ? t("common.linkCopied") : t("common.share")}
      title={copied ? t("common.linkCopied") : t("common.share")}
      className={
        "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-[#E8E2DD] bg-[#FFFBF9] text-[#111] outline-none transition hover:bg-white focus:outline-none focus-visible:outline-none md:h-12 md:w-12 " +
        (copied ? "border-[#111]/25" : "")
      }
    >
      {copied ? <CheckIcon /> : <ShareIcon />}
      <span className="sr-only" aria-live="polite">
        {copied ? t("common.linkCopied") : ""}
      </span>
    </button>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="18" cy="5" r="2.25" />
      <circle cx="6" cy="12" r="2.25" />
      <circle cx="18" cy="19" r="2.25" />
      <path d="M8.1 13.1 15.9 17" />
      <path d="m15.9 7-7.8 3.9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
