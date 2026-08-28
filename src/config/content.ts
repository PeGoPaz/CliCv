/**
 * ============================================================
 *  PORTFOLIO CONTENT
 *  Mirrored by #static-cv in index.html — npm run check:cv-sync
 * ============================================================
 */

export interface Profile {
  name: string;
  title: string;
  location: string;
  tagline: string;
  availability: string;
  status: "available" | "busy" | "unavailable";
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  period: string;
  description: string;
  highlights?: string[];
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
  category: string;
  period?: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  display: string;
}

export const PROFILE: Profile = {
  name: "Vladimir Rainov",
  title: "Software Engineer",
  location: "Dublin, Ireland",
  tagline: "Final-year BSc (Hons) Computing Science @ Griffith College Dublin",
  availability:
    "Available part-time during term and full-time over the summer (Stamp 2). " +
    "Graduating June 2027, then eligible for the Third Level Graduate Programme " +
    "(Stamp 1G) — 12 months of full-time work with no employer permit required.",
  status: "available",
};

export const ABOUT = `Final-year BSc (Hons) Computing Science student at Griffith College Dublin, graduating June 2027. I work mainly in Java, Python and SQL, and I have built software outside coursework: two years part-time on a core banking platform, where I debugged 200+ SQL-based regulatory reports and optimised 400+ queries against changing compliance rules, and projects I design, build and deploy end to end — from a multi-language site running in production to a self-hosted Proxmox cluster running my own services. I am working towards an AWS Solutions Architect certification, and I am looking for a graduate software engineering role where I can work across the stack and learn from experienced engineers.`

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Java", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Backend & Web",
    items: ["Node.js", "React", "Next.js", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes (K3s)", "AWS", "CI/CD Pipelines", "Git"],
  },
  {
    category: "Systems & Networking",
    items: ["Linux (Ubuntu, Debian, Arch)", "Bash", "Proxmox VE", "TCP/IP", "DNS", "DHCP", "VLANs", "LAN"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    qualification: "BSc (Hons) in Computing Science",
    institution: "Griffith College Dublin",
    period: "Sep 2023 — Jun 2027 (expected)",
    description: "Dublin, Ireland · Full-time",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Banking Software Implementation Specialist Intern",
    company: "Y-Solutions",
    period: "Nov 2019 — Oct 2021",
    description: "Moscow, Russia · Part-time",
    highlights: [
      "Validated and debugged 200+ SQL-based regulatory reports within a core banking system, ensuring data accuracy and compliance with financial regulations",
      "Engineered and optimized 400+ complex SQL queries, improving system throughput and ensuring 100% compliance with changing regulatory standards",
      "Supported implementation of the Diasoft core banking platform for 2 banks, assisting in system configuration, testing, and production deployment",
    ],
  },
  {
    role: "Systems Integration Technician",
    company: "PRO-Computer",
    period: "Sep 2020 — May 2022",
    description: "Moscow, Russia · Part-time",
    highlights: [
      "Assembled and optimized 20+ custom high-performance systems, managing component compatibility, thermal dynamics, and hardware configuration",
      "Provisioned and hardened Windows OS environments, implementing security baselines, user access controls, and system updates",
      "Conducted rigorous hardware diagnostics and stress-testing to troubleshoot component conflicts, isolate faults, and guarantee 100% system stability before client delivery",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Sorted.ie",
    category: "Web Development",
    period: "Aug 2026 — present",
    description: "This price aggregation platform helps shoppers find the best smartphone deals by comparing specifications and tracking prices across more than 50 global retailers. It provides a comprehensive database of over 3,800 devices equipped with smart search functionality and instant alerts for price drops and new releases.",
    stack: ["React/Next.js", "Vercel", "Node.js", "NeonDB"],
    link: "https://ie-catalog-frontend-jymn.vercel.app/",
  },
  {
    name: "Villa Caterina",
    category: "Web Development",
    period: "Jun — Jul 2026",
    description: "Designed and built a zero-dependency static website for a luxury vacation rental on Lake Como, Italy. The site features multi-language support (English, Italian, French, German), real-time availability synchronization from Booking.com via GitHub Actions, and a contact form powered by Formspree. Deployed on GitHub Pages with a custom domain and strict Content Security Policy.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Formspree", "GitHub Actions", "Python"],
    link: "https://villacaterina.casa/",
    repo: "https://github.com/villacaterina/VillaCaterina-web",
  },
  {
    name: "BePro",
    category: "Web Development",
    period: "Jan — May 2026",
    description: "BePro is a full-stack web application that connects customers with local service professionals for seamless appointment scheduling, reviews, and dashboard management. The platform features role-specific interfaces with interactive activity heatmaps, glassmorphic navigation, and a responsive, card-based design system built from scratch.",
    stack: ["React 19", "React Router v7", "Axios", "Vite", "Custom CSS", "Node.js", "Express", "MongoDB", "Mongoose", "express-session", "bcrypt"],
    repo: "https://github.com/PeGoPaz/BePro",
  },
  {
    name: "AI-GPU-Benchmark",
    category: "AI / Machine Learning",
    period: "Aug — Sep 2026",
    description: "A GPU benchmarking desktop application that measures AI training throughput via LoRA fine-tuning of TinyLlama-1.1B while monitoring real-time GPU telemetry (temperature, power, VRAM, clock speed) through NVML. Features a PyQt6 GUI with live telemetry dashboard, training progress tracking, and inline thermal & power curve plotting on completion.",
    stack: ["PyQt6", "PyTorch", "Transformers", "PEFT", "TRL", "nvidia-ml-py", "pandas", "matplotlib"],
    repo: "https://github.com/PeGoPaz/AI-GPU-Benchmark",
  },
  {
    name: "Zero-Trust Proxmox Cluster",
    category: "Technical Builds",
    period: "Dec 2025 — Jan 2026",
    description: "Engineered a Zero-Trust micro-datacenter on repurposed hardware using Proxmox VE to orchestrate secure, self-hosted microservices and media servers. The infrastructure features enterprise-grade networking with WireGuard mesh overlays to deliver low-latency edge computing and automated system monitoring.",
    stack: ["Proxmox VE", "Docker", "WireGuard", "Tailscale", "Pi-hole", "Nginx Proxy Manager", "ZFS", "Grafana", "Uptime Kuma"],
  },
];


export const CONTACTS = {
  email: "vl.rai@proton.me",
  availability: "Open to graduate software engineering roles and internships, and to open-source collaboration.",
  responseTime: "Typically responds within 24 hours.",
};

export const LINKS: SocialLink[] = [
  { platform: "GitHub",   url: "https://github.com/PeGoPaz",              display: "github.com/PeGoPaz" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/pegopaz/",    display: "linkedin.com/in/pegopaz" },
  { platform: "X",        url: "https://x.com/Vi_Raim",                   display: "x.com/Vi_Raim" },
];