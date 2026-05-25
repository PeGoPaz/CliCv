import { useEffect, useState } from 'react'
import { Link, Mail, MapPin, Terminal } from 'lucide-react'

const HOME_DATA = {
  location: 'Dublin, Ireland',
  email: 'vl.rai@proton.me',
  github: 'https://github.com/PeGoPaz',
  linkedin: 'https://www.linkedin.com/in/pegopaz/',
  summary:
    "Hey! I'm Vladimir, a tech-obsessed software developer based in Dublin. I love breaking complex things down to see how they tick—whether it's building data-driven backends, optimizing database queries, or assembling hardware from scratch. My engineering journey sits at a unique intersection: I have professional experience working as a Banking Software Implementation Specialist, where I validated over 200+ regulatory reports for banking clients and modified 400+ complex database-driven reports. I’ve also spent years deep in hardware architecture, building custom high-performance PCs and configuring Linux-based environments. Right now, I'm diving heavy into distributed systems, writing bulletproof JUnit tests, designing automation via CI/CD pipelines, and deploying containerized applications with Docker onto AWS. Hit the links or commands below to explore.",
}

const SKILLS = [
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
    items: ['Java', 'Python', 'JavaScript', 'SQL', 'Bash'],
  },
]

const NAV_ITEMS = [
  { id: 'home', label: 'home' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
]

const CONTACT_ITEMS = [
  {
    label: 'Location',
    value: HOME_DATA.location,
    icon: MapPin,
  },
  {
    label: 'Email',
    value: HOME_DATA.email,
    href: `mailto:${HOME_DATA.email}`,
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/PeGoPaz',
    href: HOME_DATA.github,
    icon: Link,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/pegopaz',
    href: HOME_DATA.linkedin,
    icon: Link,
  },
]

function App() {
  const [activePage, setActivePage] = useState('home')
  const [asciiName, setAsciiName] = useState('')
  const [asciiPortrait, setAsciiPortrait] = useState('')
  const [asciiLoading, setAsciiLoading] = useState(true)
  const [asciiError, setAsciiError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const nameArtUrl = new URL('../mynameinfiglet.md', import.meta.url)
    const portraitArtUrl = new URL('../imageascii.md', import.meta.url)

    const loadAscii = async () => {
      try {
        setAsciiLoading(true)
        setAsciiError('')
        const [nameResponse, portraitResponse] = await Promise.all([
          fetch(nameArtUrl, { signal: controller.signal }),
          fetch(portraitArtUrl, { signal: controller.signal }),
        ])

        if (!nameResponse.ok || !portraitResponse.ok) {
          throw new Error('Failed to load ASCII assets')
        }

        const [nameText, portraitText] = await Promise.all([
          nameResponse.text(),
          portraitResponse.text(),
        ])

        setAsciiName(nameText.replace(/\n$/, ''))
        setAsciiPortrait(portraitText.replace(/\n$/, ''))
      } catch (error) {
        if (error.name !== 'AbortError') {
          setAsciiError('Failed to load ASCII art from project root assets.')
        }
      } finally {
        setAsciiLoading(false)
      }
    }

    loadAscii()
    return () => controller.abort()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-emerald-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6">
        <header className="flex flex-wrap items-center justify-between gap-3 border border-emerald-400/30 bg-neutral-950/70 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-emerald-300">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>guest@portfolio:~$</span>
            <span className="text-emerald-500">{activePage}</span>
          </div>
          <div className="text-xs text-emerald-400/70">
            React DOM · Tailwind · CLI Mode
          </div>
        </header>

        <main className="flex-1">
          {activePage === 'home' && (
            <HomeView
              asciiName={asciiName}
              asciiPortrait={asciiPortrait}
              asciiLoading={asciiLoading}
              asciiError={asciiError}
            />
          )}
          {activePage === 'skills' && <SkillsView />}
          {activePage === 'projects' && <ProjectsView />}
        </main>

        <FooterNav activePage={activePage} onNavigate={setActivePage} />
      </div>
    </div>
  )
}

function HomeView({ asciiName, asciiPortrait, asciiLoading, asciiError }) {
  const nameDisplay = asciiLoading
    ? 'Loading name art...'
    : asciiError || asciiName || 'Name art unavailable.'
  const portraitDisplay = asciiLoading
    ? 'Loading portrait art...'
    : asciiError || asciiPortrait || 'Portrait art unavailable.'

  return (
    <section className="space-y-6">
      <div className="rounded border border-emerald-400/30 bg-black/70 p-4 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
        <pre className="whitespace-pre overflow-x-auto text-xs sm:text-sm md:text-base">
          {nameDisplay}
        </pre>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="rounded border border-emerald-400/20 bg-black/60 p-4">
          <pre className="whitespace-pre overflow-x-auto text-[10px] leading-4 text-emerald-200/90 sm:text-xs md:text-sm">
            {portraitDisplay}
          </pre>
        </div>

        <div className="space-y-4">
          <TerminalPanel title="Summary">
            <p className="text-sm leading-relaxed text-emerald-100/90">{HOME_DATA.summary}</p>
          </TerminalPanel>

          <TerminalPanel title="Contact">
            <ul className="space-y-2 text-sm">
              {CONTACT_ITEMS.map(({ label, value, href, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  <span className="min-w-[70px] text-emerald-400">{label}:</span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-200 hover:text-cyan-100"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-emerald-100/90">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </TerminalPanel>

          <TerminalPanel title="Quick Commands">
            <div className="flex flex-wrap gap-2 text-xs text-emerald-300/80">
              {NAV_ITEMS.map((item) => (
                <span
                  key={item.id}
                  className="rounded border border-emerald-500/20 bg-black/60 px-2 py-1"
                >
                  guest@portfolio:~$ {item.label}
                </span>
              ))}
            </div>
          </TerminalPanel>
        </div>
      </div>
    </section>
  )
}

function SkillsView() {
  return (
    <section className="space-y-6">
      <TerminalPanel title="Technical Skills">
        <div className="grid gap-4 md:grid-cols-2">
          {SKILLS.map((group) => (
            <div
              key={group.title}
              className="rounded border border-emerald-400/20 bg-black/60 p-4"
            >
              <div className="mb-2 text-xs uppercase tracking-[0.25em] text-emerald-400/80">
                {group.title}
              </div>
              <ul className="space-y-1 text-sm text-emerald-100/90">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalPanel>
    </section>
  )
}

function ProjectsView() {
  return (
    <section className="flex h-full items-center justify-center">
      <div className="rounded border border-emerald-400/30 bg-black/70 px-6 py-8 text-center">
        <div className="text-lg text-emerald-200">Projects coming soon…</div>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-emerald-400/70">
          <span>awaiting deploy</span>
          <span className="cursor-blink inline-block h-4 w-2 bg-emerald-400" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

function TerminalPanel({ title, children }) {
  return (
    <div className="rounded border border-emerald-400/30 bg-neutral-950/80">
      <div className="flex items-center justify-between border-b border-emerald-400/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-400/80">
        <span>{title}</span>
        <span className="text-emerald-500/60">[active]</span>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  )
}

function FooterNav({ activePage, onNavigate }) {
  return (
    <footer className="border border-emerald-400/30 bg-neutral-950/80 px-4 py-3">
      <div className="flex flex-wrap gap-3 text-sm">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`rounded border px-3 py-2 text-left transition ${
              activePage === item.id
                ? 'border-cyan-300 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                : 'border-emerald-400/20 text-emerald-300 hover:border-emerald-300/60 hover:text-emerald-200'
            }`}
          >
            <span className="text-emerald-500/70">guest@portfolio:~$</span> {item.label}
          </button>
        ))}
      </div>
    </footer>
  )
}

export default App
