#!/usr/bin/env node
/**
 * Fails if a string in content.ts is missing from #static-cv in index.html.
 * Run after npm run build — reads the compiled dist/config/content.js.
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const CONTENT = resolve("dist/config/content.js");
const INDEX = resolve("index.html");

let content;
try {
  content = await import(pathToFileURL(CONTENT).href);
} catch {
  console.error(`✗ ${CONTENT} not found — run "npm run build" first.`);
  process.exit(1);
}

const html = readFileSync(INDEX, "utf8");
const match = html.match(/<section[^>]*id="static-cv"[\s\S]*?<\/section>/);
if (!match) {
  console.error('✗ #static-cv section not found in index.html.');
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const normalise = (s) => decode(s).replace(/\s+/g, " ").trim();

const staticCv = normalise(match[0].replace(/<[^>]+>/g, " "));

/** @type {Array<[string, string]>} label -> text that must appear verbatim */
const required = [
  ["ABOUT", content.ABOUT],
  ["PROFILE.name", content.PROFILE.name],
  ["PROFILE.tagline", content.PROFILE.tagline],
  ["PROFILE.availability", content.PROFILE.availability],
  ["CONTACTS.email", content.CONTACTS.email],
  ["CONTACTS.availability", content.CONTACTS.availability],
  ["CONTACTS.responseTime", content.CONTACTS.responseTime],
];

for (const group of content.SKILLS) {
  required.push([`SKILLS/${group.category}`, group.items.join(", ")]);
}
for (const exp of content.EXPERIENCE) {
  required.push([`EXPERIENCE/${exp.company}/role`, exp.role]);
  required.push([`EXPERIENCE/${exp.company}/period`, exp.period]);
  exp.highlights.forEach((h, i) =>
    required.push([`EXPERIENCE/${exp.company}/highlight[${i}]`, h]),
  );
}
for (const project of content.PROJECTS) {
  required.push([`PROJECTS/${project.name}/name`, project.name]);
  required.push([`PROJECTS/${project.name}/description`, project.description]);
  if (project.period) required.push([`PROJECTS/${project.name}/period`, project.period]);
  if (project.link) required.push([`PROJECTS/${project.name}/link`, project.link]);
  if (project.repo) required.push([`PROJECTS/${project.name}/repo`, project.repo]);
  if (project.writeup) required.push([`PROJECTS/${project.name}/writeup`, project.writeup]);
}
for (const link of content.LINKS) {
  required.push([`LINKS/${link.platform}`, link.url]);
}
if (Array.isArray(content.EDUCATION)) {
  for (const item of content.EDUCATION) {
    required.push([`EDUCATION/${item.institution}/qualification`, item.qualification]);
    required.push([`EDUCATION/${item.institution}/institution`, item.institution]);
    required.push([`EDUCATION/${item.institution}/period`, item.period]);
    required.push([`EDUCATION/${item.institution}/description`, item.description]);
    (item.highlights ?? []).forEach((h, i) =>
      required.push([`EDUCATION/${item.institution}/highlight[${i}]`, h]),
    );
  }
}

// Links live in href attributes, which the tag strip above removed.
const staticCvWithHrefs = staticCv + " " + normalise(
  [...match[0].matchAll(/href="([^"]+)"/g)].map((m) => m[1]).join(" "),
);

const missing = required.filter(([, text]) => text && !staticCvWithHrefs.includes(normalise(text)));

if (missing.length) {
  console.error("✗ #static-cv in index.html is out of sync with src/config/content.ts:\n");
  for (const [label, text] of missing) {
    const preview = normalise(text).slice(0, 90);
    console.error(`  ${label}\n    missing: "${preview}${text.length > 90 ? "…" : ""}"\n`);
  }
  console.error(`${missing.length} of ${required.length} strings missing. Update index.html.`);
  process.exit(1);
}

console.log(`✓ #static-cv is in sync with content.ts (${required.length} strings checked).`);
