/** Escaping shared by the terminal renderer and the static page generator. */

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function escapeAttr(str: string): string {
  return escapeHtml(str).replace(/"/g, "&quot;");
}
