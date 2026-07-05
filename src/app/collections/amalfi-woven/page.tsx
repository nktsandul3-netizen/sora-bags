import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { wovenBagProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Amalfi Woven Collection" };

export default async function AmalfiWovenCollectionPage() {
  const t = await getServerT();
  return (
    <CatalogView
      title={t("catalog.wovenCollection")}
      description={t("catalog.wovenCollectionDescription")}
      products={wovenBagProducts}
      crumbs={[{ label: t("catalog.wovenCollection") }]}
    />
  );
}
