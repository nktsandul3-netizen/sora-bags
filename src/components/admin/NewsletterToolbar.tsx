"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NewsletterToolbar({ total }: { total: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (search) sp.set("search", search);
    router.push(`/admin/newsletter?${sp.toString()}`);
  }

  const exportHref = `/api/admin/newsletter/export${search ? `?search=${encodeURIComponent(search)}` : ""}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <form onSubmit={submit} className="flex-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по e-mail…"
          className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
      </form>
      <div className="flex items-center gap-3">
        <span className="text-sm text-stone-500">{total} подписчиков</span>
        <a
          href={exportHref}
          className="bg-[#A01D26] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Экспорт CSV
        </a>
      </div>
    </div>
  );
}