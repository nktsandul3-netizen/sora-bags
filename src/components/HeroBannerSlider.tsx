"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/useI18n";

export interface HeroSlideCaption {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

export type HeroSlide =
  | { type: "image"; src: string; mobileSrc?: string; alt: string; caption?: HeroSlideCaption }
  | { type: "video"; src: string; caption?: HeroSlideCaption };

function HeroSlideVideo({
  src,
  active,
  onEnded,
  className,
}: {
  src: string;
  active: boolean;
  onEnded: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onCanPlay = () => {
      setReady(true);
      if (active) tryPlay();
    };

    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [src, active]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [active, src]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      src={src}
      loop={false}
      onEnded={onEnded}
      data-ready={ready ? "true" : "false"}
      className={className}
    />
  );
}

export default function HeroBannerSlider({
  slides,
  intervalMs = 5000,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const t = useT();

  const safeIndex = slides.length > 0 ? Math.min(index, slides.length - 1) : 0;
  const activeSlide = slides[safeIndex];

  const goNext = () => {
    setIndex((current) => (current + 1) % slides.length);
  };

  // Image slides advance on a timer; video slides wait for onEnded.
  useEffect(() => {
    if (slides.length < 2 || !activeSlide) return;
    if (activeSlide.type !== "image") return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearTimeout(timer);
  }, [slides.length, intervalMs, safeIndex, activeSlide]);

  if (!activeSlide) return null;

  return (
    <section
      id="home-hero"
      className={
        "relative w-full overflow-hidden " +
        (activeSlide.type === "video" ? "bg-[#1f3d36]" : "bg-[#F7F3F0]")
      }
    >
      <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-[calc(100vh-72px)] md:min-h-[748px]">
        {slides.map((slide, i) => {
          const active = i === safeIndex;
          return (
            <div
              key={slide.type === "image" ? slide.src : `video-${slide.src}`}
              className={
                "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out " +
                (active ? "z-[1] opacity-100" : "z-0 opacity-0")
              }
              aria-hidden={!active}
            >
              {slide.type === "image" ? (
                <>
                  {slide.mobileSrc ? (
                    <Image
                      src={slide.mobileSrc}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      quality={92}
                      sizes="100vw"
                      className="object-cover object-center md:hidden"
                    />
                  ) : null}
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    quality={100}
                    sizes="100vw"
                    className={
                      slide.mobileSrc
                        ? "hidden object-cover object-[42%_28%] md:block"
                        : "object-cover object-[42%_28%]"
                    }
                  />
                </>
              ) : (
                <HeroSlideVideo
                  src={slide.src}
                  active={active}
                  onEnded={() => {
                    if (i === safeIndex) goNext();
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_66%]"
                />
              )}
            </div>
          );
        })}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[35%]"
          style={{
            background: "linear-gradient(0deg, rgba(0,0,0,0.14) 0%, transparent 100%)",
          }}
        />

        {activeSlide.caption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-12 z-20 flex flex-col items-center px-4 text-center text-white md:bottom-auto md:top-[36%]">
            <div className="pointer-events-auto relative z-20 flex max-w-3xl flex-col items-center">
              {activeSlide.caption.eyebrow ? (
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:mb-3.5 sm:text-[12px] md:text-[13px]">
                  {activeSlide.caption.eyebrow}
                </p>
              ) : null}
              {activeSlide.caption.title ? (
                <h1 className="font-serif text-[20px] font-normal uppercase leading-[1.15] tracking-[0.04em] text-white md:-mt-4 md:text-[40px]">
                  {activeSlide.caption.title}
                </h1>
              ) : null}
              {activeSlide.caption.subtitle ? (
                <p className="mt-1.5 mb-2 max-w-xl text-[12px] leading-snug text-white opacity-[0.92] md:mt-3.5 md:text-[16px]">
                  {activeSlide.caption.subtitle}
                </p>
              ) : null}
              <Link
                href={activeSlide.caption.ctaHref}
                className="relative z-30 mt-1 inline-flex h-9 items-center rounded-full bg-white px-4 text-[11px] font-medium uppercase tracking-[0.08em] text-[#111] transition hover:bg-[#F5F3F0] md:mt-0 md:h-11 md:px-6 md:text-[12px]"
              >
                {activeSlide.caption.ctaLabel}
                <svg
                  viewBox="0 0 16 16"
                  className="ml-1.5 h-3 w-3 shrink-0 opacity-60 md:ml-2 md:h-3.5 md:w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        ) : null}

        {slides.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-3 md:pb-12">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t("a11y.bannerNumber").replace("{number}", String(i + 1))}
                aria-current={i === safeIndex}
                onClick={() => setIndex(i)}
                className="pointer-events-auto flex items-center justify-center p-2 outline-none focus:outline-none focus-visible:outline-none md:p-2.5"
              >
                <span
                  aria-hidden
                  className={
                    "block h-1.5 rounded-full bg-white transition-all md:h-2 " +
                    (i === safeIndex ? "w-4 opacity-100 md:w-5" : "w-1.5 opacity-[0.36] hover:opacity-70 md:w-2")
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
