import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { productsBySection, shopAccessoryMenuCategories } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("catalog.allAccessories") };
}

export default async function AccessoriesPage() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return (
    <CatalogView
      title={t("catalog.allAccessories")}
      description={t("catalog.accessoriesDescription")}
      products={productsBySection("accessories")}
      categories={shopAccessoryMenuCategories}
      basePath="/accessories"
      activeSlug="vse-aksessuary"
      crumbs={[{ label: categoryName("vse-aksessuary", t("catalog.allAccessories"), locale) }]}
    />
  );
}