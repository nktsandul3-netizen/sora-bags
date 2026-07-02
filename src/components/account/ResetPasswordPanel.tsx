"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

const fieldClass =
  "w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-900";

export default function ResetPasswordPanel({ token }: { token: string }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useT();
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
        setError(data?.error ?? t("auth.errUpdatePassword"));
        return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push(withLocalePath("/account", locale));
        router.refresh();
        return;
      }

      router.push(withLocalePath("/account", locale));
      router.refresh();
    } catch {
      setError(t("auth.errConnection"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mt-5 mb-2 font-serif text-3xl text-stone-950">{t("auth.newPasswordTitle")}</h1>
      <p className="mb-6 text-sm leading-relaxed text-stone-500">
        {t("auth.newPasswordSubtitle")}
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder={t("auth.newPasswordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className={fieldClass}
        />
        <input
          type="password"
          placeholder={t("auth.confirmPasswordPlaceholder")}
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
          {loading ? t("auth.saving") : t("auth.savePassword")}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-stone-400">
        <Link href={withLocalePath("/account", locale)} className="underline-offset-2 hover:underline">
          {t("auth.backToLogin")}
        </Link>
      </p>
    </div>
  );
}
