import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { getInstagramPosts } from "@/lib/instagram";
import InstagramFeed from "@/components/InstagramFeed";
import CapsuleProductCard from "@/components/CapsuleProductCard";
import HeroBannerSlider, { type HeroSlide } from "@/components/HeroBannerSlider";
import StoreExclusiveServices from "@/components/stores/StoreExclusiveServices";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { translate } from "@/lib/messages";

function getHeroSlides(locale: Locale): HeroSlide[] {
  const t = (key: string) => translate(locale, key);
  return [
    {
      type: "image",
      src: "/hero-sora-bamboo-studio-v3.jpg",
      mobileSrc: "/hero-sora-bamboo-studio-mobile.jpg",
      alt: t("home.heroBambooAlt"),
    },
    {
      type: "video",
      src: "/videos/venezia-intreccio-banner.mp4",
      caption: {
        title: t("catalog.veneziaCollection"),
        subtitle: t("catalog.veneziaCollectionDescription"),
        ctaLabel: t("home.veneziaCta"),
        ctaHref: withLocalePath("/collections/venezia-intreccio", locale),
      },
    },
  ];
}

const heroTiles: {
  labelKey: "nav.bags" | "nav.accessories";
  href: string;
  img: string;
}[] = [
  { labelKey: "nav.bags", href: "/bags", img: "/tile-sale.jpg" },
  { labelKey: "nav.accessories", href: "/accessories", img: "/tile-bags.jpg" },
];

const blueEditProductSlugs = [
  "womens-woven-spiral-panel-shoulder-tote-bag",
  "womens-woven-leather-zip-around-wallet",
  "womens-mustard-wave-silk-scarf",
  "sora-silk-bow-bag-charm",
];

const blueEditProducts = blueEditProductSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export default async function Home() {
  const [locale, t, instagramPosts] = await Promise.all([
    getServerLocale(),
    getServerT(),
    getInstagramPosts(),
  ]);
  return (
    <div>
      {/* Hero: Amalfi → Venezia Intreccio */}
      <HeroBannerSlider slides={getHeroSlides(locale)} intervalMs={4000} />

      {/* Плитки разделов: Сумки / Аксессуары */}
      <section className="mt-0 w-full">
        <div className="grid md:grid-cols-2">
          {heroTiles.map((tile) => (
            <Link
              key={tile.href}
              href={withLocalePath(tile.href, locale)}
              className="group relative block aspect-square w-full overflow-hidden bg-[#f3f0eb]"
            >
              <Image
                src={tile.img}
                alt={t(tile.labelKey)}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={86}
                className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30 group-focus-visible:bg-black/30" />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
                <span className="font-serif text-2xl font-normal uppercase tracking-[0.14em] drop-shadow-sm sm:text-3xl sm:leading-none">
                  {t(tile.labelKey)}
                </span>
                <span className="border border-white px-8 py-2.5 text-[10px] font-normal uppercase tracking-[0.28em] transition group-hover:bg-white/10 group-focus-visible:bg-white/10">
                  {t("common.openCollection")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Капсула: лайфстайл + 4 товара */}
      <section className="bg-[#f7f5f0] px-4 pt-20 pb-10 sm:px-6 lg:px-10 lg:pb-14">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          <Link
            href={withLocalePath("/collections/amalfi-woven", locale)}
            className="group relative aspect-[4/5] overflow-hidden bg-stone-100 lg:min-h-[620px] lg:aspect-auto"
          >
            <Image
              src="/banners/home-blue-edit-lifestyle-sharp-v2.png"
              alt={t("home.heroAmalfiAlt")}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              quality={100}
              unoptimized
              className="object-cover object-[55%_68%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </Link>

          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {blueEditProducts.map((product) => (
                <CapsuleProductCard key={product.slug} product={product} />
              ))}
            </div>
            <div className="mt-6 flex justify-center lg:justify-end">
              <Link
                href={withLocalePath("/capsule/blue", locale)}
                className="text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A] underline-offset-4 transition hover:underline"
              >
                {t("home.capsuleShopLook")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InstagramFeed
        posts={instagramPosts}
        title={t("home.instagramFeed")}
        hint={t("home.instagramFeedHint")}
      />

      <StoreExclusiveServices locale={locale} />

    </div>
  );
}