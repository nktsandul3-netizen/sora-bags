"use client";

import { useEffect, useRef, useState } from "react";

export default function TileVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // iOS Safari требует, чтобы muted стоял как свойство (а не только атрибут),
    // иначе автоплей блокируется.
    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onCanPlay = () => {
      setReady(true);
      tryPlay();
    };

    v.addEventListener("canplay", onCanPlay);
    // Запускаем при появлении в зоне видимости (экономит трафик на телефоне).
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);

    tryPlay();

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      io.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      src={src}
      data-ready={ready ? "true" : "false"}
      className={className}
    />
  );
}
