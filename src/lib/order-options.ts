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
    description: "Мы свяжемся с вами и согласуем удобное время доставки.",
  },
  {
    value: "moldova_delivery",
    label: "Доставка по Молдове",
    description: "Отправим заказ после подтверждения деталей с менеджером.",
  },
  {
    value: "pickup",
    label: "Самовывоз по согласованию",
    description: "Подойдёт, если хотите забрать заказ лично после подтверждения.",
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
    description: "Наличными или другим согласованным способом при получении заказа.",
  },
  {
    value: "bank_transfer",
    label: "Банковский перевод / оплата по ссылке",
    description: "Менеджер отправит реквизиты или ссылку после подтверждения заказа.",
  },
];

const localizedDelivery: Record<Locale, typeof deliveryOptions> = {
  ru: deliveryOptions,
  ro: [
    { value: "courier_chisinau", label: "Curier în Chișinău", description: "Vă contactăm și stabilim ora convenabilă pentru livrare." },
    { value: "moldova_delivery", label: "Livrare în Moldova", description: "Trimitem comanda după confirmarea detaliilor cu managerul." },
    { value: "pickup", label: "Ridicare cu confirmare", description: "Potrivit dacă doriți să ridicați comanda personal după confirmare." },
  ],
  en: [
    { value: "courier_chisinau", label: "Courier in Chișinău", description: "We will contact you and agree on a convenient delivery time." },
    { value: "moldova_delivery", label: "Delivery across Moldova", description: "We will ship the order after confirming details with a manager." },
    { value: "pickup", label: "Pickup by arrangement", description: "Suitable if you want to collect the order personally after confirmation." },
  ],
};

const localizedPayments: Record<Locale, typeof paymentOptions> = {
  ru: paymentOptions,
  ro: [
    { value: "cash_on_delivery", label: "Plată la primire", description: "În numerar sau prin altă metodă agreată la primirea comenzii." },
    { value: "bank_transfer", label: "Transfer bancar / plată prin link", description: "Managerul va trimite detaliile sau linkul după confirmarea comenzii." },
  ],
  en: [
    { value: "cash_on_delivery", label: "Payment on delivery", description: "Cash or another agreed method when receiving the order." },
    { value: "bank_transfer", label: "Bank transfer / payment link", description: "The manager will send details or a link after confirming the order." },
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
