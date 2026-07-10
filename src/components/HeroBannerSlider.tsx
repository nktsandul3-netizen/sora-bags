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
                "absolute inset-0 transition-opacity duration-500 ease-out " +
                (active ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0")
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
          <div className="pointer-events-none absolute inset-x-0 top-[36%] z-[3] flex flex-col items-center px-4 text-center text-white">
            <div className="pointer-events-auto flex max-w-3xl flex-col items-center">
              {activeSlide.caption.eyebrow ? (
                <p className="mb-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-white sm:text-[13px]">
                  {activeSlide.caption.eyebrow}
                </p>
              ) : null}
              {activeSlide.caption.title ? (
                <h1 className="-mt-3.5 font-serif text-[28px] font-normal uppercase leading-[1.15] tracking-[0.04em] text-white md:-mt-4 md:text-[40px]">
                  {activeSlide.caption.title}
                </h1>
              ) : null}
              {activeSlide.caption.subtitle ? (
                <p className="mt-3.5 mb-2 max-w-xl text-[16px] leading-snug text-white opacity-[0.92]">
                  {activeSlide.caption.subtitle}
                </p>
              ) : null}
              <Link
                href={activeSlide.caption.ctaHref}
                className="inline-flex h-12 items-center rounded-[24px] bg-[#fff] px-7 text-[13px] font-medium uppercase tracking-[0.08em] text-[#111] transition hover:bg-[#F5F3F0]"
              >
                {activeSlide.caption.ctaLabel}
                <svg
                  viewBox="0 0 16 16"
                  className="ml-2.5 h-3.5 w-3.5 shrink-0 opacity-60"
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
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-12">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t("a11y.bannerNumber").replace("{number}", String(i + 1))}
                aria-current={i === safeIndex}
                onClick={() => setIndex(i)}
                className="flex items-center justify-center p-2.5 outline-none focus:outline-none focus-visible:outline-none"
              >
                <span
                  aria-hidden
                  className={
                    "block h-2 rounded-full bg-white transition-all " +
                    (i === safeIndex ? "w-5 opacity-100" : "w-2 opacity-[0.36] hover:opacity-70")
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
