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
    <section id="home-hero" className="relative w-full overflow-hidden bg-stone-100">
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
                className="object-cover object-center"
              />
            ) : (
              <TileVideo
                src={activeSlide.src}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Soft top/bottom scrims only — no heavy full-bleed gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[140px]"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[120px] bg-gradient-to-t from-black/20 to-transparent"
            />

            {activeSlide.caption && (
              <div className="hero-content absolute inset-x-0 top-[calc(52%-20px)] z-[2] flex -translate-y-1/2 flex-col items-center px-4 text-center text-white">
                <div className="max-w-3xl">
                  {activeSlide.caption.eyebrow && (
                    <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-white/90 sm:text-[13px]">
                      {activeSlide.caption.eyebrow}
                    </p>
                  )}
                  <h1
                    className="font-serif text-[28px] font-normal uppercase leading-[1.15] tracking-[0.04em] text-white md:text-[42px]"
                    style={{ textShadow: "0 1px 20px rgba(0,0,0,0.15)" }}
                  >
                    {activeSlide.caption.title}
                  </h1>
                  {activeSlide.caption.subtitle && (
                    <p className="mx-auto mt-3 max-w-xl text-[14px] leading-snug text-white/85 sm:text-[15px]">
                      {activeSlide.caption.subtitle}
                    </p>
                  )}
                </div>
                <Link
                  href={activeSlide.caption.ctaHref}
                  className="mt-6 inline-flex h-[52px] items-center gap-3 bg-white px-8 text-[12px] font-medium uppercase tracking-[0.14em] text-black transition hover:bg-[#F5F3F0]"
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
