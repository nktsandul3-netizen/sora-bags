import type { Locale } from "@/lib/i18n";

/**
 * Каталог хранит ~100 «сырых» названий цветов (оттенки, принты, англ/рус
 * вперемешку). Для фильтра это неюзабельно: по 3-5 почти одинаковых
 * чекбоксов на каждый базовый цвет. Здесь мы группируем все сырые названия
 * в компактный набор «семей» — живые, понятные пункты фильтра с цветным
 * кружком, без дублей.
 *
 * Отдельные названия оттенков (для карточек товара, свотчей, корзины)
 * не меняются — см. `localizeColorName` в product-i18n.ts.
 */
export type ColorFamilyKey =
  | "black"
  | "white"
  | "beige"
  | "taupe"
  | "cognac"
  | "brown"
  | "grey"
  | "red"
  | "burgundy"
  | "pink"
  | "orange"
  | "yellow"
  | "green"
  | "turquoise"
  | "blue"
  | "purple"
  | "gold"
  | "silver"
  | "multi";

export const COLOR_FAMILY_ORDER: ColorFamilyKey[] = [
  "black",
  "white",
  "beige",
  "taupe",
  "cognac",
  "brown",
  "grey",
  "red",
  "burgundy",
  "pink",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "purple",
  "gold",
  "silver",
  "multi",
];

export const colorFamilyMeta: Record<ColorFamilyKey, { hex: string; label: Record<Locale, string> }> = {
  black: { hex: "#1c1b1a", label: { ru: "Чёрный", ro: "Negru", en: "Black" } },
  white: { hex: "#f5f5f0", label: { ru: "Белый", ro: "Alb", en: "White" } },
  beige: { hex: "#cbb79a", label: { ru: "Бежевый", ro: "Bej", en: "Beige" } },
  taupe: { hex: "#7b6658", label: { ru: "Тауп", ro: "Taupe", en: "Taupe" } },
  cognac: { hex: "#8a4b27", label: { ru: "Коньячный", ro: "Coniac", en: "Cognac" } },
  brown: { hex: "#5b3a24", label: { ru: "Коричневый", ro: "Maro", en: "Brown" } },
  grey: { hex: "#7d7a74", label: { ru: "Серый", ro: "Gri", en: "Grey" } },
  red: { hex: "#c41e3a", label: { ru: "Красный", ro: "Roșu", en: "Red" } },
  burgundy: { hex: "#6e2733", label: { ru: "Бордовый", ro: "Bordo", en: "Burgundy" } },
  pink: { hex: "#e8b4b8", label: { ru: "Розовый", ro: "Roz", en: "Pink" } },
  orange: { hex: "#e07a2f", label: { ru: "Оранжевый", ro: "Portocaliu", en: "Orange" } },
  yellow: { hex: "#e8c547", label: { ru: "Жёлтый", ro: "Galben", en: "Yellow" } },
  green: { hex: "#4a5d3a", label: { ru: "Зелёный", ro: "Verde", en: "Green" } },
  turquoise: { hex: "#5ba8b8", label: { ru: "Бирюзовый", ro: "Turcoaz", en: "Turquoise" } },
  blue: { hex: "#34517a", label: { ru: "Синий", ro: "Albastru", en: "Blue" } },
  purple: { hex: "#7a5c8a", label: { ru: "Фиолетовый", ro: "Mov", en: "Purple" } },
  gold: { hex: "#c9a54b", label: { ru: "Золотой", ro: "Auriu", en: "Gold" } },
  silver: { hex: "#b9bcc0", label: { ru: "Серебристый", ro: "Argintiu", en: "Silver" } },
  multi: { hex: "", label: { ru: "Разноцветный", ro: "Multicolor", en: "Multicolor" } },
};

/**
 * Сырое имя цвета -> одна или несколько «семей» фильтра. Двухцветные /
 * комбинированные названия (например «Natural / Black») попадают сразу в
 * обе семьи, чтобы товар находился по каждому из фильтров.
 */
