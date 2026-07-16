import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { brand } from "@/lib/config";
import { getInstagramPosts } from "@/lib/instagram";
import CapsuleProductCard from "@/components/CapsuleProductCard";
import BenefitsBar from "@/components/BenefitsBar";
import HeroBannerSlider, { type HeroSlide } from "@/components/HeroBannerSlider";
import HomeBelowFold from "@/components/HomeBelowFold";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { translate } from "@/lib/messages";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const title = `${brand.name} — ${t("brand.tagline")}`;
  return buildPageMetadata({
    path: "/",
    locale,
    title,
    description: t("brand.description"),
    absoluteTitle: true,
  });
}

function getHeroSlides(locale: Locale): HeroSlide[] {
  const t = (key: string) => translate(locale, key);
  return [
    {
      type: "image",
      src: "/hero-sora-bamboo-studio-v6.jpg",
      mobileSrc: "/hero-sora-bamboo-studio-mobile-v3.jpg",
      width: 2560,
      height: 1280,
      mobileWidth: 1400,
      mobileHeight: 875,
      objectPosition: "50% 50%",
      mobileObjectPosition: "50% 50%",
      alt: t("home.heroBambooAlt"),
      caption: {
        layout: "brand",
        ctaLabel: t("home.heroMainCta"),
        ctaHref: withLocalePath("/bags", locale),
      },
    },
    {
      type: "video",
      src: "/videos/venezia-intreccio-banner-opt.mp4",
      mobileSrc: "/videos/venezia-intreccio-banner-mobile.mp4",
      poster: "/hero-venezia-banner-poster.jpg",
      mobilePoster: "/hero-venezia-banner-poster-mobile-v2.jpg",
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
  { labelKey: "nav.bags", href: "/bags", img: "/tile-sale-mobile.jpg" },
  { labelKey: "nav.accessories", href: "/accessories", img: "/tile-bags-mobile.jpg" },
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

      <BenefitsBar
        label={t("home.benefitsBarLabel")}
        items={[
          t("home.benefitLeather"),
          t("home.benefitDesign"),
          t("home.benefitDurable"),
          t("home.benefitMadeInItaly"),
        ]}
      />

      {/* Плитки разделов: Сумки / Аксессуары */}
      <section className="mt-3 w-full md:mt-2">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-2">
          {heroTiles.map((tile) => (
            <Link
              key={tile.href}
              href={withLocalePath(tile.href, locale)}
              className="group relative block aspect-[3/4] w-full touch-manipulation overflow-hidden bg-[#f3f0eb] md:aspect-square"
            >
              <Image
                src={tile.img}
                alt={t(tile.labelKey)}
                fill
                sizes="(max-width: 767px) 50vw, 50vw"
                quality={75}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35 group-focus-visible:bg-black/35" />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-2.5 text-white sm:gap-3 sm:px-3 md:gap-5 md:px-4">
                <span className="text-center font-serif text-[15px] font-normal uppercase leading-none tracking-[0.1em] drop-shadow-sm xs:text-[17px] sm:text-2xl sm:tracking-[0.12em] md:text-3xl md:tracking-[0.14em]">
                  {t(tile.labelKey)}
                </span>
                <span className="max-w-full truncate border border-white bg-[rgba(255,255,255,0.14)] px-2.5 py-1.5 text-[7px] font-normal uppercase tracking-[0.14em] backdrop-blur-md transition group-hover:bg-white/20 group-focus-visible:bg-white/20 xs:text-[8px] xs:tracking-[0.16em] sm:px-5 sm:py-2.5 sm:text-[9px] sm:tracking-[0.2em] md:px-8 md:py-2.5 md:text-[10px] md:tracking-[0.28em]">
                  {t("common.openCollection")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Капсула: лайфстайл + 4 товара */}
      <section className="bg-[#f7f5f0] px-4 pt-2 pb-10 sm:px-6 md:pt-16 lg:px-10 lg:pt-20 lg:pb-14">
        <div className="grid gap-8 md:gap-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          <Link
            href={withLocalePath("/collections/amalfi-woven", locale)}
            className="group relative aspect-[4/5] touch-manipulation overflow-hidden bg-stone-100 lg:min-h-[620px] lg:aspect-auto"
          >
            <Image
              src="/banners/home-blue-edit-lifestyle-sharp-v2.jpg"
              alt={t("home.heroAmalfiAlt")}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              quality={82}
              loading="lazy"
              fetchPriority="low"
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

      <HomeBelowFold
        posts={instagramPosts}
        locale={locale}
        instagramTitle={t("home.instagramFeed")}
        instagramHint={t("home.instagramFeedHint")}
      />

    </div>
  );
}