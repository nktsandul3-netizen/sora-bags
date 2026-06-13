import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductDetailView from "@/components/ProductDetailView";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import {
  getBrandName,
  getCategory,
  getProduct,
  products,
} from "@/lib/data";

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
  return {
    title: p?.title ?? "Товар",
    description: p?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = getCategory(product.categorySlug);
  const sectionPath = product.section === "bags" ? "/bags" : "/accessories";
  const sectionLabel = product.section === "bags" ? "Сумки" : "Аксессуары";
  const brandName = getBrandName(product.brandSlug);

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: sectionLabel, href: sectionPath },
          ...(cat ? [{ label: cat.name, href: `${sectionPath}/${cat.slug}` }] : []),
          { label: product.title },
        ]}
      />

      <Suspense fallback={null}>
        <ProductDetailView product={product} brandName={brandName} />
      </Suspense>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionTitle title="Похожие модели" />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}