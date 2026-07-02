"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

const fieldClass =
  "w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-900";

type AuthMode = "login" | "register" | "forgot";

export default function AuthPanel() {
  const router = useRouter();
  const locale = useLocale();
  const t = useT();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function switchMode(next: AuthMode) {
    setMode(next);
    setError(null);
    setSuccess(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setError(data?.error ?? t("auth.errForgotSend"));
          return;
        }
        setSuccess(t("auth.forgotSuccess"));
        return;
      }

      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setError(data?.error ?? t("auth.errRegister"));
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          mode === "login"
            ? t("auth.errInvalidCredentials")
            : t("auth.errLoginAfterRegister"),
        );
        return;
      }

      router.refresh();
    } catch {
      setError(t("auth.errConnection"));
    } finally {
      setLoading(false);
    }
  }

  const title =
    mode === "login"
      ? t("auth.loginTitle")
      : mode === "register"
        ? t("auth.registerTitle")
        : t("auth.forgotTitle");

  const submitLabel =
    mode === "login"
      ? t("auth.loginSubmit")
      : mode === "register"
        ? t("auth.registerSubmit")
        : t("auth.forgotSubmit");

  const footerText =
    mode === "login"
      ? t("auth.loginFooter")
      : mode === "register"
        ? t("auth.registerFooter")
        : t("auth.forgotFooter");

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mt-5 mb-6 font-serif text-3xl text-stone-950">{title}</h1>

      {mode !== "forgot" ? (
        <div className="mb-6 flex rounded-full border border-stone-200 p-1 text-sm">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={
              "flex-1 rounded-full py-2 font-medium transition " +
              (mode === "login" ? "bg-stone-900 text-white" : "text-stone-600")
            }
          >
            {t("auth.loginTab")}
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={
              "flex-1 rounded-full py-2 font-medium transition " +
              (mode === "register" ? "bg-stone-900 text-white" : "text-stone-600")
            }
          >
            {t("auth.registerTab")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => switchMode("login")}
          className="mb-6 text-sm text-stone-500 underline-offset-2 transition hover:text-stone-800 hover:underline"
        >
          {t("auth.backToLoginArrow")}
        </button>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            type="text"
            placeholder={t("auth.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={fieldClass}
          />
        )}
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className={fieldClass}
        />
        {mode !== "forgot" && (
          <input
            type="password"
            placeholder={t("auth.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className={fieldClass}
          />
        )}

        {mode === "login" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => switchMode("forgot")}
              className="text-xs text-stone-500 underline-offset-2 transition hover:text-stone-800 hover:underline"
            >
              {t("auth.forgotPassword")}
            </button>
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
        )}

        {success && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading || (mode === "forgot" && !!success)}
          className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t("auth.waiting") : submitLabel}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-stone-400">
        {footerText}{" "}
        {mode === "forgot" && (
          <Link href={withLocalePath("/account", locale)} className="underline-offset-2 hover:underline">
            {t("auth.backToLogin")}
          </Link>
        )}
      </p>
    </div>
  );
}
