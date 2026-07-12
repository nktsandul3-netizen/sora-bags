import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { newProducts } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return buildPageMetadata({
    path: "/new",
    locale,
    title: t("nav.new"),
    description: t("catalog.newDescription"),
  });
}

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
