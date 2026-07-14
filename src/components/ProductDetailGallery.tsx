"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ProductImageAsset, Section } from "@/lib/types";
import { getColorFamilies } from "@/lib/color-taxonomy";
import { useT } from "@/lib/useI18n";
import { useOverlayA11y } from "@/hooks/useOverlayA11y";
import ProductImage from "./ProductImage";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function preloadSrc(src: string) {
  if (typeof window === "undefined" || !src) return;
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

function GalleryDots({
  count,
  activeIndex,
  onSelect,
  className,
}: {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  const t = useT();
  if (count < 2) return null;
  return (
    <div
      className={
        "absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3.5 py-2 shadow-[0_8px_28px_rgba(28,25,23,0.1)] backdrop-blur-md " +
        (className ?? "bottom-5")
      }
    >
      {Array.from({ length: count }, (_, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={`dot-${i}`}
            type="button"
            aria-label={`${t("common.photo")} ${i + 1}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(i)}
            className="group/dot flex h-5 w-5 items-center justify-center"
          >
            <span
              aria-hidden
              className={
                "block rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                (active
                  ? "h-[7px] w-7 bg-[#111] shadow-[0_1px_4px_rgba(17,17,17,0.28)]"
                  : "h-[7px] w-[7px] bg-[#111]/22 ring-1 ring-[#111]/12 group-hover/dot:bg-[#111]/40 group-hover/dot:ring-[#111]/25")
              }
            />
          </button>
        );
      })}
    </div>
  );
}

function GalleryLightbox({
  open,
  images,
  index,
  alts,
  title,
  onClose,
  onIndexChange,
}: {
  open: boolean;
  images: ProductImageAsset[];
  index: number;
  alts: string[];
  title: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const t = useT();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const pinchRef = useRef<{
    startDistance: number;
    startScale: number;
  } | null>(null);
  const panRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const lastTapRef = useRef(0);
  const syncingRef = useRef(false);

  useOverlayA11y({
    open,
    onClose,
    containerRef,
    initialFocusRef: closeRef,
  });

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [open, index]);

  useEffect(() => {
    if (!open || !scrollerRef.current) return;
    syncingRef.current = true;
    const width = scrollerRef.current.clientWidth || window.innerWidth;
    scrollerRef.current.scrollTo({ left: index * width, behavior: "auto" });
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  }, [open, index, images.length]);

  useEffect(() => {
    if (!open) return;
    const prev = images[index - 1]?.src;
    const next = images[index + 1]?.src;
    if (prev) preloadSrc(prev);
    if (next) preloadSrc(next);
  }, [open, index, images]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, nextIndex));
      if (clamped === index) return;
      resetZoom();
      onIndexChange(clamped);
    },
    [images.length, index, onIndexChange, resetZoom],
  );

  function onScrollerScroll() {
    if (syncingRef.current || scale > 1.01) return;
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth || 1;
    const next = Math.round(el.scrollLeft / width);
    if (next !== index && next >= 0 && next < images.length) {
      onIndexChange(next);
    }
  }

  function distance(
    a: Pick<React.Touch, "clientX" | "clientY">,
    b: Pick<React.Touch, "clientX" | "clientY">,
  ) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  }

  function onTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2) {
      pinchRef.current = {
        startDistance: distance(event.touches[0], event.touches[1]),
        startScale: scale,
      };
      panRef.current = null;
      return;
    }
    if (event.touches.length === 1 && scale > 1.01) {
      panRef.current = {
        startX: event.touches[0].clientX,
        startY: event.touches[0].clientY,
        originX: offset.x,
        originY: offset.y,
      };
    }
  }

  function onTouchMove(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2 && pinchRef.current) {
      event.preventDefault();
      const nextScale = Math.min(
        4,
        Math.max(
          1,
          (pinchRef.current.startScale * distance(event.touches[0], event.touches[1])) /
            Math.max(1, pinchRef.current.startDistance),
        ),
      );
      setScale(nextScale);
      if (nextScale <= 1.01) setOffset({ x: 0, y: 0 });
      return;
    }
    if (event.touches.length === 1 && panRef.current && scale > 1.01) {
      event.preventDefault();
      const dx = event.touches[0].clientX - panRef.current.startX;
      const dy = event.touches[0].clientY - panRef.current.startY;
      setOffset({
        x: panRef.current.originX + dx,
        y: panRef.current.originY + dy,
      });
    }
  }

  function onTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    if (event.touches.length < 2) pinchRef.current = null;
    if (event.touches.length === 0) panRef.current = null;
    if (scale < 1.05) resetZoom();
  }

  function onDoubleTapToggle() {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      if (scale > 1.05) resetZoom();
      else setScale(2.4);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  }

  if (!open || !portalReady) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[130] flex flex-col bg-black/92"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="text-[12px] font-medium tabular-nums tracking-[0.14em] text-white/70">
          {index + 1}/{images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("common.close")}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className={
          "flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
          (scale > 1.01 ? "overflow-x-hidden" : "")
        }
        onScroll={onScrollerScroll}
      >
        {images.map((image, i) => (
          <div
            key={`${image.src}-lightbox-${i}`}
            className="relative flex h-full w-full min-w-0 max-w-full flex-[0_0_100%] snap-center snap-always items-center justify-center overflow-hidden px-3"
            onClick={onDoubleTapToggle}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={
                "relative h-[min(88svh,88vh,920px)] w-full max-w-[min(100%,calc(88svh*0.8),calc(88vh*0.8))] " +
                (i === index && scale > 1.01 ? "touch-none" : "")
              }
              style={
                i === index
                  ? {
                      transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                      transition: pinchRef.current || panRef.current ? "none" : "transform 180ms ease-out",
                    }
                  : undefined
              }
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={alts[i] || title}
                  fill
                  unoptimized
                  sizes="100vw"
                  quality={90}
                  className="object-contain object-center"
                  draggable={false}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label={t("common.previousPhoto")}
            disabled={index <= 0}
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-30 md:flex"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label={t("common.nextPhoto")}
            disabled={index >= images.length - 1}
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-30 md:flex"
          >
            <ArrowIcon direction="right" />
          </button>
          <GalleryDots
            count={images.length}
            activeIndex={index}
            onSelect={goTo}
            className="bottom-[max(1.25rem,env(safe-area-inset-bottom))] border-white/20 bg-white/15"
          />
        </>
      ) : null}
    </div>,
    document.body,
  );
}

export default function ProductDetailGallery({
  images,
  imageIdx,
  onImageIdxChange,
  colorIdx,
  colorName,
  colorHex,
  section,
  localizedTitle,
  localizeAlt,
  galleryFit,
  canCycleColors,
  onCycleColor,
}: {
  images: ProductImageAsset[];
  imageIdx: number;
  onImageIdxChange: (index: number) => void;
  colorIdx: number;
  colorName: string;
  colorHex: string;
  section: Section;
  localizedTitle: string;
  localizeAlt: (alt: string) => string;
  galleryFit: "cover" | "contain";
  canCycleColors: boolean;
  onCycleColor: (direction: "prev" | "next") => void;
}) {
  const t = useT();
  const hasGallery = images.length > 1;
  const safeImageIdx = images.length ? Math.min(imageIdx, images.length - 1) : 0;
  const activeImage = images[safeImageIdx];
  const activeImageFit = activeImage?.fit ?? galleryFit;
  const mobileBackgroundBlend = getColorFamilies(colorName).includes("white")
    ? ""
    : " max-lg:mix-blend-darken";
  const galleryHoverClass =
    activeImageFit === "contain" ? "" : "transition-transform duration-700 group-hover:scale-[1.018]";

  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const syncingScrollRef = useRef(false);
  const tapRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const suppressClickRef = useRef(false);
  const scrollSuppressTimerRef = useRef<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const alts = images.map((image) => localizeAlt(image.alt) || localizedTitle);

  useEffect(() => {
    const prev = images[safeImageIdx - 1]?.src;
    const next = images[safeImageIdx + 1]?.src;
    if (prev) preloadSrc(prev);
    if (next) preloadSrc(next);
  }, [images, safeImageIdx]);

  useEffect(() => {
    const el = mobileScrollerRef.current;
    if (!el) return;

    const syncToIndex = (behavior: ScrollBehavior = "auto") => {
      syncingScrollRef.current = true;
      const width = el.clientWidth || window.innerWidth;
      el.scrollTo({ left: safeImageIdx * width, behavior });
      window.requestAnimationFrame(() => {
        syncingScrollRef.current = false;
      });
    };

    // Wait for layout — percentage flex widths can be wrong on the first paint.
    const frame = window.requestAnimationFrame(() => syncToIndex("auto"));
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => syncToIndex("auto"))
      : null;
    observer?.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
    // Only re-bind when color/gallery length changes; index sync is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorIdx, images.length]);

  useEffect(() => {
    const el = mobileScrollerRef.current;
    if (!el || syncingScrollRef.current) return;
    const width = el.clientWidth || 1;
    const target = safeImageIdx * width;
    if (Math.abs(el.scrollLeft - target) < 4) return;
    syncingScrollRef.current = true;
    el.scrollTo({ left: target, behavior: "smooth" });
    const timer = window.setTimeout(() => {
      syncingScrollRef.current = false;
    }, 320);
    return () => clearTimeout(timer);
  }, [safeImageIdx]);

  function onMobileScroll() {
    if (syncingScrollRef.current) return;
    const el = mobileScrollerRef.current;
    if (!el) return;
    suppressClickRef.current = true;
    if (scrollSuppressTimerRef.current != null) {
      window.clearTimeout(scrollSuppressTimerRef.current);
    }
    scrollSuppressTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = false;
      scrollSuppressTimerRef.current = null;
    }, 140);
    const width = el.clientWidth || 1;
    const next = Math.round(el.scrollLeft / width);
    if (next !== safeImageIdx && next >= 0 && next < images.length) {
      onImageIdxChange(next);
    }
  }

  function showDesktopImage(direction: "prev" | "next") {
    if (hasGallery) {
      onImageIdxChange(
        direction === "next"
          ? Math.min(safeImageIdx + 1, images.length - 1)
          : Math.max(safeImageIdx - 1, 0),
      );
      return;
    }
    if (canCycleColors) onCycleColor(direction);
  }

  function openLightboxFromTap(clientX: number, clientY: number) {
    const start = tapRef.current;
    tapRef.current = null;
    if (!start) return;
    const dt = Date.now() - start.t;
    const dx = clientX - start.x;
    const dy = clientY - start.y;
    // Ignore vertical page-scroll and horizontal carousel swipes.
    if (Math.abs(dy) > 12 && Math.abs(dy) >= Math.abs(dx)) return;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) return;
    const dist = Math.hypot(dx, dy);
    if (dt < 280 && dist < 12) {
      suppressClickRef.current = true;
      setLightboxOpen(true);
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  }

  function handleOpenClick() {
    if (suppressClickRef.current) return;
    setLightboxOpen(true);
  }

  const canNavigateDesktop = hasGallery || canCycleColors;
  const atStart = hasGallery ? safeImageIdx <= 0 : false;
  const atEnd = hasGallery ? safeImageIdx >= images.length - 1 : false;

  return (
    <>
      {/* Mobile: fixed-height contain frame.
          The image fills an explicitly inset box so Samsung Internet/Chrome never
          has to resolve intrinsic image dimensions against max-height. */}
      <div className="relative h-[min(78svh,78vh)] w-full min-w-0 max-w-full overflow-hidden rounded-2xl bg-[var(--background)] lg:hidden">
        {images.length > 0 ? (
          <div
            ref={mobileScrollerRef}
            className="flex h-full w-full min-w-0 max-w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-[pan-x_pan-y] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={onMobileScroll}
          >
            {images.map((image, i) => (
                <div
                  key={`${colorIdx}-${image.src}-${i}`}
                  role="button"
                  tabIndex={0}
                  aria-label={t("common.openPhoto")}
                  className="relative h-full w-full min-w-0 max-w-full flex-[0_0_100%] cursor-zoom-in snap-center snap-always bg-[var(--background)]"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleOpenClick();
                    }
                  }}
                  onTouchStart={(event) => {
                    const touch = event.changedTouches[0];
                    if (!touch) return;
                    tapRef.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };
                  }}
                  onTouchEnd={(event) => {
                    const touch = event.changedTouches[0];
                    if (!touch) return;
                    openLightboxFromTap(touch.clientX, touch.clientY);
                  }}
                  onClick={handleOpenClick}
                >
                  <div className="pointer-events-none absolute inset-x-3 bottom-12 top-3">
                    {image.src ? (
                      <Image
                        src={image.src}
                        alt={alts[i] || localizedTitle}
                        fill
                        unoptimized
                        sizes="85vw"
                        quality={85}
                        loading={i <= 1 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        className={"object-contain object-center " + mobileBackgroundBlend}
                        draggable={false}
                      />
                    ) : (
                      <ProductImage
                        hex={colorHex}
                        section={section}
                        alt={localizedTitle}
                        sizes="85vw"
                        imageClassName="object-contain object-center"
                        className="absolute inset-0"
                      />
                    )}
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-x-3 bottom-12 top-3">
            <ProductImage
              hex={colorHex}
              section={section}
              alt={localizedTitle}
              sizes="85vw"
              imageClassName="object-contain object-center"
              className="absolute inset-0"
            />
          </div>
        )}

        {hasGallery ? (
          <>
            <div className="pointer-events-none absolute right-4 top-4 z-20 text-[11px] font-medium tabular-nums tracking-[0.12em] text-[#111]/55">
              {safeImageIdx + 1}/{images.length}
            </div>
            <GalleryDots
              count={images.length}
              activeIndex={safeImageIdx}
              onSelect={onImageIdxChange}
            />
          </>
        ) : null}
      </div>

      {/* Desktop: single frame + arrows */}
      <div className="group relative hidden touch-pan-y items-center justify-center overflow-hidden rounded-2xl bg-[var(--background)] lg:flex lg:aspect-[4/5]">
        {activeImage?.src ? (
          <button
            type="button"
            aria-label={t("common.openPhoto")}
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-[3%] z-10 h-[94%] w-[94%]"
          >
            <Image
              src={activeImage.src}
              alt={alts[safeImageIdx] || localizedTitle}
              fill
              unoptimized
              sizes="41vw"
              quality={85}
              loading="eager"
              fetchPriority="high"
              className={
                "object-contain object-center " +
                (activeImageFit === "contain" ? "object-contain" : "object-cover object-center") +
                (galleryHoverClass ? ` ${galleryHoverClass}` : "")
              }
            />
          </button>
        ) : (
          <ProductImage
            hex={colorHex}
            section={section}
            alt={localizedTitle}
            sizes="50vw"
            imageClassName="object-contain object-center"
            className="absolute inset-[3%] z-10 h-[94%] w-[94%]"
          />
        )}

        {canNavigateDesktop ? (
          <>
            <button
              type="button"
              aria-label={t("common.previousPhoto")}
              disabled={hasGallery && atStart}
              onClick={() => showDesktopImage("prev")}
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4C8C0] bg-white/95 text-[#111] shadow-[0_3px_12px_rgba(28,25,23,0.12)] outline-none transition hover:bg-white hover:shadow-[0_5px_16px_rgba(28,25,23,0.16)] focus:outline-none focus-visible:outline-none disabled:cursor-default disabled:opacity-35"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label={t("common.nextPhoto")}
              disabled={hasGallery && atEnd}
              onClick={() => showDesktopImage("next")}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4C8C0] bg-white/95 text-[#111] shadow-[0_3px_12px_rgba(28,25,23,0.12)] outline-none transition hover:bg-white hover:shadow-[0_5px_16px_rgba(28,25,23,0.16)] focus:outline-none focus-visible:outline-none disabled:cursor-default disabled:opacity-35"
            >
              <ArrowIcon direction="right" />
            </button>

            <div className="absolute right-4 top-4 z-20 text-[11px] font-medium tabular-nums tracking-[0.12em] text-[#111]/55">
              {hasGallery
                ? `${safeImageIdx + 1}/${images.length}`
                : `${colorIdx + 1}`}
            </div>

            {hasGallery ? (
              <GalleryDots
                count={images.length}
                activeIndex={safeImageIdx}
                onSelect={onImageIdxChange}
              />
            ) : null}
          </>
        ) : null}
      </div>

      <GalleryLightbox
        open={lightboxOpen && images.length > 0}
        images={images}
        index={safeImageIdx}
        alts={alts}
        title={localizedTitle}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={onImageIdxChange}
      />
    </>
  );
}
