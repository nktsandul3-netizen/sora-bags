import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/lib/config";
import { withLocalePath } from "@/lib/i18n";
import { getServerLocale, getServerT } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Заказ оформлен" };

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const whatsappText = order
    ? locale === "ru"
      ? `Здравствуйте, я оформил(а) заказ ${order} на sorabags.md. Хочу согласовать детали.`
      : locale === "ro"
        ? `Bună, am plasat comanda ${order} pe sorabags.md. Aș dori să confirm detaliile.`
        : `Hello, I placed order ${order} on sorabags.md. I would like to confirm the details.`
    : locale === "ru"
      ? "Здравствуйте, я оформил(а) заказ на sorabags.md. Хочу согласовать детали."
      : locale === "ro"
        ? "Bună, am plasat o comandă pe sorabags.md. Aș dori să confirm detaliile."
        : "Hello, I placed an order on sorabags.md. I would like to confirm the details.";
  const whatsappHref = `${brand.social.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
        SÓRA Bags
      </p>
      <h1 className="mt-3 font-serif text-3xl text-stone-950 sm:text-4xl">
        {t("order.confirmation")}
      </h1>
      {order ? (
        <p className="mt-4 text-sm font-medium text-stone-900">
          {t("order.orderNumber")}: <span className="tracking-wide">{order}</span>
        </p>
      ) : null}
      <p className="mt-4 leading-relaxed text-stone-600">
        {t("order.thanks")}
      </p>
      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
        <p className="text-sm font-medium text-stone-900">
          {locale === "ru" ? "Хотите быстрее согласовать детали?" : locale === "ro" ? "Doriți să confirmați detaliile mai rapid?" : "Want to confirm details faster?"}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-500">
          {locale === "ru" ? "Напишите нам в WhatsApp, и менеджер быстрее уточнит доставку и оплату." : locale === "ro" ? "Scrieți-ne pe WhatsApp, iar managerul va confirma livrarea și plata mai rapid." : "Message us on WhatsApp and our manager will confirm delivery and payment faster."}
        </p>
      </div>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white hover:bg-[#20bd5a]"
        >
          {t("order.whatsapp")}
        </a>
        <Link
          href={withLocalePath("/", locale)}
          className="rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {locale === "ru" ? "Вернуться в магазин" : locale === "ro" ? "Înapoi în magazin" : "Back to store"}
        </Link>
        <Link
          href={withLocalePath("/contacts", locale)}
          className="rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-800 hover:border-stone-500"
        >
          {t("nav.contacts")}
        </Link>
      </div>
    </div>
  );
}