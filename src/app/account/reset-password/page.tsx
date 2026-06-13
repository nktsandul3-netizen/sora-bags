import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResetPasswordPanel from "@/components/account/ResetPasswordPanel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Новый пароль" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/account");

  const { token } = await searchParams;

  if (!token) {
    return (
      <div>
        <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
          <Breadcrumbs items={[{ label: "Личный кабинет", href: "/account" }, { label: "Новый пароль" }]} />
        </div>
        <div className="mx-auto max-w-md px-4 py-12 text-center sm:px-6">
          <h1 className="font-serif text-3xl text-stone-950">Ссылка недействительна</h1>
          <p className="mt-3 text-sm text-stone-500">
            Запросите восстановление пароля ещё раз.
          </p>
          <Link
            href="/account"
            className="mt-6 inline-block text-sm font-medium text-stone-900 underline-offset-2 hover:underline"
          >
            Перейти ко входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Личный кабинет", href: "/account" }, { label: "Новый пароль" }]} />
      </div>
      <ResetPasswordPanel token={token} />
    </div>
  );
}
