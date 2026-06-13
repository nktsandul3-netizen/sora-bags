"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CustomersToolbar() {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams(params.toString());
    if (search) sp.set("search", search);
    else sp.delete("search");
    sp.delete("page");
    router.push(`/admin/customers?${sp.toString()}`);
  }

  return (
    <form onSubmit={submit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по имени, e-mail, телефону…"
        className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
      />
    </form>
  );
}