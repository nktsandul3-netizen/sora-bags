"use client";

import { brand } from "@/lib/config";
import type { InstagramPost } from "@/lib/instagram";
import { useT } from "@/lib/useI18n";

function instagramHandle(url: string) {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  return match?.[1] ? `@${match[1]}` : "@sora.italy";
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm9.7 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

export default function InstagramFeed({
  posts,
}: {
  posts: InstagramPost[];
  title?: string;
  hint?: string;
}) {
  const t = useT();
  const handle = instagramHandle(brand.social.instagram);
  const items = posts.slice(0, 5);

  return (
    <section
      id="home-instagram"
      className="bg-[#f7f5f0] px-4 py-12 sm:px-6 sm:pt-14 sm:pb-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[#1A1A1A] sm:text-[32px]">
              {t("home.instagramTitle")}
            </h2>
            <p className="mt-2 text-[16px] font-normal text-[#6B7280]">{handle}</p>
          </div>

          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-full items-center justify-center gap-2 border border-[#1A1A1A] bg-transparent px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1A1A1A] outline-none transition hover:bg-white focus:outline-none focus-visible:outline-none focus-visible:ring-0 md:w-auto"
          >
            <InstagramGlyph className="h-4 w-4" />
            {t("home.instagramFollow")}
          </a>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:snap-none lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {items.map((post) => {
            const href = post.videoUrl || post.permalink || brand.social.instagram;
            const src = post.previewUrl || post.imageUrl || "";
            const alt = post.alt || post.caption || "SÓRA Instagram";

            return (
              <a
                key={post.id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={alt}
                className="group relative aspect-[4/5] w-[66%] max-w-[280px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl bg-stone-200 md:w-auto md:max-w-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  width={480}
                  height={600}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)",
                  }}
                />
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center border border-[#1A1A1A]/20 bg-white px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[#1A1A1A] transition hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
          >
            {t("home.instagramSeeMore")}
          </a>
        </div>
      </div>
    </section>
  );
}
