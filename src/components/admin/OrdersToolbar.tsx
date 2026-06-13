"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/lib/admin/constants";

export default function OrdersToolbar() {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const status = params.get("status") ?? "all";

  function apply(next: { search?: string; status?: string }) {
    const sp = new URLSearchParams(params.toString());
    if (next.search !== undefined) {
      if (next.search) sp.set("search", next.search);
      else sp.delete("search");
    }
    if (next.status !== undefined) {
      if (next.status && next.status !== "all") sp.set("status", next.status);
      else sp.delete("status");
    }
    sp.delete("page");
    router.push(`/admin/orders?${sp.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply({ search });
        }}
        className="flex-1"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по номеру, имени, телефону, e-mail…"
          className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
      </form>
      <select
        value={status}
        onChange={(e) => apply({ status: e.target.value })}
        className="border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
      >
        <option value="all">Все статусы</option>
        <option value="new">{ORDER_STATUS_LABELS.new}</option>
        <option value="paid">Оплачен</option>
        {ORDER_STATUSES.filter((s) => s !== "new").map((s) => (
          <option key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
}