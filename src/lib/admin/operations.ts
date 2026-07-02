import {
  adminRemindersCollection,
  customerCrmNotesCollection,
  ordersCollection,
  usersCollection,
  ObjectId,
  type AdminReminderDoc,
  type CustomerCrmNoteDoc,
  type ReminderTargetType,
} from "@/lib/mongodb";
import { normalizeOrderStatus } from "@/lib/admin/constants";
import { getLowStockProducts } from "@/lib/admin/products";
import {
  getSalesIntelligenceDashboard,
  type IntelligenceProductRow,
  type WishlistCustomerLead,
} from "@/lib/admin/sales-intelligence";
import type { AdminOrderListItem } from "@/lib/admin/orders";

export interface OwnerTask {
  title: string;
  description: string;
  href: string;
  priority: "urgent" | "medium" | "low";
}

export interface AdminReminderView {
  id: string;
  title: string;
  targetType: ReminderTargetType;
  targetLabel?: string;
  dueAt?: string;
  createdAt: string;
}

export interface CustomerCrmNoteView {
  id: string;
  text: string;
  tags: string[];
  isVip: boolean;
  author: string;
  createdAt: string;
}

export interface CustomerOpportunity {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderAt: string;
  kind: "repeat" | "sleeping";
}

export type OrderOperationFlag = "urgent" | "uncontacted" | "awaitingPayment" | "awaitingShipment";

export interface OwnerCenter {
  tasks: OwnerTask[];
  productRecommendations: IntelligenceProductRow[];
  wishlistLeads: WishlistCustomerLead[];
  repeatCustomers: CustomerOpportunity[];
  reminders: AdminReminderView[];
}

export function orderOperationFlags(order: {
  status: string;
  paymentStatus: string;
  createdAt: string | Date;
  processingChecklist?: {
    contacted?: boolean;
    availabilityConfirmed?: boolean;
    addressConfirmed?: boolean;
    paymentAgreed?: boolean;
    handedToDelivery?: boolean;
  };
}) {
  const flags: OrderOperationFlag[] = [];
  const status = normalizeOrderStatus(order.status);
  const createdAt = new Date(order.createdAt);
  const ageHours = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
  const checklist = order.processingChecklist ?? {};

  if (status === "new" && ageHours >= 2) flags.push("urgent");
  if (status === "new" && !checklist.contacted) flags.push("uncontacted");
  if (order.paymentStatus === "pending") flags.push("awaitingPayment");
  if ((status === "processing" || status === "shipped") && !checklist.handedToDelivery) {
    flags.push("awaitingShipment");
  }
  return flags;
}

function priorityFromFlags(flags: OrderOperationFlag[]) {
  if (flags.includes("urgent")) return "urgent" as const;
  if (flags.length > 0) return "medium" as const;
  return "low" as const;
}

export async function getOwnerCenter(): Promise<OwnerCenter> {
  const [orders, lowStock, intelligence, reminders, repeatCustomers] = await Promise.all([
    ordersCollection(),
    getLowStockProducts(5, 10),
    getSalesIntelligenceDashboard("30d"),
    listOpenReminders(8),
    getCustomerOpportunities(),
  ]);

  const recentOrders = await orders
    .find({}, { projection: { status: 1, paymentStatus: 1, createdAt: 1, processingChecklist: 1 } })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  const tasks: OwnerTask[] = [];
  const urgentOrders = recentOrders.filter((order) =>
    orderOperationFlags({
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      processingChecklist: order.processingChecklist,
    }).includes("urgent"),
  ).length;
  const uncontacted = recentOrders.filter((order) =>
    orderOperationFlags({
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      processingChecklist: order.processingChecklist,
    }).includes("uncontacted"),
  ).length;
  const pendingPayments = recentOrders.filter((order) => order.paymentStatus === "pending").length;

  if (urgentOrders > 0) {
    tasks.push({
      title: `Срочные заказы: ${urgentOrders}`,
      description: "Новые заказы старше 2 часов требуют реакции.",
      href: "/admin/orders?status=new",
      priority: "urgent",
    });
  }
  if (uncontacted > 0) {
    tasks.push({
      title: `Не связались с клиентом: ${uncontacted}`,
      description: "Откройте заказы и отметьте первый пункт чеклиста.",
      href: "/admin/orders?status=new",
      priority: "medium",
    });
  }
  if (pendingPayments > 0) {
    tasks.push({
      title: `Проверить оплату: ${pendingPayments}`,
      description: "Есть заказы с ожидающей оплатой.",
      href: "/admin/payments?status=pending",
      priority: "medium",
    });
  }
  if (lowStock.length > 0) {
    tasks.push({
      title: `Мало на складе: ${lowStock.length}`,
      description: "Проверьте остатки и закупку.",
      href: "/admin/products",
      priority: "medium",
    });
  }
  if (intelligence.highInterestLowPurchase.length > 0) {
    tasks.push({
      title: "Проверить товары с высоким интересом",
      description: "Их смотрят/добавляют, но не покупают.",
      href: "/admin/analytics",
      priority: "low",
    });
  }
  if (intelligence.wishlistLeads.length > 0) {
    tasks.push({
      title: `Клиенты с избранным: ${intelligence.wishlistLeads.length}`,
      description: "Есть клиенты, которым можно написать по сохранённой модели.",
      href: "/admin/analytics",
      priority: "medium",
    });
  }
  if (reminders.length > 0) {
    tasks.push({
      title: `Открытые напоминания: ${reminders.length}`,
      description: "Есть задачи, которые нужно закрыть.",
      href: "/admin",
      priority: "medium",
    });
  }

  return {
    tasks,
    productRecommendations: intelligence.highInterestLowPurchase.slice(0, 6),
    wishlistLeads: intelligence.wishlistLeads.slice(0, 6),
    repeatCustomers,
    reminders,
  };
}

