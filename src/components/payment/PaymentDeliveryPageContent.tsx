import Image from "next/image";

const phone = "+373 68 935 619";
const phoneHref = "tel:+37368935619";
const heroImage = "/payment-delivery-banner-v5.png";

function PayVisa() {
  return (
    <span className="inline-flex h-9 min-w-[3.25rem] items-center justify-center rounded-lg border border-stone-200 bg-white px-3 shadow-sm">
      <span className="text-sm font-bold italic tracking-tight text-[#1a1f71]">VISA</span>
    </span>
  );
}

function PayMastercard() {
  return (
    <span className="inline-flex h-9 min-w-[3.25rem] items-center justify-center rounded-lg border border-stone-200 bg-white px-2 shadow-sm">
      <svg viewBox="0 0 36 22" className="h-4 w-auto" aria-hidden="true">
        <circle cx="14" cy="11" r="7" fill="#EB001B" />
        <circle cx="22" cy="11" r="7" fill="#F79E1B" fillOpacity="0.9" />
        <path d="M18 5.5a7 7 0 0 1 0 11 7 7 0 0 1 0-11Z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function PayApple() {
  return (
    <span className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-stone-200 bg-white px-3 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-stone-900" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.7 12.8c0 2.4 2.1 3.2 2.1 3.2s-1.6 4.7-4.2 4.7c-1.1 0-1.9-.7-3-.7s-2 .7-3.1.7c-2.4 0-4.3-4.5-4.3-8.1 0-3.5 2.2-5.4 4.2-5.4 1.1 0 2 .8 3 .8s2.1-.9 3.5-.9c.6 0 2.8.1 4.1 2.1-.1 0-2.5 1.5-2.5 4.6Z"
        />
        <path
          fill="currentColor"
          d="M14.2 4.2c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.4 1.8-.7.9-1.4 2.3-1.2 3.7 1.3.1 2.7-.7 3.4-1.7Z"
        />
      </svg>
      <span className="text-sm font-medium text-stone-900">Pay</span>
    </span>
  );
}

function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <PayVisa />
      <PayMastercard />
      <PayApple />
    </div>
  );
}

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

