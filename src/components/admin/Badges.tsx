import {
  ORDER_PAYMENT_STATUS_BADGE,
  ORDER_PAYMENT_STATUS_LABELS,
  ORDER_STATUS_BADGE,
  ORDER_STATUS_LABELS,
  PRODUCT_STATUS_BADGE,
  PRODUCT_STATUS_LABELS,
  PAYMENT_STATUS_BADGE,
  PAYMENT_STATUS_LABELS,
  REVIEW_STATUS_BADGE,
  REVIEW_STATUS_LABELS,
} from "@/lib/admin/constants";
import type {
  OrderPaymentStatus,
  OrderStatus,
  ProductStatus,
  PaymentStatus,
  ReviewStatus,
} from "@/lib/mongodb";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_BADGE[status]}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}

export function OrderPaymentStatusBadge({ status }: { status: OrderPaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_PAYMENT_STATUS_BADGE[status]}`}
    >
      {ORDER_PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PRODUCT_STATUS_BADGE[status]}`}
    >
      {PRODUCT_STATUS_LABELS[status]}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PAYMENT_STATUS_BADGE[status]}`}
    >
      {PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${REVIEW_STATUS_BADGE[status]}`}
    >
      {REVIEW_STATUS_LABELS[status]}
    </span>
  );
}