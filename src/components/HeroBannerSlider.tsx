"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import TileVideo from "./TileVideo";

export interface HeroSlideCaption {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

export type HeroSlide =
  | { type: "image"; src: string; alt: string; caption?: HeroSlideCaption }
  | { type: "video"; src: string; caption?: HeroSlideCaption };

export default function HeroBannerSlider({
  slides,
  intervalMs = 5000,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs]);

  const safeIndex = slides.length > 0 ? Math.min(index, slides.length - 1) : 0;
  const activeSlide = slides[safeIndex];

  if (!activeSlide) return null;

  return (
    <section className="relative w-full overflow-hidden bg-stone-100">
      <div className="relative h-[58vh] min-h-[400px] w-full sm:h-[68vh] sm:min-h-[480px] md:h-[96vh] md:min-h-[700px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {activeSlide.type === "image" ? (
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                priority={safeIndex === 0}
                quality={100}
                sizes="100vw"
                className="object-cover [filter:brightness(0.78)_saturate(0.72)_contrast(0.98)]"
              />
            ) : (
              <TileVideo
                src={activeSlide.src}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {activeSlide.caption && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-[36%] z-10 flex flex-col items-center px-4 text-center text-white sm:bottom-[38%] md:bottom-[40%]">
                  <div className="max-w-3xl [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_4px_18px_rgba(0,0,0,0.35)]">
                    {activeSlide.caption.eyebrow && (
                      <p className="text-[14px] font-light uppercase tracking-[0.2em] text-white/90">
                        {activeSlide.caption.eyebrow}
                      </p>
                    )}
                    <h2 className="mt-2 font-serif text-[28px] uppercase leading-tight tracking-[0.08em] sm:text-[30px] md:text-[32px]">
                      {activeSlide.caption.title}
                    </h2>
                    {activeSlide.caption.subtitle && (
                      <p className="mx-auto mt-2.5 max-w-xl text-[15px] leading-snug text-white/85">
                        {activeSlide.caption.subtitle}
                      </p>
                    )}
                  </div>
                  <Link
                    href={activeSlide.caption.ctaHref}
                    className="mt-5 inline-flex min-h-12 items-center gap-2.5 bg-white px-8 text-[11px] font-medium uppercase tracking-[0.24em] text-stone-950 transition hover:bg-stone-100"
                  >
                    {activeSlide.caption.ctaLabel}
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Баннер ${i + 1}`}
                aria-current={i === safeIndex}
                onClick={() => setIndex(i)}
                className="flex items-center justify-center p-2.5"
              >
                <span
                  aria-hidden
                  className={
                    "block h-1.5 rounded-full transition-all " +
                    (i === safeIndex ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80")
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
