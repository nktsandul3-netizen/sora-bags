"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useCallback, useState } from "react";
import { deleteMediaAction, type ActionState } from "@/app/admin/actions";
import type { MediaView } from "@/lib/admin/media";

const initial: ActionState = {};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DeleteMediaButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState(deleteMediaAction, initial);
  return (
    <form
      action={action}
      onSubmit={(e) => !confirm("Удалить файл?") && e.preventDefault()}
      className="absolute right-1 top-1 opacity-0 transition group-hover:opacity-100"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="bg-[#A01D26] px-2 py-0.5 text-[10px] text-white disabled:opacity-60"
      >
        ×
      </button>
      {state.error && <span className="sr-only">{state.error}</span>}
    </form>
  );
}

export default function MediaLibrary({
  media,
  folders,
  total,
}: {
  media: MediaView[];
  folders: string[];
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const folder = params.get("folder") ?? "all";
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [uploadFolder, setUploadFolder] = useState("general");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const applyFilters = useCallback(
    (nextFolder: string, nextSearch: string) => {
      const sp = new URLSearchParams();
      if (nextFolder !== "all") sp.set("folder", nextFolder);
      if (nextSearch) sp.set("search", nextSearch);
      router.push(`/admin/media?${sp.toString()}`);
    },
    [router],
  );

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", uploadFolder);
      await fetch("/api/admin/upload", { method: "POST", body: fd });
    }
    setUploading(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {folders.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => applyFilters(f, search)}
              className={`px-3 py-1.5 text-sm ${
                folder === f
                  ? "bg-[#A01D26] text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200"
              }`}
            >
              {f === "all" ? "Все папки" : f}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            applyFilters(folder, search);
          }}
          className="flex gap-2"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени…"
            className="border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#A01D26]"
          />
          <button type="submit" className="bg-stone-900 px-4 py-2 text-sm text-white">
            Найти
          </button>
        </form>
      </div>

      <div
        className={`border-2 border-dashed p-8 text-center transition ${
          dragOver ? "border-[#A01D26] bg-[#A01D26]/5" : "border-stone-300 bg-white"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-stone-600">
          Перетащите изображения сюда или{" "}
          <label className="cursor-pointer text-[#A01D26] hover:underline">
            выберите файлы
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            />
          </label>
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <span className="text-stone-500">Папка:</span>
          <input
            value={uploadFolder}
            onChange={(e) => setUploadFolder(e.target.value.replace(/[^a-z0-9-_]/gi, ""))}
            className="w-32 border border-stone-300 px-2 py-1 text-sm"
          />
        </div>
        {uploading && <p className="mt-2 text-sm text-stone-500">Загрузка…</p>}
      </div>

      <p className="text-sm text-stone-500">{total} файлов</p>

      {media.length === 0 ? (
        <p className="py-12 text-center text-sm text-stone-400">Медиафайлов нет</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {media.map((m) => (
            <div key={m.id} className="group relative bg-white ring-1 ring-stone-200">
              <DeleteMediaButton id={m.id} />
              <div className="relative aspect-square bg-stone-50">
                <Image src={m.url} alt={m.filename} fill className="object-cover" sizes="160px" />
              </div>
              <div className="p-2">
                <p className="truncate text-xs text-stone-800" title={m.filename}>
                  {m.filename}
                </p>
                <p className="text-[10px] text-stone-400">
                  {m.folder} · {formatSize(m.size)}
                </p>
                <input
                  readOnly
                  value={m.url}
                  className="mt-1 w-full truncate border-0 bg-stone-50 px-1 py-0.5 text-[10px] text-stone-500"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}