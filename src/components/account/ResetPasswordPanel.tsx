"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const fieldClass =
  "w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-900";

export default function ResetPasswordPanel({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirm }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error ?? "Не удалось обновить пароль");
        return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/account");
        router.refresh();
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Проблема с соединением. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mt-5 mb-2 font-serif text-3xl text-stone-950">Новый пароль</h1>
      <p className="mb-6 text-sm leading-relaxed text-stone-500">
        Придумайте новый пароль для входа в личный кабинет.
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className={fieldClass}
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          className={fieldClass}
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Сохраняем…" : "Сохранить пароль"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-stone-400">
        <Link href="/account" className="underline-offset-2 hover:underline">
          Вернуться ко входу
        </Link>
      </p>
    </div>
  );
}
