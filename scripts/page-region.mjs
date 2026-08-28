/**
 * Shared plumbing for the generated regions of index.html.
 * Used by build-page.mjs (writes them) and check-cv-sync.mjs (verifies them).
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

export const INDEX = resolve("index.html");

/** Each region is delimited by a comment pair and filled by one renderer export. */
const REGIONS = [
  {
    start: "<!-- generated:head-start - npm run page -->",
    end: "<!-- generated:head-end -->",
    render: "renderHead",
  },
  {
    start: "<!-- generated:start - npm run page. Source of truth: src/config/content.ts -->",
    end: "<!-- generated:end -->",
    render: "renderShell",
  },
];

export function readIndex() {
  return readFileSync(INDEX, "utf8");
}

async function loadRenderer() {
  const path = resolve("dist/page/render.js");
  try {
    return await import(pathToFileURL(path).href);
  } catch (err) {
    console.error(`✗ could not load ${path} - run "npm run build" first.`);
    console.error(`  ${err.message}`);
    process.exit(1);
  }
}

function splice(html, region, body) {
  const start = html.indexOf(region.start);
  const end = html.indexOf(region.end);
  if (start === -1 || end === -1 || end < start) {
    console.error(`✗ markers not found in index.html: ${region.start}`);
    process.exit(1);
  }
  return html.slice(0, start + region.start.length) + "\n" + body + "\n" + html.slice(end);
}

/** index.html with every generated region refreshed from the current content. */
export async function applyRegions(html) {
  const mod = await loadRenderer();
  let out = html;
  for (const region of REGIONS) out = splice(out, region, mod[region.render]());
  return out;
}
