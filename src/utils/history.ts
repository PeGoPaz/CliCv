/**
 * The commands run so far, and a walk through them with the arrow keys the
 * way a shell does it: Up recalls older commands and stops at the oldest,
 * Down comes back towards the newest and then to the line that was being
 * typed before the walk began.
 */
export class History {
  private entries: string[] = [];
  private readonly MAX = 100;
  // While walking: the entry shown (entries.length = past the newest) and
  // the line to come back to.
  private shown: number | null = null;
  private draft = "";

  /** Records a command and ends any walk. A blank line or a repeat of the last command is not recorded. */
  push(command: string): void {
    this.shown = null;
    if (!command) return;
    if (this.entries[this.entries.length - 1] === command) return;
    this.entries.push(command);
    if (this.entries.length > this.MAX) this.entries.shift();
  }

  /** Up: the command before the one shown; `typed` is what the input holds now. */
  older(typed: string): string {
    if (this.entries.length === 0) return typed;
    if (this.shown === null) {
      this.draft = typed;
      this.shown = this.entries.length;
    }
    this.shown = Math.max(0, this.shown - 1);
    return this.entries[this.shown];
  }

  /** Down: the command after the one shown, and past the newest the line typed before. */
  newer(typed: string): string {
    if (this.shown === null) return typed;
    this.shown += 1;
    if (this.shown < this.entries.length) return this.entries[this.shown];
    this.shown = null;
    return this.draft;
  }

  all(): string[] {
    return [...this.entries];
  }
}
