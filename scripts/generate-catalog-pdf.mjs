#!/usr/bin/env node

/**
 * Generates a printable PDF catalog from /catalog/print.
 *
 * Usage:
 *   npm run dev          # in another terminal
 *   npm run catalog:pdf
 *
 * Options (env):
 *   CATALOG_BASE_URL=http://127.0.0.1:3000
 *   CATALOG_OUTPUT=./public/catalog/sora-catalog.pdf
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const baseUrl = process.env.CATALOG_BASE_URL ?? "http://127.0.0.1:3000";
const outputPath = path.resolve(
  process.cwd(),
  process.env.CATALOG_OUTPUT ?? "./public/catalog/sora-catalog.pdf",
);
const printUrl = `${baseUrl.replace(/\/$/, "")}/catalog/print`;

async function waitForServer(url, attempts = 30) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server is not reachable at ${url}. Start it with "npm run dev" first.`);
}

async function main() {
  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error(
      "Puppeteer is required. Install it once with:\n\n  npm install --save-dev puppeteer\n",
    );
    process.exit(1);
  }

  console.log(`Waiting for ${baseUrl} ...`);
  await waitForServer(baseUrl);

  console.log(`Rendering ${printUrl}`);
  const browser = await puppeteer.default.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(printUrl, { waitUntil: "networkidle0", timeout: 120_000 });
  await page.emulateMediaType("print");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "10mm",
      right: "10mm",
      bottom: "10mm",
      left: "10mm",
    },
  });

  await browser.close();

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, pdf);

  console.log(`Saved catalog PDF to ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
