import { listSubscribers } from "@/lib/admin/newsletter";
import NewsletterToolbar from "@/components/admin/NewsletterToolbar";
import Pagination from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim() || undefined;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const result = await listSubscribers({ search, page, pageSize: 50 });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Подписчики</h1>
        <p className="mt-1 text-sm text-stone-500">Рассылка новостей SÓRA</p>
      </header>

      <NewsletterToolbar total={result.total} />

      <div className="bg-white ring-1 ring-stone-200">
        {result.subscribers.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-stone-400">Подписчиков нет</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3">E-mail</th>
                <th className="px-5 py-3">Дата подписки</th>
              </tr>
            </thead>
            <tbody>
              {result.subscribers.map((s) => (
                <tr key={s.id} className="border-t border-stone-100">
                  <td className="px-5 py-3 text-stone-800">{s.email}</td>
                  <td className="px-5 py-3 text-stone-500">
                    {new Date(s.createdAt).toLocaleString("ru-RU")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        basePath="/admin/newsletter"
        baseQuery={{ search }}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}