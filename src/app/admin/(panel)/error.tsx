"use client";

import Link from "next/link";

export default function AdminPanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isMongo =
    error.message.includes("Mongo") ||
    error.message.includes("MONGODB") ||
    error.digest?.includes("959265827");

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-serif text-2xl text-stone-900">Админ-панель недоступна</h1>
      <p className="mt-3 text-sm text-stone-600">
        {isMongo
          ? "Не удалось подключиться к базе данных MongoDB. Без неё админка не работает."
          : "Произошла ошибка при загрузке страницы."}
      </p>

      {isMongo && (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-stone-600">
          <li>
            Откройте{" "}
            <a
              href="https://cloud.mongodb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A01D26] hover:underline"
            >
              MongoDB Atlas
            </a>{" "}
            → Network Access → добавьте IP (или 0.0.0.0/0 для разработки)
          </li>
          <li>Убедитесь, что кластер запущен (не Paused)</li>
          <li>Обновите MONGODB_URI в .env.local и перезапустите сервер</li>
          <li>
            В терминале: <code className="bg-stone-100 px-1">npm run check-mongo</code>
          </li>
        </ol>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-[#A01D26] px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Повторить
        </button>
        <Link href="/admin/login" className="px-4 py-2 text-sm text-stone-600 hover:text-[#A01D26]">
          На страницу входа
        </Link>
      </div>
    </div>
  );
}