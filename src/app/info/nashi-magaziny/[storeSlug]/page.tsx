import { redirect } from "next/navigation";
import { getServerLocale } from "@/lib/server-i18n";
import { withLocalePath } from "@/lib/i18n";
import { getStore } from "@/lib/stores";

export default async function StoreDetailRedirect({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const locale = await getServerLocale();
  const store = getStore(storeSlug);
  if (!store) redirect(withLocalePath("/info/nashi-magaziny", locale));
  redirect(withLocalePath("/info/nashi-magaziny", locale));
}
