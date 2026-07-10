import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { bestsellerProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("nav.bestsellers") };
}

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
