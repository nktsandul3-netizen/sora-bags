"use client";

import { useState } from "react";

function normalizePhoneForWhatsapp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

function CopyButton({ value, label }: { value?: string; label: string }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  async function copy() {
    await navigator.clipboard.writeText(value!);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:border-stone-500 hover:text-stone-900"
    >
      {copied ? "Скопировано" : label}
    </button>
  );
}

export default function OrderQuickActions({
  orderNumber,
  customerName,
  phone,
  email,
  address,
}: {
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
}) {
  const whatsappBase = normalizePhoneForWhatsapp(phone);
  const whatsappText = `Здравствуйте, ${customerName}! Пишем по заказу ${orderNumber} в SÓRA. Хотим подтвердить детали доставки и оплаты.`;
  const whatsappHref = whatsappBase
    ? `${whatsappBase}?text=${encodeURIComponent(whatsappText)}`
    : null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#20bd5a]"
          >
            WhatsApp
          </a>
        )}
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-stone-800"
        >
          Позвонить
        </a>
        {email && (
          <a
            href={`mailto:${email}`}
            className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-stone-500"
          >
            Email
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <CopyButton value={phone} label="Копировать телефон" />
        <CopyButton value={address} label="Копировать адрес" />
      </div>
    </div>
  );
}
