import Image from "next/image";

const phone = "+373 68 935 619";
const phoneHref = "tel:+37368935619";
const email = "info@sorabags.md";
const heroImage = "/warranty-banner-v3.png";

function InfoCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-[20px] bg-white p-7 shadow-[0_4px_24px_rgba(28,25,23,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(28,25,23,0.1)] sm:p-8 ${className}`}
    >
      <h2 className="font-serif text-xl text-stone-950 sm:text-[1.35rem]">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-[1.75] text-stone-600">{children}</div>
    </article>
  );
}

function CardSubheading({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-950 first:pt-0">
      {children}
    </p>
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

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-[11px] font-semibold text-stone-700"
            aria-hidden
          >
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function EditorialImage({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: `${number}/${number}`;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[20px] bg-stone-100"
      style={{ aspectRatio: aspect.replace("/", " / ") }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={88}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

export default function WarrantyPageContent() {
  return (
    <>
      <section className="relative h-[clamp(250px,44vw,580px)] w-full overflow-hidden bg-stone-100">
        <Image
          src={heroImage}
          alt="Гарантия и уход — SÓRA Bags"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"
          aria-hidden
        />
      </section>

      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
        <h1 className="sr-only">Гарантия и уход</h1>
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard title="Гарантия" className="sm:col-span-2">
              <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                <div className="space-y-4">
                  <p className="font-medium text-stone-950">
                    На все изделия SÓRA Bags предоставляется гарантия сроком 30
                    календарных дней с момента покупки.
                  </p>
                  <p>
                    Гарантия распространяется исключительно на производственные
                    дефекты, выявленные при соблюдении правил эксплуатации и ухода
                    за изделием.
                  </p>
                  <p>
                    Гарантийный срок начинает исчисляться со дня передачи товара
                    покупателю.
                  </p>
                  <p>
                    Если в течение гарантийного срока вы обнаружили дефект,
                    свяжитесь с нами любым удобным способом. Рассмотрение обращения
                    занимает до 10 рабочих дней с момента получения изделия и всей
                    необходимой информации.
                  </p>
                </div>
                <div className="space-y-4">
                  <CardSubheading>Возможные решения</CardSubheading>
                  <p>
                    По результатам проверки может быть принято одно из следующих
                    решений:
                  </p>
                  <NumberedList
                    items={[
                      "Возврат денежных средств",
                      "Бесплатный ремонт по согласованию сторон",
                      "Проведение независимой экспертизы качества изделия",
                    ]}
                  />
                  <p className="text-[13px] leading-[1.6] text-stone-500">
                    В случае подтверждения производственного брака покупателю
                    возвращается полная стоимость товара либо производится его
                    замена. Если производственный дефект не подтверждается, изделие
                    возвращается покупателю без ремонта, а расходы на проведение
                    экспертизы оплачиваются покупателем.
                  </p>
                </div>
              </div>
            </InfoCard>

            <InfoCard title="Гарантия не распространяется на">
              <BulletList
                items={[
                  "Естественные следы эксплуатации",
                  "Мелкие царапины, потертости и складки кожи",
                  "Разрывы подкладки вне заводских швов",
                  "Изменение цвета замши вследствие воздействия влаги",
                  "Потерю съёмной фурнитуры, закреплённой винтовыми соединениями",
                  "Окрашивание изделия от одежды или других материалов",
                  "Естественный износ изделия в процессе использования",
                ]}
              />
            </InfoCard>

            <InfoCard title="Гарантия не действует в случаях">
              <BulletList
                items={[
                  "Нарушения правил эксплуатации и хранения",
                  "Механических повреждений",
                  "Воздействия химических веществ",
                  "Самостоятельного ремонта или модификации изделия",
                  "Использования товара не по назначению",
                  "Превышения допустимой нагрузки на изделие",
                ]}
              />
            </InfoCard>

            <div className="grid items-start gap-6 sm:col-span-2 sm:grid-cols-[782fr_667fr] sm:gap-7 lg:gap-8">
              <EditorialImage
                src="/warranty-craft-banner.png"
                alt="Инструменты мастера — SÓRA Bags"
                aspect="645/825"
              />
              <EditorialImage
                src="/warranty-artisan-banner.png"
                alt="Ручная работа с кожей — SÓRA Bags"
                aspect="683/1024"
              />
            </div>

            <InfoCard title="Уход и хранение" className="sm:col-span-2">
              <p>
                Для сохранения внешнего вида и долговечности изделия рекомендуем
                соблюдать следующие правила ухода.
              </p>
              <div className="grid gap-x-10 gap-y-5 pt-1 md:grid-cols-2">
                <div>
                  <CardSubheading>Уход</CardSubheading>
                  <div className="mt-3">
                    <BulletList
                      items={[
                        "Изделия из натуральной и экокожи не рекомендуется подвергать воздействию влаги.",
                        "Не стирайте сумки в стиральной машине и не замачивайте их в воде.",
                        "При намокании аккуратно промокните изделие мягкой сухой тканью и оставьте сушиться естественным образом вдали от отопительных приборов и прямых солнечных лучей.",
                        "Для удаления загрязнений используйте мягкую ткань и специальные средства для ухода за кожей.",
                        "После чистки обязательно протрите изделие насухо.",
                        "Для дополнительной защиты допускается использование водоотталкивающих средств, предназначенных для кожаных изделий.",
                        "Перед применением любого средства рекомендуется протестировать его на незаметном участке изделия.",
                      ]}
                    />
                  </div>
                </div>
                <div>
                  <CardSubheading>Хранение</CardSubheading>
                  <div className="mt-3">
                    <BulletList
                      items={[
                        "Перед длительным хранением очистите и полностью высушите изделие.",
                        "Для сохранения формы наполните сумку мягкой бумагой или другим наполнителем.",
                        "Храните изделие в тканевом пыльнике.",
                        "Не используйте полиэтиленовые пакеты для длительного хранения.",
                        "Избегайте воздействия прямых солнечных лучей и повышенной влажности.",
                        "Съёмные ремни рекомендуется хранить внутри сумки.",
                      ]}
                    />
                  </div>
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl text-white sm:text-3xl">
              Гарантийное обращение
            </h2>
            <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">
              Если вы считаете, что ваш случай подпадает под гарантию, свяжитесь с
              нами:
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
              <a
                href={phoneHref}
                className="font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl"
              >
                {email}
              </a>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl border-t border-white/10 pt-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-stone-300">
              В обращении укажите
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Номер заказа",
                "Дату покупки",
                "Описание проблемы",
                "Фотографии изделия и выявленного дефекта с разных ракурсов",
              ].map((item, i) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/5 px-4 py-5 text-center"
                >
                  <span className="font-serif text-lg text-stone-400" aria-hidden>
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-[13px] leading-[1.6] text-stone-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[13px] leading-[1.6] text-stone-500">
              После получения обращения специалист SÓRA Bags свяжется с вами и
              предоставит дальнейшие инструкции.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
