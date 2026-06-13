import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { listPayments, getPaymentStats } from "@/lib/admin/payments";
import { PAYMENT_STATUSES, PAYMENT_METHOD_LABELS } from "@/lib/admin/constants";
import type { PaymentStatus } from "@/lib/mongodb";
import { PaymentStatusBadge } from "@/components/admin/Badges";
import PaymentStatusForm from "@/components/admin/PaymentStatusForm";

export const dynamic = "force-dynamic";

function parseStatus(v?: string): PaymentStatus | "all" {
  if (v && PAYMENT_STATUSES.includes(v as PaymentStatus)) return v as PaymentStatus;
  return "all";
}

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const status = parseStatus(sp.status);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const [stats, result] = await Promise.all([
    getPaymentStats(),
    listPayments({ status, page, pageSize: 20 }),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Платежи</h1>
        <p className="mt-1 text-sm text-stone-500">Статусы оплат и выручка</p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Выручка (оплачено)" value={formatPrice(stats.totalRevenue)} />
        <Stat label="Оплачено" value={String(stats.paidCount)} />
        <Stat label="Ожидает" value={String(stats.pendingCount)} sub={formatPrice(stats.pendingAmount)} />
        <Stat label="Возвраты" value={String(stats.refundedCount)} />
      </div>

      <div className="flex gap-2">
        {(["all", ...PAYMENT_STATUSES] as const).map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/admin/payments" : `/admin/payments?status=${s}`}
            className={`px-3 py-1.5 text-sm ${
              status === s
                ? "bg-[#A01D26] text-white"
                : "bg-white text-stone-600 ring-1 ring-stone-200 hover:text-[#A01D26]"
            }`}
          >
            {s === "all" ? "Все" : s === "paid" ? "Оплачен" : s === "pending" ? "Ожидает" : "Возврат"}
          </Link>
        ))}
      </div>

      <div className="bg-white ring-1 ring-stone-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3">Заказ</th>
                <th className="px-5 py-3">Клиент</th>
                <th className="px-5 py-3">Метод</th>
                <th className="px-5 py-3">Статус</th>
                <th className="px-5 py-3 text-right">Сумма</th>
                <th className="px-5 py-3">Действие</th>
              </tr>
            </thead>
            <tbody>
              {result.payments.map((p) => (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="px-5 py-3">
                    <Link href={`/admin/orders/${p.orderId}`} className="font-medium hover:text-[#A01D26]">
                      {p.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{p.customerName}</td>
                  <td className="px-5 py-3 text-stone-500">{PAYMENT_METHOD_LABELS[p.method]}</td>
                  <td className="px-5 py-3">
                    <PaymentStatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-3 text-right font-medium">{formatPrice(p.amount)}</td>
                  <td className="px-5 py-3">
                    <PaymentStatusForm paymentId={p.id} currentStatus={p.status} currentMethod={p.method} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result.payments.length === 0 && (
          <p className="py-12 text-center text-sm text-stone-400">Платежей нет</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white p-5 ring-1 ring-stone-200">
      <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-2 font-serif text-xl text-stone-900">{value}</p>
      {sub && <p className="text-xs text-stone-400">{sub}</p>}
    </div>
  );
}