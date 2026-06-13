import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import {
  accessoryCategories,
  getCategory,
  productsByCategory,
} from "@/lib/data";

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
  const cat = getCategory(type);
  if (!cat || cat.section !== "accessories") notFound();

  return (
    <CatalogView
      title={cat.name}
      products={productsByCategory(cat.slug)}
      categories={accessoryCategories}
      basePath="/accessories"
      activeSlug={cat.slug}
      crumbs={[
        { label: "Аксессуары", href: "/accessories" },
        { label: cat.name },
      ]}
    />
  );
}