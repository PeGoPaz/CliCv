/**
 * Shared plumbing for the generated region of index.html.
 * Used by build-page.mjs (writes it) and check-cv-sync.mjs (verifies it).
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

export const INDEX = resolve("index.html");
export const START = "<!-- generated:start — npm run page. Source of truth: src/config/content.ts -->";
export const END = "<!-- generated:end -->";

export function readIndex() {
  return readFileSync(INDEX, "utf8");
}

/** The HTML the renderer would produce from the current content. */
export async function buildRegion() {
  const path = resolve("dist/page/render.js");
  try {
    const mod = await import(pathToFileURL(path).href);
    return mod.renderShell();
  } catch (err) {
    console.error(`✗ could not load ${path} — run "npm run build" first.`);
    console.error(`  ${err.message}`);
    process.exit(1);
  }
}

function bounds(html) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    console.error("✗ generated:start / generated:end markers not found in index.html.");
    process.exit(1);
  }
  return [start + START.length, end];
}

/** index.html with the region replaced — byte-identical to a fresh `npm run page`. */
export function spliceRegion(html, region) {
  const [from, to] = bounds(html);
  return html.slice(0, from) + "\n" + region + "\n" + html.slice(to);
}
