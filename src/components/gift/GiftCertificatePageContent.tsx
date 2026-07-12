import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import SocialIcon from "@/components/SocialIcon";
import { brand } from "@/lib/config";

const phone = brand.phones[0];
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
const email = brand.email;
const heroImage = "/gift-certificate-sora-boxes.png";

const whatsappPrefill: Record<Locale, string> = {
  ru: "Здравствуйте! Хочу оформить подарочный сертификат SÓRA.",
  ro: "Bună ziua! Doresc să comand un certificat cadou SÓRA.",
  en: "Hello! I would like to order a SÓRA gift certificate.",
};

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
    alt: "Подарочный сертификат SÓRA Bags",
    srTitle: "Электронный подарочный сертификат SÓRA",
    title: "Подарочный сертификат SÓRA",
    intro: ["Электронный подарочный сертификат SÓRA — это удобный способ порадовать близких стильным подарком и предоставить им возможность самостоятельно выбрать понравившуюся сумку или аксессуар.", "После покупки сертификат отправляется на электронную почту покупателя в виде уникального электронного сертификата с индивидуальным номером.", "Приобретая сертификат, вы соглашаетесь с условиями его использования."],
    purchaseTitle: "Условия приобретения",
    purchase: ["Сертификаты доступны на любую сумму от 500 MDL.", "Максимальная сумма сертификата не ограничена.", "Срок действия сертификата составляет 6 месяцев с момента покупки.", "По истечении срока действия сертификат становится недействительным."],
    returnsTitle: "Возврат и обмен",
    returns: ["Сертификат не подлежит обмену на денежные средства.", "При возврате товара, оплаченного сертификатом, сумма возвращается в виде нового подарочного сертификата.", "Утерянный сертификат может быть восстановлен при наличии подтверждения покупки.", "Срок действия сертификата не продлевается."],
    useTitle: "Как использовать сертификат",
    use: ["Сертификат можно приобрести онлайн через менеджера SÓRA.", "После получения сертификата его владелец может посетить магазин SÓRA и выбрать любые товары на сумму сертификата.", "Для использования сертификата необходимо предъявить электронный сертификат или его номер сотруднику магазина.", "Сертификат может быть использован только один раз.", "Если стоимость выбранных товаров превышает номинал сертификата, разницу можно доплатить любым удобным способом.", "Если стоимость покупки меньше номинала сертификата, остаток не возвращается и сертификат считается использованным.", "Сертификат можно использовать для оплаты любых товаров, представленных в магазине SÓRA."],
    contacts: "Оформить сертификат",
    contactText:
      "Напишите менеджеру — подберём сумму и отправим электронный сертификат на email.",
    whatsappCta: "Написать в WhatsApp",
    telegramCta: "Telegram",
    orCall: "или свяжитесь напрямую",
  },
  ro: {
    alt: "Certificat cadou SÓRA Bags",
    srTitle: "Certificat cadou electronic SÓRA",
    title: "Certificat cadou SÓRA",
    intro: ["Certificatul cadou electronic SÓRA este o modalitate comodă de a oferi un cadou elegant și de a lăsa persoana dragă să aleagă geanta sau accesoriul potrivit.", "După cumpărare, certificatul este trimis pe email cu un număr individual unic.", "Prin cumpărarea certificatului acceptați condițiile de utilizare."],
    purchaseTitle: "Condiții de cumpărare",
    purchase: ["Certificatele sunt disponibile de la 500 MDL.", "Suma maximă nu este limitată.", "Certificatul este valabil 6 luni din momentul cumpărării.", "După expirare, certificatul devine invalid."],
    returnsTitle: "Retur și schimb",
    returns: ["Certificatul nu poate fi schimbat în numerar.", "La returul unui produs plătit cu certificat, suma se returnează sub forma unui nou certificat cadou.", "Un certificat pierdut poate fi reemis pe baza dovezii de cumpărare.", "Valabilitatea certificatului nu se prelungește."],
    useTitle: "Cum se folosește certificatul",
    use: ["Certificatul poate fi cumpărat online prin managerul SÓRA.", "După primire, titularul poate vizita magazinul SÓRA și alege produse în limita sumei certificatului.", "Pentru utilizare, prezentați certificatul electronic sau numărul acestuia unui angajat.", "Certificatul poate fi folosit o singură dată.", "Dacă valoarea produselor depășește nominalul, diferența poate fi achitată prin orice metodă convenabilă.", "Dacă valoarea cumpărăturii este mai mică, restul nu se returnează și certificatul se consideră folosit.", "Certificatul poate fi folosit pentru orice produse disponibile în magazinul SÓRA."],
    contacts: "Comandă certificatul",
    contactText:
      "Scrieți managerului — alegem suma și trimitem certificatul electronic pe email.",
    whatsappCta: "Scrie pe WhatsApp",
    telegramCta: "Telegram",
    orCall: "sau contactați-ne direct",
  },
  en: {
    alt: "SÓRA Bags gift certificate",
    srTitle: "SÓRA electronic gift certificate",
    title: "SÓRA gift certificate",
    intro: ["A SÓRA electronic gift certificate is a convenient way to offer a stylish present and let someone choose the bag or accessory they love.", "After purchase, the certificate is sent to the buyer's email as a unique electronic certificate with an individual number.", "By purchasing a certificate, you agree to its terms of use."],
    purchaseTitle: "Purchase terms",
    purchase: ["Certificates are available from 500 MDL.", "There is no maximum certificate amount.", "The certificate is valid for 6 months from purchase.", "After expiry, the certificate becomes invalid."],
    returnsTitle: "Returns and exchanges",
    returns: ["The certificate cannot be exchanged for cash.", "If an item paid for with a certificate is returned, the amount is issued as a new gift certificate.", "A lost certificate can be reissued with proof of purchase.", "The validity period cannot be extended."],
    useTitle: "How to use the certificate",
    use: ["The certificate can be purchased online through a SÓRA manager.", "After receiving it, the holder can visit SÓRA and choose any products up to the certificate amount.", "To use it, show the electronic certificate or its number to a store employee.", "The certificate can be used only once.", "If selected products cost more than the certificate amount, the difference can be paid by any convenient method.", "If the purchase is lower than the certificate amount, the balance is not returned and the certificate is considered used.", "The certificate can be used for any products available at SÓRA."],
    contacts: "Get a certificate",
    contactText:
      "Message our manager — we’ll set the amount and send the electronic certificate by email.",
    whatsappCta: "Message on WhatsApp",
    telegramCta: "Telegram",
    orCall: "or reach us directly",
  },
};

