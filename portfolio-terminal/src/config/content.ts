/**
 * ============================================================
 *  PORTFOLIO CONTENT CONFIGURATION
 *  ✏️  EDIT THIS FILE TO REPLACE ALL PLACEHOLDER CONTENT
 * ============================================================
 */

export interface Profile {
  name: string;
  title: string;
  location: string;
  tagline: string;
  website: string;
  status: "available" | "busy" | "unavailable";
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  link: string;
  repo?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  display: string;
}

// ============================================================
// 👇 REPLACE THE DATA BELOW WITH YOUR REAL INFORMATION 👇
// ============================================================

export const PROFILE: Profile = {
  name: "Jane Doe",
  title: "Senior Full Stack Developer",
  location: "San Francisco, CA",
  tagline: "Building resilient systems with elegant interfaces.",
  website: "janedoe.dev",
  status: "available",
};

export const ABOUT = `I'm a full-stack engineer with 7+ years of experience shipping production software across fintech, developer tools, and SaaS platforms. I specialize in TypeScript, distributed systems, and crafting delightful developer experiences.

Currently focused on:
  • Building scalable backend infrastructure
  • Contributing to open-source tooling
  • Mentoring early-career engineers

Outside of work: hiking, mechanical keyboards, and competitive programming.`;

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Go", "Rust", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Svelte", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "Infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp",
    period: "2023 — Present",
    description: "Leading the platform team building internal developer tools.",
    highlights: [
      "Reduced CI pipeline times by 62% through parallelization",
      "Designed and shipped a new auth service handling 50M+ requests/day",
      "Mentored 4 junior engineers through promotion cycles",
    ],
  },
  {
    role: "Software Engineer II",
    company: "StartupXYZ",
    period: "2020 — 2023",
    description: "Core engineer on the payments platform.",
    highlights: [
      "Built real-time fraud detection system processing $2B/yr",
      "Led migration from monolith to microservices architecture",
      "Improved API reliability from 99.2% to 99.99% uptime",
    ],
  },
  {
    role: "Software Engineer",
    company: "BigTech Inc.",
    period: "2018 — 2020",
    description: "Full-stack engineer on the customer dashboard team.",
    highlights: [
      "Shipped React-based dashboard used by 500k+ customers",
      "Reduced page load times by 45% through code splitting",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "fluxdb",
    description: "A lightweight time-series database written in Rust with sub-millisecond query latency.",
    stack: ["Rust", "Tokio", "WASM"],
    link: "https://fluxdb.dev",
    repo: "https://github.com/janedoe/fluxdb",
  },
  {
    name: "devterm",
    description: "Terminal emulator with first-class TypeScript plugin support. 8k+ GitHub stars.",
    stack: ["TypeScript", "WebGL", "Node.js"],
    link: "https://devterm.sh",
    repo: "https://github.com/janedoe/devterm",
  },
  {
    name: "signalize",
    description: "Real-time collaborative whiteboard built on CRDTs for conflict-free sync.",
    stack: ["Svelte", "Yjs", "WebRTC"],
    link: "https://signalize.app",
  },
  {
    name: "dotfile-generator",
    description: "Interactive CLI for scaffolding reproducible development environments.",
    stack: ["Go", "Cobra", "Docker"],
    repo: "https://github.com/janedoe/dotfile-generator",
  },
];

export const CONTACTS = {
  email: "hello@janedoe.dev",
  phone: "+1 (555) 123-4567",
  availability: "Open to full-time roles, consulting, and select open-source collaborations.",
  responseTime: "Typically responds within 24 hours.",
};

export const LINKS: SocialLink[] = [
  { platform: "GitHub",   url: "https://github.com/janedoe",    display: "github.com/janedoe" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/janedoe", display: "linkedin.com/in/janedoe" },
  { platform: "Email",    url: "mailto:hello@janedoe.dev",       display: "hello@janedoe.dev" },
  { platform: "X",        url: "https://x.com/janedoe",          display: "x.com/janedoe" },
];