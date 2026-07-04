import Image from "next/image";
import { brand } from "@/lib/config";
import type { InstagramPost } from "@/lib/instagram";
import SocialIcon from "./SocialIcon";

function isRemoteImage(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function InstagramFeed({
  posts,
  title,
  hint,
}: {
  posts: InstagramPost[];
  title: string;
  hint: string;
}) {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mb-5 flex items-end justify-between gap-4 px-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            {title}
          </p>
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-2xl font-semibold tracking-tight text-stone-950 transition hover:text-stone-500"
          >
            @sora.italy
          </a>
        </div>
        <p className="hidden text-sm text-stone-500 sm:block">{hint}</p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-stone-700 shadow-sm md:grid">
          ‹
        </div>
        <div className="pointer-events-none absolute right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-stone-700 shadow-sm md:grid">
          ›
        </div>
        <div className="flex snap-x snap-mandatory overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram SÓRA ${index + 1}`}
              className="group relative aspect-square w-[42vw] min-w-[42vw] snap-start overflow-hidden bg-stone-100 sm:w-[28vw] sm:min-w-[28vw] lg:w-1/6 lg:min-w-[16.666%]"
            >
              {isRemoteImage(post.imageUrl) ? (
                <Image
                  src={post.imageUrl}
                  alt={post.caption || `SÓRA Instagram ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 42vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.imageUrl}
                  alt={post.caption || `SÓRA Instagram ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
              )}
              <span className="absolute inset-0 grid place-items-center text-white opacity-0 transition group-hover:opacity-100">
                <SocialIcon name="instagram" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
