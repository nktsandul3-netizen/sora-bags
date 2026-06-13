const MESSAGE =
  "Летняя распродажа уже в SÓRA — скидки до 50% на избранные модели.";

export default function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-stone-950 text-stone-50">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16 whitespace-nowrap py-2 text-xs font-medium tracking-wide">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center gap-16">
            {MESSAGE}
          </span>
        ))}
      </div>
    </div>
  );
}