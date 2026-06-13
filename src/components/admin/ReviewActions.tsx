"use client";

import { useActionState } from "react";
import { setReviewStatusAction, type ActionState } from "@/app/admin/actions";
import type { ReviewStatus } from "@/lib/mongodb";

const initial: ActionState = {};

export default function ReviewActions({
  reviewId,
  current,
}: {
  reviewId: string;
  current: ReviewStatus;
}) {
  const [state, action, pending] = useActionState(setReviewStatusAction, initial);

  if (current !== "pending") {
    return null;
  }

  return (
    <div className="flex gap-2">
      <form action={action}>
        <input type="hidden" name="id" value={reviewId} />
        <input type="hidden" name="status" value="approved" />
        <button
          type="submit"
          disabled={pending}
          className="bg-emerald-700 px-3 py-1 text-xs text-white hover:opacity-90 disabled:opacity-60"
        >
          Одобрить
        </button>
      </form>
      <form action={action}>
        <input type="hidden" name="id" value={reviewId} />
        <input type="hidden" name="status" value="rejected" />
        <button
          type="submit"
          disabled={pending}
          className="border border-stone-300 px-3 py-1 text-xs text-stone-600 hover:border-[#A01D26] disabled:opacity-60"
        >
          Отклонить
        </button>
      </form>
      {state.error && <span className="text-xs text-[#A01D26]">{state.error}</span>}
    </div>
  );
}