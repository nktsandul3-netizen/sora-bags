import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { newProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Новинки" };

export default async function NewPage() {
  const t = await getServerT();
  return (
    <CatalogView
      title={t("nav.new")}
      description={t("catalog.newDescription")}
      products={newProducts}
      crumbs={[{ label: t("nav.new") }]}
    />
  );
}