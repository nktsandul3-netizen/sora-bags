"use client";

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
import { useT } from "@/lib/useI18n";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const t = useT();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_BADGE[status]}`}
    >
      {t(`status.${status}` as never) || ORDER_STATUS_LABELS[status]}
    </span>
  );
}

export function OrderPaymentStatusBadge({ status }: { status: OrderPaymentStatus }) {
  const t = useT();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_PAYMENT_STATUS_BADGE[status]}`}
    >
      {t(`status.${status}` as never) || ORDER_PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const t = useT();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PRODUCT_STATUS_BADGE[status]}`}
    >
      {t(`status.${status}` as never) || PRODUCT_STATUS_LABELS[status]}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const t = useT();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PAYMENT_STATUS_BADGE[status]}`}
    >
      {t(`status.${status}` as never) || PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  const t = useT();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${REVIEW_STATUS_BADGE[status]}`}
    >
      {t(`status.${status}` as never) || REVIEW_STATUS_LABELS[status]}
    </span>
  );
}