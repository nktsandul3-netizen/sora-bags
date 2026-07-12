import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import {
  bagCategories,
  getCategory,
  productsByCategory,
  shopBagMenuCategories,
} from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName, categoryHeroCopy } from "@/lib/catalog-i18n";
import type { Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

const bagHeroConfigs: Record<
  string,
  {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition: string;
    copyTone?: "light" | "dark";
    bgClassName?: string;
    fit?: "cover" | "contain" | "full-width";
    aspectClass?: string;
    copyOverlayClass?: string;
    mediaFilterClass?: string;
  }
> = {
  clutches: {
    src: "/banners/clutches-hero-v2.jpg",
    alt: "Clutches SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 42%",
    copyTone: "light",
    bgClassName: "bg-[#c8c0b8]",
    aspectClass: "max-md:aspect-[5/3] max-md:h-auto md:h-[max(180px,calc(100vw*576/1024-4cm))]",
  },
  vanity: {
    src: "/banners/vanity-hero-v2.jpg",
    alt: "Vanity SÓRA",
    width: 2560,
    height: 1027,
    objectPosition: "50% 50%",
    copyTone: "light",
    bgClassName: "bg-[#e3dddd]",
    fit: "full-width",
  },
  "bucket-bags-women": {
    src: "/banners/bucket-bags-hero-v5.jpg",
    alt: "Bucket bags SÓRA",
    width: 2560,
    height: 1440,
    objectPosition: "50% 50%",
    copyTone: "light",
    bgClassName: "bg-[#6a8a9a]",
    fit: "full-width",
  },
  "bowling-bags": {
    src: "/banners/bowling-bags-hero-v2.jpg",
    alt: "Bowling bags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 42%",
    copyTone: "light",
    bgClassName: "bg-[#c8b8a8]",
    aspectClass: "max-md:aspect-[5/3] max-md:h-auto md:h-[max(180px,calc(100vw*576/1024-4cm))]",
  },
  "handbags-women": {
    src: "/banners/handbags-women-hero.jpg",
    alt: "Handbags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 42%",
    copyTone: "light",
    bgClassName: "bg-[#8a9580]",
    aspectClass: "max-md:aspect-[5/3] max-md:h-auto md:h-[max(180px,calc(100vw*576/1024-4cm))]",
  },
  "rectangular-bags": {
    src: "/banners/rectangular-bags-hero.jpg",
    alt: "Rectangular bags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 50%",
    copyTone: "light",
    bgClassName: "bg-[#b8b0a0]",
    fit: "full-width",
  },
  "tote-bags-women": {
    src: "/banners/tote-bags-women-hero-v2.jpg",
    alt: "Tote bags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 46%",
    copyTone: "light",
    bgClassName: "bg-[#6a7568]",
    aspectClass: "max-md:aspect-[5/3] max-md:h-auto md:h-[max(180px,calc(100vw*576/1024-2cm))]",
  },
  "shoulder-bags-women": {
    src: "/banners/shoulder-bags-women-hero-v3.jpg",
    alt: "Shoulder bags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 58%",
    copyTone: "light",
    bgClassName: "bg-[#a8a4a0]",
    aspectClass: "max-md:aspect-[5/3] max-md:h-auto md:h-[max(180px,calc(100vw*576/1024-2cm))]",
  },
  "crossbody-bags-women": {
    src: "/banners/crossbody-bags-women-hero-v2.jpg",
    alt: "Crossbody bags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 50%",
    copyTone: "light",
    bgClassName: "bg-[#7a7570]",
    fit: "full-width",
  },
  "clutch-evening": {
    src: "/banners/clutches-hero-v2.jpg",
    alt: "Clutch and evening bags SÓRA",
    width: 1024,
    height: 576,
    objectPosition: "50% 42%",
    copyTone: "light",
    bgClassName: "bg-[#c8c0b8]",
    aspectClass: "max-md:aspect-[5/3] max-md:h-auto md:h-[max(180px,calc(100vw*576/1024-4cm))]",
  },
};

function getBagHeroBanner(slug: string, locale: Locale) {
  const config = bagHeroConfigs[slug];
  if (!config) return undefined;
  return {
    ...config,
    copy: categoryHeroCopy(slug, locale),
  };
}

const bagRouteSlugs = Array.from(
  new Set([
    ...bagCategories.map((c) => c.slug),
    ...shopBagMenuCategories.map((c) => c.slug),
  ]),
);

export function generateStaticParams() {
  return bagRouteSlugs
    .filter((slug) => slug !== "vse-sumki")
    .map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const cat = getCategory(type);
  const title = cat ? categoryName(cat.slug, cat.name, locale) : t("nav.bags");
  const hero = cat ? categoryHeroCopy(cat.slug, locale) : null;
  return buildPageMetadata({
    path: `/bags/${type}`,
    locale,
    title,
    description:
      hero?.description ??
      (locale === "ro"
        ? `${title} din piele italiană — livrare în Moldova.`
        : locale === "en"
          ? `${title} in Italian leather — delivery across Moldova.`
          : `${title} из итальянской кожи — доставка по Молдове.`),
  });
}

export default async function BagTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const locale = await getServerLocale();
  const cat = getCategory(type);
  if (!cat || cat.section !== "bags") notFound();
  const label = categoryName(cat.slug, cat.name, locale);

  return (
    <CatalogView
      title={label}
      products={productsByCategory(cat.slug)}
      categories={shopBagMenuCategories}
      basePath="/bags"
      activeSlug={cat.slug}
      crumbs={[{ label: categoryName("vse-sumki", "Все сумки", locale), href: "/bags" }, { label }]}
      heroBanner={getBagHeroBanner(cat.slug, locale)}
    />
  );
}
