"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  brand,
  homeAsOnMeRail,
  type BrandStorySlide,
  type HomeStoryRailTile,
} from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

const IMAGE_DURATION = 5000;

const DEFAULT_STORY_RING_GRADIENT =
  "conic-gradient(from 140deg, #f59e0b, #f97316, #ef4444, #f97316, #f59e0b)";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function StoryProgressBars({
  count,
  activeIndex,
  progress,
}: {
  count: number;
  activeIndex: number;
  progress: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex gap-1.5 px-3 pt-5">
      {Array.from({ length: count }, (_, i) => {
        const fill =
          i < activeIndex ? 100 : i === activeIndex ? Math.min(100, Math.max(0, progress * 100)) : 0;
        return (
          <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/35">
            <div className="h-full rounded-full bg-white transition-[width] duration-75" style={{ width: `${fill}%` }} />
          </div>
        );
      })}
    </div>
  );
}

function StoryRail({
  title,
  tiles,
  onOpen,
}: {
  title: string;
  tiles: readonly HomeStoryRailTile[];
  onOpen: (tile: HomeStoryRailTile, railTitle: string) => void;
}) {
  const locale = useLocale();
  const t = useT();
  const visibleTiles = tiles.slice(0, 6);

  return (
    <div>
      <div className="flex gap-5 overflow-x-auto pb-1 [scrollbar-width:none] snap-x snap-mandatory md:justify-end md:gap-6 md:overflow-visible md:pb-0 md:snap-none lg:gap-7 [&::-webkit-scrollbar]:hidden">
        {visibleTiles.map((tile) => {
          const priceLabel =
            tile.priceFrom != null
              ? t("home.priceFrom").replace("{price}", formatPrice(tile.priceFrom, locale))
              : null;
          const ringGradient = tile.ringGradient ?? DEFAULT_STORY_RING_GRADIENT;

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => onOpen(tile, title)}
              className="group flex w-[58%] max-w-[300px] shrink-0 snap-start flex-col items-center bg-transparent text-center focus:outline-none sm:w-[46%] sm:max-w-[320px] md:w-[312px] md:max-w-[312px] xl:w-[336px] xl:max-w-[336px]"
              aria-label={`${title}: ${tile.label}`}
            >
              <span className="relative aspect-square w-full">
                <span
                  aria-hidden
                  style={{ background: ringGradient }}
                  className="absolute inset-0 rounded-full blur-[1px] saturate-150 animate-[storyPulse_1.65s_ease-out_infinite]"
                />
                <span
                  style={{ background: ringGradient }}
                  className="relative block h-full w-full rounded-full p-[3px]"
                >
                  <span className="block h-full w-full rounded-full bg-white p-[3px]">
                    <span className="relative block h-full w-full overflow-hidden rounded-full bg-[#f3f0eb]">
                      <Image
                        src={tile.cover}
                        alt={tile.label}
                        fill
                        sizes="(min-width: 1440px) 336px, (min-width: 1024px) 312px, (min-width: 768px) 32vw, 58vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </span>
                  </span>
                </span>
              </span>
              <span className="mt-2.5 block text-[9px] font-medium uppercase leading-tight tracking-[0.12em] text-stone-950 sm:text-[10px]">
                {tile.label}
              </span>
              {priceLabel ? (
                <span className="mt-1 inline-flex bg-white px-1.5 py-0.5 text-[10px] font-medium tracking-[0.02em] text-stone-950 ring-1 ring-stone-200">
                  {priceLabel}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomeStoryRails({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useT();
  const [activeTile, setActiveTile] = useState<HomeStoryRailTile | null>(null);
  const [railTitle, setRailTitle] = useState("");
  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const slides = activeTile?.slides ?? [];
  const current = slides[slide] as BrandStorySlide | undefined;
  const isVideo = current?.type === "video";
  const open = Boolean(activeTile);

  const close = useCallback(() => {
    setActiveTile(null);
    setRailTitle("");
    setSlide(0);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    if (slides.length === 0) return;
    if (slide < slides.length - 1) {
      setSlide((s) => s + 1);
      setProgress(0);
      return;
    }
    close();
  }, [close, slide, slides.length]);

  const prev = useCallback(() => {
    if (slide > 0) {
      setSlide((s) => s - 1);
      setProgress(0);
    }
  }, [slide]);

  const openTile = useCallback((tile: HomeStoryRailTile, title: string) => {
    setActiveTile(tile);
    setRailTitle(title);
    setSlide(0);
    setProgress(0);
    setMuted(true);
  }, []);

  useEffect(() => {
    if (!open || isVideo || !current) return;
    const duration = current.durationMs ?? IMAGE_DURATION;
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now: number) {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p >= 1) {
        next();
        return;
      }
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [open, isVideo, current, slide, next]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;
    video.muted = muted;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [isVideo, muted, slide, current?.src]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  return (
    <>
      <div className={className ?? ""}>
        <StoryRail
          title={homeAsOnMeRail.title}
          tiles={homeAsOnMeRail.tiles}
          onOpen={openTile}
        />
      </div>

      {open && activeTile && current && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={`${railTitle}: ${activeTile.label}`}
        >
          <button type="button" aria-label={t("common.close")} onClick={close} className="absolute inset-0 cursor-default" />

          <div className="relative z-10 aspect-[9/16] max-h-[82vh] w-full max-w-[92vw] overflow-hidden rounded-[20px] bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] sm:max-w-[420px]">
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
                onTimeUpdate={(event) => {
                  const video = event.currentTarget;
                  if (video.duration && Number.isFinite(video.duration)) {
                    setProgress(video.currentTime / video.duration);
                  }
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={current.src}
                src={current.src}
                alt={activeTile.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <button type="button" aria-label={t("a11y.previous")} onClick={prev} className="absolute bottom-24 left-0 top-14 z-10 w-1/3" />
            <button type="button" aria-label={t("a11y.next")} onClick={next} className="absolute bottom-24 right-0 top-14 z-10 w-1/3" />

            <StoryProgressBars count={slides.length} activeIndex={slide} progress={progress} />

            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 pt-11">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-sm">
                  <span className="font-serif text-[10px] tracking-[0.12em] text-red-500">{brand.name}</span>
                </span>
                <span className="truncate text-[12px] font-medium uppercase tracking-[0.16em] text-white/90">
                  {railTitle}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {isVideo && (
                  <button
                    type="button"
                    onClick={() => setMuted((value) => !value)}
                    aria-label={muted ? t("a11y.unmute") : t("a11y.mute")}
                    className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:bg-black/60"
                  >
                    {muted ? t("home.soundOff") : t("home.soundOn")}
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label={t("common.close")}
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-6 pt-16">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white">{activeTile.label}</p>
              {activeTile.priceFrom != null ? (
                <p className="mt-2 inline-flex bg-white px-2.5 py-1 text-[12px] font-medium text-stone-950">
                  {t("home.priceFrom").replace("{price}", formatPrice(activeTile.priceFrom, locale))}
                </p>
              ) : null}
              {activeTile.productSlug ? (
                <Link
                  href={withLocalePath(`/product/${activeTile.productSlug}`, locale)}
                  onClick={close}
                  className="pointer-events-auto mt-4 inline-flex min-h-10 items-center bg-white px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-950 transition hover:bg-stone-100"
                >
                  {t("common.openCollection")}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
