"use client";

import { useActionState } from "react";
import { completeReminderAction, type ActionState } from "@/app/admin/actions";
import type { AdminReminderView } from "@/lib/admin/operations";

const initial: ActionState = {};

export default function ReminderList({
  reminders,
  returnTo,
}: {
  reminders: AdminReminderView[];
  returnTo: string;
}) {
  return (
    <div className="bg-white p-6 ring-1 ring-stone-200">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
        Напоминания
      </h3>
      {reminders.length === 0 ? (
        <p className="text-sm text-stone-400">Открытых напоминаний нет.</p>
      ) : (
        <div className="space-y-2">
          {reminders.map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} returnTo={returnTo} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReminderItem({
  reminder,
  returnTo,
}: {
  reminder: AdminReminderView;
  returnTo: string;
}) {
  const [state, action, pending] = useActionState(completeReminderAction, initial);
  return (
    <form action={action} className="rounded-lg border border-stone-200 p-3">
      <input type="hidden" name="id" value={reminder.id} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-stone-900">{reminder.title}</p>
          <p className="mt-0.5 text-xs text-stone-400">
            {reminder.targetLabel ?? reminder.targetType}
            {reminder.dueAt ? ` · до ${new Date(reminder.dueAt).toLocaleString("ru-RU")}` : ""}
          </p>
          {state.error && <p className="mt-1 text-xs text-[#A01D26]">{state.error}</p>}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600 hover:border-stone-500 disabled:opacity-60"
        >
          Готово
        </button>
      </div>
    </form>
  );
}
