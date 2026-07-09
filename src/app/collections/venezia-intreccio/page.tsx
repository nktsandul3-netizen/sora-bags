import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { veneziaIntreccioProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "VENEZIA INTRECCIO" };

export default async function VeneziaIntreccioCollectionPage() {
  const t = await getServerT();
  return (
    <CatalogView
      title={t("catalog.veneziaCollection")}
      description={t("catalog.veneziaCollectionDescription")}
      products={veneziaIntreccioProducts}
      crumbs={[{ label: t("catalog.veneziaCollection") }]}
    />
  );
}
