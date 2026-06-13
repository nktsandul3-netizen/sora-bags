"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { duplicateProductAction } from "@/app/admin/actions";

export default function DuplicateProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    const res = await duplicateProductAction(productId);
    setPending(false);
    if (res.id) router.push(`/admin/products/${res.id}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:border-[#A01D26] disabled:opacity-60"
    >
      {pending ? "Копирование…" : "Дублировать"}
    </button>
  );
}