import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { veneziaIntreccioProducts } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return buildPageMetadata({
    path: "/collections/venezia-intreccio",
    locale,
    title: t("catalog.veneziaCollection"),
    description: t("catalog.veneziaCollectionDescription"),
  });
}

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
