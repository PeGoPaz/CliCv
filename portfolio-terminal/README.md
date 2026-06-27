# Terminal Portfolio

An interactive, modern terminal-style developer portfolio built with plain TypeScript, HTML, and CSS.

## Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open http://localhost:3000

## Customization

All user content is centralized in `src/config/`:

| File | Purpose |
|------|---------|
| `src/config/content.ts` | Replace name, bio, skills, experience, projects, contacts |
| `src/config/themes.ts` | Add/edit theme color palettes |
| `src/config/ascii.ts` | Replace ASCII art banner |
| `src/config/cv.ts` | Point to your actual CV file |
| `assets/cv.pdf` | Drop your real CV here |

## Commands

`about` `skills` `experience` `projects` `contacts` `links` `themes` `clear` `history` `cv` `help`