#!/usr/bin/env node
// Проверка подключения Instagram Graph API.
// Использование: npm run check-instagram

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

loadEnvLocal();

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;

if (!accessToken) {
  console.error("❌ INSTAGRAM_ACCESS_TOKEN не задан в .env.local");
  console.log(`
Как получить токен:
1. Откройте https://developers.facebook.com/apps/
2. Создайте приложение → Use case: Other → Business
3. Добавьте продукт «Instagram» → «API setup with Instagram login»
4. Подключите аккаунт @sora.italy (Business или Creator)
5. Сгенерируйте User access token с правами instagram_basic, instagram_manage_insights
6. Добавьте в .env.local:
   INSTAGRAM_ACCESS_TOKEN=ваш_токен
`);
  process.exit(1);
}

async function main() {
  const meUrl = new URL("https://graph.instagram.com/me");
  meUrl.searchParams.set("fields", "id,username");
  meUrl.searchParams.set("access_token", accessToken);

  const meRes = await fetch(meUrl);
  const me = await meRes.json();

  if (!meRes.ok) {
    console.error("❌ Не удалось получить профиль Instagram:", me.error?.message ?? meRes.statusText);
    process.exit(1);
  }

  const resolvedUserId = userId || me.id;
  console.log(`✓ Аккаунт: @${me.username} (id: ${me.id})`);

  if (!userId) {
    console.log(`→ Добавьте в .env.local: INSTAGRAM_USER_ID=${me.id}`);
  }

  const mediaUrl = new URL(`https://graph.instagram.com/v25.0/${resolvedUserId}/media`);
  mediaUrl.searchParams.set("fields", "id,caption,media_type,permalink,timestamp");
  mediaUrl.searchParams.set("limit", "6");
  mediaUrl.searchParams.set("access_token", accessToken);

  const mediaRes = await fetch(mediaUrl);
  const media = await mediaRes.json();

  if (!mediaRes.ok) {
    console.error("❌ Не удалось получить посты:", media.error?.message ?? mediaRes.statusText);
    process.exit(1);
  }

  const count = media.data?.length ?? 0;
  console.log(`✓ Получено постов: ${count}`);
  if (count > 0) {
    console.log("  Последние:");
    for (const post of media.data.slice(0, 3)) {
      console.log(`  - ${post.media_type} ${post.permalink}`);
    }
  }

  console.log("\nInstagram подключён. Перезапустите dev-сервер и откройте главную страницу.");
}

main().catch((error) => {
  console.error("❌ Ошибка:", error.message);
  process.exit(1);
});
