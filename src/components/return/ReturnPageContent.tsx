import type { Locale } from "@/lib/i18n";

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

const copy = {
  ru: {
    title: "Обмен и возврат товара",
    goodTitle: "Обмен и возврат товара надлежащего качества",
    goodIntro: "Покупатель имеет право обменять или вернуть товар надлежащего качества в течение 14 календарных дней с момента получения заказа при соблюдении следующих условий:",
    goodConditions: ["товар не был в использовании;", "сохранён товарный вид и потребительские свойства;", "отсутствуют повреждения, следы носки и эксплуатации;", "сохранены оригинальная упаковка, ярлыки, бирки и комплектующие."],
    goodCan: "В случае возврата товара надлежащего качества покупатель может:",
    goodOptions: ["обменять товар на другую модель, цвет или размер (при наличии);", "выбрать другой товар с перерасчётом стоимости;", "получить возврат денежных средств."],
    goodNote: "Расходы по доставке товара надлежащего качества при возврате или обмене оплачиваются покупателем.",
    defectTitle: "Обмен и возврат товара ненадлежащего качества",
    defectIntro: "Если в приобретённом товаре обнаружен производственный дефект или брак, покупатель имеет право:",
    defectOptions: ["потребовать замену товара на аналогичный;", "обменять товар на другую модель с перерасчётом стоимости;", "получить полный возврат денежных средств."],
    defectText: ["О факте обнаружения дефекта необходимо сообщить магазину в течение 14 календарных дней с момента его выявления.", "При необходимости магазин вправе провести проверку качества или экспертизу товара. В таком случае срок рассмотрения заявки на обмен или возврат может составлять до 30 календарных дней.", "Доставка товара ненадлежащего качества осуществляется за счёт магазина SÓRA Bags."],
    contactTitle: "Контактная информация",
    contactText: "По вопросам обмена и возврата обращайтесь:",
    phoneLabel: "Телефон:",
    final: "Наши специалисты помогут оперативно решить возникший вопрос.",
  },
  ro: {
    title: "Schimb și retur",
    goodTitle: "Schimbul și returul produselor fără defecte",
    goodIntro: "Cumpărătorul poate schimba sau returna un produs fără defecte în termen de 14 zile calendaristice de la primire, dacă sunt respectate condițiile:",
    goodConditions: ["produsul nu a fost utilizat;", "aspectul comercial și proprietățile sunt păstrate;", "nu există deteriorări sau urme de purtare;", "ambalajul, etichetele și accesoriile originale sunt păstrate."],
    goodCan: "În cazul returului unui produs fără defecte, cumpărătorul poate:",
    goodOptions: ["schimba produsul cu alt model, culoare sau mărime, dacă este disponibil;", "alege alt produs cu recalcularea costului;", "primi rambursarea banilor."],
    goodNote: "Costurile de livrare pentru retur sau schimb al unui produs fără defecte sunt suportate de cumpărător.",
    defectTitle: "Schimbul și returul produselor cu defect",
    defectIntro: "Dacă produsul are un defect de fabricație, cumpărătorul poate:",
    defectOptions: ["solicita înlocuirea cu un produs similar;", "schimba produsul cu alt model cu recalcularea costului;", "primi rambursarea integrală."],
    defectText: ["Defectul trebuie comunicat magazinului în termen de 14 zile calendaristice de la identificare.", "Dacă este necesar, magazinul poate verifica produsul sau solicita expertiză. În acest caz, examinarea cererii poate dura până la 30 de zile calendaristice.", "Livrarea produsului cu defect este acoperită de SÓRA Bags."],
    contactTitle: "Informații de contact",
    contactText: "Pentru întrebări despre schimb și retur, contactați-ne:",
    phoneLabel: "Telefon:",
    final: "Specialiștii noștri vă vor ajuta să rezolvați rapid situația.",
  },
  en: {
    title: "Exchanges and returns",
    goodTitle: "Exchange and return of items without defects",
    goodIntro: "The buyer may exchange or return an item without defects within 14 calendar days from receiving the order if the following conditions are met:",
    goodConditions: ["the item has not been used;", "commercial appearance and consumer properties are preserved;", "there is no damage or wear marks;", "original packaging, labels, tags and accessories are preserved."],
    goodCan: "When returning an item without defects, the buyer may:",
    goodOptions: ["exchange it for another model, color or size if available;", "choose another item with price recalculation;", "receive a refund."],
    goodNote: "Delivery costs for returning or exchanging an item without defects are paid by the buyer.",
    defectTitle: "Exchange and return of defective items",
    defectIntro: "If a manufacturing defect is found in the purchased item, the buyer may:",
    defectOptions: ["request replacement with a similar item;", "exchange it for another model with price recalculation;", "receive a full refund."],
    defectText: ["The store must be informed about the defect within 14 calendar days from its discovery.", "If necessary, the store may inspect the item or request an expert check. In that case, review of the exchange or return request may take up to 30 calendar days.", "Delivery of a defective item is covered by SÓRA Bags."],
    contactTitle: "Contact information",
    contactText: "For exchanges and returns, contact us:",
    phoneLabel: "Phone:",
    final: "Our specialists will help resolve the issue quickly.",
  },
};

export default function ReturnPageContent({ locale = "ru" }: { locale?: Locale }) {
  const c = copy[locale];
  return (
    <>
      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
        <section className="py-14 sm:py-16 lg:py-20">
          <h1 className="mb-10 font-serif text-3xl text-stone-950 sm:text-4xl">
            {c.title}
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard title={c.goodTitle}>
              <p>{c.goodIntro}</p>
              <BulletList items={c.goodConditions} />
              <p>{c.goodCan}</p>
              <BulletList items={c.goodOptions} />
              <p>{c.goodNote}</p>
            </InfoCard>

            <InfoCard title={c.defectTitle}>
              <p>{c.defectIntro}</p>
              <BulletList items={c.defectOptions} />
              {c.defectText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">{c.contactTitle}</h2>
          <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">
            {c.contactText}
          </p>
          <div className="mt-6">
            <p className="text-sm text-stone-400 sm:text-[15px]">
              {c.phoneLabel}{" "}
              <a
                href={phoneHref}
                className="font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl"
              >
                {phone}
              </a>
            </p>
          </div>
          <p className="mt-6 text-sm text-stone-400 sm:text-[15px]">
            {c.final}
          </p>
        </section>
      </div>
    </>
  );
}
