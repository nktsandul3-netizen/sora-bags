import Link from "next/link";
import CouponForm from "@/components/admin/CouponForm";

export default function NewCouponPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/coupons" className="text-sm text-stone-500 hover:text-[#A01D26]">
          ← К купонам
        </Link>
        <h1 className="mt-2 font-serif text-3xl text-stone-900">Новый купон</h1>
      </div>
      <CouponForm />
    </div>
  );
}