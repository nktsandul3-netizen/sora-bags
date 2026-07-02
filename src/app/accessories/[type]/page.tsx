import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import {
  accessoryCategories,
  getCategory,
  productsByCategory,
} from "@/lib/data";
import { getServerLocale } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";

export function generateStaticParams() {
  return accessoryCategories
    .filter((c) => c.slug !== "vse-aksessuary")
    .map((c) => ({ type: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const cat = getCategory(type);
  return { title: cat?.name ?? "Аксессуары" };
}

export default async function AccessoryTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const locale = await getServerLocale();
  const cat = getCategory(type);
  if (!cat || cat.section !== "accessories") notFound();
  const label = categoryName(cat.slug, cat.name, locale);

  return (
    <CatalogView
      title={label}
      products={productsByCategory(cat.slug)}
      categories={accessoryCategories}
      basePath="/accessories"
      activeSlug={cat.slug}
      crumbs={[
        { label: categoryName("vse-aksessuary", "Все аксессуары", locale), href: "/accessories" },
        { label },
      ]}
    />
  );
}