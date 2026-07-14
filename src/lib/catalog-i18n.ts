import type { Locale } from "@/lib/i18n";

const categoryLabels: Record<string, Partial<Record<Locale, string>>> = {
  "vse-sumki": { ru: "Все сумки", ro: "Toate gențile", en: "All bags" },
  clutches: { ru: "Клатчи", ro: "Clutchuri", en: "Clutches" },
  vanity: { ru: "Косметички и vanity", ro: "Genți vanity", en: "Vanity bags" },
  "bucket-bags-women": { ru: "Сумки-мешки", ro: "Genți tip sac", en: "Bucket bags" },
  "bowling-bags": { ru: "Сумки-боулинг", ro: "Genți bowling", en: "Bowling bags" },
  "handbags-women": { ru: "Сумки с ручкой", ro: "Genți de mână", en: "Handbags" },
  "rectangular-bags": { ru: "Прямоугольные сумки", ro: "Genți dreptunghiulare", en: "Rectangular bags" },
  "tote-bags-women": { ru: "Тоуты", ro: "Tote", en: "Totes" },
  "shoulder-bags-women": { ru: "Сумки на плечо", ro: "Genți de umăr", en: "Shoulder bags" },
  "crossbody-bags-women": { ru: "Кроссбоди", ro: "Crossbody", en: "Crossbody" },
  "clutch-evening": {
    ru: "Вечерние сумки",
    ro: "Genți de seară",
    en: "Evening bags",
  },
  "vse-aksessuary": { ru: "Все аксессуары", ro: "Toate accesoriile", en: "All accessories" },
  "card-holders-women": { ru: "Картхолдеры", ro: "Portcarduri", en: "Card holders" },
  "womens-wallets-women": { ru: "Кошельки", ro: "Portofele", en: "Wallets" },
  "wallets-cardholders": {
    ru: "Кошельки",
    ro: "Portofele",
    en: "Wallets",
  },
  "womens-scarves-women": {
    ru: "Платки",
    ro: "Foularduri",
    en: "Scarves",
  },
  "bag-charms": { ru: "Charms", ro: "Charms", en: "Charms" },
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
      title: "Secchiello",
      description:
        "Лёгкость лета и свобода каждого дня — bucket-сумки SÓRA сочетают объём, стиль и удобство для прогулок, пляжа и города.",
    },
    ro: {
      title: "Secchiello",
      description:
        "Ușurința verii și libertatea fiecărei zile — gențile bucket SÓRA îmbină volumul, stilul și confortul pentru plajă, oraș și escapadele de weekend.",
    },
    en: {
      title: "Secchiello",
      description:
        "Summer ease and everyday freedom — SÓRA bucket bags blend capacity, style and comfort for the beach, the city and everything in between.",
    },
  },
  "bowling-bags": {
    ru: {
      title: "Сумки-боулинг",
      description:
        "Уверенный силуэт и спокойная элегантность — bowling-сумки SÓRA сочетают простор, комфорт и стиль для города и путешествий.",
    },
    ro: {
      title: "Genți bowling",
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
      title: "Сумки с ручкой",
      description:
        "Классический силуэт и мягкая кожа — сумки SÓRA сочетают универсальность, комфорт и изысканный стиль для города и путешествий.",
    },
    ro: {
      title: "Genți de mână",
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
      title: "Прямоугольные сумки",
      description:
        "Чёткая геометрия и спокойная элегантность — прямоугольные сумки SÓRA сочетают структуру, вместимость и стиль для города и путешествий.",
    },
    ro: {
      title: "Genți dreptunghiulare",
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
      title: "Tote",
      description:
        "Простор и универсальность — tote-сумки SÓRA сочетают вместимость, лёгкость и элегантный стиль для города, работы и путешествий.",
    },
    ro: {
      title: "Tote",
      description:
        "Spațiu și versatilitate — gențile tote SÓRA îmbină capacitatea, lejeritatea și stilul elegant pentru oraș, birou și călătorii.",
    },
    en: {
      title: "Tote",
      description:
        "Space and versatility — SÓRA tote bags combine capacity, ease and elegant style for the city, work and travel.",
    },
  },
  "shoulder-bags-women": {
    ru: {
      title: "Через плечо",
      description:
        "Свобода движения и городской шик — сумки через плечо SÓRA сочетают удобство, структуру и элегантный стиль для каждого дня.",
    },
    ro: {
      title: "Peste umăr",
      description:
        "Libertate de mișcare și chic urban — gențile peste umăr SÓRA îmbină confortul, structura și stilul elegant pentru fiecare zi.",
    },
    en: {
      title: "Shoulder bags",
      description:
        "Freedom of movement and urban chic — SÓRA shoulder bags combine ease, structure and elegant style for every day.",
    },
  },
  "crossbody-bags-women": {
    ru: {
      title: "Кроссбоди",
      description:
        "Свобода движения и городской шик — crossbody-сумки SÓRA сочетают удобство, компактность и элегантный стиль для каждого дня.",
    },
    ro: {
      title: "Genți crossbody",
      description:
        "Libertate de mișcare și chic urban — gențile crossbody SÓRA îmbină confortul, compactitatea și stilul elegant pentru fiecare zi.",
    },
    en: {
      title: "Crossbody bags",
      description:
        "Freedom of movement and urban chic — SÓRA crossbody bags combine ease, compact style and elegance for every day.",
    },
  },
  "clutch-evening": {
    ru: {
      title: "Вечерние сумки",
      description:
        "Для особого вечера или утончённого образа — клатчи и вечерние сумки SÓRA.",
    },
    ro: {
      title: "Genți de seară",
      description:
        "Pentru o seară specială sau un look rafinat — clutchuri și genți de seară SÓRA.",
    },
    en: {
      title: "Evening bags",
      description:
        "For a special evening or a refined look — SÓRA clutches and evening bags.",
    },
  },
  "bag-charms": {
    ru: {
      title: "Charms",
      description:
        "Кожаные брелки и подвески для сумок — небольшой акцент, который меняет характер любой модели. Золотая фурнитура, карабин и итальянское исполнение.",
    },
    ro: {
      title: "Charms",
      description:
        "Brelocuri și accesorii din piele pentru genți — un accent mic care schimbă caracterul oricărei modele. Feronerie aurie, carabină și execuție italiană.",
    },
    en: {
      title: "Charms",
      description:
        "Leather bag charms and accessories — a small accent that changes the character of any bag. Gold hardware, a carabiner clip and Italian craftsmanship.",
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