export function orderPriority(item: AdminOrderListItem) {
  const flags = orderOperationFlags({
    status: item.status,
    paymentStatus: item.paymentStatus,
    createdAt: item.createdAt,
    processingChecklist: item.processingChecklist,
  });
  return { flags, priority: priorityFromFlags(flags) };
}

export async function listOpenReminders(limit = 10): Promise<AdminReminderView[]> {
  const reminders = await adminRemindersCollection();
  const docs = await reminders
    .find({ status: "open" })
    .sort({ dueAt: 1, createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toReminderView);
}

export async function createReminder(input: {
  title: string;
  targetType: ReminderTargetType;
  targetId?: string;
  targetLabel?: string;
  dueAt?: Date;
  author: string;
}) {
  const reminders = await adminRemindersCollection();
  await reminders.insertOne({
    title: input.title,
    status: "open",
    targetType: input.targetType,
    targetId: input.targetId && ObjectId.isValid(input.targetId) ? new ObjectId(input.targetId) : undefined,
    targetLabel: input.targetLabel,
    dueAt: input.dueAt,
    author: input.author,
    createdAt: new Date(),
  });
}

export async function completeReminder(id: string) {
  if (!ObjectId.isValid(id)) return false;
  const reminders = await adminRemindersCollection();
  const res = await reminders.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "done", completedAt: new Date() } },
  );
  return res.matchedCount > 0;
}

export async function listCustomerCrmNotes(customerId: string): Promise<CustomerCrmNoteView[]> {
  if (!ObjectId.isValid(customerId)) return [];
  const notes = await customerCrmNotesCollection();
  const docs = await notes
    .find({ customerId: new ObjectId(customerId) })
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();
  return docs.map(toCrmNoteView);
}

export async function createCustomerCrmNote(input: {
  customerId: string;
  text: string;
  tags: string[];
  isVip: boolean;
  author: string;
}) {
  if (!ObjectId.isValid(input.customerId)) return false;
  const notes = await customerCrmNotesCollection();
  await notes.insertOne({
    customerId: new ObjectId(input.customerId),
    text: input.text,
    tags: input.tags,
    isVip: input.isVip,
    author: input.author,
    createdAt: new Date(),
  });
  return true;
}

export async function getCustomerOpportunities(limit = 8): Promise<CustomerOpportunity[]> {
  const users = await usersCollection();
  const orders = await ordersCollection();
  const rows = await orders
    .aggregate<{
      _id: ObjectId;
      ordersCount: number;
      totalSpent: number;
      lastOrderAt: Date;
    }>([
      { $match: { userId: { $ne: null }, status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: "$userId",
          ordersCount: { $sum: 1 },
          totalSpent: { $sum: "$total" },
          lastOrderAt: { $max: "$createdAt" },
        },
      },
      { $match: { ordersCount: { $gte: 1 } } },
      { $sort: { ordersCount: -1, totalSpent: -1 } },
      { $limit: limit * 2 },
    ])
    .toArray();
  const docs = await users
    .find({ _id: { $in: rows.map((row) => row._id) } })
    .toArray();
  const usersById = new Map(docs.map((user) => [user._id!.toString(), user]));
  const sleepThreshold = Date.now() - 45 * 24 * 60 * 60 * 1000;
  return rows.slice(0, limit).map((row) => {
    const user = usersById.get(row._id.toString());
    return {
      id: row._id.toString(),
      name: user?.name ?? "Клиент",
      email: user?.email ?? "",
      ordersCount: row.ordersCount,
      totalSpent: row.totalSpent,
      lastOrderAt: row.lastOrderAt.toISOString(),
      kind: row.ordersCount >= 2 ? "repeat" : row.lastOrderAt.getTime() < sleepThreshold ? "sleeping" : "repeat",
    };
  });
}

function toReminderView(doc: AdminReminderDoc): AdminReminderView {
  return {
    id: doc._id!.toString(),
    title: doc.title,
    targetType: doc.targetType,
    targetLabel: doc.targetLabel,
    dueAt: doc.dueAt?.toISOString(),
    createdAt: doc.createdAt.toISOString(),
  };
}

function toCrmNoteView(doc: CustomerCrmNoteDoc): CustomerCrmNoteView {
  return {
    id: doc._id!.toString(),
    text: doc.text,
    tags: doc.tags,
    isVip: doc.isVip,
    author: doc.author,
    createdAt: doc.createdAt.toISOString(),
  };
}
