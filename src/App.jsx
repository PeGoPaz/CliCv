import { useEffect, useState } from 'react'
import { Link, Mail, MapPin, Terminal } from 'lucide-react'
import {
  PROFILE,
  HIGHLIGHTS,
  TECH_STACK,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  NAV_ITEMS,
} from './data/cv.js'

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
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 px-4 py-5">
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
    <section className="space-y-4">
      {/* Name banner */}
      <div className="border border-emerald-400/30 bg-black/70 p-4 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
        <div className="flex justify-center overflow-x-auto">
          <pre className="inline-block whitespace-pre text-xs sm:text-sm md:text-base">
          {nameDisplay}
          </pre>
        </div>
      </div>

      {/* Portrait + Title/Summary row */}
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div className="border border-emerald-400/20 bg-black/60 p-3">
          <pre className="whitespace-pre overflow-x-auto text-[8px] leading-[0.65rem] text-emerald-200/90 sm:text-[10px] sm:leading-[0.7rem] md:text-xs md:leading-[0.8rem]">
            {portraitDisplay}
          </pre>
        </div>

        <div className="space-y-3">
          <TerminalPanel title="Profile">
            <div className="space-y-2 text-sm leading-relaxed text-emerald-100/90">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">user:</span>
                <span className="text-cyan-200">{PROFILE.name}</span>
                <span className="text-emerald-500/50">·</span>
                <span className="text-cyan-200">{PROFILE.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">loc:</span>
                <span>{PROFILE.location}</span>
              </div>
              <p className="pt-1">{PROFILE.summary}</p>
            </div>
          </TerminalPanel>
        </div>
      </div>

      {/* Tech stack */}
      <TerminalPanel title="Tech Stack">
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="rounded border border-emerald-500/30 bg-black/60 px-3 py-1 text-xs text-emerald-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </TerminalPanel>

      {/* Highlights / key stats */}
      <TerminalPanel title="Highlights">
        <div className="grid gap-3 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ stat, label }) => (
            <div
              key={label}
              className="border border-emerald-400/20 bg-black/60 p-3 text-center"
            >
              <div className="text-2xl font-bold text-cyan-300">{stat}</div>
              <div className="mt-1 text-xs text-emerald-300/80">{label}</div>
            </div>
          ))}
        </div>
      </TerminalPanel>

      {/* Experience */}
      <TerminalPanel title="Experience">
        <div className="space-y-4">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className="border-l-2 border-emerald-400/30 pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-cyan-200">
                  {job.role}
                </span>
                <span className="text-xs text-emerald-400/70">{job.period}</span>
              </div>
              <div className="text-xs text-emerald-300/80">
                {job.company} — {job.location}
              </div>
              <ul className="mt-2 space-y-1 text-sm text-emerald-100/90">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalPanel>

      {/* Education */}
      <TerminalPanel title="Education">
        <div className="border-l-2 border-emerald-400/30 pl-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-cyan-200">
              {EDUCATION[0].degree}
            </span>
            <span className="text-xs text-emerald-400/70">
              {EDUCATION[0].period}
            </span>
          </div>
          <div className="text-xs text-emerald-300/80">
            {EDUCATION[0].school} — {EDUCATION[0].location}
          </div>
        </div>
      </TerminalPanel>

      {/* Contact */}
      <TerminalPanel title="Contact">
        <ul className="space-y-2 text-sm">
          <ContactItem icon={MapPin} label="Location" value={PROFILE.location} />
          <ContactItem
            icon={Mail}
            label="Email"
            value={PROFILE.email}
            href={`mailto:${PROFILE.email}`}
          />
          <ContactItem
            icon={Link}
            label="GitHub"
            value={PROFILE.githubLabel}
            href={PROFILE.github}
          />
          <ContactItem
            icon={Link}
            label="LinkedIn"
            value={PROFILE.linkedinLabel}
            href={PROFILE.linkedin}
          />
        </ul>
      </TerminalPanel>
    </section>
  )
}

function ContactItem({ icon: Icon, label, value, href }) {
  return (
    <li className="flex items-center gap-3">
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
  )
}

function SkillsView() {
  return (
    <section className="space-y-4">
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
