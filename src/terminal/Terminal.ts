import { CommandHandler } from "./CommandHandler.js";
import { History } from "../utils/history.js";
import { StatusBar } from "../ui/StatusBar.js";
import { applyTheme, initTheme, onThemeChange, currentTheme } from "../ui/ThemeManager.js";

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
    this.statusBar.updateTheme(currentTheme().name);
    onThemeChange((theme) => this.statusBar.updateTheme(theme.name));

    this.handler = new CommandHandler(
      this.history,
      (html, cls) => this.writeOutput(html, cls || ""),
      (id) => this.applyTheme(id),
    );

    this.bindEvents();
  }

  private bindEvents(): void {
    // Focus input whenever terminal body is clicked
    this.body.addEventListener("click", () => this.input.focus());

    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Keep input focused when window regains focus - but only while the terminal is on screen
    window.addEventListener("focus", () => {
      if (document.documentElement.dataset.view === "terminal") this.input.focus();
    });
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // Ctrl+L → clear
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      this.handler.clear();
      return;
    }
    // Ctrl+C → clear input, unless text is selected (let the copy through)
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      const selection = window.getSelection()?.toString() ?? "";
      if (selection.trim()) return;
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

  public async renderInitialContent(): Promise<void> {
    this.handler.showAbout();
  }

  public showHelp(): void {
    this.handler.showHelp();
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

  private writeOutput(html: string, extraClass: string = ""): void {
    const div = document.createElement("div");
    div.className = `output-line ${extraClass}`.trim();
    div.innerHTML = html;
    this.body.appendChild(div);
    this.scrollToBottom();
  }

  public print(html: string, extraClass: string = ""): void {
    this.writeOutput(html, extraClass);
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      this.body.scrollTop = this.body.scrollHeight;
    });
  }

  public scrollToTop(): void {
    requestAnimationFrame(() => {
      this.body.scrollTop = 0;
    });
  }

  applyTheme(id: string): void {
    applyTheme(id);
  }

  initTheme(): void {
    initTheme();
  }

  getBootBody(): HTMLElement {
    return this.body;
  }
}