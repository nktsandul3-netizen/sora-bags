import Link from "next/link";
import Image from "next/image";
import { getSalesIntelligenceDashboard } from "@/lib/admin/sales-intelligence";
import { parseIntelligencePeriod, type IntelligencePeriod } from "@/lib/admin/sales-intelligence";
import type { IntelligenceProductRow } from "@/lib/admin/sales-intelligence";
import { formatPrice } from "@/lib/format";
import BarChart from "@/components/admin/BarChart";
import SalesIntelligenceProductTable from "@/components/admin/SalesIntelligenceProductTable";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; product?: string }>;
}) {
  const sp = await searchParams;
  const period = parseIntelligencePeriod(sp.period);
  const selectedProduct = sp.product?.trim() || undefined;
  const dashboard = await getSalesIntelligenceDashboard(period);
  const { kpis } = dashboard;
  const productOptions = dashboard.popularProducts.slice(0, 12);
  const visibleHighInterest = filterByProduct(dashboard.highInterestLowPurchase, selectedProduct);
  const visiblePopular = filterByProduct(dashboard.popularProducts, selectedProduct);
  const visibleTopViewed = filterByProduct(dashboard.topViewed, selectedProduct);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
            Sales Intelligence
          </p>
          <h1 className="mt-2 font-serif text-3xl text-stone-900">Аналитика</h1>
          <p className="mt-1 text-sm text-stone-500">
            Поведение клиентов, интерес к товарам и воронка продаж за период: {dashboard.periodLabel}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PeriodLink current={period} value="today" label="Сегодня" product={selectedProduct} />
          <PeriodLink current={period} value="7d" label="7 дней" product={selectedProduct} />
          <PeriodLink current={period} value="30d" label="30 дней" product={selectedProduct} />
          <PeriodLink current={period} value="all" label="Всё время" product={selectedProduct} />
          <a
            href={`/api/admin/analytics/export?period=${period}`}
            className="bg-stone-900 px-3 py-2 text-xs font-medium text-white hover:bg-stone-800"
          >
            Export CSV
          </a>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Посетители сегодня" value={String(kpis.visitorsToday)} />
        <Stat label="Посетители 7 дней" value={String(kpis.visitors7d)} />
        <Stat label="Посетители 30 дней" value={String(kpis.visitors30d)} />
        <Stat label="Конверсия сайта" value={`${kpis.siteConversion}%`} />
        <Stat label={`Просмотры товаров (${dashboard.periodLabel})`} value={String(kpis.productViews)} />
        <Stat label={`Добавления в избранное (${dashboard.periodLabel})`} value={String(kpis.wishlistAdds)} />
        <Stat label={`Добавления в корзину (${dashboard.periodLabel})`} value={String(kpis.cartAdds)} />
        <Stat label={`Заказы (${dashboard.periodLabel})`} value={String(kpis.orders)} />
      </div>

      <ProductFilter
        period={period}
        selectedProduct={selectedProduct}
        products={productOptions}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RankingCard
          label="Самый просматриваемый"
          metric={`${dashboard.rankings.topViewed?.views ?? 0} просмотров`}
          product={dashboard.rankings.topViewed}
        />
        <RankingCard
          label="Чаще всего в избранном"
          metric={`${dashboard.rankings.topWishlisted?.wishlistAdds ?? 0} добавлений`}
          product={dashboard.rankings.topWishlisted}
        />
        <RankingCard
          label="Чаще всего в корзине"
          metric={`${dashboard.rankings.topCarted?.cartAdds ?? 0} добавлений`}
          product={dashboard.rankings.topCarted}
        />
        <RankingCard
          label="Самый продаваемый"
          metric={`${dashboard.rankings.topSelling?.purchases ?? 0} продаж`}
          product={dashboard.rankings.topSelling}
        />
      </div>

      <section className="bg-white p-6 ring-1 ring-stone-200">
        <div className="mb-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
            Товары, которые смотрят и добавляют, но не покупают
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Главный сигнал для SÓRA: цена, фото, цвета или сомнение клиента.
          </p>
        </div>
        <SalesIntelligenceProductTable rows={visibleHighInterest} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Динамика по дням
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <MiniChart title="Посещения" data={dashboard.daily.map((d) => ({ label: d.label, value: d.visits }))} />
            <MiniChart title="Просмотры товаров" data={dashboard.daily.map((d) => ({ label: d.label, value: d.productViews }))} />
            <MiniChart title="Избранное" data={dashboard.daily.map((d) => ({ label: d.label, value: d.wishlistAdds }))} />
            <MiniChart title="Корзина" data={dashboard.daily.map((d) => ({ label: d.label, value: d.cartAdds }))} />
            <MiniChart title="Заказы" data={dashboard.daily.map((d) => ({ label: d.label, value: d.orders }))} />
          </div>
        </section>

        <section className="bg-white p-6 ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Воронка продаж
          </h2>
          <div className="space-y-3">
            {dashboard.funnel.map((step) => (
              <div key={step.key} className="rounded-lg border border-stone-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-stone-700">{step.label}</span>
                  <span className="font-serif text-xl text-stone-950">{step.value}</span>
                </div>
                {step.previousDrop > 0 && (
                  <p className="mt-1 text-xs text-stone-400">
                    Потеря к предыдущему этапу: {step.previousDrop}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Популярные товары
        </h2>
        <SalesIntelligenceProductTable rows={visiblePopular} />
      </section>

      <section className="bg-white p-6 ring-1 ring-stone-200">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
          Топ-50 самых просматриваемых товаров
        </h2>
        <SalesIntelligenceProductTable rows={visibleTopViewed} />
      </section>
    </div>
  );
}

function filterByProduct(rows: IntelligenceProductRow[], selectedProduct?: string) {
  if (!selectedProduct) return rows;
  return rows.filter((row) => row.slug === selectedProduct);
}

function analyticsHref(period: IntelligencePeriod, product?: string) {
  const params = new URLSearchParams();
  if (period !== "30d") params.set("period", period);
  if (product) params.set("product", product);
  const query = params.toString();
  return query ? `/admin/analytics?${query}` : "/admin/analytics";
}

function ProductFilter({
  period,
  selectedProduct,
  products,
}: {
  period: IntelligencePeriod;
  selectedProduct?: string;
  products: IntelligenceProductRow[];
}) {
  if (products.length === 0) return null;
  return (
    <section className="bg-white p-4 ring-1 ring-stone-200">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wide text-stone-500">
          Фильтр по модели
        </h2>
        {selectedProduct && (
          <Link href={analyticsHref(period)} className="text-xs text-[#A01D26] hover:underline">
            Сбросить фильтр
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={analyticsHref(period)}
          className={
            "px-3 py-2 text-xs font-medium " +
            (!selectedProduct
              ? "bg-[#A01D26] text-white"
              : "bg-stone-50 text-stone-600 ring-1 ring-stone-200 hover:text-[#A01D26]")
          }
        >
          Все товары
        </Link>
        {products.map((product) => (
          <Link
            key={product.slug}
            href={analyticsHref(period, product.slug)}
            className={
              "px-3 py-2 text-xs font-medium " +
              (selectedProduct === product.slug
                ? "bg-[#A01D26] text-white"
                : "bg-stone-50 text-stone-600 ring-1 ring-stone-200 hover:text-[#A01D26]")
            }
          >
            {product.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function RankingCard({
  label,
  metric,
  product,
}: {
  label: string;
  metric: string;
  product?: IntelligenceProductRow;
}) {
  const href = product?.productId ? `/admin/products/${product.productId}` : product ? `/product/${product.slug}` : "#";
  return (
    <Link
      href={href}
      className="group block overflow-hidden bg-white ring-1 ring-stone-200 transition hover:shadow-md"
      aria-disabled={!product}
    >
      <div className="relative aspect-[4/3] bg-stone-50">
        {product?.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-stone-400">
            Нет фото
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
        <p className="mt-2 line-clamp-2 font-serif text-lg leading-tight text-stone-900 group-hover:text-[#A01D26]">
          {product?.title ?? "Пока нет данных"}
        </p>
        {product && (
          <p className="mt-1 text-xs text-stone-400">{formatPrice(product.price)}</p>
        )}
        <p className="mt-2 text-sm font-semibold text-[#A01D26]">{metric}</p>
      </div>
    </Link>
  );
}

function PeriodLink({
  current,
  value,
  label,
  product,
}: {
  current: IntelligencePeriod;
  value: IntelligencePeriod;
  label: string;
  product?: string;
}) {
  const active = current === value;
  return (
    <Link
      href={analyticsHref(value, product)}
      className={
        "px-3 py-2 text-xs font-medium " +
        (active
          ? "bg-[#A01D26] text-white"
          : "bg-white text-stone-600 ring-1 ring-stone-200 hover:text-[#A01D26]")
      }
    >
      {label}
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-5 ring-1 ring-stone-200">
      <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-2 font-serif text-2xl text-stone-900">{value}</p>
    </div>
  );
}

function MiniChart({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-400">{title}</p>
      <BarChart data={data} />
    </div>
  );
}