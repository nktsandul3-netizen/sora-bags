// Единая конфигурация бренда. Поменяйте значения здесь — и они обновятся по всему сайту.

export const brand = {
  name: "SÓRA",
  legalName: 'ООО «СÓРА»',
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
    vk: "https://vk.com/luma",
    facebook: "https://facebook.com/luma",
    tiktok: "https://www.tiktok.com/@radobags",
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
  version: 4,
  mode: "tiktok" as "tiktok" | "video",
  /** Автосмена ролика в карточке (мс) */
  rotateIntervalMs: 7000,

  /** Замените url на свои ролики из TikTok */
  tiktokVideos: [
    {
      url: "https://www.tiktok.com/@radobags/video/7645706113463274772",
      shareUrl: "https://vt.tiktok.com/ZSQMqWH6j/",
      title: "Сумки SÓRA",
      mp4Src: "/videos/radobags-9450.mp4",
      posterSrc: "/hero-amalfi-4k.jpg",
      collectionHref: "/bags",
    },
    {
      url: "",
      title: "Аксессуары",
      posterSrc: "/hero-orange-grove-v3.png",
      collectionHref: "/accessories",
    },
    {
      url: "",
      title: "Новинки",
      posterSrc: "/hero-4k.jpg",
      collectionHref: "/new",
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