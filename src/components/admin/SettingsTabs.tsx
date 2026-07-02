"use client";

import { useActionState, useState } from "react";
import { saveStoreSettingsAction, type ActionState } from "@/app/admin/actions";
import type { AdminSettings } from "@/lib/admin/settings";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import TelegramSetupPanel from "@/components/admin/TelegramSetupPanel";

const initial: ActionState = {};
const inputClass =
  "w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]";
const labelClass = "mb-1 block text-xs uppercase tracking-wide text-stone-500";

const TABS = [
  { id: "store", label: "Магазин" },
  { id: "shipping", label: "Доставка" },
  { id: "email", label: "E-mail" },
  { id: "telegram", label: "Telegram" },
  { id: "seo", label: "SEO" },
  { id: "security", label: "Безопасность" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function SettingsForm({
  section,
  children,
}: {
  section: string;
  children: React.ReactNode;
}) {
  const [state, action, pending] = useActionState(saveStoreSettingsAction, initial);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="section" value={section} />
      {state.ok && <p className="text-sm text-emerald-700">Сохранено</p>}
      {state.error && <p className="text-sm text-[#A01D26]">{state.error}</p>}
      {children}
      <button
        type="submit"
        disabled={pending}
        className="bg-[#A01D26] px-5 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Сохранение…" : "Сохранить"}
      </button>
    </form>
  );
}

export default function SettingsTabs({
  settings,
  adminEmail,
  telegramEnabled,
  telegramFromEnv,
}: {
  settings: AdminSettings;
  adminEmail: string;
  telegramEnabled: boolean;
  telegramFromEnv: boolean;
}) {
  const [tab, setTab] = useState<TabId>("store");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 text-sm ${
              tab === t.id
                ? "bg-[#A01D26] text-white"
                : "bg-white text-stone-600 ring-1 ring-stone-200 hover:text-[#A01D26]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "store" && (
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <SettingsForm section="store">
            <div>
              <label className={labelClass}>Название</label>
              <input name="name" defaultValue={settings.store.name} className={inputClass} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>E-mail</label>
                <input name="email" type="email" defaultValue={settings.store.email} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Телефон</label>
                <input name="phone" defaultValue={settings.store.phone} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Адрес</label>
              <input name="address" defaultValue={settings.store.address} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Описание</label>
              <textarea name="description" rows={3} defaultValue={settings.store.description} className={inputClass} />
            </div>
          </SettingsForm>
        </section>
      )}

      {tab === "shipping" && (
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <SettingsForm section="shipping">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Бесплатная доставка от (MDL)</label>
                <input name="freeFrom" type="number" min="0" defaultValue={settings.shipping.freeFrom ?? ""} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Стоимость по умолчанию (MDL)</label>
                <input name="defaultCost" type="number" min="0" defaultValue={settings.shipping.defaultCost ?? ""} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Срок доставки</label>
              <input name="deliveryDays" defaultValue={settings.shipping.deliveryDays} placeholder="3–7 рабочих дней" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Регионы</label>
              <textarea name="regions" rows={3} defaultValue={settings.shipping.regions} className={inputClass} />
            </div>
          </SettingsForm>
        </section>
      )}

      {tab === "email" && (
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <SettingsForm section="email">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Имя отправителя</label>
                <input name="fromName" defaultValue={settings.email.fromName} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>E-mail отправителя</label>
                <input name="fromEmail" type="email" defaultValue={settings.email.fromEmail} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Уведомления о заказах</label>
              <input name="orderNotificationEmail" type="email" defaultValue={settings.email.orderNotificationEmail} className={inputClass} />
            </div>
            <p className="text-xs text-stone-400">
              Для отправки также нужен RESEND_API_KEY в переменных окружения.
            </p>
          </SettingsForm>
        </section>
      )}

      {tab === "telegram" && (
        <section className="space-y-6">
          <TelegramSetupPanel enabled={telegramEnabled} fromEnv={telegramFromEnv} />
          <div className="bg-white p-6 ring-1 ring-stone-200">
            <SettingsForm section="telegram">
              <div>
                <label className={labelClass}>Bot Token</label>
                <input
                  name="botToken"
                  type="password"
                  defaultValue={settings.telegram.botToken}
                  placeholder="123456789:ABCdefGHI..."
                  className={inputClass}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className={labelClass}>Chat ID</label>
                <input
                  name="chatId"
                  defaultValue={settings.telegram.chatId}
                  placeholder="123456789"
                  className={inputClass}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="notifyOrders"
                  defaultChecked={settings.telegram.notifyOrders ?? true}
                  className="accent-[#A01D26]"
                />
                Уведомлять о новых заказах
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="notifyPayments"
                  defaultChecked={settings.telegram.notifyPayments ?? true}
                  className="accent-[#A01D26]"
                />
                Уведомлять об успешной оплате
              </label>
              <p className="text-xs text-stone-400">
                Переменные TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local имеют приоритет над
                полями здесь.
              </p>
            </SettingsForm>
          </div>
        </section>
      )}

      {tab === "seo" && (
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <SettingsForm section="seo">
            <div>
              <label className={labelClass}>Заголовок сайта</label>
              <input name="siteTitle" defaultValue={settings.seo.siteTitle} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Описание</label>
              <textarea name="siteDescription" rows={3} defaultValue={settings.seo.siteDescription} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Ключевые слова</label>
              <input name="keywords" defaultValue={settings.seo.keywords} className={inputClass} />
            </div>
          </SettingsForm>
        </section>
      )}

      {tab === "security" && (
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-1 text-sm font-medium uppercase tracking-wide text-stone-500">
            Смена пароля
          </h2>
          <p className="mb-4 text-xs text-stone-400">{adminEmail} · права администратора</p>
          <ChangePasswordForm />
        </section>
      )}
    </div>
  );
}