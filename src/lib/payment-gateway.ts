import { ordersCollection, paymentsCollection, ObjectId } from "@/lib/mongodb";
import type { PaymentMethod } from "@/lib/mongodb";
import { trackAnalyticsEvent } from "@/lib/analytics";

export type PaymentProvider = "paynet" | "maib" | "stripe";

export interface PaymentSuccessInput {
  orderId: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  method?: PaymentMethod;
}

/**
 * Единая точка для будущих webhook/callback онлайн-оплаты.
 * PayNet, MAIB eCommerce или Stripe должны вызывать этот helper после
 * подтверждения успешной оплаты у провайдера.
 */
export async function markOrderPaid(input: PaymentSuccessInput): Promise<boolean> {
  if (!ObjectId.isValid(input.orderId)) return false;
  const orderId = new ObjectId(input.orderId);
  const now = new Date();

  const orders = await ordersCollection();
  const order = await orders.findOne({ _id: orderId });
  if (!order) return false;

  await orders.updateOne(
    { _id: orderId },
    {
      $set: {
        paymentStatus: "paid",
        payment_status: "paid",
        paymentProvider: input.provider,
        paymentReference: input.providerPaymentId,
        updatedAt: now,
        updated_at: now,
      },
      $push: {
        timeline: {
          type: "payment",
          message: `Оплата получена: ${input.provider}`,
          createdAt: now,
        },
      },
    },
  );

  const payments = await paymentsCollection();
  await payments.updateOne(
    { orderId },
    {
      $set: {
        status: "paid",
        method: input.method ?? "card",
        updatedAt: now,
      },
    },
  );

  await trackAnalyticsEvent({
    type: "payment_paid",
    sessionId: "payment-gateway",
    orderId: input.orderId,
    orderNumber: order.number ?? order.order_number,
    amount: order.total ?? order.total_amount ?? 0,
    userId: order.userId?.toString(),
    city: order.customer?.city ?? order.city,
  });

  return true;
}