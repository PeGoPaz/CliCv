import { Terminal } from "./terminal/Terminal.js";
import { BootSequence } from "./terminal/BootSequence.js";
import { MatrixBackground } from "./ui/MatrixBackground.js";

document.addEventListener("DOMContentLoaded", async () => {

  const matrix = new MatrixBackground("matrix-bg");
  matrix.start();

  const terminal = new Terminal();
  terminal.loadSavedTheme();

  const boot = new BootSequence(terminal.getBootBody());
  await boot.run(async () => {    
    await terminal.renderInitialContent();
    terminal.print("");
    terminal.print(`<span class="fg-muted">Type <span class="fg-accent">help</span> to see available commands.</span>`);
    terminal.print("");
    terminal.showHelp();
    const input = document.getElementById("commandInput") as HTMLInputElement;
    if (input) input.focus();
    // Scroll to top after boot completes
    terminal.scrollToTop();
  });
});