import Image from "next/image";
import { brand } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

const phone = brand.phones[0];
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
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

const copy = {
  ru: {
    alt: "Способы оплаты и доставки — SÓRA Bags",
    srTitle: "Способы оплаты и доставки",
    orderTitle: "Оформление заказа",
    orderIntro: "Вы можете оформить заказ одним из следующих способов:",
    byPhone: "По телефону",
    phoneText: "Свяжитесь с нами по номеру",
    phoneTail: "и наш менеджер поможет оформить заказ.",
    viaSite: "Через сайт",
    steps: ["Добавьте понравившиеся товары в корзину.", "Перейдите в раздел «Корзина».", "Нажмите кнопку «Оформить заказ».", "Заполните необходимые данные для доставки.", "Подтвердите заказ."],
    orderNote: "После оформления заказа наш менеджер свяжется с вами для подтверждения заказа и уточнения деталей доставки.",
    stockTitle: "Наличие товара",
    stockIntro: "В интернет-магазине SÓRA представлены товары двух категорий:",
    inStockTitle: "Товары в наличии",
    inStockText: "Товары со статусом «В наличии» доступны для немедленной отправки и доставляются в стандартные сроки.",
    preorderTitle: "Товары под заказ",
    preorderText: "Некоторые модели доступны только под заказ. Срок доставки таких товаров составляет от 7 до 14 календарных дней.",
    statusText: "Статус товара указывается на странице каждого изделия:",
    available: "В наличии",
    preorderBadge: "Под заказ (7–14 дней)",
    stockNote: "После оформления заказа менеджер SÓRA свяжется с вами для подтверждения наличия товара и уточнения сроков доставки.",
    deliveryTitle: "Доставка",
    deliveryIntro: "Мы осуществляем доставку по городу Кишинёв и по всей территории Республики Молдова.",
    schedule: "График обработки заказов",
    weekdays: "Понедельник – Пятница",
    scheduleNote: "Заказы, оформленные после 14:00, обрабатываются на следующий рабочий день.",
    needed: "Для доставки необходимо указать",
    neededItems: ["Имя получателя", "Контактный номер телефона", "Адрес доставки"],
    chisinau: "Кишинёв",
    chisinauNote: "Экспресс-доставка осуществляется по согласованию с курьерской службой.",
    moldova: "Молдова",
    moldovaNote: "После оформления заказа с вами свяжется курьер для подтверждения деталей доставки.",
    preorder: "Под заказ",
    preorderNote: "Точный срок доставки сообщается менеджером после подтверждения заказа.",
    t12: "12–24 часа",
    express: "1–3 часа (экспресс)",
    days13: "1–3 рабочих дня",
    deliveryTime: "Срок доставки",
    days714: "7–14 дней",
    paymentTitle: "Способы оплаты",
    cash: "Наличными при получении",
    cashText: "Оплата производится курьеру после проверки товара.",
    card: "Банковской картой",
    cardText: "Безопасная онлайн-оплата на сайте. После успешной оплаты на вашу электронную почту будет отправлено подтверждение заказа.",
    questions: "Остались вопросы?",
    questionsText: "Мы будем рады помочь вам с выбором и оформлением заказа",
  },
  ro: {
    alt: "Metode de plată și livrare — SÓRA Bags",
    srTitle: "Metode de plată și livrare",
    orderTitle: "Plasarea comenzii",
    orderIntro: "Puteți plasa comanda prin una dintre metodele următoare:",
    byPhone: "Prin telefon",
    phoneText: "Contactați-ne la numărul",
    phoneTail: "iar managerul nostru vă ajută să plasați comanda.",
    viaSite: "Prin site",
    steps: ["Adăugați produsele preferate în coș.", "Accesați secțiunea „Coș”.", "Apăsați „Plasează comanda”.", "Completați datele necesare pentru livrare.", "Confirmați comanda."],
    orderNote: "După plasarea comenzii, managerul vă contactează pentru confirmare și detalii de livrare.",
    stockTitle: "Disponibilitatea produselor",
    stockIntro: "În magazinul online SÓRA există două tipuri de produse:",
    inStockTitle: "Produse în stoc",
    inStockText: "Produsele cu statusul „În stoc” sunt disponibile pentru expediere imediată și se livrează în termenul standard.",
    preorderTitle: "Produse la comandă",
    preorderText: "Unele modele sunt disponibile doar la comandă. Termenul de livrare este de 7–14 zile calendaristice.",
    statusText: "Statusul este indicat pe pagina fiecărui produs:",
    available: "În stoc",
    preorderBadge: "La comandă (7–14 zile)",
    stockNote: "După plasarea comenzii, managerul SÓRA confirmă disponibilitatea și termenul de livrare.",
    deliveryTitle: "Livrare",
    deliveryIntro: "Livrăm în Chișinău și pe întreg teritoriul Republicii Moldova.",
    schedule: "Program de procesare",
    weekdays: "Luni – Vineri",
    scheduleNote: "Comenzile plasate după ora 14:00 sunt procesate în următoarea zi lucrătoare.",
    needed: "Pentru livrare trebuie indicate",
    neededItems: ["Numele destinatarului", "Numărul de telefon", "Adresa de livrare"],
    chisinau: "Chișinău",
    chisinauNote: "Livrarea expres se stabilește de comun acord cu serviciul de curierat.",
    moldova: "Moldova",
    moldovaNote: "După plasarea comenzii, curierul vă contactează pentru confirmarea detaliilor.",
    preorder: "La comandă",
    preorderNote: "Termenul exact este comunicat de manager după confirmarea comenzii.",
    t12: "12–24 ore",
    express: "1–3 ore (expres)",
    days13: "1–3 zile lucrătoare",
    deliveryTime: "Termen de livrare",
    days714: "7–14 zile",
    paymentTitle: "Metode de plată",
    cash: "Numerar la primire",
    cashText: "Plata se face curierului după verificarea produsului.",
    card: "Card bancar",
    cardText: "Plată online sigură pe site. După achitare primiți confirmarea comenzii pe email.",
    questions: "Aveți întrebări?",
    questionsText: "Vă ajutăm cu drag să alegeți și să plasați comanda",
  },
  en: {
    alt: "Payment and delivery methods — SÓRA Bags",
    srTitle: "Payment and delivery methods",
    orderTitle: "Placing an order",
    orderIntro: "You can place an order in one of the following ways:",
    byPhone: "By phone",
    phoneText: "Contact us at",
    phoneTail: "and our manager will help place the order.",
    viaSite: "Through the website",
    steps: ["Add the items you like to your cart.", "Go to the Cart section.", "Click “Place order”.", "Fill in the delivery details.", "Confirm the order."],
    orderNote: "After the order is placed, our manager will contact you to confirm it and clarify delivery details.",
    stockTitle: "Product availability",
    stockIntro: "The SÓRA online store has two product categories:",
    inStockTitle: "In-stock items",
    inStockText: "Items marked “In stock” are available for immediate shipment and delivered within the standard timeframe.",
    preorderTitle: "Pre-order items",
    preorderText: "Some models are available only by pre-order. Delivery time is 7–14 calendar days.",
    statusText: "Product status is shown on each product page:",
    available: "In stock",
    preorderBadge: "Pre-order (7–14 days)",
    stockNote: "After ordering, a SÓRA manager will confirm availability and delivery timing.",
    deliveryTitle: "Delivery",
    deliveryIntro: "We deliver in Chișinău and across the Republic of Moldova.",
    schedule: "Order processing schedule",
    weekdays: "Monday – Friday",
    scheduleNote: "Orders placed after 14:00 are processed on the next business day.",
    needed: "For delivery, please provide",
    neededItems: ["Recipient name", "Contact phone number", "Delivery address"],
    chisinau: "Chișinău",
    chisinauNote: "Express delivery is arranged with the courier service.",
    moldova: "Moldova",
    moldovaNote: "After ordering, the courier will contact you to confirm delivery details.",
    preorder: "Pre-order",
    preorderNote: "Exact delivery time is provided by the manager after order confirmation.",
    t12: "12–24 hours",
    express: "1–3 hours (express)",
    days13: "1–3 business days",
    deliveryTime: "Delivery time",
    days714: "7–14 days",
    paymentTitle: "Payment methods",
    cash: "Cash on delivery",
    cashText: "Payment is made to the courier after checking the item.",
    card: "Bank card",
    cardText: "Secure online payment on the website. After successful payment, order confirmation is sent to your email.",
    questions: "Still have questions?",
    questionsText: "We will be happy to help you choose and place an order",
  },
};

