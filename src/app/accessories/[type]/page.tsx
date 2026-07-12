import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import {
  accessoryCategories,
  getCategory,
  productsByCategory,
  shopAccessoryMenuCategories,
} from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";
import { buildPageMetadata } from "@/lib/seo";

const accessoryRouteSlugs = Array.from(
  new Set([
    ...accessoryCategories.map((c) => c.slug),
    ...shopAccessoryMenuCategories.map((c) => c.slug),
  ]),
);

export function generateStaticParams() {
  return accessoryRouteSlugs
    .filter((slug) => slug !== "vse-aksessuary")
    .map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const cat = getCategory(type);
  const title = cat
    ? categoryName(cat.slug, cat.name, locale)
    : t("catalog.allAccessories");
  return buildPageMetadata({
    path: `/accessories/${type}`,
    locale,
    title,
    description:
      locale === "ro"
        ? `${title} din piele italiană — livrare în Moldova.`
        : locale === "en"
          ? `${title} in Italian leather — delivery across Moldova.`
          : `${title} из итальянской кожи — доставка по Молдове.`,
  });
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
      categories={shopAccessoryMenuCategories}
      basePath="/accessories"
      activeSlug={cat.slug}
      crumbs={[
        { label: categoryName("vse-aksessuary", "Все аксессуары", locale), href: "/accessories" },
        { label },
      ]}
    />
  );
}
