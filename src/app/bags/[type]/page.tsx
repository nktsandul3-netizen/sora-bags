import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import { bagCategories, getCategory, productsByCategory } from "@/lib/data";

export function generateStaticParams() {
  return bagCategories
    .filter((c) => c.slug !== "vse-sumki")
    .map((c) => ({ type: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const cat = getCategory(type);
  return { title: cat?.name ?? "Сумки" };
}

export default async function BagTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const cat = getCategory(type);
  if (!cat || cat.section !== "bags") notFound();

  return (
    <CatalogView
      title={cat.name}
      products={productsByCategory(cat.slug)}
      categories={bagCategories}
      basePath="/bags"
      activeSlug={cat.slug}
      crumbs={[{ label: "Сумки", href: "/bags" }, { label: cat.name }]}
    />
  );
}