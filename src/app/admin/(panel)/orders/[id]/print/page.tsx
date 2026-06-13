import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { getOrderById } from "@/lib/admin/orders";
import { getSettings } from "@/lib/admin/settings";
import { ORDER_STATUS_LABELS } from "@/lib/admin/constants";
import PrintControls from "@/components/admin/PrintControls";

export const dynamic = "force-dynamic";

export default async function PrintInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [order, settings] = await Promise.all([getOrderById(id), getSettings()]);
  if (!order) notFound();

  const storeName = settings.store.name ?? "SÓRA";

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 text-stone-900 print:p-4">
      <PrintControls orderId={order.id} />

      <header className="mb-8 border-b border-stone-200 pb-6">
        <h1 className="font-serif text-3xl">{storeName}</h1>
        <p className="mt-1 text-sm text-stone-500">
          Счёт № {order.number} · {new Date(order.createdAt).toLocaleDateString("ru-RU")}
        </p>
      </header>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 text-sm">
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">Клиент</p>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-stone-600">{order.customer.phone}</p>
          {order.customer.email && <p className="text-stone-600">{order.customer.email}</p>}
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">Доставка</p>
          {order.shippingAddress ? (
            <>
              <p>{order.shippingAddress.recipient}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.street}
              </p>
              <p>{order.shippingAddress.phone}</p>
            </>
          ) : order.customer.city ? (
            <p>{order.customer.city}</p>
          ) : (
            <p>—</p>
          )}
          {order.trackingNumber && (
            <p className="mt-2">
              Трек: <span className="font-medium text-[#A01D26]">{order.trackingNumber}</span>
            </p>
          )}
        </div>
      </div>

      <table className="mb-6 w-full text-sm">
        <thead>
          <tr className="border-b-2 border-stone-200 text-left text-xs uppercase tracking-wide text-stone-400">
            <th className="py-2">Товар</th>
            <th className="py-2">Цвет</th>
            <th className="py-2 text-center">Кол-во</th>
            <th className="py-2 text-right">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((it, i) => (
            <tr key={i} className="border-b border-stone-100">
              <td className="py-3">{it.title}</td>
              <td className="py-3 text-stone-600">{it.color}</td>
              <td className="py-3 text-center text-stone-600">{it.qty}</td>
              <td className="py-3 text-right">{formatPrice(it.price * it.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-end justify-between">
        <p className="text-sm text-stone-500">Статус: {ORDER_STATUS_LABELS[order.status]}</p>
        <p className="font-serif text-2xl">Итого: {formatPrice(order.total)}</p>
      </div>
    </div>
  );
}