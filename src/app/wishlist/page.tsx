"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist";
import { products } from "@/lib/data";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function WishlistPage() {
  const { items } = useWishlist();
  const locale = useLocale();
  const t = useT();
  const favorites = products.filter((p) => items.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: t("common.wishlist") }]} />
      <h1 className="mt-5 mb-8 font-serif text-3xl text-stone-950 sm:text-4xl">
        {t("common.wishlist")}
      </h1>

      {favorites.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-stone-500">
            {t("account.wishlistHint")}
          </p>
          <Link
            href={withLocalePath("/bags", locale)}
            className="mt-6 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800"
          >
            {t("home.toCatalog")}
          </Link>
        </div>
      ) : (
        <ProductGrid products={favorites} />
      )}
    </div>
  );
}