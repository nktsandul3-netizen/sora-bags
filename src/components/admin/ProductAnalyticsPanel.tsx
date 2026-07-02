import type { ProductAnalyticsSummary } from "@/lib/admin/sales-intelligence";

export default function ProductAnalyticsPanel({
  rows,
}: {
  rows: ProductAnalyticsSummary[];
}) {
  return (
    <section className="bg-white p-6 ring-1 ring-stone-200">
      <div className="mb-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
          Аналитика товара
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Просмотры, избранное, корзина, покупки и конверсия по периодам.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
              <th className="px-4 py-3 font-medium">Период</th>
              <th className="px-4 py-3 text-right font-medium">Просмотры</th>
              <th className="px-4 py-3 text-right font-medium">Избранное</th>
              <th className="px-4 py-3 text-right font-medium">Корзина</th>
              <th className="px-4 py-3 text-right font-medium">Покупки</th>
              <th className="px-4 py-3 text-right font-medium">Конверсия</th>
              <th className="px-4 py-3 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.period} className="border-t border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-900">{row.period}</td>
                <td className="px-4 py-3 text-right text-stone-600">{row.views}</td>
                <td className="px-4 py-3 text-right text-stone-600">{row.wishlistAdds}</td>
                <td className="px-4 py-3 text-right text-stone-600">{row.cartAdds}</td>
                <td className="px-4 py-3 text-right text-stone-600">{row.purchases}</td>
                <td className="px-4 py-3 text-right text-stone-600">{row.conversion}%</td>
                <td className="px-4 py-3 text-right font-semibold text-stone-900">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
