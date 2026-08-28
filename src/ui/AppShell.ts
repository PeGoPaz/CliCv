import { THEMES, type Theme } from "../config/themes.js";
import { applyTheme, currentTheme, onThemeChange } from "./ThemeManager.js";
import { MatrixBackground } from "./MatrixBackground.js";
import { Terminal } from "../terminal/Terminal.js";
import { BootSequence } from "../terminal/BootSequence.js";

type View = "page" | "terminal";

const TERMINAL_HASH = "#terminal";
/** Below this the page column fills the viewport, so the rain would be invisible anyway. */
const MATRIX_MIN_WIDTH = 1100;

/**
 * Owns the two views. The page is static HTML already in the document;
 * the terminal is built and booted the first time it is opened.
 */
export class AppShell {
  private view: View | null = null;
  private terminal: Terminal | null = null;
  private matrix: MatrixBackground | null = null;
  private matrixRunning = false;
  private readonly reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  private readonly pageView = document.getElementById("page-view");
  private readonly terminalView = document.getElementById("terminalView");
  private readonly viewToggle = document.getElementById("viewToggle");
  private readonly viewToggleLabel = document.getElementById("viewToggleLabel");
  private readonly terminalBack = document.getElementById("terminalBack");
  private readonly themePicker = document.querySelector<HTMLElement>(".theme-picker");
  private readonly themeToggle = document.getElementById("themeToggle");
  private readonly themeName = document.getElementById("themeName");
  private readonly themeMenu = document.getElementById("themeMenu");

  init(): void {
    this.buildThemeMenu();
    this.reflectTheme(currentTheme());
    onThemeChange((theme) => this.reflectTheme(theme));

    this.viewToggle?.addEventListener("click", () => this.toggleView());
    this.terminalBack?.addEventListener("click", () => this.goToPage());
    window.addEventListener("hashchange", () => this.syncFromHash());
    window.addEventListener("resize", () => this.updateMatrix());

    this.syncFromHash();
    this.watchNav();
  }

  // ------- Views -------

  private syncFromHash(): void {
    this.setView(location.hash === TERMINAL_HASH ? "terminal" : "page");
  }

  private toggleView(): void {
    if (this.view === "terminal") this.goToPage();
    else location.hash = "terminal";
  }

  private goToPage(): void {
    // A real anchor rather than an empty hash, so hashchange always fires.
    location.hash = "top";
  }

  private setView(view: View): void {
    if (this.view === view) return;
    const previous = this.view;
    this.view = view;

    document.documentElement.dataset.view = view;
    if (this.pageView) this.pageView.hidden = view === "terminal";
    if (this.terminalView) this.terminalView.hidden = view !== "terminal";

    if (this.viewToggleLabel) this.viewToggleLabel.textContent = view === "terminal" ? "page" : "terminal";
    this.viewToggle?.setAttribute(
      "aria-label",
      view === "terminal" ? "Back to the readable page" : "Open the interactive terminal",
    );

    if (view === "terminal") {
      void this.enterTerminal();
    } else if (previous === "terminal") {
      this.viewToggle?.focus();
    }

    this.updateMatrix();
  }

  private async enterTerminal(): Promise<void> {
    if (this.terminal) {
      this.focusTerminalInput();
      return;
    }

    const terminal = new Terminal();
    this.terminal = terminal;

    const boot = new BootSequence(terminal.getBootBody());
    await boot.run(async () => {
      await terminal.renderInitialContent();
      terminal.print("");
      terminal.print(`<span class="fg-muted">Type <span class="fg-accent">help</span> to see available commands.</span>`);
      terminal.print("");
      terminal.showHelp();
      this.focusTerminalInput();
      terminal.scrollToTop();
    });
  }

  private focusTerminalInput(): void {
    if (this.view !== "terminal") return;
    document.getElementById("commandInput")?.focus();
  }

  // ------- Matrix background -------

  private updateMatrix(): void {
    if (this.reduceMotion) return;
    const wanted = this.view === "terminal" || window.innerWidth >= MATRIX_MIN_WIDTH;
    if (wanted === this.matrixRunning) return;

    if (wanted) {
      this.matrix ??= new MatrixBackground("matrix-bg");
      this.matrix.start();
    } else {
      this.matrix?.stop();
    }
    this.matrixRunning = wanted;
  }

  // ------- Theme picker -------

  private buildThemeMenu(): void {
    if (!this.themeMenu || !this.themeToggle || !this.themePicker) return;

    for (const theme of THEMES) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-btn";
      btn.dataset.themeId = theme.id;

      const swatch = document.createElement("span");
      swatch.className = "theme-swatch";
      swatch.setAttribute("aria-hidden", "true");
      // CSSOM, not an inline style attribute - the CSP has no 'unsafe-inline'.
      swatch.style.setProperty("--swatch", theme.colors.accent);

      btn.append(swatch, document.createTextNode(theme.name));
      btn.addEventListener("click", () => {
        applyTheme(theme.id);
        this.closeThemeMenu(true);
      });
      this.themeMenu.appendChild(btn);
    }

    this.themeToggle.addEventListener("click", () => {
      if (this.themeMenu!.hidden) this.openThemeMenu();
      else this.closeThemeMenu(true);
    });

    document.addEventListener("click", (e) => {
      if (!this.themeMenu!.hidden && !this.themePicker!.contains(e.target as Node)) {
        this.closeThemeMenu(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.themeMenu!.hidden) this.closeThemeMenu(true);
    });
  }

  private openThemeMenu(): void {
    if (!this.themeMenu) return;
    this.themeMenu.hidden = false;
    this.themeToggle?.setAttribute("aria-expanded", "true");
    this.themeMenu.querySelector<HTMLButtonElement>(".theme-btn")?.focus();
  }

  private closeThemeMenu(restoreFocus: boolean): void {
    if (!this.themeMenu || this.themeMenu.hidden) return;
    this.themeMenu.hidden = true;
    this.themeToggle?.setAttribute("aria-expanded", "false");
    if (restoreFocus) this.themeToggle?.focus();
  }

  private reflectTheme(theme: Theme): void {
    if (this.themeName) this.themeName.textContent = theme.name;
    this.themeToggle
      ?.querySelector<HTMLElement>(".theme-swatch")
      ?.style.setProperty("--swatch", theme.colors.accent);

    this.themeMenu?.querySelectorAll<HTMLButtonElement>(".theme-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.themeId === theme.id));
    });
  }

  // ------- Nav highlighting -------

  private watchNav(): void {
    const links = new Map<string, HTMLAnchorElement>();
    document.querySelectorAll<HTMLAnchorElement>(".nav-link").forEach((a) => {
      links.set(a.getAttribute("href")!.slice(1), a);
    });

    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-view .section")).filter((s) =>
      links.has(s.id),
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a) => a.removeAttribute("aria-current"));
          links.get(entry.target.id)?.setAttribute("aria-current", "true");
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
  }
}
