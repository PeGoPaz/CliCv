// Unit tests for ThemeManager. The module touches `document.documentElement`
// and `localStorage` only inside its functions, so a tiny fake environment is
// enough - no DOM library required.
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import {
  applyTheme,
  currentTheme,
  currentThemeId,
  initTheme,
  onThemeChange,
} from "../dist/ui/ThemeManager.js";
import { THEMES, getTheme } from "../dist/config/themes.js";

const STORAGE_KEY = "portfolio-theme";

function installDom(saved) {
  const css = {};
  const root = {
    dataset: {},
    style: { setProperty(name, value) { css[name] = value; } },
  };
  const storage = {
    store: { ...(saved ?? {}) },
    getItem(key) { return Object.hasOwn(this.store, key) ? this.store[key] : null; },
    setItem(key, value) { this.store[key] = value; },
  };
  globalThis.document = { documentElement: root };
  globalThis.localStorage = storage;
  return { root, css, storage };
}

beforeEach(() => {
  installDom();
});

describe("theme lookup", () => {
  it("returns a known theme by id and falls back to the default for a miss", () => {
    assert.equal(getTheme("matrix").id, "matrix");
    assert.equal(getTheme("ghost").name, "Ghost");
    assert.equal(getTheme("does-not-exist"), THEMES[0]);
  });
});

describe("applyTheme", () => {
  it("sets the dataset id, every colour variable, and persists the choice", () => {
    const { root, css, storage } = installDom();
    const theme = applyTheme("dracula");

    assert.equal(theme.id, "dracula");
    assert.equal(root.dataset.theme, "dracula");
    assert.equal(css["--c-bg"], theme.colors.bg);
    assert.equal(css["--c-accent"], theme.colors.accent);
    assert.equal(css["--c-prompt"], theme.colors.prompt);
    assert.equal(Object.keys(css).length, 11, "all eleven colour variables are written");
    assert.equal(storage.getItem(STORAGE_KEY), "dracula");
  });

  it("falls back to the default theme for an unknown id", () => {
    const { root, storage } = installDom();
    const theme = applyTheme("nope");

    assert.equal(theme.id, "ghost");
    assert.equal(root.dataset.theme, "ghost");
    assert.equal(storage.getItem(STORAGE_KEY), "ghost");
  });

  it("notifies listeners after switching", () => {
    installDom();
    const seen = [];
    onThemeChange((t) => seen.push(t.id));
    applyTheme("matrix");
    assert.deepEqual(seen, ["matrix"]);
  });
});

describe("current theme", () => {
  it("reads the dataset and defaults to ghost before any theme is applied", () => {
    const { root } = installDom();
    assert.equal(currentThemeId(), "ghost");

    applyTheme("solarized");
    assert.equal(root.dataset.theme, "solarized");
    assert.equal(currentThemeId(), "solarized");
    assert.equal(currentTheme().id, "solarized");
  });
});

describe("initTheme", () => {
  it("restores a saved theme when it is still valid", () => {
    const { root, storage } = installDom({ [STORAGE_KEY]: "monokai" });
    const theme = initTheme();

    assert.equal(theme.id, "monokai");
    assert.equal(root.dataset.theme, "monokai");
    assert.equal(storage.getItem(STORAGE_KEY), "monokai");
  });

  it("ignores a stale saved id and falls back to the default", () => {
    const { root } = installDom({ [STORAGE_KEY]: "removed-theme" });
    const theme = initTheme();

    assert.equal(theme.id, "ghost");
    assert.equal(root.dataset.theme, "ghost");
  });

  it("starts on the default theme when nothing was saved", () => {
    const { root } = installDom();
    const theme = initTheme();

    assert.equal(theme.id, "ghost");
    assert.equal(root.dataset.theme, "ghost");
  });
});