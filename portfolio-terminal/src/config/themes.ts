/**
 * ============================================================
 *  THEME DEFINITIONS
 *  🎨  ADD OR MODIFY THEMES HERE
 * ============================================================
 */

export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    fg: string;
    accent: string;
    muted: string;
    border: string;
    header: string;
    matrix: string;        // canvas matrix glyph color
    matrixHighlight: string;
    link: string;
    success: string;
    prompt: string;
  };
}

export const THEMES: Theme[] = [
  {
    id: "ghost",
    name: "Ghost",
    colors: {
      bg: "#0a0e14",
      fg: "#cdd6f4",
      accent: "#89dceb",
      muted: "#6c7086",
      border: "#1e2330",
      header: "#1a1f2e",
      matrix: "#89dceb",
      matrixHighlight: "#ffffff",
      link: "#89b4fa",
      success: "#a6e3a1",
      prompt: "#f38ba8",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: {
      bg: "#282a36",
      fg: "#f8f8f2",
      accent: "#bd93f9",
      muted: "#6272a4",
      border: "#44475a",
      header: "#21222c",
      matrix: "#bd93f9",
      matrixHighlight: "#ff79c6",
      link: "#8be9fd",
      success: "#50fa7b",
      prompt: "#ff79c6",
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    colors: {
      bg: "#272822",
      fg: "#f8f8f2",
      accent: "#a6e22e",
      muted: "#75715e",
      border: "#3e3d32",
      header: "#1e1f1c",
      matrix: "#a6e22e",
      matrixHighlight: "#f92672",
      link: "#66d9ef",
      success: "#a6e22e",
      prompt: "#f92672",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    colors: {
      bg: "#000000",
      fg: "#00ff41",
      accent: "#00ff41",
      muted: "#008f11",
      border: "#003b00",
      header: "#001100",
      matrix: "#00ff41",
      matrixHighlight: "#ffffff",
      link: "#9dff00",
      success: "#00ff41",
      prompt: "#00ff41",
    },
  },
  {
    id: "solarized",
    name: "Solarized",
    colors: {
      bg: "#002b36",
      fg: "#839496",
      accent: "#b58900",
      muted: "#586e75",
      border: "#073642",
      header: "#073642",
      matrix: "#b58900",
      matrixHighlight: "#cb4b16",
      link: "#268bd2",
      success: "#859900",
      prompt: "#cb4b16",
    },
  },
];

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}