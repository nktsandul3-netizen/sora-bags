"use client";

import { useMemo, useState } from "react";
import type { IntelligenceProductRow } from "@/lib/admin/sales-intelligence";
import { formatPrice } from "@/lib/format";

type SortKey =
  | "title"
  | "views"
  | "wishlistAdds"
  | "cartAdds"
  | "purchases"
  | "conversion"
  | "potentialRevenue"
  | "score";

const columns: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "title", label: "Название товара" },
  { key: "views", label: "Просмотры", align: "right" },
  { key: "wishlistAdds", label: "Избранное", align: "right" },
  { key: "cartAdds", label: "Корзина", align: "right" },
  { key: "purchases", label: "Покупки", align: "right" },
  { key: "conversion", label: "Конверсия", align: "right" },
  { key: "potentialRevenue", label: "Потенциал", align: "right" },
  { key: "score", label: "Score", align: "right" },
];

function health(row: IntelligenceProductRow) {
  const interest = row.views + row.wishlistAdds * 3 + row.cartAdds * 5;
  if (row.conversion >= 15 && row.purchases > 0) {
    return {
      label: "Высокая",
      className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    };
  }
  if (interest >= 8 && row.purchases === 0) {
    return {
      label: "Проблема",
      className: "bg-[#A01D26]/10 text-[#A01D26] ring-[#A01D26]/15",
    };
  }
  return {
    label: "Средняя",
    className: "bg-amber-50 text-amber-800 ring-amber-100",
  };
}

export default function SalesIntelligenceProductTable({
  rows,
}: {
  rows: IntelligenceProductRow[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const next = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" || typeof bv === "string") {
        return String(av).localeCompare(String(bv), "ru");
      }
      return av - (bv as number);
    });
    return direction === "asc" ? next : next.reverse();
  }, [direction, rows, sortKey]);

  function toggle(key: SortKey) {
    if (key === sortKey) {
      setDirection((value) => (value === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection(key === "title" ? "asc" : "desc");
    }
  }

  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-stone-400">Пока нет данных</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
            <th className="px-4 py-3 font-medium">Сигнал</th>
            {columns.map((column) => (
              <th
                key={column.key}
                className={"px-4 py-3 font-medium " + (column.align === "right" ? "text-right" : "")}
              >
                <button
                  type="button"
                  onClick={() => toggle(column.key)}
                  className="inline-flex items-center gap-1 hover:text-[#A01D26]"
                >
                  {column.label}
                  {sortKey === column.key && <span>{direction === "asc" ? "↑" : "↓"}</span>}
                </button>
              </th>
            ))}
            <th className="px-4 py-3 font-medium">Сигналы</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.slug} className="border-t border-stone-100">
              <td className="px-4 py-3">
                <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${health(row).className}`}>
                  {health(row).label}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-stone-900">{row.title}</td>
              <td className="px-4 py-3 text-right text-stone-600">{row.views}</td>
              <td className="px-4 py-3 text-right text-stone-600">{row.wishlistAdds}</td>
              <td className="px-4 py-3 text-right text-stone-600">{row.cartAdds}</td>
              <td className="px-4 py-3 text-right text-stone-600">{row.purchases}</td>
              <td className="px-4 py-3 text-right text-stone-600">{row.conversion}%</td>
              <td className="px-4 py-3 text-right text-stone-600">{formatPrice(row.potentialRevenue)}</td>
              <td className="px-4 py-3 text-right font-semibold text-stone-900">{row.score}</td>
              <td className="px-4 py-3">
                <div className="flex min-w-48 flex-wrap gap-1.5">
                  {row.signals.length > 0 ? (
                    row.signals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-800"
                      >
                        {signal}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400">—</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
