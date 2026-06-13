import { categoriesCollection } from "@/lib/mongodb";
import { allCategories, brands } from "@/lib/data";

export interface AdminCategory {
  slug: string;
  name: string;
  section: "bags" | "accessories";
}

export interface AdminBrandOption {
  slug: string;
  name: string;
}

/**
 * Список категорий для форм товара.
 * Берём из коллекции categories; если она пуста — fallback на статический
 * каталог (src/lib/data.ts), чтобы форма работала до первого сидинга.
 */
export async function getCategoryOptions(): Promise<AdminCategory[]> {
  try {
    const categories = await categoriesCollection();
    const docs = await categories.find({}).sort({ section: 1, name: 1 }).toArray();
    if (docs.length > 0) {
      return docs.map((d) => ({ slug: d.slug, name: d.name, section: d.section }));
    }
  } catch {
    // БД недоступна — отдаём статический fallback ниже.
  }
  return allCategories.map((c) => ({
    slug: c.slug,
    name: c.name,
    section: c.section,
  }));
}

export function getBrandOptions(): AdminBrandOption[] {
  return brands.map((b) => ({ slug: b.slug, name: b.name }));
}

/** Идемпотентно засеивает коллекцию categories из статического каталога. */
export async function seedCategoriesFromCatalog(): Promise<number> {
  const categories = await categoriesCollection();
  let inserted = 0;
  for (const c of allCategories) {
    const res = await categories.updateOne(
      { slug: c.slug },
      { $setOnInsert: { slug: c.slug, name: c.name, section: c.section, createdAt: new Date() } },
      { upsert: true },
    );
    if (res.upsertedCount) inserted += 1;
  }
  return inserted;
}