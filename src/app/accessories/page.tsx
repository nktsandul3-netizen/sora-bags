import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { accessoryCategories, productsBySection } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";

export const metadata: Metadata = { title: "Все аксессуары" };

export default async function AccessoriesPage() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return (
    <CatalogView
      title={t("catalog.allAccessories")}
      description={t("catalog.accessoriesDescription")}
      products={productsBySection("accessories")}
      categories={accessoryCategories}
      basePath="/accessories"
      activeSlug="vse-aksessuary"
      crumbs={[{ label: categoryName("vse-aksessuary", "Все аксессуары", locale) }]}
    />
  );
}