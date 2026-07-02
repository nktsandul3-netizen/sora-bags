"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { brand, brandStories, type BrandStoryHighlight, type BrandStoryProductOverride } from "@/lib/config";
import { useLocale } from "@/lib/useI18n";

const IMAGE_DURATION = 4500;

const DEFAULT_RING_GRADIENT =
  "conic-gradient(from 140deg, #f59e0b, #f97316, #ef4444, #f97316, #f59e0b)";

function getRingGradient(productSlug?: string) {
  const overrides = brandStories.productOverrides as Record<string, BrandStoryProductOverride>;
  return (productSlug && overrides[productSlug]?.ringGradient) || DEFAULT_RING_GRADIENT;
}

function getItemsForProduct(productSlug?: string): BrandStoryHighlight[] {
  const overrides = brandStories.productOverrides as Record<
    string,
    Partial<Pick<BrandStoryHighlight, "cover" | "slides" | "cta" | "ctaHref">>
  >;
  const override = productSlug ? overrides[productSlug] : undefined;
  return brandStories.items.map((item) => ({
    ...item,
    ...(override?.cover ? { cover: override.cover } : {}),
    ...(override?.slides ? { slides: override.slides } : {}),
    ...(override?.cta ? { cta: override.cta } : {}),
    ...(override?.ctaHref ? { ctaHref: override.ctaHref } : {}),
  }));
}

type Locale = "ru" | "ro" | "en";

