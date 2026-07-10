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
        "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 md:h-9 md:w-9 md:min-h-0 md:min-w-0 " +
        (active ? "text-[#C96A1A]" : "text-stone-700")
      }
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function HeartIcon({
  filled,
  exact = false,
  size = 18,
}: {
  filled: boolean;
  exact?: boolean;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={exact ? undefined : "origin-center scale-x-[1.08]"}
      style={{ width: size, height: size }}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M12 20.25s-7.25-4.35-9.25-8.9C1.45 8.4 3.15 5.25 6.3 5.25c1.8 0 3.15 1.05 3.95 2.15.8-1.1 2.15-2.15 3.95-2.15 3.15 0 4.85 3.15 3.55 6.1-2 4.55-9.25 8.9-9.25 8.9z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}