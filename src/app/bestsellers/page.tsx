import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { bestsellerProducts } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return buildPageMetadata({
    path: "/bestsellers",
    locale,
    title: t("nav.bestsellers"),
    description: t("catalog.bestsellersDescription"),
  });
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
