"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import type { SalesPoint } from "@/lib/admin/stats";

/** Лёгкий столбчатый график продаж на чистом SVG (без сторонних зависимостей). */
export default function SalesChart({ data }: { data: SalesPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.revenue));
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">
            Выручка за {data.length} дн.
          </p>
          <p className="font-serif text-2xl text-stone-900">{formatPrice(totalRevenue)}</p>
        </div>
        {hover !== null && data[hover] && (
          <div className="text-right">
            <p className="text-xs text-stone-500">{data[hover].label}</p>
            <p className="text-sm font-medium text-[#A01D26]">
              {formatPrice(data[hover].revenue)} · {data[hover].orders} зак.
            </p>
          </div>
        )}
      </div>

      <div className="flex h-40 items-end gap-1.5">
        {data.map((d, i) => {
          const h = Math.round((d.revenue / max) * 100);
          return (
            <div
              key={d.date}
              className="group flex flex-1 flex-col items-center justify-end gap-1"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                className={`w-full rounded-t transition-colors ${
                  hover === i ? "bg-[#A01D26]" : "bg-[#A01D26]/30 group-hover:bg-[#A01D26]/60"
                }`}
                style={{ height: `${Math.max(h, 2)}%` }}
              />
              <span className="text-[10px] text-stone-400">{d.label.slice(0, 2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}