// Unit tests for the terminal's CommandHandler. It needs only three
// collaborators - a History, an output renderer and a theme setter - plus a
// minimal `document` shim for the two commands that touch the DOM directly
// (clear empties #terminalBody, cv builds and clicks a download link).
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { CommandHandler } from "../dist/terminal/CommandHandler.js";
import { History } from "../dist/utils/history.js";
import { CV_FILE_PATH, CV_DOWNLOAD_NAME } from "../dist/config/cv.js";
import { THEMES } from "../dist/config/themes.js";

function installDom() {
  const created = [];
  const terminalBody = { innerHTML: "" };
  const document = {
    body: { appendChild(el) { return el; } },
    getElementById(id) {
      if (id === "terminalBody") return terminalBody;
      return null;
    },
    // The help and theme listings bind buttons in a setTimeout; with no
    // buttons in the tree this is a no-op.
    querySelectorAll() {
      return [];
    },
    createElement(tag) {
      const el = {
        tagName: tag,
        href: "",
        download: "",
        clickCount: 0,
        click() { this.clickCount += 1; },
        remove() {},
        appendChild(child) { return child; },
      };
      created.push(el);
      return el;
    },
  };
  globalThis.document = document;
  return { document, terminalBody, created };
}

function handler(options) {
  const output = [];
  const render = (html, cls) => output.push({ html: html ?? "", cls });
  const themeCalls = [];
  const setTheme = (id) => themeCalls.push(id);
  const history = options?.history ?? new History();
  const h = new CommandHandler(history, render, setTheme);
  return { h, output, themeCalls, history };
}

function merged(output) {
  return output.map((o) => o.html).join("\n");
}

beforeEach(() => {
  installDom();
});

describe("command routing", () => {
  it("ignores a blank line", async () => {
    const { h, output } = handler();
    await h.execute("   ");
    assert.equal(output.length, 0);
  });

  it("echoes the command before its output", async () => {
    const { h, output } = handler();
    await h.execute("about");
    assert.match(output[0].html, /echo-line/);
    assert.ok(output[0].html.includes("about"));
  });

  it("escapes markup in the echoed line", async () => {
    const { h, output } = handler();
    await h.execute("skills <b> & <>");
    assert.ok(merged(output).includes("skills &lt;b&gt; &amp; &lt;&gt;"));
    assert.ok(!merged(output).includes("<b>"));
  });

  it("answers an unknown command with a hint to try help", async () => {
    const { h, output } = handler();
    await h.execute("frobnicate");
    assert.ok(merged(output).includes("command not found: frobnicate"));
    assert.ok(merged(output).includes("help"));
  });
});

describe("theme", () => {
  it("switches to a known theme and prints the new name", async () => {
    const { h, output, themeCalls } = handler();
    await h.execute("theme dracula");
    assert.deepEqual(themeCalls, ["dracula"]);
    assert.ok(merged(output).includes("Theme switched to Dracula."));
  });

  it("matches a theme id case-insensitively", async () => {
    const { h, themeCalls } = handler();
    await h.execute("theme DRACULA");
    assert.deepEqual(themeCalls, ["dracula"]);
  });

  it("prints usage and lists the themes when no name is given", async () => {
    const { h, output, themeCalls } = handler();
    await h.execute("theme");
    assert.deepEqual(themeCalls, []);
    const out = merged(output);
    assert.ok(out.includes("Usage: theme &lt;name&gt;"));
    for (const t of THEMES) assert.ok(out.includes(t.name), t.name);
  });

  it("reports an unknown theme and lists the valid ids", async () => {
    const { h, output, themeCalls } = handler();
    await h.execute("theme vaporwave");
    assert.deepEqual(themeCalls, []);
    const out = merged(output);
    assert.ok(out.includes("Unknown theme: vaporwave"));
    assert.ok(out.includes(THEMES.map((t) => t.id).join(", ")));
  });
});

describe("history", () => {
  it("says there is no history yet", async () => {
    const { h, output } = handler();
    await h.execute("history");
    assert.ok(merged(output).includes("No command history yet."));
  });

  it("prints numbered entries from oldest to newest", async () => {
    const history = new History();
    for (const c of ["about", "skills", "links"]) history.push(c);
    const { h, output } = handler({ history });
    await h.execute("history");
    const out = merged(output);
    assert.ok(out.includes("about"));
    assert.ok(out.includes("skills"));
    assert.ok(out.includes("links"));
    // oldest to newest
    assert.ok(out.indexOf("about") < out.indexOf("skills"));
    assert.ok(out.indexOf("skills") < out.indexOf("links"));
  });
});

describe("clear", () => {
  it("empties the terminal body and re-prints the help", async () => {
    const { terminalBody } = installDom();
    terminalBody.innerHTML = "stale output";
    const { h, output } = handler();
    await h.execute("clear");
    assert.equal(terminalBody.innerHTML, "");
    assert.ok(merged(output).includes("Available Commands"));
  });
});

describe("cv", () => {
  it("downloads the CV through a clicked link", async () => {
    const { created } = installDom();
    const { h, output } = handler();
    await h.execute("cv");
    assert.ok(merged(output).includes("Initiating CV download..."));

    const anchor = created[created.length - 1];
    assert.equal(anchor.tagName, "a");
    assert.equal(anchor.href, CV_FILE_PATH);
    assert.equal(anchor.download, CV_DOWNLOAD_NAME);
    assert.equal(anchor.clickCount, 1);
  });
});

describe("whoami", () => {
  it("renders every section", async () => {
    const { h, output } = handler();
    await h.execute("whoami");
    const out = merged(output);
    for (const title of ["Education", "Technical Skills", "Experience", "Projects", "Contact", "Links"]) {
      assert.ok(out.includes(title), title);
    }
  });
});

describe("help and aliases", () => {
  const helpCommands = [
    "whoami", "about", "education", "skills", "experience", "projects",
    "contacts", "links", "themes", "theme", "history", "cv", "clear",
  ];

  it("lists every command", async () => {
    const { h, output } = handler();
    await h.execute("help");
    const out = merged(output);
    assert.ok(out.includes("Available Commands"));
    for (const c of helpCommands) assert.ok(out.includes(c), c);
  });

  it("treats the short forms as their long versions", async () => {
    const { h, output } = handler();

    await h.execute("?");
    assert.ok(merged(output).includes("Available Commands"));

    output.length = 0;
    await h.execute("edu");
    assert.ok(merged(output).includes("Education"));

    output.length = 0;
    await h.execute("exp");
    assert.ok(merged(output).includes("Experience"));

    output.length = 0;
    await h.execute("contact");
    assert.ok(merged(output).includes("Contact"));

    output.length = 0;
    await h.execute("resume");
    assert.ok(merged(output).includes("Initiating CV download..."));

    output.length = 0;
    await h.execute("cls");
    assert.ok(merged(output).includes("Available Commands"));
  });
});