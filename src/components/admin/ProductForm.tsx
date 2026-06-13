"use client";

import { useActionState, useMemo, useState } from "react";
import { saveProductAction, type ActionState } from "@/app/admin/actions";
import { PRODUCT_STATUSES, PRODUCT_STATUS_LABELS } from "@/lib/admin/constants";
import ImageUploader from "@/components/admin/ImageUploader";
import type { AdminProductView } from "@/lib/admin/products";
import type { AdminBrandOption, AdminCategory } from "@/lib/admin/categories";

const initial: ActionState = {};

const inputClass =
  "w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]";
const labelClass = "mb-1 block text-xs uppercase tracking-wide text-stone-500";

export default function ProductForm({
  product,
  brands,
  categories,
}: {
  product?: AdminProductView;
  brands: AdminBrandOption[];
  categories: AdminCategory[];
}) {
  const [state, action, pending] = useActionState(saveProductAction, initial);
  const [section, setSection] = useState<"bags" | "accessories">(
    product?.section ?? "bags",
  );
  const [images, setImages] = useState<string[]>(product?.images ?? []);

  const sectionCategories = useMemo(
    () => categories.filter((c) => c.section === section),
    [categories, section],
  );

  return (
    <form action={action} className="space-y-8">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {state.error && (
        <p className="bg-[#A01D26]/10 px-4 py-2.5 text-sm text-[#A01D26]">{state.error}</p>
      )}

      {/* Основное */}
      <section className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Основное
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Название</label>
            <input name="title" defaultValue={product?.title} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input
              name="slug"
              defaultValue={product?.slug}
              required
              pattern="[a-z0-9\-]+"
              placeholder="elegant-leather-tote"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Бренд</label>
            <select name="brandSlug" defaultValue={product?.brandSlug ?? ""} required className={inputClass}>
              <option value="" disabled>
                Выберите бренд
              </option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Раздел</label>
            <select
              name="section"
              value={section}
              onChange={(e) => setSection(e.target.value as "bags" | "accessories")}
              className={inputClass}
            >
              <option value="bags">Сумки</option>
              <option value="accessories">Аксессуары</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Категория</label>
            <select
              name="categorySlug"
              defaultValue={product?.categorySlug ?? ""}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Выберите категорию
              </option>
              {sectionCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Материал</label>
            <input name="material" defaultValue={product?.material} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Описание</label>
            <textarea
              name="description"
              rows={4}
              defaultValue={product?.description}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              name="isNew"
              defaultChecked={product?.isNew}
              className="h-4 w-4 accent-[#A01D26]"
            />
            Отметить как новинку
          </label>
        </div>
      </section>

      {/* Цена и наличие */}
      <section className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Цена и наличие
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClass}>Цена (лей)</label>
            <input
              name="price"
              type="number"
              min="0"
              defaultValue={product?.price ?? 0}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Старая цена</label>
            <input
              name="oldPrice"
              type="number"
              min="0"
              defaultValue={product?.oldPrice ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Остаток</label>
            <input
              name="inventory"
              type="number"
              min="0"
              defaultValue={product?.inventory ?? 0}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Статус</label>
            <select name="status" defaultValue={product?.status ?? "in_stock"} className={inputClass}>
              {PRODUCT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {PRODUCT_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Изображения
        </h2>
        <ImageUploader images={images} onChange={setImages} folder="products" />
      </section>

      {/* SEO */}
      <section className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>SEO-заголовок</label>
            <input name="seoTitle" defaultValue={product?.seoTitle} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO-описание</label>
            <textarea
              name="seoDescription"
              rows={2}
              defaultValue={product?.seoDescription}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-[#A01D26] px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Сохранение…" : product ? "Сохранить изменения" : "Создать товар"}
        </button>
      </div>
    </form>
  );
}