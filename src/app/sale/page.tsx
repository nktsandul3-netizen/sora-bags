import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { saleProducts } from "@/lib/data";
import { getServerT } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Скидки" };

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