"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePasswordAction, type ActionState } from "@/app/admin/actions";

const initial: ActionState = {};
const inputClass =
  "w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]";
const labelClass = "mb-1 block text-xs uppercase tracking-wide text-stone-500";

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, initial);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state.ok]);

  return (
    <form ref={ref} action={action} className="max-w-md space-y-4">
      {state.error && (
        <p className="bg-[#A01D26]/10 px-3 py-2 text-sm text-[#A01D26]">{state.error}</p>
      )}
      {state.ok && (
        <p className="bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Пароль обновлён</p>
      )}
      <div>
        <label className={labelClass}>Текущий пароль</label>
        <input name="current" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Новый пароль</label>
        <input name="next" type="password" autoComplete="new-password" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Повторите новый пароль</label>
        <input name="confirm" type="password" autoComplete="new-password" required className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-[#A01D26] px-5 py-2.5 text-sm font-medium uppercase tracking-[0.1em] text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "…" : "Сменить пароль"}
      </button>
    </form>
  );
}