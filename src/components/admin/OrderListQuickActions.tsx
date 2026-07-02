"use client";

import { useState } from "react";

function whatsappHref(phone: string, orderNumber: string, customerName: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  const text = `Здравствуйте, ${customerName}! Пишем по заказу ${orderNumber} в SÓRA. Хотим подтвердить детали.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export default function OrderListQuickActions({
  orderNumber,
  customerName,
  phone,
}: {
  orderNumber: string;
  customerName: string;
  phone: string;
}) {
  const [copied, setCopied] = useState(false);
  const wa = whatsappHref(phone, orderNumber, customerName);

  async function copyPhone() {
    if (!phone) return;
    await navigator.clipboard.writeText(phone);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex items-center gap-1.5">
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#20bd5a]"
        >
          WA
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="rounded-full bg-stone-900 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-stone-800"
        >
          Call
        </a>
      )}
      {phone && (
        <button
          type="button"
          onClick={copyPhone}
          className="rounded-full border border-stone-300 px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:border-stone-500"
        >
          {copied ? "OK" : "Copy"}
        </button>
      )}
    </div>
  );
}
