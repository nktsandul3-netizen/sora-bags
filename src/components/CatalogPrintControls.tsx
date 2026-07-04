"use client";

import Link from "next/link";

export default function CatalogPrintControls() {
  return (
    <div className="no-print mb-8 flex flex-wrap items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="bg-[#A01D26] px-5 py-2.5 text-sm text-white hover:opacity-90"
      >
        Сохранить PDF / Печать
      </button>
      <Link href="/" className="text-sm text-stone-500 hover:text-[#A01D26]">
        ← На сайт
      </Link>
      <p className="w-full text-sm text-stone-500">
        В диалоге печати выберите «Сохранить как PDF». Рекомендуем формат A4 и включённые фоновые
        рисунки.
      </p>
    </div>
  );
}
