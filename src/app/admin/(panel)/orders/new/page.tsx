import Link from "next/link";
import ManualOrderForm from "@/components/admin/ManualOrderForm";

export const dynamic = "force-dynamic";

export default function NewManualOrderPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/orders" className="text-sm text-stone-500 hover:text-[#A01D26]">
          ← К заказам
        </Link>
        <h1 className="mt-2 font-serif text-3xl text-stone-900">Создать заказ вручную</h1>
        <p className="mt-1 text-sm text-stone-500">
          Для заказов из Instagram, WhatsApp, телефона или офлайн-продаж.
        </p>
      </div>

      <ManualOrderForm />
    </div>
  );
}
