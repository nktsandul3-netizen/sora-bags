import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { getCustomerById } from "@/lib/admin/customers";
import { listCustomerCrmNotes } from "@/lib/admin/operations";
import { OrderStatusBadge } from "@/components/admin/Badges";
import CustomerCrmPanel from "@/components/admin/CustomerCrmPanel";
import ReminderForm from "@/components/admin/ReminderForm";

export const dynamic = "force-dynamic";

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [customer, crmNotes] = await Promise.all([
    getCustomerById(id),
    listCustomerCrmNotes(id),
  ]);
  if (!customer) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/customers" className="text-sm text-stone-500 hover:text-[#A01D26]">
          ← К клиентам
        </Link>
        <h1 className="mt-2 font-serif text-3xl text-stone-900">{customer.name}</h1>
        <p className="mt-1 text-sm text-stone-500">
          Регистрация: {new Date(customer.createdAt).toLocaleDateString("ru-RU")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Заказов" value={String(customer.ordersCount)} />
        <Stat label="Сумма покупок" value={formatPrice(customer.totalSpent)} />
        <Stat label="Роль" value={customer.role === "admin" ? "Администратор" : "Клиент"} />
      </div>

      <div className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Контакты
        </h2>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-4 sm:block">
            <dt className="text-stone-400">E-mail</dt>
            <dd className="text-stone-800">{customer.email}</dd>
          </div>
          {customer.phone && (
            <div className="flex justify-between gap-4 sm:block">
              <dt className="text-stone-400">Телефон</dt>
              <dd className="text-stone-800">{customer.phone}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <CustomerCrmPanel customerId={customer.id} notes={crmNotes} />
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Напоминание по клиенту
          </h2>
          <ReminderForm
            targetType="customer"
            targetId={customer.id}
            targetLabel={customer.name}
            returnTo={`/admin/customers/${customer.id}`}
          />
        </section>
      </div>

      <div className="bg-white ring-1 ring-stone-200">
        <h2 className="border-b border-stone-200 px-6 py-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          История заказов
        </h2>
        {customer.orders.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-stone-400">Заказов нет</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                  <th className="px-6 py-3 font-medium">Номер</th>
                  <th className="px-6 py-3 font-medium">Дата</th>
                  <th className="px-6 py-3 font-medium">Статус</th>
                  <th className="px-6 py-3 text-right font-medium">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map((o) => (
                  <tr key={o.id} className="border-t border-stone-100 hover:bg-stone-50">
                    <td className="px-6 py-3">
                      <Link href={`/admin/orders/${o.id}`} className="font-medium text-stone-900 hover:text-[#A01D26]">
                        {o.number}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-stone-500">
                      {new Date(o.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-6 py-3">
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-stone-900">
                      {formatPrice(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-5 ring-1 ring-stone-200">
      <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-2 font-serif text-xl text-stone-900">{value}</p>
    </div>
  );
}