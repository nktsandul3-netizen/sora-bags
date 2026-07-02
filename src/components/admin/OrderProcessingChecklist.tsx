"use client";

import { useActionState } from "react";
import { setOrderChecklistItemAction, type ActionState } from "@/app/admin/actions";
import type { OrderChecklistKey } from "@/lib/mongodb";

const initial: ActionState = {};

const ITEMS: { key: OrderChecklistKey; label: string }[] = [
  { key: "contacted", label: "Связался с клиентом" },
  { key: "availabilityConfirmed", label: "Подтвердил наличие" },
  { key: "addressConfirmed", label: "Подтвердил адрес" },
  { key: "paymentAgreed", label: "Оплату согласовал" },
  { key: "handedToDelivery", label: "Передал в доставку" },
];

export default function OrderProcessingChecklist({
  orderId,
  checklist,
}: {
  orderId: string;
  checklist: Record<OrderChecklistKey, boolean>;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
          Чеклист обработки
        </h2>
        <p className="mt-1 text-xs text-stone-400">
          Каждый пункт сохраняется в истории заказа.
        </p>
      </div>
      <div className="space-y-2">
        {ITEMS.map((item) => (
          <ChecklistItem
            key={item.key}
            orderId={orderId}
            itemKey={item.key}
            label={item.label}
            checked={checklist[item.key]}
          />
        ))}
      </div>
    </div>
  );
}

function ChecklistItem({
  orderId,
  itemKey,
  label,
  checked,
}: {
  orderId: string;
  itemKey: OrderChecklistKey;
  label: string;
  checked: boolean;
}) {
  const [state, action, pending] = useActionState(setOrderChecklistItemAction, initial);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={orderId} />
      <input type="hidden" name="key" value={itemKey} />
      <input type="hidden" name="checked" value={checked ? "false" : "true"} />
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 text-left text-sm text-stone-700 transition hover:border-stone-300 disabled:opacity-60"
      >
        <span
          className={
            "flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] " +
            (checked
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-stone-300 text-transparent")
          }
        >
          ✓
        </span>
        <span className={checked ? "text-stone-950" : ""}>{label}</span>
      </button>
      {state.error && <p className="mt-1 text-xs text-[#A01D26]">{state.error}</p>}
    </form>
  );
}
