"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist";
import { products } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function WishlistPage() {
  const { items } = useWishlist();
  const favorites = products.filter((p) => items.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Избранное" }]} />
      <h1 className="mt-5 mb-8 font-serif text-3xl text-stone-950 sm:text-4xl">
        Избранное
      </h1>

      {favorites.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-stone-500">
            В избранном пока пусто. Нажимайте на сердечко у понравившихся моделей.
          </p>
          <Link
            href="/bags"
            className="mt-6 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800"
          >
            В каталог
          </Link>
        </div>
      ) : (
        <ProductGrid products={favorites} />
      )}
    </div>
  );
}