const phone = "+373 68 935 619";
const phoneHref = "tel:+37368935619";

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

export default function ReturnPageContent() {
  return (
    <>
      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
        <section className="py-14 sm:py-16 lg:py-20">
          <h1 className="mb-10 font-serif text-3xl text-stone-950 sm:text-4xl">
            Обмен и возврат товара
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard title="Обмен и возврат товара надлежащего качества">
              <p>
                Покупатель имеет право обменять или вернуть товар надлежащего качества в
                течение 14 календарных дней с момента получения заказа при соблюдении
                следующих условий:
              </p>
              <BulletList
                items={[
                  "товар не был в использовании;",
                  "сохранён товарный вид и потребительские свойства;",
                  "отсутствуют повреждения, следы носки и эксплуатации;",
                  "сохранены оригинальная упаковка, ярлыки, бирки и комплектующие.",
                ]}
              />
              <p>В случае возврата товара надлежащего качества покупатель может:</p>
              <BulletList
                items={[
                  "обменять товар на другую модель, цвет или размер (при наличии);",
                  "выбрать другой товар с перерасчётом стоимости;",
                  "получить возврат денежных средств.",
                ]}
              />
              <p>
                Расходы по доставке товара надлежащего качества при возврате или обмене
                оплачиваются покупателем.
              </p>
            </InfoCard>

            <InfoCard title="Обмен и возврат товара ненадлежащего качества">
              <p>
                Если в приобретённом товаре обнаружен производственный дефект или брак,
                покупатель имеет право:
              </p>
              <BulletList
                items={[
                  "потребовать замену товара на аналогичный;",
                  "обменять товар на другую модель с перерасчётом стоимости;",
                  "получить полный возврат денежных средств.",
                ]}
              />
              <p>
                О факте обнаружения дефекта необходимо сообщить магазину в течение 14
                календарных дней с момента его выявления.
              </p>
              <p>
                При необходимости магазин вправе провести проверку качества или экспертизу
                товара. В таком случае срок рассмотрения заявки на обмен или возврат может
                составлять до 30 календарных дней.
              </p>
              <p>
                Доставка товара ненадлежащего качества осуществляется за счёт магазина SÓRA
                Bags.
              </p>
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">Контактная информация</h2>
          <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">
            По вопросам обмена и возврата обращайтесь:
          </p>
          <div className="mt-6">
            <p className="text-sm text-stone-400 sm:text-[15px]">
              Телефон:{" "}
              <a
                href={phoneHref}
                className="font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl"
              >
                {phone}
              </a>
            </p>
          </div>
          <p className="mt-6 text-sm text-stone-400 sm:text-[15px]">
            Наши специалисты помогут оперативно решить возникший вопрос.
          </p>
        </section>
      </div>
    </>
  );
}
