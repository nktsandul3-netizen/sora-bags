import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { listProducts } from "@/lib/admin/products";
import { PRODUCT_STATUSES } from "@/lib/admin/constants";
import type { ProductStatus } from "@/lib/mongodb";
import { ProductStatusBadge } from "@/components/admin/Badges";
import ProductsToolbar from "@/components/admin/ProductsToolbar";
import Pagination from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

function parseStatus(value?: string): ProductStatus | "all" {
  if (value && PRODUCT_STATUSES.includes(value as ProductStatus)) return value as ProductStatus;
  return "all";
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim() || undefined;
  const status = parseStatus(sp.status);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const result = await listProducts({ search, status, page, pageSize: 20 });

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-stone-900">Товары</h1>
          <p className="mt-1 text-sm text-stone-500">Всего: {result.total}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#A01D26] px-4 py-2.5 text-sm font-medium uppercase tracking-[0.1em] text-white hover:opacity-90"
        >
          + Товар
        </Link>
      </header>

      <ProductsToolbar />

      <div className="bg-white ring-1 ring-stone-200">
        {result.products.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-stone-400">Товаров пока нет в базе.</p>
            <Link href="/admin/products/new" className="mt-2 inline-block text-sm text-[#A01D26] hover:underline">
              Создать первый товар →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                  <th className="px-5 py-3 font-medium">Товар</th>
                  <th className="px-5 py-3 font-medium">Категория</th>
                  <th className="px-5 py-3 font-medium">Статус</th>
                  <th className="px-5 py-3 text-center font-medium">Остаток</th>
                  <th className="px-5 py-3 text-right font-medium">Цена</th>
                </tr>
              </thead>
              <tbody>
                {result.products.map((p) => (
                  <tr key={p.id} className="border-t border-stone-100 hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="flex items-center gap-3"
                      >
                        <span className="h-10 w-10 shrink-0 overflow-hidden bg-stone-100 ring-1 ring-stone-200">
                          {p.images[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                          )}
                        </span>
                        <span>
                          <span className="block font-medium text-stone-900 hover:text-[#A01D26]">
                            {p.title}
                          </span>
                          <span className="block text-xs text-stone-400">{p.slug}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-stone-500">{p.categorySlug}</td>
                    <td className="px-5 py-3">
                      <ProductStatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-3 text-center text-stone-600">{p.inventory}</td>
                    <td className="px-5 py-3 text-right font-medium text-stone-900">
                      {formatPrice(p.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        basePath="/admin/products"
        baseQuery={{ search, status: status === "all" ? undefined : status }}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}