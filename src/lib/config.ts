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
    instagram: "https://www.instagram.com/sora.italy",
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

export type BrandStoryHighlightOverride = {
  cover?: string;
  slides?: BrandStorySlide[];
  cta?: "collection" | "more" | "shop";
  ctaHref?: string;
  ringGradient?: string;
};

export type BrandStoryProductOverride = BrandStoryHighlightOverride & {
  /** Переопределения по id хайлайта (in-motion, as-seen-on, …) */
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
    "womens-pebbled-leather-accordion-buckle-shoulder-bag",
    "premium-leather-travel-tote-bag-black",
    "structured-leather-tote-bag-burgundy",
    "womens-pebbled-leather-crescent-hobo-bag",
    "womens-pebbled-leather-kiss-lock-pouch-bag-light-blue",
    "womens-pleated-leather-frame-clutch",
    "womens-pebbled-leather-side-drawstring-shoulder-bag",
    "womens-pebbled-leather-two-tone-bowling-bag",
    "womens-pebbled-leather-turn-lock-flap-shoulder-bag-black",
    "elegant-leather-hobo-bag-taupe",
    "elegant-leather-hobo-bag-smooth-black",
    "woven-leather-shopper-tote-black",
    "womens-smooth-leather-chain-strap-crescent-hobo-bag",
    "womens-suede-wing-tote-bag",
    "womens-pebbled-leather-ring-handle-structured-bag",
    "womens-pebbled-leather-wing-flap-tote-bag",
    "womens-woven-suede-flap-clutch-bag",
    "womens-smooth-leather-metal-ring-crescent-hobo-bag",
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
    {
      id: "as-seen-on",
      label: "AS SEEN ON",
      cover: "/hero-amalfi-terrace-hq.jpg",
      slides: [],
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
        "as-seen-on": {
          cover: "/products/the-essential-shoulder-bag/tan-cognac-lifestyle-v3.png",
          ringGradient:
            "conic-gradient(from 140deg, #c4b5a0, #8b7355, #6b5344, #8b7355, #c4b5a0)",
          slides: [
            {
              type: "image",
              src: "/products/the-essential-shoulder-bag/tan-cognac-lifestyle-v2.png",
            },
            {
              type: "image",
              src: "/products/the-essential-shoulder-bag/tan-cognac-lifestyle-v3.png",
            },
          ],
        },
      },
    },
    "womens-pebbled-leather-accordion-buckle-shoulder-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-1.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #fde047, #ca8a04, #854d0e, #ca8a04, #fde047)",
          slides: [
            {
              type: "image",
              src: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-1.jpg",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-2.jpg",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-3.jpg",
            },
          ],
        },
      },
    },
    "premium-leather-travel-tote-bag-black": {
      highlights: {
        "as-seen-on": {
          cover: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-2.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #d4a574, #a0643f, #7c4a2d, #a0643f, #d4a574)",
          slides: [
            {
              type: "image",
              src: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-1.jpg",
            },
            {
              type: "image",
              src: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-2.jpg",
            },
            {
              type: "image",
              src: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-3.jpg",
            },
          ],
        },
      },
    },
    "structured-leather-tote-bag-burgundy": {
      highlights: {
        "as-seen-on": {
          cover: "/products/structured-leather-tote-bag/as-seen-on-olive-storefront-2.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #fca5a5, #9f1239, #4d5d2f, #9f1239, #fca5a5)",
          slides: [
            {
              type: "image",
              src: "/products/structured-leather-tote-bag/as-seen-on-olive-storefront-1.jpg",
            },
            {
              type: "image",
              src: "/products/structured-leather-tote-bag/as-seen-on-olive-storefront-2.jpg",
            },
            {
              type: "image",
              src: "/products/structured-leather-tote-bag/as-seen-on-olive-storefront-3.jpg",
            },
            {
              type: "image",
              src: "/products/structured-leather-tote-bag/as-seen-on-burgundy-storefront.jpg",
            },
          ],
        },
      },
    },
    "womens-pebbled-leather-kiss-lock-pouch-bag-light-blue": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-pebbled-leather-kiss-lock-pouch-bag/as-seen-on-light-blue-mirror-1.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #bae6fd, #7dd3fc, #38bdf8, #7dd3fc, #bae6fd)",
          slides: [
            {
              type: "image",
              src: "/products/womens-pebbled-leather-kiss-lock-pouch-bag/as-seen-on-light-blue-mirror-1.jpg",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-kiss-lock-pouch-bag/as-seen-on-light-blue-mirror-2.jpg",
            },
          ],
        },
      },
    },
    "womens-pebbled-leather-turn-lock-flap-shoulder-bag-black": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-pebbled-leather-turn-lock-flap-shoulder-bag-black/as-seen-on-mirror-2.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #d4a574, #8b5a2b, #3a2a20, #8b5a2b, #d4a574)",
          slides: [
            {
              type: "image",
              src: "/products/womens-pebbled-leather-turn-lock-flap-shoulder-bag-black/as-seen-on-mirror-1.jpg",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-turn-lock-flap-shoulder-bag-black/as-seen-on-mirror-2.jpg",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-turn-lock-flap-shoulder-bag-black/as-seen-on-mirror-3.jpg",
            },
          ],
        },
      },
    },
    "elegant-leather-hobo-bag-taupe": {
      highlights: {
        "as-seen-on": {
          cover: "/products/elegant-leather-hobo-bag-classic/as-seen-on-mirror-2.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #d4a574, #8b5a2b, #3a2a20, #8b5a2b, #d4a574)",
          slides: [
            {
              type: "image",
              src: "/products/elegant-leather-hobo-bag-classic/as-seen-on-mirror-1.jpg",
            },
            {
              type: "image",
              src: "/products/elegant-leather-hobo-bag-classic/as-seen-on-mirror-2.jpg",
            },
            {
              type: "image",
              src: "/products/elegant-leather-hobo-bag-classic/as-seen-on-mirror-3.jpg",
            },
          ],
        },
      },
    },
    "elegant-leather-hobo-bag-smooth-black": {
      highlights: {
        "as-seen-on": {
          cover: "/products/elegant-leather-hobo-bag-smooth/smooth-white-lifestyle.png",
          ringGradient:
            "conic-gradient(from 140deg, #f5f5f0, #e7e5e4, #d6d3d1, #e7e5e4, #f5f5f0)",
          slides: [
            {
              type: "image",
              src: "/products/elegant-leather-hobo-bag-smooth/smooth-white-lifestyle.png",
            },
          ],
        },
      },
    },
    "woven-leather-shopper-tote-black": {
      highlights: {
        "as-seen-on": {
          cover: "/products/woven-leather-shopper-tote/as-seen-on-mirror-1.jpg",
          ringGradient:
            "conic-gradient(from 140deg, #e7e5e4, #78716c, #1c1b1a, #78716c, #e7e5e4)",
          slides: [
            {
              type: "image",
              src: "/products/woven-leather-shopper-tote/as-seen-on-mirror-1.jpg",
            },
            {
              type: "image",
              src: "/products/woven-leather-shopper-tote/as-seen-on-mirror-2.jpg",
            },
            {
              type: "image",
              src: "/products/woven-leather-shopper-tote/as-seen-on-lifestyle-1.jpg",
            },
            {
              type: "image",
              src: "/products/woven-leather-shopper-tote/as-seen-on-inside-1.jpg",
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
    "womens-pebbled-leather-side-drawstring-shoulder-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-pebbled-leather-side-drawstring-shoulder-bag/as-seen-on-mirror-2.png",
          ringGradient:
            "conic-gradient(from 140deg, #9ca3af, #4b5563, #1f2937, #4b5563, #9ca3af)",
          slides: [
            {
              type: "image",
              src: "/products/womens-pebbled-leather-side-drawstring-shoulder-bag/as-seen-on-mirror-1.png",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-side-drawstring-shoulder-bag/as-seen-on-mirror-2.png",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-side-drawstring-shoulder-bag/as-seen-on-mirror-3.png",
            },
          ],
        },
      },
    },
    "womens-pebbled-leather-two-tone-bowling-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-2.png",
          ringGradient:
            "conic-gradient(from 140deg, #b5a498, #7b6658, #4b3429, #7b6658, #b5a498)",
          slides: [
            {
              type: "image",
              src: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-1.png",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-2.png",
            },
            {
              type: "image",
              src: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-3.png",
            },
          ],
        },
      },
    },
    "womens-smooth-leather-chain-strap-crescent-hobo-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-smooth-leather-chain-strap-crescent-hobo-bag/as-seen-on-mirror-2.png",
          ringGradient:
            "conic-gradient(from 140deg, #9ca3af, #4b5563, #1f2937, #4b5563, #9ca3af)",
          slides: [
            {
              type: "image",
              src: "/products/womens-smooth-leather-chain-strap-crescent-hobo-bag/as-seen-on-mirror-1.png",
            },
            {
              type: "image",
              src: "/products/womens-smooth-leather-chain-strap-crescent-hobo-bag/as-seen-on-mirror-2.png",
            },
            {
              type: "image",
              src: "/products/womens-smooth-leather-chain-strap-crescent-hobo-bag/as-seen-on-mirror-3.png",
            },
          ],
        },
      },
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
        "as-seen-on": {
          cover: "/products/womens-suede-wing-tote-bag/as-seen-on-1.png",
          ringGradient:
            "conic-gradient(from 140deg, #d4a574, #8b5a2b, #3a2a20, #8b5a2b, #d4a574)",
          slides: [
            {
              type: "image",
              src: "/products/womens-suede-wing-tote-bag/as-seen-on-1.png",
            },
            {
              type: "image",
              src: "/products/womens-suede-wing-tote-bag/as-seen-on-2.png",
            },
          ],
        },
      },
    },
    "womens-pebbled-leather-ring-handle-structured-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-pebbled-leather-ring-handle-structured-bag/as-seen-on-1.png",
          ringGradient:
            "conic-gradient(from 140deg, #f5f5f0, #e7e5e4, #d6d3d1, #e7e5e4, #f5f5f0)",
          slides: [
            {
              type: "image",
              src: "/products/womens-pebbled-leather-ring-handle-structured-bag/as-seen-on-1.png",
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
    "womens-woven-suede-flap-clutch-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-woven-suede-flap-clutch-bag/as-seen-on-1.png",
          ringGradient:
            "conic-gradient(from 140deg, #fca5a5, #9f1239, #541f2d, #9f1239, #fca5a5)",
          slides: [
            {
              type: "image",
              src: "/products/womens-woven-suede-flap-clutch-bag/as-seen-on-1.png",
            },
            {
              type: "image",
              src: "/products/womens-woven-suede-flap-clutch-bag/as-seen-on-2.png",
            },
          ],
        },
      },
    },
    "womens-smooth-leather-metal-ring-crescent-hobo-bag": {
      highlights: {
        "as-seen-on": {
          cover: "/products/womens-smooth-leather-metal-ring-crescent-hobo-bag/as-seen-on-1.png",
          ringGradient:
            "conic-gradient(from 140deg, #d4a574, #8a4b27, #5c3317, #8a4b27, #d4a574)",
          slides: [
            {
              type: "image",
              src: "/products/womens-smooth-leather-metal-ring-crescent-hobo-bag/as-seen-on-1.png",
            },
            {
              type: "image",
              src: "/products/womens-smooth-leather-metal-ring-crescent-hobo-bag/as-seen-on-2.png",
            },
          ],
        },
      },
    },
  } satisfies Record<string, BrandStoryProductOverride>,
} as const;

