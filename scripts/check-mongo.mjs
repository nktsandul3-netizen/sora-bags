#!/usr/bin/env node
// Проверка подключения к MongoDB Atlas.
// Использование: npm run check-mongo

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";

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

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sora";

if (!uri) {
  console.error("❌ MONGODB_URI не задан в .env.local");
  process.exit(1);
}

if (!/^mongodb(\+srv)?:\/\//.test(uri)) {
  console.error("❌ MONGODB_URI должен начинаться с mongodb:// или mongodb+srv://");
  process.exit(1);
}

console.log("Проверяю подключение к MongoDB Atlas…");
console.log("База:", dbName);

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });

try {
  await client.connect();
  const db = client.db(dbName);
  await db.command({ ping: 1 });
  const users = await db.collection("users").countDocuments({});
  const admins = await db.collection("users").countDocuments({ role: "admin" });
  console.log("✅ Подключение успешно");
  console.log(`   Пользователей: ${users}, админов: ${admins}`);
  if (admins === 0) {
    console.log("\n⚠️  Нет администраторов. Создайте:");
    console.log('   npm run create-admin -- email@example.com пароль "Имя"');
  }
} catch (err) {
  console.error("\n❌ Не удалось подключиться к MongoDB\n");
  console.error("   ", err.message?.split("\n")[0] ?? err);
  console.error(`
Что проверить в MongoDB Atlas (cloud.mongodb.com):

1. Network Access → Add IP Address → «Allow Access from Anywhere» (0.0.0.0/0)
2. Database → кластер не на паузе (Resume, если Paused)
3. Database Access → пользователь существует, пароль актуален
4. Database → Connect → скопируйте новую строку подключения в .env.local
5. Если в пароле есть @ # % — закодируйте их для URL
6. Отключите VPN и перезапустите: npm run dev
`);
  process.exit(1);
} finally {
  await client.close().catch(() => {});
}
