"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { assertAdmin } from "@/lib/admin/guard";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { usersCollection, paymentsCollection, ObjectId } from "@/lib/mongodb";
import type {
  CustomerPaymentMethod,
  DeliveryMethod,
  OrderChecklistKey,
  PaymentMethod,
  PaymentStatus,
  ReminderTargetType,
  ReviewStatus,
  CouponType,
} from "@/lib/mongodb";
import {
  ORDER_STATUSES,
  PRODUCT_STATUSES,
  PAYMENT_STATUSES,
  PAYMENT_METHOD_LABELS,
  REVIEW_STATUSES,
} from "@/lib/admin/constants";
import { deliveryOptions, paymentOptions } from "@/lib/order-options";
import {
  addOrderNote,
  createManualOrder,
  updateOrderChecklistItem,
  updateOrderStatus,
  updateTrackingNumber,
} from "@/lib/admin/orders";
import {
  createProduct,
  deleteProduct,
  duplicateProduct,
  slugExists,
  updateProduct,
  type ProductInput,
} from "@/lib/admin/products";
import { updatePaymentStatus } from "@/lib/admin/payments";
import { setReviewStatus } from "@/lib/admin/reviews";
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  codeExists,
  type CouponInput,
} from "@/lib/admin/coupons";
import { saveSettings, type AdminSettings } from "@/lib/admin/settings";
import { deleteMedia } from "@/lib/admin/media";
import { notifyPaymentSuccess, testTelegramConnection } from "@/lib/notify";
import {
  completeReminder,
  createCustomerCrmNote,
  createReminder,
} from "@/lib/admin/operations";

export type ActionState = { ok?: boolean; error?: string | null };

