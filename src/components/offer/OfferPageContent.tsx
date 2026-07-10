import Link from "next/link";
import { brand } from "@/lib/config";
import { withLocalePath, type Locale } from "@/lib/i18n";

const legalIdno = "1026023036917";
const phone = brand.phones[0];

function legalAddressFor(locale: Locale) {
  const country =
    locale === "ru" ? "Республика Молдова" : locale === "ro" ? "Republica Moldova" : "Republic of Moldova";
  return `Strada Mihai Sadoveanu 42/6, Chișinău, MD-2075, ${country}`;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function ContactBlock({ locale }: { locale: Locale }) {
  const addressLabel =
    locale === "ru" ? "Адрес" : locale === "ro" ? "Adresă" : "Address";
  return (
    <div className="space-y-1 text-stone-800">
      <p>(R) {brand.legalName}</p>
      <p>
        {locale === "ru" ? "IDNO" : locale === "ro" ? "IDNO" : "IDNO"}: {legalIdno}
      </p>
      <p>
        {addressLabel}: {legalAddressFor(locale)}
      </p>
      <p>
        E-mail:{" "}
        <a
          href={`mailto:${brand.email}`}
          className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
        >
          {brand.email}
        </a>
      </p>
      <p>
        {locale === "ru" ? "Телефон" : locale === "ro" ? "Telefon" : "Phone"}:{" "}
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
        >
          {phone}
        </a>
      </p>
    </div>
  );
}

type OfferCopy = {
  title: string;
  subtitle: string;
  updated: string;
  intro: string;
  sections: { title: string; paragraphs: React.ReactNode[] }[];
};

function buildCopy(locale: Locale): OfferCopy {
  const paymentHref = withLocalePath("/info/oplata-i-dostavka", locale);
  const returnHref = withLocalePath("/info/vozvrat", locale);
  const privacyHref = withLocalePath("/info/politika-konfidentsialnosti", locale);

  if (locale === "ro") {
    return {
      title: "Ofertă publică / Termeni și condiții",
      subtitle: "Termeni și condiții",
      updated: "Ultima actualizare: 8 iulie 2026",
      intro:
        "Prezenții Termeni și condiții reglementează modul de achiziție a produselor pe site-ul SÓRA Bags.",
      sections: [
        {
          title: "1. Informații despre vânzător",
          paragraphs: [<ContactBlock key="seller" locale={locale} />],
        },
        {
          title: "2. Obiectul contractului",
          paragraphs: [
            `Vânzătorul oferă cumpărătorului posibilitatea de a achiziționa produsele prezentate în catalogul site-ului SÓRA Bags (${brand.domain}). Descrierea, prețul, fotografiile și disponibilitatea sunt indicate pe pagina fiecărui produs.`,
            "Prin plasarea comenzii pe site, cumpărătorul confirmă că a citit prezenții Termeni și îi acceptă.",
          ],
        },
        {
          title: "3. Plasarea comenzii",
          paragraphs: [
            "Pentru a plasa o comandă, cumpărătorul alege produsul, îl adaugă în coș, indică datele de contact, adresa de livrare și alege metoda de plată disponibilă.",
            "După plasarea comenzii, vânzătorul poate contacta cumpărătorul pentru confirmarea detaliilor comenzii, disponibilității produsului și condițiilor de livrare.",
          ],
        },
        {
          title: "4. Prețuri și plată",
          paragraphs: [
            "Toate prețurile de pe site sunt indicate în lei moldovenești (MDL), dacă nu este menționat altfel.",
            "Plata comenzii poate fi efectuată online cu card bancar prin serviciul de plată MAIB (BC «MAIB» S.A.). Sunt acceptate carduri Visa, Mastercard și American Express.",
            "Datele cardului bancar se introduc pe pagina securizată de plată. Vânzătorul nu stochează datele complete ale cardului cumpărătorului.",
            "Comanda este considerată plătită după confirmarea reușită a plății de către sistemul de plată.",
            <>De asemenea, este disponibilă plata numerar la primirea comenzii. Detalii suplimentare — pe pagina{" "}
              <Link href={paymentHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Plată și livrare
              </Link>
              .</>,
          ],
        },
        {
          title: "5. Livrare",
          paragraphs: [
            <>Livrarea se efectuează în Chișinău și/sau pe teritoriul Republicii Moldova conform condițiilor de pe pagina{" "}
              <Link href={paymentHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Plată și livrare
              </Link>
              .</>,
            "Costul și termenele de livrare pot depinde de adresa de livrare, metoda aleasă și valoarea comenzii.",
            "Cumpărătorul este responsabil pentru corectitudinea datelor de contact și a adresei de livrare.",
          ],
        },
        {
          title: "6. Retur și schimb",
          paragraphs: [
            <>Cumpărătorul poate solicita returul sau schimbul produsului în termen de 14 zile calendaristice de la primirea comenzii, dacă produsul nu a fost utilizat, păstrează aspectul comercial, ambalajul, etichetele și confirmarea achiziției.</>,
            <>Returul sau schimbul se efectuează conform condițiilor de pe pagina{" "}
              <Link href={returnHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Retur
              </Link>
              .</>,
            "Sumele achitate sunt returnate prin aceeași metodă de plată utilizată la achiziție, dacă părțile nu convin altfel.",
          ],
        },
        {
          title: "7. Anularea comenzii",
          paragraphs: [
            "Cumpărătorul poate anula comanda înainte de transmiterea acesteia spre livrare, contactând vânzătorul prin telefon sau email.",
            "Dacă comanda a fost deja plătită online, rambursarea se efectuează după confirmarea anulării.",
          ],
        },
        {
          title: "8. Date personale",
          paragraphs: [
            "Prin plasarea comenzii, cumpărătorul furnizează vânzătorului date personale necesare procesării comenzii, livrării produsului și comunicării.",
            <>Vânzătorul utilizează datele personale exclusiv pentru executarea comenzii, procesarea plății, livrare și suport clienți. Mai multe detalii — în{" "}
              <Link href={privacyHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Politica de confidențialitate
              </Link>
              .</>,
          ],
        },
        {
          title: "9. Răspunderea părților",
          paragraphs: [
            "Vânzătorul se obligă să predea cumpărătorului produsul achitat conform descrierii de pe site și condițiilor comenzii.",
            "Cumpărătorul se obligă să furnizeze date corecte pentru procesarea și livrarea comenzii și să accepte comanda la timp.",
            "Vânzătorul nu răspunde pentru întârzierile de livrare cauzate de date incorecte furnizate de cumpărător, acțiunile serviciilor de curierat sau circumstanțe independente de vânzător.",
          ],
        },
        {
          title: "10. Modificarea condițiilor",
          paragraphs: [
            "Vânzătorul are dreptul de a modifica prezenții Termeni și condiții. Noua versiune intră în vigoare din momentul publicării pe site.",
            "Pentru comenzile plasate înainte de modificare se aplică versiunea Termenilor valabilă la momentul plasării comenzii.",
          ],
        },
        {
          title: "11. Contacte",
          paragraphs: [
            "Pentru întrebări despre comenzi, plată, livrare, retur sau schimb, cumpărătorul ne poate contacta:",
            <ContactBlock key="contacts" locale={locale} />,
          ],
        },
        {
          title: "12. Acceptarea condițiilor",
          paragraphs: [
            "Prin plasarea comenzii pe site și bifarea acordului cu Termenii și condițiile, cumpărătorul confirmă că a citit, a înțeles și acceptă prezenții Termeni.",
          ],
        },
      ],
    };
  }

  if (locale === "en") {
    return {
      title: "Public Offer / Terms and Conditions",
      subtitle: "Terms and conditions",
      updated: "Last updated: July 8, 2026",
      intro:
        "These Terms and Conditions govern the purchase of products on the SÓRA Bags website.",
      sections: [
        {
          title: "1. Seller information",
          paragraphs: [<ContactBlock key="seller" locale={locale} />],
        },
        {
          title: "2. Subject of the agreement",
          paragraphs: [
            `The seller offers the buyer the opportunity to purchase products listed in the SÓRA Bags catalog (${brand.domain}). Description, price, photos and availability are shown on each product page.`,
            "By placing an order on the website, the buyer confirms that they have read and accept these Terms.",
          ],
        },
        {
          title: "3. Placing an order",
          paragraphs: [
            "To place an order, the buyer selects a product, adds it to the cart, provides contact details and delivery address, and chooses an available payment method.",
            "After the order is placed, the seller may contact the buyer to confirm order details, product availability and delivery terms.",
          ],
        },
        {
          title: "4. Prices and payment",
          paragraphs: [
            "All prices on the website are shown in Moldovan lei (MDL) unless stated otherwise.",
            "Payment can be made online by bank card through the MAIB payment service (BC «MAIB» S.A.). Visa, Mastercard and American Express cards are accepted.",
            "Card details are entered on a secure payment page. The seller does not store the buyer's full card details.",
            "An order is considered paid after successful payment confirmation by the payment system.",
            <>Cash on delivery is also available. See the{" "}
              <Link href={paymentHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Payment and delivery
              </Link>{" "}
              page for details.</>,
          ],
        },
        {
          title: "5. Delivery",
          paragraphs: [
            <>Delivery is provided in Chișinău and/or across the Republic of Moldova according to the terms on the{" "}
              <Link href={paymentHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Payment and delivery
              </Link>{" "}
              page.</>,
            "Delivery cost and timing may depend on the delivery address, chosen method and order value.",
            "The buyer is responsible for providing correct contact details and delivery address.",
          ],
        },
        {
          title: "6. Returns and exchanges",
          paragraphs: [
            "The buyer may request a return or exchange within 14 calendar days of receiving the order if the item has not been used and retains its commercial appearance, packaging, tags and proof of purchase.",
            <>Returns and exchanges are handled according to the terms on the{" "}
              <Link href={returnHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Returns
              </Link>{" "}
              page.</>,
            "Funds are refunded using the same payment method unless otherwise agreed.",
          ],
        },
        {
          title: "7. Order cancellation",
          paragraphs: [
            "The buyer may cancel an order before it is handed over for delivery by contacting the seller by phone or email.",
            "If the order was already paid online, the refund is processed after cancellation is confirmed.",
          ],
        },
        {
          title: "8. Personal data",
          paragraphs: [
            "By placing an order, the buyer provides personal data required to process the order, deliver the product and communicate with the buyer.",
            <>The seller uses personal data only to fulfill orders, process payments, arrange delivery and provide customer support. See the{" "}
              <Link href={privacyHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                Privacy policy
              </Link>{" "}
              for details.</>,
          ],
        },
        {
          title: "9. Liability",
          paragraphs: [
            "The seller undertakes to deliver the paid product in accordance with the website description and order terms.",
            "The buyer undertakes to provide accurate order and delivery details and to accept the order in a timely manner.",
            "The seller is not liable for delivery delays caused by incorrect buyer details, courier services or circumstances beyond the seller's control.",
          ],
        },
        {
          title: "10. Changes to terms",
          paragraphs: [
            "The seller may amend these Terms and Conditions. The updated version takes effect upon publication on the website.",
            "Orders placed before changes are governed by the version in effect at the time the order was placed.",
          ],
        },
        {
          title: "11. Contacts",
          paragraphs: [
            "For questions about orders, payment, delivery, returns or exchanges, contact us:",
            <ContactBlock key="contacts" locale={locale} />,
          ],
        },
        {
          title: "12. Acceptance of terms",
          paragraphs: [
            "By placing an order on the website and confirming agreement with these Terms and Conditions, the buyer confirms that they have read, understood and accept these Terms.",
          ],
        },
      ],
    };
  }

  return {
    title: "Публичная оферта / Условия и положения",
    subtitle: "Условия и положения",
    updated: "Последнее обновление: 8 июля 2026 г.",
    intro:
      "Настоящие Условия и положения регулируют порядок покупки товаров на сайте SÓRA Bags.",
    sections: [
      {
        title: "1. Информация о продавце",
        paragraphs: [<ContactBlock key="seller" locale={locale} />],
      },
      {
        title: "2. Предмет договора",
        paragraphs: [
          `Продавец предлагает покупателю приобрести товары, представленные в каталоге сайта SÓRA Bags (${brand.domain}). Описание, цена, фотографии и наличие товаров указаны на страницах соответствующих товаров.`,
          "Оформляя заказ на сайте, покупатель подтверждает, что ознакомился с настоящими Условиями и принимает их.",
        ],
      },
      {
        title: "3. Оформление заказа",
        paragraphs: [
          "Для оформления заказа покупатель выбирает товар, добавляет его в корзину, указывает контактные данные, адрес доставки и выбирает доступный способ оплаты.",
          "После оформления заказа продавец может связаться с покупателем для подтверждения деталей заказа, наличия товара и условий доставки.",
        ],
      },
      {
        title: "4. Цены и оплата",
        paragraphs: [
          "Все цены на сайте указаны в молдавских леях (MDL), если не указано иное.",
          "Оплата заказа может быть произведена онлайн банковской картой через платёжный сервис MAIB (BC «MAIB» S.A.). К оплате принимаются карты платёжных систем Visa, Mastercard и American Express.",
          "Данные банковской карты вводятся на защищённой платёжной странице. Продавец не хранит полные данные банковской карты покупателя.",
          "Заказ считается оплаченным после успешного подтверждения платежа платёжной системой.",
          <>Также доступна оплата наличными при получении заказа. Подробности — на странице{" "}
            <Link href={paymentHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
              Оплата и доставка
            </Link>
            .</>,
        ],
      },
      {
        title: "5. Доставка",
        paragraphs: [
          <>Доставка осуществляется по Кишинёву и/или по территории Республики Молдова в соответствии с условиями, указанными на странице{" "}
            <Link href={paymentHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
              Оплата и доставка
            </Link>
            .</>,
          "Стоимость и сроки доставки могут зависеть от адреса доставки, выбранного способа доставки и суммы заказа.",
          "Покупатель несёт ответственность за правильность указанных контактных данных и адреса доставки.",
        ],
      },
      {
        title: "6. Возврат и обмен товара",
        paragraphs: [
          "Покупатель имеет право запросить возврат или обмен товара в течение 14 календарных дней с момента получения заказа, если товар не был использован, сохранён его товарный вид, упаковка, бирки и подтверждение покупки.",
          <>Возврат или обмен осуществляется согласно условиям, указанным на странице{" "}
            <Link href={returnHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
              Возврат
            </Link>
            .</>,
          "Денежные средства возвращаются тем же способом, которым была произведена оплата, если иное не согласовано сторонами.",
        ],
      },
      {
        title: "7. Отмена заказа",
        paragraphs: [
          "Покупатель может отменить заказ до его передачи в доставку, связавшись с продавцом по телефону или email.",
          "Если заказ был уже оплачен онлайн, возврат средств производится после подтверждения отмены заказа.",
        ],
      },
      {
        title: "8. Персональные данные",
        paragraphs: [
          "Оформляя заказ, покупатель предоставляет продавцу персональные данные, необходимые для обработки заказа, доставки товара и связи с покупателем.",
          <>Продавец использует персональные данные только для выполнения заказа, обработки платежа, доставки и клиентской поддержки. Подробнее — в{" "}
            <Link href={privacyHref} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
              Политике конфиденциальности
            </Link>
            .</>,
        ],
      },
      {
        title: "9. Ответственность сторон",
        paragraphs: [
          "Продавец обязуется передать покупателю оплаченный товар в соответствии с описанием на сайте и условиями заказа.",
          "Покупатель обязуется предоставить корректные данные для оформления и доставки заказа, а также своевременно принять заказ.",
          "Продавец не несёт ответственности за задержки доставки, вызванные неправильными данными покупателя, действиями служб доставки или обстоятельствами, не зависящими от продавца.",
        ],
      },
      {
        title: "10. Изменение условий",
        paragraphs: [
          "Продавец имеет право изменять настоящие Условия и положения. Новая редакция вступает в силу с момента публикации на сайте.",
          "К заказам, оформленным до изменения условий, применяется редакция условий, действовавшая на момент оформления заказа.",
        ],
      },
      {
        title: "11. Контакты",
        paragraphs: [
          "По вопросам заказов, оплаты, доставки, возврата или обмена покупатель может связаться с продавцом:",
          <ContactBlock key="contacts" locale={locale} />,
        ],
      },
      {
        title: "12. Принятие условий",
        paragraphs: [
          "Оформляя заказ на сайте и устанавливая отметку согласия с Условиями и положениями, покупатель подтверждает, что прочитал, понял и принимает настоящие Условия.",
        ],
      },
    ],
  };
}

export default function OfferPageContent({ locale = "ru" }: { locale?: Locale }) {
  const c = buildCopy(locale);

  return (
    <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">{c.title}</h1>
      <p className="mt-3 text-[13px] text-stone-400">{c.updated}</p>
      <p className="mt-6">{c.intro}</p>

      {c.sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph, index) =>
            typeof paragraph === "string" ? (
              <p key={index}>{paragraph}</p>
            ) : (
              <div key={index}>{paragraph}</div>
            ),
          )}
        </Section>
      ))}
    </div>
  );
}
