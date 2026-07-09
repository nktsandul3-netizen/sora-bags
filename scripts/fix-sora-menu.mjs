#!/usr/bin/env node
/**
 * SÓRA main menu structure.
 *
 * Run: node scripts/fix-sora-menu.mjs
 * Always writes scripts/navigation-import.json
 *
 * Optional Shopify Admin update when SHOPIFY_STORE + SHOPIFY_ADMIN_TOKEN are set.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MENU_HANDLE = "main-menu";

const newMenu = [
  { title: "Весь каталог", url: "/collections/all" },
  { title: "AMALFI", url: "/collections/amalfi" },
  { title: "VENEZIA INTRECCIO", url: "/collections/venezia-intreccio" },
  { title: "Foulard / Шелк", url: "/collections/silk-scarves" },
  { title: "Charms", url: "/collections/bag-charms" },
  { title: "Кошельки", url: "/collections/wallets" },
];

const siteMenu = [
  { title: "Весь каталог", url: "/bags" },
  { title: "AMALFI", url: "/collections/amalfi-woven" },
  { title: "VENEZIA INTRECCIO", url: "/collections/venezia-intreccio" },
  { title: "Foulard / Шелк", url: "/accessories/womens-scarves-women" },
  { title: "Charms", url: "/accessories/bag-charms" },
  { title: "Кошельки", url: "/accessories/wallets-cardholders" },
];

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "navigation-import.json");

function toImportItems(items) {
  return items.map((item, index) => ({
    type: "link",
    title: item.title,
    url: item.url,
    position: index,
  }));
}

function writeNavigationImport() {
  const payload = {
    handle: MENU_HANDLE,
    title: "Main menu",
    generatedAt: new Date().toISOString(),
    shopify: {
      note: "Shopify-style collection URLs for manual Online Store → Navigation import",
      items: toImportItems(newMenu),
    },
    site: {
      note: "Actual Next.js routes used on sorabags.md",
      items: toImportItems(siteMenu),
    },
  };
  mkdirSync(__dirname, { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outPath}`);
}

async function shopifyGraphql(store, token, query, variables) {
  const res = await fetch(`https://${store}/admin/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

async function tryShopifyMenuUpdate() {
  const store = process.env.SHOPIFY_STORE?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!store || !token) {
    console.log("SHOPIFY_STORE / SHOPIFY_ADMIN_TOKEN not set — skipping Shopify API update.");
    return;
  }

  console.log(`Looking up Shopify menu "${MENU_HANDLE}" on ${store}…`);
  const data = await shopifyGraphql(
    store,
    token,
    `query MenuByHandle($handle: String!) {
      menuByHandle(handle: $handle) {
        id
        title
        handle
      }
    }`,
    { handle: MENU_HANDLE },
  );

  const menu = data?.menuByHandle;
  if (!menu?.id) {
    console.warn(
      `Menu handle "${MENU_HANDLE}" not found. Import scripts/navigation-import.json manually.`,
    );
    return;
  }

  const items = newMenu.map((item) => ({
    title: item.title,
    type: "HTTP",
    url: item.url,
  }));

  const update = await shopifyGraphql(
    store,
    token,
    `mutation MenuUpdate($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) {
      menuUpdate(id: $id, title: $title, items: $items) {
        menu { id handle title items { id title url } }
        userErrors { field message }
      }
    }`,
    {
      id: menu.id,
      title: menu.title || "Main menu",
      items,
    },
  );

  const errors = update?.menuUpdate?.userErrors ?? [];
  if (errors.length) {
    console.warn("Shopify menuUpdate userErrors:", errors);
    return;
  }

  console.log("Shopify menu updated:", update?.menuUpdate?.menu?.handle);
}

async function updateMenu() {
  console.log("Новая структура SÓRA:");
  for (const item of newMenu) {
    console.log(`  ${item.title} → ${item.url}`);
  }

  writeNavigationImport();
  await tryShopifyMenuUpdate();
}

updateMenu().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
