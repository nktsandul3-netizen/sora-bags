import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { bestsellerProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Bestsellers" };

export default async function BestsellersPage() {
  const t = await getServerT();
  return (
    <CatalogView
      title={t("nav.bestsellers")}
      description={t("catalog.bestsellersDescription")}
      products={bestsellerProducts}
      crumbs={[{ label: t("nav.bestsellers") }]}
    />
  );
}
