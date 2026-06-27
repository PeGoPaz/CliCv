export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isMobile(): boolean {
  return window.innerWidth <= 768;
}