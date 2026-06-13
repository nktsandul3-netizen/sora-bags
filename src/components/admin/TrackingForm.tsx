"use client";

import { useActionState } from "react";
import { updateTrackingAction, type ActionState } from "@/app/admin/actions";

const initial: ActionState = {};

export default function TrackingForm({
  orderId,
  current,
}: {
  orderId: string;
  current?: string;
}) {
  const [state, action, pending] = useActionState(updateTrackingAction, initial);

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="id" value={orderId} />
      <label className="block text-xs uppercase tracking-wide text-stone-500">
        Трек-номер
      </label>
      <div className="flex gap-2">
        <input
          name="trackingNumber"
          defaultValue={current}
          placeholder="RU123456789"
          className="flex-1 border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#A01D26]"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-stone-900 px-4 py-2 text-sm text-white hover:bg-stone-700 disabled:opacity-60"
        >
          {pending ? "…" : "Сохранить"}
        </button>
      </div>
      {state.error && <p className="text-sm text-[#A01D26]">{state.error}</p>}
      {state.ok && <p className="text-sm text-emerald-700">Сохранено</p>}
    </form>
  );
}