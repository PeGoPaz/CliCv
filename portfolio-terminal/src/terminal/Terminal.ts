import { CommandHandler } from "./CommandHandler.js";
import { History } from "../utils/history.js";
import { StatusBar } from "../ui/StatusBar.js";
import { THEMES, getTheme } from "../config/themes.js";
import { PROFILE } from "../config/content.js";

export class Terminal {
  private body: HTMLElement;
  private input: HTMLInputElement;
  private history: History;
  private statusBar: StatusBar;
  private handler: CommandHandler;
  private currentHistoryIndex: number = -1;
  private savedInput: string = "";

  constructor() {
    const body = document.getElementById("terminalBody");
    const input = document.getElementById("commandInput") as HTMLInputElement;
    if (!body || !input) throw new Error("Terminal DOM elements not found");

    this.body = body;
    this.input = input;
    this.history = new History();
    this.statusBar = new StatusBar();

    this.handler = new CommandHandler(
      this.history,
      (html) => this.writeOutput(html),
      (id) => this.applyTheme(id),
    );

    this.bindEvents();
    this.applyTheme("ghost");
  }

  private bindEvents(): void {
    // Focus input whenever terminal body is clicked
    this.body.addEventListener("click", () => this.input.focus());

    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Keep input focused when window regains focus
    window.addEventListener("focus", () => this.input.focus());
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // Ctrl+L → clear
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      this.handler.clear();
      return;
    }
    // Ctrl+C → clear input
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      this.input.value = "";
      this.writeOutput(`<span class="fg-muted">^C</span>`);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const value = this.input.value;
      this.input.value = "";
      this.currentHistoryIndex = -1;
      this.savedInput = "";
      if (value.trim()) {
        this.history.push(value.trim());
        this.statusBar.updateHistory(this.history.all().length);
      }
      this.handler.execute(value);
      this.scrollToBottom();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.navigateHistory(-1);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.navigateHistory(1);
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      this.autocomplete();
      return;
    }
  }

  private navigateHistory(direction: number): void {
    const entries = this.history.all();
    if (entries.length === 0) return;

    if (this.currentHistoryIndex === -1) {
      this.savedInput = this.input.value;
    }

    let newIndex = this.currentHistoryIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= entries.length) {
      this.currentHistoryIndex = -1;
      this.input.value = this.savedInput;
      return;
    }
    this.currentHistoryIndex = newIndex;
    // Newest command is at end of array
    this.input.value = entries[entries.length - 1 - newIndex];
  }

  private autocomplete(): void {
    const value = this.input.value.trim().toLowerCase();
    if (!value) return;
    const match = CommandHandler.AVAILABLE_COMMANDS.find((c) => c.startsWith(value));
    if (match) this.input.value = match;
  }

  private writeOutput(html: string): void {
    const div = document.createElement("div");
    div.className = "output-line";
    div.innerHTML = html;
    this.body.appendChild(div);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      this.body.scrollTop = this.body.scrollHeight;
    });
  }

  applyTheme(id: string): void {
    const theme = getTheme(id);
    document.documentElement.dataset.theme = theme.id;

    // Apply CSS variables
    const root = document.documentElement;
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

    this.statusBar.updateTheme(theme.name);

    // Persist
    try { localStorage.setItem("portfolio-theme", theme.id); } catch {}
  }

  loadSavedTheme(): void {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved && THEMES.some((t) => t.id === saved)) {
        this.applyTheme(saved);
      }
    } catch {}
  }

  getBootBody(): HTMLElement {
    return this.body;
  }
}