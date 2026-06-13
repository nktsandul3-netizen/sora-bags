import Link from "next/link";
import { formatPrice } from "@/lib/format";
import {
  getDashboardStats,
  getRecentOrders,
  getSalesSeries,
  getRevenueComparison,
  getNewCustomersWidget,
} from "@/lib/admin/stats";
import { getLowStockProducts } from "@/lib/admin/products";
import { LOW_STOCK_THRESHOLD } from "@/lib/admin/constants";
import SalesChart from "@/components/admin/SalesChart";
import { OrderStatusBadge } from "@/components/admin/Badges";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, sales, recent, revenueCmp, newCustomers, lowStock] = await Promise.all([
    getDashboardStats(),
    getSalesSeries(14),
    getRecentOrders(6),
    getRevenueComparison(),
    getNewCustomersWidget(5),
    getLowStockProducts(LOW_STOCK_THRESHOLD, 6),
  ]);

  const cards = [
    { label: "Заказы", value: String(stats.totalOrders), href: "/admin/orders" },
    { label: "Выручка", value: formatPrice(stats.totalRevenue), href: "/admin/payments" },
    { label: "Клиенты", value: String(stats.totalCustomers), href: "/admin/customers" },
    { label: "Товары", value: String(stats.totalProducts), href: "/admin/products" },
  ];

  const revChange = revenueCmp.changePercent;
  const revSign = revChange >= 0 ? "+" : "";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Обзор</h1>
        <p className="mt-1 text-sm text-stone-500">Сводка по магазину SÓRA</p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group bg-white p-5 ring-1 ring-stone-200 transition-shadow hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-wide text-stone-500">{c.label}</p>
            <p className="mt-2 font-serif text-2xl text-stone-900 group-hover:text-[#A01D26]">
              {c.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 ring-1 ring-stone-200 lg:col-span-2">
          <SalesChart data={sales} />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 ring-1 ring-stone-200">
            <p className="text-xs uppercase tracking-wide text-stone-500">Выручка за месяц</p>
            <p className="mt-2 font-serif text-2xl text-stone-900">
              {formatPrice(revenueCmp.currentMonth)}
            </p>
            <p
              className={`mt-1 text-sm ${revChange >= 0 ? "text-emerald-700" : "text-[#A01D26]"}`}
            >
              {revSign}
              {revChange}% к прошлому месяцу
            </p>
            <p className="mt-2 text-xs text-stone-400">
              Прошлый месяц: {formatPrice(revenueCmp.previousMonth)}
            </p>
          </div>
          <div className="bg-white p-6 ring-1 ring-stone-200">
            <p className="text-xs uppercase tracking-wide text-stone-500">Новые клиенты (30 дн.)</p>
            <p className="mt-2 font-serif text-2xl text-stone-900">{newCustomers.count}</p>
            <ul className="mt-3 space-y-1">
              {newCustomers.recent.slice(0, 3).map((c) => (
                <li key={c.id} className="truncate text-xs text-stone-500">
                  {c.name} · {c.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white ring-1 ring-stone-200">
          <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Последние заказы
            </h2>
            <Link href="/admin/orders" className="text-sm text-[#A01D26] hover:underline">
              Все →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-stone-400">Заказов пока нет</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {recent.map((o) => (
                <li key={o.id} className="flex items-center justify-between px-6 py-3 hover:bg-stone-50">
                  <div>
                    <Link href={`/admin/orders/${o.id}`} className="font-medium text-stone-900 hover:text-[#A01D26]">
                      {o.number}
                    </Link>
                    <p className="text-xs text-stone-500">{o.customerName}</p>
                  </div>
                  <div className="text-right">
                    <OrderStatusBadge status={o.status} />
                    <p className="mt-1 text-sm font-medium">{formatPrice(o.total)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white ring-1 ring-stone-200">
          <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Мало на складе
            </h2>
            <Link href="/admin/products" className="text-sm text-[#A01D26] hover:underline">
              Товары →
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-stone-400">Всё в норме</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-6 py-3">
                  <Link href={`/admin/products/${p.id}`} className="text-sm text-stone-800 hover:text-[#A01D26]">
                    {p.title}
                  </Link>
                  <span className="text-sm font-medium text-[#A01D26]">{p.inventory} шт.</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}