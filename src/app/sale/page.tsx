import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { saleProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Скидки" };

export default function SalePage() {
  return (
    <CatalogView
      title="Скидки"
      description="Избранные модели по сниженным ценам. Количество ограничено."
      products={saleProducts}
      crumbs={[{ label: "Скидки" }]}
    />
  );
}