import type { Locale } from "@/lib/i18n";

/**
 * В каталоге ~25 сырых значений material (RU/EN дубли, оттенки фактуры).
 * Для фильтра группируем в короткий понятный список.
 */
export type MaterialFamilyKey = "leather" | "suede" | "woven" | "silk";

export const MATERIAL_FAMILY_ORDER: MaterialFamilyKey[] = [
  "leather",
  "suede",
  "woven",
  "silk",
];

const materialFamilyLabels: Record<MaterialFamilyKey, Record<Locale, string>> = {
  leather: { ru: "Кожа", ro: "Piele", en: "Leather" },
  suede: { ru: "Замша", ro: "Piele întoarsă", en: "Suede" },
  woven: { ru: "Плетение", ro: "Împletitură", en: "Woven" },
  silk: { ru: "Шёлк", ro: "Mătase", en: "Silk" },
};

export function materialFamilyLabel(key: MaterialFamilyKey, locale: Locale): string {
  return materialFamilyLabels[key][locale] ?? materialFamilyLabels[key].ru;
}

/** Сырое значение product.material → семейство фильтра. */
export function getMaterialFamily(rawMaterial: string): MaterialFamilyKey | null {
  const raw = rawMaterial.trim();
  if (!raw) return null;
  const n = raw.toLowerCase();

  if (
    n.includes("шёлк") ||
    n.includes("шелк") ||
    n.includes("silk")
  ) {
    return "silk";
  }

  if (
    n.includes("замш") ||
    n.includes("suede")
  ) {
    return "suede";
  }

  if (
    n.includes("плетён") ||
    n.includes("плетен") ||
    n.includes("рафи") ||
    n.includes("raffia") ||
    n.includes("straw") ||
    n.includes("woven") ||
    n.includes("handwoven")
  ) {
    return "woven";
  }

  if (
    n.includes("кож") ||
    n.includes("leather") ||
    n.includes("calf")
  ) {
    return "leather";
  }

  return null;
}
