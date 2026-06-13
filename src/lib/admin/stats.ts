import {
  ordersCollection,
  productsCollection,
  usersCollection,
} from "@/lib/mongodb";
import { normalizeOrderStatus } from "@/lib/admin/constants";
import type { OrderStatus } from "@/lib/mongodb";

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  ordersByStatus: Record<OrderStatus, number>;
}

export interface SalesPoint {
  /** ISO-дата (YYYY-MM-DD) */
  date: string;
  label: string;
  revenue: number;
  orders: number;
}

export interface RecentOrder {
  id: string;
  number: string;
  status: OrderStatus;
  customerName: string;
  total: number;
  createdAt: string;
}

/** Выручка считается без отменённых заказов. */
export async function getDashboardStats(): Promise<DashboardStats> {
  const [orders, products, users] = await Promise.all([
    ordersCollection(),
    productsCollection(),
    usersCollection(),
  ]);

  const [orderDocs, totalProducts, totalCustomers] = await Promise.all([
    orders.find({}, { projection: { status: 1, total: 1 } }).toArray(),
    products.countDocuments({}),
    users.countDocuments({}),
  ]);

  const ordersByStatus: Record<OrderStatus, number> = {
    new: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };
  let totalRevenue = 0;
  for (const o of orderDocs) {
    const status = normalizeOrderStatus(o.status as string);
    ordersByStatus[status] += 1;
    if (status !== "cancelled") totalRevenue += o.total ?? 0;
  }

  return {
    totalOrders: orderDocs.length,
    totalRevenue,
    totalCustomers,
    totalProducts,
    ordersByStatus,
  };
}

/** Ряд продаж за последние N дней (для графика). */
export async function getSalesSeries(days = 14): Promise<SalesPoint[]> {
  const orders = await ordersCollection();
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(since.getDate() - (days - 1));

  const docs = await orders
    .find(
      { createdAt: { $gte: since } },
      { projection: { total: 1, createdAt: 1, status: 1 } },
    )
    .toArray();

  const buckets = new Map<string, { revenue: number; orders: number }>();
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    buckets.set(d.toISOString().slice(0, 10), { revenue: 0, orders: 0 });
  }

  for (const o of docs) {
    const key = new Date(o.createdAt).toISOString().slice(0, 10);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.orders += 1;
    if (normalizeOrderStatus(o.status as string) !== "cancelled") {
      bucket.revenue += o.total ?? 0;
    }
  }

  return Array.from(buckets.entries()).map(([date, v]) => {
    const d = new Date(date);
    return {
      date,
      label: d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
      revenue: v.revenue,
      orders: v.orders,
    };
  });
}

export async function getRecentOrders(limit = 8): Promise<RecentOrder[]> {
  const orders = await ordersCollection();
  const docs = await orders.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
  return docs.map((d) => ({
    id: d._id!.toString(),
    number: d.number,
    status: normalizeOrderStatus(d.status as string),
    customerName: d.customer?.name ?? "—",
    total: d.total,
    createdAt: d.createdAt.toISOString(),
  }));
}

export interface RevenueComparison {
  currentMonth: number;
  previousMonth: number;
  changePercent: number;
}

export async function getRevenueComparison(): Promise<RevenueComparison> {
  const orders = await ordersCollection();
  const now = new Date();
  const currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const docs = await orders
    .find(
      { createdAt: { $gte: previousStart } },
      { projection: { total: 1, createdAt: 1, status: 1 } },
    )
    .toArray();

  let currentMonth = 0;
  let previousMonth = 0;
  for (const o of docs) {
    if (normalizeOrderStatus(o.status as string) === "cancelled") continue;
    const d = new Date(o.createdAt);
    if (d >= currentStart) currentMonth += o.total ?? 0;
    else if (d >= previousStart) previousMonth += o.total ?? 0;
  }

  const changePercent =
    previousMonth === 0
      ? currentMonth > 0
        ? 100
        : 0
      : Math.round(((currentMonth - previousMonth) / previousMonth) * 100);

  return { currentMonth, previousMonth, changePercent };
}

export interface NewCustomerWidget {
  count: number;
  recent: { id: string; name: string; email: string; createdAt: string }[];
}

export async function getNewCustomersWidget(limit = 5): Promise<NewCustomerWidget> {
  const users = await usersCollection();
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const [count, docs] = await Promise.all([
    users.countDocuments({ createdAt: { $gte: since }, role: { $ne: "admin" } }),
    users
      .find({ role: { $ne: "admin" } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),
  ]);
  return {
    count,
    recent: docs.map((u) => ({
      id: u._id!.toString(),
      name: u.name,
      email: u.email,
      createdAt: u.createdAt.toISOString(),
    })),
  };
}