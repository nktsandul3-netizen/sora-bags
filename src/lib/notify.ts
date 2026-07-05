import { formatPrice } from "@/lib/format";
import { getTelegramConfig } from "@/lib/admin/settings";

export interface NewOrderNotification {
  orderNumber?: string;
  orderKind?: "standard" | "preorder";
  name: string;
  phone: string;
  email?: string;
  city?: string;
  deliveryMethod?: string;
  paymentMethod?: string;
  comment?: string;
  items: { title: string; color: string; qty: number; price: number }[];
  total: number;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: NewOrderNotification): string {
  const orderLabel = data.orderKind === "preorder" ? "Новый предзаказ" : "Новый заказ";
  const rows = data.items
    .map(
      (it) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(it.title)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(it.color)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${it.qty}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">${escapeHtml(formatPrice(it.price * it.qty))}</td>
        </tr>`,
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1c1917;max-width:640px;">
    <h2 style="margin:0 0 4px;">${orderLabel}${data.orderNumber ? ` — ${escapeHtml(data.orderNumber)}` : ""}</h2>
    <table style="border-collapse:collapse;margin:16px 0 20px;">
      <tr><td style="padding:4px 12px 4px 0;color:#78716c;">Имя</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#78716c;">Телефон</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(data.phone)}</td></tr>
      ${data.email ? `<tr><td style="padding:4px 12px 4px 0;color:#78716c;">Email</td><td style="padding:4px 0;">${escapeHtml(data.email)}</td></tr>` : ""}
      ${data.city ? `<tr><td style="padding:4px 12px 4px 0;color:#78716c;">Город</td><td style="padding:4px 0;">${escapeHtml(data.city)}</td></tr>` : ""}
      ${data.deliveryMethod ? `<tr><td style="padding:4px 12px 4px 0;color:#78716c;">Доставка</td><td style="padding:4px 0;">${escapeHtml(data.deliveryMethod)}</td></tr>` : ""}
      ${data.paymentMethod ? `<tr><td style="padding:4px 12px 4px 0;color:#78716c;">Оплата</td><td style="padding:4px 0;">${escapeHtml(data.paymentMethod)}</td></tr>` : ""}
      ${data.comment ? `<tr><td style="padding:4px 12px 4px 0;color:#78716c;vertical-align:top;">Комментарий</td><td style="padding:4px 0;">${escapeHtml(data.comment)}</td></tr>` : ""}
    </table>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      <thead>
        <tr style="text-align:left;color:#78716c;">
          <th style="padding:6px 12px;border-bottom:2px solid #ddd;">Товар</th>
          <th style="padding:6px 12px;border-bottom:2px solid #ddd;">Цвет</th>
          <th style="padding:6px 12px;border-bottom:2px solid #ddd;text-align:center;">Кол-во</th>
          <th style="padding:6px 12px;border-bottom:2px solid #ddd;text-align:right;">Сумма</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin:16px 0 0;font-size:16px;font-weight:700;text-align:right;">
      Итого: ${escapeHtml(formatPrice(data.total))}
    </p>
  </div>`;
}

function buildTelegramText(data: NewOrderNotification): string {
  const orderLabel = data.orderKind === "preorder" ? "Новый предзаказ" : "Новый заказ";
  const lines = [
    `🛍 *${orderLabel}${data.orderNumber ? ` ${data.orderNumber}` : ""}*`,
    "",
    `👤 ${data.name}`,
    `📞 ${data.phone}`,
    data.email ? `✉️ ${data.email}` : "",
    data.city ? `🏙 ${data.city}` : "",
    data.deliveryMethod ? `🚚 ${data.deliveryMethod}` : "",
    data.paymentMethod ? `💳 ${data.paymentMethod}` : "",
    data.comment ? `💬 ${data.comment}` : "",
    "",
    ...data.items.map(
      (it) => `• ${it.title} (${it.color}) ×${it.qty} — ${formatPrice(it.price * it.qty)}`,
    ),
    "",
    `💰 Итого: ${formatPrice(data.total)}`,
  ];
  return lines.filter(Boolean).join("\n");
}

async function sendTelegram(data: NewOrderNotification): Promise<boolean> {
  const cfg = await getTelegramConfig();
  if (!cfg.enabled || cfg.notifyOrders === false) return false;
  const token = cfg.botToken;
  const chatId = cfg.chatId;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramText(data),
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error("[notify] Telegram error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify] Telegram request failed:", err);
    return false;
  }
}

