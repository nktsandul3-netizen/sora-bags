import Link from "next/link";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { withLocalePath } from "@/lib/i18n";

export default async function NotFound() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center sm:px-6">
      <p className="font-serif text-6xl text-stone-300">404</p>
      <h1 className="mt-4 font-serif text-2xl text-stone-950">
        {t("notFound.title")}
      </h1>
      <p className="mt-3 text-stone-500">
        {t("notFound.text")}
      </p>
      <Link
        href={withLocalePath("/", locale)}
        className="mt-8 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800"
      >
        {t("notFound.home")}
      </Link>
    </div>
  );
}