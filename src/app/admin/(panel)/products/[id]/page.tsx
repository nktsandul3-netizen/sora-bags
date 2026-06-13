import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/admin/products";
import { getBrandOptions, getCategoryOptions } from "@/lib/admin/categories";
import ProductForm from "@/components/admin/ProductForm";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import DuplicateProductButton from "@/components/admin/DuplicateProductButton";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategoryOptions(),
  ]);
  if (!product) notFound();
  const brands = getBrandOptions();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/products" className="text-sm text-stone-500 hover:text-[#A01D26]">
            ← К товарам
          </Link>
          <h1 className="mt-2 font-serif text-3xl text-stone-900">{product.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <DuplicateProductButton productId={product.id} />
          <DeleteProductButton productId={product.id} />
        </div>
      </div>
      <ProductForm product={product} brands={brands} categories={categories} />
    </div>
  );
}