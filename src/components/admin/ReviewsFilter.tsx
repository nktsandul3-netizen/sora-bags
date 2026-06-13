"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ReviewsFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const status = params.get("status") ?? "all";

  const tabs = [
    { id: "all", label: "Все" },
    { id: "pending", label: "На модерации" },
    { id: "approved", label: "Одобрены" },
    { id: "rejected", label: "Отклонены" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => {
            const sp = new URLSearchParams(params.toString());
            if (t.id === "all") sp.delete("status");
            else sp.set("status", t.id);
            router.push(`/admin/reviews?${sp.toString()}`);
          }}
          className={`px-3 py-1.5 text-sm ${
            status === t.id
              ? "bg-[#A01D26] text-white"
              : "bg-white text-stone-600 ring-1 ring-stone-200"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}