function StatusBadge({
  tone,
  children,
}: {
  tone: "available" | "preorder";
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3.5 py-1.5 text-[13px] font-medium text-stone-700">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "available" ? "bg-emerald-500" : "bg-amber-500"
        }`}
        aria-hidden
      />
      {children}
    </span>
  );
}

function PriceRow({ term, price }: { term: string; price: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-stone-200/70 py-2.5 last:border-0">
      <span className="text-stone-600">{term}</span>
      <span className="whitespace-nowrap font-medium text-stone-950">{price}</span>
    </div>
  );
}

function DeliveryTile({
  title,
  children,
  note,
}: {
  title: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-stone-50 p-6">
      <h3 className="font-serif text-lg text-stone-950">{title}</h3>
      <div className="mt-3">{children}</div>
      {note ? <p className="mt-auto pt-3 text-[13px] leading-[1.6] text-stone-500">{note}</p> : null}
    </div>
  );
}

export default function PaymentDeliveryPageContent() {
  return (
    <>
      <section className="relative h-[clamp(250px,44vw,580px)] w-full overflow-hidden bg-stone-100">
        <Image
          src={heroImage}
          alt="Способы оплаты и доставки — SÓRA Bags"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_58%]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"
          aria-hidden
        />
      </section>

      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
        <h1 className="sr-only">Способы оплаты и доставки</h1>
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard title="Оформление заказа">
              <p>Вы можете оформить заказ одним из следующих способов:</p>

              <CardSubheading>По телефону</CardSubheading>
              <p>
                Свяжитесь с нами по номеру{" "}
                <a
                  href={phoneHref}
                  className="whitespace-nowrap font-medium text-stone-950 underline-offset-2 hover:underline"
                >
                  {phone}
                </a>
                , и наш менеджер поможет оформить заказ.
              </p>

              <CardSubheading>Через сайт</CardSubheading>
              <NumberedList
                items={[
                  "Добавьте понравившиеся товары в корзину.",
                  "Перейдите в раздел «Корзина».",
                  "Нажмите кнопку «Оформить заказ».",
                  "Заполните необходимые данные для доставки.",
                  "Подтвердите заказ.",
                ]}
              />
              <p className="text-[13px] leading-[1.6] text-stone-500">
                После оформления заказа наш менеджер свяжется с вами для подтверждения
                заказа и уточнения деталей доставки.
              </p>
            </InfoCard>

            <InfoCard title="Наличие товара">
              <p>В интернет-магазине SÓRA представлены товары двух категорий:</p>

              <CardSubheading>Товары в наличии</CardSubheading>
              <p>
                Товары со статусом «В наличии» доступны для немедленной отправки и
                доставляются в стандартные сроки.
              </p>

              <CardSubheading>Товары под заказ</CardSubheading>
              <p>
                Некоторые модели доступны только под заказ. Срок доставки таких товаров
                составляет от 7 до 14 календарных дней.
              </p>

              <p>Статус товара указывается на странице каждого изделия:</p>
              <div className="flex flex-wrap gap-2.5">
                <StatusBadge tone="available">В наличии</StatusBadge>
                <StatusBadge tone="preorder">Под заказ (7–14 дней)</StatusBadge>
              </div>

              <p className="text-[13px] leading-[1.6] text-stone-500">
                После оформления заказа менеджер SÓRA свяжется с вами для подтверждения
                наличия товара и уточнения сроков доставки.
              </p>
            </InfoCard>

            <InfoCard title="Доставка" className="sm:col-span-2">
              <p>
                Мы осуществляем доставку по городу Кишинёв и по всей территории
                Республики Молдова.
              </p>

              <div className="grid gap-x-10 gap-y-4 pt-1 md:grid-cols-2">
                <div>
                  <CardSubheading>График обработки заказов</CardSubheading>
                  <p className="mt-2 font-medium text-stone-950">Понедельник – Пятница</p>
                  <p className="mt-1 text-[14px] text-stone-600">
                    Заказы, оформленные после 14:00, обрабатываются на следующий рабочий
                    день.
                  </p>
                </div>
                <div>
                  <CardSubheading>Для доставки необходимо указать</CardSubheading>
                  <ul className="mt-2 space-y-1.5">
                    {["Имя получателя", "Контактный номер телефона", "Адрес доставки"].map(
                      (item) => (
                        <li key={item} className="flex gap-2">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone-400"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 pt-2 md:grid-cols-3 md:gap-5">
                <DeliveryTile
                  title="Кишинёв"
                  note="Экспресс-доставка осуществляется по согласованию с курьерской службой."
                >
                  <PriceRow term="12–24 часа" price="60 леев" />
                  <PriceRow term="1–3 часа (экспресс)" price="84 лея" />
                </DeliveryTile>

                <DeliveryTile
                  title="Молдова"
                  note="После оформления заказа с вами свяжется курьер для подтверждения деталей доставки."
                >
                  <PriceRow term="1–3 рабочих дня" price="100 леев" />
                </DeliveryTile>

                <DeliveryTile
                  title="Под заказ"
                  note="Точный срок доставки сообщается менеджером после подтверждения заказа."
                >
                  <PriceRow term="Срок доставки" price="7–14 дней" />
                </DeliveryTile>
              </div>
            </InfoCard>

            <InfoCard title="Способы оплаты" className="sm:col-span-2">
              <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
                <div>
                  <CardSubheading>Наличными при получении</CardSubheading>
                  <p className="mt-2">
                    Оплата производится курьеру после проверки товара.
                  </p>
                </div>
                <div>
                  <CardSubheading>Банковской картой</CardSubheading>
                  <p className="mt-2">
                    Безопасная онлайн-оплата на сайте. После успешной оплаты на вашу
                    электронную почту будет отправлено подтверждение заказа.
                  </p>
                  <PaymentIcons className="mt-4" />
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">Остались вопросы?</h2>
          <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">
            Мы будем рады помочь вам с выбором и оформлением заказа
          </p>
          <a
            href={phoneHref}
            className="mt-6 inline-block font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl"
          >
            {phone}
          </a>
        </section>
      </div>
    </>
  );
}
