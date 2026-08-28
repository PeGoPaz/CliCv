import { initTheme } from "./ui/ThemeManager.js";
import { AppShell } from "./ui/AppShell.js";

// Reveals the controls that only work with scripting — see .js-only in page.css.
document.documentElement.dataset.js = "1";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  new AppShell().init();
});
