import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { OwnerCenter } from "@/lib/admin/operations";
import ReminderList from "@/components/admin/ReminderList";
import WishlistLeadsTable from "@/components/admin/WishlistLeadsTable";

const priorityClass = {
  urgent: "border-[#A01D26] bg-[#A01D26]/5 text-[#A01D26]",
  medium: "border-amber-300 bg-amber-50 text-amber-800",
  low: "border-stone-200 bg-stone-50 text-stone-700",
};

export default function OwnerTaskCenter({ data }: { data: OwnerCenter }) {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-stone-950 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
          Owner Command Center
        </p>
        <h2 className="mt-2 font-serif text-3xl">Что требует внимания сегодня</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-300">
          Админка собрала заказы, оплату, остатки, аналитику товаров и напоминания в один рабочий список.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Задачи владельца
          </h3>
          {data.tasks.length === 0 ? (
            <p className="text-sm text-stone-400">Критичных задач нет.</p>
          ) : (
            <div className="space-y-3">
              {data.tasks.map((task) => (
                <Link
                  key={task.title}
                  href={task.href}
                  className={`block rounded-xl border p-4 transition hover:shadow-sm ${priorityClass[task.priority]}`}
                >
                  <p className="font-medium">{task.title}</p>
                  <p className="mt-1 text-sm opacity-80">{task.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <ReminderList reminders={data.reminders} returnTo="/admin" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Умные рекомендации по товарам
          </h3>
          {data.productRecommendations.length === 0 ? (
            <p className="text-sm text-stone-400">Пока нет сигналов.</p>
          ) : (
            <ul className="space-y-3">
              {data.productRecommendations.map((product) => (
                <li key={product.slug} className="border-b border-stone-100 pb-3 last:border-0">
                  <p className="font-medium text-stone-900">{product.title}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    Просмотры: {product.views} · Избранное: {product.wishlistAdds} · Корзина: {product.cartAdds} · Покупки: {product.purchases}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {product.signals.map((signal) => (
                      <span key={signal} className="rounded-full bg-amber-50 px-2 py-1 text-[11px] text-amber-800">
                        {signal}
                      </span>
                    ))}
                    <span className="rounded-full bg-stone-100 px-2 py-1 text-[11px] text-stone-600">
                      Проверьте цену, фото, цвета или описание
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 ring-1 ring-stone-200">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Клиенты с избранным
            </h3>
            <Link href="/admin/analytics" className="text-sm text-[#A01D26] hover:underline">
              Все →
            </Link>
          </div>
          <WishlistLeadsTable leads={data.wishlistLeads} compact />
        </div>

        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Повторные и спящие клиенты
          </h3>
          {data.repeatCustomers.length === 0 ? (
            <p className="text-sm text-stone-400">Пока нет клиентов для повторной коммуникации.</p>
          ) : (
            <ul className="space-y-3">
              {data.repeatCustomers.map((customer) => (
                <li key={customer.id} className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3 last:border-0">
                  <div>
                    <Link href={`/admin/customers/${customer.id}`} className="font-medium text-stone-900 hover:text-[#A01D26]">
                      {customer.name}
                    </Link>
                    <p className="text-xs text-stone-400">
                      {customer.ordersCount} заказ(а) · {formatPrice(customer.totalSpent)}
                    </p>
                  </div>
                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">
                    {customer.kind === "sleeping" ? "давно не покупал" : "повторный"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
