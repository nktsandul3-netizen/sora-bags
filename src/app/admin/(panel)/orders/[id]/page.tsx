import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { getOrderById } from "@/lib/admin/orders";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import OrderNoteForm from "@/components/admin/OrderNoteForm";
import OrderTimeline from "@/components/admin/OrderTimeline";
import TrackingForm from "@/components/admin/TrackingForm";
import { OrderPaymentStatusBadge } from "@/components/admin/Badges";
import OrderQuickActions from "@/components/admin/OrderQuickActions";
import OrderProcessingChecklist from "@/components/admin/OrderProcessingChecklist";
import ReminderForm from "@/components/admin/ReminderForm";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();
  const fullAddress = [order.customer.city, order.customer.address].filter(Boolean).join(", ");

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/orders" className="text-sm text-stone-500 hover:text-[#A01D26]">
          ← К заказам
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl text-stone-900">{order.number}</h1>
            <p className="mt-1 text-sm text-stone-500">
              {new Date(order.createdAt).toLocaleString("ru-RU")}
            </p>
          </div>
          <Link
            href={`/admin/orders/${order.id}/print`}
            target="_blank"
            className="border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:border-[#A01D26]"
          >
            Печать счёта
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="bg-white p-6 ring-1 ring-stone-200">
            <OrderProcessingChecklist
              orderId={order.id}
              checklist={order.processingChecklist}
            />
          </div>

          <div className="bg-white ring-1 ring-stone-200">
            <h2 className="border-b border-stone-200 px-6 py-4 text-sm font-medium uppercase tracking-wide text-stone-500">
              Состав заказа
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                    <th className="px-6 py-3 font-medium">Товар</th>
                    <th className="px-6 py-3 font-medium">Цвет</th>
                    <th className="px-6 py-3 text-center font-medium">Кол-во</th>
                    <th className="px-6 py-3 text-right font-medium">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it, i) => (
                    <tr key={i} className="border-t border-stone-100">
                      <td className="px-6 py-3 text-stone-900">{it.title}</td>
                      <td className="px-6 py-3 text-stone-600">{it.color}</td>
                      <td className="px-6 py-3 text-center text-stone-600">{it.qty}</td>
                      <td className="px-6 py-3 text-right text-stone-900">
                        {formatPrice(it.price * it.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-stone-200">
                    <td colSpan={3} className="px-6 py-3 text-right font-medium text-stone-500">
                      Итого
                    </td>
                    <td className="px-6 py-3 text-right font-serif text-lg text-stone-900">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 ring-1 ring-stone-200">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
              История заказа
            </h2>
            <OrderTimeline events={order.timeline} />
          </div>

          <div className="bg-white p-6 ring-1 ring-stone-200">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
              Заметки ({order.notes.length})
            </h2>
            {order.notes.length > 0 && (
              <ul className="mb-4 space-y-3">
                {order.notes.map((n, i) => (
                  <li key={i} className="border-l-2 border-[#A01D26]/40 bg-stone-50 px-4 py-2">
                    <p className="text-sm text-stone-800">{n.text}</p>
                    <p className="mt-1 text-xs text-stone-400">
                      {n.author} · {new Date(n.createdAt).toLocaleString("ru-RU")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <OrderNoteForm orderId={order.id} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 ring-1 ring-stone-200">
            <OrderStatusForm orderId={order.id} current={order.status} />
          </div>

          <div className="bg-white p-6 ring-1 ring-stone-200">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
              Напоминание по заказу
            </h2>
            <ReminderForm
              targetType="order"
              targetId={order.id}
              targetLabel={order.number}
              returnTo={`/admin/orders/${order.id}`}
            />
          </div>

          <div className="bg-white p-6 ring-1 ring-stone-200">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-stone-500">
              Оплата
            </h2>
            <OrderPaymentStatusBadge status={order.paymentStatus} />
            {order.paymentMethod && (
              <p className="mt-3 text-sm text-stone-700">{order.paymentMethod}</p>
            )}
            <p className="mt-3 text-xs leading-relaxed text-stone-500">
              Подготовлено для будущего подключения PayNet, MAIB eCommerce или Stripe:
              после успешного callback/webhook статус будет обновляться автоматически.
            </p>
          </div>

          {order.deliveryMethod && (
            <div className="bg-white p-6 ring-1 ring-stone-200">
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-stone-500">
                Доставка
              </h2>
              <p className="text-sm text-stone-700">{order.deliveryMethod}</p>
            </div>
          )}

          <div className="bg-white p-6 ring-1 ring-stone-200">
            <TrackingForm orderId={order.id} current={order.trackingNumber} />
          </div>

          <div className="bg-white p-6 ring-1 ring-stone-200">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
              Клиент
            </h2>
            <OrderQuickActions
              orderNumber={order.number}
              customerName={order.customer.name}
              phone={order.customer.phone}
              email={order.customer.email}
              address={fullAddress}
            />
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Имя" value={order.customer.name} />
              <Row label="Телефон" value={order.customer.phone} />
              {order.customer.email && <Row label="E-mail" value={order.customer.email} />}
              {order.customer.city && <Row label="Город" value={order.customer.city} />}
              {order.customer.address && <Row label="Адрес" value={order.customer.address} />}
              {order.customer.comment && <Row label="Комментарий" value={order.customer.comment} />}
            </dl>
            {order.userId && (
              <Link
                href={`/admin/customers/${order.userId}`}
                className="mt-4 inline-block text-sm text-[#A01D26] hover:underline"
              >
                Профиль клиента →
              </Link>
            )}
          </div>

          {order.shippingAddress && (
            <div className="bg-white p-6 ring-1 ring-stone-200">
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
                Адрес доставки
              </h2>
              <dl className="space-y-2 text-sm">
                <Row label="Получатель" value={order.shippingAddress.recipient} />
                <Row label="Телефон" value={order.shippingAddress.phone} />
                <Row label="Город" value={order.shippingAddress.city} />
                <Row label="Адрес" value={order.shippingAddress.street} />
                {order.shippingAddress.comment && (
                  <Row label="Комментарий" value={order.shippingAddress.comment} />
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-stone-400">{label}</dt>
      <dd className="text-right text-stone-800">{value}</dd>
    </div>
  );
}