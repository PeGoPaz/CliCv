# CliCv — Build Plan

Living checklist for the portfolio rebuild. Tick boxes as we go; we can resume from any step at any time.

## Current State (audited at start)
- Stack: React 19 + Vite 8 + Tailwind CSS v4 (PostCSS plugin) + lucide-react
- Single-file app: src/App.jsx holds all data + components
- Three pages: home (ASCII banner, portrait, summary, contact), skills (5 groups), projects (placeholder)
- Theme: green-on-black terminal ("guest@portfolio:~$")
- ASCII assets: mynameinfiglet.md (name), imageascii.md (portrait)
- Builds clean. Dev server: `npm run dev`. Build: `npm run build`. Lint: `npm run lint`.
- Uncommitted change: src/App.jsx modified vs initial commit.

## Steps

### Phase 0 — Foundation & Cleanup
- [ ] 0.1 Commit or stash the current App.jsx change so we have a clean baseline
- [ ] 0.2 Delete unused src/App.css (leftover Vite template, no imports)
- [ ] 0.3 Remove stale dist/ (will be regenerated on build)
- [ ] 0.4 Update index.html <title> to "Vladimir — Portfolio" and favicon if desired
- [ ] 0.5 Update README.md to describe the actual project, not the Vite template

### Phase 1 — Content & Data Model
- [ ] 1.1 Extract all CV data (summary, skills, contact) into a dedicated src/data/ file (e.g. src/data/cv.js) so it's editable in one place
- [ ] 1.2 Define the full projects list (name, description, tech, links, status) — needs user input
- [ ] 1.3 Define work experience entries (role, company, dates, bullets) — needs user input
- [ ] 1.4 Define education / certifications — needs user input
- [ ] 1.5 Confirm which sections the portfolio should have (home, about, skills, projects, experience, education, contact?)

### Phase 2 — Component Architecture
- [ ] 2.1 Split App.jsx into src/components/ (Header, FooterNav, TerminalPanel, views per section)
- [ ] 2.2 Add a simple router or section-state navigation that scales beyond 3 pages
- [ ] 2.3 Create reusable UI primitives: TerminalPanel, Card, SectionTitle, LinkChip
- [ ] 2.4 Build a ProjectsView that renders real project cards from data
- [ ] 2.5 Build an ExperienceView (timeline or terminal-style entries)
- [ ] 2.6 Build an EducationView (if needed)
- [ ] 2.7 Build a proper Contact section (form? or just links)

### Phase 3 — Visual Polish
- [ ] 3.1 Decide the design direction: keep the pure "terminal" look, or modernize (keep terminal accent but cleaner layout, typography, spacing)
- [ ] 3.2 Improve responsive layout (the home grid breaks on mobile, ASCII overflows)
- [ ] 3.3 Add hover/focus/transition states to interactive elements
- [ ] 3.4 Add a subtle background (grid, scanlines, or gradient) — optional
- [ ] 3.5 Add a dark/light toggle? (decide with user)
- [ ] 3.6 Polish the ASCII art display (font size, scaling, fallback for small screens)
- [ ] 3.7 Add a favicon / OG image / meta tags for sharing

### Phase 4 — Interactivity & UX
- [ ] 4.1 Typewriter / boot-sequence animation on the home view (optional, fits the theme)
- [ ] 4.2 Keyboard navigation between sections (e.g. type "skills" + Enter)
- [ ] 4.3 Smooth scroll / page transitions
- [ ] 4.4 "Download CV as PDF" button (print stylesheet or a generated PDF)
- [ ] 4.5 Copy-to-clipboard on contact info

### Phase 5 — Deployment
- [ ] 5.1 Choose host: GitHub Pages, Vercel, Netlify, or Cloudflare Pages
- [ ] 5.2 Configure base path if deploying to a subdirectory (e.g. GitHub Pages /repo)
- [ ] 5.3 Add deploy script to package.json
- [ ] 5.4 Set up CI: build + lint on push
- [ ] 5.5 Buy / point a custom domain (optional)

### Phase 6 — Final QA
- [ ] 6.1 Run `npm run lint` clean
- [ ] 6.2 Run `npm run build` clean
- [ ] 6.3 Test on mobile viewport
- [ ] 6.4 Test all external links
- [ ] 6.5 Lighthouse / accessibility check
- [ ] 6.6 Update README with how to run + deploy

## User Decisions (locked in)
- Sections stay: home, skills, projects. No new sections.
- Terminal/CLI aesthetic is the core identity — keep and refine it.
- Home page is the "executive summary" / recruiter view (name, title, portrait, experience highlights, tech stack, key achievements, quick links).
- Experience + Education content lives in the home view, not separate pages.
- Summary is rewritten to be personal/forward-looking, not a retelling of the CV bullets. No mention of "configuring Linux environments". Add Rust + Go as currently learning.
- Projects page stays as placeholder until user has real projects.

## Content Source (from user CV)
- Experience: 2 roles (Banking Software Implementation Specialist Intern @ Y-Solutions, Systems Integration Technician @ PRO-Computer)
- Education: BSc Computing Science @ Griffith College Dublin, 2023–2027 expected
- Skills: Java, Spring Boot, PostgreSQL, Docker, AWS, Linux, CI/CD, React, Python, Bash, SQL + more
- Key stats: 200+ reports validated, 400+ report mods, 20+ PCs assembled
