"use client";

import type { Locale } from "@/lib/i18n";
import { storeServicesCopy } from "@/lib/stores";

const ICON_COLOR = "#1A1A1A";

function ServiceIcon({ id }: { id: "payment" | "delivery" | "support" }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ICON_COLOR,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  if (id === "payment") {
    return (
      <svg {...props}>
        <rect x="5" y="11" width="14" height="10" rx="1.5" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  if (id === "delivery") {
    return (
      <svg {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function ServiceCard({
  id,
  title,
  text,
}: {
  id: "payment" | "delivery" | "support";
  title: string;
  text: string;
}) {
  return (
    <article className="text-center">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#EDE9E6] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      >
        <ServiceIcon id={id} />
      </div>
      <h3 className="mb-3 mt-5 text-[12px] font-medium uppercase leading-[1.3] tracking-[0.06em] text-[#1A1A1A]">
        {title}
      </h3>
      <p className="mx-auto max-w-[280px] text-[13px] leading-[1.7] text-[#6B7280]">
        {text}
      </p>
    </article>
  );
}

export default function StoreExclusiveServices({ locale }: { locale: Locale }) {
  const copy = storeServicesCopy[locale];

  return (
    <section className="border-t border-[#EDE9E6] bg-[#FAF8F5] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="mb-12 text-center text-[12px] font-medium uppercase tracking-[0.15em] text-[#1A1A1A]">
          {copy.title}
        </h2>

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-16">
          {copy.items.map((item) => (
            <ServiceCard key={item.id} id={item.id} title={item.title} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
