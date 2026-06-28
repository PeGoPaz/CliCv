# Vladimir Rainov — Portfolio

Interactive terminal-style developer portfolio built with TypeScript, HTML, and CSS.

## About

Computing Science student at Griffith College Dublin with experience in banking software implementation and systems integration. Passionate about cloud infrastructure, DevOps, and building resilient systems.

## Features

- Terminal-style interface with command navigation
- Matrix rain background animation
- Multiple color themes
- Interactive sections: about, skills, experience, projects, contacts
- CV download functionality
- Responsive design for mobile devices

## Tech Stack

- **Frontend:** Vanilla TypeScript, HTML5, CSS3
- **Build:** TypeScript compiler (tsc)
- **Styling:** Custom CSS with CSS variables for theming
- **Fonts:** JetBrains Mono, Space Grotesk

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build

```bash
npm run build
```

Compiles TypeScript to `dist/` directory.

## Available Commands

In the terminal interface:
- `about` — Personal bio and background
- `skills` — Technical skills grouped by category
- `experience` — Work history
- `projects` — Portfolio projects (Web Development, Technical Builds)
- `contacts` — Contact information
- `links` — Social media and professional links
- `themes` — Switch color themes
- `cv` — Download CV
- `clear` — Clear terminal
- `history` — Show command history
- `help` — List all commands

## Project Structure

```
├── assets/          # Static assets (CV PDF)
├── dist/            # Compiled JavaScript (generated)
├── src/
│   ├── config/      # Content, themes, ASCII art configuration
│   ├── terminal/    # Terminal logic, command handler, boot sequence
│   ├── ui/          # UI components (matrix background, status bar)
│   └── utils/       # Helper utilities
├── styles/          # CSS stylesheets
└── index.html       # Entry point
```

## Customization

All content is centralized in `src/config/`:

| File | Purpose |
|------|---------|
| `src/config/content.ts` | Personal info, skills, experience, projects |
| `src/config/themes.ts` | Color theme definitions |
| `src/config/ascii.ts` | ASCII art banner |
| `src/config/cv.ts` | CV file path and download name |
