"use client";

import dynamic from "next/dynamic";
import type { InstagramPost } from "@/lib/instagram";
import type { Locale } from "@/lib/i18n";

const InstagramFeed = dynamic(() => import("@/components/InstagramFeed"), {
  ssr: false,
  loading: () => (
    <section className="bg-[#f7f5f0] px-4 py-12 sm:px-6 sm:pt-14 sm:pb-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="h-8 w-48 animate-pulse rounded bg-stone-200/80" />
        <div className="mt-8 flex gap-4 overflow-hidden md:grid md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] w-[66%] max-w-[280px] shrink-0 animate-pulse rounded-xl bg-stone-200/70 md:w-auto md:max-w-none"
            />
          ))}
        </div>
      </div>
    </section>
  ),
});

const StoreExclusiveServices = dynamic(
  () => import("@/components/stores/StoreExclusiveServices"),
  {
    ssr: false,
    loading: () => (
      <section className="bg-white px-4 py-12">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-stone-100" />
          ))}
        </div>
      </section>
    ),
  },
);

export default function HomeBelowFold({
  posts,
  locale,
  instagramTitle,
  instagramHint,
}: {
  posts: InstagramPost[];
  locale: Locale;
  instagramTitle: string;
  instagramHint: string;
}) {
  return (
    <>
      <InstagramFeed posts={posts} title={instagramTitle} hint={instagramHint} />
      <StoreExclusiveServices locale={locale} />
    </>
  );
}