async function sendEmail(data: NewOrderNotification): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PREORDER_TO;
  const from = process.env.PREORDER_FROM ?? "SÓRA Bags <onboarding@resend.dev>";
  if (!apiKey || !to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email || undefined,
        subject: `${data.orderKind === "preorder" ? "Новый предзаказ" : "Новый заказ"}${data.orderNumber ? ` ${data.orderNumber}` : ""} — ${data.name} (${data.phone})`,
        html: buildEmailHtml(data),
      }),
    });
    if (!res.ok) {
      console.error("[notify] Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify] Resend request failed:", err);
    return false;
  }
}

/**
 * Отправляет уведомления о новом заказе в Telegram и на email (best-effort).
 * Каждый канал независим: сбой одного не мешает другому, и ни один не блокирует
 * оформление заказа покупателем.
 */
export async function notifyNewOrder(
  data: NewOrderNotification,
): Promise<{ telegram: boolean; email: boolean }> {
  const [telegram, email] = await Promise.all([sendTelegram(data), sendEmail(data)]);
  if (!telegram && !email) {
    console.warn(
      "[notify] Уведомления не отправлены (нет настроек Telegram/Resend):",
      JSON.stringify({ orderNumber: data.orderNumber, name: data.name, phone: data.phone }),
    );
  }
  return { telegram, email };
}

export interface PaymentNotification {
  orderNumber: string;
  customerName: string;
  amount: number;
  method?: string;
}

async function sendTelegramRaw(
  text: string,
  kind: "order" | "payment" | "test" = "order",
): Promise<{ ok: boolean; error?: string }> {
  const cfg = await getTelegramConfig();
  if (!cfg.enabled) {
    return { ok: false, error: "Не заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID" };
  }
  if (kind === "order" && cfg.notifyOrders === false) {
    return { ok: false, error: "Уведомления о заказах отключены в настройках" };
  }
  if (kind === "payment" && cfg.notifyPayments === false) {
    return { ok: false, error: "Уведомления об оплате отключены в настройках" };
  }
  const token = cfg.botToken;
  const chatId = cfg.chatId;
  if (!token || !chatId) {
    return { ok: false, error: "Не заданы Bot Token или Chat ID" };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[notify] Telegram error:", res.status, body);
      return { ok: false, error: `Telegram API: ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[notify] Telegram request failed:", err);
    return { ok: false, error: "Не удалось связаться с Telegram API" };
  }
}

/** Уведомление об успешной оплате (Telegram). */
export async function notifyPaymentSuccess(data: PaymentNotification): Promise<boolean> {
  const text = [
    `✅ *Оплата получена*`,
    "",
    `📦 Заказ: ${data.orderNumber}`,
    `👤 ${data.customerName}`,
    data.method ? `💳 ${data.method}` : "",
    `💰 ${formatPrice(data.amount)}`,
  ]
    .filter(Boolean)
    .join("\n");
  return sendTelegramRaw(text, "payment").then((r) => r.ok);
}

/** Проверка подключения Telegram из админки. */
export async function testTelegramConnection(): Promise<{ ok: boolean; error?: string }> {
  const text = [
    "✅ *SÓRA* — тестовое уведомление",
    "",
    "Telegram подключён. Вы будете получать:",
    "• новые заказы",
    "• подтверждения оплаты",
  ].join("\n");
  return sendTelegramRaw(text, "test");
}