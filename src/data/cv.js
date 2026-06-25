// All CV data in one place. Edit this file to update content.

export const PROFILE = {
  name: 'Vladimir Rai',
  title: 'Backend Software Engineer',
  location: 'Dublin, Ireland',
  email: 'vl.rai@proton.me',
  github: 'https://github.com/PeGoPaz',
  linkedin: 'https://www.linkedin.com/in/pegopaz/',
  githubLabel: 'github.com/PeGoPaz',
  linkedinLabel: 'linkedin.com/in/pegopaz',
  summary:
    "Hey — I'm Vladimir, a Computing Science student at Griffith College Dublin and a backend-leaning developer who's happiest when something complex is running fast and reliably. I started in banking software, validating and optimizing hundreds of SQL reports against a core banking platform, and I've spent years on the hardware side too — building high-performance PCs and making sure every component actually behaves under load. Lately I'm going deep into distributed systems, writing bulletproof JUnit tests, shipping CI/CD pipelines, and deploying containerized apps with Docker onto AWS. Right now I'm also picking up Rust and Go to sharpen my systems-level toolkit. Hardware, servers, and the code that glues them together — that's my thing.",
}

export const HIGHLIGHTS = [
  { stat: '200+', label: 'Regulatory reports validated' },
  { stat: '400+', label: 'Report modifications delivered' },
  { stat: '20+', label: 'Custom PCs assembled & optimized' },
]

export const TECH_STACK = [
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Linux',
  'CI/CD',
]

export const EXPERIENCE = [
  {
    role: 'Banking Software Implementation Specialist Intern',
    company: 'Y-Solutions',
    location: 'Moscow, Russia',
    period: 'Nov 2019 – Oct 2021 (Part-time)',
    bullets: [
      'Validated and debugged over 200 SQL-based regulatory reports within a core banking system, ensuring data accuracy and compliance with financial regulations.',
      'Engineered and optimized more than 400 complex SQL queries, improving system performance and maintaining compliance with changing regulatory standards.',
      'Assisted with the implementation of the Diasoft core banking platform for two banks, supporting system configuration, testing, and production deployment.',
    ],
  },
  {
    role: 'Systems Integration Technician',
    company: 'PRO-Computer',
    location: 'Moscow, Russia',
    period: 'Sep 2020 – May 2022 (Part-time)',
    bullets: [
      'Assembled and optimized over 20 custom high-performance computer systems, ensuring component compatibility, thermal efficiency, and reliable hardware configuration.',
      'Installed and secured Windows operating systems by configuring security baselines, user access controls, and system updates.',
      'Performed hardware diagnostics and stress testing to identify faults, resolve component issues, and ensure stable, deployment-ready systems.',
    ],
  },
]

export const EDUCATION = [
  {
    degree: 'BSc (Hons) in Computing Science',
    school: 'Griffith College Dublin',
    location: 'Dublin, Ireland',
    period: 'Sep 2023 – Jun 2027 (Expected)',
    note: '',
  },
]

export const SKILLS = [
  {
    title: 'Frameworks & Web Technologies',
    items: [
      'Spring Boot',
      'JUnit',
      'React',
      'Next.js',
      'Node.js',
      'Express.js (MERN Stack)',
      'REST APIs',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Databases & Cloud',
    items: ['SQL', 'PostgreSQL', 'MySQL', 'Amazon Web Services (AWS)'],
  },
  {
    title: 'DevOps, Tools & Systems',
    items: ['Docker', 'CI/CD Pipelines', 'Git Workflows', 'Linux Environments', 'CLI Tools', 'Automation'],
  },
  {
    title: 'Hardware & Systems Automation',
    items: [
      'Computer Hardware Architecture & Optimization',
      'Bash Scripting',
      'OS/BIOS/UEFI Configuration',
    ],
  },
  {
    title: 'Programming Languages',
    items: ['Java', 'Python', 'JavaScript', 'SQL', 'Bash', 'Rust (learning)', 'Go (learning)'],
  },
]

export const NAV_ITEMS = [
  { id: 'home', label: 'home' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
]
