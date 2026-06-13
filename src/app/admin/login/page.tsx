import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error } = await searchParams;

  const session = await auth();
  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-serif text-4xl tracking-[0.3em] text-stone-900">SÓRA</p>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-stone-400">
            Панель управления
          </p>
        </div>
        <AdminLoginForm forbidden={error === "forbidden"} />
      </div>
    </div>
  );
}