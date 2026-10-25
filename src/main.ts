import { initTheme } from "./ui/ThemeManager.js";
import { AppShell } from "./ui/AppShell.js";

// Reveals the controls that only work with scripting - see .js-only in page.css.
document.documentElement.dataset.js = "1";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  new AppShell().init();
});

// A closed <details> prints closed, so a printed page would show no project
// descriptions. Open them all for printing and put them back afterwards.
let openedForPrint: HTMLDetailsElement[] = [];
window.addEventListener("beforeprint", () => {
  openedForPrint = [...document.querySelectorAll<HTMLDetailsElement>("details:not([open])")];
  openedForPrint.forEach((d) => (d.open = true));
});
window.addEventListener("afterprint", () => {
  openedForPrint.forEach((d) => (d.open = false));
  openedForPrint = [];
});
