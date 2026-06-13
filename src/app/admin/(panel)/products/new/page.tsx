import Link from "next/link";
import { getBrandOptions, getCategoryOptions } from "@/lib/admin/categories";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    getCategoryOptions(),
    Promise.resolve(getBrandOptions()),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/products" className="text-sm text-stone-500 hover:text-[#A01D26]">
          ← К товарам
        </Link>
        <h1 className="mt-2 font-serif text-3xl text-stone-900">Новый товар</h1>
      </div>
      <ProductForm brands={brands} categories={categories} />
    </div>
  );
}