export default function GiftCertificatePageContent({ locale = "ru" }: { locale?: Locale }) {
  const c = copy[locale];
  const giftWhatsAppHref = `${brand.social.whatsapp}?text=${encodeURIComponent(
    whatsappPrefill[locale],
  )}`;
  return (
    <>
      <section className="relative h-[clamp(250px,44vw,580px)] w-full overflow-hidden bg-stone-100">
        <Image
          src={heroImage}
          alt={c.alt}
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
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
            <InfoCard title={c.title} className="sm:col-span-2">
              <p>{c.intro[0]}</p>
              <p>{c.intro[1]}</p>
              <p className="text-[13px] leading-[1.6] text-stone-500">
                {c.intro[2]}
              </p>
            </InfoCard>

            <InfoCard title={c.purchaseTitle}>
              <BulletList items={c.purchase} />
            </InfoCard>

            <InfoCard title={c.returnsTitle}>
              <BulletList items={c.returns} />
            </InfoCard>

            <InfoCard title={c.useTitle} className="sm:col-span-2">
              <BulletList items={c.use} />
            </InfoCard>
          </div>
        </section>

        <section className="relative mb-14 overflow-hidden rounded-[20px] border border-stone-200/80 bg-gradient-to-br from-[#f7f3ee] via-white to-[#efe8df] px-6 py-10 text-center shadow-[0_4px_24px_rgba(28,25,23,0.05)] sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(168,137,110,0.18),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(120,100,80,0.1),transparent_70%)]"
            aria-hidden
          />

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              SÓRA
            </p>
            <h2 className="mt-3 font-serif text-2xl text-stone-950 sm:text-3xl">
              {c.contacts}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-[15px]">
              {c.contactText}
            </p>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={giftWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-stone-300 bg-white/70 px-7 py-3.5 text-sm font-medium text-stone-900 backdrop-blur transition hover:border-stone-500 hover:bg-white"
              >
                <SocialIcon name="whatsapp" />
                {c.whatsappCta}
              </a>
              <a
                href={brand.social.telegram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-stone-300 bg-white/70 px-7 py-3.5 text-sm font-medium text-stone-900 backdrop-blur transition hover:border-stone-500 hover:bg-white"
              >
                <SocialIcon name="telegram" />
                {c.telegramCta}
              </a>
            </div>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              {c.orCall}
            </p>
            <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href={phoneHref}
                className="font-serif text-lg tracking-wide text-stone-950 underline-offset-4 transition hover:underline sm:text-xl"
              >
                {phone}
              </a>
              <span className="hidden text-stone-300 sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${email}`}
                className="text-[15px] text-stone-600 underline-offset-4 transition hover:text-stone-950 hover:underline"
              >
                {email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
