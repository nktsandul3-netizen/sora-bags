import type { Locale } from "@/lib/i18n";

const categoryLabels: Record<string, Partial<Record<Locale, string>>> = {
  "vse-sumki": { ru: "Все сумки", ro: "Toate gențile", en: "All bags" },
  clutches: { ru: "Clutches", ro: "Clutches", en: "Clutches" },
  vanity: { ru: "Vanity", ro: "Vanity", en: "Vanity" },
  "bucket-bags-women": { ru: "Bucket Bags Women", ro: "Bucket Bags Women", en: "Bucket Bags Women" },
  "bowling-bags": { ru: "Bowling Bags", ro: "Bowling Bags", en: "Bowling Bags" },
  "handbags-women": { ru: "Handbags Women", ro: "Handbags Women", en: "Handbags Women" },
  "rectangular-bags": { ru: "Rectangular Bags", ro: "Rectangular Bags", en: "Rectangular Bags" },
  "tote-bags-women": { ru: "Tote Bags Women", ro: "Tote Bags Women", en: "Tote Bags Women" },
  "shoulder-bags-women": { ru: "Shoulder Bags Women", ro: "Shoulder Bags Women", en: "Shoulder Bags Women" },
  "crossbody-bags-women": { ru: "Crossbody Bags Women", ro: "Crossbody Bags Women", en: "Crossbody Bags Women" },
  "vse-aksessuary": { ru: "Все аксессуары", ro: "Toate accesoriile", en: "All accessories" },
  "card-holders-women": { ru: "Card Holders Women", ro: "Card Holders Women", en: "Card Holders Women" },
  "womens-wallets-women": { ru: "Women's Wallets", ro: "Women's Wallets", en: "Women's Wallets" },
  "womens-belts-women": { ru: "Women's Belts", ro: "Women's Belts", en: "Women's Belts" },
  "womens-scarves-women": { ru: "Women's Scarves", ro: "Women's Scarves", en: "Women's Scarves" },
};

const heroCopyLabels: Record<
  string,
  Partial<Record<Locale, { title: string; description: string }>>
