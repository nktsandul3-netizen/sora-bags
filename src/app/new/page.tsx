import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { newProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Новинки" };

export default function NewPage() {
  return (
    <CatalogView
      title="Новинки"
      description="Свежие поступления сезона — модели, которые только появились в каталоге."
      products={newProducts}
      crumbs={[{ label: "Новинки" }]}
    />
  );
}