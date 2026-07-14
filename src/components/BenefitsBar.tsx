"use client";

type BenefitsBarProps = {
  items: string[];
  /** Optional accessible name for the landmark */
  label?: string;
};

/**
 * Thin trust strip under the home hero — 4 uppercase claims, no icons.
 * Desktop: centered row with 48px gaps and hairline dividers.
 * Mobile: seamless single-line marquee.
 */
export default function BenefitsBar({ items, label }: BenefitsBarProps) {
  if (items.length === 0) return null;

  const mobileItems = [...items, ...items];

  return (
    <section
      aria-label={label}
      className="box-border h-[56px] w-full overflow-hidden border-y border-[#EAE1D6] bg-white"
    >
      <div className="flex h-full items-center overflow-hidden md:hidden">
        <ul className="benefits-marquee flex w-max shrink-0 items-center">
        {mobileItems.map((item, index) => (
          <li
            key={`m-${item}-${index}`}
            className="flex shrink-0 items-center whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-[#1A1A1A]"
          >
            {item}
            <span aria-hidden className="mx-6 h-3 w-px shrink-0 bg-[#E9E0D8]" />
          </li>
        ))}
        </ul>
      </div>

      {/* Desktop: static centered row */}
      <ul className="hidden h-[56px] items-center justify-center gap-12 px-4 md:flex">
        {items.map((item, index) => (
          <li key={`d-${item}`} className="relative flex shrink-0 items-center">
            {index > 0 ? (
              <span
                aria-hidden
                className="absolute -left-6 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-[#E9E0D8]"
              />
            ) : null}
            <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-[#1A1A1A]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
