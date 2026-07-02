import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResetPasswordPanel from "@/components/account/ResetPasswordPanel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { withLocalePath } from "@/lib/i18n";
import { getServerLocale, getServerT } from "@/lib/server-i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return { title: t("auth.newPasswordTitle") };
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/account");

  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const { token } = await searchParams;
  const accountHref = withLocalePath("/account", locale);

  if (!token) {
    return (
      <div>
        <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
          <Breadcrumbs items={[{ label: t("auth.accountTitle"), href: "/account" }, { label: t("auth.newPasswordTitle") }]} />
        </div>
        <div className="mx-auto max-w-md px-4 py-12 text-center sm:px-6">
          <h1 className="font-serif text-3xl text-stone-950">{t("auth.linkInvalidTitle")}</h1>
          <p className="mt-3 text-sm text-stone-500">
            {t("auth.linkInvalidText")}
          </p>
          <Link
            href={accountHref}
            className="mt-6 inline-block text-sm font-medium text-stone-900 underline-offset-2 hover:underline"
          >
            {t("auth.goToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: t("auth.accountTitle"), href: "/account" }, { label: t("auth.newPasswordTitle") }]} />
      </div>
      <ResetPasswordPanel token={token} />
    </div>
  );
}
