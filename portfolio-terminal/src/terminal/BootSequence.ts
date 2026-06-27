import { ASCII_BANNER, BANNER_SUBTITLE } from "../config/ascii.js";
import { PROFILE } from "../config/content.js";

export class BootSequence {
  private body: HTMLElement;

  constructor(body: HTMLElement) {
    this.body = body;
  }

  async run(onComplete: () => void): Promise<void> {
    const steps = [
      "Booting PORTFOLIO-OS v1.0.0 ...",
      "[ ✓ ] Loading kernel modules",
      "[ ✓ ] Mounting filesystem",
      "[ ✓ ] Starting network services",
      "[ ✓ ] Loading developer profile",
      "[ ✓ ] Starting portfolio daemon",
    ];

    for (const step of steps) {
      this.appendLine(step, "boot");
      await this.delay(180);
    }

    await this.delay(250);
    this.appendBanner();
    await this.delay(150);

    const infoLine = `<span class="fg-accent">${PROFILE.name}</span> · ${PROFILE.title} · ${PROFILE.location}`;
    this.appendLine(infoLine);
    this.appendLine(`<span class="fg-muted">${PROFILE.website} · ${PROFILE.status === "available" ? "Available for work" : PROFILE.status}</span>`);
    await this.delay(100);

    this.appendLine("");
    this.appendLine(`<span class="fg-muted">Type <span class="fg-accent">help</span> to get started.</span>`);
    this.appendLine("");

    onComplete();
  }

  private appendLine(html: string, cls: string = ""): void {
    const div = document.createElement("div");
    div.className = `output-line ${cls}`.trim();
    div.innerHTML = html;
    this.body.appendChild(div);
  }

  private appendBanner(): void {
    const pre = document.createElement("pre");
    pre.className = "ascii-banner";
    pre.textContent = ASCII_BANNER;
    this.body.appendChild(pre);
    const sub = document.createElement("div");
    sub.className = "banner-subtitle fg-muted";
    sub.textContent = BANNER_SUBTITLE;
    this.body.appendChild(sub);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}