// ──────────────────────────────────────────────────────────────
// Аутентификация
// ──────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function adminLogin(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = clientIpFromHeaders(await headers());
  const rl = rateLimit(`admin-login:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return {
      error: `Слишком много попыток. Повторите через ${Math.ceil(rl.retryAfterMs / 1000)} с.`,
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Введите корректный e-mail и пароль" };
  }

  // Проверяем роль ДО создания сессии: обычных клиентов в админку не пускаем.
  let user;
  try {
    const users = await usersCollection();
    user = await users.findOne({ email: parsed.data.email.toLowerCase() });
  } catch (err) {
    console.error("[adminLogin] MongoDB недоступна:", err);
    return {
      error:
        "База данных недоступна. Проверьте MONGODB_URI в .env.local и доступ к MongoDB Atlas (Network Access → ваш IP).",
    };
  }
  const valid = user
    ? await bcrypt.compare(parsed.data.password, user.passwordHash)
    : false;
  if (!user || !valid || user.role !== "admin") {
    return { error: "Неверные данные или недостаточно прав" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/admin",
    });
  } catch (err) {
    // signIn бросает NEXT_REDIRECT при успехе — его нужно пробросить дальше.
    if (err instanceof AuthError) return { error: "Не удалось войти" };
    throw err;
  }
  return { ok: true };
}

export async function adminLogout(): Promise<void> {
  await signOut({ redirectTo: "/admin/login" });
}

// ──────────────────────────────────────────────────────────────
// Заказы
// ──────────────────────────────────────────────────────────────

export async function setOrderStatusAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    return { error: "Неизвестный статус" };
  }
  const author = session.user?.name || session.user?.email || "admin";
  const ok = await updateOrderStatus(id, status as (typeof ORDER_STATUSES)[number], author);
  if (!ok) return { error: "Заказ не найден" };
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { ok: true };
}

const noteSchema = z.object({
  id: z.string().min(1),
  text: z.string().trim().min(1, "Пустая заметка").max(2000),
});

export async function addOrderNoteAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const parsed = noteSchema.safeParse({
    id: formData.get("id"),
    text: formData.get("text"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Некорректная заметка" };
  }
  const author = session.user?.name || session.user?.email || "admin";
  const ok = await addOrderNote(parsed.data.id, parsed.data.text, author);
  if (!ok) return { error: "Заказ не найден" };
  revalidatePath(`/admin/orders/${parsed.data.id}`);
  return { ok: true };
}

const checklistKeys: OrderChecklistKey[] = [
  "contacted",
  "availabilityConfirmed",
  "addressConfirmed",
  "paymentAgreed",
  "handedToDelivery",
];

export async function setOrderChecklistItemAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const key = String(formData.get("key") ?? "") as OrderChecklistKey;
  const checked = formData.get("checked") === "true";
  if (!checklistKeys.includes(key)) return { error: "Неизвестный пункт чеклиста" };

  const author = session.user?.name || session.user?.email || "admin";
  const ok = await updateOrderChecklistItem(id, key, checked, author);
  if (!ok) return { error: "Заказ не найден" };
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  return { ok: true };
}

const manualOrderItemSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  brand: z.string().trim().default("SÓRA"),
  color: z.string().trim().default("—"),
  qty: z.coerce.number().int().positive(),
  price: z.coerce.number().int().nonnegative(),
});

const manualOrderSchema = z.object({
  name: z.string().trim().min(2, "Укажите клиента"),
  phone: z.string().trim().min(6, "Укажите телефон"),
  email: z.string().trim().email("Некорректный e-mail").optional().or(z.literal("")),
  city: z.string().trim().optional(),
  address: z.string().trim().optional(),
  comment: z.string().trim().optional(),
  deliveryMethod: z.enum(
    deliveryOptions.map((option) => option.value) as [DeliveryMethod, ...DeliveryMethod[]],
  ),
  paymentMethod: z.enum(
    paymentOptions.map((option) => option.value) as [
      CustomerPaymentMethod,
      ...CustomerPaymentMethod[],
    ],
  ),
  items: z.array(manualOrderItemSchema).min(1, "Добавьте хотя бы один товар"),
});

function slugifyManualItem(title: string, index: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-|-$/g, "");
  return `manual-${slug || `item-${index + 1}`}`;
}

function parseManualOrderItems(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string" || !raw.trim()) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [title = "", color = "—", qty = "1", price = "0"] = line
        .split("|")
        .map((part) => part.trim());
      return {
        slug: slugifyManualItem(title, index),
        title,
        brand: "SÓRA",
        color,
        qty,
        price,
      };
    });
}

export async function createManualOrderAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const parsed = manualOrderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") || undefined,
    city: formData.get("city") || undefined,
    address: formData.get("address") || undefined,
    comment: formData.get("comment") || undefined,
    deliveryMethod: formData.get("deliveryMethod"),
    paymentMethod: formData.get("paymentMethod"),
    items: parseManualOrderItems(formData.get("items")),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля заказа" };
  }

  const items = parsed.data.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    brand: item.brand,
    color: item.color,
    qty: item.qty,
    price: item.price,
  }));
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const orderId = await createManualOrder({
    customer: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || undefined,
      city: parsed.data.city,
      address: parsed.data.address,
      comment: parsed.data.comment,
    },
    deliveryMethod: parsed.data.deliveryMethod,
    paymentMethod: parsed.data.paymentMethod,
    items,
    total,
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  redirect(`/admin/orders/${orderId}`);
}

const reminderSchema = z.object({
  title: z.string().trim().min(2, "Укажите напоминание"),
  targetType: z.enum(["order", "customer", "general"]),
  targetId: z.string().optional(),
  targetLabel: z.string().optional(),
  dueAt: z.string().optional(),
  returnTo: z.string().optional(),
});

export async function createReminderAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const parsed = reminderSchema.safeParse({
    title: formData.get("title"),
    targetType: formData.get("targetType") || "general",
    targetId: formData.get("targetId") || undefined,
    targetLabel: formData.get("targetLabel") || undefined,
    dueAt: formData.get("dueAt") || undefined,
    returnTo: formData.get("returnTo") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте напоминание" };
  }
  await createReminder({
    title: parsed.data.title,
    targetType: parsed.data.targetType as ReminderTargetType,
    targetId: parsed.data.targetId,
    targetLabel: parsed.data.targetLabel,
    dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : undefined,
    author: session.user?.name || session.user?.email || "admin",
  });
  revalidatePath("/admin");
  if (parsed.data.returnTo) revalidatePath(parsed.data.returnTo);
  return { ok: true };
}

export async function completeReminderAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin");
  const ok = await completeReminder(id);
  if (!ok) return { error: "Напоминание не найдено" };
  revalidatePath("/admin");
  revalidatePath(returnTo);
  return { ok: true };
}

const crmNoteSchema = z.object({
  customerId: z.string().min(1),
  text: z.string().trim().min(2, "Укажите заметку"),
  tags: z.string().trim().optional(),
  isVip: z.string().optional(),
});

export async function addCustomerCrmNoteAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const parsed = crmNoteSchema.safeParse({
    customerId: formData.get("customerId"),
    text: formData.get("text"),
    tags: formData.get("tags") || undefined,
    isVip: formData.get("isVip") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте CRM-заметку" };
  }
  const ok = await createCustomerCrmNote({
    customerId: parsed.data.customerId,
    text: parsed.data.text,
    tags: (parsed.data.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    isVip: parsed.data.isVip === "on",
    author: session.user?.name || session.user?.email || "admin",
  });
  if (!ok) return { error: "Клиент не найден" };
  revalidatePath(`/admin/customers/${parsed.data.customerId}`);
  return { ok: true };
}

// ──────────────────────────────────────────────────────────────
// Товары
// ──────────────────────────────────────────────────────────────

const productSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .trim()
    .min(1, "Укажите slug")
    .regex(/^[a-z0-9-]+$/, "Slug: только строчные латинские буквы, цифры и дефис"),
  title: z.string().trim().min(1, "Укажите название"),
  brandSlug: z.string().trim().min(1, "Выберите бренд"),
  section: z.enum(["bags", "accessories"]),
  categorySlug: z.string().trim().min(1, "Выберите категорию"),
  price: z.coerce.number({ message: "Некорректная цена" }).int().nonnegative(),
  oldPrice: z.coerce.number().int().nonnegative().optional(),
  status: z.enum(PRODUCT_STATUSES as [string, ...string[]]),
  inventory: z.coerce.number().int().nonnegative().default(0),
  images: z.array(z.string().trim().min(1)).default([]),
  material: z.string().trim().default(""),
  description: z.string().trim().default(""),
  isNew: z.boolean().default(false),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
});

function parseImages(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.map(String).map((s) => s.trim()).filter(Boolean);
  } catch {
    // не JSON — трактуем как список строк
  }
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveProductAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();

  const oldPriceRaw = String(formData.get("oldPrice") ?? "").trim();
  const parsed = productSchema.safeParse({
    id: formData.get("id") || undefined,
    slug: formData.get("slug"),
    title: formData.get("title"),
    brandSlug: formData.get("brandSlug"),
    section: formData.get("section"),
    categorySlug: formData.get("categorySlug"),
    price: formData.get("price"),
    oldPrice: oldPriceRaw === "" ? undefined : oldPriceRaw,
    status: formData.get("status"),
    inventory: formData.get("inventory") ?? 0,
    images: parseImages(formData.get("images")),
    material: formData.get("material") ?? "",
    description: formData.get("description") ?? "",
    isNew: formData.get("isNew") === "on" || formData.get("isNew") === "true",
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" };
  }

  const { id, ...data } = parsed.data;
  const input = data as ProductInput;

  if (await slugExists(input.slug, id)) {
    return { error: "Товар с таким slug уже существует" };
  }

  if (id) {
    const ok = await updateProduct(id, input);
    if (!ok) return { error: "Товар не найден" };
  } else {
    await createProduct(input);
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  redirect("/admin/products");
}

export async function deleteProductAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!ObjectId.isValid(id)) return { error: "Некорректный идентификатор" };
  const ok = await deleteProduct(id);
  if (!ok) return { error: "Товар не найден" };
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  redirect("/admin/products");
}

// ──────────────────────────────────────────────────────────────
// Настройки: смена пароля администратора
// ──────────────────────────────────────────────────────────────

const passwordSchema = z
  .object({
    current: z.string().min(1, "Введите текущий пароль"),
    next: z.string().min(8, "Минимум 8 символов"),
    confirm: z.string().min(1),
  })
  .refine((d) => d.next === d.confirm, {
    message: "Пароли не совпадают",
    path: ["confirm"],
  });

export async function changePasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const parsed = passwordSchema.safeParse({
    current: formData.get("current"),
    next: formData.get("next"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля" };
  }

  const users = await usersCollection();
  const user = await users.findOne({ _id: new ObjectId(session.user!.id) });
  if (!user) return { error: "Пользователь не найден" };

  const valid = await bcrypt.compare(parsed.data.current, user.passwordHash);
  if (!valid) return { error: "Текущий пароль неверен" };

  const passwordHash = await bcrypt.hash(parsed.data.next, 10);
  await users.updateOne({ _id: user._id }, { $set: { passwordHash } });
  return { ok: true };
}

// ──────────────────────────────────────────────────────────────
// Дополнительные действия: заказы, товары, платежи, отзывы, купоны, настройки
// ──────────────────────────────────────────────────────────────

export async function updateTrackingAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const tracking = String(formData.get("trackingNumber") ?? "").trim();
  if (!tracking) return { error: "Укажите трек-номер" };
  const ok = await updateTrackingNumber(
    id,
    tracking,
    session.user?.name || session.user?.email || "admin",
  );
  if (!ok) return { error: "Заказ не найден" };
  revalidatePath(`/admin/orders/${id}`);
  return { ok: true };
}

export async function duplicateProductAction(productId: string): Promise<{ id?: string; error?: string }> {
  await assertAdmin();
  const id = await duplicateProduct(productId);
  if (!id) return { error: "Товар не найден" };
  revalidatePath("/admin/products");
  return { id };
}

export async function setPaymentStatusAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as PaymentStatus;
  const method = String(formData.get("method") ?? "") as PaymentMethod;
  if (!PAYMENT_STATUSES.includes(status)) return { error: "Неизвестный статус" };

  const paymentsCol = await paymentsCollection();
  const payment = await paymentsCol.findOne({ _id: new ObjectId(id) });
  if (!payment) return { error: "Платёж не найден" };

  const ok = await updatePaymentStatus(id, status, method || undefined);
  if (!ok) return { error: "Не удалось обновить" };

  if (status === "paid") {
    await notifyPaymentSuccess({
      orderNumber: payment.orderNumber,
      customerName: payment.customerName,
      amount: payment.amount,
      method: PAYMENT_METHOD_LABELS[method || payment.method],
    });
  }

  revalidatePath("/admin/payments");
  revalidatePath(`/admin/orders/${payment.orderId.toString()}`);
  return { ok: true };
}

export async function setReviewStatusAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ReviewStatus;
  if (!REVIEW_STATUSES.includes(status)) return { error: "Неизвестный статус" };
  const ok = await setReviewStatus(id, status);
  if (!ok) return { error: "Отзыв не найден" };
  revalidatePath("/admin/reviews");
  return { ok: true };
}

const couponSchema = z.object({
  id: z.string().optional(),
  code: z.string().trim().min(2).max(32),
  type: z.enum(["percentage", "fixed"] as [CouponType, CouponType]),
  value: z.coerce.number().positive(),
  minOrder: z.coerce.number().nonnegative().optional(),
  maxUses: z.coerce.number().int().positive().optional(),
  expiresAt: z.string().optional(),
  active: z.boolean(),
});

export async function saveCouponAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const parsed = couponSchema.safeParse({
    id: formData.get("id") || undefined,
    code: formData.get("code"),
    type: formData.get("type"),
    value: formData.get("value"),
    minOrder: formData.get("minOrder") || undefined,
    maxUses: formData.get("maxUses") || undefined,
    expiresAt: formData.get("expiresAt") || undefined,
    active: formData.get("active") === "on" || formData.get("active") === "true",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля" };
  }
  const { id, expiresAt, ...rest } = parsed.data;
  const input: CouponInput = {
    ...rest,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  };
  if (await codeExists(input.code, id)) {
    return { error: "Такой промокод уже существует" };
  }
  if (id) {
    await updateCoupon(id, input);
  } else {
    await createCoupon(input);
  }
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

export async function deleteCouponAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const ok = await deleteCoupon(id);
  if (!ok) return { error: "Купон не найден" };
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

export async function saveStoreSettingsAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const section = String(formData.get("section") ?? "store");
  const partial: Partial<AdminSettings> = {};

  if (section === "store") {
    partial.store = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      description: String(formData.get("description") ?? ""),
    };
  } else if (section === "shipping") {
    partial.shipping = {
      freeFrom: Number(formData.get("freeFrom")) || undefined,
      defaultCost: Number(formData.get("defaultCost")) || undefined,
      deliveryDays: String(formData.get("deliveryDays") ?? ""),
      regions: String(formData.get("regions") ?? ""),
    };
  } else if (section === "email") {
    partial.email = {
      fromName: String(formData.get("fromName") ?? ""),
      fromEmail: String(formData.get("fromEmail") ?? ""),
      orderNotificationEmail: String(formData.get("orderNotificationEmail") ?? ""),
    };
  } else if (section === "telegram") {
    partial.telegram = {
      botToken: String(formData.get("botToken") ?? "") || undefined,
      chatId: String(formData.get("chatId") ?? "") || undefined,
      notifyOrders: formData.get("notifyOrders") === "on",
      notifyPayments: formData.get("notifyPayments") === "on",
    };
  } else if (section === "seo") {
    partial.seo = {
      siteTitle: String(formData.get("siteTitle") ?? ""),
      siteDescription: String(formData.get("siteDescription") ?? ""),
      keywords: String(formData.get("keywords") ?? ""),
    };
  }

  await saveSettings(partial);
  revalidatePath("/admin/settings");
  return { ok: true };
}

export async function testTelegramAction(): Promise<ActionState> {
  await assertAdmin();
  const result = await testTelegramConnection();
  if (!result.ok) {
    return { error: result.error ?? "Не удалось отправить тестовое сообщение" };
  }
  return { ok: true };
}

export async function deleteMediaAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const removed = await deleteMedia(id);
  if (!removed) return { error: "Файл не найден" };
  if (removed.url.startsWith("/media/")) {
    const filePath = path.join(process.cwd(), "public", removed.url);
    await unlink(filePath).catch(() => {});
  }
  revalidatePath("/admin/media");
  return { ok: true };
}