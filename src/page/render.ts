// Builds the static, scrollable version of the portfolio.
//
// Rendered at build time by scripts/build-page.mjs and spliced into index.html
// between the generated:start / generated:end markers. Never edit that region
// by hand - edit src/config/content.ts and run `npm run page`.

import {
  PROFILE,
  ABOUT,
  EDUCATION,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CONTACTS,
  LINKS,
} from "../config/content.js";
import { ASCII_BANNER } from "../config/ascii.js";
import { CV_FILE_PATH, CV_DOWNLOAD_NAME } from "../config/cv.js";
import { SITE } from "../config/site.js";
import { escapeHtml, escapeAttr } from "../utils/html.js";

export interface Section {
  id: string;
  label: string;
}

/** Drives both the nav in the top bar and the section headings - they cannot drift. */
export const SECTIONS: Section[] = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

const INDENT = "  ";

// The ASCII banner must survive indent() byte for byte - any added leading
// whitespace inside <pre> shifts the art. It is spliced back in at the end.
const BANNER_SLOT = "\u0000BANNER\u0000";

/** Indent every line of a block by n levels, so the generated HTML stays readable in diffs. */
function indent(block: string, levels: number): string {
  const pad = INDENT.repeat(levels);
  return block
    .split("\n")
    .map((line) => (line.trim() ? pad + line : line))
    .join("\n");
}

function heading(section: Section): string {
  return `<h2 class="section-h" id="${escapeAttr(section.id)}-h"><span class="section-h-sign" aria-hidden="true">❯</span>${escapeHtml(section.label)}</h2>`;
}

function section(s: Section, body: string): string {
  return [
    `<section class="section" id="${escapeAttr(s.id)}" aria-labelledby="${escapeAttr(s.id)}-h">`,
    indent(heading(s), 1),
    indent(body, 1),
    `</section>`,
  ].join("\n");
}

