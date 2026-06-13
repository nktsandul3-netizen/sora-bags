import { formatPrice } from "@/lib/format";
import { getSalesSeries } from "@/lib/admin/stats";
import {
  getOrdersSeries,
  getMonthlySales,
  getTopSellingProducts,
  getMostViewedProducts,
  getMostWishlistedProducts,
} from "@/lib/admin/analytics";
import SalesChart from "@/components/admin/SalesChart";
import BarChart, { RankList } from "@/components/admin/BarChart";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const [revenueSeries, ordersSeries, monthly, topSelling, topViewed, topWishlisted] =
    await Promise.all([
      getSalesSeries(30),
      getOrdersSeries(30),
      getMonthlySales(12),
      getTopSellingProducts(8),
      getMostViewedProducts(8),
      getMostWishlistedProducts(8),
    ]);

  const ordersChart = ordersSeries.map((d) => ({ label: d.label, value: d.orders }));
  const monthlyRevenue = monthly.map((m) => ({ label: m.label, value: m.revenue }));
  const monthlyOrders = monthly.map((m) => ({ label: m.label, value: m.orders }));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Аналитика</h1>
        <p className="mt-1 text-sm text-stone-500">Продажи, заказы и популярность товаров</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Выручка (30 дней)
          </h2>
          <SalesChart data={revenueSeries} />
        </div>
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Заказы (30 дней)
          </h2>
          <BarChart data={ordersChart} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Продажи по месяцам (выручка)
          </h2>
          <BarChart data={monthlyRevenue} formatValue={formatPrice} />
        </div>
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Заказы по месяцам
          </h2>
          <BarChart data={monthlyOrders} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Топ продаж
          </h2>
          <RankList items={topSelling} valueLabel="шт." />
        </div>
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Просмотры
          </h2>
          <RankList items={topViewed} valueLabel="просм." />
        </div>
        <div className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            В wishlist
          </h2>
          <RankList items={topWishlisted} valueLabel="раз" />
        </div>
      </div>
    </div>
  );
}