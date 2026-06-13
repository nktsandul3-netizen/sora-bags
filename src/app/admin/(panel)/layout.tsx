import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin/guard";
import AdminNav from "@/components/admin/AdminNav";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  // Авторитетная проверка прав (proxy.ts — лишь оптимистичный рубеж).
  const session = await requireAdmin();
  const userName = session.user?.name || session.user?.email || "Администратор";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminNav userName={userName} />
      <div className="flex-1 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
      </div>
    </div>
  );
}