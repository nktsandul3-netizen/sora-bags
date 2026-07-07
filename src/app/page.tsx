import Link from "next/link";
import Image from "next/image";
import { newProducts, products } from "@/lib/data";
import { getInstagramPosts } from "@/lib/instagram";
import HomeNewArrivals from "@/components/HomeNewArrivals";
import InstagramFeed from "@/components/InstagramFeed";
import ProductCard from "@/components/ProductCard";
import HeroBannerSlider, { type HeroSlide } from "@/components/HeroBannerSlider";
import HomeStoryRails from "@/components/HomeStoryRails";
import StoreExclusiveServices from "@/components/stores/StoreExclusiveServices";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { withLocalePath, type Locale } from "@/lib/i18n";

const wovenBannerCopy: Record<Locale, { subtitle: string; ctaLabel: string }> = {
  ru: {
    subtitle: "Плетёные сумки в стиле итальянского побережья",
    ctaLabel: "Смотреть коллекцию",
  },
  ro: {
    subtitle: "Genți împletite în stilul coastei italiene",
    ctaLabel: "Vezi colecția",
  },
  en: {
    subtitle: "Woven bags inspired by the Italian coastline",
    ctaLabel: "View the collection",
  },
};

function getHeroSlides(locale: Locale): HeroSlide[] {
  const copy = wovenBannerCopy[locale] ?? wovenBannerCopy.ru;
  return [
    {
      type: "video",
      src: "/videos/home-banner-2.mp4",
      caption: {
        title: "Luxuriare Amalfi Collection",
        subtitle: copy.subtitle,
        ctaLabel: copy.ctaLabel,
        ctaHref: withLocalePath("/collections/amalfi-woven", locale),
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
  "womens-pebbled-leather-zip-hobo-bag",
  "womens-metallic-leather-bifold-cardholder-electric-blue",
  "womens-blue-multicolor-brushstroke-silk-scarf",
  "luma-silk-bow-bag-charm",
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
      {/* Hero: чередуются фото и видео каждые 5 секунд */}
      <HeroBannerSlider slides={getHeroSlides(locale)} />

      {/* Новинки */}
      <HomeNewArrivals products={newProducts.slice(0, 8)} />

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
                  {t("common.view")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Брендовый текст под плитками */}
      <section className="bg-white px-4 pt-12 pb-6 sm:px-6 sm:pt-14 sm:pb-8 lg:px-10 lg:pt-16 lg:pb-10">
        <div className="ml-[7cm] max-w-[520px]">
          <h2 className="text-[22px] font-bold uppercase text-stone-950 sm:text-2xl">
            {t("home.brandStoryTitle")}
          </h2>
          <div className="mt-4 space-y-3.5 text-[11px] font-normal leading-[1.55] text-stone-950 sm:text-xs sm:leading-[1.55]">
            <p>{t("home.brandStory1")}</p>
            <p>{t("home.brandStory3")}</p>
          </div>
        </div>

        <HomeStoryRails className="mt-2" />
      </section>

      {/* Подборка с баннером и товарами */}
      <section className="bg-[#f7f5f0] px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-8 lg:pb-14">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-6">
          <Link
            href={withLocalePath("/product/womens-pebbled-leather-kiss-lock-pouch-bag-light-blue", locale)}
            className="group relative min-h-[420px] overflow-hidden rounded-[28px] bg-stone-100 sm:min-h-[560px] lg:min-h-[760px]"
          >
            <Image
              src="/banners/home-blue-edit-lifestyle-sharp-v2.png"
              alt="Голубой акцент — образ с сумкой и платком"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              quality={100}
              unoptimized
              className="object-cover object-center"
            />
          </Link>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10">
            {blueEditProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
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