import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthPanel from "@/components/account/AuthPanel";
import AccountDashboard from "@/components/account/AccountDashboard";
import { auth } from "@/auth";
import { getAddresses, getOrders, getProfile } from "@/lib/account";
import { getServerT } from "@/lib/server-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("auth.accountTitle") };
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const t = await getServerT();
  const accountLabel = t("auth.accountTitle");
  const loadingLabel = t("common.loading");
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div>
        <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
          <Breadcrumbs items={[{ label: accountLabel }]} />
        </div>
        <AuthPanel />
      </div>
    );
  }

  const userId = session.user.id;
  const [profile, addresses, orders] = await Promise.all([
    getProfile(userId),
    getAddresses(userId),
    getOrders(userId),
  ]);

  if (!profile) {
    // Пользователь из сессии не найден в БД (например, после очистки данных).
    return (
      <div>
        <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
          <Breadcrumbs items={[{ label: accountLabel }]} />
        </div>
        <AuthPanel />
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: accountLabel }]} />
      </div>
      <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-16 text-center text-stone-500">{loadingLabel}</div>}>
        <AccountDashboard
          profile={profile}
          addresses={addresses}
          orders={orders}
          initialTab={tab}
        />
      </Suspense>
    </div>
  );
}