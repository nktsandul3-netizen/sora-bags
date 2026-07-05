import {
  addressesCollection,
  ordersCollection,
  paymentsCollection,
  productsCollection,
  usersCollection,
  wishlistsCollection,
  ObjectId,
  type CustomerPaymentMethod,
  type DeliveryMethod,
  type OrderItem,
} from "@/lib/mongodb";
import type { OrderPaymentStatus, OrderStatus } from "@/lib/mongodb";
import type { OrderKind } from "@/lib/mongodb";
import { trackAnalyticsEvent } from "@/lib/analytics";

const PRIVACY_POLICY_URL = "/info/politika-konfidentsialnosti";

export interface AddressView {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  city: string;
  street: string;
  comment?: string;
  isDefault: boolean;
}

export interface OrderView {
  id: string;
  number: string;
  status: string;
  paymentStatus: OrderPaymentStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    address?: string;
    comment?: string;
  };
}

export interface ProfileView {
  id: string;
  name: string;
  email: string;
}

export async function getProfile(userId: string): Promise<ProfileView | null> {
  const users = await usersCollection();
  const user = await users.findOne({ _id: new ObjectId(userId) });
  if (!user) return null;
  return { id: user._id!.toString(), name: user.name, email: user.email };
}

export async function getAddresses(userId: string): Promise<AddressView[]> {
  const addresses = await addressesCollection();
  const docs = await addresses
    .find({ userId: new ObjectId(userId) })
    .sort({ isDefault: -1, createdAt: -1 })
    .toArray();
  return docs.map((d) => ({
    id: d._id!.toString(),
    label: d.label,
    recipient: d.recipient,
    phone: d.phone,
    city: d.city,
    street: d.street,
    comment: d.comment,
    isDefault: d.isDefault,
  }));
}

export async function getOrders(userId: string): Promise<OrderView[]> {
  const orders = await ordersCollection();
  const docs = await orders
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((d) => ({
    id: d._id!.toString(),
    number: d.number,
    status: d.status,
    paymentStatus: d.paymentStatus ?? "pending",
    total: d.total,
    createdAt: d.createdAt.toISOString(),
    items: d.items,
    customer: d.customer,
  }));
}

export async function getWishlistSlugs(userId: string): Promise<string[]> {
  const wishlists = await wishlistsCollection();
  const doc = await wishlists.findOne({ userId: new ObjectId(userId) });
  return doc?.slugs ?? [];
}

export async function setWishlistSlugs(
  userId: string,
  slugs: string[],
): Promise<string[]> {
  const wishlists = await wishlistsCollection();
  const unique = Array.from(new Set(slugs));
  await wishlists.updateOne(
    { userId: new ObjectId(userId) },
    { $set: { slugs: unique, updatedAt: new Date() } },
    { upsert: true },
  );
  return unique;
}

/** Объединяет избранное из localStorage с сохранённым в аккаунте. */
export async function mergeWishlistSlugs(
  userId: string,
  incoming: string[],
): Promise<string[]> {
  const existing = await getWishlistSlugs(userId);
  return setWishlistSlugs(userId, [...existing, ...incoming]);
}

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SORA-${ts}-${rand}`;
}

export interface CreateOrderInput {
  userId: string | null;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    address?: string;
    comment?: string;
  };
  deliveryMethod: DeliveryMethod;
  paymentMethod: CustomerPaymentMethod;
  orderKind?: OrderKind;
  privacyConsent: boolean;
  analyticsSessionId?: string;
  items: OrderItem[];
  total: number;
}

export interface CreatedOrder {
  id: string;
  number: string;
}

async function insertOrderWithUniqueNumber(
  input: CreateOrderInput,
  status: OrderStatus,
  paymentStatus: OrderPaymentStatus,
): Promise<CreatedOrder> {
  const orders = await ordersCollection();
  const number = generateOrderNumber();
  const now = new Date();

  const shippingAddress =
    input.customer.city || input.customer.address
      ? {
          recipient: input.customer.name,
          phone: input.customer.phone,
          city: input.customer.city ?? "",
          street: input.customer.address ?? input.customer.city ?? "",
          comment: input.customer.comment,
        }
      : undefined;

  const result = await orders.insertOne({
    userId: input.userId ? new ObjectId(input.userId) : null,
    number,
    order_number: number,
    status,
    order_status: status,
    orderKind: input.orderKind ?? "standard",
    order_kind: input.orderKind ?? "standard",
    paymentStatus,
    payment_status: paymentStatus,
    customer: input.customer,
    customer_name: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    address: input.customer.address,
    city: input.customer.city,
    shippingAddress,
    deliveryMethod: input.deliveryMethod,
    customerPaymentMethod: input.paymentMethod,
    privacyConsent: input.privacyConsent,
    privacyConsentAt: now,
    privacyPolicyUrl: PRIVACY_POLICY_URL,
    items: input.items,
    products: input.items,
    total: input.total,
    total_amount: input.total,
    notes: [],
    timeline: [
      {
        type: "created",
        message: input.orderKind === "preorder" ? "Предзаказ создан" : "Заказ создан",
        createdAt: now,
      },
    ],
    createdAt: now,
    created_at: now,
    updatedAt: now,
    updated_at: now,
  });

  return { id: result.insertedId.toString(), number };
}

/** Сохраняет заказ, создаёт платёж (pending) и событие в timeline. */
export async function createOrder(input: CreateOrderInput): Promise<CreatedOrder> {
  const payments = await paymentsCollection();
  const products = await productsCollection();
  let created: CreatedOrder | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      created = await insertOrderWithUniqueNumber(input, "new", "pending");
      break;
    } catch (err) {
      const code = (err as { code?: number }).code;
      if (code !== 11000 || attempt === 2) throw err;
    }
  }

  if (!created) throw new Error("Не удалось создать заказ");

  const now = new Date();

  await payments.insertOne({
    orderId: new ObjectId(created.id),
    orderNumber: created.number,
    customerName: input.customer.name,
    amount: input.total,
    status: "pending",
    method: input.paymentMethod === "cash_on_delivery" ? "cash" : "bank_transfer",
    createdAt: now,
    updatedAt: now,
  });

  // Увеличиваем счётчик продаж по slug (best-effort).
  for (const item of input.items) {
    await products
      .updateOne({ slug: item.slug }, { $inc: { salesCount: item.qty } })
      .catch(() => {});
  }

  await trackAnalyticsEvent({
    type: "order_created",
    sessionId: input.analyticsSessionId,
    userId: input.userId,
    orderId: created.id,
    orderNumber: created.number,
    amount: input.total,
    city: input.customer.city,
  });

  return created;
}