function sectionById(id: string): Section {
  const found = SECTIONS.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown section: ${id}`);
  return found;
}

function chips(items: string[]): string {
  return [
    `<ul class="chip-row">`,
    ...items.map((i) => indent(`<li class="chip">${escapeHtml(i)}</li>`, 1)),
    `</ul>`,
  ].join("\n");
}

function bullets(items: string[], cls: string): string {
  return [
    `<ul class="${cls}">`,
    ...items.map((i) => indent(`<li>${escapeHtml(i)}</li>`, 1)),
    `</ul>`,
  ].join("\n");
}

function outLink(url: string, label: string): string {
  return `<a class="card-link" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

// ------- Sections -------

function renderHero(): string {
  const statusLabel = PROFILE.status === "available" ? "Available for work" : PROFILE.status;
  return [
    `<section class="hero" id="top">`,
    indent(BANNER_SLOT, 1),
    indent(`<p class="hero-banner-text" aria-hidden="true">${escapeHtml(PROFILE.name)}</p>`, 1),
    indent(`<p class="hero-role">${escapeHtml(PROFILE.title)} <span class="hero-sep" aria-hidden="true">·</span> <span class="hero-location">${escapeHtml(PROFILE.location)}</span></p>`, 1),
    indent(`<p class="hero-tagline">${escapeHtml(PROFILE.tagline)}</p>`, 1),
    indent(`<p class="hero-status"><span class="status-dot" aria-hidden="true">●</span>${escapeHtml(statusLabel)}</p>`, 1),
    indent(`<div class="callout">`, 1),
    indent(`<span class="callout-label">Availability</span>`, 2),
    indent(`<span class="callout-body">${escapeHtml(PROFILE.availability)}</span>`, 2),
    indent(`</div>`, 1),
    indent(`<div class="hero-actions">`, 1),
    indent(`<a class="btn btn-primary" href="${escapeAttr(CV_FILE_PATH)}" download="${escapeAttr(CV_DOWNLOAD_NAME)}">Download CV (PDF)</a>`, 2),
    indent(`<a class="btn" href="mailto:${escapeAttr(CONTACTS.email)}">Email me</a>`, 2),
    indent(`</div>`, 1),
    `</section>`,
  ].join("\n");
}

function renderAbout(): string {
  return section(sectionById("about"), `<p class="prose">${escapeHtml(ABOUT)}</p>`);
}

function renderSkills(): string {
  const body = SKILLS.map((group) =>
    [
      `<div class="skill-group">`,
      indent(`<h3 class="skill-category">${escapeHtml(group.category)}</h3>`, 1),
      indent(chips(group.items), 1),
      `</div>`,
    ].join("\n"),
  ).join("\n");
  return section(sectionById("skills"), body);
}

function renderEducation(): string {
  const body = EDUCATION.map((item) => {
    const lines = [
      `<article class="card">`,
      indent(`<h3 class="card-title">${escapeHtml(item.qualification)}</h3>`, 1),
      indent(`<p class="card-meta"><span class="card-at">${escapeHtml(item.institution)}</span><span class="card-period">${escapeHtml(item.period)}</span></p>`, 1),
      indent(`<p class="card-desc">${escapeHtml(item.description)}</p>`, 1),
    ];
    if (item.highlights?.length) lines.push(indent(bullets(item.highlights, "card-highlights"), 1));
    lines.push(`</article>`);
    return lines.join("\n");
  }).join("\n");
  return section(sectionById("education"), body);
}

function renderExperience(): string {
  const body = EXPERIENCE.map((exp) => {
    const lines = [
      `<article class="card">`,
      indent(`<h3 class="card-title">${escapeHtml(exp.role)}</h3>`, 1),
      indent(`<p class="card-meta"><span class="card-at">${escapeHtml(exp.company)}</span><span class="card-period">${escapeHtml(exp.period)}</span></p>`, 1),
      indent(`<p class="card-desc">${escapeHtml(exp.description)}</p>`, 1),
    ];
    if (exp.highlights.length) lines.push(indent(bullets(exp.highlights, "card-highlights"), 1));
    lines.push(`</article>`);
    return lines.join("\n");
  }).join("\n");
  return section(sectionById("experience"), body);
}

function renderProjectCard(p: (typeof PROJECTS)[number]): string {
  const links: string[] = [];
  if (p.link) links.push(outLink(p.link, "Live site"));
  if (p.repo) links.push(outLink(p.repo, "Repository"));
  if (p.writeup) links.push(outLink(p.writeup, "Write-up"));

  const lines = [
    `<article class="card project-card">`,
    indent(`<h4 class="card-title">${escapeHtml(p.name)}</h4>`, 1),
  ];
  if (p.period) {
    lines.push(indent(`<p class="card-meta"><span class="card-period">${escapeHtml(p.period)}</span></p>`, 1));
  }
  lines.push(indent(`<p class="card-desc">${escapeHtml(p.description)}</p>`, 1));
  lines.push(indent(chips(p.stack), 1));
  if (links.length) {
    lines.push(indent(`<p class="card-links">${links.join("")}</p>`, 1));
  }
  lines.push(`</article>`);
  return lines.join("\n");
}

function renderProjects(): string {
  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));
  const body = categories
    .map((category) =>
      [
        `<div class="project-group">`,
        indent(`<h3 class="project-category">${escapeHtml(category)}</h3>`, 1),
        ...PROJECTS.filter((p) => p.category === category).map((p) => indent(renderProjectCard(p), 1)),
        `</div>`,
      ].join("\n"),
    )
    .join("\n");
  return section(sectionById("projects"), body);
}

function renderContact(): string {
  const body = [
    `<p class="prose">${escapeHtml(CONTACTS.availability)} ${escapeHtml(CONTACTS.responseTime)}</p>`,
    `<ul class="contact-list">`,
    indent(`<li><span class="contact-key">Email</span><a class="card-link" href="mailto:${escapeAttr(CONTACTS.email)}">${escapeHtml(CONTACTS.email)}</a></li>`, 1),
    ...LINKS.map((link) =>
      indent(
        `<li><span class="contact-key">${escapeHtml(link.platform)}</span>${outLink(link.url, link.display)}</li>`,
        1,
      ),
    ),
    indent(`<li><span class="contact-key">CV</span><a class="card-link" href="${escapeAttr(CV_FILE_PATH)}" download="${escapeAttr(CV_DOWNLOAD_NAME)}">Download CV (PDF)</a></li>`, 1),
    `</ul>`,
  ].join("\n");
  return section(sectionById("contact"), body);
}

// ------- Shell -------

