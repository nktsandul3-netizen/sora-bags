#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
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
}

loadEnvLocal();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sora";

if (!uri) {
  console.error("❌ MONGODB_URI не задан");
  process.exit(1);
}

const numbers = process.argv.slice(2);
const deleteAll = numbers.includes("--all");
const listOnly = numbers.includes("--list");
const ids = deleteAll || listOnly ? [] : numbers.filter((n) => !n.startsWith("--"));
const client = new MongoClient(uri);

try {
  await client.connect();
  const col = client.db(dbName).collection("orders");

  const filter = deleteAll || listOnly
    ? {}
    : ids.length > 0
      ? { $or: ids.flatMap((n) => [{ order_number: n }, { orderNumber: n }, { number: n }]) }
      : {};

  const toDelete = await col
    .find(filter)
    .project({ order_number: 1, orderNumber: 1, number: 1, customer_name: 1 })
    .toArray();

  if (listOnly) {
    console.log("Заказов:", toDelete.length);
    for (const o of toDelete) {
      console.log(o.order_number || o.orderNumber || o.number);
    }
    process.exit(0);
  }

  if (toDelete.length === 0) {
    console.log("Заказов для удаления не найдено.");
    process.exit(0);
  }

  for (const o of toDelete) {
    console.log("Удаляю:", o.order_number || o.orderNumber || o.number, o.customer_name || "");
  }

  const res = await col.deleteMany({ _id: { $in: toDelete.map((o) => o._id) } });
  console.log(`✅ Удалено: ${res.deletedCount}`);
} finally {
  await client.close().catch(() => {});
}
