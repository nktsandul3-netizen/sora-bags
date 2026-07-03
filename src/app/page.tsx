import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/config";
import { newProducts } from "@/lib/data";
import { getInstagramPosts } from "@/lib/instagram";
import HomeNewArrivals from "@/components/HomeNewArrivals";
import SocialIcon from "@/components/SocialIcon";
import TileVideo from "@/components/TileVideo";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { withLocalePath } from "@/lib/i18n";

const heroTiles: {
  labelKey: "nav.new" | "nav.bags" | "nav.accessories";
  href: string;
  img: string;
  video?: string;
}[] = [
  { labelKey: "nav.new", href: "/new", img: "/tile-new-orange-arch.png" },
  { labelKey: "nav.bags", href: "/bags", img: "/tile-bags-2.jpg" },
  {
    labelKey: "nav.accessories",
    href: "/accessories",
    img: "/tile-accessories.png",
    video: "/tile-accessories.mp4",
  },
];

export default async function Home() {
  const [locale, t, instagramPosts] = await Promise.all([
    getServerLocale(),
    getServerT(),
    getInstagramPosts(6),
  ]);
  return (
    <div>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-stone-100">
        <Image
          src="/hero-amalfi-terrace-hq.jpg"
          alt={brand.name}
          width={2400}
          height={1600}
          priority
          quality={100}
          sizes="100vw"
          className="h-auto w-full object-contain [filter:brightness(0.78)_saturate(0.72)_contrast(0.98)]"
        />
      </section>

      {/* Плитки разделов: Новинки / Сумки / Аксессуары */}
      <section className="mt-0 w-full">
        <div className="grid gap-0 md:grid-cols-3">
          {heroTiles.map((tile) => (
            <Link
              key={tile.href}
              href={withLocalePath(tile.href, locale)}
              className="group relative flex h-[48vh] min-h-[340px] items-center justify-center overflow-hidden sm:h-[54vh] sm:min-h-[390px] md:h-[92vh] md:min-h-[680px]"
            >
              <Image
                src={tile.img}
                alt={t(tile.labelKey)}
                width={1024}
                height={1280}
                sizes="(min-width: 768px) 33vw, 100vw"
                quality={86}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 [filter:brightness(0.88)_saturate(0.8)_contrast(1)]"
              />
              {tile.video ? (
                <TileVideo
                  src={tile.video}
                  poster={tile.img}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 [filter:brightness(0.88)_saturate(0.8)_contrast(1)]"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30 group-focus-visible:bg-black/30" />
              <div className="relative flex flex-col items-center gap-5 text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
                <span className="font-serif text-2xl font-normal uppercase tracking-[0.14em] drop-shadow-sm sm:text-3xl sm:leading-none">
                  {t(tile.labelKey)}
                </span>
                <span className="border border-white px-8 py-2.5 text-[10px] font-normal uppercase tracking-[0.28em] transition group-hover:bg-white/10 group-focus-visible:bg-white/10">
                  {t("common.view")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Новинки */}
      <HomeNewArrivals products={newProducts.slice(0, 8)} />

      {/* Соцсети / мессенджеры */}
      <section className="relative flex min-h-[calc(360px+6cm)] w-full items-center justify-center overflow-hidden sm:min-h-[calc(460px+6cm)]">
        <Image
          src="/social.jpg"
          alt={`${brand.name} в соцсетях`}
          width={1024}
          height={485}
          sizes="100vw"
          quality={90}
          className="absolute inset-0 h-full w-full object-cover [filter:brightness(0.86)_saturate(0.78)_contrast(1)]"
        />
        <div className="absolute inset-0 bg-black/28" />
        <div className="relative flex flex-col items-center px-4 text-center text-white">
          <h2 className="font-serif text-3xl tracking-wide drop-shadow sm:text-4xl">
            {t("home.messengers")}
          </h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            {t("home.follow")}
          </p>
          <div className="mt-6 flex items-center gap-4">
            {[
              { name: "whatsapp" as const, href: brand.social.whatsapp, label: "WhatsApp" },
              { name: "telegram" as const, href: brand.social.telegram, label: "Telegram" },
              { name: "facebook" as const, href: brand.social.facebook, label: "Facebook" },
              { name: "tiktok" as const, href: brand.social.tiktok, label: "TikTok" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-[1px] transition hover:bg-white hover:text-stone-950"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mb-5 flex items-end justify-between gap-4 px-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              {t("home.instagramFeed")}
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
          <p className="hidden text-sm text-stone-500 sm:block">{t("home.instagramFeedHint")}</p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-stone-700 shadow-sm md:grid">
            ‹
          </div>
          <div className="pointer-events-none absolute right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-stone-700 shadow-sm md:grid">
            ›
          </div>
          <div className="flex snap-x snap-mandatory overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {instagramPosts.map((post, index) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram SÓRA ${index + 1}`}
                className="group relative aspect-square w-[42vw] min-w-[42vw] snap-start overflow-hidden bg-stone-100 sm:w-[28vw] sm:min-w-[28vw] lg:w-1/6 lg:min-w-[16.666%]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.caption || `SÓRA Instagram ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <span className="absolute inset-0 grid place-items-center text-white opacity-0 transition group-hover:opacity-100">
                  <SocialIcon name="instagram" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}