import { requireAdmin } from "@/lib/admin/guard";
import { getSettings, getTelegramConfig } from "@/lib/admin/settings";
import SettingsTabs from "@/components/admin/SettingsTabs";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await requireAdmin();
  const [settings, telegram] = await Promise.all([getSettings(), getTelegramConfig()]);
  const telegramFromEnv = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Настройки</h1>
        <p className="mt-1 text-sm text-stone-500">
          Магазин, доставка, уведомления и SEO
        </p>
      </header>
      <SettingsTabs
        settings={settings}
        adminEmail={session.user?.email ?? ""}
        telegramEnabled={telegram.enabled}
        telegramFromEnv={telegramFromEnv}
      />
    </div>
  );
}