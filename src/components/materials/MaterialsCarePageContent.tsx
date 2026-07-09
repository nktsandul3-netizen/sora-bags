"use client";

import Image from "next/image";
import { useState } from "react";
import { brand } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import Breadcrumbs from "@/components/Breadcrumbs";

type Block = {
  image: string;
  alt: string;
  title: string;
  paragraphs: string[];
};

type FaqItem = {
  q: string;
  a: string;
};

const copy: Record<
  Locale,
  {
    title: string;
    blocks: Block[];
    faqTitle: string;
    faq: FaqItem[];
    whatsappLabel: string;
  }
> = {
  ru: {
    title: "Материалы и уход",
    blocks: [
      {
        image: "/materials-care/raffia_texture_closeup.webp",
        alt: "Плетёная рафия SÓRA",
        title: "Рафия",
        paragraphs: [
          "Плетёная рафия — лёгкий натуральный материал для города и тёплого сезона. Фактура живая: небольшие неровности плетения — часть характера изделия.",
          "Берегите рафию от сильной влаги и длительного контакта с водой. При намокании аккуратно промокните мягкой сухой тканью и дайте высохнуть естественным образом вдали от батарей и прямого солнца.",
        ],
      },
      {
        image: "/materials-care/white_intrecciato_leather_macro.webp",
        alt: "Плетёная кожа intrecciato SÓRA",
        title: "Кожа Intreccio",
        paragraphs: [
          "Натуральная кожа и плетение intreccio сохраняют естественную фактуру, мягкость и оттенки. Небольшие различия зерна — признак живого материала, а не дефект.",
          "Не стирайте сумки в машине и не замачивайте их. Для очистки используйте мягкую ткань и средства для кожи; перед применением протестируйте средство на незаметном участке.",
        ],
      },
      {
        image: "/materials-care/blue_white_silk_scarf.webp",
        alt: "Шёлковый платок SÓRA",
        title: "Шёлк / Foulard",
        paragraphs: [
          "Шёлковые платки SÓRA — лёгкий акцент к сумке или образу. Храните их вдали от прямого солнца, чтобы сохранить яркость принта.",
          "Рекомендуется бережная химчистка или ручная стирка в прохладной воде со средством для шёлка. Не выкручивайте и сушите в расправленном виде.",
        ],
      },
      {
        image: "/materials-care/minimal_flatlay_sandstone.webp",
        alt: "Уход за изделиями SÓRA",
        title: "Уход и хранение",
        paragraphs: [
          "Перед длительным хранением очистите и полностью высушите изделие. Для сохранения формы наполните сумку мягкой бумагой и уберите в тканевый пыльник.",
          "Не используйте полиэтиленовые пакеты для долгого хранения. Съёмные ремни удобнее держать внутри сумки. При необходимости используйте водоотталкивающие средства для кожи.",
        ],
      },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      {
        q: "Можно ли мочить сумку из рафии или кожи?",
        a: "Нет, изделия из натуральной кожи и рафии не рекомендуется подвергать воздействию влаги. Если сумка намокла, промокните её сухой тканью и высушите естественным образом.",
      },
      {
        q: "Чем чистить кожаную сумку?",
        a: "Используйте мягкую ткань и специальные средства для ухода за кожей. Перед применением протестируйте средство на незаметном участке и после чистки протрите изделие насухо.",
      },
      {
        q: "Как правильно хранить сумку?",
        a: "Храните в тканевом пыльнике, наполните мягкой бумагой для сохранения формы, избегайте прямого солнца, повышенной влажности и полиэтиленовых пакетов.",
      },
    ],
    whatsappLabel: "Написать в WhatsApp",
  },
  ro: {
    title: "Materiale și îngrijire",
    blocks: [
      {
        image: "/materials-care/raffia_texture_closeup.webp",
        alt: "Rafie împletită SÓRA",
        title: "Rafie",
        paragraphs: [
          "Rafia împletită este un material natural ușor, potrivit pentru oraș și sezonul cald. Textura este vie: micile neregularități ale împletiturii fac parte din caracterul produsului.",
          "Protejați rafia de umezeală puternică. Dacă se udă, ștergeți delicată cu o cârpă uscată și lăsați să se usuce natural, departe de calorifere și soare direct.",
        ],
      },
      {
        image: "/materials-care/white_intrecciato_leather_macro.webp",
        alt: "Piele împletită intrecciato SÓRA",
        title: "Piele Intreccio",
        paragraphs: [
          "Pielea naturală și împletitura intreccio păstrează textura, moliciunea și nuanțele naturale. Micile diferențe de granulă sunt semnul unui material viu.",
          "Nu spălați gențile la mașină și nu le înmuiați. Pentru curățare folosiți o cârpă moale și produse pentru piele; testați pe o zonă puțin vizibilă.",
        ],
      },
      {
        image: "/materials-care/blue_white_silk_scarf.webp",
        alt: "Foulard din mătase SÓRA",
        title: "Mătase / Foulard",
        paragraphs: [
          "Foulardurile din mătase SÓRA completează geanta sau ținuta. Păstrați-le departe de soarele direct pentru a menține intensitatea printului.",
          "Recomandăm curățătorie delicată sau spălare manuală în apă rece cu detergent pentru mătase. Nu răsuciți și uscați întinse.",
        ],
      },
      {
        image: "/materials-care/minimal_flatlay_sandstone.webp",
        alt: "Îngrijirea produselor SÓRA",
        title: "Îngrijire și depozitare",
        paragraphs: [
          "Înainte de depozitare pe termen lung, curățați și uscați complet produsul. Umpleți geanta cu hârtie moale și păstrați-o în husă textilă.",
          "Nu folosiți pungi de plastic pentru depozitare îndelungată. Curelele detașabile se păstrează de preferință în interiorul genții.",
        ],
      },
    ],
    faqTitle: "Întrebări frecvente",
    faq: [
      {
        q: "Se poate uda geanta din rafie sau piele?",
        a: "Nu — produsele din piele naturală și rafie nu trebuie expuse la umezeală. Dacă se udă, ștergeți cu o cârpă uscată și lăsați să se usuce natural.",
      },
      {
        q: "Cum curăț o geantă din piele?",
        a: "Folosiți o cârpă moale și produse speciale pentru piele. Testați pe o zonă puțin vizibilă și ștergeți produsul până la uscare.",
      },
      {
        q: "Cum depozitez corect geanta?",
        a: "În husă textilă, umplută cu hârtie moale, departe de soare direct, umiditate ridicată și pungi de plastic.",
      },
    ],
    whatsappLabel: "Scrie pe WhatsApp",
  },
  en: {
    title: "Materials and care",
    blocks: [
      {
        image: "/materials-care/raffia_texture_closeup.webp",
        alt: "Woven raffia SÓRA",
        title: "Raffia",
        paragraphs: [
          "Woven raffia is a light natural material for the city and warmer seasons. The texture is alive: slight irregularities in the weave are part of the piece’s character.",
          "Keep raffia away from heavy moisture. If it gets wet, gently blot with a soft dry cloth and let it dry naturally away from heaters and direct sun.",
        ],
      },
      {
        image: "/materials-care/white_intrecciato_leather_macro.webp",
        alt: "Intrecciato woven leather SÓRA",
        title: "Intreccio leather",
        paragraphs: [
          "Natural leather and intreccio weaving keep their grain, softness and shade. Small variations are a sign of a living material, not a defect.",
          "Do not machine-wash or soak bags. Clean with a soft cloth and leather care products; test on a hidden area first.",
        ],
      },
      {
        image: "/materials-care/blue_white_silk_scarf.webp",
        alt: "Silk foulard SÓRA",
        title: "Silk / Foulard",
        paragraphs: [
          "SÓRA silk scarves add a light accent to a bag or look. Store them away from direct sun to keep the print vivid.",
          "Prefer gentle dry cleaning or hand wash in cool water with silk detergent. Do not wring; dry flat.",
        ],
      },
      {
        image: "/materials-care/minimal_flatlay_sandstone.webp",
        alt: "SÓRA materials care",
        title: "Care and storage",
        paragraphs: [
          "Before long-term storage, clean and fully dry the piece. Fill the bag with soft paper and keep it in a fabric dust bag.",
          "Avoid plastic bags for long storage. Store detachable straps inside the bag. Leather water-repellent sprays may be used when needed.",
        ],
      },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "Can I get a raffia or leather bag wet?",
        a: "No — leather and raffia pieces should not be exposed to moisture. If wet, blot with a dry cloth and let dry naturally.",
      },
      {
        q: "How do I clean a leather bag?",
        a: "Use a soft cloth and leather care products. Test on a hidden area first, then wipe dry.",
      },
      {
        q: "How should I store my bag?",
        a: "In a fabric dust bag, filled with soft paper to keep the shape, away from direct sun, high humidity and plastic bags.",
      },
    ],
    whatsappLabel: "Write on WhatsApp",
  },
};

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#2b2b2b]/15 border-y border-[#2b2b2b]/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[14px] font-medium uppercase tracking-[0.08em] text-[#2b2b2b]">
                {item.q}
              </span>
              <span
                className={
                  "shrink-0 text-lg leading-none text-[#2b2b2b]/70 transition " +
                  (isOpen ? "rotate-45" : "")
                }
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen ? (
              <p className="pb-5 text-[14px] leading-[1.8] text-[#2b2b2b]/85">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function MaterialsCarePageContent({ locale = "ru" }: { locale?: Locale }) {
  const c = copy[locale] ?? copy.ru;

  return (
    <div className="bg-[#FAF8F5] text-[#2b2b2b]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <Breadcrumbs items={[{ label: c.title }]} />

        <h1 className="mt-8 text-center text-[28px] font-normal uppercase tracking-[0.15em] sm:text-[32px]">
          {c.title}
        </h1>

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {c.blocks.map((block, index) => {
            const imageLeft = index % 2 === 0;
            return (
              <section
                key={block.title}
                className={
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-14 " +
                  (imageLeft ? "" : "lg:[&>*:first-child]:order-2")
                }
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#efebe4]">
                  <Image
                    src={block.image}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <div>
                  <h2 className="text-[22px] font-normal uppercase tracking-[0.15em] sm:text-[24px]">
                    {block.title}
                  </h2>
                  {block.paragraphs.map((p) => (
                    <p key={p} className="mt-4 text-[14px] leading-[1.8] text-[#2b2b2b]/90">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-20 lg:mt-28">
          <h2 className="mb-8 text-center text-[22px] font-normal uppercase tracking-[0.15em] sm:text-[24px]">
            {c.faqTitle}
          </h2>
          <FaqAccordion items={[...c.faq]} />

          <div className="mt-10 flex justify-center">
            <a
              href={brand.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-[#2b2b2b] px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-black"
            >
              {c.whatsappLabel}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
