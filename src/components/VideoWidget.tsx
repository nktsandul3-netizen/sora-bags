"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { brand, videoWidget, type VideoWidgetTikTokItem } from "@/lib/config";
import { useMenuOpen } from "@/context/menu-open";
import { parseTikTokVideoId } from "@/lib/tiktok";
import VideoLightbox from "@/components/VideoLightbox";

const EXPAND_EASE = [0.42, 0, 0.58, 1] as const;
const DEFAULT_BOTTOM_DESKTOP = 28;
const DEFAULT_BOTTOM_MOBILE = 72;
const FOOTER_GAP = 20;
const CLOSE_BUTTON_OVERHANG = 12;

type ResolvedTikTokItem = VideoWidgetTikTokItem & {
  videoId: string;
  ctaHref: string;
  shopHref: string;
};

function resolveTikTokItems(items: readonly VideoWidgetTikTokItem[]): ResolvedTikTokItem[] {
  return items.flatMap((item, index) => {
    const videoId = parseTikTokVideoId(item.url);
    const shopHref = item.collectionHref?.trim() || "/bags";
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
          shopHref,
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
          shopHref,
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
  return useSyncExternalStore(subscribeToDesktopQuery, getDesktopSnapshot, getServerDesktopSnapshot);
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
  const isDesktop = useIsDesktop();
  const defaultBottom = isDesktop ? DEFAULT_BOTTOM_DESKTOP : DEFAULT_BOTTOM_MOBILE;
  const [showMobileWidget, setShowMobileWidget] = useState(
    () => typeof window !== "undefined" && window.scrollY > 260,
  );
  const [footerLayout, setFooterLayout] = useState({
    bottom: DEFAULT_BOTTOM_MOBILE,
    blocked: false,
  });
  /** Hide floating stories widget while the hero banner is in view. */
  const [heroInView, setHeroInView] = useState(true);

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
  const tiktokUrl =
    useTikTok && activeTikTok ? activeTikTok.ctaHref : brand.social.tiktok;
  const shopHref =
    useTikTok && activeTikTok
      ? activeTikTok.shopHref
      : videoWidget.collectionHref || "/bags";

  const collapsedW = isDesktop ? 118 : 68;
  const collapsedH = isDesktop ? 210 : 120;

  const goNext = useCallback(() => {
    if (!isTikTokMode) return;
    setActiveIndex((i) => (i + 1) % tiktokItems.length);
  }, [isTikTokMode, tiktokItems.length]);

  const goPrev = useCallback(() => {
    if (!isTikTokMode) return;
    setActiveIndex((i) => (i - 1 + tiktokItems.length) % tiktokItems.length);
  }, [isTikTokMode, tiktokItems.length]);

  const selectStory = useCallback(
    (index: number) => {
      if (!isTikTokMode || tiktokItems.length === 0) return;
      setActiveIndex(((index % tiktokItems.length) + tiktokItems.length) % tiktokItems.length);
    },
    [isTikTokMode, tiktokItems.length],
  );

  useEffect(() => {
    if (!isTikTokMode || dismissed || expanded) return;
    const timer = window.setInterval(goNext, videoWidget.rotateIntervalMs);
    return () => window.clearInterval(timer);
  }, [dismissed, expanded, goNext, isTikTokMode]);

  useEffect(() => {
    if (isDesktop) return;
    const updateVisibility = () => setShowMobileWidget(window.scrollY > 260);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [isDesktop]);

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero) {
      setHeroInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(Boolean(entry?.isIntersecting)),
      { root: null, threshold: 0.08, rootMargin: "0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
      const totalHeight = collapsedH + CLOSE_BUTTON_OVERHANG;

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
  }, [collapsedH, expanded, isDesktop]);

  useEffect(() => {
    if (expanded) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        v.play().catch(() => {});
      });
    }
  }, [expanded, videoSrc, activeIndex]);

  function dismissWidget(e: React.MouseEvent) {
    e.stopPropagation();
    setExpanded(false);
    setDismissed(true);
  }

  function openLightbox() {
    setMuted(false);
    setExpanded(true);
  }

  function closeLightbox() {
    setMuted(true);
    setExpanded(false);
  }

  if (
    !mounted ||
    !videoWidget.enabled ||
    dismissed ||
    menuOpen ||
    footerLayout.blocked ||
    (!isDesktop && !showMobileWidget) ||
    (heroInView && !expanded)
  ) {
    return null;
  }

  return (
    <>
      {!expanded ? (
        <motion.div
          className="stories-widget fixed z-[70]"
          style={{
            right: isDesktop ? 24 : 12,
            transformOrigin: "bottom right",
          }}
          initial={{ opacity: 0, y: 24, bottom: defaultBottom }}
          animate={{
            opacity: 1,
            y: 0,
            bottom: footerLayout.bottom,
            width: collapsedW,
            height: collapsedH,
          }}
          transition={{
            duration: 0.4,
            ease: EXPAND_EASE,
            bottom: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          <div className="relative h-full w-full transition-transform duration-300 ease-out hover:scale-[1.03]">
            <button
              type="button"
              onClick={dismissWidget}
              aria-label="Закрыть виджет"
              className="absolute -right-1.5 -top-1.5 z-30 inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone-900/90 text-white shadow-sm transition hover:bg-stone-950 md:h-7 md:w-7"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15">
              <button
                type="button"
                onClick={openLightbox}
                aria-label={`Открыть ${cardTitle}`}
                className="absolute inset-0 z-10 cursor-pointer"
              />

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

              {useTikTok && tiktokItems.length > 1 ? (
                <div className="pointer-events-auto absolute inset-x-0 bottom-2 z-20 flex justify-center gap-1.5 md:bottom-3">
                  {tiktokItems.map((item, i) => (
                    <button
                      key={item.videoId}
                      type="button"
                      aria-label={`Видео ${i + 1}`}
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
            </div>
          </div>
        </motion.div>
      ) : null}

      <VideoLightbox
        open={expanded}
        onClose={closeLightbox}
        videoUrl={videoSrc}
        tiktokUrl={tiktokUrl}
        title={cardTitle}
        posterUrl={posterSrc}
        muted={muted}
        onMutedChange={setMuted}
        shopHref={shopHref}
        products={[]}
        activeIndex={activeIndex}
        videoCount={tiktokItems.length || 1}
        onPrev={goPrev}
        onNext={goNext}
        onSelect={selectStory}
      />
    </>
  );
}
