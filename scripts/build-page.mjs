#!/usr/bin/env node
/**
 * Regenerates the static page inside index.html from src/config/content.ts.
 * Run after npm run build — reads the compiled dist/page/render.js.
 */
import { writeFileSync } from "node:fs";
import { INDEX, readIndex, buildRegion, spliceRegion } from "./page-region.mjs";

const before = readIndex();
const after = spliceRegion(before, await buildRegion());

if (before === after) {
  console.log("✓ index.html already up to date.");
} else {
  writeFileSync(INDEX, after);
  console.log("✓ index.html regenerated from content.ts.");
}
