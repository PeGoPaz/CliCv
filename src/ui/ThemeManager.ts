import { THEMES, getTheme, type Theme } from "../config/themes.js";

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "ghost";

type ThemeListener = (theme: Theme) => void;

const listeners: ThemeListener[] = [];

/** Notified whenever the theme changes - used by the status bar and the page control. */
export function onThemeChange(listener: ThemeListener): void {
  listeners.push(listener);
}

export function applyTheme(id: string): Theme {
  const theme = getTheme(id);
  const root = document.documentElement;
  root.dataset.theme = theme.id;

  const c = theme.colors;
  root.style.setProperty("--c-bg", c.bg);
  root.style.setProperty("--c-fg", c.fg);
  root.style.setProperty("--c-accent", c.accent);
  root.style.setProperty("--c-muted", c.muted);
  root.style.setProperty("--c-border", c.border);
  root.style.setProperty("--c-header", c.header);
  root.style.setProperty("--c-matrix", c.matrix);
  root.style.setProperty("--c-matrix-highlight", c.matrixHighlight);
  root.style.setProperty("--c-link", c.link);
  root.style.setProperty("--c-success", c.success);
  root.style.setProperty("--c-prompt", c.prompt);

  try { localStorage.setItem(STORAGE_KEY, theme.id); } catch {}

  for (const listener of listeners) listener(theme);
  return theme;
}

export function currentThemeId(): string {
  return document.documentElement.dataset.theme || DEFAULT_THEME;
}

export function currentTheme(): Theme {
  return getTheme(currentThemeId());
}

export function initTheme(): Theme {
  let saved: string | null = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch {}
  const valid = saved && THEMES.some((t) => t.id === saved);
  return applyTheme(valid ? saved! : DEFAULT_THEME);
}
