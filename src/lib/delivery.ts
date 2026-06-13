import type { Product } from "@/lib/types";

export function getDeliveryInfo(product: Pick<Product, "status">) {
  if (product.status === "in_stock") {
    return {
      badge: "В наличии",
      title: "Можно купить сейчас",
      leadTime: "Срок доставки: 1–2 рабочих дня.",
      description:
        "Товар есть в наличии. После оформления заказа мы подтвердим детали доставки.",
    };
  }

  if (product.status === "out_of_stock") {
    return {
      badge: "Нет в наличии",
      title: "Временно нет в наличии",
      leadTime: "Оставьте запрос — мы сообщим, когда товар снова появится.",
      description:
        "Этот товар сейчас недоступен для покупки. Свяжитесь с нами, чтобы уточнить сроки поступления.",
    };
  }

  return {
    badge: "Доставка 7–14 дней",
    title: "Можно купить сейчас",
    leadTime: "Срок доставки: 7–14 рабочих дней.",
    description:
      "Товар доступен для покупки. После оформления заказа наша команда свяжется с вами для подтверждения деталей доставки.",
  };
}