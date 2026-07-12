import Image from "next/image";
import type { Section } from "@/lib/types";

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(((n >> 16) & 0xff) + amt);
  const g = clamp(((n >> 8) & 0xff) + amt);
  const b = clamp((n & 0xff) + amt);
  return `rgb(${r}, ${g}, ${b})`;
}

function BagGlyph() {
  return (
    <svg viewBox="0 0 120 120" className="h-2/5 w-2/5" aria-hidden>
      <path
        d="M30 48h60l-6 50a8 8 0 0 1-8 7H44a8 8 0 0 1-8-7L30 48Z"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
      />
      <path
        d="M44 48v-8a16 16 0 0 1 32 0v8"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WalletGlyph() {
  return (
    <svg viewBox="0 0 120 120" className="h-2/5 w-2/5" aria-hidden>
      <rect
        x="26"
        y="40"
        width="68"
        height="44"
        rx="8"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
      />
      <rect
        x="70"
        y="56"
        width="24"
        height="14"
        rx="4"
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}

export default function ProductImage({
  hex,
  section,
  className = "",
  src,
  alt = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  imageClassName = "object-cover object-center",
  unoptimized = false,
  quality = 75,
  priority = false,
}: {
  hex: string;
  section: Section;
  className?: string;
  src?: string;
  alt?: string;
  sizes?: string;
  imageClassName?: string;
  unoptimized?: boolean;
  quality?: number;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-[#FAF5EF] ${className}`}>
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          unoptimized={unoptimized}
          className={imageClassName}
        />
      </div>
    );
  }

  const from = shade(hex, 28);
  const to = shade(hex, -34);
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(120%_80%_at_30%_10%,white,transparent_55%)]" />
      {section === "bags" ? <BagGlyph /> : <WalletGlyph />}
    </div>
  );
}