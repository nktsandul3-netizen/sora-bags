import { requireAdmin } from "@/lib/admin/guard";
import {
  getSalesIntelligenceDashboard,
  parseIntelligencePeriod,
} from "@/lib/admin/sales-intelligence";

function csvCell(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  await requireAdmin();
  const url = new URL(request.url);
  const period = parseIntelligencePeriod(url.searchParams.get("period") ?? undefined);
  const dashboard = await getSalesIntelligenceDashboard(period);
  const header = [
    "Название товара",
    "Slug",
    "Просмотры",
    "Избранное",
    "Корзина",
    "Покупки",
    "Конверсия",
    "Score",
    "Сигналы",
  ];
  const rows = dashboard.highInterestLowPurchase.map((row) => [
    row.title,
    row.slug,
    row.views,
    row.wishlistAdds,
    row.cartAdds,
    row.purchases,
    `${row.conversion}%`,
    row.score,
    row.signals.join("; "),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => csvCell(cell)).join(","))
    .join("\n");

  return new Response("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sora-analytics-${period}.csv"`,
    },
  });
}
