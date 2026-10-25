// Single source of truth. index.html and assets/cv.pdf are generated from this.
// npm run page  ·  npm run cv  ·  npm run check:cv-sync

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
  // One plain sentence: what the project is. Leads the card on the page and in
  // the terminal, and is the CV's one-liner.
  summary?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  display: string;
}

export const PROFILE: Profile = {
  name: "Vladimir Rainov",
  title: "Computing Science Graduate 2027",
  location: "Dublin, Ireland",
  tagline: "Final-year BSc (Hons) at Griffith College Dublin - I build, deploy and run what I write",
  availability:
    "Graduating June 2027 and eligible for the Third Level Graduate Programme " +
    "(Stamp 1G): 12 months of full-time work with no employer permit required.",
  status: "available",
};

export const ABOUT = `Final-year BSc (Hons) Computing Science student at Griffith College Dublin, graduating June 2027. Most of what I can do I learned by building and running things outside coursework: a self-hosted Proxmox cluster behind a WireGuard mesh, with Pi-hole, ZFS and Grafana monitoring; a client site in production that syncs its own availability through a GitHub Actions pipeline; a Rails API I audited and hardened after finding raw user input reaching SQL; and a GPU benchmark that measures training throughput, energy and thermals under a fixed LoRA fine-tune, with a C++ sampler reading board power at 500 Hz. Earlier, part-time work in industry: building and hardening client workstations, then debugging over 200 SQL-based regulatory reports and reworking around 400 queries against changing compliance rules in a core banking system. I am looking for a graduate engineering role where I can work on real systems and learn from experienced engineers.`

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Backend & Web",
    items: ["Node.js", "Express", "Spring Boot", "React", "Next.js", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Systems & Networking",
    items: [
      "Linux (Ubuntu, Debian, Arch)",
      "Windows provisioning and hardening",
      "Bash",
      "Proxmox VE",
      "ZFS",
      "TCP/IP",
      "DNS",
      "DHCP",
      "VLANs",
      "LAN",
      "WireGuard",
      "Tailscale",
      "Nginx Proxy Manager",
      "Pi-hole",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "Kubernetes (K3s)",
      "AWS",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Git",
      "Grafana",
      "Uptime Kuma",
    ],
  },
  {
    category: "Security",
    items: [
      "Parameterised SQL and injection prevention",
      "Rate limiting",
      "Session and cookie hardening",
      "bcrypt password hashing",
      "Input sanitisation",
      "Helmet security headers",
      "Content Security Policy",
      "Windows security baselines",
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "PyTorch",
      "Transformers",
      "PEFT (LoRA)",
      "TRL",
      "NVML telemetry",
      "pandas",
      "matplotlib",
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    qualification: "BSc (Hons) in Computing Science",
    institution: "Griffith College Dublin",
    period: "Sep 2023 - Jun 2027 (expected)",
    description: "Dublin, Ireland · Full-time",
    highlights: [
      "Relevant modules: Networks and Data Communication; Linux System Administration; Databases; Web Technologies",
    ],
  },
  {
    qualification: "Junior Java Developer (certificate)",
    institution: "SkyPro",
    period: "Mar 2022 - Feb 2023",
    description: "Online · Part-time",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "PC Build & Systems Technician",
    company: "PRO-Computer (Self-Employed)",
    period: "Dec 2019 - Jun 2022",
    description: "Moscow, Russia · Part-time",
    highlights: [
      "Built and configured 20+ custom workstations to client specification, selecting compatible components and managing thermal and power budgets per build",
      "Provisioned and hardened the Windows environments shipped with them: security baselines, user access controls and update policy",
      "Diagnosed component conflicts and hardware faults through structured stress-testing, resolving them before delivery rather than after",
    ],
  },
  {
    role: "Assistant Systems Analyst",
    company: "Y-Solutions",
    period: "Sep 2020 - Dec 2021",
    description: "Moscow, Russia · Part-time",
    highlights: [
      "Validated and debugged 200+ SQL-based regulatory reports in a core banking system, reconciling output against source data and the applicable reporting requirements",
      "Wrote and optimised approximately 400 SQL queries behind those reports, reworking slow joins and aggregations as regulatory reporting rules changed",
      "Supported the rollout of the Diasoft core banking platform at two banks: configuration, testing and production deployment",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Self-Hosted Proxmox Cluster",
    category: "Infrastructure & Self-Hosting",
    period: "Dec 2025 - Jan 2026",
    description: "Built to cut monthly subscription costs and keep my own data off corporate cloud services. Repurposed hardware runs Proxmox VE hosting containerised services, with a WireGuard mesh for remote access, Pi-hole for DNS filtering, ZFS for storage and Grafana with Uptime Kuma for monitoring. I built it between finishing the Networks and Data Communication module and starting Linux System Administration, and used it to put both subjects into practice.",
    summary: "A home server cluster that replaced my paid cloud subscriptions.",
    stack: ["Proxmox VE", "Docker", "WireGuard", "Tailscale", "Pi-hole", "Nginx Proxy Manager", "ZFS", "Grafana", "Uptime Kuma"],
  },
  {
    name: "Villa Caterina",
    category: "Web Development",
    period: "Jun 2026 - present",
    description: "A holiday-rental site for a villa on Lake Como, built for a client who needed running costs as close to zero as possible. That ruled out a database, so availability is pulled from the property's Booking.com iCal feed by a GitHub Actions job every six hours and committed back to the repository as JSON, and the Italian, French and German pages are generated from the English ones by a Python script. It runs on GitHub Pages with a custom domain, a Formspree contact form and a strict Content Security Policy, and it is where I learned GitHub Actions properly.",
    summary: "Booking site for a Lake Como holiday villa, run at near-zero cost.",
    stack: ["HTML", "CSS", "JavaScript", "Python", "GitHub Actions", "GitHub Pages", "Formspree"],
    link: "https://villacaterina.casa/",
    repo: "https://github.com/villacaterina/VillaCaterina-web",
  },
  {
    name: "Property Template",
    category: "Web Development",
    period: "Oct 2026 - present",
    description: "A site for a similar rental is set up by editing data files instead of HTML. Every page is generated from a property config, a reviews file and one text file per language by a build written against Python's standard library alone, and the build refuses to ship mistakes: overlapping price seasons, a translation missing a key, a review scored above its platform's scale or a link to a script that does not exist all stop it with a message saying which. Reviews are rendered into the HTML at build time rather than injected by JavaScript, so search engines see them. Availability is merged from every platform's iCal feed, and if any feed fails nothing is written, because a calendar missing one platform's bookings would offer those dates again. CI tests, builds and deploys the site, and every six hours rebuilds it with fresh availability without committing anything. Building it also turned up a bug on the live villa site: Chrome rendered the AVIF photos macOS had encoded at odd dimensions as blank images, which I fixed in both.",
    summary: "The villa's site turned into a template for any holiday rental.",
    stack: ["Python", "JavaScript", "HTML", "CSS", "GitHub Actions", "GitHub Pages", "unittest", "node:test"],
    repo: "https://github.com/PeGoPaz/property-template",
  },
  {
    name: "Pro.me",
    category: "Web Development",
    period: "Aug 2026 - present",
    description: "I am building it on my own. The official RSA register already says who is approved to teach; Pro.me helps learners choose between them. Its reference data - all 26 counties and 62 driving test centres, with Eircodes, coordinates and the licence categories each one tests - is imported from the RSA's own register, and search ranks verified instructors first, then profile completeness and reviews, never self-reported lesson counts. Instructors set up their profile in a step-by-step wizard that saves as it goes, learners shortlist instructors and request lessons, and admins check ADI numbers against the register from a verification queue. Photos go to Cloudinary: the server checks each file's type from its bytes rather than its name, Cloudinary re-encodes it, which strips the GPS location a phone writes into it, and a gallery's 12-photo limit holds even when two uploads land at once. A learner can only review an instructor after a lesson the instructor confirmed has taken place. Because it hosts public profiles and reviews, it follows the EU Digital Services Act: anyone can report content, a report cannot be closed without a statement of reasons, the author of a hidden review is shown why, and the admin area counts the figures for the yearly transparency report. The Express 5 backend uses session auth stored in MongoDB, Helmet, bcrypt and a login rate limit that only counts failed attempts, and the whole site runs as a single Render service in Frankfurt so the session cookie stays first-party, which Safari would otherwise block.",
    summary: "A marketplace for finding a driving instructor in Ireland.",
    stack: ["React 19", "Vite", "Tailwind CSS", "React Router v7", "Node.js", "Express 5", "MongoDB", "Mongoose", "Cloudinary", "Helmet", "Render"],
    repo: "https://github.com/PeGoPaz/Pro-me",
  },
  {
    name: "Sorted",
    category: "Web Development",
    period: "Feb 2026 - Jul 2026",
    description: "A smartphone catalogue for the Irish market, built with a coursemate: a React 19 and TypeScript front end over a Rails 8 JSON API on PostgreSQL. Filtering runs server-side across around twenty dimensions - brand, screen size, RAM, storage, cameras, refresh rate, release year, 5G, NFC, charging, SIM type and biometrics - and a second endpoint reports how many devices a pending filter set would leave and which brands are still selectable, so the counts update before anything is applied. Filter state is mirrored into the URL, results are paged in chunks of 50, and up to five phones can be put side by side. My work was on the backend: the storage and release-year filters interpolated user input straight into SQL, so I rewrote them onto bound parameters, then added per-endpoint rate limiting, a production-only secure flag on the session cookie, and JSON error handling so an unknown device id returns a 404 rather than a 500.",
    summary: "A smartphone catalogue for Ireland with filters across 20 specs.",
    stack: ["React 19", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "Ruby on Rails 8", "PostgreSQL (Neon)", "Vercel", "Render"],
    link: "https://ie-catalog-frontend-jymn.vercel.app/",
  },
  {
    name: "AI-GPU-Benchmark",
    category: "AI / Machine Learning",
    period: "Jul 2026 - present",
    description: "I deshrouded my RTX 4070 Ti and fitted custom fans, then had no repeatable way to tell whether it actually ran cooler, so I built one: the card runs a fixed LoRA fine-tune while the tool records what the driver reports. It has since grown into a benchmark for comparing cards and settings, released as 0.1.0. Throughput is measured in tokens per second and as model FLOPs utilisation against a peak worked out from the card's architecture, SM count and clock; energy comes from NVML's counter and is attributed to each training step; and a thermal model fitted to the temperature curve says whether the run reached steady state and when throttling began. Python cannot sample power fast enough to catch transients, so an optional C++17 extension samples it at 500 Hz on its own thread outside the GIL, through a lock-free ring buffer, tested under AddressSanitizer, UndefinedBehaviorSanitizer and ThreadSanitizer. Runs can be repeated with outlier rejection or swept over a grid of settings and ranked by their Pareto front of speed against efficiency, and the tool runs headless in a CUDA container with a Prometheus endpoint, a Grafana dashboard and a SQLite history of every run. Strict mypy, property-based tests and CI on Linux, Windows and macOS all run without a GPU.",
    summary: "Benchmarks NVIDIA GPUs on a real AI training workload.",
    stack: ["Python", "C++17", "PyTorch", "Transformers", "PEFT", "PyQt6", "NVML", "SQLite", "Prometheus", "Grafana", "Docker"],
    repo: "https://github.com/PeGoPaz/AI-GPU-Benchmark",
    writeup: "https://www.linkedin.com/posts/pegopaz_i-recently-deshrouded-my-850-rtx-4070-ti-ugcPost-7486854438087827457-OA0A/",
  },
];



export const CONTACTS = {
  email: "vl.rai@proton.me",
  availability: "Open to graduate engineering roles and internships, and to open-source collaboration.",
  responseTime: "Typically responds within 24 hours.",
};

export const LINKS: SocialLink[] = [
  { platform: "GitHub",   url: "https://github.com/PeGoPaz",              display: "github.com/PeGoPaz" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/pegopaz/",    display: "linkedin.com/in/pegopaz" },
  { platform: "X",        url: "https://x.com/Vi_Raim",                   display: "x.com/Vi_Raim" },
];