import Link from "next/link";

export default function SectionTitle({
  title,
  href,
  hrefLabel = "Смотреть все",
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <h2 className="font-serif text-2xl text-stone-950 sm:text-3xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-stone-500 underline-offset-4 hover:text-stone-950 hover:underline"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}