"use client";

import type { Product } from "@/lib/types";
import { productHasPhotos } from "@/lib/data";
import { useT } from "@/lib/useI18n";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  activeFilterColors = [],
}: {
  products: Product[];
  activeFilterColors?: string[];
}) {
  const t = useT();
  const visibleProducts = products.filter(productHasPhotos);

  if (visibleProducts.length === 0) {
    return (
      <p className="py-16 text-center text-stone-500">
        {t("catalog.empty")}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-1.5 gap-y-5 max-md:gap-x-1 max-md:gap-y-4 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5">
      {visibleProducts.map((p) => (
        <ProductCard key={p.slug} product={p} activeFilterColors={activeFilterColors} />
      ))}
    </div>
  );
}