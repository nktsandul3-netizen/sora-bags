import { auth } from "@/auth";
import { exportSubscribersCsv } from "@/lib/admin/newsletter";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") {
    return Response.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? undefined;
  const csv = await exportSubscribersCsv(search);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}