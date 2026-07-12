"use client";

import { useT } from "@/lib/useI18n";

export default function TrustNotes({ className = "mt-6 space-y-2.5 px-1" }: { className?: string }) {
  const t = useT();
  const items = [
    { key: "fitting" as const, label: t("cart.trustFitting"), icon: <FittingIcon /> },
    { key: "exchange" as const, label: t("cart.trustExchange"), icon: <ExchangeIcon /> },
    { key: "cod" as const, label: t("cart.trustCod"), icon: <CodIcon /> },
  ];

  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item.key}
          className="flex items-center gap-2.5 text-[13px] leading-snug text-[#1A1A1A] opacity-60"
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function FittingIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M5.5 2.5h5l1 3.5H4.5l1-3.5Z" strokeLinejoin="round" />
      <path d="M4.5 6v7.5h7V6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5h3" strokeLinecap="round" />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M3.5 6.5h8.2l-2-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 9.5H4.3l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="2.5" y="4" width="11" height="8" rx="1.2" />
      <path d="M2.5 6.5h11" strokeLinecap="round" />
      <path d="M5 10h2.5" strokeLinecap="round" />
    </svg>
  );
}
