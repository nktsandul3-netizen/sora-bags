"use client";

import { useWishlist } from "@/context/wishlist";

export default function WishlistButton({
  slug,
  variant = "icon",
}: {
  slug: string;
  variant?: "icon" | "full";
}) {
  const { has, toggle } = useWishlist();
  const active = has(slug);

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  }

  if (variant === "full") {
    return (
      <button
        onClick={handle}
        className={
          "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition sm:w-auto " +
          (active
            ? "border-[--c-accent] text-[--c-accent]"
            : "border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-950")
        }
      >
        <BookmarkIcon filled={active} />
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
        (active ? "text-[--c-accent]" : "text-stone-700")
      }
    >
      <BookmarkIcon filled={active} />
    </button>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] origin-center scale-x-[1.08]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M8 3.75h8v17.5l-4-3.25L8 21.25V3.75z" strokeLinejoin="round" />
    </svg>
  );
}