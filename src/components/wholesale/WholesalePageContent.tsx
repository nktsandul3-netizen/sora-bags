import Link from "next/link";

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

export default function WholesalePageContent() {
  return (
    <>
      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
        <section className="py-14 sm:py-16 lg:py-20">
          <h1 className="mb-10 font-serif text-3xl text-stone-950 sm:text-4xl">
            Оптовым покупателям
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard className="sm:col-span-2">
              <p>
                SÓRA Bags приглашает к сотрудничеству магазины, бутики, шоурумы,
                интернет-магазины и предпринимателей, заинтересованных в продаже
                стильных и востребованных сумок и аксессуаров.
              </p>
              <p>
                В нашем ассортименте представлены современные модели сумок, кошельков и
                аксессуаров, созданные с учётом актуальных модных тенденций и
                потребностей покупателей. Мы уделяем особое внимание качеству материалов,
                дизайну изделий и контролю производства, чтобы предлагать продукцию,
                соответствующую высоким стандартам рынка.
              </p>
            </InfoCard>

            <InfoCard title="Преимущества сотрудничества с нами">
              <BulletList
                items={[
                  "широкий ассортимент популярных моделей;",
                  "регулярное обновление коллекций;",
                  "конкурентные оптовые цены;",
                  "гибкая система скидок в зависимости от объёма закупок;",
                  "помощь в подборе ассортимента под вашу целевую аудиторию;",
                  "оперативная обработка заказов;",
                  "доставка по всей территории Республики Молдова;",
                  "персональное сопровождение менеджером.",
                ]}
              />
            </InfoCard>

            <InfoCard title="Индивидуальный подход">
              <p>
                Мы понимаем, что каждый бизнес имеет свои особенности, поэтому готовы
                предложить индивидуальные условия сотрудничества, специальные предложения
                для постоянных клиентов и помощь в формировании наиболее эффективного
                ассортимента.
              </p>
              <p>
                Наша цель — выстроить долгосрочные и взаимовыгодные партнёрские
                отношения, основанные на доверии, качестве продукции и высоком уровне
                сервиса.
              </p>
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">
            Как начать сотрудничество
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.75] text-stone-400 sm:text-[15px]">
            Для получения актуального оптового прайс-листа, минимальных объёмов заказа
            и индивидуального коммерческого предложения свяжитесь с нами любым удобным
            способом через раздел{" "}
            <Link
              href="/contacts"
              className="text-white underline-offset-4 transition hover:underline"
            >
              «Контакты»
            </Link>
            .
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.75] text-stone-500 sm:text-[15px]">
            Наши специалисты ответят на все вопросы и помогут подобрать оптимальные
            условия сотрудничества для вашего бизнеса.
          </p>
        </section>
      </div>
    </>
  );
}
