import type {
  OrderStatus,
  OrderPaymentStatus,
  ProductStatus,
  PaymentStatus,
  PaymentMethod,
  ReviewStatus,
  CouponType,
} from "@/lib/mongodb";

/** Фирменный акцент админ-панели SÓRA. */
export const ADMIN_ACCENT = "#A01D26";

export const ORDER_STATUSES: OrderStatus[] = [
  "new",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Новый",
  processing: "В обработке",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

export const ORDER_PAYMENT_STATUS_LABELS: Record<OrderPaymentStatus, string> = {
  pending: "Ожидает оплаты",
  paid: "Оплачен",
  failed: "Ошибка оплаты",
  refunded: "Возврат",
};

export const ORDER_PAYMENT_STATUS_BADGE: Record<OrderPaymentStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-stone-200 text-stone-600",
};

/** Tailwind-классы бейджа статуса заказа. */
export const ORDER_STATUS_BADGE: Record<OrderStatus, string> = {
  new: "bg-[#A01D26]/10 text-[#A01D26]",
  processing: "bg-amber-100 text-amber-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-stone-200 text-stone-600",
};

/** Нормализует возможный «легаси» статус (например, кириллический «Новый»). */
export function normalizeOrderStatus(value: string): OrderStatus {
  const known = ORDER_STATUSES.find((s) => s === value);
  if (known) return known;
  const map: Record<string, OrderStatus> = {
    Новый: "new",
    "В обработке": "processing",
    Отправлен: "shipped",
    Доставлен: "delivered",
    Отменён: "cancelled",
  };
  return map[value] ?? "new";
}

export const PRODUCT_STATUSES: ProductStatus[] = [
  "in_stock",
  "out_of_stock",
  "pre_order",
];

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  in_stock: "В наличии",
  out_of_stock: "Нет в наличии",
  pre_order: "Предзаказ (от 14 дней)",
};

export const PRODUCT_STATUS_BADGE: Record<ProductStatus, string> = {
  in_stock: "bg-emerald-100 text-emerald-800",
  out_of_stock: "bg-stone-200 text-stone-600",
  pre_order: "bg-amber-100 text-amber-800",
};

export const PAYMENT_STATUSES: PaymentStatus[] = ["paid", "pending", "refunded"];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: "Оплачен",
  pending: "Ожидает",
  refunded: "Возврат",
};

export const PAYMENT_STATUS_BADGE: Record<PaymentStatus, string> = {
  paid: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  refunded: "bg-stone-200 text-stone-600",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: "Карта",
  cash: "Наличные",
  bank_transfer: "Банковский перевод",
  other: "Другое",
};

export const REVIEW_STATUSES: ReviewStatus[] = ["pending", "approved", "rejected"];

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  pending: "На модерации",
  approved: "Одобрен",
  rejected: "Отклонён",
};

export const REVIEW_STATUS_BADGE: Record<ReviewStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-stone-200 text-stone-600",
};

export const COUPON_TYPE_LABELS: Record<CouponType, string> = {
  percentage: "Процент",
  fixed: "Фиксированная сумма",
};

/** Порог «мало на складе» для виджета дашборда. */
export const LOW_STOCK_THRESHOLD = 5;