const ctaLabels: Record<NonNullable<"collection" | "more" | "shop">, Record<Locale, string>> = {
  collection: { ru: "Смотреть коллекцию", ro: "Vezi colecția", en: "Shop the collection" },
  more: { ru: "Подробнее", ro: "Detalii", en: "Read more" },
  shop: { ru: "В магазин", ro: "La magazin", en: "Shop now" },
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a.6.6 0 0 0 .92.5l10.2-6.5a.6.6 0 0 0 0-1l-10.2-6.5A.6.6 0 0 0 8 5.5Z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SoundOnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SoundOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path d="m16.5 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction, className }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandStories({
  className,
  productSlug,
}: {
  className?: string;
  productSlug?: string;
}) {
  const locale = useLocale() as Locale;
  const items = useMemo(() => getItemsForProduct(productSlug), [productSlug]);
  const ringGradient = useMemo(() => getRingGradient(productSlug), [productSlug]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const elapsedRef = useRef(0);

  const open = openIdx !== null;
  const highlight = open ? items[openIdx] : null;
  const slides = highlight?.slides ?? [];
  const current = slides[slide];
  const isVideo = current?.type === "video";

  const close = useCallback(() => {
    setOpenIdx(null);
    setSlide(0);
    setProgress(0);
    setPaused(false);
    elapsedRef.current = 0;
  }, []);

  const openHighlight = useCallback((i: number) => {
    setOpenIdx(i);
    setSlide(0);
    setProgress(0);
    setPaused(false);
    setMuted(true);
    elapsedRef.current = 0;
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (openIdx === null) return;
      let ni = openIdx;
      let ns = slide + dir;
      if (ns >= items[openIdx].slides.length) {
        ni = openIdx + 1;
        ns = 0;
      } else if (ns < 0) {
        ni = openIdx - 1;
        ns = 0;
      }
      if (ni >= items.length) {
        close();
        return;
      }
      if (ni < 0) {
        ni = 0;
        ns = 0;
      }
      setOpenIdx(ni);
      setSlide(ns);
      setProgress(0);
      elapsedRef.current = 0;
    },
    [openIdx, slide, items, close],
  );

  const next = useCallback(() => advance(1), [advance]);
  const prev = useCallback(() => advance(-1), [advance]);

  // Reset the per-slide timer whenever the active slide changes.
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [openIdx, slide]);

  // Auto-advance for image slides (videos advance on `ended`).
  useEffect(() => {
    if (!open || isVideo || paused) return;
    const duration = current?.durationMs ?? IMAGE_DURATION;
    const start = performance.now() - elapsedRef.current;
    let raf = requestAnimationFrame(function tick(now: number) {
      const elapsed = now - start;
      elapsedRef.current = elapsed;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p >= 1) {
        next();
        return;
      }
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [open, isVideo, paused, current, next]);

  // Drive playback / mute state for video slides.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isVideo) return;
    v.muted = muted;
    if (paused) {
      v.pause();
      return;
    }
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
  }, [isVideo, paused, muted, openIdx, slide]);

  // Lock body scroll while the viewer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Keyboard controls.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  if (!brandStories.enabled || items.length === 0) return null;

  const allowedSlugs = brandStories.productSlugs as readonly string[];
  if (allowedSlugs.length > 0 && (!productSlug || !allowedSlugs.includes(productSlug))) {
    return null;
  }

  const ctaHref = highlight?.ctaHref;
  const ctaLabel = highlight?.cta ? ctaLabels[highlight.cta][locale] ?? ctaLabels[highlight.cta].ru : null;

  return (
    <>
      <div className={"flex flex-wrap items-start gap-x-5 gap-y-4 " + (className ?? "")}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openHighlight(i)}
            className="group flex w-[72px] flex-col items-center gap-2 focus:outline-none"
            aria-label={item.label}
          >
            <span className="relative block h-[68px] w-[68px]">
              <span
                aria-hidden
                style={{ background: ringGradient }}
                className="absolute inset-0 rounded-full animate-[storyPulse_2.6s_ease-out_infinite]"
              />
              <span
                style={{ background: ringGradient }}
                className="relative block h-full w-full rounded-full p-[2.5px]"
              >
                <span className="block h-full w-full rounded-full bg-white p-[2px]">
                  <span className="relative block h-full w-full overflow-hidden rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-black/10">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/85 text-stone-900 shadow-sm backdrop-blur-sm transition group-hover:scale-110">
                        <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
            <span className="text-center text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-stone-700">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {open && highlight && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={highlight.label}
        >
          <button type="button" aria-label="Закрыть" onClick={close} className="absolute inset-0 cursor-default" />

          <div className="relative z-10 flex items-center gap-2 sm:gap-4 md:gap-5">
            <button
              type="button"
              aria-label="Предыдущее"
              onClick={prev}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 md:flex"
            >
              <ChevronIcon direction="left" className="h-5 w-5" />
            </button>

            <div
              className="relative flex aspect-[9/16] max-h-[82vh] max-w-[92vw] flex-col overflow-hidden rounded-[20px] bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
              style={{ height: "min(82vh, 560px)" }}
            >
            {isVideo ? (
              <video
                ref={videoRef}
                key={current.src}
                className="absolute inset-0 h-full w-full object-cover"
                src={current.src}
                poster={current.poster}
                autoPlay
                muted={muted}
                playsInline
                preload="auto"
                onEnded={next}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.duration) setProgress(v.currentTime / v.duration);
                }}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={current.src}
                src={current.src}
                alt={current.title ?? highlight.label}
                className="absolute inset-0 h-full w-full object-cover animate-[contactReveal_0.3s_ease-out]"
              />
            )}

            {/* Tap zones for prev/next (middle band keeps header & footer clickable). */}
            <button
              type="button"
              aria-label="Предыдущее"
              onClick={prev}
              className="absolute bottom-28 left-0 top-16 z-10 w-1/3"
            />
            <button
              type="button"
              aria-label="Следующее"
              onClick={next}
              className="absolute bottom-28 right-0 top-16 z-10 w-1/3"
            />

            {/* Progress bars */}
            <div className="absolute inset-x-0 top-0 z-20 flex gap-1 px-3 pt-3">
              {slides.map((s, i) => (
                <span key={`${s.src}-${i}`} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                  <span
                    className="block h-full rounded-full bg-white"
                    style={{
                      width: i < slide ? "100%" : i === slide ? `${progress * 100}%` : "0%",
                      transition: i === slide ? "width 80ms linear" : "none",
                    }}
                  />
                </span>
              ))}
            </div>

            {/* Header */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 pt-6">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-sm">
                  <span className="font-serif text-[10px] tracking-[0.12em] text-red-500">{brand.name}</span>
                </span>
                <span className="truncate text-[12px] font-medium uppercase tracking-[0.16em] text-white/90">
                  {highlight.label}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Продолжить" : "Пауза"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                >
                  {paused ? <PlayIcon className="ml-0.5 h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
                </button>
                {isVideo && (
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? "Включить звук" : "Выключить звук"}
                    className="grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                  >
                    {muted ? <SoundOffIcon className="h-4 w-4" /> : <SoundOnIcon className="h-4 w-4" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Закрыть"
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Caption + CTA */}
            {(current?.title || current?.text || ctaHref) && (
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-6 pt-20">
                {current?.title && (
                  <h3 className="font-serif text-lg leading-tight text-white">{current.title}</h3>
                )}
                {current?.text && (
                  <p className="mt-1.5 max-w-[34ch] text-[13px] leading-relaxed text-white/85">{current.text}</p>
                )}
                {ctaHref && ctaLabel && (
                  <a
                    href={ctaHref}
                    onClick={close}
                    className="mt-4 flex w-full items-center justify-center rounded-sm bg-white py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-950 transition hover:bg-stone-200"
                  >
                    {ctaLabel}
                  </a>
                )}
              </div>
            )}
            </div>

            <button
              type="button"
              aria-label="Следующее"
              onClick={next}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 md:flex"
            >
              <ChevronIcon direction="right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
