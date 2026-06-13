"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { getBrandName } from "@/lib/data";
import { useCart } from "@/context/cart";

export default function ProductPurchase({ product }: { product: Product }) {
  const { add, openCart } = useCart();
  const [colorIdx, setColorIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const color = product.colors[colorIdx];

  function handleAdd() {
    add({
      slug: product.slug,
      title: product.title,
      brand: getBrandName(product.brandSlug),
      price: product.price,
      color: color.name,
    });
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-6">
      <div>
        <p className="text-sm font-medium text-stone-700">
          Цвет: <span className="text-stone-500">{color.name}</span>
        </p>
        <div className="mt-2 flex gap-2.5">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setColorIdx(i)}
              aria-label={c.name}
              className={
                "h-9 w-9 rounded-full border-2 transition " +
                (i === colorIdx
                  ? "border-stone-900 ring-2 ring-stone-900/15"
                  : "border-stone-200 hover:border-stone-400")
              }
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="mt-7 w-full rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-stone-800 sm:w-auto"
      >
        {added ? "Добавлено в корзину ✓" : "Добавить в корзину"}
      </button>
    </div>
  );
}