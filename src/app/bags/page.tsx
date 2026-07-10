import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { productsBySection, shopBagMenuCategories } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("catalog.allBags") };
}

export default async function BagsPage() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return (
    <CatalogView
      title={t("catalog.allBags")}
      description={t("catalog.bagsDescription")}
      products={productsBySection("bags")}
      categories={shopBagMenuCategories}
      basePath="/bags"
      activeSlug="vse-sumki"
      crumbs={[{ label: categoryName("vse-sumki", t("catalog.allBags"), locale) }]}
      heroBanner={{
        src: "/banners/bags-all-hero.jpg",
        alt: t("home.bagsHeroAlt"),
        width: 963,
        height: 616,
        objectPosition: "50% 0%",
        copyTone: "light",
        bgClassName: "bg-[#c4b8a8]",
        aspectClass: "h-[max(120px,calc(100vw*616/963-4cm))]",
        mediaFilterClass: "catalog-hero-media-bags",
        topScrim: true,
      }}
    />
  );
}
