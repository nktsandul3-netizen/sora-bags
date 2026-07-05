import type { Filter } from "mongodb";
import { usersCollection, ordersCollection, ObjectId } from "@/lib/mongodb";
import type { UserDoc, UserRole } from "@/lib/mongodb";
import { normalizeOrderStatus } from "@/lib/admin/constants";
import type { AdminOrderListItem } from "@/lib/admin/orders";

export interface AdminCustomerListItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  ordersCount: number;
  totalSpent: number;
}

export interface AdminCustomerDetail {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  orders: AdminOrderListItem[];
  ordersCount: number;
  totalSpent: number;
}

export interface ListCustomersParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ListCustomersResult {
  customers: AdminCustomerListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listCustomers(
  params: ListCustomersParams = {},
): Promise<ListCustomersResult> {
  const { search, page = 1, pageSize = 20 } = params;
  const users = await usersCollection();
  const orders = await ordersCollection();

  const filter: Filter<UserDoc> = {};
  if (search && search.trim()) {
    const rx = new RegExp(escapeRegex(search.trim()), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }];
  }

  const total = await users.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const docs = await users
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const customers = await Promise.all(
    docs.map(async (u) => {
      const userOrders = await orders
        .find({ userId: u._id }, { projection: { total: 1, status: 1 } })
        .toArray();
      const totalSpent = userOrders
        .filter((o) => normalizeOrderStatus(o.status as string) !== "cancelled")
        .reduce((s, o) => s + (o.total ?? 0), 0);
      return {
        id: u._id!.toString(),
        name: u.name,
        email: u.email,
        role: u.role ?? "customer",
        phone: u.phone,
        createdAt: u.createdAt.toISOString(),
        ordersCount: userOrders.length,
        totalSpent,
      };
    }),
  );

  return { customers, total, page: safePage, pageSize, totalPages };
}

export async function getCustomerById(
  id: string,
): Promise<AdminCustomerDetail | null> {
  if (!ObjectId.isValid(id)) return null;
  const users = await usersCollection();
  const orders = await ordersCollection();

  const user = await users.findOne({ _id: new ObjectId(id) });
  if (!user) return null;

  const docs = await orders
    .find({ userId: user._id })
    .sort({ createdAt: -1 })
    .toArray();

  const orderItems: AdminOrderListItem[] = docs.map((d) => ({
    id: d._id!.toString(),
    number: d.number ?? d.order_number ?? "—",
    status: normalizeOrderStatus((d.status ?? d.order_status) as string),
    orderKind: d.orderKind ?? d.order_kind ?? "standard",
    paymentStatus: d.paymentStatus ?? d.payment_status ?? "pending",
    customerName: d.customer?.name ?? d.customer_name ?? user.name,
    customerPhone: d.customer?.phone ?? d.phone ?? "",
    customerEmail: d.customer?.email ?? d.email ?? user.email,
    total: d.total ?? d.total_amount ?? 0,
    itemsCount: (d.items ?? d.products ?? []).reduce((s, it) => s + it.qty, 0),
    processingChecklist: d.processingChecklist ?? {},
    createdAt: (d.createdAt ?? d.created_at ?? new Date()).toISOString(),
  }));

  const totalSpent = orderItems
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  return {
    id: user._id!.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? "customer",
    phone: user.phone,
    createdAt: user.createdAt.toISOString(),
    orders: orderItems,
    ordersCount: orderItems.length,
    totalSpent,
  };
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}