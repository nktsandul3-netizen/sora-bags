import type { BrandDef, CategoryDef, Product } from "./types";

export const bagCategories: CategoryDef[] = [
  { slug: "vse-sumki", name: "Все сумки", section: "bags" },
  { slug: "cherez-plecho", name: "Сумки через плечо", section: "bags" },
  { slug: "shoulder-bag", name: "Shoulder Bag", section: "bags" },
  { slug: "crossbody-bag", name: "Crossbody Bag", section: "bags" },
  { slug: "hobo-bag", name: "Hobo Bag", section: "bags" },
  { slug: "moon-bag", name: "Moon Bag", section: "bags" },
  { slug: "bagety", name: "Багеты", section: "bags" },
  { slug: "ryukzaki", name: "Женские рюкзаки", section: "bags" },
  { slug: "bolshie", name: "Большие сумки", section: "bags" },
  { slug: "tote-bag", name: "Tote Bag", section: "bags" },
  { slug: "shopper-tote-bag", name: "Shopper Tote Bag", section: "bags" },
  { slug: "summer-tote-bag", name: "Summer Tote Bag", section: "bags" },
  { slug: "summer-bag", name: "Summer Bag", section: "bags" },
  { slug: "beach-tote-bag", name: "Beach Tote Bag", section: "bags" },
  { slug: "bucket-bag", name: "Bucket Bag", section: "bags" },
  { slug: "cage-bag", name: "Cage Bag", section: "bags" },
  { slug: "bowling-bag", name: "Bowling Bag", section: "bags" },
  { slug: "frame-bag", name: "Frame Bag", section: "bags" },
  { slug: "meshki", name: "Сумки-мешки", section: "bags" },
  { slug: "mini", name: "Мини-сумки", section: "bags" },
  { slug: "top-handle-bag", name: "Top Handle Bag", section: "bags" },
  { slug: "mini-top-handle-bag", name: "Mini Top Handle Bag", section: "bags" },
  { slug: "klatchi", name: "Клатчи", section: "bags" },
  { slug: "delovye", name: "Деловые сумки", section: "bags" },
  { slug: "dorozhnye", name: "Дорожные сумки", section: "bags" },
  { slug: "poyasnye", name: "Поясные сумки", section: "bags" },
];

export const accessoryCategories: CategoryDef[] = [
  { slug: "vse-aksessuary", name: "Все аксессуары", section: "accessories" },
  { slug: "zhenskie-koshelki", name: "Женские кошельки", section: "accessories" },
  { slug: "kartholdery", name: "Картхолдеры", section: "accessories" },
  { slug: "klyuchnicy", name: "Ключницы", section: "accessories" },
  { slug: "kosmetichki", name: "Косметички", section: "accessories" },
  { slug: "oblozhki", name: "Обложки для документов", section: "accessories" },
  { slug: "remni", name: "Ремни", section: "accessories" },
  { slug: "podveski", name: "Подвески для сумок", section: "accessories" },
  { slug: "nabory", name: "Подарочные наборы", section: "accessories" },
];

export const allCategories = [...bagCategories, ...accessoryCategories];

export const brands: BrandDef[] = [
  {
    slug: "luma-atelier",
    name: "SÓRA Atelier",
    section: "both",
    about:
      "Собственная линия бренда: лаконичные силуэты, плотная зернистая кожа и фурнитура без лишнего блеска.",
  },
  {
    slug: "aurelia",
    name: "Aurelia",
    section: "bags",
    about:
      "Женственные формы и мягкая телячья кожа. Сумки, которые одинаково уместны и днём, и вечером.",
  },
  {
    slug: "marrone",
    name: "Marrone",
    section: "both",
    about:
      "Тёплая палитра коньячных и табачных оттенков, выраженная фактура кожи и ручная отделка кромки.",
  },
  {
    slug: "castello",
    name: "Castello",
    section: "bags",
    about:
      "Строгая геометрия и деловой характер. Портфели и структурные модели для города.",
  },
  {
    slug: "vionetta",
    name: "Vionetta",
    section: "bags",
    about:
      "Архитектурные силуэты и крупная фурнитура. Заметные акцентные модели сезона.",
  },
  {
    slug: "pelle-nova",
    name: "Pelle Nova",
    section: "accessories",
    about:
      "Кошельки, картхолдеры и ремни из гладкой кожи. Аккуратные детали и долговечная отделка.",
  },
];

// Палитра доступных цветов
const C = {
  black: { name: "Чёрный", hex: "#1c1b1a" },
  cognac: { name: "Коньячный", hex: "#8a4b27" },
  tanCognac: { name: "Tan Cognac", hex: "#a0643f" },
  brown: { name: "Коричневый", hex: "#5b3a24" },
  beige: { name: "Бежевый", hex: "#cbb79a" },
  sand: { name: "Песочный", hex: "#d8c4a3" },
  bordo: { name: "Бордовый", hex: "#6e2733" },
  navy: { name: "Синий", hex: "#27364f" },
  green: { name: "Зелёный", hex: "#3a4a3a" },
  grey: { name: "Серый", hex: "#7d7a74" },
  rose: { name: "Пудровый", hex: "#c9a7a0" },
  blush: { name: "Blush", hex: "#c9a6a1" },
  taupe: { name: "Taupe", hex: "#7b6658" },
  offWhite: { name: "Off-White", hex: "#eee7d9" },
  jetBlack: { name: "Jet Black", hex: "#111111" },
  burgundy: { name: "Burgundy", hex: "#6f2431" },
  darkBrown: { name: "Dark Brown", hex: "#3a2f2a" },
  rubyRed: { name: "Ruby Red", hex: "#b21b2a" },
  espresso: { name: "Espresso", hex: "#3a2a24" },
  ivory: { name: "Ivory", hex: "#efe7db" },
  chocolateBrown: { name: "Chocolate Brown", hex: "#4b3429" },
  blackOnyx: { name: "Black Onyx", hex: "#1a1a1a" },
  platinumSilver: { name: "Platinum Silver", hex: "#b8b8b8" },
  cognacBrown: { name: "Cognac Brown", hex: "#8b5a2b" },
  royalGold: { name: "Royal Gold", hex: "#c9a227" },
  cherryRed: { name: "Cherry Red", hex: "#c41e3a" },
  deepBurgundy: { name: "Deep Burgundy", hex: "#541f2d" },
  slateGrey: { name: "Slate Grey", hex: "#54565a" },
  sageGreen: { name: "Sage Green", hex: "#8a9a7b" },
  lightBlue: { name: "Light Blue", hex: "#a8c4d4" },
  butterYellow: { name: "Butter Yellow", hex: "#f5e6a8" },
  dustyPink: { name: "Dusty Pink", hex: "#d4a5a5" },
  lightGrey: { name: "Light Grey", hex: "#c8c8c8" },
  white: { name: "White", hex: "#f5f5f0" },
  blackRed: { name: "Black / Red", hex: "#1a1a1a" },
  red: { name: "Red", hex: "#c41e3a" },
  navyBlue: { name: "Navy Blue", hex: "#27364f" },
  skyBlue: { name: "Sky Blue", hex: "#9ec5d9" },
  babyBlue: { name: "Baby Blue", hex: "#b8d4e8" },
  pink: { name: "Pink", hex: "#e8b4b8" },
  orange: { name: "Orange", hex: "#e07a2f" },
  pistachio: { name: "Pistachio", hex: "#93c572" },
  mint: { name: "Mint", hex: "#98d4bb" },
};

