import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { bagCategories, productsBySection } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";

export const metadata: Metadata = { title: "Все сумки" };

export default async function BagsPage() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return (
    <CatalogView
      title={t("catalog.allBags")}
      description={t("catalog.bagsDescription")}
      products={productsBySection("bags")}
      categories={bagCategories}
      basePath="/bags"
      activeSlug="vse-sumki"
      crumbs={[{ label: categoryName("vse-sumki", "Все сумки", locale) }]}
      heroBanner={{
        src: "/banners/bags-all-hero.jpg",
        alt: "All bags SÓRA",
        width: 1024,
        height: 576,
        objectPosition: "50% 50%",
        copyTone: "light",
        bgClassName: "bg-[#c4b8a8]",
        fit: "full-width",
      }}
    />
  );
}