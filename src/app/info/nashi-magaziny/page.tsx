import type { Metadata } from "next";
import StoreDetailContent from "@/components/stores/StoreDetailContent";
import { getServerLocale } from "@/lib/server-i18n";
import { getStoreName, primaryStore } from "@/lib/stores";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = getStoreName(primaryStore, locale);
  return buildPageMetadata({
    path: "/info/nashi-magaziny",
    locale,
    title,
    description:
      locale === "ro"
        ? "Magazinul SÓRA Bags din Chișinău — adresă, program și cum să ne găsiți."
        : locale === "en"
          ? "SÓRA Bags store in Chișinău — address, hours and how to find us."
          : "Магазин SÓRA Bags в Кишинёве — адрес, часы работы и как нас найти.",
  });
}

export default async function StoresPage() {
  const locale = await getServerLocale();
  return <StoreDetailContent store={primaryStore} locale={locale} />;
}
