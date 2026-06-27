import {
  PROFILE,
  ABOUT,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CONTACTS,
  LINKS,
} from "../config/content.js";
import { THEMES } from "../config/themes.js";
import { CV_FILE_PATH, CV_DOWNLOAD_NAME } from "../config/cv.js";
import { History } from "../utils/history.js";

export type OutputRenderer = (html: string) => void;
export type ThemeSetter = (themeId: string) => void;

export class CommandHandler {
  private history: History;
  private render: OutputRenderer;
  private setTheme: ThemeSetter;

  constructor(history: History, render: OutputRenderer, setTheme: ThemeSetter) {
    this.history = history;
    this.render = render;
    this.setTheme = setTheme;
  }

    public renderAllSections(): void {
    this.showAbout();
    this.showSkills();
    this.showExperience();
    this.showProjects();
    this.showContacts();
    this.showLinks();
  }

  static readonly AVAILABLE_COMMANDS = [
    "about",
    "skills",
    "experience",
    "projects",
    "contacts",
    "links",
    "themes",
    "theme",
    "clear",
    "history",
    "cv",
    "help",
  ];

  async execute(raw: string): Promise<void> {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const command = cmd.toLowerCase();

    // Echo the command
    this.render(`<span class="echo-line"><span class="prompt-sign">❯</span> ${this.escapeHtml(trimmed)}</span>`);

    switch (command) {
      case "help":
      case "?":
        this.showHelp();
        break;
      case "about":
        this.showAbout();
        break;
      case "skills":
        this.showSkills();
        break;
      case "experience":
      case "exp":
        this.showExperience();
        break;
      case "projects":
        this.showProjects();
        break;
      case "contacts":
      case "contact":
        this.showContacts();
        break;
      case "links":
        this.showLinks();
        break;
      case "themes":
        this.showThemes();
        break;
      case "theme":
        this.switchTheme(args[0]);
        break;
      case "clear":
      case "cls":
        this.clear();
        break;
      case "history":
        this.showHistory();
        break;
      case "cv":
      case "resume":
        this.downloadCV();
        break;
      default:
        this.render(`<span class="fg-error">command not found: ${this.escapeHtml(command)}</span>`);
        this.render(`<span class="fg-muted">Try <span class="fg-accent">help</span> to see available commands.</span>`);
    }
  }

  // ------- Command implementations -------

  private showHelp(): void {
    const cmds: Array<[string, string]> = [
      ["about",      "Learn about me"],
      ["skills",     "Technical skills & stack"],
      ["experience", "Work history"],
      ["projects",   "Selected projects"],
      ["contacts",   "Contact information"],
      ["links",      "Social & professional links"],
      ["themes",     "List available themes"],
      ["theme &lt;name&gt;", "Switch theme"],
      ["history",    "Show command history"],
      ["cv",         "Download my CV / resume"],
      ["clear",      "Clear terminal output"],
    ];
    let html = `<div class="section-title">Available Commands</div><div class="help-grid">`;
    for (const [cmd, desc] of cmds) {
      html += `<div class="help-row"><span class="fg-accent">${cmd}</span><span class="fg-muted">${desc}</span></div>`;
    }
    html += `</div>`;
    this.render(html);
  }

  private showAbout(): void {
    let html = `<div class="section-title">${this.escapeHtml(PROFILE.name)} — ${this.escapeHtml(PROFILE.title)}</div>`;
    html += `<div class="section-subtitle">${this.escapeHtml(PROFILE.tagline)}</div>`;
    html += `<pre class="section-body">${this.escapeHtml(ABOUT)}</pre>`;
    this.render(html);
  }

  private showSkills(): void {
    let html = `<div class="section-title">Technical Skills</div>`;
    for (const group of SKILLS) {
      html += `<div class="skill-group">`;
      html += `<div class="skill-category fg-accent">${this.escapeHtml(group.category)}</div>`;
      html += `<div class="skill-items">`;
      for (const skill of group.items) {
        html += `<span class="skill-tag">${this.escapeHtml(skill)}</span>`;
      }
      html += `</div></div>`;
    }
    this.render(html);
  }

  private showExperience(): void {
    let html = `<div class="section-title">Experience</div>`;
    for (const exp of EXPERIENCE) {
      html += `<div class="exp-block">`;
      html += `<div class="exp-header">`;
      html += `<span class="exp-role fg-accent">${this.escapeHtml(exp.role)}</span>`;
      html += `<span class="exp-at fg-muted">@ ${this.escapeHtml(exp.company)}</span>`;
      html += `<span class="exp-period fg-muted">${this.escapeHtml(exp.period)}</span>`;
      html += `</div>`;
      html += `<div class="exp-desc">${this.escapeHtml(exp.description)}</div>`;
      if (exp.highlights.length) {
        html += `<ul class="exp-highlights">`;
        for (const h of exp.highlights) {
          html += `<li>${this.escapeHtml(h)}</li>`;
        }
        html += `</ul>`;
      }
      html += `</div>`;
    }
    this.render(html);
  }

