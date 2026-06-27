export class History {
  private entries: string[] = [];
  private readonly MAX = 100;

  push(command: string): void {
    if (!command) return;
    // Avoid duplicating the most recent entry
    if (this.entries[this.entries.length - 1] === command) return;
    this.entries.push(command);
    if (this.entries.length > this.MAX) this.entries.shift();
  }

  all(): string[] {
    return [...this.entries];
  }

  count(): number {
    return this.entries.length;
  }
}