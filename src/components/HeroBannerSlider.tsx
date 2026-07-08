"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import TileVideo from "./TileVideo";

export interface HeroSlideCaption {
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-14 z-10 flex flex-col items-center px-4 text-center text-white sm:bottom-16">
                  <h2 className="font-serif text-2xl uppercase tracking-[0.14em] drop-shadow-sm sm:text-3xl md:text-4xl">
                    {activeSlide.caption.title}
                  </h2>
                  {activeSlide.caption.subtitle && (
                    <p className="mt-2 max-w-md text-sm text-white/90 sm:text-base">
                      {activeSlide.caption.subtitle}
                    </p>
                  )}
                  <Link
                    href={activeSlide.caption.ctaHref}
                    className="mt-6 border border-white px-8 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-stone-950"
                  >
                    {activeSlide.caption.ctaLabel}
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
