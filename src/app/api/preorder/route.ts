import { auth } from "@/auth";
import { createOrder } from "@/lib/account";
import { readAnalyticsSessionId } from "@/lib/analytics";
import { getProduct } from "@/lib/data";
import { getPurchaseKindForItem } from "@/lib/purchase-kind";
import type { OrderKind } from "@/lib/mongodb";
import { notifyNewOrder } from "@/lib/notify";
import {
  getDeliveryOptions,
  getDeliveryLabel,
  getPaymentLabel,
  getPaymentOptions,
  type CustomerPaymentMethod,
  type DeliveryMethod,
} from "@/lib/order-options";
import { localeFromRequest } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

interface PreorderItem {
  slug: string;
  title: string;
  brand: string;
  color: string;
  qty: number;
  price: number;
  purchaseKind?: OrderKind;
}

interface PreorderPayload {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  deliveryMethod?: DeliveryMethod;
  paymentMethod?: CustomerPaymentMethod;
  orderKind?: OrderKind;
  comment?: string;
  consent?: boolean;
  items?: PreorderItem[];
  total?: number;
}

export async function POST(request: Request) {
  const locale = localeFromRequest(request);
  const error = (key: TranslationKey, status = 400) =>
    Response.json({ error: translate(locale, key) }, { status });
  let data: PreorderPayload;
  try {
    data = await request.json();
  } catch {
    return error("checkout.errSubmit");
  }

  const name = data.name?.trim();
  const phone = data.phone?.trim();
  const deliveryMethod = data.deliveryMethod ?? "courier_chisinau";
  const orderKind: OrderKind = data.orderKind === "preorder" ? "preorder" : "standard";
  const paymentMethod: CustomerPaymentMethod =
    orderKind === "preorder" ? "bank_transfer" : (data.paymentMethod ?? "cash_on_delivery");

  if (!name || name.length < 2) {
    return error("checkout.errName");
  }
  if (!phone || phone.replace(/\D/g, "").length < 6) {
    return error("checkout.errPhone");
  }
  if (!data.consent) {
    return error("checkout.errConsent");
  }
  if (!getDeliveryOptions(locale).some((option) => option.value === deliveryMethod)) {
    return error("checkout.deliveryMethod");
  }
  if (!getPaymentOptions(locale).some((option) => option.value === paymentMethod)) {
    return error("checkout.paymentMethod");
  }
  if (!data.items || data.items.length === 0) {
    return error("checkout.emptyCart");
  }
  const items = data.items.map((item) => ({
    slug: String(item.slug),
    title: String(item.title),
    brand: String(item.brand),
    color: String(item.color),
    qty: Math.max(1, Number(item.qty) || 1),
    price: Math.max(0, Number(item.price) || 0),
    purchaseKind: orderKind,
  }));
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) return error("api.errCheckData");
    if (product.status === "out_of_stock") return error("api.errCheckData");
    const expectedKind: OrderKind =
      getPurchaseKindForItem(product, item.color) === "preorder" ? "preorder" : "standard";
    if (expectedKind !== orderKind) return error("api.errCheckData");
  }
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Сохраняем заказ в БД: без этого интернет-магазин не должен принимать заказ.
  let createdOrder: { id: string; number: string };
  try {
    const session = await auth();
    createdOrder = await createOrder({
      userId: session?.user?.id ?? null,
      customer: {
        name,
        phone,
        email: data.email,
        city: data.city,
        address: data.address,
        comment: data.comment,
      },
      deliveryMethod,
      paymentMethod,
      orderKind,
      privacyConsent: true,
      analyticsSessionId: readAnalyticsSessionId(request),
      items,
      total,
    });
  } catch (err) {
    console.error("[preorder] Заказ не сохранён в БД:", err);
    return Response.json(
      { error: translate(locale, "checkout.errSubmit") },
      { status: 500 },
    );
  }

  // Уведомления администратору (Telegram + email). Не блокируют покупателя.
  const { telegram, email } = await notifyNewOrder({
    orderNumber: createdOrder.number,
    orderKind,
    name,
    phone,
    email: data.email,
    city: data.city,
    deliveryMethod: getDeliveryLabel(deliveryMethod, locale),
    paymentMethod: getPaymentLabel(paymentMethod, locale),
    comment: [data.address, data.comment].filter(Boolean).join("\n"),
    items: items.map((it) => ({
      title: it.title,
      color: it.color,
      qty: it.qty,
      price: it.price,
    })),
    total,
  });

  return Response.json({
    ok: true,
    delivered: telegram || email,
    orderId: createdOrder.id,
    orderNumber: createdOrder.number,
    orderKind,
  });
}