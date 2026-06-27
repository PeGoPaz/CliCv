import { getTheme } from "../config/themes.js";

/**
 * Matrix-style canvas rain effect that adapts to the active theme.
 */
export class MatrixBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private columns: number = 0;
  private drops: number[] = [];
  private fontSize: number = 14;
  private glyphs: string = "01アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヲン";
  private animationId: number | null = null;

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error(`Canvas #${canvasId} not found`);
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2d context");
    this.ctx = ctx;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array.from({ length: this.columns }, () => Math.random() * -100);
  }

  start(): void {
    const render = () => {
      const theme = getTheme(document.documentElement.dataset.theme || "ghost");

      // Trail effect — semi-transparent black over previous frame
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = `${this.fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < this.drops.length; i++) {
        const char = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
        const x = i * this.fontSize;
        const y = this.drops[i] * this.fontSize;

        // Highlight the leading character
        if (Math.random() > 0.975) {
          this.ctx.fillStyle = theme.colors.matrixHighlight;
        } else {
          this.ctx.fillStyle = theme.colors.matrix;
        }

        this.ctx.globalAlpha = 0.55;
        this.ctx.fillText(char, x, y);
        this.ctx.globalAlpha = 1;

        // Reset drop when it falls off screen (with some randomness)
        if (y > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
        this.drops[i] += 1;
      }

      this.animationId = requestAnimationFrame(render);
    };
    render();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}