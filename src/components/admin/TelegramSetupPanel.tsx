"use client";

import { useState, useTransition } from "react";
import { testTelegramAction, type ActionState } from "@/app/admin/actions";

export default function TelegramSetupPanel({
  enabled,
  fromEnv,
}: {
  enabled: boolean;
  fromEnv: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [testResult, setTestResult] = useState<ActionState | null>(null);

  function handleTest() {
    setTestResult(null);
    startTransition(async () => {
      const result = await testTelegramAction();
      setTestResult(result);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-stone-200 bg-stone-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-stone-900">Статус подключения</p>
          <p className="text-xs text-stone-500">
            {fromEnv
              ? "Токен и Chat ID заданы в .env.local"
              : "Токен и Chat ID из настроек ниже"}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            enabled ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"
          }`}
        >
          {enabled ? "Подключено" : "Не настроено"}
        </span>
      </div>

      <div className="rounded border border-stone-200 bg-white p-4 text-sm text-stone-600">
        <p className="mb-2 font-medium text-stone-900">Как подключить за 3 шага</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Откройте{" "}
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A01D26] hover:underline"
            >
              @BotFather
            </a>{" "}
            в Telegram → команда <code className="bg-stone-100 px-1">/newbot</code> → скопируйте
            токен.
          </li>
          <li>
            Напишите вашему боту любое сообщение, затем откройте{" "}
            <a
              href="https://t.me/userinfobot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A01D26] hover:underline"
            >
              @userinfobot
            </a>{" "}
            — он покажет ваш Chat ID (число вида <code className="bg-stone-100 px-1">123456789</code>
            ).
          </li>
          <li>
            Вставьте токен и Chat ID ниже и нажмите «Сохранить», затем «Отправить тест».
          </li>
        </ol>
        <p className="mt-3 text-xs text-stone-400">
          Альтернатива: добавьте в <code className="bg-stone-100 px-1">.env.local</code> переменные{" "}
          <code className="bg-stone-100 px-1">TELEGRAM_BOT_TOKEN</code> и{" "}
          <code className="bg-stone-100 px-1">TELEGRAM_CHAT_ID</code>, затем перезапустите сервер.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleTest}
          disabled={!enabled || pending}
          className="border border-stone-300 px-4 py-2.5 text-sm text-stone-700 hover:border-[#A01D26] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Отправка…" : "Отправить тест"}
        </button>
        {testResult?.ok && (
          <span className="text-sm text-emerald-700">Тестовое сообщение отправлено в Telegram</span>
        )}
        {testResult?.error && <span className="text-sm text-[#A01D26]">{testResult.error}</span>}
      </div>
    </div>
  );
}