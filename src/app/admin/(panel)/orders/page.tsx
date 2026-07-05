import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { listOrders } from "@/lib/admin/orders";
import { orderPriority } from "@/lib/admin/operations";
import type { OrderOperationFlag } from "@/lib/admin/operations";
import { ORDER_STATUSES } from "@/lib/admin/constants";
import type { OrderKind, OrderStatus } from "@/lib/mongodb";
import { OrderPaymentStatusBadge, OrderStatusBadge } from "@/components/admin/Badges";
import OrderListQuickActions from "@/components/admin/OrderListQuickActions";
import OrdersToolbar from "@/components/admin/OrdersToolbar";
import Pagination from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

function parseStatus(value?: string): OrderStatus | "paid" | "all" {
  if (value === "paid") return "paid";
  if (value && ORDER_STATUSES.includes(value as OrderStatus)) return value as OrderStatus;
  return "all";
}

function parseOrderKind(value?: string): OrderKind | "all" {
  return value === "preorder" || value === "standard" ? value : "all";
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; kind?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim() || undefined;
  const status = parseStatus(sp.status);
  const orderKind = parseOrderKind(sp.kind);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const result = await listOrders({ search, status, orderKind, page, pageSize: 20 });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-stone-900">Заказы</h1>
          <p className="mt-1 text-sm text-stone-500">Всего: {result.total}</p>
        </div>
        <Link
          href="/admin/orders/new"
          className="bg-[#A01D26] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          + Создать заказ
        </Link>
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
                  <th className="px-5 py-3 font-medium">Дата</th>
                  <th className="px-5 py-3 font-medium">Клиент</th>
                  <th className="px-5 py-3 font-medium">Телефон</th>
                  <th className="px-5 py-3 text-right font-medium">Сумма</th>
                  <th className="px-5 py-3 font-medium">Статус оплаты</th>
                  <th className="px-5 py-3 font-medium">Статус заказа</th>
                  <th className="px-5 py-3 font-medium">Действия</th>
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
                    <td className="whitespace-nowrap px-5 py-3 text-stone-500">
                      {new Date(o.createdAt).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3 text-stone-600">{o.customerName}</td>
                    <td className="px-5 py-3 text-stone-500">{o.customerPhone || "—"}</td>
                    <td className="px-5 py-3 text-right font-medium text-stone-900">
                      {formatPrice(o.total)}
                    </td>
                    <td className="px-5 py-3">
                      <OrderPaymentStatusBadge status={o.paymentStatus} />
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusBadge status={o.status} />
                      {o.orderKind === "preorder" && (
                        <span className="mt-1 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                          Предзаказ
                        </span>
                      )}
                      <OrderPriorityBadges flags={orderPriority(o).flags} />
                    </td>
                    <td className="px-5 py-3">
                      <OrderListQuickActions
                        orderNumber={o.number}
                        customerName={o.customerName}
                        phone={o.customerPhone}
                      />
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

function OrderPriorityBadges({ flags }: { flags: OrderOperationFlag[] }) {
  if (flags.length === 0) return null;
  const labels: Record<OrderOperationFlag, string> = {
    urgent: "Срочно",
    uncontacted: "Не связались",
    awaitingPayment: "Ждёт оплаты",
    awaitingShipment: "Ждёт отправки",
  };
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {flags.map((flag) => (
        <span
          key={flag}
          className={
            "rounded-full px-2 py-0.5 text-[10px] font-medium " +
            (flag === "urgent"
              ? "bg-[#A01D26]/10 text-[#A01D26]"
              : "bg-amber-50 text-amber-800")
          }
        >
          {labels[flag]}
        </span>
      ))}
    </div>
  );
}