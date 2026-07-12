"use client";

import { useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
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
  | {
      type: "image";
      src: string;
      mobileSrc?: string;
      alt: string;
      width?: number;
      height?: number;
      mobileWidth?: number;
      mobileHeight?: number;
      objectPosition?: string;
      mobileObjectPosition?: string;
      caption?: HeroSlideCaption;
    }
  | {
      type: "video";
      src: string;
      mobileSrc?: string;
      poster?: string;
      mobilePoster?: string;
      caption?: HeroSlideCaption;
    };

function ResponsiveHeroImage({
  src,
  mobileSrc,
  alt,
  width = 1920,
  height = 1080,
  mobileWidth = 1400,
  mobileHeight = 875,
  objectPosition = "42% 28%",
  mobileObjectPosition = "50% 50%",
  eager = false,
  className = "",
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  objectPosition?: string;
  mobileObjectPosition?: string;
  eager?: boolean;
  className?: string;
}) {
  if (!mobileSrc) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        preload={eager}
        quality={85}
        sizes="100vw"
        className={"object-cover " + className}
        style={{ objectPosition }}
      />
    );
  }

  const common = { alt, sizes: "100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src,
    width,
    height,
    quality: 85,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    src: mobileSrc,
    width: mobileWidth,
    height: mobileHeight,
    quality: 82,
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
      {/* getImageProps provides responsive src/srcSet without loading both art-directed files. */}
      <img
        {...mobileProps}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={
          "absolute inset-0 h-full w-full object-cover object-[var(--hero-mobile-position)] md:object-[var(--hero-desktop-position)] " +
          className
        }
        style={
          {
            "--hero-mobile-position": mobileObjectPosition,
            "--hero-desktop-position": objectPosition,
          } as React.CSSProperties
        }
      />
    </picture>
  );
}

function HeroSlideVideo({
  src,
  mobileSrc,
  poster,
  mobilePoster,
  active,
  warm,
  onEnded,
  className,
}: {
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  active: boolean;
  warm: boolean;
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

    const markReady = () => setReady(true);
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onCanPlay = () => {
      markReady();
      if (active) tryPlay();
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("loadeddata", markReady);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadeddata", markReady);
    };
  }, [src, mobileSrc, active, warm]);

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
  }, [active, src, mobileSrc]);

  return (
    <>
      {(active || warm) && poster ? (
        <ResponsiveHeroImage
          src={poster}
          mobileSrc={mobilePoster}
          alt=""
          width={1280}
          height={720}
          mobileWidth={720}
          mobileHeight={406}
          eager={active}
          objectPosition="50% 66%"
          mobileObjectPosition="50% 66%"
          className={
            "transition-opacity duration-300 " +
            (ready && active ? "opacity-0" : "opacity-100")
          }
        />
      ) : null}
      <video
        ref={videoRef}
        muted
        playsInline
        preload={warm || active ? "auto" : "none"}
        loop={false}
        onEnded={onEnded}
        data-ready={ready ? "true" : "false"}
        className={
          (className ?? "") +
          " " +
          (ready ? "opacity-100" : "opacity-0")
        }
      >
        {warm || active ? (
          <>
            {mobileSrc ? (
              <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
            ) : null}
            <source src={src} type="video/mp4" />
          </>
        ) : null}
      </video>
    </>
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
  const touchStartX = useRef<number | null>(null);
  const t = useT();

  const safeIndex = slides.length > 0 ? Math.min(index, slides.length - 1) : 0;
  const activeSlide = slides[safeIndex];
  const canSwipe = slides.length > 1;

  const goNext = () => {
    setIndex((current) => (current + 1) % slides.length);
  };

  const goPrev = () => {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  };

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
      <div
        className="relative aspect-[16/10] w-full touch-pan-y md:aspect-auto md:h-[calc(100vh-72px)] md:min-h-[748px]"
        onTouchStart={(e) => {
          if (!canSwipe) return;
          touchStartX.current = e.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (!canSwipe || touchStartX.current == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) < 40) return;
          if (dx < 0) goNext();
          else goPrev();
        }}
      >
        {slides.map((slide, i) => {
          const active = i === safeIndex;
          return (
            <div
              key={
                slide.type === "image"
                  ? slide.src
                  : `video-${slide.mobileSrc ?? slide.src}`
              }
              className={
                "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out " +
                (active ? "z-[1] opacity-100" : "z-0 opacity-0")
              }
              aria-hidden={!active}
            >
              {slide.type === "image" ? (
                <ResponsiveHeroImage
                  src={slide.src}
                  mobileSrc={slide.mobileSrc}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  mobileWidth={slide.mobileWidth}
                  mobileHeight={slide.mobileHeight}
                  objectPosition={slide.objectPosition}
                  mobileObjectPosition={slide.mobileObjectPosition}
                  eager={i === 0}
                />
              ) : (
                <HeroSlideVideo
                  src={slide.src}
                  mobileSrc={slide.mobileSrc}
                  poster={slide.poster}
                  mobilePoster={slide.mobilePoster}
                  active={active}
                  warm={active}
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
                className="relative z-30 mt-1 inline-flex h-9 min-h-[44px] items-center rounded-full bg-white px-4 text-[11px] font-medium uppercase tracking-[0.08em] text-[#111] touch-manipulation transition hover:bg-[#F5F3F0] md:mt-0 md:h-11 md:min-h-0 md:px-6 md:text-[12px]"
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
