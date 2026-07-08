"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { brand, homeAsOnMeRail, type BrandStorySlide, type HomeStoryRailTile } from "@/lib/config";

const IMAGE_DURATION = 5000;

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a.6.6 0 0 0 .92.5l10.2-6.5a.6.6 0 0 0 0-1l-10.2-6.5A.6.6 0 0 0 8 5.5Z" />
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
  const visibleTiles = tiles.slice(0, 6);

  return (
    <div>
      <div className="flex max-w-[660px] gap-2.5 overflow-x-auto [scrollbar-width:none] lg:ml-[calc(50%-330px+3cm)] [&::-webkit-scrollbar]:hidden">
        {visibleTiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => onOpen(tile, title)}
            className="group relative aspect-[3/4] w-[82px] shrink-0 overflow-hidden bg-stone-100 shadow-[0_8px_18px_-16px_rgba(28,25,23,0.55)] focus:outline-none sm:w-[92px] lg:w-[100px]"
            aria-label={`${title}: ${tile.label}`}
          >
            <Image
              src={tile.cover}
              alt={tile.label}
              fill
              sizes="100px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/10">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/85 text-stone-900 shadow-sm transition group-hover:scale-105">
                <PlayIcon className="ml-0.5 h-2 w-2" />
              </span>
            </span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-1 pb-1 pt-6 text-left">
              <span className="block text-[7px] font-medium uppercase leading-tight tracking-[0.06em] text-white">
                {tile.label}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HomeStoryRails({ className }: { className?: string }) {
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
          <button type="button" aria-label="Закрыть" onClick={close} className="absolute inset-0 cursor-default" />

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

            <button type="button" aria-label="Предыдущее" onClick={prev} className="absolute bottom-24 left-0 top-14 z-10 w-1/3" />
            <button type="button" aria-label="Следующее" onClick={next} className="absolute bottom-24 right-0 top-14 z-10 w-1/3" />

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
                    aria-label={muted ? "Включить звук" : "Выключить звук"}
                    className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:bg-black/60"
                  >
                    {muted ? "Sound off" : "Sound on"}
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

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 pb-6 pt-16">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white">{activeTile.label}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
