import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { brand } from "@/lib/config";

export const metadata: Metadata = { title: "Контакты" };

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      <h1 className="mt-5 mb-8 font-serif text-3xl text-stone-950 sm:text-4xl">
        Контакты
      </h1>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              Телефоны
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
              Адрес и часы работы
            </h2>
            <p className="mt-2 text-stone-700">{brand.address}</p>
            <p className="text-stone-500">{brand.workingHours}</p>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              Мессенджеры и соцсети
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
          <h2 className="font-serif text-xl text-stone-950">Напишите нам</h2>
          <p className="mt-1 text-sm text-stone-500">
            Ответим в рабочее время. Поможем с выбором и оформлением заказа.
          </p>
          <div className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="Имя"
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <input
              type="tel"
              placeholder="Телефон или e-mail"
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <textarea
              placeholder="Сообщение"
              rows={4}
              className="w-full resize-none rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800"
          >
            Отправить
          </button>
          <p className="mt-3 text-center text-xs text-stone-400">
            Форма демонстрационная — подключите обработчик отправки.
          </p>
        </form>
      </div>
    </div>
  );
}