// Единая конфигурация бренда. Поменяйте значения здесь — и они обновятся по всему сайту.

export const brand = {
  name: "SÓRA",
  legalName: "RONS Concept Store SRL",
  tagline: "Итальянские сумки и аксессуары из натуральной кожи",
  madeIn: "MADE IN ITALY",
  description:
    "SÓRA — магазин премиальных сумок и аксессуаров из натуральной итальянской кожи. Тщательно отобранные модели, честные цены и доставка по всей Молдове.",
  domain: "sorabags.md",
  email: "info@sorabags.md",
  phones: ["+373 68 935 619"],
  address: "г. Кишинёв, Республика Молдова",
  workingHours: "Пн–Вс: 10:00 – 21:00",
  social: {
    instagram: "https://instagram.com/luma",
    telegram: "https://t.me/luma",
    whatsapp: "https://wa.me/37368935619",
    viber: "viber://chat?number=%2B37368935619",
    vk: "https://vk.com/luma",
    facebook: "https://facebook.com/luma",
    tiktok: "https://www.tiktok.com/@soraitaly",
  },
} as const;

export type Brand = typeof brand;

/**
 * Плавающий видео-виджет.
 *
 * mode: "tiktok" — карусель роликов TikTok (официальный embed + ссылка в TikTok).
 * mode: "video"  — один локальный MP4 (как Lancaster).
 *
 * Для TikTok вставьте ссылки вида:
 * https://www.tiktok.com/@ваш_аккаунт/video/7123456789012345678
 *
 * Поднимите `version`, чтобы снова показать виджет тем, кто его закрыл.
 */
export type VideoWidgetTikTokItem = {
  /** Полная ссылка на ролик или numeric id */
  url: string;
  /** Короткая ссылка для кнопки «Смотреть коллекцию» (vt.tiktok.com) */
  shareUrl?: string;
  title: string;
  /** Локальный MP4 для мгновенного автоплея в карточке (экспорт из TikTok) */
  mp4Src?: string;
  /** Постер, пока грузится видео */
  posterSrc?: string;
  /** Куда вести с сайта (кнопка «Смотреть коллекцию») */
  collectionHref?: string;
};

export const videoWidget = {
  enabled: true,
  campaignId: "tiktok-carousel",
  version: 7,
  mode: "tiktok" as "tiktok" | "video",
  /** Автосмена ролика в карточке (мс) */
  rotateIntervalMs: 7000,

  /** Замените url на свои ролики из TikTok */
  tiktokVideos: [
    {
      url: "",
      title: "Сумки SÓRA",
      mp4Src: "/videos/sora-story-0034.mp4",
      posterSrc: "/hero-amalfi-4k.jpg",
      collectionHref: "/bags",
    },
    {
      url: "",
      title: "Сумки SÓRA",
      mp4Src: "/videos/sora-story-0054.mp4",
      posterSrc: "/hero-amalfi-4k.jpg",
      collectionHref: "/bags",
    },
  ] satisfies VideoWidgetTikTokItem[],

  tiktokLabel: "Открыть в TikTok",
  collectionLabel: "Смотреть коллекцию",

  // Режим video (если mode: "video")
  title: "NEW CO — GOLDEN ESCAPE",
  subtitle: "Spring / Summer 2026",
  videoSrc: "/tile-accessories.mp4",
  posterSrc: "/hero-amalfi-4k.jpg",
  collectionHref: "/new",
} as const;

export type VideoWidgetConfig = typeof videoWidget;

/**
 * Сторис-хайлайты в стиле Lancaster (кружки с play → полноэкранный просмотр).
 * Показываются на карточке товара. Поменяйте обложки/слайды здесь.
 */
export type BrandStorySlide = {
  type: "image" | "video";
  src: string;
  /** Постер для видео */
  poster?: string;
  /** Длительность показа для изображений (мс) */
  durationMs?: number;
  /** Подпись поверх слайда */
  title?: string;
  text?: string;
};

