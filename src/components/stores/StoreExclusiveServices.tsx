"use client";

import type { Locale } from "@/lib/i18n";
import { storeServicesCopy } from "@/lib/stores";

const ICON_COLOR = "#1F1F1F";

function ServiceIcon({ id }: { id: "payment" | "delivery" | "support" }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ICON_COLOR,
    strokeWidth: 1.15,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5 sm:h-[1.375rem] sm:w-[1.375rem]",
    "aria-hidden": true,
  };

  if (id === "payment") {
    return (
      <svg {...props}>
        <path d="M8.25 8.75V7.75a3.75 3.75 0 0 1 7.5 0v1" />
        <path d="M6.75 8.75h10.5l-.95 10.25H7.7L6.75 8.75Z" />
        <circle cx="12" cy="12.35" r="1.05" />
        <path d="M12 13.4v1.35" strokeLinecap="round" />
        <circle cx="16.85" cy="16.85" r="2" />
        <path d="M15.95 16.85l.75.75 1.55-1.55" />
      </svg>
    );
  }

  if (id === "delivery") {
    return (
      <svg {...props}>
        <path d="M4.75 9.25 12 5.5l7.25 3.75V17a.85.85 0 0 1-.85.85H5.6a.85.85 0 0 1-.85-.85V9.25Z" />
        <path d="M4.75 9.25 12 13.25l7.25-4" />
        <path d="M12 13.25V17.85" />
        <path d="M15.1 16.1h2.65" />
        <path d="M16.75 14.45l-1.65 1.65 1.65 1.65" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M6.25 7.25h11.5a1.75 1.75 0 0 1 1.75 1.75v4.75a1.75 1.75 0 0 1-1.75 1.75H10.5l-2.25 2.1v-2.1H6.25a1.75 1.75 0 0 1-1.75-1.75V9a1.75 1.75 0 0 1 1.75-1.75Z" />
      <path d="M8.75 11h6.5" />
      <path d="M8.75 13.25h4.25" />
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
    <article className="group text-center">
      <div
        className={
          "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(31,31,31,0.04)] " +
          "transition-all duration-[250ms] ease-out " +
          "group-hover:scale-[1.05] group-hover:bg-[#F4F1ED] group-hover:shadow-[0_4px_14px_rgba(31,31,31,0.07)] " +
          "sm:h-[3.75rem] sm:w-[3.75rem]"
        }
      >
        <div className="transition-transform duration-[250ms] ease-out group-hover:scale-[1.03]">
          <ServiceIcon id={id} />
        </div>
      </div>
      <h3 className="mx-auto mt-4 max-w-[15rem] text-[10px] font-bold uppercase leading-snug tracking-[0.05em] text-stone-950 sm:max-w-[16rem] sm:text-[11px]">
        {title}
      </h3>
      <p className="mx-auto mt-2.5 max-w-[16rem] text-xs leading-[1.65] text-stone-500 sm:max-w-[17rem]">
        {text}
      </p>
    </article>
  );
}

export default function StoreExclusiveServices({ locale }: { locale: Locale }) {
  const copy = storeServicesCopy[locale];

  return (
    <section className="border-t border-stone-200/80 bg-[#FAF9F6] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-11">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-stone-950 sm:text-xs">
          {copy.title}
        </h2>

        <div className="mt-7 grid gap-8 sm:gap-9 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {copy.items.map((item) => (
            <ServiceCard key={item.id} id={item.id} title={item.title} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
