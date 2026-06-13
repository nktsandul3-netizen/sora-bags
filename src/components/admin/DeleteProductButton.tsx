"use client";

import { useActionState } from "react";
import { deleteProductAction, type ActionState } from "@/app/admin/actions";

const initial: ActionState = {};

export default function DeleteProductButton({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState(deleteProductAction, initial);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Удалить товар безвозвратно?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        disabled={pending}
        className="border border-[#A01D26]/40 px-4 py-2 text-sm text-[#A01D26] hover:bg-[#A01D26]/5 disabled:opacity-60"
      >
        {pending ? "Удаление…" : "Удалить товар"}
      </button>
      {state.error && <p className="mt-2 text-sm text-[#A01D26]">{state.error}</p>}
    </form>
  );
}