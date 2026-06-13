import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Заказ оформлен" };

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
        SÓRA Bags
      </p>
      <h1 className="mt-3 font-serif text-3xl text-stone-950 sm:text-4xl">
        Спасибо, заказ оформлен
      </h1>
      {order ? (
        <p className="mt-4 text-sm font-medium text-stone-900">
          Номер заказа: <span className="tracking-wide">{order}</span>
        </p>
      ) : null}
      <p className="mt-4 leading-relaxed text-stone-600">
        Мы получили ваш заказ. Администратор проверит наличие, подтвердит детали
        доставки и свяжется с вами по указанному телефону или email.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800"
        >
          Вернуться в магазин
        </Link>
        <Link
          href="/contacts"
          className="rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-800 hover:border-stone-500"
        >
          Связаться с нами
        </Link>
      </div>
    </div>
  );
}