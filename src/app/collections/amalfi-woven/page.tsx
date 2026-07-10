import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { wovenBagProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("catalog.wovenCollection") };
}

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
