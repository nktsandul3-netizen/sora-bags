"use client";

import { useActionState } from "react";
import { addCustomerCrmNoteAction, type ActionState } from "@/app/admin/actions";
import type { CustomerCrmNoteView } from "@/lib/admin/operations";

const initial: ActionState = {};

export default function CustomerCrmPanel({
  customerId,
  notes,
}: {
  customerId: string;
  notes: CustomerCrmNoteView[];
}) {
  const [state, action, pending] = useActionState(addCustomerCrmNoteAction, initial);

  return (
    <section className="bg-white p-6 ring-1 ring-stone-200">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
        CRM-заметки
      </h2>
      <form action={action} className="space-y-3">
        <input type="hidden" name="customerId" value={customerId} />
        <textarea
          name="text"
          rows={3}
          placeholder="Например: любит чёрные сумки, доставка вечером, покупает подарки..."
          className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
        <input
          name="tags"
          placeholder="Теги через запятую: VIP, подарок, вечерняя доставка"
          className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
        <label className="flex items-center gap-2 text-sm text-stone-600">
          <input name="isVip" type="checkbox" className="h-4 w-4 accent-[#A01D26]" />
          Отметить как VIP
        </label>
        {state.error && <p className="text-sm text-[#A01D26]">{state.error}</p>}
        {state.ok && <p className="text-sm text-emerald-700">Заметка добавлена</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
        >
          {pending ? "Сохраняем…" : "Добавить заметку"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-stone-400">CRM-заметок пока нет.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="rounded-lg border border-stone-200 p-3">
              <div className="flex flex-wrap items-center gap-2">
                {note.isVip && (
                  <span className="rounded-full bg-[#A01D26]/10 px-2 py-0.5 text-[11px] font-medium text-[#A01D26]">
                    VIP
                  </span>
                )}
                {note.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-600">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm text-stone-800">{note.text}</p>
              <p className="mt-1 text-xs text-stone-400">
                {note.author} · {new Date(note.createdAt).toLocaleString("ru-RU")}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
