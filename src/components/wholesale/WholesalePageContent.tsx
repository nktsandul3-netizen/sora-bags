import Link from "next/link";
import { withLocalePath, type Locale } from "@/lib/i18n";

function InfoCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-[20px] bg-white p-7 shadow-[0_4px_24px_rgba(28,25,23,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(28,25,23,0.1)] sm:p-8 ${className}`}
    >
      {title ? (
        <h2 className="font-serif text-xl text-stone-950 sm:text-[1.35rem]">{title}</h2>
      ) : null}
      <div className={`space-y-4 text-[15px] leading-[1.75] text-stone-600 ${title ? "mt-5" : ""}`}>
        {children}
      </div>
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-stone-400"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const copy = {
  ru: {
    title: "Оптовым покупателям",
    intro: [
      "SÓRA Bags приглашает к сотрудничеству магазины, бутики, шоурумы, интернет-магазины и предпринимателей, заинтересованных в продаже стильных и востребованных сумок и аксессуаров.",
      "В нашем ассортименте представлены современные модели сумок, кошельков и аксессуаров, созданные с учётом актуальных модных тенденций и потребностей покупателей. Мы уделяем особое внимание качеству материалов, дизайну изделий и контролю производства, чтобы предлагать продукцию, соответствующую высоким стандартам рынка.",
    ],
    benefitsTitle: "Преимущества сотрудничества с нами",
    benefits: ["широкий ассортимент популярных моделей;", "регулярное обновление коллекций;", "конкурентные оптовые цены;", "гибкая система скидок в зависимости от объёма закупок;", "помощь в подборе ассортимента под вашу целевую аудиторию;", "оперативная обработка заказов;", "доставка по всей территории Республики Молдова;", "персональное сопровождение менеджером."],
    individualTitle: "Индивидуальный подход",
    individual: ["Мы понимаем, что каждый бизнес имеет свои особенности, поэтому готовы предложить индивидуальные условия сотрудничества, специальные предложения для постоянных клиентов и помощь в формировании наиболее эффективного ассортимента.", "Наша цель — выстроить долгосрочные и взаимовыгодные партнёрские отношения, основанные на доверии, качестве продукции и высоком уровне сервиса."],
    ctaTitle: "Как начать сотрудничество",
    ctaText: "Для получения актуального оптового прайс-листа, минимальных объёмов заказа и индивидуального коммерческого предложения свяжитесь с нами любым удобным способом через раздел",
    contacts: "«Контакты»",
    ctaNote: "Наши специалисты ответят на все вопросы и помогут подобрать оптимальные условия сотрудничества для вашего бизнеса.",
  },
  ro: {
    title: "Comenzi en-gros",
    intro: [
      "SÓRA Bags invită la colaborare magazine, boutique-uri, showroom-uri, magazine online și antreprenori interesați de genți și accesorii elegante, ușor de vândut.",
      "Sortimentul include modele moderne de genți, portofele și accesorii, selectate după tendințe actuale și nevoile cumpărătorilor. Acordăm atenție materialelor, designului și controlului calității.",
    ],
    benefitsTitle: "Avantajele colaborării cu noi",
    benefits: ["sortiment larg de modele populare;", "actualizarea regulată a colecțiilor;", "prețuri en-gros competitive;", "sistem flexibil de reduceri în funcție de volum;", "ajutor în alegerea sortimentului pentru publicul dvs.;", "procesarea rapidă a comenzilor;", "livrare pe întreg teritoriul Republicii Moldova;", "suport personal din partea managerului."],
    individualTitle: "Abordare individuală",
    individual: ["Înțelegem că fiecare afacere are specificul său, de aceea putem propune condiții individuale, oferte speciale pentru clienții permanenți și suport în formarea sortimentului.", "Scopul nostru este să construim parteneriate pe termen lung, bazate pe încredere, calitatea produselor și servicii atente."],
    ctaTitle: "Cum începem colaborarea",
    ctaText: "Pentru lista actuală de prețuri en-gros, volume minime și ofertă comercială individuală, contactați-ne prin secțiunea",
    contacts: "Contacte",
    ctaNote: "Specialiștii noștri vor răspunde la întrebări și vă vor ajuta să alegeți condițiile potrivite pentru afacerea dvs.",
  },
  en: {
    title: "Wholesale orders",
    intro: [
      "SÓRA Bags welcomes stores, boutiques, showrooms, online shops and entrepreneurs interested in selling stylish, in-demand bags and accessories.",
      "Our assortment includes modern bags, wallets and accessories selected around current trends and customer needs. We pay close attention to materials, product design and quality control.",
    ],
    benefitsTitle: "Benefits of working with us",
    benefits: ["wide assortment of popular models;", "regular collection updates;", "competitive wholesale prices;", "flexible discounts depending on volume;", "assortment support for your target audience;", "fast order processing;", "delivery across Moldova;", "personal manager support."],
    individualTitle: "Individual approach",
    individual: ["Every business is different, so we can offer tailored cooperation terms, special offers for regular clients and help building an effective assortment.", "Our goal is long-term, mutually beneficial partnerships built on trust, product quality and attentive service."],
    ctaTitle: "How to start cooperation",
    ctaText: "For the current wholesale price list, minimum order volumes and an individual commercial offer, contact us through the",
    contacts: "Contacts",
    ctaNote: "Our specialists will answer your questions and help choose the best cooperation terms for your business.",
  },
};

export default function WholesalePageContent({ locale = "ru" }: { locale?: Locale }) {
  const c = copy[locale];
  return (
    <>
      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
        <section className="py-14 sm:py-16 lg:py-20">
          <h1 className="mb-10 font-serif text-3xl text-stone-950 sm:text-4xl">
            {c.title}
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard className="sm:col-span-2">
              <p>
                {c.intro[0]}
              </p>
              <p>
                {c.intro[1]}
              </p>
            </InfoCard>

            <InfoCard title={c.benefitsTitle}>
              <BulletList
                items={c.benefits}
              />
            </InfoCard>

            <InfoCard title={c.individualTitle}>
              {c.individual.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">
            {c.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.75] text-stone-400 sm:text-[15px]">
            {c.ctaText}{" "}
            <Link
              href={withLocalePath("/contacts", locale)}
              className="text-white underline-offset-4 transition hover:underline"
            >
              {c.contacts}
            </Link>
            .
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.75] text-stone-500 sm:text-[15px]">
            {c.ctaNote}
          </p>
        </section>
      </div>
    </>
  );
}
