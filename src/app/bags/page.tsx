import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { bagCategories, productsBySection } from "@/lib/data";

export const metadata: Metadata = { title: "Все сумки" };

export default function BagsPage() {
  return (
    <CatalogView
      title="Все сумки"
      description="Сумки из натуральной кожи: на каждый день, для работы и для особых случаев."
      products={productsBySection("bags")}
      categories={bagCategories}
      basePath="/bags"
      activeSlug="vse-sumki"
      crumbs={[{ label: "Сумки" }]}
    />
  );
}