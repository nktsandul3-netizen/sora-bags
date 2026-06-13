"use client";

import { useActionState } from "react";
import { setOrderStatusAction, type ActionState } from "@/app/admin/actions";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/lib/admin/constants";
import type { OrderStatus } from "@/lib/mongodb";

const initial: ActionState = {};

export default function OrderStatusForm({
  orderId,
  current,
}: {
  orderId: string;
  current: OrderStatus;
}) {
  const [state, action, pending] = useActionState(setOrderStatusAction, initial);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={orderId} />
      <label className="block text-xs uppercase tracking-wide text-stone-500">Статус заказа</label>
      <div className="flex gap-2">
        <select
          name="status"
          defaultValue={current}
          className="flex-1 border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#A01D26]"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="bg-[#A01D26] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "…" : "Сохранить"}
        </button>
      </div>
      {state.error && <p className="text-sm text-[#A01D26]">{state.error}</p>}
      {state.ok && <p className="text-sm text-emerald-700">Статус обновлён</p>}
    </form>
  );
}