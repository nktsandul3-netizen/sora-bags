"use client";

import { useWishlist } from "@/context/wishlist";

export default function WishlistButton({
  slug,
  variant = "icon",
}: {
  slug: string;
  variant?: "icon" | "full" | "compact" | "square";
}) {
  const { has, toggle } = useWishlist();
  const active = has(slug);

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handle}
        aria-label={active ? "Убрать из избранного" : "В избранное"}
        className={
          "inline-flex items-center justify-center transition " +
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
        aria-label={active ? "Убрать из избранного" : "В избранное"}
        className={
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border bg-white transition " +
          (active
            ? "border-[#C96A1A] text-[#C96A1A]"
            : "border-stone-200 text-stone-950 hover:border-stone-400")
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
        className={
          "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition sm:w-auto " +
          (active
            ? "border-[#C96A1A] text-[#C96A1A]"
            : "border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-950")
        }
      >
        <HeartIcon filled={active} />
        {active ? "В избранном" : "В избранное"}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-label={active ? "Убрать из избранного" : "В избранное"}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 " +
        (active ? "text-[#C96A1A]" : "text-stone-700")
      }
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] origin-center scale-x-[1.08]"
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