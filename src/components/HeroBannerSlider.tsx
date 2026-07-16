"use client";

import { useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useT } from "@/lib/useI18n";

export interface HeroSlideCaption {
  eyebrow?: string;
  /** Optional — omit for brand-only first slide */
  title?: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  /**
   * `brand` — red SÓRA mark + bottom CTA, no headline
   * `centered` (default) — classic title + CTA stack
   */
  layout?: "brand" | "centered";
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
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({
    ...common,
    src,
    width,
    height,
    quality: 85,
  });
  const {
    props: { srcSet: mobileSrcSet, src: mobileImgSrc, ...mobileProps },
  } = getImageProps({
    ...common,
    src: mobileSrc,
    width: mobileWidth,
    height: mobileHeight,
    quality: 82,
  });

  // With `images.unoptimized`, Next often omits srcSet and only returns `src`.
  // Empty source srcSet made every browser fall back to the mobile <img src>.
  const desktopSet = desktopSrcSet || desktopSrc || src;
  const mobileSet = mobileSrcSet || mobileImgSrc || mobileSrc;

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={mobileSet} sizes="100vw" />
      <img
        {...mobileProps}
        src={mobileImgSrc || mobileSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
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
        // Safari / iOS / Windows Chrome: keep autoplay eligible
        autoPlay={active}
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

    // Image slides: advance on timer.
    // Video slides: also keep a fallback timer in case `ended` never fires
    // (autoplay blocked / decode error on some Windows Chrome setups).
    const delay =
      activeSlide.type === "video"
        ? Math.max(intervalMs * 3, 12000)
        : intervalMs;

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [slides.length, intervalMs, safeIndex, activeSlide?.type]);

  if (!activeSlide) return null;

  const isVideoSlide = activeSlide.type === "video";
  const captionLayout = activeSlide.caption?.layout ?? "centered";
  const isBrandLayout = captionLayout === "brand";

  return (
    <section
      id="home-hero"
      // Полноэкранный hero: фон зависит от активного слайда
      className={
        "relative w-full overflow-hidden " +
        (isVideoSlide ? "bg-[#1f3d36]" : "bg-[#D4C4B5]")
      }
    >
      <div
        className="relative aspect-[16/10] w-full touch-pan-y md:aspect-[2/1] md:h-auto md:min-h-0"
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
        {/* Слайды: изображение / видео */}
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
                  warm={Math.abs(i - safeIndex) <= 1}
                  onEnded={() => {
                    if (i === safeIndex) goNext();
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_66%]"
                />
              )}
            </div>
          );
        })}

        {/* Оверлей: brand-слайд — лёгкий низ; остальные — прежний градиент */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: isBrandLayout
              ? "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 30%)"
              : "linear-gradient(to top, rgba(0,0,0,0.18), transparent 55%)",
          }}
        />

        {activeSlide.caption && isBrandLayout ? (
          <div className="pointer-events-none absolute inset-0 z-20">
            {/* Логотип уже вшит в фото — на мобиле/десктопе только CTA */}
            <Link
              href={activeSlide.caption.ctaHref}
              className="pointer-events-auto absolute left-5 top-[38%] isolate inline-flex min-h-[34px] w-[138px] items-center justify-center rounded-full border border-[#111] bg-[#111] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.07em] text-white antialiased [backdrop-filter:none] touch-manipulation transition-colors duration-200 hover:bg-black active:bg-black md:bottom-12 md:left-1/2 md:top-auto md:min-h-[44px] md:w-auto md:-translate-x-1/2 md:px-8 md:py-3 md:text-[13px] md:tracking-[0.12em]"
            >
              <span className="max-w-[102px] text-center leading-[1.2] md:max-w-none md:whitespace-nowrap">
                {activeSlide.caption.ctaLabel}
              </span>
              <span className="ml-1.5 opacity-80 md:ml-2" aria-hidden>
                →
              </span>
            </Link>
          </div>
        ) : null}

        {/* Текст по центру — второй и прочие слайды */}
        {activeSlide.caption && !isBrandLayout ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5">
            <div className="pointer-events-auto flex w-full max-w-[800px] flex-col items-center text-center">
              {activeSlide.caption.eyebrow ? (
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 md:mb-4 md:text-[13px]">
                  {activeSlide.caption.eyebrow}
                </p>
              ) : null}

              {activeSlide.caption.title ? (
                <h1
                  className="font-serif text-[28px] font-normal uppercase leading-[1.05] tracking-[0.03em] text-white xs:text-[32px] sm:text-[36px] md:text-[76px]"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
                >
                  {activeSlide.caption.title}
                </h1>
              ) : null}

              {activeSlide.caption.subtitle ? (
                <p
                  className="mt-3 max-w-[20rem] text-[13px] leading-relaxed text-white/90 sm:max-w-xl sm:text-[14px] md:mt-4 md:text-[17px]"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
                >
                  {activeSlide.caption.subtitle}
                </p>
              ) : null}

              <Link
                href={activeSlide.caption.ctaHref}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#1A1A1A] bg-[#1A1A1A] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white touch-manipulation transition duration-300 hover:scale-[1.03] hover:bg-black active:scale-[0.98] md:mt-6 md:px-8 md:text-[13px]"
              >
                {activeSlide.caption.ctaLabel}
                <span className="ml-2 opacity-80" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        ) : null}

        {/* Компактные индикаторы отдельно под CTA */}
        {slides.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center pb-3 md:pb-4">
            <div className="pointer-events-auto flex items-center gap-2 px-3 py-2">
              {slides.map((_, i) => {
                const active = i === safeIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={t("a11y.bannerNumber").replace("{number}", String(i + 1))}
                    aria-current={active}
                    onClick={() => setIndex(i)}
                    className={
                      "relative rounded-full outline-none transition-[width,height,background-color] duration-300 " +
                      "before:absolute before:inset-[-10px] before:content-[''] " +
                      (active
                        ? "h-[7px] w-[7px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] md:h-2 md:w-2"
                        : "h-1.5 w-1.5 bg-white/55 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] hover:bg-white/80 md:h-[7px] md:w-[7px]")
                    }
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
