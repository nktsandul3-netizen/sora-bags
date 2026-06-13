import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-stone-400">
      <Link href="/" className="hover:text-stone-700">
        Главная
      </Link>
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5">
          <span>/</span>
          {it.href ? (
            <Link href={it.href} className="hover:text-stone-700">
              {it.label}
            </Link>
          ) : (
            <span className="text-stone-600">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}