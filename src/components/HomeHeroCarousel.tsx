"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useT } from "@/lib/useI18n";

export type HeroSlide = {
  src: string;
  alt: string;
  filterClass?: string;
  objectPosition?: string;
};

export default function HomeHeroCarousel({
  slides,
  intervalMs = 5000,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const t = useT();

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [active, slides.length, intervalMs]);

  return (
    <section className="relative w-full overflow-hidden bg-stone-100">
      <div className="relative aspect-[2/1] w-full">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            preload={i === 0}
            quality={i === 0 ? 85 : 82}
            sizes="100vw"
            style={{ objectPosition: slide.objectPosition ?? "50% 50%" }}
            className={
              "object-cover transition-opacity duration-[1200ms] ease-in-out " +
              (slide.filterClass ?? "") +
              (i === active ? " opacity-100" : " opacity-0")
            }
          />
        ))}

        {slides.length > 1 ? (
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2.5 sm:bottom-6">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={t("a11y.slideNumber").replace("{number}", String(i + 1))}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={
                  "h-[3px] w-10 rounded-full transition-all duration-500 " +
                  (i === active
                    ? "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
                    : "bg-white/45 hover:bg-white/70")
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
