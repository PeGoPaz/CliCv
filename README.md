# Vladimir Rainov - Portfolio

Developer portfolio at [vladr.tech](https://vladr.tech). Two views, one source of content:
a static, scrollable page by default, and the interactive terminal behind a button.

Vanilla TypeScript, no runtime dependencies, no bundler. The browser loads native ES modules
straight out of `dist/`, which is why every import inside `src/` is written with a `.js`
extension. The only devDependency is `typescript`.

## Single source of truth

Everything the site says lives in `src/config/content.ts`. Three surfaces are generated from it:

| Surface | How | Command |
|---|---|---|
| The static page in `index.html` | `src/page/render.ts` → `scripts/build-page.mjs` | `npm run page` |
| The terminal | `src/terminal/CommandHandler.ts`, at runtime | - |
| `assets/cv.pdf` | `scripts/build-cv.mjs` (needs a local Chrome) | `npm run cv` |

The generated regions of `index.html` sit between `generated:start` / `generated:end` markers
(and `generated:head-start` / `generated:head-end` for the JSON-LD). Do not edit them by hand -
edit `content.ts` and re-run `npm run page`.

`npm run check:cv-sync` regenerates those regions in memory and fails if the committed
`index.html` differs. It runs in CI, so a content edit that was never regenerated cannot ship.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Commands

| Command | What it does |
|---|---|
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm run page` | Regenerates `index.html` from `content.ts` |
| `npm run check:cv-sync` | Fails if `index.html` is out of date (CI gate) |
| `npm run cv` | Rebuilds `assets/cv.pdf` |
| `npm run og` | Rebuilds `assets/og.png` from `assets/og.html` |
| `npm run serve` | Static server on port 3000 |
| `npm run dev` | build + page + serve |

After editing `src/config/content.ts`:

```bash
npm run build && npm run page && npm run check:cv-sync
```

## The two views

The page is plain static HTML, present on first paint and readable with scripting off -
which is also what crawlers and ATS parsers see. The terminal lives at `#terminal` on the
same URL; it is built and booted the first time it is opened, so nothing about it costs
anything on the default view.

Both views share the sticky top bar, the five themes (`localStorage` key `portfolio-theme`)
and the matrix canvas, which runs in the terminal and, on the page, only above 1100px where
it is actually visible behind the content column.

Terminal commands: `about`, `education`, `skills`, `experience`, `projects`, `contacts`,
`links`, `whoami`, `themes`, `theme <name>`, `cv`, `history`, `clear`, `help`.

## Constraints worth knowing

- **Strict CSP** in a `<meta>` tag, with no `'unsafe-inline'` in `style-src`. Inline `style`
  attributes are dropped silently - set styles through CSS classes or `el.style.setProperty`.
- **Contrast** stays at or above 4.5:1 for every text colour in all five themes. Page surfaces
  therefore darken (`--surface`) rather than tint: a lightening wash costs contrast, and
  Solarized has almost none to spare.
- **Deploy** publishes an explicit list, not the repo: see the assemble step in
  `.github/workflows/deploy.yml`. A new file that has to reach the site must be added there.

## Tech

- **Frontend:** vanilla TypeScript, HTML5, CSS3
- **Build:** `tsc` plus two zero-dependency Node scripts
- **Styling:** CSS custom properties, set on `:root` from `src/config/themes.ts`
- **Font:** JetBrains Mono
- **Hosting:** GitHub Pages, deployed from `main` by GitHub Actions

## Project structure

```
├── assets/              # cv.pdf, og.png
├── scripts/
│   ├── build-page.mjs   # writes the generated regions of index.html
│   ├── check-cv-sync.mjs# fails if those regions are stale
│   ├── build-cv.mjs     # renders assets/cv.pdf
│   └── cv-data.json     # CV-only extras (phone, certificates)
├── src/
│   ├── config/          # content, themes, ascii, cv, site
│   ├── page/            # render.ts - the static page and the JSON-LD
│   ├── terminal/        # terminal, command handler, boot sequence
│   ├── ui/              # AppShell, ThemeManager, matrix background, status bar
│   └── utils/           # html escaping, command history
├── styles/              # main, themes, animations, terminal, page, crawler
└── index.html           # single entry point, partly generated
```

## Customization

| File | Purpose |
|---|---|
| `src/config/content.ts` | Profile, about, skills, education, experience, projects, contacts, links |
| `src/config/themes.ts` | The five colour themes |
| `src/config/ascii.ts` | ASCII banner |
| `src/config/cv.ts` | CV file path and download name |
| `src/config/site.ts` | Canonical URL and structured-data constants |
