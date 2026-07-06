#!/usr/bin/env node
// Проверка подключения Instagram Graph API.
// Использование: npm run check-instagram

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GRAPH_API_VERSION = "v25.0";

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let value = m[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = value;
    }
  } catch {
    console.error("❌ Файл .env.local не найден");
    process.exit(1);
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  const payload = await response.json();
  return { ok: response.ok, payload };
}

loadEnvLocal();

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;

if (!accessToken) {
  console.error("❌ INSTAGRAM_ACCESS_TOKEN не задан в .env.local");
  console.log(`
Как получить токен:
1. Откройте https://developers.facebook.com/tools/explorer/
2. Выберите приложение Sora Bags Website
3. Добавьте права instagram_basic и pages_show_list
4. Нажмите Generate Access Token и войдите через Facebook, связанный с @sora.italy
5. Добавьте в .env.local:
   INSTAGRAM_ACCESS_TOKEN=ваш_токен
   INSTAGRAM_USER_ID=1951366815535576
`);
  process.exit(1);
}

async function main() {
  let resolvedUserId = userId;
  let username;

  if (resolvedUserId) {
    const profileUrl = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${resolvedUserId}`);
    profileUrl.searchParams.set("fields", "id,username");
    profileUrl.searchParams.set("access_token", accessToken);

    const profile = await fetchJson(profileUrl);
    if (profile.ok) {
      username = profile.payload.username;
      console.log(`✓ Аккаунт: @${username ?? "unknown"} (id: ${profile.payload.id})`);
    } else {
      console.error("❌ INSTAGRAM_USER_ID указан неверно. Это должен быть ID Instagram Business Account, а не ID приложения Meta.");
      console.error("   Удалите INSTAGRAM_USER_ID из .env.local и запустите команду снова.");
      process.exit(1);
    }
  } else {
    const pagesUrl = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/me/accounts`);
    pagesUrl.searchParams.set("fields", "instagram_business_account{id,username}");
    pagesUrl.searchParams.set("access_token", accessToken);

    const pages = await fetchJson(pagesUrl);
    if (!pages.ok) {
      console.error("❌ Не удалось получить Instagram-аккаунт:", pages.payload.error?.message ?? "unknown error");
      process.exit(1);
    }

    const account = pages.payload.data?.find((page) => page.instagram_business_account?.id)?.instagram_business_account;
    if (!account?.id) {
      console.error("❌ Не найден Instagram Business Account у связанных Facebook-страниц.");
      console.error("   Проверьте:");
      console.error("   1. @sora.italy — Business/Creator и привязан к Facebook-странице");
      console.error("   2. Токен создан через Facebook-аккаунт администратора этой страницы");
      console.error("   3. В Graph API Explorer добавлены права instagram_basic и pages_show_list");
      process.exit(1);
    }

    resolvedUserId = account.id;
    username = account.username;
    console.log(`✓ Аккаунт: @${username ?? "unknown"} (id: ${account.id})`);
    console.log(`→ Добавьте в .env.local: INSTAGRAM_USER_ID=${account.id}`);
  }

  const mediaUrl = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${resolvedUserId}/media`);
  mediaUrl.searchParams.set("fields", "id,caption,media_type,permalink,timestamp");
  mediaUrl.searchParams.set("limit", "6");
  mediaUrl.searchParams.set("access_token", accessToken);

  const media = await fetchJson(mediaUrl);
  if (!media.ok) {
    console.error("❌ Не удалось получить посты:", media.payload.error?.message ?? "unknown error");
    process.exit(1);
  }

  const count = media.payload.data?.length ?? 0;
  console.log(`✓ Получено постов: ${count}`);
  if (count > 0) {
    console.log("  Последние:");
    for (const post of media.payload.data.slice(0, 3)) {
      console.log(`  - ${post.media_type} ${post.permalink}`);
    }
  }

  console.log("\nInstagram подключён. Перезапустите dev-сервер и откройте главную страницу.");
}

main().catch((error) => {
  console.error("❌ Ошибка:", error.message);
  process.exit(1);
});