export default function PaymentDeliveryPageContent({ locale = "ru" }: { locale?: Locale }) {
  const c = copy[locale];
  return (
    <>
      <section className="relative h-[clamp(250px,44vw,580px)] w-full overflow-hidden bg-stone-100">
        <Image
          src={heroImage}
          alt={c.alt}
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
        <h1 className="sr-only">{c.srTitle}</h1>
        <section className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard title={c.orderTitle}>
              <p>{c.orderIntro}</p>

              <CardSubheading>{c.byPhone}</CardSubheading>
              <p>
                {c.phoneText}{" "}
                <a
                  href={phoneHref}
                  className="whitespace-nowrap font-medium text-stone-950 underline-offset-2 hover:underline"
                >
                  {phone}
                </a>
                , {c.phoneTail}
              </p>

              <CardSubheading>{c.viaSite}</CardSubheading>
              <NumberedList items={c.steps} />
              <p className="text-[13px] leading-[1.6] text-stone-500">
                {c.orderNote}
              </p>
            </InfoCard>

            <InfoCard title={c.stockTitle}>
              <p>{c.stockIntro}</p>

              <CardSubheading>{c.inStockTitle}</CardSubheading>
              <p>
                {c.inStockText}
              </p>

              <CardSubheading>{c.preorderTitle}</CardSubheading>
              <p>
                {c.preorderText}
              </p>

              <p>{c.statusText}</p>
              <div className="flex flex-wrap gap-2.5">
                <StatusBadge tone="available">{c.available}</StatusBadge>
                <StatusBadge tone="preorder">{c.preorderBadge}</StatusBadge>
              </div>

              <p className="text-[13px] leading-[1.6] text-stone-500">
                {c.stockNote}
              </p>
            </InfoCard>

            <InfoCard title={c.deliveryTitle} className="sm:col-span-2">
              <p>
                {c.deliveryIntro}
              </p>

              <div className="grid gap-x-10 gap-y-4 pt-1 md:grid-cols-2">
                <div>
                  <CardSubheading>{c.schedule}</CardSubheading>
                  <p className="mt-2 font-medium text-stone-950">{c.weekdays}</p>
                  <p className="mt-1 text-[14px] text-stone-600">
                    {c.scheduleNote}
                  </p>
                </div>
                <div>
                  <CardSubheading>{c.needed}</CardSubheading>
                  <ul className="mt-2 space-y-1.5">
                    {c.neededItems.map(
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
                  title={c.chisinau}
                  note={c.chisinauNote}
                >
                  <PriceRow
                    term={c.t12}
                    price={
                      locale === "ru" ? "Бесплатно" : locale === "ro" ? "Gratuit" : "Free"
                    }
                  />
                  <PriceRow
                    term={c.express}
                    price={"100 MDL"}
                  />
                </DeliveryTile>

                <DeliveryTile
                  title={c.moldova}
                  note={c.moldovaNote}
                >
                  <PriceRow term={c.days13} price={"100 MDL"} />
                </DeliveryTile>

                <DeliveryTile
                  title={c.preorder}
                  note={c.preorderNote}
                >
                  <PriceRow term={c.deliveryTime} price={c.days714} />
                </DeliveryTile>
              </div>
            </InfoCard>

            <InfoCard title={c.paymentTitle} className="sm:col-span-2">
              <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
                <div>
                  <CardSubheading>{c.cash}</CardSubheading>
                  <p className="mt-2">
                    {c.cashText}
                  </p>
                </div>
                <div>
                  <CardSubheading>{c.card}</CardSubheading>
                  <p className="mt-2">
                    {c.cardText}
                  </p>
                  <PaymentIcons className="mt-4" />
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">{c.questions}</h2>
          <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">
            {c.questionsText}
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
