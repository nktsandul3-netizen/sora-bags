import { listReviews } from "@/lib/admin/reviews";
import { REVIEW_STATUSES } from "@/lib/admin/constants";
import type { ReviewStatus } from "@/lib/mongodb";
import { ReviewStatusBadge } from "@/components/admin/Badges";
import ReviewsFilter from "@/components/admin/ReviewsFilter";
import ReviewActions from "@/components/admin/ReviewActions";

export const dynamic = "force-dynamic";

function parseStatus(v?: string): ReviewStatus | "all" {
  if (v && REVIEW_STATUSES.includes(v as ReviewStatus)) return v as ReviewStatus;
  return "all";
}

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const status = parseStatus(sp.status);
  const result = await listReviews({ status, pageSize: 50 });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Отзывы</h1>
        <p className="mt-1 text-sm text-stone-500">Модерация отзывов клиентов</p>
      </header>

      <ReviewsFilter />

      <div className="space-y-4">
        {result.reviews.length === 0 ? (
          <p className="bg-white py-12 text-center text-sm text-stone-400 ring-1 ring-stone-200">
            Отзывов нет
          </p>
        ) : (
          result.reviews.map((r) => (
            <article key={r.id} className="bg-white p-6 ring-1 ring-stone-200">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{r.customerName}</p>
                  <p className="text-xs text-stone-500">
                    {r.productTitle ?? r.productSlug} ·{" "}
                    {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                  </p>
                  <p className="mt-1 text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                </div>
                <ReviewStatusBadge status={r.status} />
              </div>
              <p className="mt-3 text-sm text-stone-700">{r.text}</p>
              <div className="mt-4">
                <ReviewActions reviewId={r.id} current={r.status} />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}