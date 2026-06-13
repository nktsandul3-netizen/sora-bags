import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Session } from "next-auth";

/**
 * Авторитетная проверка прав администратора.
 * Используется в server-компонентах (layout/страницы) и server actions —
 * это основной рубеж защиты (proxy.ts делает лишь оптимистичный редирект).
 */
export async function requireAdmin(): Promise<Session> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/admin/login");
  }
  if (session.user.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }
  return session;
}

/** Версия для server actions: бросает ошибку вместо редиректа. */
export async function assertAdmin(): Promise<Session> {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") {
    throw new Error("Доступ запрещён");
  }
  return session;
}