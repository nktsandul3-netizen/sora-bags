import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGrid from "@/components/ProductGrid";
import { brands, getBrand, productsByBrand } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const b = getBrand(slug);
  const title = b?.name ?? t("nav.bags");
  return buildPageMetadata({
    path: `/brand/${slug}`,
    locale,
    title,
    description:
      b?.about ??
      (locale === "ro"
        ? `Colecția ${title} la SÓRA Bags — genți și accesorii din piele italiană.`
        : locale === "en"
          ? `${title} collection at SÓRA Bags — Italian leather bags and accessories.`
          : `Коллекция ${title} в SÓRA Bags — сумки и аксессуары из итальянской кожи.`),
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getServerT();
  const b = getBrand(slug);
  if (!b) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: t("nav.bags"), href: "/bags" }, { label: b.name }]} />
      <header className="mt-5 mb-8">
        <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">{b.name}</h1>
        {b.about && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">
            {b.about}
          </p>
        )}
      </header>
      <ProductGrid products={productsByBrand(b.slug)} />
    </div>
  );
}
