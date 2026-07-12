import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { saleProducts } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return buildPageMetadata({
    path: "/sale",
    locale,
    title: t("catalog.sale"),
    description: t("catalog.saleDescription"),
  });
}

export default async function SalePage() {
  const t = await getServerT();
  return (
    <CatalogView
      title={t("catalog.sale")}
      description={t("catalog.saleDescription")}
      products={saleProducts}
      crumbs={[{ label: t("catalog.sale") }]}
    />
  );
}
