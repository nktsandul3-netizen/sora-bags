"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { CartItem } from "@/context/cart";

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onSuccess: (order: { id: string; number: string }) => void;
}

export default function CheckoutForm({ items, total, onSuccess }: CheckoutFormProps) {
  const { status } = useSession();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Для авторизованных подставляем имя/телефон/город из профиля и основного адреса.
  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/account/checkout-info");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data.authenticated) return;
        setName((v) => v || data.name || "");
        setEmail((v) => v || data.email || "");
        setPhone((v) => v || data.phone || "");
        setCity((v) => v || data.city || "");
      } catch {
        // игнорируем — пользователь заполнит вручную
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Укажите имя");
      return;
    }
    if (phone.replace(/\D/g, "").length < 6) {
      setError("Укажите корректный телефон");
      return;
    }
    if (!consent) {
      setError("Подтвердите согласие на обработку данных");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          city,
          address,
          comment,
          consent,
          total,
          items: items.map((it) => ({
            slug: it.slug,
            title: it.title,
            brand: it.brand,
            color: it.color,
            qty: it.qty,
            price: it.price,
          })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.");
        return;
      }

      const body = (await res.json()) as { orderId?: string; orderNumber?: string };
      if (!body.orderId || !body.orderNumber) {
        setError("Заказ создан, но не удалось получить номер. Свяжитесь с нами.");
        return;
      }

      onSuccess({ id: body.orderId, number: body.orderNumber });
    } catch {
      setError("Проблема с соединением. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя *"
        autoComplete="name"
        className={fieldClass}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Телефон *"
        autoComplete="tel"
        className={fieldClass}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
        className={fieldClass}
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Город"
        autoComplete="address-level2"
        className={fieldClass}
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Адрес доставки"
        autoComplete="street-address"
        className={fieldClass}
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий к заказу"
        rows={2}
        className={fieldClass + " resize-none"}
      />

      <label className="flex items-start gap-2.5 text-xs text-stone-500">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-stone-900"
        />
        <span>
          Я согласен(на) на обработку персональных данных для оформления заказа.
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Оформляем…" : "Оформить заказ"}
      </button>
      <p className="text-center text-xs text-stone-400">
        После оформления мы подтвердим заказ и детали доставки.
      </p>
    </form>
  );
}