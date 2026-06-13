#!/usr/bin/env node
// Создаёт или повышает пользователя до роли admin и засеивает коллекцию categories.
//
// Использование:
//   node scripts/create-admin.mjs <email> <password> [Имя]
//
// Переменные MONGODB_URI / MONGODB_DB читаются из .env.local (или окружения).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

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
    // .env.local может отсутствовать — тогда берём из окружения.
  }
}

async function main() {
  loadEnvLocal();

  const [email, password, ...nameParts] = process.argv.slice(2);
  const name = nameParts.join(" ") || "Администратор";

  if (!email || !password) {
    console.error("Использование: node scripts/create-admin.mjs <email> <password> [Имя]");
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI не задан (.env.local).");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "sora");
  const users = db.collection("users");

  const lower = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await users.findOne({ email: lower });

  if (existing) {
    await users.updateOne(
      { _id: existing._id },
      { $set: { role: "admin", passwordHash, name } },
    );
    console.log(`✓ Пользователь ${lower} повышен до admin (пароль обновлён).`);
  } else {
    await users.insertOne({
      name,
      email: lower,
      passwordHash,
      role: "admin",
      createdAt: new Date(),
    });
    console.log(`✓ Создан администратор ${lower}.`);
  }

  // Сидинг категорий из статического каталога (идемпотентно).
  try {
    const { allCategories } = await import("../src/lib/data.ts").catch(() => ({
      allCategories: null,
    }));
    if (Array.isArray(allCategories)) {
      const categories = db.collection("categories");
      let inserted = 0;
      for (const c of allCategories) {
        const res = await categories.updateOne(
          { slug: c.slug },
          { $setOnInsert: { slug: c.slug, name: c.name, section: c.section, createdAt: new Date() } },
          { upsert: true },
        );
        if (res.upsertedCount) inserted += 1;
      }
      console.log(`✓ Категории: добавлено ${inserted}.`);
    }
  } catch {
    console.log("ℹ Категории не засеяны автоматически (можно сделать из админки позже).");
  }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