const rawColorFamilies: Record<string, ColorFamilyKey[]> = {
  // Кириллица (палитра C.*)
  "Чёрный": ["black"],
  "Коньячный": ["cognac"],
  "Коричневый": ["brown"],
  "Бежевый": ["beige"],
  "Песочный": ["beige"],
  "Бордовый": ["burgundy"],
  "Синий": ["blue"],
  "Зелёный": ["green"],
  "Серый": ["grey"],
  "Пудровый": ["pink"],

  // Нейтральные
  Black: ["black"],
  "Black Onyx": ["black"],
  "Jet Black": ["black"],
  "Black / Red": ["black", "red"],
  White: ["white"],
  "Off-White": ["white"],
  Ivory: ["white"],
  "Ivory Cream": ["white"],
  Cream: ["white"],
  Beige: ["beige"],
  "Natural Beige": ["beige"],
  Taupe: ["taupe"],
  "Taupe / Chocolate Brown": ["taupe", "brown"],
  Grey: ["grey"],
  "Light Grey": ["grey"],
  "Slate Grey": ["grey"],
  "Grey Stripe": ["grey"],

  // Коричнево-коньячные
  Camel: ["cognac"],
  "Tan Cognac": ["cognac"],
  "Natural Tan": ["cognac"],
  Cognac: ["cognac"],
  "Cognac Brown": ["cognac"],
  "Natural / Cognac": ["beige", "cognac"],
  "Natural / Black": ["beige", "black"],
  Brown: ["brown"],
  "Chocolate Brown": ["brown"],
  "Dark Brown": ["brown"],
  "Dark Chocolate": ["brown"],
  Espresso: ["brown"],
  Mokko: ["brown"],

  // Красные
  Red: ["red"],
  "Cherry Red": ["red"],
  "Ruby Red": ["red"],
  Burgundy: ["burgundy"],
  "Deep Burgundy": ["burgundy"],
  "Red-Orange": ["orange"],

  // Розовые
  Pink: ["pink"],
  "Dusty Pink": ["pink"],
  Blush: ["pink"],
  Mauve: ["pink"],
  Magenta: ["pink"],
  "Metallic Fuchsia": ["pink"],

  // Фиолетовые
  Plum: ["purple"],
  Lavender: ["purple"],

  // Оранжевые / жёлтые
  Orange: ["orange"],
  "Butter Yellow": ["yellow"],
  Mustard: ["yellow"],
  "Mustard Yellow": ["yellow"],
  "Pale Yellow": ["yellow"],
  Chartreuse: ["green"],

  // Зелёные
  "Forest Green": ["green"],
  "Olive Green": ["green"],
  "Sage Green": ["green"],
  Mint: ["green"],
  Pistachio: ["green"],
  "Metallic Emerald": ["green"],

  // Синие / бирюзовые
  "Light Blue": ["blue"],
  "Baby Blue": ["blue"],
  "Sky Blue": ["blue"],
  Blue: ["blue"],
  "Dusty Blue": ["blue"],
  "Navy Blue": ["blue"],
  "Dark Navy": ["blue"],
  "Cobalt Blue": ["blue"],
  "Metallic Electric Blue": ["blue"],
  Turquoise: ["turquoise"],
  "Dusty Turquoise": ["turquoise"],
  "Metallic Teal": ["turquoise"],

  // Металлики
  Gold: ["gold"],
  "Royal Gold": ["gold"],
  Silver: ["silver"],
  "Silver Metallic": ["silver"],
  "Platinum Silver": ["silver"],

  // Принты и многоцветные — в отдельную «Разноцветный»
  "Abstract Print": ["multi"],
  Botanical: ["multi"],
  "Cherry Print": ["multi"],
  "Colorful Brushstroke": ["multi"],
  "Blue Multicolor Brushstroke": ["multi"],
  "Green Geometric": ["multi"],
  "Slate Geometric": ["multi"],
  "Heart Leopard": ["multi"],
  Leopard: ["multi"],
  "Landscape Hills": ["multi"],
  "Lavender Ink": ["multi"],
  "Lavender Wave": ["multi"],
  "Aqua Wave": ["multi"],
  "Mustard Wave": ["multi"],
  "Mint Abstract": ["multi"],
  "Dusty Blue Abstract": ["multi"],
  "Pastel Tie-Dye": ["multi"],
  "Rainbow Pastel": ["multi"],
  "Poppy Print": ["multi"],
  "Red Floral": ["multi"],
  "Rose Print": ["multi"],
  "Watercolor Circles": ["multi"],
  "Whale Print": ["multi"],
};

export function getColorFamilies(rawName: string): ColorFamilyKey[] {
  return rawColorFamilies[rawName] ?? ["multi"];
}

export function colorFamilyLabel(key: ColorFamilyKey, locale: Locale): string {
  return colorFamilyMeta[key]?.label[locale] ?? key;
}

export function colorFamilySwatch(key: ColorFamilyKey): string | undefined {
  return colorFamilyMeta[key]?.hex || undefined;
}