> = {
  clutches: {
    ru: {
      title: "Клатчи",
      description:
        "Для особого вечера или утончённого повседневного образа — наши клатчи станут элегантным способом держать самое важное под рукой. Минимум лишнего, максимум стиля.",
    },
    ro: {
      title: "Clutchuri",
      description:
        "Pentru o seară specială sau un look zilnic rafinat — clutchurile noastre sunt o modalitate elegantă de a păstra la îndemână tot ce contează. Minim de exces, maxim de stil.",
    },
    en: {
      title: "Clutches",
      description:
        "For a special evening or a refined everyday look — our clutches are an elegant way to keep what matters close at hand. Minimum fuss, maximum style.",
    },
  },
  vanity: {
    ru: {
      title: "Vanity",
      description:
        "Всё самое нужное — под рукой. Vanity-сумки SÓRA сочетают компактность, лёгкость и продуманное пространство для косметики и ежедневных мелочей.",
    },
    ro: {
      title: "Vanity",
      description:
        "Tot ce contează — la îndemână. Gențile vanity SÓRA îmbină compactitatea, lejeritatea și spațiul bine gândit pentru cosmetice și esențiale de zi cu zi.",
    },
    en: {
      title: "Vanity",
      description:
        "Everything that matters — close at hand. SÓRA vanity bags combine compact ease with thoughtful space for cosmetics and everyday essentials.",
    },
  },
  "bucket-bags-women": {
    ru: {
      title: "Bucket bags",
      description:
        "Лёгкость лета и свобода каждого дня — bucket-сумки SÓRA сочетают объём, стиль и удобство для прогулок, пляжа и города.",
    },
    ro: {
      title: "Bucket bags",
      description:
        "Ușurința verii și libertatea fiecărei zile — gențile bucket SÓRA îmbină volumul, stilul și confortul pentru plajă, oraș și escapadele de weekend.",
    },
    en: {
      title: "Bucket bags",
      description:
        "Summer ease and everyday freedom — SÓRA bucket bags blend capacity, style and comfort for the beach, the city and everything in between.",
    },
  },
  "bowling-bags": {
    ru: {
      title: "Bowling bags",
      description:
        "Уверенный силуэт и спокойная элегантность — bowling-сумки SÓRA сочетают простор, комфорт и стиль для города и путешествий.",
    },
    ro: {
      title: "Bowling bags",
      description:
        "Silueta sigură și eleganța discretă — gențile bowling SÓRA îmbină spațiul, confortul și stilul pentru oraș și călătorii.",
    },
    en: {
      title: "Bowling bags",
      description:
        "Confident shape and quiet elegance — SÓRA bowling bags combine space, comfort and style for the city and beyond.",
    },
  },
  "handbags-women": {
    ru: {
      title: "Handbags",
      description:
        "Классический силуэт и мягкая кожа — сумки SÓRA сочетают универсальность, комфорт и изысканный стиль для города и путешествий.",
    },
    ro: {
      title: "Handbags",
      description:
        "Silueta clasică și pielea fină — gențile SÓRA îmbină versatilitatea, confortul și stilul rafinat pentru oraș și călătorii.",
    },
    en: {
      title: "Handbags",
      description:
        "Classic shape and supple leather — SÓRA handbags blend versatility, comfort and refined style for the city and beyond.",
    },
  },
  "rectangular-bags": {
    ru: {
      title: "Rectangular bags",
      description:
        "Чёткая геометрия и спокойная элегантность — прямоугольные сумки SÓRA сочетают структуру, вместимость и стиль для города и путешествий.",
    },
    ro: {
      title: "Rectangular bags",
      description:
        "Geometrie clară și eleganță discretă — gențile dreptunghiulare SÓRA îmbină structura, capacitatea și stilul pentru oraș și călătorii.",
    },
    en: {
      title: "Rectangular bags",
      description:
        "Clean geometry and quiet elegance — SÓRA rectangular bags combine structure, capacity and style for the city and beyond.",
    },
  },
  "tote-bags-women": {
    ru: {
      title: "Tote bags",
      description:
        "Простор и универсальность — tote-сумки SÓRA сочетают вместимость, лёгкость и элегантный стиль для города, работы и путешествий.",
    },
    ro: {
      title: "Tote bags",
      description:
        "Spațiu și versatilitate — gențile tote SÓRA îmbină capacitatea, lejeritatea și stilul elegant pentru oraș, birou și călătorii.",
    },
    en: {
      title: "Tote bags",
      description:
        "Space and versatility — SÓRA tote bags combine capacity, ease and elegant style for the city, work and travel.",
    },
  },
  "shoulder-bags-women": {
    ru: {
      title: "Shoulder bags",
      description:
        "Свобода движения и городской шик — shoulder-сумки SÓRA сочетают удобство, структуру и элегантный стиль для каждого дня.",
    },
    ro: {
      title: "Shoulder bags",
      description:
        "Libertate de mișcare și chic urban — gențile shoulder SÓRA îmbină confortul, structura și stilul elegant pentru fiecare zi.",
    },
    en: {
      title: "Shoulder bags",
      description:
        "Freedom of movement and urban chic — SÓRA shoulder bags combine ease, structure and elegant style for every day.",
    },
  },
  "crossbody-bags-women": {
    ru: {
      title: "Crossbody bags",
      description:
        "Свобода движения и городской шик — crossbody-сумки SÓRA сочетают удобство, компактность и элегантный стиль для каждого дня.",
    },
    ro: {
      title: "Crossbody bags",
      description:
        "Libertate de mișcare și chic urban — gențile crossbody SÓRA îmbină confortul, compactitatea și stilul elegant pentru fiecare zi.",
    },
    en: {
      title: "Crossbody bags",
      description:
        "Freedom of movement and urban chic — SÓRA crossbody bags combine ease, compact style and elegance for every day.",
    },
  },
};

export function categoryName(slug: string, fallback: string, locale: Locale): string {
  return categoryLabels[slug]?.[locale] ?? categoryLabels[slug]?.ru ?? fallback;
}

export function categoryHeroCopy(
  slug: string,
  locale: Locale,
): { title: string; description: string } | undefined {
  const copy = heroCopyLabels[slug];
  if (!copy) return undefined;
  return copy[locale] ?? copy.ru;
}
