import type { Locale, LocalizedString } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/i18n";
import { accessoryCategories, bagMenuCategories } from "@/lib/data";

export type StoreLocation = {
  slug: string;
  name: LocalizedString;
  address: LocalizedString;
  floor: LocalizedString;
  phone: string;
  email: string;
  hours: LocalizedString[];
  mapUrl: string;
  images: string[];
};

/** Категории каталога, которые показываем в блоке магазина. */
export const siteStoreCategorySlugs = [
  ...bagMenuCategories.map((c) => c.slug),
  ...accessoryCategories.filter((c) => c.slug !== "vse-aksessuary").map((c) => c.slug),
];

export const stores: StoreLocation[] = [
  {
    slug: "chisinau-port-mall",
    name: {
      ru: "Port Mall · Кишинёв",
      ro: "Port Mall · Chișinău",
      en: "Port Mall · Chișinău",
    },
    address: {
      ru: "Strada Mihai Sadoveanu 42/6, Chișinău, MD-2075",
      ro: "Strada Mihai Sadoveanu 42/6, Chișinău, MD-2075",
      en: "Strada Mihai Sadoveanu 42/6, Chișinău, MD-2075",
    },
    floor: {
      ru: "3-м этаже",
      ro: "etajul 3",
      en: "the 3rd floor",
    },
    phone: "+373 600 66665",
    email: "info@sorabags.md",
    hours: [
      {
        ru: "Ежедневно: 10:00 – 22:00",
        ro: "Zilnic: 10:00 – 22:00",
        en: "Daily: 10:00 AM – 10:00 PM",
      },
    ],
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Strada+Mihai+Sadoveanu+42%2F6,+Chi%C8%99in%C4%83u,+MD-2075",
    images: ["/stores/chisinau-stefan-cel-mare/port-mall-hero-v2.png"],
  },
];

export const primaryStore = stores[0];

export function getStore(slug: string): StoreLocation | undefined {
  return stores.find((s) => s.slug === slug);
}

export function getStoreName(store: StoreLocation, locale: Locale): string {
  return getLocalizedText(store.name, locale);
}

export function getStoreAddress(store: StoreLocation, locale: Locale): string {
  return getLocalizedText(store.address, locale);
}

export function getStoreFloor(store: StoreLocation, locale: Locale): string {
  return getLocalizedText(store.floor, locale);
}

export function getStoreHours(store: StoreLocation, locale: Locale): string[] {
  return store.hours.map((line) => getLocalizedText(line, locale));
}

export const storePageCopy = {
  ru: {
    pageTitle: "Наши магазины",
    workingHours: "Часы работы",
    categories: "Категории",
    showRoute: "Показать маршрут",
    locatedOn: "Мы находимся на",
    slide: "Слайд",
  },
  ro: {
    pageTitle: "Magazinele noastre",
    workingHours: "Program de lucru",
    categories: "Categorii",
    showRoute: "Arată traseul",
    locatedOn: "Ne aflăm la",
    slide: "Slide",
  },
  en: {
    pageTitle: "Our stores",
    workingHours: "Opening hours",
    categories: "Categories",
    showRoute: "Get directions",
    locatedOn: "We are located on",
    slide: "Slide",
  },
} as const;

export const storeServicesCopy = {
  ru: {
    title: "Эксклюзивные услуги",
    prev: "Предыдущая услуга",
    next: "Следующая услуга",
    items: [
      {
        id: "payment" as const,
        title: "Безопасные платежи",
        text: "Все покупки на Sóra гарантированы и безопасны.",
      },
      {
        id: "delivery" as const,
        title: "Бесплатная доставка и расширенные условия возврата.",
        text: "Бесплатная стандартная доставка и бесплатный возврат для всех заказов. Срок возврата до 14 дней.",
      },
      {
        id: "support" as const,
        title: "Служба поддержки клиентов — расширенное время работы",
        text: "Наша служба поддержки клиентов готова ответить на все ваши вопросы и оказать помощь на протяжении всего процесса покупки через онлайн-чат.",
      },
    ],
  },
  ro: {
    title: "Servicii exclusive",
    prev: "Serviciul anterior",
    next: "Serviciul următor",
    items: [
      {
        id: "payment" as const,
        title: "Plăți sigure",
        text: "Toate achizițiile pe Sóra sunt garantate și sigure.",
      },
      {
        id: "delivery" as const,
        title: "Livrare gratuită și condiții extinse de retur.",
        text: "Livrare standard gratuită și retur gratuit pentru toate comenzile. Termenul de retur — 14 zile.",
      },
      {
        id: "support" as const,
        title: "Serviciu clienți — program extins",
        text: "Serviciul nostru de asistență clienți este gata să răspundă la toate întrebările și să vă ajute pe tot parcursul achiziției prin chat online.",
      },
    ],
  },
  en: {
    title: "Exclusive services",
    prev: "Previous service",
    next: "Next service",
    items: [
      {
        id: "payment" as const,
        title: "Secure payments",
        text: "All purchases on Sóra are guaranteed and secure.",
      },
      {
        id: "delivery" as const,
        title: "Free shipping and extended return conditions.",
        text: "Free standard shipping and free returns on all orders. Return period — 14 days.",
      },
      {
        id: "support" as const,
        title: "Customer support — extended opening hours",
        text: "Our customer support team is ready to answer all your questions and assist you throughout the purchase process via online chat.",
      },
    ],
  },
} as const;
