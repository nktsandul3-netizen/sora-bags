import type { AdminOrderTimelineItem } from "@/lib/admin/orders";

const TYPE_LABELS: Record<AdminOrderTimelineItem["type"], string> = {
  created: "Создан",
  status_change: "Статус",
  note: "Заметка",
  tracking: "Доставка",
  payment: "Оплата",
};

export default function OrderTimeline({ events }: { events: AdminOrderTimelineItem[] }) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (sorted.length === 0) {
    return <p className="text-sm text-stone-400">Событий пока нет</p>;
  }

  return (
    <ol className="relative space-y-4 border-l border-stone-200 pl-4">
      {sorted.map((ev, i) => (
        <li key={`${ev.createdAt}-${i}`} className="relative">
          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#A01D26] ring-4 ring-white" />
          <p className="text-xs uppercase tracking-wide text-stone-400">
            {TYPE_LABELS[ev.type]} · {new Date(ev.createdAt).toLocaleString("ru-RU")}
          </p>
          <p className="mt-0.5 text-sm text-stone-800">{ev.message}</p>
          {ev.author && <p className="text-xs text-stone-400">{ev.author}</p>}
        </li>
      ))}
    </ol>
  );
}