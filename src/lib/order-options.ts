import { defaultLocale, type Locale } from "@/lib/i18n";

export type DeliveryMethod = "courier_chisinau" | "moldova_delivery" | "pickup";
export type CustomerPaymentMethod = "cash_on_delivery" | "bank_transfer";

export const deliveryOptions: {
  value: DeliveryMethod;
  label: string;
  description: string;
}[] = [
  {
    value: "courier_chisinau",
    label: "Курьер по Кишинёву",
    description: "Согласуем удобное время",
  },
  {
    value: "moldova_delivery",
    label: "Доставка по Молдове",
    description: "После подтверждения менеджером",
  },
  {
    value: "pickup",
    label: "Самовывоз по согласованию",
    description: "Заберёте после подтверждения",
  },
];

export const paymentOptions: {
  value: CustomerPaymentMethod;
  label: string;
  description: string;
}[] = [
  {
    value: "cash_on_delivery",
    label: "Оплата при получении",
    description: "Наличными или по согласованию",
  },
  {
    value: "bank_transfer",
    label: "Банковский перевод",
    description: "Счёт-фактура и ссылка для оплаты",
  },
];

const localizedDelivery: Record<Locale, typeof deliveryOptions> = {
  ru: deliveryOptions,
  ro: [
    { value: "courier_chisinau", label: "Curier în Chișinău", description: "Stabilim ora convenabilă" },
    { value: "moldova_delivery", label: "Livrare în Moldova", description: "După confirmare cu managerul" },
    { value: "pickup", label: "Ridicare cu confirmare", description: "Ridicați după confirmare" },
  ],
  en: [
    { value: "courier_chisinau", label: "Courier in Chișinău", description: "We'll agree a convenient time" },
    { value: "moldova_delivery", label: "Delivery across Moldova", description: "After manager confirmation" },
    { value: "pickup", label: "Pickup by arrangement", description: "Collect after confirmation" },
  ],
};

const localizedPayments: Record<Locale, typeof paymentOptions> = {
  ru: paymentOptions,
  ro: [
    { value: "cash_on_delivery", label: "Plată la livrare", description: "Numerar sau după acord" },
    { value: "bank_transfer", label: "Transfer bancar", description: "Factură și link de plată" },
  ],
  en: [
    { value: "cash_on_delivery", label: "Payment on delivery", description: "Cash or by arrangement" },
    { value: "bank_transfer", label: "Bank transfer", description: "Invoice and payment link" },
  ],
};

export function getDeliveryOptions(locale: Locale = defaultLocale) {
  return localizedDelivery[locale] ?? deliveryOptions;
}

export function getPaymentOptions(locale: Locale = defaultLocale) {
  return localizedPayments[locale] ?? paymentOptions;
}

export function getDeliveryLabel(value?: string, locale: Locale = defaultLocale) {
  return getDeliveryOptions(locale).find((option) => option.value === value)?.label;
}

export function getPaymentLabel(value?: string, locale: Locale = defaultLocale) {
  return getPaymentOptions(locale).find((option) => option.value === value)?.label;
}