export const products: Product[] = [
  {
    slug: "suede-fringe-shoulder-bag-taupe",
    title: "Suede Fringe Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shoulder-bag",
    price: 1600,
    images: [
      { src: "/products/suede-fringe-shoulder-bag/taupe-lifestyle-v2.png", alt: "Suede Fringe Shoulder Bag Taupe в образе" },
    ],
    colors: [
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/suede-fringe-shoulder-bag/taupe-lifestyle-v2.png", alt: "Suede Fringe Shoulder Bag Taupe в образе" },
          { src: "/products/suede-fringe-shoulder-bag/taupe-1.png", alt: "Suede Fringe Shoulder Bag Taupe — вид спереди" },
          { src: "/products/suede-fringe-shoulder-bag/taupe-2.png", alt: "Suede Fringe Shoulder Bag Taupe — под углом" },
          { src: "/products/suede-fringe-shoulder-bag/taupe-3.png", alt: "Suede Fringe Shoulder Bag Taupe — сбоку" },
          { src: "/products/suede-fringe-shoulder-bag/taupe-4.png", alt: "Suede Fringe Shoulder Bag Taupe — внутри" },
        ],
      },
      {
        name: "Black",
        hex: C.black.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/suede-fringe-shoulder-bag/black-1.png", alt: "Suede Fringe Shoulder Bag Black — вид спереди" },
          { src: "/products/suede-fringe-shoulder-bag/black-2.png", alt: "Suede Fringe Shoulder Bag Black — под углом" },
          { src: "/products/suede-fringe-shoulder-bag/black-3.png", alt: "Suede Fringe Shoulder Bag Black — сбоку" },
          { src: "/products/suede-fringe-shoulder-bag/black-4.png", alt: "Suede Fringe Shoulder Bag Black — внутри" },
        ],
      },
      {
        ...C.cherryRed,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/suede-fringe-shoulder-bag/cherry-red-1.png", alt: "Suede Fringe Shoulder Bag Cherry Red — вид спереди" },
          { src: "/products/suede-fringe-shoulder-bag/cherry-red-2.png", alt: "Suede Fringe Shoulder Bag Cherry Red — под углом" },
          { src: "/products/suede-fringe-shoulder-bag/cherry-red-3.png", alt: "Suede Fringe Shoulder Bag Cherry Red — сбоку" },
          { src: "/products/suede-fringe-shoulder-bag/cherry-red-4.png", alt: "Suede Fringe Shoulder Bag Cherry Red — внутри" },
        ],
      },
      {
        ...C.deepBurgundy,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/suede-fringe-shoulder-bag/deep-burgundy-1.png", alt: "Suede Fringe Shoulder Bag Deep Burgundy — вид спереди" },
          { src: "/products/suede-fringe-shoulder-bag/deep-burgundy-2.png", alt: "Suede Fringe Shoulder Bag Deep Burgundy — под углом" },
          { src: "/products/suede-fringe-shoulder-bag/deep-burgundy-3.png", alt: "Suede Fringe Shoulder Bag Deep Burgundy — сбоку" },
          { src: "/products/suede-fringe-shoulder-bag/deep-burgundy-4.png", alt: "Suede Fringe Shoulder Bag Deep Burgundy — внутри" },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/suede-fringe-shoulder-bag/off-white-1.png", alt: "Suede Fringe Shoulder Bag Off-White — вид спереди" },
          { src: "/products/suede-fringe-shoulder-bag/off-white-2.png", alt: "Suede Fringe Shoulder Bag Off-White — под углом" },
          { src: "/products/suede-fringe-shoulder-bag/off-white-3.png", alt: "Suede Fringe Shoulder Bag Off-White — сбоку" },
          { src: "/products/suede-fringe-shoulder-bag/off-white-4.png", alt: "Suede Fringe Shoulder Bag Off-White — внутри" },
        ],
      },
      {
        ...C.slateGrey,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/suede-fringe-shoulder-bag/slate-grey-1.png", alt: "Suede Fringe Shoulder Bag Slate Grey — вид спереди" },
          { src: "/products/suede-fringe-shoulder-bag/slate-grey-2.png", alt: "Suede Fringe Shoulder Bag Slate Grey — под углом" },
          { src: "/products/suede-fringe-shoulder-bag/slate-grey-3.png", alt: "Suede Fringe Shoulder Bag Slate Grey — сбоку" },
          { src: "/products/suede-fringe-shoulder-bag/slate-grey-4.png", alt: "Suede Fringe Shoulder Bag Slate Grey — внутри" },
        ],
      },
    ],
    material: "Premium Genuine Suede Leather",
    description:
      "Стильная женская сумка из натуральной замши, вдохновлённая эстетикой богемного шика и итальянской элегантности. Мягкая фактура замши и декоративная бахрома создают выразительный образ, который идеально дополнит как повседневный, так и вечерний гардероб.\n\nУдобная форма и вместительное внутреннее пространство позволяют комфортно разместить все необходимые вещи. Сумка оснащена короткой ручкой для ношения в руке и регулируемым плечевым ремнём для максимального удобства. Металлическая поворотная застёжка подчёркивает премиальный характер модели и обеспечивает надёжное закрытие.",
    isNew: true,
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "36 × 13 × 22 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Genuine Suede Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Металлическая поворотная" },
      { label: "Ремень", value: "Регулируемый плечевой ремень" },
      { label: "Ручка", value: "Короткая верхняя ручка" },
      { label: "Декор", value: "Декоративная бахрома по передней части" },
    ],
  },
  {
    slug: "premium-suede-shoulder-bag-black",
    title: "Premium Suede Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shoulder-bag",
    price: 1600,
    images: [
      { src: "/products/premium-suede-shoulder-bag/shoulder-pink-lifestyle-v3.png", alt: "Premium Suede Shoulder Bag Pink в образе" },
    ],
    colors: [
      {
        ...C.pink,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shoulder-bag/shoulder-pink-lifestyle-v3.png", alt: "Premium Suede Shoulder Bag Pink в образе" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-pink-1.png", alt: "Premium Suede Shoulder Bag Pink — вид спереди" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-pink-2.png", alt: "Premium Suede Shoulder Bag Pink — внутри" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shoulder-bag/shoulder-black-1.png", alt: "Premium Suede Shoulder Bag Black — вид спереди" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-black-2.png", alt: "Premium Suede Shoulder Bag Black — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shoulder-bag/shoulder-cognac-1.png", alt: "Premium Suede Shoulder Bag Cognac — вид спереди" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-cognac-2.png", alt: "Premium Suede Shoulder Bag Cognac — внутри" },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shoulder-bag/shoulder-beige-1.png", alt: "Premium Suede Shoulder Bag Beige — вид спереди" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-beige-2.png", alt: "Premium Suede Shoulder Bag Beige — внутри" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shoulder-bag/shoulder-taupe-1.png", alt: "Premium Suede Shoulder Bag Taupe — вид спереди" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-taupe-2.png", alt: "Premium Suede Shoulder Bag Taupe — внутри" },
        ],
      },
      {
        ...C.burgundy,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shoulder-bag/shoulder-burgundy-1.png", alt: "Premium Suede Shoulder Bag Burgundy — вид спереди" },
          { src: "/products/premium-suede-shoulder-bag/shoulder-burgundy-2.png", alt: "Premium Suede Shoulder Bag Burgundy — внутри" },
        ],
      },
    ],
    material: "Premium Suede Leather",
    description:
      "Элегантная женская сумка из премиальной натуральной замши, выполненная в актуальном удлинённом силуэте Shoulder Bag. Лаконичные линии, мягкая фактура материала и изящная форма делают модель стильным дополнением как повседневного, так и вечернего гардероба.\n\nУдлинённые ручки обеспечивают комфортное ношение на плече, а надёжная застёжка-молния защищает содержимое сумки. Несмотря на компактный внешний вид, модель легко вмещает телефон, кошелёк, косметику, ключи и другие необходимые вещи.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "34 × 9.5 × 17 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Suede Leather" },
      { label: "Силуэт", value: "Shoulder Bag" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Ручки", value: "Длинные для ношения на плече" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура" },
    ],
  },
  {
    slug: "elegant-leather-shoulder-bag-cognac",
    title: "Elegant Leather Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shoulder-bag",
    price: 1600,
    colors: [
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-shoulder-bag-smooth/smooth-shoulder-cognac-1.png", alt: "Elegant Leather Shoulder Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-shoulder-bag-smooth/smooth-shoulder-cognac-2.png", alt: "Elegant Leather Shoulder Bag Cognac — внутри" },
        ],
      },
      {
        name: "Blue",
        hex: "#344f63",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-shoulder-bag-smooth/smooth-shoulder-blue-1.png", alt: "Elegant Leather Shoulder Bag Blue — вид спереди" },
          { src: "/products/elegant-leather-shoulder-bag-smooth/smooth-shoulder-blue-2.png", alt: "Elegant Leather Shoulder Bag Blue — внутри" },
        ],
      },
      {
        name: "Red",
        hex: C.red.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-shoulder-bag-smooth/smooth-shoulder-red-1.png", alt: "Elegant Leather Shoulder Bag Red — вид спереди" },
          { src: "/products/elegant-leather-shoulder-bag-smooth/smooth-shoulder-red-2.png", alt: "Elegant Leather Shoulder Bag Red — внутри" },
        ],
      },
    ],
    material: "Premium Smooth Leather",
    description:
      "Элегантная женская сумка из премиальной гладкой кожи, выполненная в современном силуэте Shoulder Bag. Чистые линии, мягкая геометричная форма и выразительная золотистая фурнитура делают модель стильным акцентом как делового, так и повседневного образа.\n\nОсобенностью модели является широкий регулируемый плечевой ремень с декоративной металлической пряжкой, который обеспечивает комфортную посадку и подчёркивает современный характер сумки. Вместительное внутреннее отделение позволяет удобно разместить телефон, кошелёк, косметику, документы и другие необходимые вещи.\n\nЛаконичный дизайн и высокое качество итальянской кожи делают эту модель универсальным аксессуаром, который легко сочетается с классическим, городским и вечерним гардеробом.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "28 × 10 × 17 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Smooth Leather" },
      { label: "Силуэт", value: "Shoulder Bag" },
      { label: "Ремень", value: "Широкий регулируемый плечевой ремень" },
      { label: "Пряжка", value: "Декоративная металлическая пряжка премиального качества" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Конструкция", value: "Усиленная для сохранения формы" },
      { label: "Фурнитура", value: "Премиальная золотистая фурнитура" },
    ],
  },
  {
    slug: "premium-leather-kelly-shoulder-bag-black",
    title: "Premium Leather Kelly Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shoulder-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-black-1.png", alt: "Premium Leather Kelly Shoulder Bag Black — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-black-2.png", alt: "Premium Leather Kelly Shoulder Bag Black — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-cognac-1.png", alt: "Premium Leather Kelly Shoulder Bag Cognac — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-cognac-2.png", alt: "Premium Leather Kelly Shoulder Bag Cognac — внутри" },
        ],
      },
      {
        name: "Cream",
        hex: C.ivory.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-cream-1.png", alt: "Premium Leather Kelly Shoulder Bag Cream — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-cream-2.png", alt: "Premium Leather Kelly Shoulder Bag Cream — внутри" },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-beige-1.png", alt: "Premium Leather Kelly Shoulder Bag Beige — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-beige-2.png", alt: "Premium Leather Kelly Shoulder Bag Beige — внутри" },
        ],
      },
      {
        name: "Pink",
        hex: C.pink.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-pink-1.png", alt: "Premium Leather Kelly Shoulder Bag Pink — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-pink-2.png", alt: "Premium Leather Kelly Shoulder Bag Pink — внутри" },
        ],
      },
      {
        name: "Sky Blue",
        hex: C.skyBlue.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-sky-blue-1.png", alt: "Premium Leather Kelly Shoulder Bag Sky Blue — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-sky-blue-2.png", alt: "Premium Leather Kelly Shoulder Bag Sky Blue — внутри" },
        ],
      },
      {
        name: "Olive Green",
        hex: C.sageGreen.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-olive-green-1.png", alt: "Premium Leather Kelly Shoulder Bag Olive Green — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-olive-green-2.png", alt: "Premium Leather Kelly Shoulder Bag Olive Green — внутри" },
        ],
      },
      {
        name: "Butter Yellow",
        hex: C.butterYellow.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-butter-yellow-1.png", alt: "Premium Leather Kelly Shoulder Bag Butter Yellow — вид спереди" },
          { src: "/products/premium-leather-kelly-shoulder-bag/kelly-butter-yellow-2.png", alt: "Premium Leather Kelly Shoulder Bag Butter Yellow — внутри" },
        ],
      },
    ],
    material: "Premium Genuine Leather",
    description:
      "Элегантная женская сумка из премиальной натуральной кожи, вдохновлённая культовым классическим дизайном. Строгие линии, изящная форма и благородная золотистая фурнитура делают модель универсальным аксессуаром для деловых, повседневных и вечерних образов.\n\nУдобная верхняя ручка обеспечивает комфортное ношение в руке, а съёмный плечевой ремень позволяет носить сумку на плече или через плечо. Продуманное внутреннее пространство позволяет разместить телефон, кошелёк, документы, косметику и другие необходимые вещи.\n\nВысококачественная натуральная кожа с выразительной текстурой, премиальная фурнитура и безупречное итальянское исполнение подчёркивают статусный характер модели и её актуальность вне времени.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Genuine Leather" },
      { label: "Силуэт", value: "Kelly Style" },
      { label: "Конструкция", value: "Жёсткая для сохранения формы" },
      { label: "Ручка", value: "Удобная верхняя ручка" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Замок", value: "Надёжный поворотный замок" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Назначение", value: "Для повседневных, деловых и вечерних образов" },
    ],
  },
  {
    slug: "premium-woven-leather-tote-bag-black",
    title: "Premium Woven Leather Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-black-1.png", alt: "Premium Woven Leather Tote Bag Black — вид спереди" },
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-black-2.png", alt: "Premium Woven Leather Tote Bag Black — с клатчем" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-cognac-1.png", alt: "Premium Woven Leather Tote Bag Cognac — вид спереди" },
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-cognac-2.png", alt: "Premium Woven Leather Tote Bag Cognac — с клатчем" },
        ],
      },
      {
        name: "Dark Brown",
        hex: C.darkBrown.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-dark-brown-1.png", alt: "Premium Woven Leather Tote Bag Dark Brown — вид спереди" },
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-dark-brown-2.png", alt: "Premium Woven Leather Tote Bag Dark Brown — с клатчем" },
        ],
      },
      {
        name: "Taupe",
        hex: C.taupe.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-taupe-1.png", alt: "Premium Woven Leather Tote Bag Taupe — вид спереди" },
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-taupe-2.png", alt: "Premium Woven Leather Tote Bag Taupe — с клатчем" },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-beige-1.png", alt: "Premium Woven Leather Tote Bag Beige — вид спереди" },
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-beige-2.png", alt: "Premium Woven Leather Tote Bag Beige — с клатчем" },
        ],
      },
      {
        name: "Olive Green",
        hex: C.sageGreen.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-olive-green-1.png", alt: "Premium Woven Leather Tote Bag Olive Green — вид спереди" },
          { src: "/products/premium-woven-leather-tote-bag/woven-premium-olive-green-2.png", alt: "Premium Woven Leather Tote Bag Olive Green — с клатчем" },
        ],
      },
    ],
    material: "Premium Woven Leather",
    description:
      "Элегантная женская сумка из премиальной натуральной кожи с фирменным плетёным дизайном, который придаёт модели утончённый и дорогой внешний вид. Благодаря современному силуэту и мягким линиям сумка гармонично дополняет как повседневные, так и деловые образы.\n\nМодель оснащена удобными верхними ручками для ношения в руке и съёмным плечевым ремнём для максимального комфорта. В комплект входит стильный кожаный клатч-органайзер на молнии, который идеально подходит для хранения документов, косметики, телефона и других важных мелочей.\n\nПлетёная фактура кожи, премиальное качество исполнения и универсальный дизайн делают эту сумку практичным и элегантным аксессуаром на каждый день.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Woven Leather" },
      { label: "Категория", value: "Tote Bag / Handbag" },
      { label: "Плетение", value: "Эффектное ручное плетение кожи" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Ручки", value: "Удобные двойные ручки" },
      { label: "Ремень", value: "Съёмный плечевой ремень" },
      { label: "Комплект", value: "Кожаный клатч-органайзер" },
      { label: "Конструкция", value: "Лёгкая и комфортная" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура" },
      { label: "Назначение", value: "Для повседневных и деловых образов" },
    ],
  },
  {
    slug: "woven-leather-shopper-tote-black",
    title: "Woven Leather Shopper Tote",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-shopper-tote/black.png",
            alt: "Woven Leather Shopper Tote Black — вид спереди",
          },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-shopper-tote/cognac.png",
            alt: "Woven Leather Shopper Tote Cognac — вид спереди",
          },
        ],
      },
      {
        ...C.sageGreen,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-shopper-tote/sage-green.png",
            alt: "Woven Leather Shopper Tote Sage Green — вид спереди",
          },
        ],
      },
      {
        ...C.lightBlue,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-shopper-tote/light-blue.png",
            alt: "Woven Leather Shopper Tote Light Blue — вид спереди",
          },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-shopper-tote/beige.png",
            alt: "Woven Leather Shopper Tote Beige — вид спереди",
          },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-shopper-tote/off-white.png",
            alt: "Woven Leather Shopper Tote Off-White — вид спереди",
          },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная вместительная сумка-шоппер из премиальной кожи с изысканным плетёным дизайном, который подчёркивает статус и безупречный вкус своей обладательницы. Мягкий силуэт и лаконичная форма делают модель универсальным аксессуаром для повседневной жизни, работы, путешествий и шопинга.\n\nБлагодаря просторному внутреннему отделению сумка легко вмещает все необходимые вещи на каждый день, сохраняя аккуратный и стильный внешний вид. Удобные удлинённые ручки позволяют комфортно носить модель на плече или в руке.\n\nПлетёная фактура придаёт сумке выразительный характер и делает её эффектным дополнением как к деловым, так и к повседневным образам.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "40 × 17 × 27 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Кожаный шнурок" },
      { label: "Ручки", value: "Длинные для ношения на плече" },
      { label: "Исполнение", value: "Фирменное плетёное исполнение кожи" },
      { label: "Конструкция", value: "Мягкая" },
    ],
  },
  {
    slug: "premium-suede-shopper-tote-black",
    title: "Premium Suede Shopper Tote",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shopper-tote-bag",
    price: 1600,
    images: [
      { src: "/products/premium-suede-shopper-tote/suede-beige-lifestyle-v2.jpg", alt: "Premium Suede Shopper Tote Beige в образе" },
    ],
    colors: [
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shopper-tote/suede-beige-lifestyle-v2.jpg", alt: "Premium Suede Shopper Tote Beige в образе" },
          { src: "/products/premium-suede-shopper-tote/suede-beige-1.png", alt: "Premium Suede Shopper Tote Beige — с косметичкой" },
          { src: "/products/premium-suede-shopper-tote/suede-beige-2.png", alt: "Premium Suede Shopper Tote Beige — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-beige-3.png", alt: "Premium Suede Shopper Tote Beige — внутри" },
          { src: "/products/premium-suede-shopper-tote/suede-beige-4.png", alt: "Premium Suede Shopper Tote Beige — вид спереди" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shopper-tote/suede-black-1.png", alt: "Premium Suede Shopper Tote Black — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-black-2.png", alt: "Premium Suede Shopper Tote Black — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-black-3.png", alt: "Premium Suede Shopper Tote Black — внутри" },
          { src: "/products/premium-suede-shopper-tote/suede-black-4.png", alt: "Premium Suede Shopper Tote Black — с косметичкой" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shopper-tote/suede-taupe-1.png", alt: "Premium Suede Shopper Tote Taupe — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-taupe-2.png", alt: "Premium Suede Shopper Tote Taupe — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-taupe-3.png", alt: "Premium Suede Shopper Tote Taupe — с косметичкой" },
          { src: "/products/premium-suede-shopper-tote/suede-taupe-4.png", alt: "Premium Suede Shopper Tote Taupe — внутри" },
        ],
      },
      {
        ...C.babyBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-suede-shopper-tote/suede-baby-blue-1.png", alt: "Premium Suede Shopper Tote Baby Blue — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-baby-blue-2.png", alt: "Premium Suede Shopper Tote Baby Blue — вид спереди" },
          { src: "/products/premium-suede-shopper-tote/suede-baby-blue-3.png", alt: "Premium Suede Shopper Tote Baby Blue — внутри" },
          { src: "/products/premium-suede-shopper-tote/suede-baby-blue-4.png", alt: "Premium Suede Shopper Tote Baby Blue — с косметичкой" },
        ],
      },
    ],
    material: "Premium Suede Leather",
    description:
      "Стильная женская сумка-шоппер из премиальной мягкой замши, созданная для комфортного повседневного использования. Вместительный силуэт, лаконичный дизайн и благородная фактура материала делают модель универсальным аксессуаром для работы, прогулок, поездок и шопинга.\n\nУдлинённые ручки позволяют удобно носить сумку на плече, а просторное внутреннее отделение легко вмещает документы, ноутбук, косметичку и другие необходимые вещи.\n\nПрактичность, вместительность и элегантность делают эту сумку идеальным выбором для женщин, ценящих комфорт и качество итальянских изделий.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "37 × 34 × 16 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Suede Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Ручки", value: "Удлинённые для ношения на плече" },
      { label: "Конструкция", value: "Мягкая и лёгкая" },
      { label: "Назначение", value: "Документы и ноутбук" },
    ],
  },
  {
    slug: "summer-woven-denim-tote-denim-blue",
    title: "Summer Woven Denim Tote",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "summer-tote-bag",
    price: 1600,
    colors: [
      {
        name: "Denim Blue",
        hex: "#2f4b63",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/summer-woven-denim-tote/denim-blue-lifestyle.png", alt: "Summer Woven Denim Tote Denim Blue в образе" },
          { src: "/products/summer-woven-denim-tote/denim-blue-1.png", alt: "Summer Woven Denim Tote Denim Blue — вид спереди" },
          { src: "/products/summer-woven-denim-tote/denim-blue-2.png", alt: "Summer Woven Denim Tote Denim Blue — сбоку" },
          { src: "/products/summer-woven-denim-tote/denim-blue-3.png", alt: "Summer Woven Denim Tote Denim Blue — внутри" },
        ],
      },
    ],
    material: "Натуральное плетёное волокно и деним",
    description:
      "Стильная летняя сумка, сочетающая натуральное плетение и фактурный деним. Необычный дизайн с декоративной сетчатой отделкой создаёт лёгкий курортный характер модели и делает её эффектным акцентом летнего гардероба.\n\nКомпактная, но вместительная форма позволяет удобно разместить телефон, кошелёк, косметику, солнцезащитные очки и другие необходимые вещи. Внутреннее текстильное отделение на молнии обеспечивает сохранность содержимого, а удобные ручки позволяют комфортно носить сумку в руке или на сгибе локтя.\n\nМодель идеально подходит для прогулок, отдыха, путешествий, летних мероприятий и повседневных образов в стиле casual.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Натуральное плетёное волокно и деним" },
      { label: "Дизайн", value: "Оригинальный летний дизайн" },
      { label: "Отделение", value: "Внутреннее текстильное отделение на молнии" },
      { label: "Ручки", value: "Удобные короткие ручки" },
      { label: "Формат", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная" },
      { label: "Назначение", value: "Для прогулок, отдыха и ежедневного использования" },
      { label: "Стиль", value: "Курортный casual" },
    ],
  },
  {
    slug: "premium-woven-beach-tote-bag-natural-black",
    title: "Premium Woven Beach Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "beach-tote-bag",
    price: 1600,
    colors: [
      {
        name: "Natural / Black",
        hex: "#d7bd8a",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-beach-tote-bag/beach-natural-black-1.png", alt: "Premium Woven Beach Tote Bag Natural / Black — под углом" },
          { src: "/products/premium-woven-beach-tote-bag/beach-natural-black-2.png", alt: "Premium Woven Beach Tote Bag Natural / Black — вид спереди" },
          { src: "/products/premium-woven-beach-tote-bag/beach-natural-black-3.png", alt: "Premium Woven Beach Tote Bag Natural / Black — внутри" },
        ],
      },
    ],
    material: "Premium Woven Straw & Genuine Leather Details",
    description:
      "Элегантная летняя сумка премиального класса, выполненная из высококачественного плетёного материала с натуральной фактурой и дополненная деталями из натуральной кожи. Изящный полукруглый силуэт делает модель стильным акцентом для курортных, городских и повседневных образов.\n\nУдлинённые кожаные ручки обеспечивают комфортное ношение на плече, а просторное внутреннее отделение позволяет удобно разместить все необходимые вещи: телефон, кошелёк, косметичку, документы, планшет и другие аксессуары.\n\nНатуральные оттенки, благородная золотистая фурнитура и утончённый итальянский дизайн делают эту модель универсальным выбором для летнего сезона и путешествий.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Woven Straw & Genuine Leather Details" },
      { label: "Категория", value: "Beach Tote Bag / Shoulder Bag" },
      { label: "Плетение", value: "Премиальное плетёное исполнение" },
      { label: "Детали", value: "Детали и ручки из натуральной кожи" },
      { label: "Силуэт", value: "Оригинальный полукруглый силуэт" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Карман", value: "Внутренний карман на молнии" },
      { label: "Конструкция", value: "Лёгкая и удобная" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Ношение", value: "Комфортное ношение на плече" },
      { label: "Подкладка", value: "Практичная текстильная подкладка внутри" },
      { label: "Назначение", value: "Для города, отдыха и путешествий" },
    ],
  },
  {
    slug: "milano-cage-tote-bag-black-red",
    title: "Milano Cage Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "cage-bag",
    price: 1600,
    colors: [
      {
        ...C.blackRed,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/black-red-1.png", alt: "Milano Cage Tote Bag Black / Red — вид спереди" },
          { src: "/products/milano-cage-tote-bag/black-red-2.png", alt: "Milano Cage Tote Bag Black / Red — под углом" },
          { src: "/products/milano-cage-tote-bag/black-red-3.png", alt: "Milano Cage Tote Bag Black / Red — внутренний мешок" },
          { src: "/products/milano-cage-tote-bag/black-red-4.png", alt: "Milano Cage Tote Bag Black / Red — вид сверху" },
        ],
      },
      {
        ...C.red,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/red-1.png", alt: "Milano Cage Tote Bag Red — вид спереди" },
          { src: "/products/milano-cage-tote-bag/red-2.png", alt: "Milano Cage Tote Bag Red — под углом" },
          { src: "/products/milano-cage-tote-bag/red-3.png", alt: "Milano Cage Tote Bag Red — вид сверху" },
        ],
      },
      {
        ...C.sageGreen,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/sage-green-1.png", alt: "Milano Cage Tote Bag Sage Green — вид спереди" },
          { src: "/products/milano-cage-tote-bag/sage-green-2.png", alt: "Milano Cage Tote Bag Sage Green — под углом" },
          { src: "/products/milano-cage-tote-bag/sage-green-3.png", alt: "Milano Cage Tote Bag Sage Green — вид сверху" },
        ],
      },
      {
        ...C.butterYellow,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/butter-yellow-1.png", alt: "Milano Cage Tote Bag Butter Yellow — вид спереди" },
          { src: "/products/milano-cage-tote-bag/butter-yellow-2.png", alt: "Milano Cage Tote Bag Butter Yellow — под углом" },
          { src: "/products/milano-cage-tote-bag/butter-yellow-3.png", alt: "Milano Cage Tote Bag Butter Yellow — вид сверху" },
        ],
      },
      {
        ...C.dustyPink,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/dusty-pink-1.png", alt: "Milano Cage Tote Bag Dusty Pink — вид спереди" },
          { src: "/products/milano-cage-tote-bag/dusty-pink-2.png", alt: "Milano Cage Tote Bag Dusty Pink — под углом" },
          { src: "/products/milano-cage-tote-bag/dusty-pink-3.png", alt: "Milano Cage Tote Bag Dusty Pink — вид сверху" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/taupe-1.png", alt: "Milano Cage Tote Bag Taupe — вид спереди" },
          { src: "/products/milano-cage-tote-bag/taupe-2.png", alt: "Milano Cage Tote Bag Taupe — под углом" },
          { src: "/products/milano-cage-tote-bag/taupe-3.png", alt: "Milano Cage Tote Bag Taupe — вид сверху" },
        ],
      },
      {
        ...C.lightGrey,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/light-grey-1.png", alt: "Milano Cage Tote Bag Light Grey — вид спереди" },
          { src: "/products/milano-cage-tote-bag/light-grey-2.png", alt: "Milano Cage Tote Bag Light Grey — под углом" },
          { src: "/products/milano-cage-tote-bag/light-grey-3.png", alt: "Milano Cage Tote Bag Light Grey — вид сверху" },
        ],
      },
      {
        ...C.white,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-cage-tote-bag/white-1.png", alt: "Milano Cage Tote Bag White — вид спереди" },
          { src: "/products/milano-cage-tote-bag/white-2.png", alt: "Milano Cage Tote Bag White — под углом" },
          { src: "/products/milano-cage-tote-bag/white-3.png", alt: "Milano Cage Tote Bag White — вид сверху" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Стильная женская сумка из премиальной кожи, выполненная в современном дизайне Cage Bag с эффектной геометрической конструкцией. Модель сочетает оригинальный внешний каркас и внутренний текстильный мешок на кулиске, создавая выразительный и запоминающийся образ.\n\nПродуманная конструкция обеспечивает удобство повседневного использования, а вместительное внутреннее пространство позволяет комфортно разместить все необходимые вещи. Благодаря сочетанию лёгкости, функциональности и необычного дизайна сумка станет ярким акцентом как в повседневном, так и в вечернем гардеробе.\n\nЭлегантные округлые ручки обеспечивают комфорт при ношении в руке, а премиальная итальянская кожа подчёркивает высокий уровень исполнения модели.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "37 × 13 × 22 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Дизайн", value: "Cage Bag с геометрической конструкцией" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Внутренний мешок", value: "Съёмный мешок на кулиске" },
      { label: "Ручки", value: "Двойные округлые ручки" },
      { label: "Фурнитура", value: "Металлическая премиального качества" },
    ],
  },
  {
    slug: "mini-elegance-top-handle-bag-white",
    title: "Mini Elegance Top Handle Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "mini-top-handle-bag",
    price: 1600,
    colors: [
      {
        name: "White",
        hex: C.white.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-white-1.png", alt: "Mini Elegance Top Handle Bag White — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-white-2.png", alt: "Mini Elegance Top Handle Bag White — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-white-3.png", alt: "Mini Elegance Top Handle Bag White — вид сверху" },
        ],
      },
      {
        name: "Taupe",
        hex: C.taupe.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-taupe-1.png", alt: "Mini Elegance Top Handle Bag Taupe — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-taupe-2.png", alt: "Mini Elegance Top Handle Bag Taupe — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-taupe-3.png", alt: "Mini Elegance Top Handle Bag Taupe — вид сверху" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-cognac-1.png", alt: "Mini Elegance Top Handle Bag Cognac — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-cognac-2.png", alt: "Mini Elegance Top Handle Bag Cognac — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-cognac-3.png", alt: "Mini Elegance Top Handle Bag Cognac — вид сверху" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-black-1.png", alt: "Mini Elegance Top Handle Bag Black — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-black-2.png", alt: "Mini Elegance Top Handle Bag Black — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-black-3.png", alt: "Mini Elegance Top Handle Bag Black — вид сверху" },
        ],
      },
      {
        name: "Pink",
        hex: C.pink.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-pink-1.png", alt: "Mini Elegance Top Handle Bag Pink — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-pink-2.png", alt: "Mini Elegance Top Handle Bag Pink — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-pink-3.png", alt: "Mini Elegance Top Handle Bag Pink — вид сверху" },
        ],
      },
      {
        name: "Sage Green",
        hex: C.sageGreen.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-sage-green-1.png", alt: "Mini Elegance Top Handle Bag Sage Green — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-sage-green-2.png", alt: "Mini Elegance Top Handle Bag Sage Green — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-sage-green-3.png", alt: "Mini Elegance Top Handle Bag Sage Green — вид сверху" },
        ],
      },
      {
        name: "Cream",
        hex: C.ivory.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/mini-elegance-top-handle-bag/mini-cream-1.png", alt: "Mini Elegance Top Handle Bag Cream — вид спереди" },
          { src: "/products/mini-elegance-top-handle-bag/mini-cream-2.png", alt: "Mini Elegance Top Handle Bag Cream — сбоку" },
          { src: "/products/mini-elegance-top-handle-bag/mini-cream-3.png", alt: "Mini Elegance Top Handle Bag Cream — вид сверху" },
        ],
      },
    ],
    material: "Premium Genuine Leather",
    description:
      "Элегантная мини-сумка из премиальной натуральной кожи, сочетающая классический дизайн и современные детали. Компактный силуэт, изящные ручки и фирменная декоративная фурнитура делают модель универсальным аксессуаром для повседневных и вечерних образов.\n\nСумку можно носить как в руке, так и на плече благодаря съёмному регулируемому ремню. Несмотря на компактные размеры, модель легко вмещает телефон, кошелёк, ключи, документы и другие необходимые мелочи.\n\nБлагородная текстура кожи, золотистая фурнитура и продуманные детали подчёркивают премиальный характер изделия и делают его стильным дополнением любого гардероба.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Genuine Leather" },
      { label: "Формат", value: "Компактный Mini Bag" },
      { label: "Ручки", value: "Две удобные верхние ручки" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Назначение", value: "Для повседневных и вечерних образов" },
      { label: "Конструкция", value: "Лёгкая и удобная" },
    ],
  },
  {
    slug: "milano-classic-shoulder-bag-black",
    title: "Milano Classic Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shoulder-bag",
    price: 1600,
    images: [
      { src: "/products/milano-classic-shoulder-bag/black-lifestyle-v2.jpg", alt: "Milano Classic Shoulder Bag Black в образе" },
    ],
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/black-lifestyle-v2.jpg", alt: "Milano Classic Shoulder Bag Black в образе" },
          { src: "/products/milano-classic-shoulder-bag/black-1.png", alt: "Milano Classic Shoulder Bag Black — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/black-2.png", alt: "Milano Classic Shoulder Bag Black — внутри" },
        ],
      },
      {
        ...C.red,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/red-1.png", alt: "Milano Classic Shoulder Bag Red — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/red-2.png", alt: "Milano Classic Shoulder Bag Red — внутри" },
        ],
      },
      {
        ...C.navyBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/navy-blue-1.png", alt: "Milano Classic Shoulder Bag Navy Blue — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/navy-blue-2.png", alt: "Milano Classic Shoulder Bag Navy Blue — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/cognac-1.png", alt: "Milano Classic Shoulder Bag Cognac — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/cognac-2.png", alt: "Milano Classic Shoulder Bag Cognac — внутри" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/taupe-1.png", alt: "Milano Classic Shoulder Bag Taupe — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/taupe-2.png", alt: "Milano Classic Shoulder Bag Taupe — внутри" },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/off-white-1.png", alt: "Milano Classic Shoulder Bag Off-White — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/off-white-2.png", alt: "Milano Classic Shoulder Bag Off-White — внутри" },
        ],
      },
      {
        ...C.lightGrey,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/light-grey-1.png", alt: "Milano Classic Shoulder Bag Light Grey — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/light-grey-2.png", alt: "Milano Classic Shoulder Bag Light Grey — внутри" },
        ],
      },
      {
        ...C.skyBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/sky-blue-1.png", alt: "Milano Classic Shoulder Bag Sky Blue — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/sky-blue-2.png", alt: "Milano Classic Shoulder Bag Sky Blue — внутри" },
        ],
      },
      {
        ...C.dustyPink,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/milano-classic-shoulder-bag/dusty-pink-1.png", alt: "Milano Classic Shoulder Bag Dusty Pink — вид спереди" },
          { src: "/products/milano-classic-shoulder-bag/dusty-pink-2.png", alt: "Milano Classic Shoulder Bag Dusty Pink — внутри" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной кожи в современном минималистичном стиле. Модель отличается плавными линиями, лаконичным силуэтом и декоративной застёжкой, которая подчёркивает её утончённый характер.\n\nКомпактный размер делает сумку идеальным выбором для повседневного использования, прогулок, встреч и вечерних выходов. Вместительное внутреннее отделение позволяет удобно разместить телефон, кошелёк, ключи и другие необходимые вещи.\n\nРегулируемый плечевой ремень обеспечивает комфортную посадку, позволяя носить модель на плече или через плечо. Благодаря универсальному дизайну сумка гармонично сочетается как с деловыми образами, так и с повседневным гардеробом.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "24 × 5.5 × 12.5 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Компактное основное отделение" },
      { label: "Застёжка", value: "Магнитная под декоративным клапаном" },
      { label: "Ремень", value: "Регулируемый плечевой ремень" },
      { label: "Ношение", value: "На плече и через плечо" },
      { label: "Фурнитура", value: "Металлическая премиального качества" },
    ],
  },
  {
    slug: "classic-leather-tote-bag-black",
    title: "Classic Leather Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-tote-bag/black-lifestyle.png", alt: "Classic Leather Tote Bag Black в образе" },
          { src: "/products/classic-leather-tote-bag/black-1.png", alt: "Classic Leather Tote Bag Black — вид спереди" },
          { src: "/products/classic-leather-tote-bag/black-2.png", alt: "Classic Leather Tote Bag Black — внутри" },
          { src: "/products/classic-leather-tote-bag/black-3.png", alt: "Classic Leather Tote Bag Black — сбоку" },
          { src: "/products/classic-leather-tote-bag/black-4.png", alt: "Classic Leather Tote Bag Black — детали" },
          { src: "/products/classic-leather-tote-bag/black-5.png", alt: "Classic Leather Tote Bag Black — сверху" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-tote-bag/taupe-1.png", alt: "Classic Leather Tote Bag Taupe — вид спереди" },
          { src: "/products/classic-leather-tote-bag/taupe-2.png", alt: "Classic Leather Tote Bag Taupe — вид сзади" },
          { src: "/products/classic-leather-tote-bag/taupe-3.png", alt: "Classic Leather Tote Bag Taupe — сбоку" },
          { src: "/products/classic-leather-tote-bag/taupe-4.png", alt: "Classic Leather Tote Bag Taupe — сверху" },
        ],
      },
      {
        ...C.lightBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-tote-bag/light-blue-1.png", alt: "Classic Leather Tote Bag Light Blue — вид спереди" },
          { src: "/products/classic-leather-tote-bag/light-blue-2.png", alt: "Classic Leather Tote Bag Light Blue — вид сзади" },
          { src: "/products/classic-leather-tote-bag/light-blue-3.png", alt: "Classic Leather Tote Bag Light Blue — сбоку" },
          { src: "/products/classic-leather-tote-bag/light-blue-4.png", alt: "Classic Leather Tote Bag Light Blue — внутри" },
          { src: "/products/classic-leather-tote-bag/light-blue-5.png", alt: "Classic Leather Tote Bag Light Blue — сверху" },
        ],
      },
      {
        ...C.white,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-tote-bag/white-1.png", alt: "Classic Leather Tote Bag White — вид спереди" },
          { src: "/products/classic-leather-tote-bag/white-2.png", alt: "Classic Leather Tote Bag White — сбоку" },
          { src: "/products/classic-leather-tote-bag/white-3.png", alt: "Classic Leather Tote Bag White — вид сзади" },
          { src: "/products/classic-leather-tote-bag/white-4.png", alt: "Classic Leather Tote Bag White — внутри" },
          { src: "/products/classic-leather-tote-bag/white-5.png", alt: "Classic Leather Tote Bag White — детали" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной кожи, вдохновлённая культовым силуэтом классических tote-сумок. Строгие линии, выразительная фурнитура и безупречное качество исполнения делают модель идеальным выбором для работы, деловых встреч и повседневного использования.\n\nВместительное внутреннее пространство позволяет удобно разместить документы, планшет, кошелёк и другие необходимые вещи. Надёжная застёжка обеспечивает безопасность содержимого, а прочные верхние ручки гарантируют комфорт при ежедневной носке.\n\nБлагодаря универсальному дизайну сумка гармонично сочетается как с деловыми костюмами, так и с повседневными образами, оставаясь актуальной вне зависимости от сезона.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "39 × 18 × 27 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Просторное основное отделение" },
      { label: "Застёжка", value: "Поворотная застёжка" },
      { label: "Ручки", value: "Две прочные верхние ручки" },
      { label: "Фурнитура", value: "Металлическая премиального качества" },
      { label: "Конструкция", value: "Усиленная, сохраняет форму" },
    ],
  },
  {
    slug: "classic-leather-bowling-bag-black",
    title: "Classic Leather Bowling Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "bowling-bag",
    price: 1600,
    images: [
      { src: "/products/classic-leather-bowling-bag/off-white-lifestyle-v2.jpg", alt: "Classic Leather Bowling Bag в образе" },
    ],
    colors: [
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-bowling-bag/off-white-lifestyle-v2.jpg", alt: "Classic Leather Bowling Bag Off-White в образе" },
          { src: "/products/classic-leather-bowling-bag/off-white-1.png", alt: "Classic Leather Bowling Bag Off-White — вид спереди" },
          { src: "/products/classic-leather-bowling-bag/off-white-2.png", alt: "Classic Leather Bowling Bag Off-White — ракурс" },
          { src: "/products/classic-leather-bowling-bag/off-white-3.png", alt: "Classic Leather Bowling Bag Off-White — внутри" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-bowling-bag/off-white-lifestyle-v2.jpg", alt: "Classic Leather Bowling Bag в образе" },
          { src: "/products/classic-leather-bowling-bag/black-1.png", alt: "Classic Leather Bowling Bag Black — вид спереди" },
          { src: "/products/classic-leather-bowling-bag/black-2.png", alt: "Classic Leather Bowling Bag Black — под углом" },
          { src: "/products/classic-leather-bowling-bag/black-3.png", alt: "Classic Leather Bowling Bag Black — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-bowling-bag/cognac-1.png", alt: "Classic Leather Bowling Bag Cognac — вид спереди" },
          { src: "/products/classic-leather-bowling-bag/cognac-2.png", alt: "Classic Leather Bowling Bag Cognac — ракурс" },
          { src: "/products/classic-leather-bowling-bag/cognac-3.png", alt: "Classic Leather Bowling Bag Cognac — внутри" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/classic-leather-bowling-bag/taupe-1.png", alt: "Classic Leather Bowling Bag Taupe — вид спереди" },
          { src: "/products/classic-leather-bowling-bag/taupe-2.png", alt: "Classic Leather Bowling Bag Taupe — ракурс" },
          { src: "/products/classic-leather-bowling-bag/taupe-3.png", alt: "Classic Leather Bowling Bag Taupe — внутри" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной кожи, выполненная в классическом силуэте Bowling Bag. Лаконичный дизайн, мягкие линии и безупречное качество исполнения делают модель универсальным аксессуаром для повседневного использования, работы и деловых встреч.\n\nВместительное внутреннее пространство позволяет удобно разместить все необходимые вещи, сохраняя аккуратный внешний вид сумки. Верхняя застёжка-молния обеспечивает надёжное хранение содержимого, а съёмный плечевой ремень позволяет носить модель как в руке, так и через плечо.\n\nБлагодаря минималистичному дизайну сумка легко сочетается с классическими, деловыми и повседневными образами.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "30.5х12х23" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Leather" },
      { label: "Категория", value: "Bowling Bag" },
      { label: "Кожа", value: "Премиальная гладкая кожа" },
      { label: "Силуэт", value: "Классический силуэт Bowling Bag" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Надёжная застёжка на молнии" },
      { label: "Ручки", value: "Две удобные верхние ручки" },
      { label: "Ремень", value: "Съёмный и регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Металлическая фурнитура премиального качества" },
      { label: "Использование", value: "Подходит для ежедневного использования" },
    ],
  },
  {
    slug: "vintage-frame-leather-handbag-burgundy",
    title: "Vintage Frame Leather Handbag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "frame-bag",
    price: 1600,
    images: [
      { src: "/products/vintage-frame-leather-handbag/frame-burgundy-lifestyle-v2.jpg", alt: "Vintage Frame Leather Handbag Burgundy в образе" },
    ],
    colors: [
      {
        name: "Burgundy",
        hex: C.burgundy.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/vintage-frame-leather-handbag/frame-burgundy-lifestyle-v2.jpg", alt: "Vintage Frame Leather Handbag Burgundy в образе" },
          { src: "/products/vintage-frame-leather-handbag/frame-burgundy-1.png", alt: "Vintage Frame Leather Handbag Burgundy — вид сбоку" },
          { src: "/products/vintage-frame-leather-handbag/frame-burgundy-2.png", alt: "Vintage Frame Leather Handbag Burgundy — внутри" },
          { src: "/products/vintage-frame-leather-handbag/frame-burgundy-3.png", alt: "Vintage Frame Leather Handbag Burgundy — вид с ремнём" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/vintage-frame-leather-handbag/frame-black-1.png", alt: "Vintage Frame Leather Handbag Black — вид сбоку" },
          { src: "/products/vintage-frame-leather-handbag/frame-black-2.png", alt: "Vintage Frame Leather Handbag Black — вид с ремнём" },
          { src: "/products/vintage-frame-leather-handbag/frame-black-3.png", alt: "Vintage Frame Leather Handbag Black — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/vintage-frame-leather-handbag/frame-cognac-1.png", alt: "Vintage Frame Leather Handbag Cognac — вид сбоку" },
          { src: "/products/vintage-frame-leather-handbag/frame-cognac-2.png", alt: "Vintage Frame Leather Handbag Cognac — внутри" },
          { src: "/products/vintage-frame-leather-handbag/frame-cognac-3.png", alt: "Vintage Frame Leather Handbag Cognac — вид с ремнём" },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/vintage-frame-leather-handbag/frame-off-white-1.png", alt: "Vintage Frame Leather Handbag Off-White — вид сбоку" },
          { src: "/products/vintage-frame-leather-handbag/frame-off-white-2.png", alt: "Vintage Frame Leather Handbag Off-White — внутри" },
          { src: "/products/vintage-frame-leather-handbag/frame-off-white-3.png", alt: "Vintage Frame Leather Handbag Off-White — вид с ремнём" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной кожи, вдохновлённая эстетикой винтажных аксессуаров и современной итальянской модой. Изящный удлинённый силуэт, жёсткая конструкция и металлическая рамочная застёжка придают модели утончённый характер и делают её эффектным акцентом любого образа.\n\nКомпактная форма позволяет удобно разместить самые необходимые вещи, сохраняя элегантность и лёгкость. Сумку можно носить в руке благодаря удобной верхней ручке или использовать съёмный ремень для ношения на плече.\n\nБлагородные оттенки кожи и лаконичный дизайн делают модель универсальным выбором как для повседневных выходов, так и для вечерних мероприятий.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "28.5x11.5x10" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Leather" },
      { label: "Категория", value: "Frame Bag" },
      { label: "Кожа", value: "Премиальная гладкая кожа" },
      { label: "Форма", value: "Жёсткая структурированная форма" },
      { label: "Застёжка", value: "Винтажная рамочная застёжка" },
      { label: "Ручка", value: "Удобная верхняя ручка" },
      { label: "Ремень", value: "Съёмный плечевой ремень" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Назначение", value: "Подходит для повседневных и вечерних образов" },
    ],
  },
  {
    slug: "elegant-leather-hobo-bag-pink",
    title: "Elegant Leather Hobo Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "hobo-bag",
    price: 1600,
    colors: [
      {
        ...C.pink,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-pink-1.png", alt: "Elegant Leather Hobo Bag Pink — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-pink-2.png", alt: "Elegant Leather Hobo Bag Pink — ракурс" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-taupe-lifestyle.png", alt: "Elegant Leather Hobo Bag Taupe в образе" },
          { src: "/products/elegant-leather-hobo-bag/hobo-taupe-1.png", alt: "Elegant Leather Hobo Bag Taupe — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-taupe-2.png", alt: "Elegant Leather Hobo Bag Taupe — ракурс" },
        ],
      },
      {
        ...C.orange,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-orange-1.png", alt: "Elegant Leather Hobo Bag Orange — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-orange-2.png", alt: "Elegant Leather Hobo Bag Orange — ракурс" },
        ],
      },
      {
        ...C.sageGreen,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-sage-green-1.png", alt: "Elegant Leather Hobo Bag Sage Green — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-sage-green-2.png", alt: "Elegant Leather Hobo Bag Sage Green — ракурс" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-cognac-1.png", alt: "Elegant Leather Hobo Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-cognac-2.png", alt: "Elegant Leather Hobo Bag Cognac — ракурс" },
        ],
      },
      {
        name: "Grey",
        hex: C.slateGrey.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-grey-1.png", alt: "Elegant Leather Hobo Bag Grey — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-grey-2.png", alt: "Elegant Leather Hobo Bag Grey — ракурс" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-black-1.png", alt: "Elegant Leather Hobo Bag Black — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-black-2.png", alt: "Elegant Leather Hobo Bag Black — ракурс" },
        ],
      },
      {
        ...C.babyBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag/hobo-baby-blue-1.png", alt: "Elegant Leather Hobo Bag Baby Blue — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag/hobo-baby-blue-2.png", alt: "Elegant Leather Hobo Bag Baby Blue — ракурс" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Стильная женская сумка из премиальной фактурной кожи в современном силуэте Hobo Bag. Мягкая форма, плавные линии и объёмный дизайн создают элегантный образ, который остаётся актуальным вне зависимости от сезона.\n\nМодель оснащена удобной широкой ручкой для ношения в руке или на плече, а также съёмным регулируемым ремнём, позволяющим носить сумку через плечо. Просторное внутреннее отделение обеспечивает комфортное размещение всех необходимых вещей для работы, прогулок и повседневной жизни.\n\nЛаконичный дизайн и благородная фактура кожи подчёркивают премиальный характер модели, делая её универсальным дополнением как к деловому, так и к повседневному гардеробу.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "26.5 × 10 × 18 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Ручка", value: "Широкая мягкая ручка" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Премиального качества в золотистом исполнении" },
    ],
  },
  {
    slug: "elegant-leather-hobo-bag-taupe",
    title: "Elegant Leather Hobo Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "hobo-bag",
    price: 1600,
    colors: [
      {
        ...C.white,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-white-1.png", alt: "Elegant Leather Hobo Bag White — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-white-2.png", alt: "Elegant Leather Hobo Bag White — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-white-3.png", alt: "Elegant Leather Hobo Bag White — ракурс" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-taupe-1.png", alt: "Elegant Leather Hobo Bag Taupe — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-taupe-2.png", alt: "Elegant Leather Hobo Bag Taupe — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-taupe-3.png", alt: "Elegant Leather Hobo Bag Taupe — ракурс" },
        ],
      },
      {
        ...C.butterYellow,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-butter-yellow-1.png", alt: "Elegant Leather Hobo Bag Butter Yellow — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-butter-yellow-2.png", alt: "Elegant Leather Hobo Bag Butter Yellow — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-butter-yellow-3.png", alt: "Elegant Leather Hobo Bag Butter Yellow — ракурс" },
        ],
      },
      {
        ...C.pink,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-pink-1.png", alt: "Elegant Leather Hobo Bag Pink — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-pink-2.png", alt: "Elegant Leather Hobo Bag Pink — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-pink-3.png", alt: "Elegant Leather Hobo Bag Pink — ракурс" },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-off-white-1.png", alt: "Elegant Leather Hobo Bag Off-White — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-off-white-2.png", alt: "Elegant Leather Hobo Bag Off-White — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-off-white-3.png", alt: "Elegant Leather Hobo Bag Off-White — ракурс" },
        ],
      },
      {
        ...C.babyBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-baby-blue-1.png", alt: "Elegant Leather Hobo Bag Baby Blue — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-baby-blue-2.png", alt: "Elegant Leather Hobo Bag Baby Blue — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-baby-blue-3.png", alt: "Elegant Leather Hobo Bag Baby Blue — ракурс" },
        ],
      },
      {
        ...C.sageGreen,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-sage-green-1.png", alt: "Elegant Leather Hobo Bag Sage Green — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-sage-green-2.png", alt: "Elegant Leather Hobo Bag Sage Green — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-sage-green-3.png", alt: "Elegant Leather Hobo Bag Sage Green — ракурс" },
        ],
      },
      {
        ...C.red,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-red-1.png", alt: "Elegant Leather Hobo Bag Red — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-red-2.png", alt: "Elegant Leather Hobo Bag Red — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-red-3.png", alt: "Elegant Leather Hobo Bag Red — ракурс" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-cognac-1.png", alt: "Elegant Leather Hobo Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-cognac-2.png", alt: "Elegant Leather Hobo Bag Cognac — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-cognac-3.png", alt: "Elegant Leather Hobo Bag Cognac — ракурс" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-classic/classic-black-1.png", alt: "Elegant Leather Hobo Bag Black — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-black-2.png", alt: "Elegant Leather Hobo Bag Black — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-classic/classic-black-3.png", alt: "Elegant Leather Hobo Bag Black — ракурс" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной кожи в современном силуэте Hobo Bag. Мягкая форма, изящные линии и лаконичный дизайн делают модель универсальным аксессуаром для повседневной носки, работы, прогулок и особых случаев.\n\nУдобная регулируемая ручка позволяет комфортно носить сумку на плече, а вместительное внутреннее отделение обеспечивает достаточно места для всех необходимых вещей. Золотистая фурнитура и декоративная застёжка подчёркивают утончённый характер модели.\n\nБлагодаря минималистичному дизайну сумка легко сочетается как с деловыми образами, так и с повседневным гардеробом.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "30 × 10 × 19 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Магнитная с декоративным замком" },
      { label: "Ручка", value: "Регулируемая плечевая ручка" },
      { label: "Фурнитура", value: "Металлическая премиального качества" },
    ],
  },
  {
    slug: "elegant-leather-hobo-bag-smooth-black",
    title: "Elegant Leather Hobo Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "hobo-bag",
    price: 1600,
    images: [
      { src: "/products/elegant-leather-hobo-bag-smooth/smooth-white-lifestyle.png", alt: "Elegant Leather Hobo Bag White в образе" },
    ],
    colors: [
      {
        name: "White",
        hex: C.white.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-white-lifestyle.png", alt: "Elegant Leather Hobo Bag White в образе" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-white-1.png", alt: "Elegant Leather Hobo Bag White — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-white-2.png", alt: "Elegant Leather Hobo Bag White — с ремнём" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-white-3.png", alt: "Elegant Leather Hobo Bag White — сбоку" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-black-1.png", alt: "Elegant Leather Hobo Bag Black — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-black-2.png", alt: "Elegant Leather Hobo Bag Black — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-black-3.png", alt: "Elegant Leather Hobo Bag Black — с ремнём" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-cognac-1.png", alt: "Elegant Leather Hobo Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-cognac-2.png", alt: "Elegant Leather Hobo Bag Cognac — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-cognac-3.png", alt: "Elegant Leather Hobo Bag Cognac — с ремнём" },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-beige-1.png", alt: "Elegant Leather Hobo Bag Beige — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-beige-2.png", alt: "Elegant Leather Hobo Bag Beige — сбоку" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-beige-3.png", alt: "Elegant Leather Hobo Bag Beige — с ремнём" },
        ],
      },
      {
        name: "Red",
        hex: C.red.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-red-1.png", alt: "Elegant Leather Hobo Bag Red — вид спереди" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-red-2.png", alt: "Elegant Leather Hobo Bag Red — с ремнём" },
          { src: "/products/elegant-leather-hobo-bag-smooth/smooth-red-3.png", alt: "Elegant Leather Hobo Bag Red — сбоку" },
        ],
      },
    ],
    material: "Premium Smooth Leather",
    description:
      "Элегантная женская сумка из премиальной гладкой кожи, выполненная в современном силуэте Hobo Bag. Плавные линии, мягкая форма и лаконичный дизайн делают модель универсальным аксессуаром для повседневного использования и особых случаев.\n\nУдобная удлинённая ручка позволяет комфортно носить сумку на плече, а надёжная застёжка-молния обеспечивает безопасность личных вещей. Вместительное внутреннее отделение легко размещает телефон, кошелёк, косметику, документы и другие необходимые аксессуары.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "31 × 11 × 14 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Smooth Leather" },
      { label: "Силуэт", value: "Hobo Bag" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Ручка", value: "Удобная для ношения на плече" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотистого цвета" },
      { label: "Конструкция", value: "Мягкая с сохранением формы" },
    ],
  },
  {
    slug: "structured-leather-top-handle-bag-black",
    title: "Structured Leather Top Handle Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "top-handle-bag",
    price: 1600,
    images: [
      { src: "/products/structured-leather-top-handle-bag/top-handle-black-lifestyle-v2.png", alt: "Structured Leather Top Handle Bag Black в образе" },
    ],
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-black-lifestyle-v2.png", alt: "Structured Leather Top Handle Bag Black в образе" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-black-1.png", alt: "Structured Leather Top Handle Bag Black — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-black-2.png", alt: "Structured Leather Top Handle Bag Black — вид сзади" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-black-3.png", alt: "Structured Leather Top Handle Bag Black — под углом" },
        ],
      },
      {
        name: "Cherry Red",
        hex: C.cherryRed.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-cherry-red-1.png", alt: "Structured Leather Top Handle Bag Cherry Red — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-cherry-red-2.png", alt: "Structured Leather Top Handle Bag Cherry Red — вид сзади" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-cherry-red-3.png", alt: "Structured Leather Top Handle Bag Cherry Red — вид спереди" },
        ],
      },
      {
        name: "Burgundy",
        hex: C.burgundy.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-burgundy-1.png", alt: "Structured Leather Top Handle Bag Burgundy — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-burgundy-2.png", alt: "Structured Leather Top Handle Bag Burgundy — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-burgundy-3.png", alt: "Structured Leather Top Handle Bag Burgundy — вид сзади" },
        ],
      },
      {
        name: "Off-White",
        hex: C.offWhite.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-off-white-1.png", alt: "Structured Leather Top Handle Bag Off-White — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-off-white-2.png", alt: "Structured Leather Top Handle Bag Off-White — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-off-white-3.png", alt: "Structured Leather Top Handle Bag Off-White — вид сзади" },
        ],
      },
      {
        name: "Light Blue",
        hex: C.lightBlue.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-light-blue-1.png", alt: "Structured Leather Top Handle Bag Light Blue — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-light-blue-2.png", alt: "Structured Leather Top Handle Bag Light Blue — вид сзади" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-light-blue-3.png", alt: "Structured Leather Top Handle Bag Light Blue — вид спереди" },
        ],
      },
      {
        name: "Taupe",
        hex: C.taupe.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-taupe-1.png", alt: "Structured Leather Top Handle Bag Taupe — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-taupe-2.png", alt: "Structured Leather Top Handle Bag Taupe — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-taupe-3.png", alt: "Structured Leather Top Handle Bag Taupe — вид сзади" },
        ],
      },
      {
        name: "Mustard Yellow",
        hex: C.royalGold.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-mustard-yellow-1.png", alt: "Structured Leather Top Handle Bag Mustard Yellow — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-mustard-yellow-2.png", alt: "Structured Leather Top Handle Bag Mustard Yellow — вид сзади" },
        ],
      },
      {
        name: "Slate Grey",
        hex: C.slateGrey.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-slate-grey-1.png", alt: "Structured Leather Top Handle Bag Slate Grey — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-slate-grey-2.png", alt: "Structured Leather Top Handle Bag Slate Grey — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-slate-grey-3.png", alt: "Structured Leather Top Handle Bag Slate Grey — вид сзади" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-cognac-1.png", alt: "Structured Leather Top Handle Bag Cognac — вид спереди" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-cognac-2.png", alt: "Structured Leather Top Handle Bag Cognac — под углом" },
        ],
      },
      {
        name: "Olive Green",
        hex: C.sageGreen.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/structured-leather-top-handle-bag/top-handle-olive-green-1.png", alt: "Structured Leather Top Handle Bag Olive Green — под углом" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-olive-green-2.png", alt: "Structured Leather Top Handle Bag Olive Green — вид сзади" },
          { src: "/products/structured-leather-top-handle-bag/top-handle-olive-green-3.png", alt: "Structured Leather Top Handle Bag Olive Green — вид спереди" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная структурированная сумка из премиальной кожи, созданная для современных женщин, ценящих минимализм, качество и универсальность. Лаконичный силуэт и выразительная верхняя ручка придают модели утончённый характер, который гармонично сочетается как с деловым, так и с повседневным гардеробом.\n\nКомпактный размер позволяет удобно разместить самые необходимые вещи, сохраняя лёгкость и комфорт в течение дня. Съёмный плечевой ремень предоставляет возможность носить сумку в руке или через плечо, адаптируя её под любой образ.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Размер", value: "17x6x10" },
      { label: "Материал", value: "Premium Leather" },
      { label: "Категория", value: "Top Handle Bag" },
      { label: "Кожа", value: "Премиальная гладкая кожа" },
      { label: "Форма", value: "Жёсткая структурированная форма" },
      { label: "Ручка", value: "Верхняя ручка для ношения в руке" },
      { label: "Ремень", value: "Съёмный и регулируемый плечевой ремень" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Надёжная застёжка-клапан" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура" },
      { label: "Дизайн", value: "Универсальный дизайн для любого сезона" },
    ],
  },
  {
    slug: "premium-leather-crescent-shoulder-bag-black",
    title: "Premium Leather Crescent Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "shoulder-bag",
    price: 1600,
    isNew: true,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-black-1.png", alt: "Premium Leather Crescent Shoulder Bag Black — вид спереди" },
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-black-2.png", alt: "Premium Leather Crescent Shoulder Bag Black — сбоку" },
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-black-3.png", alt: "Premium Leather Crescent Shoulder Bag Black — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-cognac-1.png", alt: "Premium Leather Crescent Shoulder Bag Cognac — вид спереди" },
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-cognac-2.png", alt: "Premium Leather Crescent Shoulder Bag Cognac — внутри" },
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-cognac-3.png", alt: "Premium Leather Crescent Shoulder Bag Cognac — сбоку" },
        ],
      },
      {
        name: "Cream",
        hex: C.ivory.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-cream-1.png", alt: "Premium Leather Crescent Shoulder Bag Cream — сбоку" },
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-cream-2.png", alt: "Premium Leather Crescent Shoulder Bag Cream — вид спереди" },
          { src: "/products/premium-leather-crescent-shoulder-bag/crescent-cream-3.png", alt: "Premium Leather Crescent Shoulder Bag Cream — внутри" },
        ],
      },
    ],
    material: "Premium Genuine Leather",
    description:
      "Элегантная женская сумка из премиальной натуральной кожи с оригинальным полукруглым силуэтом и выразительным дизайнерским декором. Изящные прорезные элементы, благородная золотистая фурнитура и декоративное кольцо на ручке придают модели современный и утончённый характер.\n\nУдобная регулируемая ручка позволяет комфортно носить сумку на плече, а продуманное внутреннее пространство легко вмещает телефон, кошелёк, косметику и другие необходимые вещи. Плавные линии и минималистичный дизайн делают модель универсальным аксессуаром как для повседневных образов, так и для особых случаев.\n\nВысококачественная натуральная кожа и безупречное итальянское исполнение подчёркивают премиальный статус изделия и обеспечивают его долговечность.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Genuine Leather" },
      { label: "Категория", value: "Shoulder Bag / Hobo Bag" },
      { label: "Кожа", value: "Премиальная натуральная кожа" },
      { label: "Силуэт", value: "Современный Crescent Bag" },
      { label: "Ручка", value: "Регулируемая плечевая ручка" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Декор", value: "Декоративные прорезные элементы" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная конструкция" },
      { label: "Назначение", value: "Для повседневных и вечерних образов" },
    ],
  },
  {
    slug: "premium-leather-fringe-hobo-bag-black",
    title: "Premium Leather Fringe Hobo Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "hobo-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-fringe-hobo-bag/fringe-hobo-black-1.png", alt: "Premium Leather Fringe Hobo Bag Black — вид спереди" },
          { src: "/products/premium-leather-fringe-hobo-bag/fringe-hobo-black-2.png", alt: "Premium Leather Fringe Hobo Bag Black — внутри" },
        ],
      },
      {
        name: "Dark Chocolate",
        hex: C.chocolateBrown.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-fringe-hobo-bag/fringe-hobo-dark-chocolate-1.png", alt: "Premium Leather Fringe Hobo Bag Dark Chocolate — вид спереди" },
          { src: "/products/premium-leather-fringe-hobo-bag/fringe-hobo-dark-chocolate-2.png", alt: "Premium Leather Fringe Hobo Bag Dark Chocolate — внутри" },
        ],
      },
      {
        name: "Burgundy",
        hex: C.burgundy.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-fringe-hobo-bag/fringe-hobo-burgundy-1.png", alt: "Premium Leather Fringe Hobo Bag Burgundy — вид спереди" },
          { src: "/products/premium-leather-fringe-hobo-bag/fringe-hobo-burgundy-2.png", alt: "Premium Leather Fringe Hobo Bag Burgundy — внутри" },
        ],
      },
    ],
    material: "Premium Genuine Leather",
    description:
      "Стильная женская сумка из премиальной натуральной кожи с эффектной бахромой, вдохновлённая эстетикой бохо-шик и современными модными тенденциями. Мягкий силуэт, выразительная фактура кожи и благородная золотистая фурнитура создают яркий образ, который легко дополнит как повседневный, так и вечерний гардероб.\n\nУдобная плечевая ручка обеспечивает комфортное ношение в течение всего дня, а просторное внутреннее отделение позволяет разместить телефон, кошелёк, косметичку и другие необходимые вещи. Декоративная застёжка и длинная кожаная бахрома подчёркивают оригинальный характер модели и делают её заметным акцентом любого образа.\n\nВысококачественная натуральная кожа и безупречное итальянское исполнение гарантируют долговечность, комфорт и актуальность вне зависимости от сезона.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Genuine Leather" },
      { label: "Категория", value: "Hobo Bag / Shoulder Bag" },
      { label: "Кожа", value: "Премиальная натуральная кожа" },
      { label: "Силуэт", value: "Мягкий Hobo Bag" },
      { label: "Декор", value: "Эффектная декоративная бахрома" },
      { label: "Ручка", value: "Удобная плечевая ручка" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Надёжная декоративная застёжка" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Назначение", value: "Для повседневных и вечерних образов" },
      { label: "Конструкция", value: "Лёгкая и комфортная в использовании" },
      { label: "Стиль", value: "Boho Chic" },
    ],
  },
  {
    slug: "premium-leather-travel-tote-bag-black",
    title: "Premium Leather Travel Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-travel-tote-bag/travel-black-1.png", alt: "Premium Leather Travel Tote Bag Black — вид спереди" },
          { src: "/products/premium-leather-travel-tote-bag/travel-black-2.png", alt: "Premium Leather Travel Tote Bag Black — внутри" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-travel-tote-bag/travel-cognac-1.png", alt: "Premium Leather Travel Tote Bag Cognac — вид спереди" },
          { src: "/products/premium-leather-travel-tote-bag/travel-cognac-2.png", alt: "Premium Leather Travel Tote Bag Cognac — внутри" },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-travel-tote-bag/travel-beige-1.png", alt: "Premium Leather Travel Tote Bag Beige — вид спереди" },
          { src: "/products/premium-leather-travel-tote-bag/travel-beige-2.png", alt: "Premium Leather Travel Tote Bag Beige — внутри" },
        ],
      },
      {
        name: "Taupe",
        hex: C.taupe.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-travel-tote-bag/travel-taupe-1.png", alt: "Premium Leather Travel Tote Bag Taupe — вид спереди" },
          { src: "/products/premium-leather-travel-tote-bag/travel-taupe-2.png", alt: "Premium Leather Travel Tote Bag Taupe — внутри" },
        ],
      },
      {
        name: "Sky Blue",
        hex: C.skyBlue.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-leather-travel-tote-bag/travel-sky-blue-1.png", alt: "Premium Leather Travel Tote Bag Sky Blue — вид спереди" },
          { src: "/products/premium-leather-travel-tote-bag/travel-sky-blue-2.png", alt: "Premium Leather Travel Tote Bag Sky Blue — внутри" },
        ],
      },
    ],
    material: "Premium Genuine Leather",
    description:
      "Элегантная вместительная сумка из премиальной натуральной кожи, созданная для женщин, которые ценят стиль, практичность и комфорт. Лаконичный силуэт с фирменной декоративной застёжкой и благородной золотистой фурнитурой делает модель универсальным выбором как для деловых встреч, так и для повседневной жизни.\n\nУдобные верхние ручки обеспечивают комфортное ношение в руке, а съёмный регулируемый ремень позволяет носить сумку на плече или через плечо. Просторное внутреннее отделение легко вмещает документы формата A4, планшет, кошелёк, косметичку и другие необходимые вещи.\n\nВысококачественная натуральная кожа с выразительной текстурой и безупречное итальянское исполнение подчёркивают премиальный статус модели и её актуальность вне времени.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Genuine Leather" },
      { label: "Категория", value: "Tote Bag / Shoulder Bag" },
      { label: "Кожа", value: "Премиальная натуральная кожа" },
      { label: "Силуэт", value: "Вместительный Tote Bag" },
      { label: "Ручки", value: "Удобные верхние ручки" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Отделение", value: "Просторное основное отделение" },
      { label: "Формат", value: "Подходит для документов формата A4" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Застёжка", value: "Декоративная фронтальная застёжка" },
      { label: "Конструкция", value: "Мягкая конструкция с сохранением формы" },
      { label: "Назначение", value: "Для деловых и повседневных образов, работы, путешествий и города" },
    ],
  },
  {
    slug: "premium-woven-hobo-bag-natural-beige",
    title: "Premium Woven Hobo Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "hobo-bag",
    price: 1600,
    colors: [
      {
        name: "Natural Beige",
        hex: "#c9a474",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-hobo-bag/woven-hobo-natural-beige-1.png", alt: "Premium Woven Hobo Bag Natural Beige — вид спереди" },
          { src: "/products/premium-woven-hobo-bag/woven-hobo-natural-beige-2.png", alt: "Premium Woven Hobo Bag Natural Beige — внутри" },
        ],
      },
      {
        name: "Ivory Cream",
        hex: C.ivory.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-hobo-bag/woven-hobo-ivory-cream-1.png", alt: "Premium Woven Hobo Bag Ivory Cream — вид спереди" },
          { src: "/products/premium-woven-hobo-bag/woven-hobo-ivory-cream-2.png", alt: "Premium Woven Hobo Bag Ivory Cream — внутри" },
        ],
      },
    ],
    material: "Premium Handwoven Straw & Genuine Leather Details",
    description:
      "Элегантная сумка в стиле Hobo, выполненная из премиального плетёного материала с декоративными элементами из натуральной кожи. Мягкий силуэт и плавные линии создают расслабленный, но утончённый образ, который идеально подходит для повседневной носки в тёплое время года.\n\nШирокая регулируемая ручка украшена металлическими заклёпками, добавляя модели характер и современный акцент. Вместительное внутреннее пространство позволяет комфортно разместить все необходимые вещи для работы, прогулок или путешествий.\n\nНатуральная фактура, благородные детали и итальянское качество делают эту модель универсальным аксессуаром для городских и курортных образов.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Handwoven Straw & Genuine Leather Details" },
      { label: "Категория", value: "Hobo Bag / Shoulder Bag" },
      { label: "Плетение", value: "Премиальное ручное плетение" },
      { label: "Отделка", value: "Отделка из натуральной кожи" },
      { label: "Силуэт", value: "Современный Hobo Bag" },
      { label: "Ручка", value: "Широкая регулируемая ручка" },
      { label: "Декор", value: "Декоративные металлические заклёпки" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная конструкция" },
      { label: "Назначение", value: "Для повседневного использования, города, отдыха и путешествий" },
    ],
  },
  {
    slug: "premium-fringe-beach-tote-bag-natural-beige",
    title: "Premium Fringe Beach Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "beach-tote-bag",
    price: 1600,
    colors: [
      {
        name: "Natural Beige",
        hex: "#c9a474",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-fringe-beach-tote-bag/fringe-natural-beige-1.png", alt: "Premium Fringe Beach Tote Bag Natural Beige — вид спереди" },
          { src: "/products/premium-fringe-beach-tote-bag/fringe-natural-beige-2.png", alt: "Premium Fringe Beach Tote Bag Natural Beige — внутри" },
        ],
      },
      {
        name: "Ivory Cream",
        hex: C.ivory.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-fringe-beach-tote-bag/fringe-ivory-cream-1.png", alt: "Premium Fringe Beach Tote Bag Ivory Cream — вид спереди" },
          { src: "/products/premium-fringe-beach-tote-bag/fringe-ivory-cream-2.png", alt: "Premium Fringe Beach Tote Bag Ivory Cream — внутри" },
        ],
      },
    ],
    material: "Premium Handwoven Straw",
    description:
      "Эффектная летняя сумка в стиле boho-chic, выполненная из премиального плетёного материала с декоративной бахромой по периметру. Натуральные бамбуковые ручки придают модели особый характер и подчёркивают её курортную эстетику.\n\nПросторное внутреннее отделение позволяет удобно разместить все необходимые вещи для прогулок, отдыха или путешествий. Лёгкая конструкция и натуральные материалы делают сумку комфортным аксессуаром для ежедневного использования в тёплый сезон.\n\nСочетание ручного плетения, декоративных кистей, деревянных элементов и итальянского дизайна создаёт выразительный аксессуар, который идеально дополняет летние и пляжные образы.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Handwoven Straw" },
      { label: "Категория", value: "Tote Bag / Beach Bag" },
      { label: "Плетение", value: "Премиальное ручное плетение" },
      { label: "Ручки", value: "Натуральные бамбуковые ручки" },
      { label: "Декор", value: "Декоративная бахрома по периметру" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная конструкция" },
      { label: "Стиль", value: "Boho Luxury" },
      { label: "Назначение", value: "Для пляжа, отдыха, путешествий и летних городских образов" },
      { label: "Материалы", value: "Натуральные материалы и фактуры" },
      { label: "Детали", value: "Декоративные деревянные элементы" },
      { label: "Коллекция", value: "Summer Collection 2026" },
    ],
  },
  {
    slug: "premium-vintage-straw-tote-bag-natural-beige",
    title: "Premium Vintage Straw Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    colors: [
      {
        name: "Natural Beige",
        hex: "#c9a474",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-vintage-straw-tote-bag/vintage-natural-beige-1.png", alt: "Premium Vintage Straw Tote Bag Natural Beige — вид спереди" },
          { src: "/products/premium-vintage-straw-tote-bag/vintage-natural-beige-2.png", alt: "Premium Vintage Straw Tote Bag Natural Beige — внутри" },
        ],
      },
      {
        name: "Dark Brown",
        hex: C.darkBrown.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-vintage-straw-tote-bag/vintage-dark-brown-1.png", alt: "Premium Vintage Straw Tote Bag Dark Brown — вид спереди" },
          { src: "/products/premium-vintage-straw-tote-bag/vintage-dark-brown-2.png", alt: "Premium Vintage Straw Tote Bag Dark Brown — внутри" },
        ],
      },
    ],
    material: "Premium Handwoven Straw & Genuine Leather Details",
    description:
      "Стильная женская сумка в винтажном стиле, выполненная из премиального плетёного материала с декоративными элементами из натуральной кожи. Лаконичный силуэт и оригинальные квадратные ручки создают выразительный дизайн, который идеально дополняет летние и повседневные образы.\n\nСумка отличается лёгкостью, вместительностью и удобством в использовании. Благодаря съёмному плечевому ремню модель можно носить как в руке, так и на плече. Натуральная фактура плетения и тёплые оттенки делают аксессуар универсальным выбором для города, путешествий и отдыха.\n\nИтальянское качество исполнения и внимание к деталям подчёркивают премиальный характер модели.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Handwoven Straw & Genuine Leather Details" },
      { label: "Категория", value: "Tote Bag / Handbag" },
      { label: "Плетение", value: "Премиальное ручное плетение" },
      { label: "Отделка", value: "Отделка из натуральной кожи" },
      { label: "Ручки", value: "Оригинальные квадратные ручки" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная конструкция" },
      { label: "Назначение", value: "Для повседневных и летних образов, прогулок, отдыха и путешествий" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура" },
      { label: "Стиль", value: "Натуральная фактура и винтажный стиль" },
    ],
  },
  {
    slug: "premium-fan-straw-handbag-natural-cognac",
    title: "Premium Fan Straw Handbag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "summer-bag",
    price: 1600,
    isNew: true,
    colors: [
      {
        name: "Natural / Cognac",
        hex: "#d6ad72",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-fan-straw-handbag/fan-natural-cognac-1.png", alt: "Premium Fan Straw Handbag Natural / Cognac — вид спереди" },
          { src: "/products/premium-fan-straw-handbag/fan-natural-cognac-2.png", alt: "Premium Fan Straw Handbag Natural / Cognac — вид сзади" },
          { src: "/products/premium-fan-straw-handbag/fan-natural-cognac-3.png", alt: "Premium Fan Straw Handbag Natural / Cognac — внутри" },
        ],
      },
    ],
    material: "Premium Handwoven Straw & Genuine Leather Details",
    description:
      "Элегантная летняя сумка из премиального плетёного материала с изысканными деталями из натуральной кожи. Оригинальный веерообразный силуэт делает модель выразительным аксессуаром, который привлекает внимание и подчёркивает индивидуальный стиль.\n\nУдобная кожаная ручка обеспечивает комфортное ношение в руке, а лёгкая конструкция делает сумку идеальным спутником для прогулок, путешествий, отдыха у моря и летних мероприятий.\n\nНатуральная фактура плетения, благородные кожаные акценты и безупречное итальянское исполнение создают гармоничное сочетание элегантности, лёгкости и практичности.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Handwoven Straw & Genuine Leather Details" },
      { label: "Категория", value: "Handbag / Summer Bag" },
      { label: "Плетение", value: "Премиальное ручное плетение" },
      { label: "Силуэт", value: "Эффектный веерообразный силуэт" },
      { label: "Отделка", value: "Отделка из натуральной кожи" },
      { label: "Ручка", value: "Удобная эргономичная ручка" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Конструкция", value: "Лёгкая и комфортная конструкция" },
      { label: "Назначение", value: "Для летних и курортных образов, отдыха, прогулок и путешествий" },
      { label: "Фактура", value: "Натуральная фактура и премиальный внешний вид" },
      { label: "Сезон", value: "Стильный акцентный аксессуар сезона" },
    ],
  },
  {
    slug: "premium-heart-handle-straw-bag-natural-brown",
    title: "Premium Heart Handle Straw Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "summer-bag",
    price: 1600,
    isNew: true,
    colors: [
      {
        name: "Natural Brown",
        hex: "#a97845",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-heart-handle-straw-bag/heart-natural-brown-1.png", alt: "Premium Heart Handle Straw Bag Natural Brown — вид спереди" },
          { src: "/products/premium-heart-handle-straw-bag/heart-natural-brown-2.png", alt: "Premium Heart Handle Straw Bag Natural Brown — внутри" },
        ],
      },
    ],
    material: "Premium Handwoven Straw",
    description:
      "Оригинальная летняя сумка ручной работы из премиального плетёного материала с эффектным дизайном. Главной особенностью модели являются необычные ручки в форме сердца, которые придают аксессуару романтичный и запоминающийся характер.\n\nЛёгкая конструкция и натуральная фактура делают сумку идеальным выбором для отдыха, прогулок, путешествий и летних мероприятий. Внутри предусмотрен текстильный вкладыш для комфортного хранения личных вещей и дополнительной защиты содержимого.\n\nУникальное сочетание натуральных оттенков, ручного плетения и итальянского дизайна делает модель стильным акцентом любого летнего образа.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Handwoven Straw" },
      { label: "Категория", value: "Handbag / Summer Bag" },
      { label: "Плетение", value: "Премиальное ручное плетение" },
      { label: "Ручки", value: "Оригинальные ручки в форме сердца" },
      { label: "Конструкция", value: "Лёгкая и удобная конструкция" },
      { label: "Внутри", value: "Внутренний текстильный вкладыш" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Фактура", value: "Натуральная текстура и оттенки" },
      { label: "Назначение", value: "Для летних образов, прогулок, отдыха и путешествий" },
      { label: "Силуэт", value: "Эксклюзивный дизайнерский силуэт" },
      { label: "Ношение", value: "Комфортное ношение в руке" },
      { label: "Сезон", value: "Весна-лето 2026" },
    ],
  },
  {
    slug: "premium-woven-bucket-bag-cream",
    title: "Premium Woven Bucket Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "bucket-bag",
    price: 1600,
    isNew: true,
    colors: [
      {
        name: "Cream",
        hex: C.ivory.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-bucket-bag/bucket-cream-1.png", alt: "Premium Woven Bucket Bag Cream — сбоку" },
          { src: "/products/premium-woven-bucket-bag/bucket-cream-2.png", alt: "Premium Woven Bucket Bag Cream — вид сверху" },
          { src: "/products/premium-woven-bucket-bag/bucket-cream-3.png", alt: "Premium Woven Bucket Bag Cream — вид спереди" },
        ],
      },
      {
        name: "Sky Blue",
        hex: C.skyBlue.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-bucket-bag/bucket-sky-blue-1.png", alt: "Premium Woven Bucket Bag Sky Blue — вид сверху" },
          { src: "/products/premium-woven-bucket-bag/bucket-sky-blue-2.png", alt: "Premium Woven Bucket Bag Sky Blue — вид спереди" },
          { src: "/products/premium-woven-bucket-bag/bucket-sky-blue-3.png", alt: "Premium Woven Bucket Bag Sky Blue — сбоку" },
        ],
      },
    ],
    material: "Premium Woven Rattan & Genuine Leather Details",
    description:
      "Элегантная женская сумка в актуальном формате Bucket Bag, выполненная из премиального плетёного ротанга с отделкой из натуральной кожи. Лёгкий летний характер модели гармонично сочетается с утончённым итальянским дизайном и премиальными материалами.\n\nСумка оснащена удобной верхней ручкой и съёмным плечевым ремнём, что позволяет носить её в руке, на плече или через плечо. Внутренний текстильный мешочек с затяжкой надёжно защищает содержимое и придаёт модели дополнительную практичность.\n\nКомпактный цилиндрический силуэт делает аксессуар идеальным выбором для прогулок, путешествий, отдыха у моря и создания стильных городских образов.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Woven Rattan & Genuine Leather Details" },
      { label: "Категория", value: "Bucket Bag / Crossbody Bag" },
      { label: "Плетение", value: "Премиальное плетёное исполнение из ротанга" },
      { label: "Отделка", value: "Отделка из натуральной кожи" },
      { label: "Силуэт", value: "Современный Bucket Bag" },
      { label: "Ручка", value: "Удобная верхняя ручка" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Внутри", value: "Внутренний текстильный мешочек с затяжкой" },
      { label: "Хранение", value: "Надёжное хранение личных вещей" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Конструкция", value: "Лёгкая и комфортная конструкция" },
      { label: "Назначение", value: "Для повседневных и летних образов, отдыха, путешествий и прогулок" },
    ],
  },
  {
    slug: "premium-woven-vanity-crossbody-bag-black",
    title: "Premium Woven Vanity Crossbody Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "crossbody-bag",
    price: 1600,
    isNew: true,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-black-lifestyle.png", alt: "Premium Woven Vanity Crossbody Bag Black в образе" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-black-1.png", alt: "Premium Woven Vanity Crossbody Bag Black — вид спереди" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-black-2.png", alt: "Premium Woven Vanity Crossbody Bag Black — внутри" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-black-3.png", alt: "Premium Woven Vanity Crossbody Bag Black — сбоку" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-cognac-1.png", alt: "Premium Woven Vanity Crossbody Bag Cognac — вид спереди" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-cognac-2.png", alt: "Premium Woven Vanity Crossbody Bag Cognac — сбоку" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-cognac-3.png", alt: "Premium Woven Vanity Crossbody Bag Cognac — внутри" },
        ],
      },
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-beige-1.png", alt: "Premium Woven Vanity Crossbody Bag Beige — сбоку" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-beige-2.png", alt: "Premium Woven Vanity Crossbody Bag Beige — вид спереди" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-beige-3.png", alt: "Premium Woven Vanity Crossbody Bag Beige — внутри" },
        ],
      },
      {
        name: "Butter Yellow",
        hex: C.butterYellow.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-butter-yellow-1.png", alt: "Premium Woven Vanity Crossbody Bag Butter Yellow — сбоку" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-butter-yellow-2.png", alt: "Premium Woven Vanity Crossbody Bag Butter Yellow — внутри" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-butter-yellow-3.png", alt: "Premium Woven Vanity Crossbody Bag Butter Yellow — вид спереди" },
        ],
      },
      {
        name: "Sky Blue",
        hex: C.skyBlue.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-sky-blue-1.png", alt: "Premium Woven Vanity Crossbody Bag Sky Blue — вид спереди" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-sky-blue-2.png", alt: "Premium Woven Vanity Crossbody Bag Sky Blue — сбоку" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-sky-blue-3.png", alt: "Premium Woven Vanity Crossbody Bag Sky Blue — внутри" },
        ],
      },
      {
        name: "Olive Green",
        hex: C.sageGreen.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-olive-green-1.png", alt: "Premium Woven Vanity Crossbody Bag Olive Green — внутри" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-olive-green-2.png", alt: "Premium Woven Vanity Crossbody Bag Olive Green — вид спереди" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-olive-green-3.png", alt: "Premium Woven Vanity Crossbody Bag Olive Green — сбоку" },
        ],
      },
      {
        name: "Red",
        hex: C.red.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-red-1.png", alt: "Premium Woven Vanity Crossbody Bag Red — вид спереди" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-red-2.png", alt: "Premium Woven Vanity Crossbody Bag Red — сбоку" },
          { src: "/products/premium-woven-vanity-crossbody-bag/vanity-red-3.png", alt: "Premium Woven Vanity Crossbody Bag Red — внутри" },
        ],
      },
    ],
    material: "Premium Woven Straw & Genuine Leather Details",
    description:
      "Стильная женская сумка премиального класса, выполненная из высококачественного плетёного материала с отделкой из натуральной кожи. Компактный силуэт в формате vanity bag сочетает элегантность, практичность и актуальный летний дизайн.\n\nУдобная верхняя ручка и съёмный регулируемый плечевой ремень позволяют носить сумку в руке, на плече или через плечо. Благодаря продуманной конструкции модель идеально подходит для хранения телефона, кошелька, ключей, косметики и других необходимых мелочей.\n\nПлетёная фактура, благородная золотистая фурнитура и безупречное итальянское исполнение делают сумку универсальным аксессуаром для отдыха, путешествий, прогулок по городу и летних мероприятий.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Woven Straw & Genuine Leather Details" },
      { label: "Категория", value: "Crossbody Bag / Top Handle Bag" },
      { label: "Плетение", value: "Премиальное плетёное исполнение" },
      { label: "Отделка", value: "Отделка из натуральной кожи" },
      { label: "Силуэт", value: "Компактный Vanity Bag" },
      { label: "Ручка", value: "Удобная верхняя ручка" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Застёжка", value: "Надёжная двойная застёжка-молния" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура золотого цвета" },
      { label: "Назначение", value: "Для повседневных и летних образов, путешествий и отдыха" },
    ],
  },
  {
    slug: "elegant-leather-crossbody-bag-white",
    title: "Elegant Leather Crossbody Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "crossbody-bag",
    price: 1600,
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag/black-1.png", alt: "Elegant Leather Crossbody Bag Black — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag/black-2.png", alt: "Elegant Leather Crossbody Bag Black — вид сзади" },
        ],
      },
      {
        ...C.white,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag/white-1.png", alt: "Elegant Leather Crossbody Bag White — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag/white-2.png", alt: "Elegant Leather Crossbody Bag White — вид сзади" },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag/off-white-1.png", alt: "Elegant Leather Crossbody Bag Off-White — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag/off-white-back.png", alt: "Elegant Leather Crossbody Bag Off-White — вид сзади" },
        ],
      },
      {
        ...C.babyBlue,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag/baby-blue-1.png", alt: "Elegant Leather Crossbody Bag Baby Blue — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag/baby-blue-2.png", alt: "Elegant Leather Crossbody Bag Baby Blue — вид сзади" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag/taupe-1.png", alt: "Elegant Leather Crossbody Bag Taupe — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag/taupe-2.png", alt: "Elegant Leather Crossbody Bag Taupe — вид сзади" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной кожи в современном минималистичном дизайне. Чистые линии, компактный силуэт и изысканная декоративная застёжка делают модель стильным аксессуаром для любого случая.\n\nРегулируемый плечевой ремень обеспечивает комфорт при ежедневном использовании, а продуманное внутреннее пространство позволяет удобно разместить все необходимые вещи. Золотистая фурнитура придаёт сумке утончённый характер и подчёркивает её премиальный статус.\n\nБлагодаря универсальному дизайну модель гармонично сочетается как с деловыми образами, так и с повседневным гардеробом, оставаясь актуальной вне зависимости от сезона.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "23 × 8 × 17 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Магнитная с дизайнерским металлическим замком" },
      { label: "Ремень", value: "Регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Премиального качества в золотистом исполнении" },
    ],
  },
  {
    slug: "elegant-leather-crossbody-bag-beige",
    title: "Elegant Leather Crossbody Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "crossbody-bag",
    price: 1600,
    images: [
      { src: "/products/elegant-leather-crossbody-bag-beige/cross-black-lifestyle-v2.png", alt: "Elegant Leather Crossbody Bag Black в образе" },
    ],
    colors: [
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-black-lifestyle-v2.png", alt: "Elegant Leather Crossbody Bag Black в образе" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-black-1.png", alt: "Elegant Leather Crossbody Bag Black — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-black-2.png", alt: "Elegant Leather Crossbody Bag Black — сбоку" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-black-3.png", alt: "Elegant Leather Crossbody Bag Black — вид сверху" },
        ],
      },
      {
        ...C.beige,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-beige-1.png", alt: "Elegant Leather Crossbody Bag Beige — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-beige-2.png", alt: "Elegant Leather Crossbody Bag Beige — сбоку" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-beige-3.png", alt: "Elegant Leather Crossbody Bag Beige — вид сверху" },
        ],
      },
      {
        ...C.pink,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-pink-1.png", alt: "Elegant Leather Crossbody Bag Pink — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-pink-2.png", alt: "Elegant Leather Crossbody Bag Pink — сбоку" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-pink-3.png", alt: "Elegant Leather Crossbody Bag Pink — вид сверху" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-cognac-1.png", alt: "Elegant Leather Crossbody Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-cognac-2.png", alt: "Elegant Leather Crossbody Bag Cognac — сбоку" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-cognac-3.png", alt: "Elegant Leather Crossbody Bag Cognac — вид сверху" },
        ],
      },
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-off-white-1.png", alt: "Elegant Leather Crossbody Bag Off-White — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-off-white-2.png", alt: "Elegant Leather Crossbody Bag Off-White — сбоку" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-off-white-3.png", alt: "Elegant Leather Crossbody Bag Off-White — вид сверху" },
        ],
      },
      {
        ...C.darkBrown,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-dark-brown-1.png", alt: "Elegant Leather Crossbody Bag Dark Brown — вид спереди" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-dark-brown-2.png", alt: "Elegant Leather Crossbody Bag Dark Brown — сбоку" },
          { src: "/products/elegant-leather-crossbody-bag-beige/cross-dark-brown-3.png", alt: "Elegant Leather Crossbody Bag Dark Brown — вид сверху" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной фактурной кожи в современном минималистичном дизайне. Лаконичный силуэт, мягкие линии и изысканная металлическая деталь на передней панели подчёркивают утончённый характер модели и её универсальность.\n\nКомпактная форма делает сумку идеальным выбором для повседневного использования, деловых встреч и прогулок по городу. Продуманное внутреннее пространство позволяет удобно разместить самые необходимые вещи, сохраняя лёгкость и комфорт в течение дня.\n\nБлагодаря благородной фактуре кожи, премиальной фурнитуре и сдержанному дизайну модель легко сочетается как с классическими образами, так и с современным повседневным гардеробом.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "22 × 7 × 16 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Ремень", value: "Регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Премиального качества в золотистом исполнении" },
    ],
  },
  {
    slug: "elegant-leather-moon-bag-cognac",
    title: "Elegant Leather Moon Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "moon-bag",
    price: 1600,
    colors: [
      {
        name: "Beige",
        hex: C.beige.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-moon-bag/moon-beige-lifestyle-v2.png", alt: "Elegant Leather Moon Bag Beige в образе" },
          { src: "/products/elegant-leather-moon-bag/moon-beige-1.png", alt: "Elegant Leather Moon Bag Beige — вид спереди" },
          { src: "/products/elegant-leather-moon-bag/moon-beige-2.png", alt: "Elegant Leather Moon Bag Beige — сбоку" },
        ],
      },
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-moon-bag/moon-cognac-1.png", alt: "Elegant Leather Moon Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-moon-bag/moon-cognac-2.png", alt: "Elegant Leather Moon Bag Cognac — сбоку" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-moon-bag/moon-black-1.png", alt: "Elegant Leather Moon Bag Black — вид спереди" },
          { src: "/products/elegant-leather-moon-bag/moon-black-2.png", alt: "Elegant Leather Moon Bag Black — сбоку" },
        ],
      },
      {
        ...C.white,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-moon-bag/moon-white-1.png", alt: "Elegant Leather Moon Bag White — вид спереди" },
          { src: "/products/elegant-leather-moon-bag/moon-white-2.png", alt: "Elegant Leather Moon Bag White — сбоку" },
        ],
      },
      {
        ...C.burgundy,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-moon-bag/moon-burgundy-1.png", alt: "Elegant Leather Moon Bag Burgundy — вид спереди" },
          { src: "/products/elegant-leather-moon-bag/moon-burgundy-2.png", alt: "Elegant Leather Moon Bag Burgundy — сбоку" },
        ],
      },
      {
        name: "Pink",
        hex: "#d83a80",
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-moon-bag/moon-pink-1.png", alt: "Elegant Leather Moon Bag Pink — вид спереди" },
          { src: "/products/elegant-leather-moon-bag/moon-pink-2.png", alt: "Elegant Leather Moon Bag Pink — сбоку" },
        ],
      },
    ],
    material: "Premium Leather",
    description:
      "Элегантная женская сумка из премиальной фактурной кожи в современном силуэте Moon Bag. Изящная полукруглая форма, лаконичные линии и благородная золотистая фурнитура создают утончённый образ, который легко дополнит как повседневный, так и вечерний гардероб.\n\nМодель оснащена короткой ручкой для ношения на плече и съёмным регулируемым ремнём, позволяющим носить сумку через плечо. Продуманная конструкция обеспечивает комфорт в использовании, а основное отделение удобно вмещает все необходимые вещи на каждый день.\n\nМинималистичный дизайн и премиальные материалы делают эту модель универсальным аксессуаром, который остаётся актуальным вне зависимости от сезона и модных тенденций.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "26.5 × 26 × 7 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "Premium Leather" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Надёжная застёжка-молния" },
      { label: "Ручка", value: "Короткая ручка для ношения на плече" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Премиального качества в золотистом исполнении" },
    ],
  },
  {
    slug: "elegant-leather-tote-bag-black",
    title: "Elegant Leather Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    isNew: true,
    images: [
      { src: "/products/elegant-leather-tote-bag/tote-cognac-lifestyle-v2.png", alt: "Elegant Leather Tote Bag Cognac в образе" },
    ],
    colors: [
      {
        name: "Cognac",
        hex: C.cognac.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-tote-bag/tote-cognac-lifestyle-v2.png", alt: "Elegant Leather Tote Bag Cognac в образе" },
          { src: "/products/elegant-leather-tote-bag/tote-cognac-1.png", alt: "Elegant Leather Tote Bag Cognac — вид спереди" },
          { src: "/products/elegant-leather-tote-bag/tote-cognac-2.png", alt: "Elegant Leather Tote Bag Cognac — сбоку" },
          { src: "/products/elegant-leather-tote-bag/tote-cognac-3.png", alt: "Elegant Leather Tote Bag Cognac — вид сверху" },
          { src: "/products/elegant-leather-tote-bag/tote-cognac-4.png", alt: "Elegant Leather Tote Bag Cognac — внутри" },
        ],
      },
      {
        name: "Black",
        hex: C.jetBlack.hex,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-tote-bag/tote-black-1.png", alt: "Elegant Leather Tote Bag Black — вид спереди" },
          { src: "/products/elegant-leather-tote-bag/tote-black-2.png", alt: "Elegant Leather Tote Bag Black — сбоку" },
          { src: "/products/elegant-leather-tote-bag/tote-black-3.png", alt: "Elegant Leather Tote Bag Black — вид сверху" },
          { src: "/products/elegant-leather-tote-bag/tote-black-4.png", alt: "Elegant Leather Tote Bag Black — внутри" },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-tote-bag/tote-taupe-1.png", alt: "Elegant Leather Tote Bag Taupe — вид спереди" },
          { src: "/products/elegant-leather-tote-bag/tote-taupe-2.png", alt: "Elegant Leather Tote Bag Taupe — сбоку" },
          { src: "/products/elegant-leather-tote-bag/tote-taupe-3.png", alt: "Elegant Leather Tote Bag Taupe — вид сверху" },
          { src: "/products/elegant-leather-tote-bag/tote-taupe-4.png", alt: "Elegant Leather Tote Bag Taupe — внутри" },
        ],
      },
      {
        ...C.darkBrown,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-tote-bag/tote-dark-brown-1.png", alt: "Elegant Leather Tote Bag Dark Brown — вид спереди" },
          { src: "/products/elegant-leather-tote-bag/tote-dark-brown-2.png", alt: "Elegant Leather Tote Bag Dark Brown — сбоку" },
          { src: "/products/elegant-leather-tote-bag/tote-dark-brown-3.png", alt: "Elegant Leather Tote Bag Dark Brown — вид сверху" },
          { src: "/products/elegant-leather-tote-bag/tote-dark-brown-4.png", alt: "Elegant Leather Tote Bag Dark Brown — внутри" },
        ],
      },
      {
        ...C.burgundy,
        status: "Доставка 7–14 дней",
        images: [
          { src: "/products/elegant-leather-tote-bag/tote-burgundy-1.png", alt: "Elegant Leather Tote Bag Burgundy — вид спереди" },
          { src: "/products/elegant-leather-tote-bag/tote-burgundy-2.png", alt: "Elegant Leather Tote Bag Burgundy — сбоку" },
          { src: "/products/elegant-leather-tote-bag/tote-burgundy-3.png", alt: "Elegant Leather Tote Bag Burgundy — вид сверху" },
          { src: "/products/elegant-leather-tote-bag/tote-burgundy-4.png", alt: "Elegant Leather Tote Bag Burgundy — внутри" },
        ],
      },
    ],
    material: "Premium Leather & Suede",
    description:
      "Элегантная женская сумка из премиальной кожи и мягкой замши, выполненная в современном архитектурном силуэте Tote Bag. Строгие линии, выразительная форма и изысканная золотистая фурнитура создают образ, который подчёркивает статус и безупречный вкус своей обладательницы.\n\nМодель оснащена удобными верхними ручками для ношения в руке или на предплечье, а также съёмным регулируемым ремнём, позволяющим комфортно носить сумку через плечо. Просторное внутреннее пространство обеспечивает удобное размещение документов, кошелька, косметички и других необходимых вещей.\n\nСочетание гладкой кожи, благородной замши и лаконичного дизайна делает эту модель универсальным аксессуаром для работы, деловых встреч, путешествий и повседневного использования.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "30 × 14 × 23 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Материал", value: "Premium Leather & Suede" },
      { label: "Отделение", value: "Просторное основное отделение" },
      { label: "Ручки", value: "Удобные двойные ручки" },
      { label: "Ремень", value: "Съёмный регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Премиального качества в золотистом исполнении" },
    ],
  },
  {
    slug: "pouch-bag-black-onyx",
    title: "Pouch Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1600,
    colors: [
      {
        ...C.blackOnyx,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/black-onyx-lifestyle.png",
            alt: "Pouch Bag Black Onyx в образе",
          },
          {
            src: "/products/pouch-bag/black-onyx-1.png",
            alt: "Pouch Bag Black Onyx спереди",
          },
          {
            src: "/products/pouch-bag/black-onyx-2.png",
            alt: "Pouch Bag Black Onyx сбоку",
          },
        ],
      },
      {
        ...C.platinumSilver,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/platinum-silver-1.png",
            alt: "Pouch Bag Platinum Silver спереди",
          },
          {
            src: "/products/pouch-bag/platinum-silver-2.png",
            alt: "Pouch Bag Platinum Silver сбоку",
          },
        ],
      },
      {
        ...C.cognacBrown,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/cognac-brown-1.png",
            alt: "Pouch Bag Cognac Brown спереди",
          },
          {
            src: "/products/pouch-bag/cognac-brown-2.png",
            alt: "Pouch Bag Cognac Brown сбоку",
          },
        ],
      },
      {
        ...C.burgundy,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/burgundy-1.png",
            alt: "Pouch Bag Burgundy спереди",
          },
          {
            src: "/products/pouch-bag/burgundy-2.png",
            alt: "Pouch Bag Burgundy сбоку",
          },
        ],
      },
      {
        ...C.royalGold,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/royal-gold-1.png",
            alt: "Pouch Bag Royal Gold спереди",
          },
          {
            src: "/products/pouch-bag/royal-gold-2.png",
            alt: "Pouch Bag Royal Gold сбоку",
          },
        ],
      },
      {
        ...C.ivory,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/ivory-1.png",
            alt: "Pouch Bag Ivory спереди",
          },
          {
            src: "/products/pouch-bag/ivory-2.png",
            alt: "Pouch Bag Ivory сбоку",
          },
        ],
      },
      {
        ...C.cherryRed,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/cherry-red-1.png",
            alt: "Pouch Bag Cherry Red спереди",
          },
          {
            src: "/products/pouch-bag/cherry-red-2.png",
            alt: "Pouch Bag Cherry Red сбоку",
          },
        ],
      },
      {
        ...C.pistachio,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/pistachio-1.png",
            alt: "Pouch Bag Pistachio спереди",
          },
        ],
      },
      {
        ...C.mint,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/pouch-bag/mint-1.png",
            alt: "Pouch Bag Mint спереди",
          },
          {
            src: "/products/pouch-bag/mint-2.png",
            alt: "Pouch Bag Mint сбоку",
          },
        ],
      },
    ],
    material: "Premium Calf Leather",
    description:
      "Эффектная сумка-мешок с мягкими драпированными линиями и выразительной золотистой деталью, которая превращает ручку в главный акцент модели. Современный силуэт сочетает минимализм и характер, делая сумку универсальным выбором как для повседневных образов, так и для вечерних выходов.\n\nМягкий корпус из гладкого материала красиво держит форму и остаётся комфортным в использовании. Надёжная молния обеспечивает удобный доступ к содержимому, а вместительное внутреннее пространство позволяет взять с собой всё необходимое.",
    isNew: true,
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "16.5 × 13 × 15 мм" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "100% натуральная телячья кожа" },
      { label: "Ручка", value: "Скульптурная с золотистым акцентом" },
      { label: "Застёжка", value: "Удобная молния" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Фактура", value: "Мягкая с элегантными складками" },
      { label: "Стиль", value: "Повседневные и вечерние образы" },
    ],
  },
  {
    slug: "structured-leather-tote-bag-burgundy",
    title: "Structured Leather Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 2000,
    colors: [
      {
        ...C.burgundy,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/structured-leather-tote-bag/burgundy-1.png",
            alt: "Structured Leather Tote Bag Burgundy — вид спереди",
          },
          {
            src: "/products/structured-leather-tote-bag/burgundy-2.png",
            alt: "Structured Leather Tote Bag Burgundy — вид сзади",
          },
          {
            src: "/products/structured-leather-tote-bag/burgundy-3.png",
            alt: "Structured Leather Tote Bag Burgundy — внутри",
          },
        ],
      },
      {
        ...C.espresso,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/structured-leather-tote-bag/espresso-1.png",
            alt: "Structured Leather Tote Bag Espresso — вид спереди",
          },
          {
            src: "/products/structured-leather-tote-bag/espresso-2.png",
            alt: "Structured Leather Tote Bag Espresso — вид сзади",
          },
          {
            src: "/products/structured-leather-tote-bag/espresso-3.png",
            alt: "Structured Leather Tote Bag Espresso — внутри",
          },
        ],
      },
      {
        ...C.rubyRed,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/structured-leather-tote-bag/ruby-red-1.png",
            alt: "Structured Leather Tote Bag Ruby Red — вид спереди",
          },
          {
            src: "/products/structured-leather-tote-bag/ruby-red-2.png",
            alt: "Structured Leather Tote Bag Ruby Red — вид сверху",
          },
          {
            src: "/products/structured-leather-tote-bag/ruby-red-3.png",
            alt: "Structured Leather Tote Bag Ruby Red — внутри",
          },
        ],
      },
    ],
    material: "Premium Calf Leather",
    description:
      "Элегантная сумка из натуральной телячьей кожи в насыщенном оттенке Burgundy, созданная для женщин, которые ценят качество, функциональность и сдержанную роскошь. Чистые линии, мягкая архитектурная форма и контрастная внутренняя отделка придают модели выразительный характер и делают её универсальным аксессуаром на каждый день.\n\nПросторное внутреннее отделение позволяет комфортно разместить документы, планшет, кошелёк и другие необходимые вещи. Продуманная организация пространства включает внутренний карман на молнии и открытый карман для быстрого доступа к самым важным мелочам.",
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "39 × 21 × 25 мм" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "100% натуральная телячья кожа" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Застёжка", value: "Поворотная" },
      { label: "Карман", value: "Внутренний карман на молнии" },
      { label: "Карман 2", value: "Внутренний открытый карман" },
      { label: "Ручки", value: "Длинные для ношения на плече" },
      { label: "Фурнитура", value: "Премиальная золотистая" },
      { label: "Отделка", value: "Контрастная внутренняя" },
    ],
  },
  {
    slug: "woven-leather-hobo-bag-black",
    title: "Woven Leather Hobo Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "hobo-bag",
    price: 2000,
    colors: [
      {
        ...C.jetBlack,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-hobo-bag/black-lifestyle-v2.png",
            alt: "Woven Leather Hobo Bag Black в образе",
          },
          {
            src: "/products/woven-leather-hobo-bag/black-front.png",
            alt: "Woven Leather Hobo Bag Black спереди",
          },
          {
            src: "/products/woven-leather-hobo-bag/black-side.png",
            alt: "Woven Leather Hobo Bag Black сбоку",
          },
          {
            src: "/products/woven-leather-hobo-bag/black-inside.png",
            alt: "Woven Leather Hobo Bag Black внутри",
          },
          {
            src: "/products/woven-leather-hobo-bag/black-clutch.png",
            alt: "Woven Leather Hobo Bag Black со съёмным клатчем",
          },
        ],
      },
      {
        ...C.chocolateBrown,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-hobo-bag/chocolate-brown-front.png",
            alt: "Woven Leather Hobo Bag Chocolate Brown спереди",
          },
          {
            src: "/products/woven-leather-hobo-bag/chocolate-brown-side.png",
            alt: "Woven Leather Hobo Bag Chocolate Brown сбоку",
          },
          {
            src: "/products/woven-leather-hobo-bag/chocolate-brown-inside.png",
            alt: "Woven Leather Hobo Bag Chocolate Brown внутри",
          },
          {
            src: "/products/woven-leather-hobo-bag/chocolate-brown-clutch.png",
            alt: "Woven Leather Hobo Bag Chocolate Brown со съёмным клатчем",
          },
        ],
      },
      {
        ...C.ivory,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/woven-leather-hobo-bag/ivory-front.png",
            alt: "Woven Leather Hobo Bag Ivory спереди",
          },
          {
            src: "/products/woven-leather-hobo-bag/ivory-side.png",
            alt: "Woven Leather Hobo Bag Ivory сбоку",
          },
          {
            src: "/products/woven-leather-hobo-bag/ivory-inside.png",
            alt: "Woven Leather Hobo Bag Ivory внутри",
          },
          {
            src: "/products/woven-leather-hobo-bag/ivory-clutch.png",
            alt: "Woven Leather Hobo Bag Ivory со съёмным клатчем",
          },
        ],
      },
    ],
    material: "Premium Calf Leather",
    description:
      "Элегантная сумка-хобо из натуральной кожи с фирменным плетёным дизайном, который подчёркивает мастерство исполнения и внимание к деталям. Мягкий силуэт и плавные линии создают непринуждённый, но утончённый образ для любого случая.\n\nВыполненная из премиальной телячьей кожи, модель отличается лёгкостью, вместительностью и комфортом в повседневном использовании. Просторное внутреннее отделение позволяет удобно разместить все необходимые вещи, а съёмный кожаный клатч помогает хранить документы и мелочи отдельно.",
    isNew: true,
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "34 × 26 × 17 мм" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "100% натуральная телячья кожа" },
      { label: "Плетение", value: "Ручное плетение кожи" },
      { label: "Отделение", value: "Вместительное основное отделение" },
      { label: "Клатч", value: "Съёмный внутренний клатч на молнии" },
      { label: "Ручка", value: "Удобная для ношения на плече" },
      { label: "Конструкция", value: "Мягкая и лёгкая" },
      { label: "Фурнитура", value: "Премиальная" },
    ],
  },
  {
    slug: "the-essential-shoulder-bag-tan-cognac",
    title: "The Essential Shoulder Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 1200,
    colors: [
      {
        ...C.tanCognac,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/the-essential-shoulder-bag/tan-cognac-front.png",
            alt: "The Essential Shoulder Bag Tan Cognac спереди",
          },
          {
            src: "/products/the-essential-shoulder-bag/tan-cognac-angle.png",
            alt: "The Essential Shoulder Bag Tan Cognac под углом",
          },
          {
            src: "/products/the-essential-shoulder-bag/tan-cognac-inside.png",
            alt: "The Essential Shoulder Bag Tan Cognac внутри",
          },
        ],
      },
      {
        ...C.blush,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/the-essential-shoulder-bag/blush-front.png",
            alt: "The Essential Shoulder Bag Blush спереди",
          },
          {
            src: "/products/the-essential-shoulder-bag/blush-angle.png",
            alt: "The Essential Shoulder Bag Blush под углом",
          },
          {
            src: "/products/the-essential-shoulder-bag/blush-inside.png",
            alt: "The Essential Shoulder Bag Blush внутри",
          },
        ],
      },
      {
        ...C.jetBlack,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/the-essential-shoulder-bag/jet-black-front.png",
            alt: "The Essential Shoulder Bag Jet Black спереди",
          },
          {
            src: "/products/the-essential-shoulder-bag/jet-black-angle.png",
            alt: "The Essential Shoulder Bag Jet Black под углом",
          },
          {
            src: "/products/the-essential-shoulder-bag/jet-black-inside.png",
            alt: "The Essential Shoulder Bag Jet Black внутри",
          },
        ],
      },
    ],
    material: "Premium Calf Leather",
    description:
      "Современная сумка из натуральной телячьей кожи, в которой лаконичный дизайн сочетается с безупречной функциональностью. Чистые линии, мягкий силуэт и удлинённые ручки создают элегантный образ, который одинаково уместен как в деловом гардеробе, так и в повседневных образах.\n\nВыполненная из гладкой премиальной телячьей кожи, модель отличается приятной текстурой, долговечностью и способностью сохранять безупречный внешний вид на протяжении многих сезонов. Просторное основное отделение на молнии позволяет удобно разместить все необходимые вещи, сохраняя порядок и быстрый доступ к содержимому.",
    isNew: true,
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "35 × 19 × 8 мм" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "100% натуральная телячья кожа" },
      { label: "Отделение", value: "Вместительное внутреннее отделение" },
      { label: "Застёжка", value: "Надёжная молния" },
      { label: "Ручки", value: "Удлинённые для ношения на плече" },
      { label: "Карман", value: "Внутренний карман для мелочей" },
      { label: "Фурнитура", value: "Премиальная золотистая" },
    ],
  },
  {
    slug: "calf-leather-tote-bag-off-white",
    title: "Calf Leather Tote Bag",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "tote-bag",
    price: 2400,
    colors: [
      {
        ...C.offWhite,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/calf-leather-tote-bag/off-white-lifestyle-v2.png",
            alt: "Calf Leather Tote Bag Off-White в образе",
          },
          {
            src: "/products/calf-leather-tote-bag/off-white-front.png",
            alt: "Calf Leather Tote Bag Off-White спереди",
          },
          {
            src: "/products/calf-leather-tote-bag/off-white-angle.png",
            alt: "Calf Leather Tote Bag Off-White под углом",
          },
          {
            src: "/products/calf-leather-tote-bag/off-white-inside.png",
            alt: "Calf Leather Tote Bag Off-White внутри",
          },
        ],
      },
      {
        ...C.taupe,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/calf-leather-tote-bag/taupe-front.png",
            alt: "Calf Leather Tote Bag Taupe спереди",
          },
          {
            src: "/products/calf-leather-tote-bag/taupe-back.png",
            alt: "Calf Leather Tote Bag Taupe сзади",
          },
          {
            src: "/products/calf-leather-tote-bag/taupe-angle.png",
            alt: "Calf Leather Tote Bag Taupe под углом",
          },
          {
            src: "/products/calf-leather-tote-bag/taupe-inside.png",
            alt: "Calf Leather Tote Bag Taupe внутри",
          },
        ],
      },
      {
        ...C.cognac,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/calf-leather-tote-bag/cognac-front.png",
            alt: "Calf Leather Tote Bag Cognac спереди",
          },
          {
            src: "/products/calf-leather-tote-bag/cognac-back.png",
            alt: "Calf Leather Tote Bag Cognac сзади",
          },
          {
            src: "/products/calf-leather-tote-bag/cognac-angle.png",
            alt: "Calf Leather Tote Bag Cognac под углом",
          },
          {
            src: "/products/calf-leather-tote-bag/cognac-inside.png",
            alt: "Calf Leather Tote Bag Cognac внутри",
          },
        ],
      },
      {
        ...C.jetBlack,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/calf-leather-tote-bag/jet-black-front.png",
            alt: "Calf Leather Tote Bag Jet Black спереди",
          },
          {
            src: "/products/calf-leather-tote-bag/jet-black-back.png",
            alt: "Calf Leather Tote Bag Jet Black сзади",
          },
          {
            src: "/products/calf-leather-tote-bag/jet-black-angle.png",
            alt: "Calf Leather Tote Bag Jet Black под углом",
          },
          {
            src: "/products/calf-leather-tote-bag/jet-black-inside.png",
            alt: "Calf Leather Tote Bag Jet Black внутри",
          },
        ],
      },
      {
        ...C.burgundy,
        status: "Доставка 7–14 дней",
        images: [
          {
            src: "/products/calf-leather-tote-bag/burgundy-front.png",
            alt: "Calf Leather Tote Bag Burgundy спереди",
          },
          {
            src: "/products/calf-leather-tote-bag/burgundy-back.png",
            alt: "Calf Leather Tote Bag Burgundy сзади",
          },
          {
            src: "/products/calf-leather-tote-bag/burgundy-angle.png",
            alt: "Calf Leather Tote Bag Burgundy под углом",
          },
          {
            src: "/products/calf-leather-tote-bag/burgundy-inside.png",
            alt: "Calf Leather Tote Bag Burgundy внутри",
          },
        ],
      },
    ],
    material: "Premium Calf Leather",
    description:
      "Элегантная сумка из премиальной телячьей кожи, сочетающая современный минимализм и безупречное качество исполнения. Благородная зернистая фактура подчёркивает натуральное происхождение кожи, а универсальный дизайн легко дополняет как деловые, так и повседневные образы.\n\nИзготовленная из мягкой телячьей кожи, сумка отличается высокой износостойкостью, приятной текстурой и способностью сохранять привлекательный внешний вид на протяжении многих лет. Просторное внутреннее отделение позволяет удобно разместить все необходимые вещи для работы, города или путешествий.",
    isNew: true,
    specs: [
      { label: "Пол", value: "Женский" },
      { label: "Размер", value: "55 × 22 × 15 см" },
      { label: "Страна производства", value: "Италия" },
      { label: "Кожа", value: "100% натуральная телячья кожа" },
      { label: "Фактура", value: "Мягкая зернистая" },
      { label: "Отделение", value: "Вместительное внутреннее отделение" },
      { label: "Ремень", value: "Регулируемый плечевой ремень" },
      { label: "Фурнитура", value: "Премиальная металлическая фурнитура" },
      { label: "Застёжка", value: "Магнитная" },
      { label: "Сезон", value: "Универсальный дизайн для любого сезона" },
    ],
  },
  {
    slug: "aurelia-soft-hobo-cognac",
    title: "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета",
    brandSlug: "aurelia",
    section: "bags",
    categorySlug: "meshki",
    price: 18900,
    oldPrice: 24900,
    colors: [C.cognac, C.black, C.beige],
    material: "Натуральная телячья кожа",
    description:
      "Объёмная сумка-мешок мягкой формы с одной широкой ручкой на плечо. Хорошо держит вещи и при этом красиво «садится» по фигуре. Внутри — вместительное отделение и карман на молнии.",
    isNew: true,
    hasVideo: true,
    specs: [
      { label: "Размеры", value: "30 × 28 × 14 см" },
      { label: "Застёжка", value: "Магнитная кнопка" },
      { label: "Подкладка", value: "Текстиль" },
    ],
  },
  {
    slug: "aurelia-baguette-black",
    title: "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета",
    brandSlug: "aurelia",
    section: "bags",
    categorySlug: "bagety",
    price: 15400,
    colors: [C.black, C.bordo],
    material: "Натуральная кожа",
    description:
      "Узкая сумка-багет, которую можно носить в руке или на плече. Лаконичная форма и поворотный замок делают её универсальной на каждый день.",
    isNew: true,
    specs: [
      { label: "Размеры", value: "26 × 14 × 6 см" },
      { label: "Застёжка", value: "Поворотный замок" },
    ],
  },
  {
    slug: "vionetta-structured-bag-beige",
    title: "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета",
    brandSlug: "vionetta",
    section: "bags",
    categorySlug: "delovye",
    price: 27600,
    oldPrice: 32000,
    colors: [C.beige, C.black, C.brown],
    material: "Натуральная кожа с тиснением",
    description:
      "Сумка с чёткой геометрией корпуса и заметной металлической пряжкой. Держит форму, вмещает документы формата А4 и подходит для работы и города.",
    hasVideo: true,
    specs: [
      { label: "Размеры", value: "34 × 26 × 12 см" },
      { label: "Отделения", value: "2 основных + карман на молнии" },
    ],
  },
  {
    slug: "vionetta-mini-crossbody-rose",
    title: "Мини-сумка Vionetta через плечо на цепочке пудрового цвета",
    brandSlug: "vionetta",
    section: "bags",
    categorySlug: "mini",
    price: 12900,
    colors: [C.rose, C.black, C.beige],
    material: "Натуральная кожа",
    description:
      "Компактная вечерняя сумка на тонком ремешке-цепочке. Вмещает телефон, карты и помаду — всё необходимое для выхода.",
    isNew: true,
    specs: [
      { label: "Размеры", value: "18 × 12 × 6 см" },
      { label: "Ремень", value: "Съёмная цепочка" },
    ],
  },
  {
    slug: "luma-tote-sand",
    title: "Большой шопер SÓRA Atelier из плотной кожи песочного цвета",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "bolshie",
    price: 21900,
    oldPrice: 27900,
    colors: [C.sand, C.black, C.cognac],
    material: "Натуральная зернистая кожа",
    description:
      "Вместительный шопер на каждый день: помещается ноутбук, документы и всё для долгого дня. Две удобные ручки и внутренний карман на молнии.",
    specs: [
      { label: "Размеры", value: "38 × 30 × 13 см" },
      { label: "Ноутбук", value: "До 14″" },
    ],
  },
  {
    slug: "luma-backpack-black",
    title: "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "ryukzaki",
    price: 19900,
    colors: [C.black, C.brown, C.navy],
    material: "Натуральная кожа",
    description:
      "Аккуратный городской рюкзак с регулируемыми лямками и удобным доступом к основному отделению. Подходит и под повседневный образ, и под поездки.",
    isNew: true,
    specs: [
      { label: "Размеры", value: "28 × 32 × 12 см" },
      { label: "Карманы", value: "Внешний на молнии + внутренние" },
    ],
  },
  {
    slug: "castello-briefcase-brown",
    title: "Деловой портфель Castello из гладкой кожи коричневого цвета",
    brandSlug: "castello",
    section: "bags",
    categorySlug: "delovye",
    price: 32900,
    oldPrice: 38900,
    colors: [C.brown, C.black],
    material: "Натуральная кожа",
    description:
      "Строгий портфель с жёстким корпусом и съёмным плечевым ремнём. Отделение для ноутбука, органайзер для документов и аксессуаров.",
    hasVideo: true,
    specs: [
      { label: "Размеры", value: "40 × 30 × 10 см" },
      { label: "Ноутбук", value: "До 15″" },
    ],
  },
  {
    slug: "marrone-crossbody-cognac",
    title: "Сумка через плечо Marrone с двумя карманами коньячного цвета",
    brandSlug: "marrone",
    section: "bags",
    categorySlug: "cherez-plecho",
    price: 16400,
    oldPrice: 19900,
    colors: [C.cognac, C.brown, C.green],
    material: "Натуральная кожа выраженной фактуры",
    description:
      "Сумка среднего размера с накладными карманами спереди и широким регулируемым ремнём. Тёплый коньячный оттенок и мягкая фактура кожи.",
    specs: [
      { label: "Размеры", value: "27 × 20 × 9 см" },
      { label: "Ремень", value: "Регулируемый, съёмный" },
    ],
  },
  {
    slug: "marrone-clutch-bordo",
    title: "Клатч Marrone на цепочке из гладкой кожи бордового цвета",
    brandSlug: "marrone",
    section: "bags",
    categorySlug: "klatchi",
    price: 10900,
    colors: [C.bordo, C.black, C.beige],
    material: "Натуральная кожа",
    description:
      "Элегантный клатч с тонкой цепочкой, которую можно убрать внутрь. Подходит для вечера и особых случаев.",
    isNew: true,
    specs: [
      { label: "Размеры", value: "22 × 13 × 4 см" },
    ],
  },
  {
    slug: "aurelia-travel-bag-brown",
    title: "Дорожная сумка Aurelia из плотной кожи коричневого цвета",
    brandSlug: "aurelia",
    section: "bags",
    categorySlug: "dorozhnye",
    price: 36900,
    oldPrice: 42900,
    colors: [C.brown, C.black],
    material: "Натуральная кожа",
    description:
      "Вместительная дорожная сумка для поездок на выходные. Прочные ручки, плечевой ремень и отделение для обуви или ноутбука.",
    hasVideo: true,
    specs: [
      { label: "Размеры", value: "50 × 30 × 24 см" },
      { label: "Объём", value: "≈ 35 л" },
    ],
  },
  {
    slug: "luma-belt-bag-black",
    title: "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета",
    brandSlug: "luma-atelier",
    section: "bags",
    categorySlug: "poyasnye",
    price: 8900,
    colors: [C.black, C.beige, C.cognac],
    material: "Натуральная кожа",
    description:
      "Лёгкая поясная сумка, которую можно носить на талии или через плечо. Удобна в поездках и на прогулках.",
    specs: [{ label: "Размеры", value: "20 × 13 × 6 см" }],
  },
  {
    slug: "vionetta-bucket-green",
    title: "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета",
    brandSlug: "vionetta",
    section: "bags",
    categorySlug: "meshki",
    price: 17900,
    colors: [C.green, C.cognac, C.black],
    material: "Натуральная кожа",
    description:
      "Высокая сумка-мешок с затягивающимся верхом и внутренним съёмным кошельком. Сочный приглушённый оттенок и мягкая форма.",
    isNew: true,
    specs: [{ label: "Размеры", value: "24 × 28 × 16 см" }],
  },
  {
    slug: "aurelia-big-shopper-grey",
    title: "Большая сумка Aurelia с двумя ручками серого цвета",
    brandSlug: "aurelia",
    section: "bags",
    categorySlug: "bolshie",
    price: 22900,
    colors: [C.grey, C.black, C.sand],
    material: "Натуральная зернистая кожа",
    description:
      "Просторная сумка для тех, кто носит с собой многое. Держит форму, имеет внутренний органайзер и съёмный длинный ремень.",
    specs: [{ label: "Размеры", value: "36 × 28 × 15 см" }],
  },
  {
    slug: "marrone-crossbody-navy",
    title: "Небольшая сумка через плечо Marrone синего цвета",
    brandSlug: "marrone",
    section: "bags",
    categorySlug: "cherez-plecho",
    price: 13900,
    oldPrice: 16900,
    colors: [C.navy, C.black, C.bordo],
    material: "Натуральная кожа",
    description:
      "Компактная сумка на каждый день с удобным клапаном и регулируемым ремнём. Помещается всё необходимое без лишнего объёма.",
    specs: [{ label: "Размеры", value: "22 × 16 × 7 см" }],
  },
  // ——— Аксессуары ———
  {
    slug: "pelle-nova-wallet-cognac",
    title: "Женский кошелёк Pelle Nova на молнии коньячного цвета",
    brandSlug: "pelle-nova",
    section: "accessories",
    categorySlug: "zhenskie-koshelki",
    price: 5900,
    oldPrice: 7400,
    colors: [C.cognac, C.black, C.bordo],
    material: "Натуральная кожа",
    description:
      "Вместительный кошелёк с отделениями для купюр, карт и монет. Закрывается по периметру на молнию.",
    isNew: true,
    specs: [
      { label: "Размеры", value: "19 × 10 × 3 см" },
      { label: "Карты", value: "12 отделений" },
    ],
  },
  {
    slug: "pelle-nova-cardholder-brown",
    title: "Картхолдер Pelle Nova из натуральной кожи коричневого цвета",
    brandSlug: "pelle-nova",
    section: "accessories",
    categorySlug: "kartholdery",
    price: 2900,
    oldPrice: 3600,
    colors: [C.brown, C.black, C.cognac],
    material: "Натуральная кожа",
    description:
      "Компактный картхолдер на несколько карт с центральным карманом для купюр. Помещается в любой карман.",
    isNew: true,
    specs: [{ label: "Карты", value: "4–6 шт." }],
  },
  {
    slug: "marrone-keyholder-cognac",
    title: "Ключница Marrone из кожи коньячного цвета",
    brandSlug: "marrone",
    section: "accessories",
    categorySlug: "klyuchnicy",
    price: 2400,
    colors: [C.cognac, C.black, C.brown],
    material: "Натуральная кожа",
    description:
      "Аккуратная ключница на кнопке с карабинами для ключей. Защищает подкладку сумки и держит ключи вместе.",
    specs: [{ label: "Карабины", value: "6 шт." }],
  },
  {
    slug: "luma-cosmetic-bag-beige",
    title: "Косметичка SÓRA Atelier из мягкой кожи бежевого цвета",
    brandSlug: "luma-atelier",
    section: "accessories",
    categorySlug: "kosmetichki",
    price: 4200,
    oldPrice: 5400,
    colors: [C.beige, C.black, C.rose],
    material: "Натуральная кожа",
    description:
      "Вместительная косметичка на молнии с водоотталкивающей подкладкой. Подходит и как клатч-органайзер внутри большой сумки.",
    specs: [{ label: "Размеры", value: "20 × 13 × 7 см" }],
  },
  {
    slug: "pelle-nova-passport-cover-bordo",
    title: "Обложка для паспорта Pelle Nova бордового цвета",
    brandSlug: "pelle-nova",
    section: "accessories",
    categorySlug: "oblozhki",
    price: 2200,
    colors: [C.bordo, C.black, C.navy],
    material: "Натуральная кожа",
    description:
      "Тонкая обложка для паспорта с внутренними карманами для карт. Защищает документ и аккуратно выглядит.",
    isNew: true,
  },
  {
    slug: "pelle-nova-belt-black",
    title: "Ремень Pelle Nova из гладкой кожи чёрного цвета",
    brandSlug: "pelle-nova",
    section: "accessories",
    categorySlug: "remni",
    price: 3900,
    oldPrice: 4900,
    colors: [C.black, C.brown],
    material: "Натуральная кожа",
    description:
      "Классический ремень шириной 3,5 см с матовой пряжкой. Универсальный к джинсам и брюкам.",
    specs: [{ label: "Ширина", value: "3,5 см" }],
  },
  {
    slug: "luma-bag-charm-cognac",
    title: "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета",
    brandSlug: "luma-atelier",
    section: "accessories",
    categorySlug: "podveski",
    price: 1900,
    colors: [C.cognac, C.black, C.rose],
    material: "Натуральная кожа",
    description:
      "Кожаная подвеска-кисточка на карабине. Лёгкий акцент, который освежает любую сумку.",
    isNew: true,
  },
  {
    slug: "luma-gift-set-black",
    title: "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета",
    brandSlug: "luma-atelier",
    section: "accessories",
    categorySlug: "nabory",
    price: 8900,
    oldPrice: 11200,
    colors: [C.black, C.cognac, C.bordo],
    material: "Натуральная кожа",
    description:
      "Готовый подарок в фирменной коробке: кошелёк и картхолдер из одной кожи. Можно дополнить открыткой с пожеланием.",
    hasVideo: true,
  },
  {
    slug: "marrone-womens-wallet-rose",
    title: "Женский кошелёк Marrone на кнопке пудрового цвета",
    brandSlug: "marrone",
    section: "accessories",
    categorySlug: "zhenskie-koshelki",
    price: 5400,
    colors: [C.rose, C.beige, C.bordo],
    material: "Натуральная кожа",
    description:
      "Компактный кошелёк, который закрывается на кнопку. Внутри — отделения для карт, купюр и монетница.",
    specs: [{ label: "Карты", value: "8 отделений" }],
  },
];

