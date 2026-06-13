"use client";

import { useActionState } from "react";
import { setPaymentStatusAction, type ActionState } from "@/app/admin/actions";
import { PAYMENT_STATUSES, PAYMENT_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/admin/constants";
import type { PaymentMethod, PaymentStatus } from "@/lib/mongodb";

const initial: ActionState = {};

export default function PaymentStatusForm({
  paymentId,
  currentStatus,
  currentMethod,
}: {
  paymentId: string;
  currentStatus: PaymentStatus;
  currentMethod: PaymentMethod;
}) {
  const [state, action, pending] = useActionState(setPaymentStatusAction, initial);

  return (
    <form action={action} className="flex flex-wrap items-center gap-1">
      <input type="hidden" name="id" value={paymentId} />
      <select
        name="status"
        defaultValue={currentStatus}
        className="border border-stone-300 px-2 py-1 text-xs"
      >
        {PAYMENT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {PAYMENT_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <select
        name="method"
        defaultValue={currentMethod}
        className="border border-stone-300 px-2 py-1 text-xs"
      >
        {(Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]).map((m) => (
          <option key={m} value={m}>
            {PAYMENT_METHOD_LABELS[m]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="bg-stone-900 px-2 py-1 text-xs text-white disabled:opacity-60"
      >
        OK
      </button>
      {state.error && <span className="text-xs text-[#A01D26]">{state.error}</span>}
    </form>
  );
}