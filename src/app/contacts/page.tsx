import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { brand } from "@/lib/config";
import { getServerLocale, getServerT } from "@/lib/server-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("nav.contacts") };
}

export default async function ContactsPage() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const copy = {
    phones: locale === "ru" ? "Телефоны" : locale === "ro" ? "Telefoane" : "Phones",
    addressHours: locale === "ru" ? "Адрес и часы работы" : locale === "ro" ? "Adresă și program" : "Address and working hours",
    messengers: locale === "ru" ? "Мессенджеры и соцсети" : locale === "ro" ? "Messenger și rețele sociale" : "Messengers and social media",
    address: locale === "ru" ? brand.address : locale === "ro" ? "Chișinău, Republica Moldova" : "Chișinău, Republic of Moldova",
    hours: locale === "ru" ? brand.workingHours : locale === "ro" ? "Lun-Dum: 10:00 - 21:00" : "Mon-Sun: 10:00 - 21:00",
    write: locale === "ru" ? "Напишите нам" : locale === "ro" ? "Scrieți-ne" : "Write to us",
    formText: locale === "ru" ? "Ответим в рабочее время. Поможем с выбором и оформлением заказа." : locale === "ro" ? "Răspundem în timpul programului. Vă ajutăm cu alegerea și plasarea comenzii." : "We reply during working hours and help with product choice and ordering.",
    name: locale === "ru" ? "Имя" : locale === "ro" ? "Nume" : "Name",
    contact: locale === "ru" ? "Телефон или e-mail" : locale === "ro" ? "Telefon sau e-mail" : "Phone or email",
    message: locale === "ru" ? "Сообщение" : locale === "ro" ? "Mesaj" : "Message",
    send: locale === "ru" ? "Отправить" : locale === "ro" ? "Trimite" : "Send",
    demo: locale === "ru" ? "Форма демонстрационная — подключите обработчик отправки." : locale === "ro" ? "Formular demonstrativ - conectați procesarea trimiterii." : "Demo form - connect a submit handler.",
  };
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: t("nav.contacts") }]} />
      <h1 className="mt-5 mb-8 font-serif text-3xl text-stone-950 sm:text-4xl">
        {t("nav.contacts")}
      </h1>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              {copy.phones}
            </h2>
            <div className="mt-2 space-y-1">
              {brand.phones.map((ph) => (
                <a
                  key={ph}
                  href={`tel:${ph.replace(/\s/g, "")}`}
                  className="block text-lg text-stone-900 hover:text-[--c-accent]"
                >
                  {ph}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              E-mail
            </h2>
            <a
              href={`mailto:${brand.email}`}
              className="mt-2 block text-lg text-stone-900 hover:text-[--c-accent]"
            >
              {brand.email}
            </a>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              {copy.addressHours}
            </h2>
            <p className="mt-2 text-stone-700">{copy.address}</p>
            <p className="text-stone-500">{copy.hours}</p>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              {copy.messengers}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "Telegram", href: brand.social.telegram },
                { label: "WhatsApp", href: brand.social.whatsapp },
                { label: "Instagram", href: brand.social.instagram },
                { label: "VK", href: brand.social.vk },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:border-stone-900 hover:text-stone-950"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="rounded-2xl border border-stone-200 p-6">
          <h2 className="font-serif text-xl text-stone-950">{copy.write}</h2>
          <p className="mt-1 text-sm text-stone-500">
            {copy.formText}
          </p>
          <div className="mt-5 space-y-3">
            <input
              type="text"
              placeholder={copy.name}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <input
              type="tel"
              placeholder={copy.contact}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <textarea
              placeholder={copy.message}
              rows={4}
              className="w-full resize-none rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800"
          >
            {copy.send}
          </button>
          <p className="mt-3 text-center text-xs text-stone-400">
            {copy.demo}
          </p>
        </form>
      </div>
    </div>
  );
}