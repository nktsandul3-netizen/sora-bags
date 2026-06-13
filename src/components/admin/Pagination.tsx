import Link from "next/link";

/**
 * Простая пагинация на ссылках. `baseQuery` — текущие query-параметры без `page`.
 */
export default function Pagination({
  basePath,
  baseQuery,
  page,
  totalPages,
}: {
  basePath: string;
  baseQuery: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  function href(p: number): string {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(baseQuery)) {
      if (v) sp.set(k, v);
    }
    sp.set("page", String(p));
    return `${basePath}?${sp.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4 text-sm">
      {page > 1 && (
        <Link href={href(page - 1)} className="px-3 py-1.5 text-stone-600 hover:text-[#A01D26]">
          ← Назад
        </Link>
      )}
      <span className="px-3 py-1.5 text-stone-500">
        Стр. {page} из {totalPages}
      </span>
      {page < totalPages && (
        <Link href={href(page + 1)} className="px-3 py-1.5 text-stone-600 hover:text-[#A01D26]">
          Вперёд →
        </Link>
      )}
    </div>
  );
}