#!/usr/bin/env node
// Скачивает превью для ручного списка постов в public/instagram/.
// Использование: node scripts/fetch-instagram-thumbnails.mjs

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const posts = [
  { id: "DaAlYOktYC-", url: "https://www.instagram.com/reel/DaAlYOktYC-/" },
  { id: "DaIV_Zaty51", url: "https://www.instagram.com/reel/DaIV_Zaty51/" },
  { id: "Daaz_qutQIz", url: "https://www.instagram.com/reel/Daaz_qutQIz/" },
  { id: "DaYE_FGjVix", url: "https://www.instagram.com/p/DaYE_FGjVix/" },
  { id: "DZ8Q9SINk3w", url: "https://www.instagram.com/reel/DZ8Q9SINk3w/" },
  { id: "DZ7YbJ1NqNT", url: "https://www.instagram.com/reel/DZ7YbJ1NqNT/" },
  { id: "DZ0Qm_DDRW7", url: "https://www.instagram.com/p/DZ0Qm_DDRW7/" },
  { id: "DZ7YM3Bt6VZ", url: "https://www.instagram.com/p/DZ7YM3Bt6VZ/" },
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "instagram");

function decodeOgImage(html) {
  const match = html.match(/property="og:image"\s+content="([^"]+)"/i);
  return match?.[1]?.replaceAll("&amp;", "&") ?? null;
}

async function fetchOgImage(postUrl) {
  const response = await fetch(postUrl, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${postUrl}`);
  }

  const imageUrl = decodeOgImage(await response.text());
  if (!imageUrl) {
    throw new Error(`og:image not found for ${postUrl}`);
  }

  return imageUrl;
}

async function downloadImage(imageUrl, filePath) {
  const response = await fetch(imageUrl, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for image ${filePath}`);
  }

  await writeFile(filePath, Buffer.from(await response.arrayBuffer()));
}

await mkdir(outDir, { recursive: true });

for (const post of posts) {
  const filePath = path.join(outDir, `${post.id}.jpg`);
  const imageUrl = await fetchOgImage(post.url);
  await downloadImage(imageUrl, filePath);
  console.log(`✓ ${post.id}.jpg`);
}

console.log("\nГотово. Превью сохранены в public/instagram/.");
