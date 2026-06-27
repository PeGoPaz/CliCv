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
  category: string;
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

// ============================================================
// 👇 REPLACE THE DATA BELOW WITH YOUR REAL INFORMATION 👇
// ============================================================

export const PROFILE: Profile = {
  name: "Vladimir Rainov",
  title: "Software Engineer",
  location: "Dublin, Ireland",
  tagline: "Studying Computer Science @ Griffith College Dublin",
  status: "available",
};

export const ABOUT = `I am a Computing Science student at Griffith College Dublin with a proven foundation in optimizing complex data systems and automating IT infrastructure. My professional experience spans from engineering custom high-performance hardware integrations to validating regulatory SQL reports within core banking platforms, allowing me to seamlessly bridge the gap between physical workstations and software deployment. Currently working towards an AWS Solutions Architect certification, I am highly passionate about utilizing tools like Linux, Docker, and Kubernetes to design and maintain resilient cloud environments.`;

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
    name: "BePro",
    category: "Web Development",
    description: "BePro is a full-stack web application that connects customers with local service professionals for seamless appointment scheduling, reviews, and dashboard management. The platform features role-specific interfaces with interactive activity heatmaps, glassmorphic navigation, and a responsive, card-based design system built from scratch.",
    stack: ["React 19", "React Router v7", "Axios", "Vite", "Custom CSS", "Node.js", "Express", "MongoDB", "Mongoose", "express-session", "bcrypt"],
    repo: "https://github.com/PeGoPaz/BePro",
  },
  {
    name: "Sorted.ie",
    category: "Web Development",
    description: "This price aggregation platform helps shoppers find the best smartphone deals by comparing specifications and tracking prices across more than 50 global retailers. It provides a comprehensive database of over 3,800 devices equipped with smart search functionality and instant alerts for price drops and new releases.",
    stack: ["React/Next.js", "Vercel", "Node.js", "NeonDB"],
    link: "https://ie-catalog-frontend-jymn.vercel.app/",
  },
  {
    name: "Zero-Trust Proxmox Cluster",
    category: "Technical Builds",
    description: "Engineered a Zero-Trust micro-datacenter on repurposed hardware using Proxmox VE and to orchestrate secure, self-hosted microservices and media servers. The infrastructure features enterprise-grade networking with WireGuard mesh overlays to deliver low-latency edge computing and automated system monitoring.",
    stack: ["Proxmox VE", "Docker", "WireGuard", "Tailscale", "Pi-hole", "Nginx Proxy Manager", "ZFS", "Grafana", "Uptime Kuma"],
  },
];

export const CONTACTS = {
  email: "vl.rai@proton.me",
  availability: "Open to full-time roles, consulting, and select open-source collaborations.",
  responseTime: "Typically responds within 24 hours.",
};

export const LINKS: SocialLink[] = [
  { platform: "GitHub",   url: "https://github.com/PeGoPaz",              display: "github.com/PeGoPaz" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/pegopaz/",    display: "linkedin.com/in/pegopaz" },
  { platform: "X",        url: "https://x.com/Vi_Raim",                   display: "x.com/Vi_Raim" },
];