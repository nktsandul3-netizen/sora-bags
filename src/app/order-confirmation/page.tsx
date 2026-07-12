import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/lib/config";
import { withLocalePath } from "@/lib/i18n";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { noIndexMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    ...noIndexMetadata,
    title: t("order.confirmation"),
  };
}

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; kind?: string }>;
}) {
  const { order, kind } = await searchParams;
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const isPreorder = kind === "preorder";
  const whatsappText = order
    ? t(isPreorder ? "order.whatsappPreorder" : "order.whatsappOrder").replace("{order}", order)
    : t(isPreorder ? "order.whatsappPreorderNoNumber" : "order.whatsappOrderNoNumber");
  const whatsappHref = `${brand.social.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
        SÓRA Bags
      </p>
      <h1 className="mt-3 font-serif text-3xl text-stone-950 sm:text-4xl">
        {isPreorder ? t("order.preorderConfirmation") : t("order.confirmation")}
      </h1>
      {order ? (
        <p className="mt-4 text-sm font-medium text-stone-900">
          {t("order.orderNumber")}: <span className="tracking-wide">{order}</span>
        </p>
      ) : null}
      <p className="mt-4 leading-relaxed text-stone-600">
        {isPreorder ? t("order.preorderThanks") : t("order.thanks")}
      </p>
      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
        <p className="text-sm font-medium text-stone-900">
          {t("order.fastTitle")}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-500">
          {t("order.fastText")}
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
          {t("order.backToStore")}
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