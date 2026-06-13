import { listMedia } from "@/lib/admin/media";
import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ folder?: string; search?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const folder = sp.folder ?? "all";
  const search = sp.search?.trim() || undefined;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const result = await listMedia({ folder, search, page, pageSize: 48 });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-stone-900">Медиатека</h1>
        <p className="mt-1 text-sm text-stone-500">Централизованное хранилище изображений</p>
      </header>
      <MediaLibrary media={result.media} folders={result.folders} total={result.total} />
    </div>
  );
}