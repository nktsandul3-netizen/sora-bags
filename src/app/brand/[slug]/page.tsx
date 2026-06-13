import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGrid from "@/components/ProductGrid";
import { brands, getBrand, productsByBrand } from "@/lib/data";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  return { title: b?.name ?? "Бренд" };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Сумки", href: "/bags" }, { label: b.name }]} />
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