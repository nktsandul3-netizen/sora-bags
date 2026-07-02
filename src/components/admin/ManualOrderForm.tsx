"use client";

import { useActionState } from "react";
import { createManualOrderAction, type ActionState } from "@/app/admin/actions";
import { deliveryOptions, paymentOptions } from "@/lib/order-options";

const initial: ActionState = {};
const fieldClass =
  "w-full border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]";

export default function ManualOrderForm() {
  const [state, action, pending] = useActionState(createManualOrderAction, initial);

  return (
    <form action={action} className="space-y-6">
      <div className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Клиент
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" placeholder="Имя клиента *" className={fieldClass} />
          <input name="phone" placeholder="Телефон *" className={fieldClass} />
          <input name="email" placeholder="Email" className={fieldClass} />
          <input name="city" placeholder="Город" className={fieldClass} />
          <input
            name="address"
            placeholder="Адрес доставки"
            className={fieldClass + " sm:col-span-2"}
          />
          <input
            name="comment"
            placeholder="Комментарий"
            className={fieldClass + " sm:col-span-2"}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Доставка
          </h2>
          <select name="deliveryMethod" className={fieldClass} defaultValue="courier_chisinau">
            {deliveryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Оплата
          </h2>
          <select name="paymentMethod" className={fieldClass} defaultValue="cash_on_delivery">
            {paymentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Товары
        </h2>
        <textarea
          name="items"
          rows={6}
          placeholder={"Одна строка = один товар:\nНазвание | Цвет | Кол-во | Цена\nНапример:\nSuede Fringe Shoulder Bag | Taupe | 1 | 1600"}
          className={fieldClass + " resize-y font-mono"}
        />
        <p className="mt-2 text-xs text-stone-400">
          Цена указывается за 1 шт. Итоговая сумма посчитается автоматически.
        </p>
      </div>

      {state.error && <p className="bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-[#A01D26] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Создаём…" : "Создать заказ"}
      </button>
    </form>
  );
}