export type BrandStoriesConfig = typeof brandStories;

export type HomeStoryRailTile = {
  id: string;
  label: string;
  cover: string;
  slides: BrandStorySlide[];
};

export const homeAsOnMeRail = {
  title: "AS ON ME",
  tiles: [
      {
        id: "accordion",
        label: "ACCORDION",
        cover: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-1.jpg",
        slides: [
          {
            type: "image",
            src: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-1.jpg",
          },
          {
            type: "image",
            src: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-2.jpg",
          },
          {
            type: "image",
            src: "/products/womens-pebbled-leather-accordion-buckle-shoulder-bag/as-seen-on-yellow-mirror-3.jpg",
          },
        ],
      },
      {
        id: "kiss-lock",
        label: "KISS LOCK",
        cover: "/products/womens-pebbled-leather-kiss-lock-pouch-bag/as-seen-on-light-blue-mirror-1.jpg",
        slides: [
          {
            type: "image",
            src: "/products/womens-pebbled-leather-kiss-lock-pouch-bag/as-seen-on-light-blue-mirror-1.jpg",
          },
          {
            type: "image",
            src: "/products/womens-pebbled-leather-kiss-lock-pouch-bag/as-seen-on-light-blue-mirror-2.jpg",
          },
        ],
      },
      {
        id: "travel-tote",
        label: "TRAVEL TOTE",
        cover: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-2.jpg",
        slides: [
          {
            type: "image",
            src: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-1.jpg",
          },
          {
            type: "image",
            src: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-2.jpg",
          },
          {
            type: "image",
            src: "/products/premium-leather-travel-tote-bag/as-seen-on-cognac-storefront-3.jpg",
          },
        ],
      },
      {
        id: "woven-tote",
        label: "WOVEN TOTE",
        cover: "/products/woven-leather-shopper-tote/as-seen-on-mirror-1.jpg",
        slides: [
          {
            type: "image",
            src: "/products/woven-leather-shopper-tote/as-seen-on-mirror-1.jpg",
          },
          {
            type: "image",
            src: "/products/woven-leather-shopper-tote/as-seen-on-mirror-2.jpg",
          },
          {
            type: "image",
            src: "/products/woven-leather-shopper-tote/as-seen-on-lifestyle-1.jpg",
          },
        ],
      },
      {
        id: "suede-wing",
        label: "SUEDE WING",
        cover: "/products/womens-suede-wing-tote-bag/as-seen-on-1.png",
        slides: [
          {
            type: "image",
            src: "/products/womens-suede-wing-tote-bag/as-seen-on-1.png",
          },
          {
            type: "image",
            src: "/products/womens-suede-wing-tote-bag/as-seen-on-2.png",
          },
        ],
      },
      {
        id: "bowling",
        label: "BOWLING",
        cover: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-2.png",
        slides: [
          {
            type: "image",
            src: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-1.png",
          },
          {
            type: "image",
            src: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-2.png",
          },
          {
            type: "image",
            src: "/products/womens-pebbled-leather-two-tone-bowling-bag/as-seen-on-mirror-3.png",
          },
        ],
      },
    ] satisfies HomeStoryRailTile[],
} as const;

export type HomeAsOnMeRailConfig = typeof homeAsOnMeRail;