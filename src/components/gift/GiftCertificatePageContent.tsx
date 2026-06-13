import Image from "next/image";

const phone = "+373 68 935 619";
const phoneHref = "tel:+37368935619";
const email = "info@sorabags.md";
const heroImage = "/gift-certificate-banner-v4.png";

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

export default function GiftCertificatePageContent() {
  return (
    <>
      <section className="relative h-[clamp(250px,44vw,580px)] w-full overflow-hidden bg-stone-100">
        <Image
          src={heroImage}
          alt="Подарочный сертификат SÓRA Bags"
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
        <h1 className="sr-only">Электронный подарочный сертификат SÓRA</h1>
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoCard title="Подарочный сертификат SÓRA" className="sm:col-span-2">
              <p>
                Электронный подарочный сертификат SÓRA — это удобный способ порадовать
                близких стильным подарком и предоставить им возможность самостоятельно
                выбрать понравившуюся сумку или аксессуар.
              </p>
              <p>
                После покупки сертификат отправляется на электронную почту покупателя в
                виде уникального электронного сертификата с индивидуальным номером.
              </p>
              <p className="text-[13px] leading-[1.6] text-stone-500">
                Приобретая сертификат, вы соглашаетесь с условиями его использования.
              </p>
            </InfoCard>

            <InfoCard title="Условия приобретения">
              <BulletList
                items={[
                  "Сертификаты доступны на любую сумму от 500 MDL.",
                  "Максимальная сумма сертификата не ограничена.",
                  "Срок действия сертификата составляет 6 месяцев с момента покупки.",
                  "По истечении срока действия сертификат становится недействительным.",
                ]}
              />
            </InfoCard>

            <InfoCard title="Возврат и обмен">
              <BulletList
                items={[
                  "Сертификат не подлежит обмену на денежные средства.",
                  "При возврате товара, оплаченного сертификатом, сумма возвращается в виде нового подарочного сертификата.",
                  "Утерянный сертификат может быть восстановлен при наличии подтверждения покупки.",
                  "Срок действия сертификата не продлевается.",
                ]}
              />
            </InfoCard>

            <InfoCard title="Как использовать сертификат" className="sm:col-span-2">
              <BulletList
                items={[
                  "Сертификат можно приобрести онлайн через менеджера SÓRA.",
                  "После получения сертификата его владелец может посетить магазин SÓRA и выбрать любые товары на сумму сертификата.",
                  "Для использования сертификата необходимо предъявить электронный сертификат или его номер сотруднику магазина.",
                  "Сертификат может быть использован только один раз.",
                  "Если стоимость выбранных товаров превышает номинал сертификата, разницу можно доплатить любым удобным способом.",
                  "Если стоимость покупки меньше номинала сертификата, остаток не возвращается и сертификат считается использованным.",
                  "Сертификат можно использовать для оплаты любых товаров, представленных в магазине SÓRA.",
                ]}
              />
            </InfoCard>
          </div>
        </section>

        <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 text-center sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">Контакты</h2>
          <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">
            Для покупки сертификата или получения дополнительной информации свяжитесь с
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
        </section>
      </div>
    </>
  );
}
