import Image from "next/image";
import type { Locale } from "@/lib/i18n";

import { brand } from "@/lib/config";

const phone = brand.phones[0];
const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
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

export default function WarrantyPageContent({ locale = "ru" }: { locale?: Locale }) {
  if (locale !== "ru") {
    const c = locale === "ro"
      ? {
          alt: "Garanție și îngrijire — SÓRA Bags",
          title: "Garanție și îngrijire",
          warranty: "Garanție",
          warrantyText: [
            "Pentru toate produsele SÓRA Bags se oferă garanție de 30 de zile calendaristice din momentul cumpărării.",
            "Garanția acoperă doar defectele de fabricație identificate cu respectarea regulilor de utilizare și îngrijire.",
            "Dacă observați un defect în perioada de garanție, contactați-ne prin orice metodă convenabilă. Analizarea solicitării durează până la 10 zile lucrătoare.",
          ],
          decisions: "Soluții posibile",
          decisionIntro: "În urma verificării poate fi propusă una dintre soluțiile:",
          decisionItems: ["Rambursarea sumei achitate", "Reparație gratuită, cu acordul părților", "Expertiză independentă a calității produsului"],
          decisionNote: "Dacă defectul de fabricație se confirmă, cumpărătorului i se rambursează suma integrală sau produsul este înlocuit. Dacă defectul nu se confirmă, produsul se returnează fără reparație.",
          notCovered: "Garanția nu acoperă",
          notCoveredItems: ["Urme naturale de utilizare", "Zgârieturi fine, rosături și cute ale pielii", "Deteriorări cauzate de utilizare incorectă", "Decolorări cauzate de umezeală", "Uzură naturală în timpul folosirii"],
          invalid: "Garanția nu se aplică în caz de",
          invalidItems: ["Încălcarea regulilor de utilizare și păstrare", "Deteriorări mecanice", "Expunere la substanțe chimice", "Reparații sau modificări independente", "Folosirea produsului în alt scop"],
          claimTitle: "Solicitare de garanție",
          claimText: "Dacă considerați că situația dvs. intră sub incidența garanției, contactați-ne:",
          include: "În solicitare indicați",
          includeItems: ["Numărul comenzii", "Data cumpărării", "Descrierea problemei", "Fotografii ale produsului și defectului din mai multe unghiuri"],
          final: "După primirea solicitării, specialistul SÓRA Bags vă va contacta cu instrucțiuni.",
        }
      : {
          alt: "Warranty and care — SÓRA Bags",
          title: "Warranty and care",
          warranty: "Warranty",
          warrantyText: [
            "All SÓRA Bags items include a 30-calendar-day warranty from the purchase date.",
            "The warranty covers only manufacturing defects found when use and care rules are followed.",
            "If you notice a defect during the warranty period, contact us in any convenient way. Review takes up to 10 business days.",
          ],
          decisions: "Possible solutions",
          decisionIntro: "After inspection, one of the following solutions may be offered:",
          decisionItems: ["Refund", "Free repair by mutual agreement", "Independent quality expertise"],
          decisionNote: "If a manufacturing defect is confirmed, the buyer receives a full refund or replacement. If it is not confirmed, the item is returned without repair.",
          notCovered: "Warranty does not cover",
          notCoveredItems: ["Natural signs of use", "Minor scratches, scuffs and leather creases", "Damage caused by improper use", "Color changes caused by moisture", "Natural wear during use"],
          invalid: "Warranty is void in case of",
          invalidItems: ["Violation of use and storage rules", "Mechanical damage", "Chemical exposure", "Independent repair or modification", "Use of the item for another purpose"],
          claimTitle: "Warranty claim",
          claimText: "If you believe your case is covered by warranty, contact us:",
          include: "Include in your request",
          includeItems: ["Order number", "Purchase date", "Problem description", "Photos of the item and defect from several angles"],
          final: "After receiving the request, a SÓRA Bags specialist will contact you with further instructions.",
        };

    return (
      <>
        <section className="relative h-[clamp(250px,44vw,580px)] w-full overflow-hidden bg-stone-100">
          <Image src={heroImage} alt={c.alt} fill priority quality={90} sizes="100vw" className="object-cover object-center" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" aria-hidden />
        </section>
        <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6">
          <h1 className="sr-only">{c.title}</h1>
          <section className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
              <InfoCard title={c.warranty} className="sm:col-span-2">
                <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                  <div className="space-y-4">{c.warrantyText.map((item) => <p key={item}>{item}</p>)}</div>
                  <div className="space-y-4">
                    <CardSubheading>{c.decisions}</CardSubheading>
                    <p>{c.decisionIntro}</p>
                    <NumberedList items={c.decisionItems} />
                    <p className="text-[13px] leading-[1.6] text-stone-500">{c.decisionNote}</p>
                  </div>
                </div>
              </InfoCard>
              <InfoCard title={c.notCovered}><BulletList items={c.notCoveredItems} /></InfoCard>
              <InfoCard title={c.invalid}><BulletList items={c.invalidItems} /></InfoCard>
              <div className="grid items-start gap-6 sm:col-span-2 sm:grid-cols-[782fr_667fr] sm:gap-7 lg:gap-8">
                <EditorialImage src="/warranty-craft-banner.png" alt="SÓRA Bags craft tools" aspect="645/825" />
                <EditorialImage src="/warranty-artisan-banner.png" alt="SÓRA Bags leather craft" aspect="683/1024" />
              </div>
            </div>
          </section>
          <section className="mb-14 rounded-[20px] bg-stone-950 px-8 py-10 sm:mb-16 sm:px-12 sm:py-12 lg:mb-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl text-white sm:text-3xl">{c.claimTitle}</h2>
              <p className="mt-3 text-sm text-stone-400 sm:text-[15px]">{c.claimText}</p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
                <a href={phoneHref} className="font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl">{phone}</a>
                <a href={`mailto:${email}`} className="font-serif text-xl tracking-wide text-white underline-offset-4 transition hover:underline sm:text-2xl">{email}</a>
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-4xl border-t border-white/10 pt-8">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-stone-300">{c.include}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {c.includeItems.map((item, i) => (
                  <div key={item} className="rounded-2xl bg-white/5 px-4 py-5 text-center">
                    <span className="font-serif text-lg text-stone-400" aria-hidden>0{i + 1}</span>
                    <p className="mt-2 text-[13px] leading-[1.6] text-stone-300">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-[13px] leading-[1.6] text-stone-500">{c.final}</p>
            </div>
          </section>
        </div>
      </>
    );
  }
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
        <section className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
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