// ——— Хелперы выборки ———

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBrand(slug: string): BrandDef | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getCategory(slug: string): CategoryDef | undefined {
  return allCategories.find((c) => c.slug === slug);
}

export function getBrandName(slug: string): string {
  return getBrand(slug)?.name ?? slug;
}

export function productsBySection(section: "bags" | "accessories"): Product[] {
  return products.filter((p) => p.section === section);
}

export function productsByCategory(slug: string): Product[] {
  if (slug === "vse-sumki") return productsBySection("bags");
  if (slug === "vse-aksessuary") return productsBySection("accessories");
  return products.filter((p) => p.categorySlug === slug);
}

export function productsByBrand(slug: string): Product[] {
  return products.filter((p) => p.brandSlug === slug);
}

export const newProducts = products.filter((p) => p.isNew);
export const saleProducts = products.filter((p) => p.oldPrice && p.oldPrice > p.price);

export function productHasPhotos(p: Product): boolean {
  if (p.images && p.images.length > 0) return true;
  return p.colors.some((c) => c.images && c.images.length > 0);
}

const categorySlugsWithPhotos = new Set(
  products.filter(productHasPhotos).map((p) => p.categorySlug),
);

// Категории сумок, в которых есть реальные товары с фотографиями (для навигации).
export const bagMenuCategories = bagCategories.filter(
  (c) => c.slug !== "vse-sumki" && categorySlugsWithPhotos.has(c.slug),
);