"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

export type VideoLightboxProduct = {
  slug: string;
  title?: string;
};

type VideoLightboxProps = {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  tiktokUrl: string;
  products?: VideoLightboxProduct[];
  title?: string;
  posterUrl?: string;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
  /** Primary shop CTA href (product or collection). */
  shopHref?: string;
  /** Carousel: current index among multiple videos. */
  activeIndex?: number;
  videoCount?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onSelect?: (index: number) => void;
};

function trackTikTokClick() {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };
  try {
    w.gtag?.("event", "click_tiktok_from_lightbox");
  } catch {
    // ignore
  }
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "click_tiktok_from_lightbox" });
  } catch {
    // ignore
  }
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SoundOnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path
        d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
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

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.5 2.5 0 1 1-1.78-2.39V9.83a5.62 5.62 0 1 0 4.88 5.57V9.01a7.3 7.3 0 0 0 4.27 1.37V7.28a4.27 4.27 0 0 1-3.22-1.46Z" />
    </svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VideoLightbox({
  open,
  onClose,
  videoUrl,
  tiktokUrl,
  products = [],
  title = "SÓRA",
  posterUrl,
  muted,
  onMutedChange,
  shopHref,
  activeIndex = 0,
  videoCount = 1,
  onPrev,
  onNext,
  onSelect,
}: VideoLightboxProps) {
  const locale = useLocale();
  const t = useT();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const primaryProduct = products[0];
  const hasCarousel = videoCount > 1;
  const buyHref = shopHref
    ? withLocalePath(shopHref, locale)
    : primaryProduct
      ? withLocalePath(`/product/${primaryProduct.slug}`, locale)
      : withLocalePath("/bags", locale);

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
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !open) return;
    video.muted = muted;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        video.muted = true;
        onMutedChange(true);
        video.play().catch(() => {});
      });
    }
  }, [open, muted, videoUrl, onMutedChange]);

  if (!open) return null;

  function openTikTok(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    trackTikTokClick();
    window.open(tiktokUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6"
      style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(16px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button type="button" aria-label={t("common.close")} className="absolute inset-0 cursor-default" onClick={onClose} />

      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.close")}
        className="absolute right-6 top-6 z-30 text-white transition hover:opacity-70"
      >
        <CloseIcon className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => onMutedChange(!muted)}
        aria-label={muted ? t("a11y.unmute") : t("a11y.mute")}
        className="absolute right-5 top-[4.25rem] z-30 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
      >
        {muted ? <SoundOffIcon className="h-4 w-4" /> : <SoundOnIcon className="h-4 w-4" />}
      </button>

      <div className="relative z-10 flex w-full max-w-[920px] flex-col items-stretch gap-5 md:flex-row md:items-end md:gap-8">
        <div className="relative mx-auto aspect-[9/16] h-[min(92svh,720px)] max-h-[92svh] w-auto max-w-[min(100%,calc(92svh*9/16))] overflow-hidden rounded-2xl bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:mx-0">
          <video
            ref={videoRef}
            key={videoUrl}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
          />
          {/* Soft top/bottom veil — hides baked-in captions without covering the product */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black/45 to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/50 to-transparent"
          />

          {hasCarousel ? (
            <>
              <button
                type="button"
                aria-label={t("a11y.previousVideo")}
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev?.();
                }}
                className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={t("a11y.nextVideo")}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        <aside className="flex w-full flex-col justify-between md:h-[min(85vh,720px)] md:w-[340px] md:shrink-0">
          <div className="px-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">SÓRA</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white md:text-[24px]">
              {title}
            </h2>
            {hasCarousel ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: videoCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={t("a11y.videoNumber").replace("{number}", String(i + 1))}
                      aria-current={i === activeIndex ? "true" : undefined}
                      onClick={() => onSelect?.(i)}
                      className={
                        "rounded-full transition-all " +
                        (i === activeIndex
                          ? "h-1.5 w-6 bg-white"
                          : "h-1.5 w-1.5 bg-white/35 hover:bg-white/70")
                      }
                    />
                  ))}
                  <span className="ml-1 text-[12px] text-white/45">
                    {activeIndex + 1} / {videoCount}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext?.();
                  }}
                  className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.02em] text-white/80 transition hover:text-white"
                >
                  Переключить видео
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}
            {products.length > 0 ? (
              <ul className="mt-4 space-y-1.5">
                {products.slice(0, 3).map((product) => (
                  <li key={product.slug} className="text-[13px] text-white/55">
                    {product.title ?? product.slug}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:mt-auto">
            <Link
              href={buyHref}
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center bg-white text-[13px] font-medium tracking-[0.04em] text-[#1A1A1A] transition hover:bg-stone-100"
            >
              {t("common.buyLook")}
            </Link>

            <button
              type="button"
              onClick={openTikTok}
              className="flex h-11 w-full items-center justify-center gap-2 border border-white/20 bg-transparent text-[14px] font-normal text-white/70 transition hover:border-white/40 hover:text-white"
            >
              <TikTokIcon className="h-4 w-4" />
              {t("common.viewTikTok")}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
