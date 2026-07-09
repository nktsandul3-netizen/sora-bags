import { brand } from "@/lib/config";

const phone = brand.phones[0];
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
const email = "info@sorabags.md";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950 first:mt-0">
      {children}
    </h2>
  );
}

export default function GiftCertificateContent() {
  return (
    <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">
        Электронный подарочный сертификат SÓRA
      </h1>

      <p className="mt-6">
        Электронный подарочный сертификат SÓRA — это удобный способ порадовать близких
        стильным подарком и предоставить им возможность самостоятельно выбрать
        понравившуюся сумку или аксессуар.
      </p>
      <p className="mt-4">
        После покупки сертификат отправляется на электронную почту покупателя в виде
        уникального электронного сертификата с индивидуальным номером.
      </p>
      <p className="mt-4">
        Приобретая сертификат, вы соглашаетесь с условиями его использования.
      </p>

      <SectionHeading>Условия приобретения</SectionHeading>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>Сертификаты доступны на любую сумму от 500 MDL.</li>
        <li>Максимальная сумма сертификата не ограничена.</li>
        <li>Срок действия сертификата составляет 6 месяцев с момента покупки.</li>
        <li>По истечении срока действия сертификат становится недействительным.</li>
      </ul>

      <SectionHeading>Как использовать сертификат</SectionHeading>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>Сертификат можно приобрести онлайн через менеджера SÓRA.</li>
        <li>
          После получения сертификата его владелец может посетить магазин SÓRA и выбрать
          любые товары на сумму сертификата.
        </li>
        <li>
          Для использования сертификата необходимо предъявить электронный сертификат или
          его номер сотруднику магазина.
        </li>
        <li>Сертификат может быть использован только один раз.</li>
        <li>
          Если стоимость выбранных товаров превышает номинал сертификата, разницу можно
          доплатить любым удобным способом.
        </li>
        <li>
          Если стоимость покупки меньше номинала сертификата, остаток не возвращается и
          сертификат считается использованным.
        </li>
        <li>
          Сертификат можно использовать для оплаты любых товаров, представленных в
          магазине SÓRA.
        </li>
      </ul>

      <SectionHeading>Возврат и обмен</SectionHeading>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>Сертификат не подлежит обмену на денежные средства.</li>
        <li>
          При возврате товара, оплаченного сертификатом, сумма возвращается в виде нового
          подарочного сертификата.
        </li>
        <li>
          Утерянный сертификат может быть восстановлен при наличии подтверждения покупки.
        </li>
        <li>Срок действия сертификата не продлевается.</li>
      </ul>

      <SectionHeading>Контакты</SectionHeading>
      <p className="mt-4">
        Для покупки сертификата или получения дополнительной информации свяжитесь с нами:
      </p>
      <ul className="mt-4 space-y-2">
        <li>
          Телефон:{" "}
          <a href={phoneHref} className="text-stone-950 underline-offset-2 hover:underline">
            {phone}
          </a>
        </li>
        <li>
          E-mail:{" "}
          <a
            href={`mailto:${email}`}
            className="text-stone-950 underline-offset-2 hover:underline"
          >
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}