  private showProjects(): void {
    let html = `<div class="section-title">Selected Projects</div>`;
    for (const p of PROJECTS) {
      html += `<div class="project-block">`;
      html += `<div class="project-header">`;
      html += `<span class="project-name fg-accent">${this.escapeHtml(p.name)}</span>`;
      html += `<span class="project-stack fg-muted">${p.stack.map(this.escapeHtml).join(" · ")}</span>`;
      html += `</div>`;
      html += `<div class="project-desc">${this.escapeHtml(p.description)}</div>`;
      html += `<div class="project-links">`;
      if (p.link) html += `<a href="${this.escapeAttr(p.link)}" target="_blank" rel="noopener" class="link">live</a>`;
      if (p.repo) html += `<a href="${this.escapeAttr(p.repo)}" target="_blank" rel="noopener" class="link">repo</a>`;
      html += `</div></div>`;
    }
    this.render(html);
  }

  private showContacts(): void {
    let html = `<div class="section-title">Contact</div>`;
    html += `<div class="contact-row"><span class="fg-accent">Email</span><a href="mailto:${this.escapeAttr(CONTACTS.email)}" class="link">${this.escapeHtml(CONTACTS.email)}</a></div>`;
    html += `<div class="contact-row"><span class="fg-accent">Phone</span><span>${this.escapeHtml(CONTACTS.phone)}</span></div>`;
    html += `<div class="contact-row"><span class="fg-accent">Status</span><span>${this.escapeHtml(CONTACTS.availability)}</span></div>`;
    html += `<div class="contact-row"><span class="fg-muted">Response</span><span class="fg-muted">${this.escapeHtml(CONTACTS.responseTime)}</span></div>`;
    this.render(html);
  }

  private showLinks(): void {
    let html = `<div class="section-title">Links</div>`;
    for (const link of LINKS) {
      html += `<div class="link-row"><span class="fg-accent link-platform">${this.escapeHtml(link.platform)}</span>`;
      html += `<a href="${this.escapeAttr(link.url)}" target="_blank" rel="noopener" class="link">${this.escapeHtml(link.display)}</a></div>`;
    }
    this.render(html);
  }

  private showThemes(): void {
    let html = `<div class="section-title">Available Themes</div>`;
    html += `<div class="themes-list">`;
    for (const theme of THEMES) {
      html += `<button class="theme-btn" data-theme-id="${theme.id}" style="--swatch: ${theme.colors.accent};">`;
      html += `<span class="theme-swatch"></span>${this.escapeHtml(theme.name)}</button>`;
    }
    html += `</div>`;
    html += `<div class="fg-muted" style="margin-top:8px;">Usage: <span class="fg-accent">theme &lt;name&gt;</span></div>`;
    this.render(html);

    // Bind click handlers on theme buttons
    setTimeout(() => {
      const buttons = document.querySelectorAll<HTMLButtonElement>(".theme-btn[data-theme-id]");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.themeId!;
          this.switchTheme(id);
        });
      });
    }, 0);
  }

  private switchTheme(id: string | undefined): void {
    if (!id) {
      this.render(`<span class="fg-error">Usage: theme &lt;name&gt;</span>`);
      this.showThemes();
      return;
    }
    const match = THEMES.find((t) => t.id.toLowerCase() === id.toLowerCase() || t.name.toLowerCase() === id.toLowerCase());
    if (!match) {
      this.render(`<span class="fg-error">Unknown theme: ${this.escapeHtml(id)}</span>`);
      this.render(`<span class="fg-muted">Try: ${THEMES.map((t) => t.id).join(", ")}</span>`);
      return;
    }
    this.setTheme(match.id);
    this.render(`<span class="fg-success">Theme switched to ${this.escapeHtml(match.name)}.</span>`);
  }

  private showHistory(): void {
    const entries = this.history.all();
    if (entries.length === 0) {
      this.render(`<span class="fg-muted">No command history yet.</span>`);
      return;
    }
    let html = `<div class="section-title">Command History</div><div class="history-list">`;
    entries.forEach((entry, i) => {
      html += `<div class="history-row"><span class="fg-muted history-num">${String(i + 1).padStart(2, " ")}.</span> ${this.escapeHtml(entry)}</div>`;
    });
    html += `</div>`;
    this.render(html);
  }

  private downloadCV(): void {
    this.render(`<span class="fg-success">Initiating CV download...</span>`);
    const a = document.createElement("a");
    a.href = CV_FILE_PATH;
    a.download = CV_DOWNLOAD_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  clear(): void {
    document.getElementById("terminalBody")!.innerHTML = "";
  }

  private escapeHtml(str: string): string {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  private escapeAttr(str: string): string {
    return this.escapeHtml(str).replace(/"/g, "&quot;");
  }
}