// Run after npm run build: these import the compiled modules from dist/.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderHead, renderShell } from "../dist/page/render.js";
import { PROJECTS } from "../dist/config/content.js";
import { escapeAttr, escapeHtml } from "../dist/utils/html.js";
import { complete } from "../dist/utils/complete.js";

describe("escaping", () => {
  it("neutralises markup in text and attributes", () => {
    assert.equal(escapeHtml('<b>&"</b>'), '&lt;b&gt;&amp;"&lt;/b&gt;');
    assert.equal(escapeAttr('" onmouseover="x'), "&quot; onmouseover=&quot;x");
  });
});

describe("the generated page", () => {
  const html = renderShell();

  it("leads every project with its summary and folds the rest", () => {
    for (const p of PROJECTS.filter((p) => p.summary)) {
      assert.ok(html.includes(`<p class="card-lead">${escapeHtml(p.summary)}</p>`), p.name);
    }
    assert.equal(html.match(/<details class="card-details">/g).length, PROJECTS.filter((p) => p.summary).length);
  });

  it("keeps the ASCII banner unindented, or the art would shift", () => {
    const banner = html.match(/<pre class="hero-banner"[^>]*>([\s\S]*?)<\/pre>/)[1];
    assert.ok(!/^\s/.test(banner.split("\n")[1] ?? ""), "second banner line starts with indentation");
  });

  it("opens every external link in a new tab without handing it window.opener", () => {
    for (const a of html.match(/<a [^>]*target="_blank"[^>]*>/g)) {
      assert.match(a, /rel="noopener noreferrer"/);
    }
  });

  it("cannot close the JSON-LD script early", () => {
    const head = renderHead();
    const json = head.slice(head.indexOf(">") + 1, head.lastIndexOf("</script>"));
    assert.ok(!json.includes("</"), "a raw </ inside the JSON-LD");
    assert.doesNotThrow(() => JSON.parse(json.replace(/<\\\//g, "</")));
  });
});

describe("tab completion", () => {
  const commands = ["about", "clear", "contact", "contacts", "cv", "theme", "themes"];

  it("completes a single match", () => {
    assert.deepEqual(complete("ab", commands), { value: "about" });
  });

  it("extends to what several matches share", () => {
    assert.deepEqual(complete("conta", commands), { value: "contact" });
    assert.deepEqual(complete("th", commands), { value: "theme" });
  });

  it("lists the matches when it cannot extend", () => {
    assert.deepEqual(complete("c", commands), { value: "c", candidates: ["clear", "contact", "contacts", "cv"] });
  });

  it("leaves arguments and unknown commands alone", () => {
    assert.deepEqual(complete("theme dra", commands), { value: "theme dra" });
    assert.deepEqual(complete("xyz", commands), { value: "xyz" });
    assert.deepEqual(complete("", commands), { value: "" });
  });
});
