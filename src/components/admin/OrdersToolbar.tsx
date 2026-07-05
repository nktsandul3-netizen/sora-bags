"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrdersToolbar() {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const status = params.get("status") ?? "all";
  const kind = params.get("kind") ?? "all";

  function apply(next: { search?: string; status?: string; kind?: string }) {
    const sp = new URLSearchParams(params.toString());
    if (next.search !== undefined) {
      if (next.search) sp.set("search", next.search);
      else sp.delete("search");
    }
    if (next.status !== undefined) {
      if (next.status && next.status !== "all") sp.set("status", next.status);
      else sp.delete("status");
    }
    if (next.kind !== undefined) {
      if (next.kind && next.kind !== "all") sp.set("kind", next.kind);
      else sp.delete("kind");
    }
    sp.delete("page");
    router.push(`/admin/orders?${sp.toString()}`);
  }

  return (
    <div className="space-y-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply({ search });
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск: номер, имя, телефон, e-mail…"
          className="min-w-0 flex-1 border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
        <button
          type="submit"
          className="bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
        >
          Найти
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: "Все" },
          { value: "new", label: "Новые" },
          { value: "processing", label: "В обработке" },
          { value: "shipped", label: "Доставка" },
          { value: "delivered", label: "Завершённые" },
          { value: "paid", label: "Оплаченные" },
          { value: "cancelled", label: "Отменённые" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => apply({ status: item.value })}
            className={
              "px-3 py-1.5 text-xs font-medium transition " +
              (status === item.value
                ? "bg-[#A01D26] text-white"
                : "bg-white text-stone-600 ring-1 ring-stone-200 hover:text-[#A01D26]")
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: "Все типы" },
          { value: "standard", label: "Обычные" },
          { value: "preorder", label: "Предзаказы" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => apply({ kind: item.value })}
            className={
              "px-3 py-1.5 text-xs font-medium transition " +
              (kind === item.value
                ? "bg-amber-600 text-white"
                : "bg-white text-stone-600 ring-1 ring-stone-200 hover:text-amber-700")
            }
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}