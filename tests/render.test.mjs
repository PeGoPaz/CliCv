// Run after npm run build: these import the compiled modules from dist/.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderHead, renderShell } from "../dist/page/render.js";
import { LINKS, PROJECTS } from "../dist/config/content.js";
import { escapeAttr, escapeHtml } from "../dist/utils/html.js";
import { complete } from "../dist/utils/complete.js";
import { History } from "../dist/utils/history.js";

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
      assert.match(a, /rel="(me )?noopener noreferrer"/);
    }
  });

  it("marks my own profiles, and only them, with rel=me", () => {
    const meLinks = html.match(/<a [^>]*rel="me [^"]*"[^>]*>/g).map((a) => a.match(/href="([^"]+)"/)[1]);
    assert.deepEqual([...new Set(meLinks)].sort(), LINKS.map((l) => l.url).sort());
    for (const p of PROJECTS) {
      for (const url of [p.repo, p.link, p.writeup].filter(Boolean)) {
        assert.ok(!meLinks.includes(url), `${p.name}: ${url} is a project, not a profile`);
      }
    }
  });

  it("folds each screenshot away and defers loading it", () => {
    const previews = html.match(/<details class="card-details card-preview">[\s\S]*?<\/details>/g) ?? [];
    assert.equal(previews.length, PROJECTS.filter((p) => p.screenshot).length);
    for (const preview of previews) {
      assert.doesNotMatch(preview, /<details[^>]* open/);
      assert.match(preview, /<img [^>]*width="\d+" height="\d+" loading="lazy"/);
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

describe("command history", () => {
  function historyOf(...commands) {
    const history = new History();
    for (const c of commands) history.push(c);
    return history;
  }

  it("goes back to older commands with Up and stops at the oldest", () => {
    const history = historyOf("about", "skills", "links");
    assert.deepEqual([1, 2, 3, 4].map(() => history.older("proj")), ["links", "skills", "about", "about"]);
  });

  it("comes forward with Down, then back to the line being typed", () => {
    const history = historyOf("about", "skills", "links");
    for (let i = 0; i < 3; i++) history.older("proj");
    assert.deepEqual([1, 2, 3].map(() => history.newer("about")), ["skills", "links", "proj"]);
    assert.equal(history.newer("proj"), "proj");
  });

  it("starts again from the newest after a command is run", () => {
    const history = historyOf("about", "skills");
    history.older("");
    history.older("");
    history.push("about");
    assert.equal(history.older(""), "about");
    assert.equal(history.older(""), "skills");

    history.push(""); // Enter on an empty line ends the walk too
    assert.equal(history.older(""), "about");
  });

  it("leaves the input alone with nothing to recall", () => {
    const history = new History();
    assert.equal(history.older("ab"), "ab");
    assert.equal(history.newer("ab"), "ab");
  });

  it("skips blanks and repeats, and keeps the last 100", () => {
    assert.deepEqual(historyOf("cv", "cv", "", "help", "cv").all(), ["cv", "help", "cv"]);
    const long = historyOf(...Array.from({ length: 105 }, (_, i) => `theme ${i}`)).all();
    assert.equal(long.length, 100);
    assert.equal(long[0], "theme 5");
  });
});
