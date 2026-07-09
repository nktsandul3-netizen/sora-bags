import type { Product } from "@/lib/types";
import { defaultLocale, type Locale } from "@/lib/i18n";

export function getDeliveryInfo(product: Pick<Product, "status">, locale: Locale = defaultLocale) {
  const copy = deliveryCopy[locale] ?? deliveryCopy[defaultLocale];
  if (product.status === "in_stock") {
    return copy.in_stock;
  }

  if (product.status === "out_of_stock") {
    return copy.out_of_stock;
  }

  return copy.pre_order;
}

const deliveryCopy = {
  ru: {
    in_stock: {
      badge: "✓ В наличии, доставка 1–3 дня",
      title: "Можно купить сейчас",
      leadTime: "Срок доставки: 1–3 дня.",
      description: "Товар есть в наличии. После оформления заказа мы подтвердим детали доставки.",
    },
    out_of_stock: {
      badge: "Нет в наличии",
      title: "Временно нет в наличии",
      leadTime: "Оставьте запрос — мы сообщим, когда товар снова появится.",
      description: "Этот товар сейчас недоступен для покупки. Свяжитесь с нами, чтобы уточнить сроки поступления.",
    },
    pre_order: {
      badge: "Под заказ (7–14 дней)",
      title: "Можно купить сейчас",
      leadTime: "Срок доставки: 7–14 рабочих дней.",
      description: "Товар доступен для покупки. После оформления заказа наша команда свяжется с вами для подтверждения деталей доставки.",
    },
  },
  ro: {
    in_stock: {
      badge: "✓ În stoc, livrare 1–3 zile",
      title: "Disponibil acum",
      leadTime: "Livrare: 1–3 zile.",
      description: "Produsul este în stoc. După plasarea comenzii confirmăm detaliile livrării.",
    },
    out_of_stock: {
      badge: "Indisponibil",
      title: "Temporar indisponibil",
      leadTime: "Lăsați o cerere — vă anunțăm când revine în stoc.",
      description: "Produsul nu este disponibil momentan. Contactați-ne pentru termene.",
    },
    pre_order: {
      badge: "La comandă (7–14 zile)",
      title: "Disponibil pentru comandă",
      leadTime: "Livrare: 7–14 zile lucrătoare.",
      description: "Produsul poate fi comandat. După plasarea comenzii confirmăm detaliile livrării.",
    },
  },
  en: {
    in_stock: {
      badge: "✓ In stock, delivery 1–3 days",
      title: "Available now",
      leadTime: "Delivery time: 1–3 days.",
      description: "The item is in stock. After placing the order we will confirm delivery details.",
    },
    out_of_stock: {
      badge: "Out of stock",
      title: "Temporarily unavailable",
      leadTime: "Leave a request — we will notify you when it is back.",
      description: "This item is currently unavailable. Contact us to check restock timing.",
    },
    pre_order: {
      badge: "Pre-order (7–14 days)",
      title: "Available to order",
      leadTime: "Delivery time: 7–14 business days.",
      description: "The item is available to order. After placing the order we will confirm delivery details.",
    },
  },
} satisfies Record<Locale, Record<string, { badge: string; title: string; leadTime: string; description: string }>>;