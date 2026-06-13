"use client";

import { useActionState } from "react";
import { adminLogin, type ActionState } from "@/app/admin/actions";

const initialState: ActionState = {};

export default function AdminLoginForm({ forbidden }: { forbidden?: boolean }) {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form action={formAction} className="space-y-4 bg-white p-8 shadow-sm ring-1 ring-stone-200">
      {forbidden && (
        <p className="bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Этот аккаунт не имеет прав администратора.
        </p>
      )}
      {state.error && (
        <p className="bg-[#A01D26]/10 px-3 py-2 text-sm text-[#A01D26]">{state.error}</p>
      )}

      <div>
        <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide text-stone-500">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-xs uppercase tracking-wide text-stone-500">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#A01D26] py-3 text-sm font-medium uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Вход…" : "Войти"}
      </button>
    </form>
  );
}