function renderTopbar(): string {
  const nav = SECTIONS.map((s) =>
    indent(`<a class="nav-link" href="#${escapeAttr(s.id)}">${escapeHtml(s.label)}</a>`, 2),
  ).join("\n");

  return [
    `<header class="topbar">`,
    indent(`<a class="topbar-name" href="#top"><h1>${escapeHtml(PROFILE.name)}</h1></a>`, 1),
    indent(`<nav class="topbar-nav" id="pageNav" aria-label="Sections">`, 1),
    nav,
    indent(`</nav>`, 1),
    indent(`<div class="topbar-actions js-only">`, 1),
    indent(`<div class="theme-picker">`, 2),
    indent(`<button type="button" class="topbar-btn" id="themeToggle" aria-expanded="false" aria-controls="themeMenu">`, 3),
    indent(`<span class="theme-swatch" aria-hidden="true"></span><span id="themeName">Ghost</span>`, 4),
    indent(`</button>`, 3),
    indent(`<div class="theme-menu" id="themeMenu" role="group" aria-label="Colour theme" hidden></div>`, 3),
    indent(`</div>`, 2),
    indent(`<button type="button" class="topbar-btn topbar-btn-accent" id="viewToggle">`, 2),
    indent(`<span class="topbar-btn-sign" aria-hidden="true">❯</span><span id="viewToggleLabel">terminal</span>`, 3),
    indent(`</button>`, 2),
    indent(`</div>`, 1),
    `</header>`,
  ].join("\n");
}

/** The whole generated region: skip link, top bar and the scrollable page. */
export function renderShell(): string {
  const page = [
    renderHero(),
    renderAbout(),
    renderSkills(),
    renderEducation(),
    renderExperience(),
    renderProjects(),
    renderContact(),
  ]
    .map((s) => indent(s, 1))
    .join("\n\n");

  const shell = [
    `<a class="skip-link" href="#page-view">Skip to content</a>`,
    ``,
    renderTopbar(),
    ``,
    `<main id="page-view" class="page-view" tabindex="-1">`,
    page,
    `</main>`,
  ].join("\n");

  const banner = `<pre class="hero-banner" aria-hidden="true">${escapeHtml(ASCII_BANNER)}</pre>`;
  // Drop the indentation indent() put in front of the slot along with the slot itself.
  return shell.replace(new RegExp(`[ \\t]*${BANNER_SLOT}`), banner);
}

// ------- Structured data -------

/**
 * The JSON-LD block in <head>. Generated so knowsAbout and sameAs cannot drift
 * from SKILLS and LINKS the way the hand-written version did.
 */
export function renderHead(): string {
  const degree = EDUCATION[0];
  const graph: unknown[] = [
    {
      "@type": "ProfilePage",
      url: SITE.url,
      name: `${PROFILE.name} - ${PROFILE.title} Portfolio`,
      description: `${PROFILE.name} - ${PROFILE.title} in ${PROFILE.location}. ${PROFILE.tagline}.`,
      inLanguage: SITE.language,
      mainEntity: { "@id": `${SITE.url}#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}#person`,
      name: PROFILE.name,
      jobTitle: PROFILE.title,
      email: `mailto:${CONTACTS.email}`,
      url: SITE.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: PROFILE.location.split(",")[0].trim(),
        addressCountry: SITE.countryCode,
      },
      description: `${PROFILE.tagline}. ${CONTACTS.availability}`,
      ...(degree
        ? {
            affiliation: {
              "@type": "CollegeOrUniversity",
              name: degree.institution,
              url: SITE.institutionUrl,
            },
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              name: degree.qualification,
              credentialCategory: SITE.credentialCategory,
              educationalLevel: SITE.credentialLevel,
              recognizedBy: { "@type": "CollegeOrUniversity", name: degree.institution },
            },
          }
        : {}),
      sameAs: LINKS.map((l) => l.url),
      // Parenthetical detail ("Kubernetes (K3s)") reads as a distinct entity to a
      // search engine, so the structured-data list uses the bare term.
      knowsAbout: [...new Set(SKILLS.flatMap((g) => g.items).map((s) => s.replace(/\s*\([^)]*\)/g, "").trim()))],
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    // Keeps a stray "</script>" inside the data from closing the tag early.
    .replace(/<\//g, "<\\/");

  return indent([`<script type="application/ld+json">`, json, `</script>`].join("\n"), 1);
}
