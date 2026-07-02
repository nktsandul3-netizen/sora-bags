import type { Filter } from "mongodb";
import {
  paymentsCollection,
  ordersCollection,
  ObjectId,
} from "@/lib/mongodb";
import type { PaymentDoc, PaymentMethod, PaymentStatus } from "@/lib/mongodb";
import { trackAnalyticsEvent } from "@/lib/analytics";

export interface AdminPaymentView {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
}

export interface PaymentStats {
  totalRevenue: number;
  paidCount: number;
  pendingCount: number;
  refundedCount: number;
  pendingAmount: number;
}

export async function getPaymentStats(): Promise<PaymentStats> {
  const payments = await paymentsCollection();
  const docs = await payments.find({}).toArray();
  let totalRevenue = 0;
  let paidCount = 0;
  let pendingCount = 0;
  let refundedCount = 0;
  let pendingAmount = 0;
  for (const p of docs) {
    if (p.status === "paid") {
      paidCount += 1;
      totalRevenue += p.amount;
    } else if (p.status === "pending") {
      pendingCount += 1;
      pendingAmount += p.amount;
    } else if (p.status === "refunded") {
      refundedCount += 1;
    }
  }
  return { totalRevenue, paidCount, pendingCount, refundedCount, pendingAmount };
}

export async function listPayments(params: {
  search?: string;
  status?: PaymentStatus | "all";
  page?: number;
  pageSize?: number;
}): Promise<{
  payments: AdminPaymentView[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const { search, status = "all", page = 1, pageSize = 20 } = params;
  const payments = await paymentsCollection();
  const filter: Filter<PaymentDoc> = {};
  if (status !== "all") filter.status = status;
  if (search?.trim()) {
    const rx = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ orderNumber: rx }, { customerName: rx }];
  }
  const total = await payments.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const docs = await payments
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return {
    payments: docs.map(toView),
    total,
    page: safePage,
    totalPages,
  };
}

export async function updatePaymentStatus(
  id: string,
  status: PaymentStatus,
  method?: PaymentMethod,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const payments = await paymentsCollection();
  const payment = await payments.findOne({ _id: new ObjectId(id) });
  if (!payment) return false;

  const $set: Partial<PaymentDoc> = { status, updatedAt: new Date() };
  if (method) $set.method = method;
  await payments.updateOne({ _id: payment._id }, { $set });

  if (status === "paid") {
    const orders = await ordersCollection();
    await orders.updateOne(
      { _id: payment.orderId },
      {
        $push: {
          timeline: {
            type: "payment",
            message: "Оплата получена",
            createdAt: new Date(),
          },
        },
        $set: {
          paymentStatus: "paid",
          payment_status: "paid",
          updatedAt: new Date(),
          updated_at: new Date(),
        },
      },
    );
    await trackAnalyticsEvent({
      type: "payment_paid",
      sessionId: "admin",
      orderId: payment.orderId.toString(),
      orderNumber: payment.orderNumber,
      amount: payment.amount,
    });
  } else if (status === "refunded") {
    const orders = await ordersCollection();
    await orders.updateOne(
      { _id: payment.orderId },
      {
        $push: {
          timeline: {
            type: "payment",
            message: "Оплата возвращена",
            createdAt: new Date(),
          },
        },
        $set: {
          paymentStatus: "refunded",
          payment_status: "refunded",
          updatedAt: new Date(),
          updated_at: new Date(),
        },
      },
    );
  }
  return true;
}

function toView(doc: PaymentDoc): AdminPaymentView {
  return {
    id: doc._id!.toString(),
    orderId: doc.orderId.toString(),
    orderNumber: doc.orderNumber,
    customerName: doc.customerName,
    amount: doc.amount,
    status: doc.status,
    method: doc.method,
    createdAt: doc.createdAt.toISOString(),
  };
}