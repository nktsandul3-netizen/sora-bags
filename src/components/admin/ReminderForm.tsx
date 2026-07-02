"use client";

import { useActionState } from "react";
import { createReminderAction, type ActionState } from "@/app/admin/actions";
import type { ReminderTargetType } from "@/lib/mongodb";

const initial: ActionState = {};

export default function ReminderForm({
  targetType,
  targetId,
  targetLabel,
  returnTo,
}: {
  targetType: ReminderTargetType;
  targetId?: string;
  targetLabel?: string;
  returnTo: string;
}) {
  const [state, action, pending] = useActionState(createReminderAction, initial);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="targetType" value={targetType} />
      {targetId && <input type="hidden" name="targetId" value={targetId} />}
      {targetLabel && <input type="hidden" name="targetLabel" value={targetLabel} />}
      <input type="hidden" name="returnTo" value={returnTo} />
      <input
        name="title"
        placeholder="Например: проверить оплату завтра"
        className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
      />
      <input
        name="dueAt"
        type="datetime-local"
        className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
      />
      {state.error && <p className="text-sm text-[#A01D26]">{state.error}</p>}
      {state.ok && <p className="text-sm text-emerald-700">Напоминание создано</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
      >
        {pending ? "Создаём…" : "Добавить напоминание"}
      </button>
    </form>
  );
}
