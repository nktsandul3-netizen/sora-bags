import { brand } from "@/lib/config";

const phone = brand.phones[0];
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950 first:mt-0">
      {children}
    </h2>
  );
}

export default function ReturnExchangeContent() {
  return (
    <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">
        Обмен и возврат товара
      </h1>

      <SectionHeading>Обмен и возврат товара надлежащего качества</SectionHeading>
      <p className="mt-4">
        Покупатель имеет право обменять или вернуть товар надлежащего качества в
        течение 14 календарных дней с момента получения заказа при соблюдении
        следующих условий:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>товар не был в использовании;</li>
        <li>сохранён товарный вид и потребительские свойства;</li>
        <li>отсутствуют повреждения, следы носки и эксплуатации;</li>
        <li>сохранены оригинальная упаковка, ярлыки, бирки и комплектующие.</li>
      </ul>

      <p className="mt-6">
        В случае возврата товара надлежащего качества покупатель может:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>обменять товар на другую модель, цвет или размер (при наличии);</li>
        <li>выбрать другой товар с перерасчётом стоимости;</li>
        <li>получить возврат денежных средств.</li>
      </ul>
      <p className="mt-4">
        Расходы по доставке товара надлежащего качества при возврате или обмене
        оплачиваются покупателем.
      </p>

      <SectionHeading>Обмен и возврат товара ненадлежащего качества</SectionHeading>
      <p className="mt-4">
        Если в приобретённом товаре обнаружен производственный дефект или брак,
        покупатель имеет право:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>потребовать замену товара на аналогичный;</li>
        <li>обменять товар на другую модель с перерасчётом стоимости;</li>
        <li>получить полный возврат денежных средств.</li>
      </ul>
      <p className="mt-4">
        О факте обнаружения дефекта необходимо сообщить магазину в течение 14
        календарных дней с момента его выявления.
      </p>
      <p className="mt-4">
        При необходимости магазин вправе провести проверку качества или экспертизу
        товара. В таком случае срок рассмотрения заявки на обмен или возврат может
        составлять до 30 календарных дней.
      </p>
      <p className="mt-4">
        Доставка товара ненадлежащего качества осуществляется за счёт магазина SÓRA
        Bags.
      </p>

      <SectionHeading>Контактная информация</SectionHeading>
      <p className="mt-4">По вопросам обмена и возврата обращайтесь:</p>
      <p className="mt-3">
        Телефон:{" "}
        <a
          href={phoneHref}
          className="font-medium text-stone-950 underline-offset-2 hover:underline"
        >
          {phone}
        </a>
      </p>
      <p className="mt-4">
        Наши специалисты помогут оперативно решить возникший вопрос.
      </p>
    </div>
  );
}