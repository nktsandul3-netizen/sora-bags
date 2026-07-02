"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type { CartItem } from "@/context/cart";
import { formatPrice } from "@/lib/format";
import { sendAnalyticsEvent } from "@/components/AnalyticsTracker";
import {
  getDeliveryOptions,
  getDeliveryLabel,
  getPaymentLabel,
  getPaymentOptions,
  type CustomerPaymentMethod,
  type DeliveryMethod,
} from "@/lib/order-options";
import { useLocale, useT } from "@/lib/useI18n";
import { withLocalePath } from "@/lib/i18n";
import { getAddressLabelDisplay } from "@/lib/address-label";

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onSuccess: (order: { id: string; number: string }) => void;
}

interface SavedAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  city: string;
  street: string;
  comment?: string;
  isDefault: boolean;
}

function inferDeliveryMethod(city: string): DeliveryMethod {
  const normalized = city
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ёșş]/g, (char) => (char === "ё" ? "е" : "s"));

  return ["кишинев", "chisinau", "chisinău"].some((value) => normalized.includes(value))
    ? "courier_chisinau"
    : "moldova_delivery";
}

export default function CheckoutForm({ items, total, onSuccess }: CheckoutFormProps) {
  const { status } = useSession();
  const locale = useLocale();
  const t = useT();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("manual");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("courier_chisinau");
  const [paymentMethod, setPaymentMethod] = useState<CustomerPaymentMethod>("cash_on_delivery");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [step, setStep] = useState<"contacts" | "details">("contacts");
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
        setAddress((v) => v || data.address || "");
        setSavedAddresses(data.addresses ?? []);
        setSelectedAddressId(data.defaultAddressId ?? "manual");
      } catch {
        // игнорируем — пользователь заполнит вручную
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  function applySavedAddress(nextAddress: SavedAddress) {
    setSelectedAddressId(nextAddress.id);
    setName(nextAddress.recipient);
    setPhone(nextAddress.phone);
    setCity(nextAddress.city);
    setAddress(nextAddress.street);
    setDeliveryMethod(inferDeliveryMethod(nextAddress.city));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError(t("checkout.errName"));
      return;
    }
    if (phone.replace(/\D/g, "").length < 6) {
      setError(t("checkout.errPhone"));
      return;
    }
    if (step === "contacts") {
      sendAnalyticsEvent({ type: "checkout_start" });
      setDeliveryMethod(inferDeliveryMethod(city));
      setStep("details");
      return;
    }
    if (!consent) {
      setError(t("checkout.errConsent"));
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
          deliveryMethod,
          paymentMethod,
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
        setError(body?.error ?? t("checkout.errSubmit"));
        return;
      }

      const body = (await res.json()) as { orderId?: string; orderNumber?: string };
      if (!body.orderId || !body.orderNumber) {
        setError(t("checkout.errOrderNumber"));
        return;
      }

      onSuccess({ id: body.orderId, number: body.orderNumber });
    } catch {
      setError(t("checkout.errConnection"));
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400";
  const optionClass =
    "flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-white px-3.5 py-3 text-left transition has-[:checked]:border-stone-900 has-[:checked]:bg-stone-50";
  const compactOptionClass =
    "flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-left transition has-[:checked]:border-stone-900 has-[:checked]:bg-stone-50";
  const deliveryOptions = getDeliveryOptions(locale);
  const paymentOptions = getPaymentOptions(locale);
  const selectedDeliveryLabel = getDeliveryLabel(deliveryMethod, locale) ?? "—";
  const selectedPaymentLabel = getPaymentLabel(paymentMethod, locale) ?? "—";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-stone-400">
        <span>{step === "contacts" ? t("checkout.step1") : t("checkout.step2")}</span>
        {step === "details" && (
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep("contacts");
            }}
            className="font-medium text-stone-700 transition hover:text-stone-950"
          >
            {t("common.back")}
          </button>
        )}
      </div>

      {step === "contacts" ? (
        <div className="space-y-3">
          {savedAddresses.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="px-0.5 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
                {t("checkout.savedAddress")}
              </legend>
              <div className="grid gap-2">
                {savedAddresses.map((savedAddress) => (
                  <label key={savedAddress.id} className={optionClass}>
                    <input
                      type="radio"
                      name="savedAddress"
                      value={savedAddress.id}
                      checked={selectedAddressId === savedAddress.id}
                      onChange={() => applySavedAddress(savedAddress)}
                      className="mt-1 h-4 w-4 shrink-0 accent-stone-900"
                    />
                    <span>
                      <span className="flex flex-wrap items-center gap-2 text-sm font-medium text-stone-900">
                        {getAddressLabelDisplay(savedAddress.label, locale)}
                        {savedAddress.isDefault && (
                          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-stone-500">
                            {t("checkout.defaultAddress")}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                        {savedAddress.recipient}, {savedAddress.city}, {savedAddress.street}
                      </span>
                    </span>
                  </label>
                ))}
                <label className={optionClass}>
                  <input
                    type="radio"
                    name="savedAddress"
                    value="manual"
                    checked={selectedAddressId === "manual"}
                    onChange={() => setSelectedAddressId("manual")}
                    className="mt-1 h-4 w-4 shrink-0 accent-stone-900"
                  />
                  <span>
                    <span className="block text-sm font-medium text-stone-900">
                      {t("checkout.otherAddress")}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                      {t("checkout.otherAddressHint")}
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>
          )}

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setSelectedAddressId("manual");
              setName(e.target.value);
            }}
            placeholder={t("checkout.name")}
            autoComplete="name"
            className={fieldClass}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setSelectedAddressId("manual");
              setPhone(e.target.value);
            }}
            placeholder={t("checkout.phone")}
            autoComplete="tel"
            className={fieldClass}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("checkout.email")}
            autoComplete="email"
            className={fieldClass}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setSelectedAddressId("manual");
              setCity(e.target.value);
            }}
            placeholder={t("checkout.city")}
            autoComplete="address-level2"
            className={fieldClass}
          />
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setSelectedAddressId("manual");
              setAddress(e.target.value);
            }}
            placeholder={t("checkout.address")}
            autoComplete="street-address"
            className={fieldClass}
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("checkout.comment")}
            rows={2}
            className={fieldClass + " resize-none"}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <fieldset className="space-y-2">
            <legend className="px-0.5 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
              {t("checkout.deliveryMethod")}
            </legend>
            <div className="grid gap-2">
              {deliveryOptions.map((option) => (
                <label key={option.value} className={compactOptionClass}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={option.value}
                    checked={deliveryMethod === option.value}
                    onChange={() => setDeliveryMethod(option.value)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-stone-900"
                  />
                  <span>
                    <span className="block text-sm font-medium text-stone-900">
                      {option.label}
                    </span>
                    {deliveryMethod === option.value && (
                      <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                        {option.description}
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="px-0.5 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
              {t("checkout.paymentMethod")}
            </legend>
            <div className="grid gap-2">
              {paymentOptions.map((option) => (
                <label key={option.value} className={compactOptionClass}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={() => setPaymentMethod(option.value)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-stone-900"
                  />
                  <span>
                    <span className="block text-sm font-medium text-stone-900">
                      {option.label}
                    </span>
                    {paymentMethod === option.value && (
                      <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                        {option.description}
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
              {t("checkout.checkOrder")}
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <SummaryRow label={t("checkout.customer")} value={name} />
              <SummaryRow label={t("checkout.phone").replace(" *", "")} value={phone} />
              <SummaryRow label={t("checkout.address")} value={[city, address].filter(Boolean).join(", ")} />
              <SummaryRow label={t("checkout.delivery")} value={selectedDeliveryLabel} />
              <SummaryRow label={t("checkout.paymentMethod")} value={selectedPaymentLabel} />
              <SummaryRow label={t("checkout.amount")} value={formatPrice(total, locale)} strong />
            </dl>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-emerald-900">
            {t("checkout.afterOrder")}
          </div>

          <label className="flex items-start gap-2.5 text-xs text-stone-500">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-stone-900"
            />
            <span>
              {t("checkout.consent")}{" "}
              <Link
                href={withLocalePath("/info/politika-konfidentsialnosti", locale)}
                target="_blank"
                className="text-stone-800 underline underline-offset-2 transition hover:text-stone-950"
              >
                {t("checkout.privacyPolicy")}
              </Link>{" "}
              {t("checkout.consentRest")}
            </span>
          </label>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? t("checkout.placing") : step === "contacts" ? t("checkout.continue") : t("checkout.placeOrder")}
      </button>
      {step === "details" ? (
        <p className="text-center text-xs text-stone-400">
          {t("checkout.dataUse")}
        </p>
      ) : (
        <p className="text-center text-xs text-stone-400">
          {t("checkout.nextStepHint")}
        </p>
      )}
    </form>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-stone-400">{label}</dt>
      <dd className={"text-right " + (strong ? "font-semibold text-stone-950" : "text-stone-700")}>
        {value || "—"}
      </dd>
    </div>
  );
}