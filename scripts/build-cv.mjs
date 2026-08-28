#!/usr/bin/env node
/**
 * Renders assets/cv.pdf from src/config/content.ts, so the CV can never drift
 * from the site. Run after npm run build. Anything the site does not carry
 * (phone number, certificates) lives in scripts/cv-data.json.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find(existsSync);

if (!CHROME) {
  console.error("No Chrome/Chromium found - cannot render the PDF.");
  process.exit(1);
}

const c = await import(pathToFileURL(resolve("dist/config/content.js")).href);
const extra = JSON.parse(readFileSync("scripts/cv-data.json", "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Projects get their opening sentence only - the CV has to stay on one page.
const brief = (text) => {
  const first = text.split(/\.\s+(?=[A-Z])/)[0].trim();
  return first.endsWith(".") ? first : first + ".";
};

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const skills = c.SKILLS.map(
  (g) => `<p class="row"><strong>${esc(g.category)}:</strong> ${esc(g.items.join(", "))}</p>`,
).join("");

const education = c.EDUCATION.map(
  (e) => `<p class="row"><strong>${esc(e.institution)}</strong><br>
    <em>${esc(e.qualification)}</em> | ${esc(e.description.replace(" · ", " | "))} | ${esc(e.period)}</p>`,
).join("");

const experience = c.EXPERIENCE.map(
  (x) => `<div class="item">
    <p class="head"><strong>${esc(x.role)}</strong> at <em>${esc(x.company)}</em></p>
    <p class="meta">${esc(x.description.replace(" · ", " | "))} | ${esc(x.period)}</p>
    <ul>${x.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
  </div>`,
).join("");

const projects = c.PROJECTS.map((p) => {
  const links = [p.link, p.repo].filter(Boolean).map((u) => `<a href="${esc(u)}">${esc(host(u))}</a>`);
  return `<div class="item">
    <p class="head"><strong>${esc(p.name)}</strong> | <em>${esc(p.stack.slice(0, 5).join(", "))}</em>${
      p.period ? ` | ${esc(p.period)}` : ""
    }</p>
    <p class="row">${esc(p.summary || brief(p.description))}${links.length ? ` ${links.join(" · ")}` : ""}</p>
  </div>`;
}).join("");

const certificates = extra.certificates
  .map((c2) => `<p class="row"><strong>${esc(c2.name)}</strong> | ${esc(c2.period)}</p>`)
  .join("");

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Vladimir Rainov - CV</title>
<style>
  @page { size: A4; margin: 10mm 12mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.1pt; line-height: 1.24; color: #000; }
  a { color: #1155cc; }
  header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12mm; }
  h1 { font-size: 21pt; line-height: 1.05; letter-spacing: -0.4pt; }
  .role { font-size: 12pt; margin-top: 0.4mm; }
  .site { font-size: 10pt; }
  .contact { text-align: right; font-size: 9pt; }
  h2 { font-size: 10.5pt; text-align: center; letter-spacing: 0.6pt;
       border-top: 1px solid #000; border-bottom: 1px solid #000;
       margin: 2.4mm 0 1.2mm; padding: 0.5mm 0; }
  .avail { margin-top: 1.2mm; }
  .item { margin-bottom: 1.2mm; }
  .item:last-child { margin-bottom: 0; }
  .head { font-size: 10pt; }
  .meta { font-style: italic; }
  ul { margin: 0.4mm 0 0 5.5mm; }
  li { margin-bottom: 0.3mm; }
  .row { margin-bottom: 0.5mm; }
</style></head><body>
  <header>
    <div>
      <h1>${esc(c.PROFILE.name)}</h1>
      <p class="role">${esc(c.PROFILE.title)}</p>
      <p class="site"><a href="https://vladr.tech/">vladr.tech</a></p>
    </div>
    <div class="contact">
      ${esc(c.PROFILE.location)}<br>
      ${esc(extra.phone)}<br>
      <a href="mailto:${esc(c.CONTACTS.email)}">${esc(c.CONTACTS.email)}</a><br>
      ${c.LINKS.map((l) => `<a href="${esc(l.url)}">${esc(l.display)}</a>`).join("<br>")}
    </div>
  </header>

  <h2>PROFILE</h2>
  <p class="row">${esc(c.ABOUT)}</p>
  <p class="avail"><strong>Availability:</strong> ${esc(c.PROFILE.availability)}</p>

  <h2>EDUCATION</h2>
  ${education}

  <h2>SKILLS</h2>
  ${skills}

  <h2>PROFESSIONAL EXPERIENCE</h2>
  ${experience}

  <h2>PROJECTS</h2>
  ${projects}

  <h2>CERTIFICATES</h2>
  ${certificates}
</body></html>`;

writeFileSync("assets/cv.html", html);
execFileSync(CHROME, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--print-to-pdf=assets/cv.pdf",
  pathToFileURL(resolve("assets/cv.html")).href,
], { stdio: ["ignore", "ignore", "pipe"] });

const pages = readFileSync("assets/cv.pdf").toString("latin1").match(/\/Type\s*\/Page[^s]/g);
console.log(`assets/cv.pdf written - ${pages ? pages.length : "?"} page(s)`);
