import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { listOrders } from "@/lib/admin/orders";
import { ORDER_STATUSES } from "@/lib/admin/constants";
import type { OrderStatus } from "@/lib/mongodb";
import { OrderPaymentStatusBadge, OrderStatusBadge } from "@/components/admin/Badges";
import OrdersToolbar from "@/components/admin/OrdersToolbar";
import Pagination from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

function parseStatus(value?: string): OrderStatus | "paid" | "all" {
  if (value === "paid") return "paid";
  if (value && ORDER_STATUSES.includes(value as OrderStatus)) return value as OrderStatus;
  return "all";
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim() || undefined;
  const status = parseStatus(sp.status);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const result = await listOrders({ search, status, page, pageSize: 20 });

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-stone-900">Заказы</h1>
          <p className="mt-1 text-sm text-stone-500">Всего: {result.total}</p>
        </div>
      </header>

      <OrdersToolbar />

      <div className="bg-white ring-1 ring-stone-200">
        {result.orders.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-stone-400">Ничего не найдено</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                  <th className="px-5 py-3 font-medium">Номер</th>
                  <th className="px-5 py-3 font-medium">Клиент</th>
                  <th className="px-5 py-3 font-medium">Телефон</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 text-right font-medium">Сумма</th>
                  <th className="px-5 py-3 font-medium">Статус оплаты</th>
                  <th className="px-5 py-3 font-medium">Статус заказа</th>
                  <th className="px-5 py-3 font-medium">Дата создания</th>
                </tr>
              </thead>
              <tbody>
                {result.orders.map((o) => (
                  <tr key={o.id} className="border-t border-stone-100 hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders/${o.id}`} className="font-medium text-stone-900 hover:text-[#A01D26]">
                        {o.number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-stone-600">{o.customerName}</td>
                    <td className="px-5 py-3 text-stone-500">{o.customerPhone || "—"}</td>
                    <td className="px-5 py-3 text-stone-500">{o.customerEmail || "—"}</td>
                    <td className="px-5 py-3 text-right font-medium text-stone-900">
                      {formatPrice(o.total)}
                    </td>
                    <td className="px-5 py-3">
                      <OrderPaymentStatusBadge status={o.paymentStatus} />
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-stone-500">
                      {new Date(o.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        basePath="/admin/orders"
        baseQuery={{ search, status: status === "all" ? undefined : status }}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}