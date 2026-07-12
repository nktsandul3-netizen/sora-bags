"use client";

import { useWishlist } from "@/context/wishlist";
import { useT } from "@/lib/useI18n";

export default function WishlistButton({
  slug,
  variant = "icon",
}: {
  slug: string;
  variant?: "icon" | "full" | "compact" | "square" | "ring" | "card" | "pdp";
}) {
  const { has, toggle } = useWishlist();
  const t = useT();
  const active = has(slug);
  const ariaLabel = active ? t("common.removeFromWishlist") : t("common.toWishlist");

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  }

  if (variant === "pdp") {
    return (
      <button
        onClick={handle}
        aria-label={ariaLabel}
        className={
          "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-[#E8E2DD] bg-[#FFFBF9] outline-none transition hover:bg-white focus:outline-none focus-visible:outline-none md:h-12 md:w-12 " +
          (active ? "text-[#C96A1A]" : "text-[#111]")
        }
      >
        <HeartIcon filled={active} size={20} exact />
      </button>
    );
  }

  if (variant === "card") {
    return (
      <button
        onClick={handle}
        aria-label={ariaLabel}
        className={
          "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center transition " +
          (active ? "text-[#C96A1A]" : "text-stone-700 hover:text-stone-950")
        }
      >
        <HeartIcon filled={active} exact />
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handle}
        aria-label={ariaLabel}
        className={
          "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center transition " +
          (active ? "text-[#C96A1A]" : "text-stone-400 hover:text-stone-700")
        }
      >
        <HeartIcon filled={active} />
      </button>
    );
  }

  if (variant === "square") {
    return (
      <button
        onClick={handle}
        aria-label={ariaLabel}
        className={
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-white transition " +
          (active
            ? "border-[#C96A1A] text-[#C96A1A]"
            : "border-[#EDE6E0] text-[#111] hover:bg-[#FBF8F6]")
        }
      >
        <HeartIcon filled={active} />
      </button>
    );
  }

  if (variant === "ring") {
    return (
      <button
        onClick={handle}
        aria-label={ariaLabel}
        className={
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E5E0DC] bg-transparent transition " +
          (active ? "text-[#C96A1A]" : "text-[#1A1A1A] hover:border-[#1A1A1A]")
        }
      >
        <HeartIcon filled={active} />
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        onClick={handle}
        aria-label={ariaLabel}
        className={
          "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition sm:w-auto " +
          (active
            ? "border-[#C96A1A] text-[#C96A1A]"
            : "border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-950")
        }
      >
        <HeartIcon filled={active} />
        {active ? t("common.inWishlist") : t("common.toWishlist")}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-label={ariaLabel}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white " +
        "shadow-[0_2px_10px_rgba(28,25,23,0.12)] transition-all duration-200 " +
        "hover:scale-105 hover:shadow-[0_4px_14px_rgba(28,25,23,0.16)] active:scale-95 " +
        (active ? "text-[#C96A1A]" : "text-[#111]")
      }
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function HeartIcon({
  filled,
  size = 18,
}: {
  filled: boolean;
  exact?: boolean;
  size?: number;
}) {
  // Same path as Header wishlist icon
  return (
    <svg
      viewBox="0 0 20 20"
      style={{ width: size, height: size }}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 17.2 L3.8 11.1 C2.6 9.9 2 8.7 2 7.3 C2 5.4 3.5 4 5.4 4 C6.6 4 7.5 4.5 8.3 5.6 L10 7.8 L11.7 5.6 C12.5 4.5 13.4 4 14.6 4 C16.5 4 18 5.4 18 7.3 C18 8.7 17.4 9.9 16.2 11.1 L10 17.2Z" />
    </svg>
  );
}