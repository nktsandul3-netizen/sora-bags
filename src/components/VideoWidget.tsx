"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, videoWidget, type VideoWidgetTikTokItem } from "@/lib/config";
import { useMenuOpen } from "@/context/menu-open";
import { parseTikTokVideoId } from "@/lib/tiktok";

const EXPAND_EASE = [0.42, 0, 0.58, 1] as const;
const EXPAND_MS = 0.4;
const DEFAULT_BOTTOM_DESKTOP = 28;
const DEFAULT_BOTTOM_MOBILE = 72;
const FOOTER_GAP = 20;
const CLOSE_BUTTON_OVERHANG = 12;

type ResolvedTikTokItem = VideoWidgetTikTokItem & {
  videoId: string;
  ctaHref: string;
  ctaIsExternal: boolean;
};

function resolveTikTokItems(items: readonly VideoWidgetTikTokItem[]): ResolvedTikTokItem[] {
  return items.flatMap((item, index) => {
    const videoId = parseTikTokVideoId(item.url);
    if (videoId) {
      const tiktokUrl =
        item.shareUrl?.trim() ||
        (item.url.trim().startsWith("http")
          ? item.url.trim()
          : `https://www.tiktok.com/video/${videoId}`);
      return [
        {
          ...item,
          videoId,
          ctaHref: tiktokUrl,
          ctaIsExternal: true,
        },
      ];
    }
    if (item.mp4Src) {
      const ctaHref = item.shareUrl?.trim() || brand.social.tiktok;
      return [
        {
          ...item,
          videoId: item.mp4Src.replace(/\W/g, "") || `local-${index}`,
          ctaHref,
          ctaIsExternal: true,
        },
      ];
    }
    return [];
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

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribeToDesktopQuery(onStoreChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerDesktopSnapshot() {
  return false;
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktopQuery,
    getDesktopSnapshot,
    getServerDesktopSnapshot,
  );
}

function subscribeNoop() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

/** True only after client hydration — mirrors the previous `mounted` state without setState-in-effect. */
function useMounted() {
  return useSyncExternalStore(subscribeNoop, getMountedSnapshot, getServerMountedSnapshot);
}

export default function VideoWidget() {
  const { menuOpen } = useMenuOpen();
  const mounted = useMounted();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();
  const defaultBottom = isDesktop ? DEFAULT_BOTTOM_DESKTOP : DEFAULT_BOTTOM_MOBILE;
  const [showMobileWidget, setShowMobileWidget] = useState(
    () => typeof window !== "undefined" && window.scrollY > 260,
  );
  const [footerLayout, setFooterLayout] = useState({
    bottom: DEFAULT_BOTTOM_MOBILE,
    blocked: false,
  });

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
    useTikTok && activeTikTok ? activeTikTok.ctaHref : brand.social.tiktok;

  const collapsedW = isDesktop ? 118 : 68;
  const collapsedH = isDesktop ? 210 : 120;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  // Разворачиваем в вертикальный формат 9:16, как на Lancaster.
  const expandedH = isDesktop ? Math.min(480, vh * 0.72) : Math.min(360, vh * 0.58);
  const expandedW = isDesktop
    ? Math.round(expandedH * (9 / 16))
    : Math.min(Math.round(expandedH * (9 / 16)), vw - 24);

  const goNext = useCallback(() => {
    if (!isTikTokMode || expanded) return;
    setActiveIndex((i) => (i + 1) % tiktokItems.length);
  }, [expanded, isTikTokMode, tiktokItems.length]);

  const selectStory = useCallback(
    (index: number) => {
      if (!isTikTokMode || tiktokItems.length === 0) return;
      setActiveIndex(((index % tiktokItems.length) + tiktokItems.length) % tiktokItems.length);
    },
    [isTikTokMode, tiktokItems.length],
  );

  const goPrevStory = useCallback(() => {
    if (!isTikTokMode) return;
    setActiveIndex((i) => (i - 1 + tiktokItems.length) % tiktokItems.length);
  }, [isTikTokMode, tiktokItems.length]);

  const goNextStory = useCallback(() => {
    if (!isTikTokMode) return;
    setActiveIndex((i) => (i + 1) % tiktokItems.length);
  }, [isTikTokMode, tiktokItems.length]);

  useEffect(() => {
    if (!isTikTokMode || dismissed || expanded) return;
    const timer = window.setInterval(goNext, videoWidget.rotateIntervalMs);
    return () => window.clearInterval(timer);
  }, [dismissed, expanded, goNext, isTikTokMode]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft") goPrevStory();
      if (e.key === "ArrowRight") goNextStory();
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
  }, [expanded, goNextStory, goPrevStory]);

  useEffect(() => {
    if (isDesktop) return;
    const updateVisibility = () => setShowMobileWidget(window.scrollY > 260);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [isDesktop]);

  useEffect(() => {
    const updateFooterLayout = () => {
      const footer = document.getElementById("site-footer");
      const baseBottom = isDesktop ? DEFAULT_BOTTOM_DESKTOP : DEFAULT_BOTTOM_MOBILE;

      if (!footer) {
        setFooterLayout({ bottom: baseBottom, blocked: false });
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      const widgetHeight = expanded ? expandedH : collapsedH;
      const totalHeight = widgetHeight + CLOSE_BUTTON_OVERHANG;

      if (footerTop >= viewportHeight) {
        setFooterLayout({ bottom: baseBottom, blocked: false });
        return;
      }

      const liftedBottom = viewportHeight - footerTop + FOOTER_GAP;
      const maxBottom = Math.max(baseBottom, viewportHeight - totalHeight - 8);

      if (liftedBottom > maxBottom) {
        setFooterLayout({ bottom: baseBottom, blocked: true });
        if (expanded) {
          setExpanded(false);
          setMuted(true);
        }
        return;
      }

      setFooterLayout({
        bottom: Math.max(baseBottom, Math.min(liftedBottom, maxBottom)),
        blocked: false,
      });
    };

    updateFooterLayout();
    window.addEventListener("scroll", updateFooterLayout, { passive: true });
    window.addEventListener("resize", updateFooterLayout);
    return () => {
      window.removeEventListener("scroll", updateFooterLayout);
      window.removeEventListener("resize", updateFooterLayout);
    };
  }, [collapsedH, expanded, expandedH, isDesktop]);

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

  if (
    !mounted ||
    !videoWidget.enabled ||
    dismissed ||
    menuOpen ||
    footerLayout.blocked ||
    (!isDesktop && !showMobileWidget)
  ) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        layout
        layoutRoot
        className="fixed z-[70]"
        style={{
          right: isDesktop ? 24 : 12,
          transformOrigin: "bottom right",
        }}
        initial={{ opacity: 0, y: 24, bottom: defaultBottom }}
        animate={{
          opacity: 1,
          y: 0,
          bottom: footerLayout.bottom,
          width: expanded ? expandedW : collapsedW,
          height: expanded ? expandedH : collapsedH,
        }}
        transition={{
          duration: EXPAND_MS,
          ease: EXPAND_EASE,
          bottom: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
        }}
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
              className="absolute -right-1.5 -top-1.5 z-30 inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone-900/90 text-white shadow-sm transition hover:bg-stone-950 md:h-7 md:w-7"
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
                    {useTikTok && tiktokItems.length > 1 ? (
                      <div className="pointer-events-auto absolute inset-x-0 bottom-2 flex justify-center gap-1.5 md:bottom-4">
                        {tiktokItems.map((item, i) => (
                          <button
                            key={item.videoId}
                            type="button"
                            aria-label={`Сторис ${i + 1}`}
                            aria-current={i === activeIndex ? "true" : undefined}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectStory(i);
                            }}
                            className={
                              "rounded-full transition-all " +
                              (i === activeIndex
                                ? "h-1.5 w-2.5 bg-white"
                                : "h-1.5 w-1.5 bg-white/40 hover:bg-white/70")
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
                    {useTikTok && tiktokItems.length > 1 ? (
                      <div className="absolute inset-x-0 top-20 bottom-24 z-[15] flex">
                        <button
                          type="button"
                          aria-label="Предыдущее видео"
                          onClick={goPrevStory}
                          className="w-2/5"
                        />
                        <div className="w-1/5" />
                        <button
                          type="button"
                          aria-label="Следующее видео"
                          onClick={goNextStory}
                          className="w-2/5"
                        />
                      </div>
                    ) : null}

                    <div className="absolute inset-x-0 top-0 z-30 flex items-start gap-1 px-3 pt-3">
                      {(useTikTok && tiktokItems.length > 1 ? tiktokItems : [null]).map(
                        (item, i) => (
                          <button
                            key={item?.videoId ?? i}
                            type="button"
                            aria-label={`Сторис ${i + 1}`}
                            aria-current={i === activeIndex ? "true" : undefined}
                            onClick={() => selectStory(i)}
                            className="group -my-3 flex flex-1 items-start py-3"
                          >
                            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/30 transition group-hover:bg-white/50">
                              <span
                                className={
                                  "block h-full rounded-full bg-white transition-all duration-300 " +
                                  (useTikTok && tiktokItems.length > 1
                                    ? i === activeIndex
                                      ? "w-full"
                                      : "w-0"
                                    : "w-full")
                                }
                              />
                            </span>
                          </button>
                        ),
                      )}
                    </div>

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pb-4 pt-7 md:px-5 md:pt-8">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                        <span className="font-serif text-[11px] tracking-[0.14em] text-red-600">
                          {brand.name}
                        </span>
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

                    <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-5 pt-16 md:px-5 md:pb-6">
                      <a
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={collapseWidget}
                        className="flex w-full items-center justify-center rounded-sm bg-black py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-900 md:text-xs"
                      >
                        {videoWidget.collectionLabel}
                      </a>
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