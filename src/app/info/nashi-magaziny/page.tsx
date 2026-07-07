import type { Metadata } from "next";
import StoreDetailContent from "@/components/stores/StoreDetailContent";
import { getServerLocale } from "@/lib/server-i18n";
import { getStoreName, primaryStore } from "@/lib/stores";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return { title: getStoreName(primaryStore, locale) };
}

export default async function StoresPage() {
  const locale = await getServerLocale();
  return <StoreDetailContent store={primaryStore} locale={locale} />;
}
