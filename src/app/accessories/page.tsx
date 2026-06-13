import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { accessoryCategories, productsBySection } from "@/lib/data";

export const metadata: Metadata = { title: "Все аксессуары" };

export default function AccessoriesPage() {
  return (
    <CatalogView
      title="Все аксессуары"
      description="Кошельки, картхолдеры, ремни и другие аксессуары из натуральной кожи."
      products={productsBySection("accessories")}
      categories={accessoryCategories}
      basePath="/accessories"
      activeSlug="vse-aksessuary"
      crumbs={[{ label: "Аксессуары" }]}
    />
  );
}