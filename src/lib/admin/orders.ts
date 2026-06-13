import type { Filter } from "mongodb";
import { ordersCollection, ObjectId } from "@/lib/mongodb";
import type {
  OrderDoc,
  OrderItem,
  OrderPaymentStatus,
  OrderStatus,
  OrderTimelineEvent,
  ShippingAddress,
} from "@/lib/mongodb";
import { normalizeOrderStatus, ORDER_STATUS_LABELS } from "@/lib/admin/constants";

export interface AdminOrderTimelineItem {
  type: OrderTimelineEvent["type"];
  message: string;
  author?: string;
  createdAt: string;
}

export interface AdminOrderNote {
  text: string;
  author: string;
  createdAt: string;
}

export interface AdminOrderListItem {
  id: string;
  number: string;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  total: number;
  itemsCount: number;
  createdAt: string;
}

export interface AdminOrderDetail extends AdminOrderListItem {
  userId: string | null;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    address?: string;
    comment?: string;
  };
  shippingAddress?: ShippingAddress;
  trackingNumber?: string;
  items: OrderItem[];
  notes: AdminOrderNote[];
  timeline: AdminOrderTimelineItem[];
  updatedAt: string | null;
}

export interface ListOrdersParams {
  search?: string;
  status?: OrderStatus | "paid" | "all";
  page?: number;
  pageSize?: number;
}

export interface ListOrdersResult {
  orders: AdminOrderListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listOrders(
  params: ListOrdersParams = {},
): Promise<ListOrdersResult> {
  const { search, status = "all", page = 1, pageSize = 20 } = params;
  const orders = await ordersCollection();

  const filter: Filter<OrderDoc> = {};
  if (status && status !== "all") {
    if (status === "paid") {
      filter.paymentStatus = "paid";
    } else {
      filter.status = status;
    }
  }
  if (search && search.trim()) {
    const rx = new RegExp(escapeRegex(search.trim()), "i");
    filter.$or = [
      { number: rx },
      { "customer.name": rx },
      { "customer.phone": rx },
      { "customer.email": rx },
    ];
  }

  const total = await orders.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const docs = await orders
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    orders: docs.map(toListItem),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getOrderById(id: string): Promise<AdminOrderDetail | null> {
  if (!ObjectId.isValid(id)) return null;
  const orders = await ordersCollection();
  const doc = await orders.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return {
    ...toListItem(doc),
    userId: doc.userId ? doc.userId.toString() : null,
    customer: doc.customer ?? {
      name: doc.customer_name ?? "—",
      phone: doc.phone ?? "",
      email: doc.email,
      city: doc.city,
      address: doc.address,
    },
    shippingAddress: doc.shippingAddress,
    trackingNumber: doc.trackingNumber ?? doc.tracking_number,
    items: doc.items ?? doc.products ?? [],
    notes: (doc.notes ?? []).map((n) => ({
      text: n.text,
      author: n.author,
      createdAt: n.createdAt.toISOString(),
    })),
    timeline: (doc.timeline ?? []).map((t) => ({
      type: t.type,
      message: t.message,
      author: t.author,
      createdAt: t.createdAt.toISOString(),
    })),
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
  };
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  author?: string,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const orders = await ordersCollection();
  const label = ORDER_STATUS_LABELS[status];
  const res = await orders.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { status, order_status: status, updatedAt: new Date(), updated_at: new Date() },
      $push: {
        timeline: {
          type: "status_change",
          message: `Статус изменён: ${label}`,
          author,
          createdAt: new Date(),
        },
      },
    },
  );
  return res.matchedCount > 0;
}

export async function updateTrackingNumber(
  id: string,
  trackingNumber: string,
  author?: string,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const orders = await ordersCollection();
  const res = await orders.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        trackingNumber,
        tracking_number: trackingNumber,
        updatedAt: new Date(),
        updated_at: new Date(),
      },
      $push: {
        timeline: {
          type: "tracking",
          message: `Трек-номер: ${trackingNumber}`,
          author,
          createdAt: new Date(),
        },
      },
    },
  );
  return res.matchedCount > 0;
}

export async function addOrderNote(
  id: string,
  text: string,
  author: string,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const orders = await ordersCollection();
  const now = new Date();
  const res = await orders.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        notes: { text, author, createdAt: now },
        timeline: { type: "note", message: text, author, createdAt: now },
      },
      $set: { updatedAt: now, updated_at: now },
    },
  );
  return res.matchedCount > 0;
}

function toListItem(doc: OrderDoc): AdminOrderListItem {
  return {
    id: doc._id!.toString(),
    number: doc.number ?? doc.order_number ?? "—",
    status: normalizeOrderStatus((doc.status ?? doc.order_status) as string),
    paymentStatus: doc.paymentStatus ?? doc.payment_status ?? "pending",
    customerName: doc.customer?.name ?? doc.customer_name ?? "—",
    customerPhone: doc.customer?.phone ?? doc.phone ?? "",
    customerEmail: doc.customer?.email ?? doc.email ?? "",
    total: doc.total ?? doc.total_amount ?? 0,
    itemsCount: (doc.items ?? doc.products ?? []).reduce((s, it) => s + it.qty, 0),
    createdAt: (doc.createdAt ?? doc.created_at ?? new Date()).toISOString(),
  };
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}