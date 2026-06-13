"use client";

import Link from "next/link";

export default function PrintControls({ orderId }: { orderId: string }) {
  return (
    <div className="no-print mb-6 flex items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="bg-[#A01D26] px-5 py-2.5 text-sm text-white hover:opacity-90"
      >
        Печать
      </button>
      <Link href={`/admin/orders/${orderId}`} className="text-sm text-stone-500 hover:text-[#A01D26]">
        ← К заказу
      </Link>
    </div>
  );
}