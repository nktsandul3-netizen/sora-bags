"use client";

import { getDeliveryInfo } from "@/lib/delivery";
import type { ProductStatus } from "@/lib/types";
import { useLocale } from "@/lib/useI18n";

const dotColors: Record<ProductStatus | "pre_order", string> = {
  in_stock: "bg-[#2EBB7B]",
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
        "inline-flex shrink-0 items-center gap-1.5 font-normal text-[12px] text-[#111]/48 " +
        (pulse && resolvedStatus === "in_stock" ? " overflow-visible" : "") +
        (className ? ` ${className}` : "")
      }
    >
      <span
        className={
          "h-1.5 w-1.5 shrink-0 rounded-full " +
          dotColors[resolvedStatus] +
          (pulse && resolvedStatus === "in_stock" ? " product-status-dot-pulse" : "")
        }
        aria-hidden
      />
      {delivery.badge}
    </span>
  );
}
