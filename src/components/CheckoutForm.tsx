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
import type { PurchaseKind } from "@/lib/purchase-kind";
import { useLocale, useT } from "@/lib/useI18n";
import { withLocalePath } from "@/lib/i18n";
import { getAddressLabelDisplay } from "@/lib/address-label";

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  mode: PurchaseKind;
  onSuccess: (order: { id: string; number: string; kind: PurchaseKind }) => void;
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

export default function CheckoutForm({ items, total, mode, onSuccess }: CheckoutFormProps) {
  const { status } = useSession();
  const locale = useLocale();
  const t = useT();
  const isPreorder = mode === "preorder";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("manual");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("courier_chisinau");
  const [paymentMethod, setPaymentMethod] = useState<CustomerPaymentMethod>(
    isPreorder ? "bank_transfer" : "cash_on_delivery",
  );
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
          paymentMethod: isPreorder ? "bank_transfer" : paymentMethod,
          orderKind: mode,
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
            purchaseKind: it.purchaseKind,
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

      onSuccess({ id: body.orderId, number: body.orderNumber, kind: mode });
    } catch {
      setError(t("checkout.errConnection"));
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "h-14 w-full rounded-2xl border border-[#EDE9E5] bg-white px-5 text-[15px] text-[#1A1A1A] outline-none transition placeholder:text-stone-400 focus:border-[#1A1A1A]";
  const optionClass =
    "flex cursor-pointer items-start gap-3 rounded-2xl border border-[#EDE9E5] bg-white px-4 py-3 text-left transition has-[:checked]:border-[1.5px] has-[:checked]:border-black has-[:checked]:bg-[#FBF9F7]";
  const compactOptionClass =
    "flex cursor-pointer items-start gap-3 rounded-2xl border border-[#EDE9E5] bg-white px-[18px] py-4 text-left transition has-[:checked]:border-2 has-[:checked]:border-black has-[:checked]:bg-[#FBF9F7]";
  const radioClass =
    "mt-0 h-5 w-5 shrink-0 appearance-none rounded-full border border-[#1A1A1A]/40 bg-white transition checked:border-[#1A1A1A] checked:bg-[radial-gradient(circle,#1A1A1A_0_4px,transparent_4.5px)]";
  const deliveryOptions = getDeliveryOptions(locale);
  const paymentOptions = getPaymentOptions(locale);
  const selectedDeliveryLabel = getDeliveryLabel(deliveryMethod, locale) ?? "—";
  const selectedPaymentLabel = getPaymentLabel(paymentMethod, locale) ?? "—";
  const phoneLocked = status === "authenticated" && Boolean(phone.trim());
  const emailLocked = status === "authenticated" && Boolean(email.trim());
  const displayPhone = maskPhone(phone);
  const displayEmail = maskEmail(email);

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.14em] text-stone-400">
          {step === "contacts" ? t("checkout.step1") : t("checkout.step2")}
        </span>
        {step === "details" && (
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep("contacts");
            }}
            className="text-[14px] font-normal normal-case tracking-normal text-[#1A1A1A] opacity-50 transition hover:opacity-80"
          >
            {t("common.back")}
          </button>
        )}
      </div>

      {step === "contacts" ? (
        <div className="space-y-3">
          {savedAddresses.length > 0 && (
            <fieldset className="space-y-3">
              <legend className="mb-2 px-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#1A1A1A] opacity-50">
                {t("checkout.savedAddress")}
              </legend>
              <div className="grid gap-3">
                {savedAddresses.map((savedAddress) => (
                  <label key={savedAddress.id} className={optionClass}>
                    <input
                      type="radio"
                      name="savedAddress"
                      value={savedAddress.id}
                      checked={selectedAddressId === savedAddress.id}
                      onChange={() => applySavedAddress(savedAddress)}
                      className={radioClass}
                    />
                    <span>
                      <span className="flex items-baseline gap-2 text-sm font-medium leading-5 text-[#1A1A1A]">
                        {getAddressLabelDisplay(savedAddress.label, locale)}
                        {savedAddress.isDefault ? (
                          <span className="bg-transparent p-0 text-[10px] font-medium uppercase tracking-[0.08em] text-[#1A1A1A] opacity-40">
                            {t("checkout.defaultAddress")}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-5 text-stone-500">
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
                    className={radioClass}
                  />
                  <span className="block text-sm font-medium text-[#1A1A1A]">
                    {t("checkout.otherAddress")}
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
          {phoneLocked ? (
            <div className={`${fieldClass} flex items-center justify-between gap-3 text-stone-500`}>
              <span className="truncate">{displayPhone}</span>
              <LockIcon />
            </div>
          ) : (
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
          )}
          {emailLocked ? (
            <div className={`${fieldClass} flex items-center justify-between gap-3 text-stone-500`}>
              <span className="truncate">{displayEmail}</span>
              <LockIcon />
            </div>
          ) : (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("checkout.email")}
              autoComplete="email"
              className={fieldClass}
            />
          )}
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
            className={fieldClass + " h-auto min-h-14 resize-none py-4"}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <fieldset className="space-y-2.5">
            <legend className="px-0.5 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
              {t("checkout.deliveryMethod")}
            </legend>
            <div className="grid gap-2.5">
              {deliveryOptions.map((option) => (
                <label key={option.value} className={compactOptionClass}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={option.value}
                    checked={deliveryMethod === option.value}
                    onChange={() => setDeliveryMethod(option.value)}
                    className={radioClass}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-5 text-[#1A1A1A]">
                      {option.label}
                    </span>
                    {deliveryMethod === option.value && (
                      <span className="mt-0.5 block max-w-[90%] whitespace-normal text-[13px] leading-[18px] text-[#1A1A1A] opacity-55">
                        {option.description}
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {!isPreorder && (
            <fieldset className="space-y-2.5">
              <legend className="px-0.5 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
                {t("checkout.paymentMethod")}
              </legend>
              <div className="grid gap-2.5">
                {paymentOptions.map((option) => (
                  <label key={option.value} className={compactOptionClass}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => setPaymentMethod(option.value)}
                      className={radioClass}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-5 text-[#1A1A1A]">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block max-w-[90%] whitespace-normal text-[13px] leading-[18px] text-[#1A1A1A] opacity-55">
                        {option.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="px-0.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#1A1A1A] opacity-40">
              {t("checkout.checkOrder")}
            </p>
            <dl className="mt-2 space-y-1.5">
              <SummaryRow label={t("checkout.customer")} value={name} />
              <SummaryRow
                label={t("checkout.phone").replace(" *", "")}
                value={phoneLocked ? displayPhone : phone}
              />
              {email ? (
                <SummaryRow
                  label={t("checkout.email").replace(" *", "")}
                  value={emailLocked ? displayEmail : email}
                />
              ) : null}
              <SummaryRow
                label={t("checkout.address")}
                value={[city, address].filter(Boolean).join(", ")}
                wrap
              />
              <SummaryRow label={t("checkout.delivery")} value={selectedDeliveryLabel} />
              {!isPreorder && (
                <SummaryRow label={t("checkout.paymentMethod")} value={selectedPaymentLabel} />
              )}
              <SummaryRow label={t("checkout.amount")} value={formatPrice(total, locale)} strong />
            </dl>
          </div>

          <div className="flex items-start gap-2.5 px-0.5 text-[13px] leading-snug text-[#1A1A1A] opacity-60">
            <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <circle cx="8" cy="8" r="6.25" />
              <path d="M5.2 8.1 7.1 10l3.7-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{isPreorder ? t("checkout.preorderAfterSubmit") : t("checkout.afterOrder")}</span>
          </div>

          <label className="flex items-start gap-3 text-[12px] leading-[18px] text-stone-500">
            <span className="relative mt-px inline-flex h-5 w-5 shrink-0">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="absolute -inset-2 z-10 cursor-pointer opacity-0"
              />
              <span
                aria-hidden
                className={
                  "pointer-events-none flex h-5 w-5 items-center justify-center rounded-[6px] border-[1.5px] transition " +
                  (consent ? "border-black bg-black" : "border-[#D9D3CF] bg-white")
                }
              >
                <svg
                  viewBox="0 0 12 12"
                  className={"h-3 w-3 text-white transition " + (consent ? "opacity-100" : "opacity-0")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M2.5 6.2 4.8 8.5 9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
            <span className="min-w-0 leading-[18px]">
              {t("checkout.consentPrefix")}{" "}
              <Link
                href={withLocalePath("/info/publichnaya-oferta", locale)}
                target="_blank"
                className="text-stone-800 underline underline-offset-2 transition hover:text-stone-950"
              >
                {t("checkout.termsLink")}
              </Link>
              ,{" "}
              <Link
                href={withLocalePath("/info/politika-konfidentsialnosti", locale)}
                target="_blank"
                className="text-stone-800 underline underline-offset-2 transition hover:text-stone-950"
              >
                {t("checkout.privacyPolicy")}
              </Link>{" "}
              {t("checkout.consentAnd")}{" "}
              <Link
                href={withLocalePath("/info/vozvrat", locale)}
                target="_blank"
                className="text-stone-800 underline underline-offset-2 transition hover:text-stone-950"
              >
                {t("checkout.returnsLink")}
              </Link>
              .
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
        className="flex h-14 w-full items-center justify-center rounded-full bg-black px-6 text-[14px] font-medium tracking-[0.04em] text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] outline-none ring-0 transition hover:bg-[#1A1A1A] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? isPreorder
            ? t("checkout.placingPreorder")
            : t("checkout.placing")
          : step === "contacts"
            ? t("checkout.continue")
            : isPreorder
              ? t("checkout.placePreorder")
              : t("checkout.placeOrder")}
      </button>
      {step === "details" ? (
        <p className="text-center text-[12px] text-[#1A1A1A] opacity-40">
          {isPreorder ? t("checkout.preorderHint") : t("checkout.dataUse")}
        </p>
      ) : (
        <p className="text-center text-[12px] text-[#1A1A1A] opacity-40">
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
  wrap = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  wrap?: boolean;
}) {
  const display = value || "—";

  return (
    <div className="grid grid-cols-[140px_1fr] items-start gap-x-3">
      <dt className="pt-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1A1A1A] opacity-40">
        {label}
      </dt>
      <dd
        className={
          "min-w-0 text-right text-[14px] font-medium text-[#1A1A1A] " +
          (strong ? "font-semibold" : "") +
          (wrap ? " leading-[1.4]" : " leading-5 truncate")
        }
      >
        {display}
      </dd>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" strokeLinecap="round" />
    </svg>
  );
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4) return value;
  return `•••• ${digits.slice(-4)}`;
}

function maskEmail(value: string) {
  const [local, domain] = value.split("@");
  if (!local || !domain) return value;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}•••@${domain}`;
}