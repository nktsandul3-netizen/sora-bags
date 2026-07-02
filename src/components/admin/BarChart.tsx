"use client";

import { useState } from "react";

interface Point {
  label: string;
  value: number;
}

/** Универсальный столбчатый график для аналитики. */
export default function BarChart({
  data,
  color = "#A01D26",
  formatValue,
}: {
  data: Point[];
  color?: string;
  formatValue?: (n: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const values = data.map((d) => d.value);
  const max = Math.max(1, ...values);
  const labelEvery = Math.max(1, Math.ceil(data.length / 6));

  return (
    <div className="flex h-44 items-end gap-1.5 overflow-hidden">
      {data.map((d, i) => {
        const val = d.value;
        const h = Math.round((val / max) * 100);
        const showLabel = i === 0 || i === data.length - 1 || i % labelEvery === 0;
        return (
          <div
            key={d.label + i}
            className="group flex flex-1 flex-col items-center justify-end gap-1"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            title={formatValue ? formatValue(val) : String(val)}
          >
            {hover === i && (
              <span className="text-[10px] font-medium text-[#A01D26]">
                {formatValue ? formatValue(val) : val}
              </span>
            )}
            <div
              className="w-full rounded-t transition-opacity group-hover:opacity-100"
              style={{
                height: `${Math.max(h, 2)}%`,
                backgroundColor: hover === i ? color : `${color}55`,
              }}
            />
            <span className="h-3 max-w-full truncate text-[10px] text-stone-400">
              {showLabel ? d.label : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function RankList({
  items,
  valueLabel,
}: {
  items: { title: string; slug: string; value: number }[];
  valueLabel: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-stone-400">Нет данных</p>;
  }
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={item.slug} className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 truncate text-stone-800">
            <span className="w-5 shrink-0 text-xs text-stone-400">{i + 1}</span>
            {item.title}
          </span>
          <span className="shrink-0 font-medium text-stone-600">
            {item.value} {valueLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}