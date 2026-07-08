export type InfoExtraBanner = {
  image: string;
  alt: string;
  aspect: `${number}/${number}`;
};

export type InfoPage = {
  slug: string;
  title: string;
  bannerImage?: string;
  extraBanners?: InfoExtraBanner[];
  body: string[];
};

export const infoPages: InfoPage[] = [
  {
    slug: "o-nas",
    title: "О нас",
    bannerImage: "/about-banner-v2.jpg",
    body: [
      "Добро пожаловать в SÓRA Bags.",
      "Мы создали SÓRA Bags с простой идеей — помочь женщинам находить сумки, которые выглядят дорого, служат долго и остаются актуальными независимо от модных трендов. Мы уверены, что качественная сумка — это не просто аксессуар. Это часть образа, отражение вкуса и деталь, которая сопровождает свою владелицу каждый день.",
      "В основе нашего ассортимента лежат итальянские сумки и аксессуары, выбранные с особым вниманием к качеству материалов, удобству и дизайну. Мы сотрудничаем с проверенными поставщиками и уделяем большое внимание каждой модели, прежде чем она появится в нашей коллекции. Для нас важно, чтобы каждая сумка сочетала в себе элегантность, практичность и долговечность.",
      "SÓRA Bags появился благодаря любви к современной классике. Мы заметили, что многие покупательницы сталкиваются с выбором между доступностью и качеством. Наша задача — предложить изделия, которые выглядят премиально, изготовлены из качественных материалов и доступны по справедливой цене.",
      "Мы стремимся создавать не просто магазин, а место, где каждая женщина сможет найти аксессуар, соответствующий ее стилю жизни. Будь то деловая встреча, путешествие, прогулка по городу или особенное событие — правильная сумка помогает чувствовать себя уверенно в любой ситуации.",
      "Особое внимание мы уделяем обслуживанию клиентов. Мы всегда готовы помочь с выбором модели, рассказать о материалах, подобрать подходящий цвет и ответить на любые вопросы. Для нас важна не только покупка, но и впечатление, которое остается после нее.",
      "Мы верим, что настоящая элегантность заключается в деталях. Именно поэтому каждая сумка в SÓRA Bags подбирается с учетом актуальных тенденций, качества исполнения и практичности в повседневной жизни.",
      "Спасибо, что выбираете SÓRA Bags. Мы рады быть частью вашей истории и помогать создавать образы, в которых стиль встречается с уверенностью.",
    ],
  },
  {
    slug: "oplata-i-dostavka",
    title: "Оплата и доставка",
    bannerImage: "/payment-delivery-banner-v5.png",
    body: [],
  },
  {
    slug: "vozvrat",
    title: "Возврат",
    body: [],
  },
  {
    slug: "garantiya",
    title: "Гарантия качества",
    bannerImage: "/warranty-banner-v3.png",
    extraBanners: [
      {
        image: "/warranty-craft-banner.png",
        alt: "Инструменты мастера — SÓRA Bags",
        aspect: "576/1024",
      },
      {
        image: "/warranty-artisan-banner.png",
        alt: "Ручная работа с кожей — SÓRA Bags",
        aspect: "683/1024",
      },
    ],
    body: [],
  },
  {
    slug: "nashi-magaziny",
    title: "Наши магазины",
    body: [
      "Информация о магазинах SÓRA Bags скоро появится на этой странице.",
      "Если вы хотите уточнить адрес, график работы или наличие конкретной модели, свяжитесь с нами удобным для вас способом.",
    ],
  },
  {
    slug: "podarochnye-sertifikaty",
    title: "Подарочные сертификаты",
    bannerImage: "/gift-certificate-banner-v4.png",
    body: [],
  },
  {
    slug: "rekvizity",
    title: "Реквизиты",
    body: [],
  },
  {
    slug: "publichnaya-oferta",
    title: "Публичная оферта",
    body: [],
  },
  {
    slug: "politika-konfidentsialnosti",
    title: "Политика конфиденциальности",
    body: [],
  },
];

const hiddenInfoNavSlugs = new Set([
  "vozvrat",
  "rekvizity",
  "politika-konfidentsialnosti",
  "publichnaya-oferta",
]);

/** Info pages shown in header, footer, and info sidebar navigation. */
export const navInfoPages = infoPages.filter((p) => !hiddenInfoNavSlugs.has(p.slug));

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((p) => p.slug === slug);
}

const localizedInfoTitles: Record<string, { ro: string; en: string }> = {
  "o-nas": { ro: "Despre noi", en: "About us" },
  "oplata-i-dostavka": { ro: "Plată și livrare", en: "Payment and delivery" },
  vozvrat: { ro: "Retur", en: "Returns" },
  garantiya: { ro: "Garanția calității", en: "Quality warranty" },
  "nashi-magaziny": { ro: "Magazinele noastre", en: "Our stores" },
  "podarochnye-sertifikaty": { ro: "Certificate cadou", en: "Gift certificates" },
  rekvizity: { ro: "Date companie", en: "Company details" },
  "publichnaya-oferta": { ro: "Ofertă publică", en: "Public offer" },
  "politika-konfidentsialnosti": { ro: "Politica de confidențialitate", en: "Privacy policy" },
};

const localizedInfoBody: Record<string, { ro: string[]; en: string[] }> = {
  "nashi-magaziny": {
    ro: [
      "Informațiile despre magazinele SÓRA Bags vor apărea în curând pe această pagină.",
      "Dacă doriți să confirmați adresa, programul sau disponibilitatea unui model, contactați-ne prin metoda convenabilă pentru dvs.",
    ],
    en: [
      "Information about SÓRA Bags stores will appear on this page soon.",
      "If you would like to confirm the address, working hours or availability of a specific model, contact us in the way most convenient for you.",
    ],
  },
};

export function getInfoTitle(page: Pick<InfoPage, "slug" | "title">, locale: "ru" | "ro" | "en") {
  return locale === "ru" ? page.title : localizedInfoTitles[page.slug]?.[locale] ?? page.title;
}

export function getInfoBody(page: Pick<InfoPage, "slug" | "body">, locale: "ru" | "ro" | "en") {
  return locale === "ru" ? page.body : localizedInfoBody[page.slug]?.[locale] ?? page.body;
}