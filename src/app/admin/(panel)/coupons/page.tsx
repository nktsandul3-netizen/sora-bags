import Link from "next/link";
import { listCoupons } from "@/lib/admin/coupons";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CouponsPage() {
  const coupons = await listCoupons();

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-stone-900">Купоны</h1>
          <p className="mt-1 text-sm text-stone-500">Промокоды и скидки</p>
        </div>
        <Link
          href="/admin/coupons/new"
          className="bg-[#A01D26] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          + Купон
        </Link>
      </header>

      <div className="bg-white ring-1 ring-stone-200">
        {coupons.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-stone-400">Купонов нет</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3">Код</th>
                <th className="px-5 py-3">Скидка</th>
                <th className="px-5 py-3">Использовано</th>
                <th className="px-5 py-3">Срок</th>
                <th className="px-5 py-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-t border-stone-100 hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/coupons/${c.id}`} className="font-mono font-medium hover:text-[#A01D26]">
                      {c.code}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-stone-600">
                    {c.type === "percentage" ? `${c.value}%` : formatPrice(c.value)}
                  </td>
                  <td className="px-5 py-3 text-stone-500">
                    {c.usedCount}
                    {c.maxUses ? ` / ${c.maxUses}` : ""}
                  </td>
                  <td className="px-5 py-3 text-stone-500">
                    {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString("ru-RU") : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        c.active ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {c.active ? "Активен" : "Выкл."}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}