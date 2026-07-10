import Link from "next/link";
import { getServerT } from "@/lib/server-i18n";

export default async function SectionTitle({
  title,
  href,
  hrefLabel,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  const t = await getServerT();
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <h2 className="font-serif text-2xl text-stone-950 sm:text-3xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-stone-500 underline-offset-4 hover:text-stone-950 hover:underline"
        >
          {hrefLabel ?? t("common.viewAll")}
        </Link>
      )}
    </div>
  );
}