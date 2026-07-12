import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { wovenBagProducts } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return buildPageMetadata({
    path: "/collections/amalfi-woven",
    locale,
    title: t("catalog.wovenCollection"),
    description: t("catalog.wovenCollectionDescription"),
  });
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
