import { settingsCollection } from "@/lib/mongodb";
import type {
  StoreSettings,
  ShippingSettings,
  EmailSettings,
  TelegramSettings,
  SeoSettings,
  SettingsDoc,
} from "@/lib/mongodb";

export interface AdminSettings {
  store: StoreSettings;
  shipping: ShippingSettings;
  email: EmailSettings;
  telegram: TelegramSettings;
  seo: SeoSettings;
}

const DEFAULTS: AdminSettings = {
  store: {},
  shipping: {},
  email: {},
  telegram: { notifyOrders: true, notifyPayments: true },
  seo: {},
};

export async function getSettings(): Promise<AdminSettings> {
  const settings = await settingsCollection();
  const doc = await settings.findOne({ key: "store" });
  if (!doc) return DEFAULTS;
  return {
    store: doc.store ?? {},
    shipping: doc.shipping ?? {},
    email: doc.email ?? {},
    telegram: { ...DEFAULTS.telegram, ...doc.telegram },
    seo: doc.seo ?? {},
  };
}

export async function saveSettings(partial: Partial<AdminSettings>): Promise<void> {
  const settings = await settingsCollection();
  const existing = await settings.findOne({ key: "store" });
  const merged: Omit<SettingsDoc, "_id"> = {
    key: "store",
    store: { ...existing?.store, ...partial.store },
    shipping: { ...existing?.shipping, ...partial.shipping },
    email: { ...existing?.email, ...partial.email },
    telegram: { ...existing?.telegram, ...partial.telegram },
    seo: { ...existing?.seo, ...partial.seo },
    updatedAt: new Date(),
  };
  await settings.updateOne({ key: "store" }, { $set: merged }, { upsert: true });
}

/** Настройки Telegram: env vars имеют приоритет над БД. */
export async function getTelegramConfig(): Promise<TelegramSettings & { enabled: boolean }> {
  const db = (await getSettings()).telegram;
  const botToken = process.env.TELEGRAM_BOT_TOKEN || db.botToken;
  const chatId = process.env.TELEGRAM_CHAT_ID || db.chatId;
  return {
    botToken,
    chatId,
    notifyOrders: db.notifyOrders ?? true,
    notifyPayments: db.notifyPayments ?? true,
    enabled: Boolean(botToken && chatId),
  };
}