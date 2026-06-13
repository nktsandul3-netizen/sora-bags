"use client";

import { useCallback, useState } from "react";

interface Props {
  images: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
}

export default function ImageUploader({ images, onChange, folder = "products" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null);
      setUploading(true);
      const next = [...images];
      try {
        for (const file of Array.from(files)) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("folder", folder);
          const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Ошибка загрузки");
          if (!next.includes(data.url)) next.push(data.url);
        }
        onChange(next);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
      } finally {
        setUploading(false);
      }
    },
    [images, folder, onChange],
  );

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  function remove(url: string) {
    onChange(images.filter((i) => i !== url));
  }

  function addUrl() {
    const url = urlInput.trim();
    if (url && !images.includes(url)) {
      onChange([...images, url]);
      setUrlInput("");
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragOver ? "border-[#A01D26] bg-[#A01D26]/5" : "border-stone-300 bg-stone-50"
        }`}
      >
        <p className="text-sm text-stone-600">
          {uploading ? "Загрузка…" : "Перетащите изображения сюда или выберите файлы"}
        </p>
        <label className="mt-3 inline-block cursor-pointer bg-[#A01D26] px-4 py-2 text-sm text-white hover:opacity-90">
          Выбрать файлы
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="flex gap-2">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Или вставьте URL / путь (/media/...)"
          className="flex-1 border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#A01D26]"
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
        />
        <button
          type="button"
          onClick={addUrl}
          className="border border-stone-300 px-4 py-2 text-sm hover:border-[#A01D26]"
        >
          Добавить
        </button>
      </div>

      {error && <p className="text-sm text-[#A01D26]">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {images.map((url) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden bg-stone-100 ring-1 ring-stone-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-700 opacity-0 shadow group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}