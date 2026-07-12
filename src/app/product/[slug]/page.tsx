import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ProductDetailView from "@/components/ProductDetailView";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import {
  getBrandName,
  getCategory,
  getProduct,
  products,
} from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { categoryName } from "@/lib/catalog-i18n";
import { localizeProductTitle } from "@/lib/product-i18n";
import { getRelatedProducts } from "@/lib/recommendations";
import {
  buildPageMetadata,
  buildProductJsonLd,
  getProductPrimaryImage,
  productSeoDescription,
  productSeoTitle,
} from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  if (!p) {
    return { title: t("catalog.allCatalog") };
  }

  return buildPageMetadata({
    path: `/product/${p.slug}`,
    locale,
    title: productSeoTitle(p, locale),
    description: productSeoDescription(p, locale),
    absoluteTitle: true,
    image: getProductPrimaryImage(p),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const cat = getCategory(product.categorySlug);
  const sectionPath = product.section === "bags" ? "/bags" : "/accessories";
  const sectionLabel = product.section === "bags" ? t("nav.bags") : t("nav.accessories");
  const brandName = getBrandName(product.brandSlug);

  const related = getRelatedProducts(product, 4);
  const categoryLabel = cat
    ? categoryName(cat.slug, cat.name, locale)
    : null;
  const breadcrumbs = [
    { name: sectionLabel, path: sectionPath },
    ...(cat && categoryLabel
      ? [{ name: categoryLabel, path: `${sectionPath}/${cat.slug}` }]
      : []),
    { name: localizeProductTitle(product, locale), path: `/product/${product.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={buildProductJsonLd(product, locale, breadcrumbs)} />
      <Breadcrumbs
        items={[
          { label: sectionLabel, href: sectionPath },
          ...(cat && categoryLabel
            ? [{ label: categoryLabel, href: `${sectionPath}/${cat.slug}` }]
            : []),
          { label: localizeProductTitle(product, locale) },
        ]}
      />

      <Suspense fallback={null}>
        <ProductDetailView product={product} brandName={brandName} />
      </Suspense>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionTitle title={t("catalog.related")} />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
