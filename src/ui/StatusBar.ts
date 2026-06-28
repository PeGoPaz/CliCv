/**
 * Bottom status bar — updates history count, theme name, etc.
 */
export class StatusBar {
  private historyEl: HTMLElement;
  private themeLabelEl: HTMLElement;
  private statusThemeEl: HTMLElement;

  constructor() {
    const history = document.getElementById("historyCount");
    const themeLabel = document.getElementById("themeLabel");
    const statusTheme = document.getElementById("statusTheme");
    if (!history || !themeLabel || !statusTheme) {
      throw new Error("Status bar elements not found");
    }
    this.historyEl = history;
    this.themeLabelEl = themeLabel;
    this.statusThemeEl = statusTheme;
  }

  updateHistory(count: number): void {
    this.historyEl.textContent = `hist: ${count}`;
  }

  updateTheme(name: string): void {
    this.themeLabelEl.textContent = name;
    this.statusThemeEl.textContent = name;
  }
}