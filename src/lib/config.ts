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
  phones: ["+373 600 66665"],
  address: "г. Кишинёв, Республика Молдова",
  workingHours: "Пн–Вс: 10:00 – 21:00",
  social: {
    instagram: "https://www.instagram.com/sora.italy",
    telegram: "https://t.me/+37360066665",
    whatsapp: "https://wa.me/37360066665",
    viber: "viber://chat?number=%2B37360066665",
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

  tiktokLabel: "Перейти в TikTok",
  collectionLabel: "Перейти в TikTok",

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

export type BrandStoryHighlightOverride = {
  cover?: string;
  slides?: BrandStorySlide[];
  cta?: "collection" | "more" | "shop";
  ctaHref?: string;
  ringGradient?: string;
};

export type BrandStoryProductOverride = BrandStoryHighlightOverride & {
  /** Переопределения по id хайлайта (in-motion, …) */
  highlights?: Partial<Record<string, BrandStoryHighlightOverride>>;
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
    "womens-pleated-leather-frame-clutch",
    "womens-suede-wing-tote-bag",
    "womens-pebbled-leather-wing-flap-tote-bag",
    "womens-pebbled-leather-heart-shaped-handbag",
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
      highlights: {
        "in-motion": {
          cover: "/products/the-essential-shoulder-bag/tan-cognac-lifestyle-v2.png",
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
      },
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
    "womens-pleated-leather-frame-clutch": {
      cover: "/products/womens-pleated-leather-frame-clutch/cognac-front-alt.png",
      ringGradient:
        "conic-gradient(from 140deg, #d4a574, #a0643f, #7c4a2d, #a0643f, #d4a574)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-pleated-frame-clutch.mp4",
          poster: "/products/womens-pleated-leather-frame-clutch/cognac-front-alt.png",
        },
      ],
    },
    "womens-suede-wing-tote-bag": {
      highlights: {
        "in-motion": {
          cover: "/products/womens-suede-wing-tote-bag/dark-chocolate-front.png",
          ringGradient:
            "conic-gradient(from 140deg, #d4a574, #8b5a2b, #3a2a20, #8b5a2b, #d4a574)",
          slides: [
            {
              type: "video",
              src: "/videos/sora-story-in-motion-suede-wing-tote-bag.mp4",
              poster: "/products/womens-suede-wing-tote-bag/dark-chocolate-front.png",
            },
          ],
        },
      },
    },
    "womens-pebbled-leather-wing-flap-tote-bag": {
      cover: "/products/womens-pebbled-leather-wing-flap-tote-bag/light-blue-front-alt.png",
      ringGradient:
        "conic-gradient(from 140deg, #bae6fd, #7dd3fc, #38bdf8, #7dd3fc, #bae6fd)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-wing-flap-tote-bag.mp4",
          poster: "/products/womens-pebbled-leather-wing-flap-tote-bag/light-blue-front-alt.png",
        },
      ],
    },
    "womens-pebbled-leather-heart-shaped-handbag": {
      cover: "/products/womens-pebbled-leather-heart-shaped-handbag/yellow-front-set.png",
      ringGradient:
        "conic-gradient(from 140deg, #fde68a, #e5b318, #c9287a, #e5b318, #fde68a)",
      slides: [
        {
          type: "video",
          src: "/videos/sora-story-in-motion-heart-shaped-handbag.mp4",
          poster: "/products/womens-pebbled-leather-heart-shaped-handbag/yellow-front-set.png",
        },
      ],
    },
  } satisfies Record<string, BrandStoryProductOverride>,
} as const;

export type BrandStoriesConfig = typeof brandStories;

export type HomeStoryRailTile = {
  id: string;
  label: string;
  cover: string;
  /** Product slug for CTA / pricing on the home rail. */
  productSlug?: string;
  /** Starting price in MDL shown under the label. */
  priceFrom?: number;
  /** Conic gradient for the story ring — match bag color. */
  ringGradient?: string;
  slides: BrandStorySlide[];
};

export const homeAsOnMeRail = {
  title: "IN MOTION",
  tiles: [
      {
        id: "ottilie",
        label: "OTTILIE",
        productSlug: "womens-smooth-leather-compact-baguette-bag",
        priceFrom: 1899,
        ringGradient:
          "conic-gradient(from 140deg, #c2410c, #ea580c, #f97316, #fb923c, #ea580c, #c2410c)",
        cover: "/products/womens-smooth-leather-compact-baguette-bag/red-orange-front.png",
        slides: [
          {
            type: "video",
            src: "/videos/sora-story-in-motion-baguette.mp4",
            poster: "/products/womens-smooth-leather-compact-baguette-bag/red-orange-front.png",
          },
        ],
      },
      {
        id: "fiamma",
        label: "FIAMMA",
        productSlug: "womens-pleated-leather-frame-clutch",
        priceFrom: 3199,
        ringGradient:
          "conic-gradient(from 140deg, #5c3a21, #8a4b27, #a86b3c, #c4a484, #8a4b27, #5c3a21)",
        cover: "/products/womens-pleated-leather-frame-clutch/cognac-front-alt.png",
        slides: [
          {
            type: "video",
            src: "/videos/sora-story-in-motion-pleated-frame-clutch.mp4",
            poster: "/products/womens-pleated-leather-frame-clutch/cognac-front-alt.png",
          },
        ],
      },
      {
        id: "aurea",
        label: "AUREA",
        productSlug: "womens-pebbled-leather-rectangular-handbag",
        priceFrom: 2199,
        ringGradient:
          "conic-gradient(from 140deg, #8a7a68, #a89884, #c4b5a0, #d6c8b4, #a89884, #8a7a68)",
        cover: "/products/womens-pebbled-leather-rectangular-handbag/taupe-front.png",
        slides: [
          {
            type: "video",
            src: "/videos/sora-story-in-motion-rectangular-handbag.mp4",
            poster: "/products/womens-pebbled-leather-rectangular-handbag/taupe-front.png",
          },
        ],
      },
      {
        id: "solange",
        label: "SOLANGE",
        productSlug: "womens-pebbled-leather-wing-flap-tote-bag",
        priceFrom: 2499,
        ringGradient:
          "conic-gradient(from 140deg, #6b8a9a, #8aa8b5, #a8c4ce, #c5d8e0, #8aa8b5, #6b8a9a)",
        cover: "/products/womens-pebbled-leather-wing-flap-tote-bag/light-blue-front-alt.png",
        slides: [
          {
            type: "video",
            src: "/videos/sora-story-in-motion-wing-flap-tote-bag.mp4",
            poster: "/products/womens-pebbled-leather-wing-flap-tote-bag/light-blue-front-alt.png",
          },
        ],
      },
    ] satisfies HomeStoryRailTile[],
} as const;

export type HomeAsOnMeRailConfig = typeof homeAsOnMeRail;