export type BrandStoryHighlight = {
  id: string;
  /** Подпись под кружком */
  label: string;
  /** Обложка кружка */
  cover: string;
  /** Тип кнопки-ссылки внизу сторис */
  cta?: "collection" | "more" | "shop";
  ctaHref?: string;
  slides: BrandStorySlide[];
};

export type BrandStoryProductOverride = {
  cover?: string;
  slides?: BrandStorySlide[];
  cta?: "collection" | "more" | "shop";
  ctaHref?: string;
  /** Градиент контура кружка (conic-gradient) */
  ringGradient?: string;
};

export const brandStories = {
  enabled: true,
  /**
   * Если список непустой — сторис показываются только на этих товарах (по slug).
   * Пустой список = показывать на всех карточках товара.
   */
  productSlugs: [
    "womens-smooth-leather-compact-baguette-bag",
    "womens-pebbled-leather-rectangular-handbag",
    "womens-pebbled-leather-turn-lock-top-handle-bag",
    "womens-soft-leather-draped-flap-bag",
    "the-essential-shoulder-bag-tan-cognac",
    "womens-pebbled-leather-crescent-hobo-bag",
  ],
  items: [
    {
      id: "in-motion",
      label: "IN MOTION",
      cover: "/hero-amalfi-terrace-hq.jpg",
      cta: "shop",
      ctaHref: "/new",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-0034.mp4",
          poster: "/hero-amalfi-4k.jpg",
        },
      ],
    },
  ] satisfies BrandStoryHighlight[],
  productOverrides: {
    "womens-smooth-leather-compact-baguette-bag": {
      cover: "/products/womens-smooth-leather-compact-baguette-bag/red-orange-front.png",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-baguette.mp4",
          poster: "/products/womens-smooth-leather-compact-baguette-bag/red-orange-front.png",
        },
      ],
    },
    "womens-pebbled-leather-rectangular-handbag": {
      cover: "/products/womens-pebbled-leather-rectangular-handbag/taupe-front.png",
      ringGradient:
        "conic-gradient(from 140deg, #b5a498, #7b6658, #5e4d42, #7b6658, #b5a498)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-rectangular-handbag.mp4",
          poster: "/products/womens-pebbled-leather-rectangular-handbag/taupe-front.png",
        },
      ],
    },
    "womens-pebbled-leather-turn-lock-top-handle-bag": {
      cover: "/products/womens-pebbled-leather-turn-lock-top-handle-bag/black-front.png",
      ringGradient:
        "conic-gradient(from 140deg, #9ca3af, #4b5563, #1f2937, #4b5563, #9ca3af)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-turn-lock-top-handle-bag.mp4",
          poster: "/products/womens-pebbled-leather-turn-lock-top-handle-bag/black-front.png",
        },
      ],
    },
    "womens-soft-leather-draped-flap-bag": {
      cover: "/products/womens-soft-leather-draped-flap-bag/red-front.png",
      ringGradient:
        "conic-gradient(from 140deg, #fca5a5, #c41e3a, #991b1b, #c41e3a, #fca5a5)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-draped-flap-bag.mp4",
          poster: "/products/womens-soft-leather-draped-flap-bag/red-front.png",
        },
      ],
    },
    "the-essential-shoulder-bag-tan-cognac": {
      cover: "/products/the-essential-shoulder-bag/tan-cognac-front.png",
      ringGradient:
        "conic-gradient(from 140deg, #d4a574, #a0643f, #7c4a2d, #a0643f, #d4a574)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-essential-shoulder-bag.mp4",
          poster: "/products/the-essential-shoulder-bag/tan-cognac-front.png",
        },
      ],
    },
    "womens-pebbled-leather-crescent-hobo-bag": {
      cover: "/products/womens-pebbled-leather-crescent-hobo-bag/white-front.png",
      ringGradient:
        "conic-gradient(from 140deg, #e7e5e4, #a8a29e, #78716c, #a8a29e, #e7e5e4)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-crescent-hobo-bag.mp4",
          poster: "/products/womens-pebbled-leather-crescent-hobo-bag/white-front.png",
        },
      ],
    },
  } satisfies Record<string, BrandStoryProductOverride>,
} as const;

export type BrandStoriesConfig = typeof brandStories;