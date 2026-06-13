"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { brand, videoWidget, type VideoWidgetTikTokItem } from "@/lib/config";
import { parseTikTokVideoId } from "@/lib/tiktok";

const EXPAND_EASE = [0.42, 0, 0.58, 1] as const;
const EXPAND_MS = 0.4;

type ResolvedTikTokItem = VideoWidgetTikTokItem & {
  videoId: string;
  tiktokUrl: string;
};

function resolveTikTokItems(items: readonly VideoWidgetTikTokItem[]): ResolvedTikTokItem[] {
  return items.flatMap((item) => {
    const videoId = parseTikTokVideoId(item.url);
    if (!videoId) return [];
    const tiktokUrl =
      item.shareUrl?.trim() ||
      (item.url.trim().startsWith("http")
        ? item.url.trim()
        : `https://www.tiktok.com/video/${videoId}`);
    return [{ ...item, videoId, tiktokUrl }];
  });
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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function VideoWidget() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  const tiktokItems = useMemo(
    () => (videoWidget.mode === "tiktok" ? resolveTikTokItems(videoWidget.tiktokVideos) : []),
    [],
  );
  const isTikTokMode = videoWidget.mode === "tiktok" && tiktokItems.length > 0;
  const activeTikTok = isTikTokMode ? tiktokItems[activeIndex % tiktokItems.length] : null;

  const useTikTok = isTikTokMode;
  const cardTitle = useTikTok && activeTikTok ? activeTikTok.title : videoWidget.title;
  const videoSrc =
    useTikTok && activeTikTok?.mp4Src ? activeTikTok.mp4Src : videoWidget.videoSrc;
  const posterSrc =
    useTikTok && activeTikTok?.posterSrc ? activeTikTok.posterSrc : videoWidget.posterSrc;
  const ctaHref =
    useTikTok && activeTikTok ? activeTikTok.tiktokUrl : videoWidget.collectionHref;
  const ctaIsExternal = useTikTok && !!activeTikTok;

  const collapsedW = isDesktop ? 130 : 92;
  const collapsedH = isDesktop ? 231 : 164;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  // Разворачиваем в вертикальный формат 9:16, как на Lancaster.
  const expandedH = isDesktop ? Math.min(480, vh * 0.72) : Math.min(420, vh * 0.65);
  const expandedW = isDesktop
    ? Math.round(expandedH * (9 / 16))
    : Math.min(Math.round(expandedH * (9 / 16)), vw - 24);

  const goNext = useCallback(() => {
    if (!isTikTokMode || expanded) return;
    setActiveIndex((i) => (i + 1) % tiktokItems.length);
  }, [expanded, isTikTokMode, tiktokItems.length]);

  useEffect(() => {
    if (!isTikTokMode || dismissed || expanded) return;
    const timer = window.setInterval(goNext, videoWidget.rotateIntervalMs);
    return () => window.clearInterval(timer);
  }, [dismissed, expanded, goNext, isTikTokMode]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        collapseWidget();
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [expanded]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = expanded ? muted : true;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        if (expanded) {
          v.muted = true;
          setMuted(true);
        }
        v.play().catch(() => {});
      });
    }
  }, [expanded, muted, videoSrc, activeIndex]);

  function dismissWidget(e: React.MouseEvent) {
    e.stopPropagation();
    setExpanded(false);
    setDismissed(true);
  }

  function expandWidget() {
    setMuted(false);
    setExpanded(true);
  }

  function collapseWidget() {
    setMuted(true);
    setExpanded(false);
  }

  if (!videoWidget.enabled || dismissed) return null;

  return (
    <>
      <motion.div
        ref={containerRef}
        layout
        layoutRoot
        className="fixed z-[70]"
        style={{
          bottom: isDesktop ? 40 : 20,
          right: isDesktop ? 20 : 12,
          transformOrigin: "bottom right",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: 1,
          y: 0,
          width: expanded ? expandedW : collapsedW,
          height: expanded ? expandedH : collapsedH,
        }}
        transition={{ duration: EXPAND_MS, ease: EXPAND_EASE }}
      >
        <div
          className={
            "relative h-full w-full " +
            (expanded ? "" : "transition-transform duration-300 ease-out hover:scale-[1.03]")
          }
        >
          {!expanded && (
            <button
              type="button"
              onClick={dismissWidget}
              aria-label="Закрыть виджет"
              className="absolute -right-2 -top-2 z-30 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:bg-stone-900 md:h-8 md:w-8"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}

          <motion.div
            layout
            className="h-full w-full rounded-2xl border-[3px] border-[#111] bg-[#111] p-[3px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:rounded-[20px]"
            style={{ transformOrigin: "bottom right" }}
          >
            <div
              className={
                "relative h-full w-full overflow-hidden bg-black ring-1 ring-inset ring-white/15 " +
                (expanded ? "rounded-[18px]" : "rounded-2xl md:rounded-[18px]")
              }
            >
              {!expanded && (
                <button
                  type="button"
                  onClick={expandWidget}
                  aria-label={`Открыть ${cardTitle}`}
                  className="absolute inset-0 z-10 cursor-pointer"
                />
              )}

              <video
                ref={videoRef}
                key={videoSrc}
                className="absolute inset-0 h-full w-full object-cover"
                src={videoSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />

              <AnimatePresence mode="wait">
                {!expanded ? (
                  <motion.div
                    key="collapsed-ui"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
                  >
                    <p className="absolute bottom-4 left-3 right-3 text-center text-[8px] font-medium uppercase leading-snug tracking-[0.1em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:bottom-6 md:text-[10px] md:tracking-[0.12em]">
                      {cardTitle}
                    </p>
                    {useTikTok && tiktokItems.length > 1 ? (
                      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1 md:bottom-4">
                        {tiktokItems.map((item, i) => (
                          <span
                            key={item.videoId}
                            className={
                              "h-1 rounded-full transition-all " +
                              (i === activeIndex ? "w-2.5 bg-white" : "w-1 bg-white/40")
                            }
                          />
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded-ui"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="absolute inset-0 z-20"
                  >
                    <div className="absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-3">
                      {(useTikTok && tiktokItems.length > 1 ? tiktokItems : [null]).map(
                        (_, i) => (
                          <div
                            key={i}
                            className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/30"
                          >
                            <div
                              className={
                                "h-full rounded-full bg-white transition-all duration-300 " +
                                (useTikTok && tiktokItems.length > 1
                                  ? i === activeIndex
                                    ? "w-full"
                                    : "w-0"
                                  : "w-full")
                              }
                            />
                          </div>
                        ),
                      )}
                    </div>

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pb-4 pt-7 md:px-5 md:pt-8">
                      <div className="flex min-w-0 items-center gap-2.5 pr-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                          <span className="font-serif text-[11px] tracking-[0.14em] text-white">
                            {brand.name}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-white md:text-xs">
                            {cardTitle}
                          </p>
                          <p className="mt-0.5 text-[10px] text-white/55">{brand.name}</p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2">
                        <button
                          type="button"
                          onClick={collapseWidget}
                          aria-label="Свернуть"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                        >
                          <CloseIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMuted((m) => !m)}
                          aria-label={muted ? "Включить звук" : "Выключить звук"}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                        >
                          {muted ? (
                            <SoundOffIcon className="h-4 w-4" />
                          ) : (
                            <SoundOnIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 px-4 pb-5 pt-16 md:px-5 md:pb-6">
                      {ctaIsExternal ? (
                        <a
                          href={ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={collapseWidget}
                          className="flex w-full items-center justify-center rounded-sm bg-black py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-900 md:text-xs"
                        >
                          {videoWidget.collectionLabel}
                        </a>
                      ) : (
                        <Link
                          href={ctaHref}
                          onClick={collapseWidget}
                          className="flex w-full items-center justify-center rounded-sm bg-black py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-900 md:text-xs"
                        >
                          {videoWidget.collectionLabel}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}