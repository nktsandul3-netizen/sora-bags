import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { listCustomers } from "@/lib/admin/customers";
import CustomersToolbar from "@/components/admin/CustomersToolbar";
import Pagination from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim() || undefined;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const result = await listCustomers({ search, page, pageSize: 20 });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Клиенты</h1>
        <p className="mt-1 text-sm text-stone-500">Всего: {result.total}</p>
      </header>

      <CustomersToolbar />

      <div className="bg-white ring-1 ring-stone-200">
        {result.customers.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-stone-400">Ничего не найдено</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                  <th className="px-5 py-3 font-medium">Клиент</th>
                  <th className="px-5 py-3 font-medium">Контакты</th>
                  <th className="px-5 py-3 text-center font-medium">Заказы</th>
                  <th className="px-5 py-3 text-right font-medium">Сумма покупок</th>
                </tr>
              </thead>
              <tbody>
                {result.customers.map((c) => (
                  <tr key={c.id} className="border-t border-stone-100 hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/customers/${c.id}`} className="font-medium text-stone-900 hover:text-[#A01D26]">
                        {c.name}
                      </Link>
                      {c.role === "admin" && (
                        <span className="ml-2 rounded-full bg-[#A01D26]/10 px-2 py-0.5 text-xs text-[#A01D26]">
                          admin
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-stone-600">
                      <div>{c.email}</div>
                      {c.phone && <div className="text-xs text-stone-400">{c.phone}</div>}
                    </td>
                    <td className="px-5 py-3 text-center text-stone-600">{c.ordersCount}</td>
                    <td className="px-5 py-3 text-right font-medium text-stone-900">
                      {formatPrice(c.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        basePath="/admin/customers"
        baseQuery={{ search }}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}