import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/config";
import { newProducts, products } from "@/lib/data";
import { getInstagramPosts } from "@/lib/instagram";
import HomeNewArrivals from "@/components/HomeNewArrivals";
import InstagramFeed from "@/components/InstagramFeed";
import ProductCard from "@/components/ProductCard";
import SocialIcon from "@/components/SocialIcon";
import TileVideo from "@/components/TileVideo";
import HeroBannerSlider, { type HeroSlide } from "@/components/HeroBannerSlider";
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

      {/* Подборка с баннером и товарами */}
      <section className="bg-[#f7f5f0] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
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

    </div>
  );
}