import Link from "next/link";
import { notFound } from "next/navigation";
import { getCouponById } from "@/lib/admin/coupons";
import CouponForm, { DeleteCouponButton } from "@/components/admin/CouponForm";

export const dynamic = "force-dynamic";

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coupon = await getCouponById(id);
  if (!coupon) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/coupons" className="text-sm text-stone-500 hover:text-[#A01D26]">
            ← К купонам
          </Link>
          <h1 className="mt-2 font-serif text-3xl text-stone-900">{coupon.code}</h1>
        </div>
        <DeleteCouponButton id={coupon.id} />
      </div>
      <CouponForm coupon={coupon} />
    </div>
  );
}