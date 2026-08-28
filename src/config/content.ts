// Mirrored by #static-cv in index.html — npm run check:cv-sync

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
  writeup?: string;
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
    name: "Villa Caterina",
    category: "Web Development",
    period: "Jun 2026 — present",
    description: "A holiday-rental site for a villa on Lake Como, built for a client who needed running costs as close to zero as possible. That ruled out a database, so availability is pulled from the property's Booking.com iCal feed by a GitHub Actions job every six hours and committed back to the repository as JSON, and the Italian, French and German pages are generated from the English ones by a Python script. It runs on GitHub Pages with a custom domain, a Formspree contact form and a strict Content Security Policy, and it is where I learned GitHub Actions properly.",
    stack: ["HTML", "CSS", "JavaScript", "Python", "GitHub Actions", "GitHub Pages", "Formspree"],
    link: "https://villacaterina.casa/",
    repo: "https://github.com/villacaterina/VillaCaterina-web",
  },
  {
    name: "Pro.me",
    category: "Web Development",
    period: "Aug 2026 — present",
    description: "A service-booking platform I am building on my own: customers browse providers by category, book appointments and leave reviews, and each role gets its own dashboard. It is still at concept stage and currently generic — the plan is to narrow it to driving instructors. The Express backend uses session auth backed by MongoDB, with Helmet, rate limiting, input sanitisation and bcrypt password hashing.",
    stack: ["React 19", "Vite", "Tailwind CSS", "React Router v7", "Node.js", "Express 5", "MongoDB", "Mongoose", "Helmet", "Cloudinary"],
    repo: "https://github.com/PeGoPaz/Pro-me",
  },
  {
    name: "AI-GPU-Benchmark",
    category: "AI / Machine Learning",
    period: "Jul 2026 — present",
    description: "I deshrouded my RTX 4070 Ti and fitted custom fans, then had no repeatable way to tell whether it actually ran cooler. This tool puts the card under a fixed AI workload — a 150-step LoRA fine-tune of TinyLlama-1.1B in bfloat16 — while a separate thread polls NVML every 250 ms for temperature, hotspot, VRAM, power draw and clock speed. The PyQt6 window shows live telemetry during the run and plots thermal and power curves when it finishes, so two cooling setups can be compared on identical work.",
    stack: ["Python", "PyQt6", "PyTorch", "Transformers", "PEFT", "TRL", "nvidia-ml-py", "pandas", "matplotlib"],
    repo: "https://github.com/PeGoPaz/AI-GPU-Benchmark",
    writeup: "https://www.linkedin.com/posts/pegopaz_i-recently-deshrouded-my-850-rtx-4070-ti-ugcPost-7486854438087827457-OA0A/",
  },
  {
    name: "Self-Hosted Proxmox Cluster",
    category: "Technical Builds",
    period: "Dec 2025 — Jan 2026",
    description: "Built to cut monthly subscription costs and keep my own data off corporate cloud services. Repurposed hardware runs Proxmox VE hosting containerised services, with a WireGuard mesh for remote access, Pi-hole for DNS filtering, ZFS for storage and Grafana with Uptime Kuma for monitoring. I built it between finishing the Networks and Data Communication module and starting Linux System Administration, and used it to put both subjects into practice.",
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