"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  saveCouponAction,
  deleteCouponAction,
  type ActionState,
} from "@/app/admin/actions";
import { COUPON_TYPE_LABELS } from "@/lib/admin/constants";
import type { AdminCouponView } from "@/lib/admin/coupons";

const initial: ActionState = {};
const inputClass =
  "w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-[#A01D26]";
const labelClass = "mb-1 block text-xs uppercase tracking-wide text-stone-500";

export default function CouponForm({ coupon }: { coupon?: AdminCouponView }) {
  const [state, action, pending] = useActionState(saveCouponAction, initial);

  return (
    <form action={action} className="max-w-lg space-y-4 bg-white p-6 ring-1 ring-stone-200">
      {coupon && <input type="hidden" name="id" value={coupon.id} />}
      {state.error && (
        <p className="bg-[#A01D26]/10 px-3 py-2 text-sm text-[#A01D26]">{state.error}</p>
      )}
      <div>
        <label className={labelClass}>Код</label>
        <input name="code" defaultValue={coupon?.code} required className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Тип</label>
          <select name="type" defaultValue={coupon?.type ?? "percentage"} className={inputClass}>
            {(Object.keys(COUPON_TYPE_LABELS) as (keyof typeof COUPON_TYPE_LABELS)[]).map((t) => (
              <option key={t} value={t}>
                {COUPON_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Значение</label>
          <input
            name="value"
            type="number"
            min="1"
            defaultValue={coupon?.value ?? 10}
            required
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Мин. заказ</label>
          <input name="minOrder" type="number" min="0" defaultValue={coupon?.minOrder ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Макс. использований</label>
          <input name="maxUses" type="number" min="1" defaultValue={coupon?.maxUses ?? ""} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Срок действия</label>
        <input
          name="expiresAt"
          type="date"
          defaultValue={coupon?.expiresAt?.slice(0, 10) ?? ""}
          className={inputClass}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={coupon?.active ?? true} className="accent-[#A01D26]" />
        Активен
      </label>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-[#A01D26] px-5 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "…" : coupon ? "Сохранить" : "Создать"}
        </button>
        <Link href="/admin/coupons" className="px-5 py-2.5 text-sm text-stone-600 hover:text-[#A01D26]">
          Назад
        </Link>
      </div>
    </form>
  );
}

export function DeleteCouponButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState(deleteCouponAction, initial);
  return (
    <form action={action} onSubmit={(e) => !confirm("Удалить купон?") && e.preventDefault()}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="border border-[#A01D26]/40 px-4 py-2 text-sm text-[#A01D26] disabled:opacity-60"
      >
        Удалить
      </button>
      {state.error && <p className="mt-1 text-sm text-[#A01D26]">{state.error}</p>}
    </form>
  );
}