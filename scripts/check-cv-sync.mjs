#!/usr/bin/env node
/**
 * Fails if the generated region of index.html no longer matches src/config/content.ts.
 * Run after npm run build — reads the compiled dist/page/render.js.
 *
 * Exact, not substring-based: this catches stale and orphaned text as well as missing text.
 */
import { statSync, existsSync } from "node:fs";
import { readIndex, buildRegion, spliceRegion } from "./page-region.mjs";

const committed = readIndex();
const expected = spliceRegion(committed, await buildRegion());

if (committed !== expected) {
  const a = committed.split("\n");
  const b = expected.split("\n");
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;

  console.error("✗ index.html is out of sync with src/config/content.ts.\n");
  console.error(`  first difference at line ${i + 1}:`);
  console.error(`    in index.html:  ${JSON.stringify((a[i] ?? "<end of file>").slice(0, 120))}`);
  console.error(`    expected:       ${JSON.stringify((b[i] ?? "<end of file>").slice(0, 120))}\n`);
  console.error("  Fix with: npm run page");
  process.exit(1);
}

console.log("✓ index.html is in sync with content.ts.");

if (existsSync("assets/cv.pdf") && existsSync("src/config/content.ts")) {
  const pdf = statSync("assets/cv.pdf").mtimeMs;
  const src = statSync("src/config/content.ts").mtimeMs;
  if (src > pdf) {
    console.warn("! assets/cv.pdf is older than content.ts — run: npm run cv");
  }
}
