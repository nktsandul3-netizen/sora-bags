"use client";

import { useActionState, useEffect, useRef } from "react";
import { addOrderNoteAction, type ActionState } from "@/app/admin/actions";

const initial: ActionState = {};

export default function OrderNoteForm({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(addOrderNoteAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <input type="hidden" name="id" value={orderId} />
      <textarea
        name="text"
        rows={3}
        required
        placeholder="Добавить заметку к заказу…"
        className="w-full border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#A01D26]"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-60"
        >
          {pending ? "…" : "Добавить заметку"}
        </button>
        {state.error && <p className="text-sm text-[#A01D26]">{state.error}</p>}
      </div>
    </form>
  );
}