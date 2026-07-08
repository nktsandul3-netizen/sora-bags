"use client";

import { getDeliveryInfo } from "@/lib/delivery";
import type { ProductStatus } from "@/lib/types";
import { useLocale } from "@/lib/useI18n";

const dotColors: Record<ProductStatus | "pre_order", string> = {
  in_stock: "bg-emerald-500",
  pre_order: "bg-amber-500",
  out_of_stock: "bg-stone-400",
};

export default function PreorderStatusBadge({
  status,
  className = "",
  compact = false,
  pulse = false,
}: {
  status?: ProductStatus;
  className?: string;
  compact?: boolean;
  pulse?: boolean;
}) {
  const locale = useLocale();
  const resolvedStatus = status ?? "pre_order";
  const delivery = getDeliveryInfo({ status: resolvedStatus }, locale);

  return (
    <span
      className={
        "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/70 font-medium text-stone-700 backdrop-blur-[2px] " +
        (compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[12px] sm:text-[13px]") +
        (pulse && resolvedStatus === "in_stock" ? " overflow-visible" : "") +
        (className ? ` ${className}` : "")
      }
    >
      <span
        className={
          (pulse && resolvedStatus === "in_stock" ? "h-2 w-2 " : "h-1.5 w-1.5 ") +
          "rounded-full " +
          dotColors[resolvedStatus] +
          (pulse && resolvedStatus === "in_stock" ? " product-status-dot-pulse" : "")
        }
        aria-hidden
      />
      {delivery.badge}
    </span>
  );
}
