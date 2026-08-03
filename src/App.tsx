import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Clock3, Mail, Menu, X } from 'lucide-react'
import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from 'shaders/react'

const ABOUT_PRODUCTION_IMAGE = '/images/about-production-field.webp'
const ABOUT_FACILITIES_IMAGE = '/images/about-production-facility.webp'
const PRODUCTION_SYSTEMS_IMAGE = '/images/project-production-systems.webp'
const REAL_ESTATE_PROJECT_IMAGE = '/images/project-real-estate.webp'
const SAM_PORTRAIT =
  'data:image/png;base64,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'

const EMAIL_HREF =
  'mailto:samstehno@hotmail.com?subject=Project%20inquiry%20for%20Sam%20Stehno'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Connect', href: EMAIL_HREF },
]

const EXPERIENCE_DETAILS = {
  achievements: [
    'Completed comprehensive production operations training',
    'Led a cross-functional team for a process optimization initiative',
    'Implemented data-driven decision-making frameworks',
  ],
  dates: '2025 — Present',
  organization: 'Oxy',
  responsibilities: [
    "Participating in Oxy's Operations Engineering Development Program",
    'Gaining hands-on experience in oil and gas production operations and optimization',
    'Applying petroleum engineering principles to improve production efficiency',
  ],
  title: 'OEDP Production Engineer',
}

const EDUCATION_DETAILS = {
  achievements: [
    "Named to the Dean's List for multiple semesters",
    'Served as president of the Society of Petroleum Engineers student chapter',
    'Graduated with honors and distinction',
  ],
  dates: '2021 — 2025',
  organization: 'Texas Tech University',
  responsibilities: [
    'Bachelor of Science in Petroleum Engineering with minors in Mathematics and Computer Science',
    'Focused on reservoir engineering and production optimization',
    'Built a strong foundation in mathematical modeling and computational methods',
  ],
  title: 'Bachelor of Science in Petroleum Engineering',
}

const CONTACT_SUBJECT = 'Reaching out to Sam'
const CONTACT_BODY = `Hi Sam,

I'm reaching out because I'd like to connect about...

Best,`
const CONTACT_HREF = `mailto:?subject=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`

const transitionCurve =
  'duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

function useTexasTime() {
  const formatTime = () =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())

  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime()), 1_000)
    return () => window.clearInterval(interval)
  }, [])

  return time
}

function TextRoll({ children }: { children: ReactNode }) {
  return (
    <span className="h-[20px] overflow-hidden">
      <span
        className={`flex flex-col transition-transform ${transitionCurve} group-hover:-translate-y-1/2`}
      >
        <span className="flex h-[20px] items-center whitespace-nowrap">
          {children}
        </span>
        <span aria-hidden="true" className="flex h-[20px] items-center whitespace-nowrap">
          {children}
        </span>
      </span>
    </span>
  )
}

function LargeTextRoll({ children }: { children: ReactNode }) {
  return (
    <span className="h-[1em] overflow-hidden">
      <span
        className={`flex flex-col transition-transform ${transitionCurve} group-hover:-translate-y-1/2`}
      >
        <span className="flex h-[1em] items-center whitespace-nowrap">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="flex h-[1em] items-center whitespace-nowrap"
        >
          {children}
        </span>
      </span>
    </span>
  )
}

function ArrowButton({
  children,
  href,
  className = '',
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  return (
    <a
      className={`group inline-flex w-fit items-center gap-3 rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] font-medium leading-[14px] text-white transition-colors hover:bg-[#e05a1a] sm:pl-6 ${transitionCurve} ${className}`}
      href={href}
    >
      <TextRoll>{children}</TextRoll>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white sm:h-8 sm:w-8">
        <ArrowRight
          aria-hidden="true"
          className={`h-[14px] w-[14px] text-[#F26522] transition-transform ${transitionCurve} group-hover:-rotate-45`}
        />
      </span>
    </a>
  )
}

function PartnerMark() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
          fill="#0A66C2"
        />
      </svg>
    <svg
      aria-hidden="true"
      className="hidden"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
    </>
  )
}

function HeroShader() {
  const [available, setAvailable] = useState(true)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_43%,rgba(255,95,3,0.38),transparent_29%),linear-gradient(120deg,#ffffff_0%,#efefef_48%,#f4b18a_100%)]" />
      {available && (
        <Shader
          className="absolute inset-0 h-full w-full"
          colorSpace="srgb"
          disableTelemetry
          onUnavailable={() => setAvailable(false)}
        >
          <FilmGrain strength={0.05}>
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            >
              <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
              <ChromaFlow
                baseColor="#ffffff"
                blendMode="multiply"
                downColor="#ff5f03"
                leftColor="#ff5f03"
                momentum={13}
                radius={3.5}
                rightColor="#ff5f03"
                upColor="#ff5f03"
              />
            </FlutedGlass>
          </FilmGrain>
        </Shader>
      )}
    </div>
  )
}

function MobileMenu({
  open,
  onClose,
  time,
}: {
  open: boolean
  onClose: () => void
  time: string
}) {
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 flex items-end bg-black/60 transition-opacity md:hidden ${transitionCurve} ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      onClick={onClose}
    >
      <div
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`mb-3 w-[calc(100%-1.5rem)] rounded-2xl bg-white px-5 pb-5 pt-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-[13px] text-gray-600">
            <Clock3 aria-hidden="true" size={14} />
            {time} in Texas
          </span>
          <button
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <nav className="flex flex-col" aria-label="Mobile navigation links">
          {NAV_LINKS.map((link) => (
            <a
              className="border-t border-gray-200 py-4 text-[28px] font-medium leading-8 tracking-[-0.025em] text-gray-900"
              href={link.href}
              key={link.label}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="mt-5 flex items-center justify-between rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] font-medium text-white"
          href={EMAIL_HREF}
          onClick={onClose}
        >
          Start a project
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#F26522]">
            <ArrowRight aria-hidden="true" size={15} />
          </span>
        </a>
      </div>
    </div>
  )
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const time = useTexasTime()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
      <div
        className={`relative ${menuOpen ? 'z-[60]' : 'z-20'} mx-auto w-full max-w-[1440px] p-2 sm:p-3`}
      >
        <div className="flex items-center justify-between rounded-full bg-white p-[5px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-7">
            <a
              aria-label="Sam Stehno home"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold leading-[11px] tracking-tight text-white sm:h-10 sm:w-10"
              href="#top"
            >
              SS
            </a>
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-6 md:flex"
            >
              {NAV_LINKS.map((link) => (
                <a
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <span className="hidden text-[13px] text-gray-600 lg:inline">
              Open to select conversations
            </span>
            <span className="flex items-center gap-2 text-[13px] text-gray-600">
              <Clock3 aria-hidden="true" size={14} />
              {time} in Texas
            </span>
            <a
              className="group inline-flex items-center gap-3 rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] font-medium text-white"
              href={EMAIL_HREF}
            >
              <TextRoll>Book a strategy call</TextRoll>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <ArrowRight
                  aria-hidden="true"
                  className={`h-[13px] w-[13px] text-gray-900 transition-transform ${transitionCurve} group-hover:-rotate-45`}
                />
              </span>
            </a>
          </div>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="flex h-9 items-center gap-2 rounded-full bg-gray-900 px-3 text-[13px] font-medium text-white md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            {menuOpen ? 'Close' : 'Menu'}
            {menuOpen ? (
              <X aria-hidden="true" size={15} />
            ) : (
              <Menu aria-hidden="true" size={15} />
            )}
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} time={time} />
    </>
  )
}

function Hero() {
  return (
    <section
      className="relative flex min-h-screen min-h-[100svh] flex-col overflow-hidden bg-[#EFEFEF]"
      id="top"
    >
      <HeroShader />
      <Navigation />
      <div className="flex-1" />
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mb-5 flex items-center gap-3 sm:mb-8">
          <img
            alt="Sam Stehno"
            className="h-8 w-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.14)]"
            height="64"
            src={SAM_PORTRAIT}
            width="64"
          />
          <p className="text-[13px] leading-[14px] tracking-wide text-gray-900">
            Production engineer &amp; real estate investor
          </p>
        </div>
        <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
          Engineering better production.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Investing in durable places.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Building for the long term.
        </h1>
        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
          <ArrowButton href="#projects">Explore my work</ArrowButton>
          <a
            className={`inline-flex items-center gap-2.5 rounded-[4px] bg-white px-3 py-2 text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:gap-3 sm:px-4 ${transitionCurve}`}
            href="https://www.linkedin.com/in/sam-stehno/"
            rel="noreferrer"
            target="_blank"
          >
            <PartnerMark />
            <span className="text-[13px] font-medium leading-[14px]">
              View LinkedIn
            </span>
            <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] leading-[11px] text-white sm:px-2">
              TX
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionBadge({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">
        {number}
      </span>
      <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium leading-[13px] text-gray-900 sm:px-4 sm:py-1.5">
        {label}
      </span>
    </div>
  )
}

function AboutCopy({ desktop = false }: { desktop?: boolean }) {
  return (
    <div className={desktop ? 'flex flex-col items-start' : ''}>
      <p
        className={
          desktop
            ? 'whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]'
            : 'text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]'
        }
      >
        {desktop ? (
          <>
            Through research, field data and iteration<br />
            I build clean, scalable solutions that improve<br />
            production decisions and long-term asset value.
          </>
        ) : (
          'Through research, field data and iteration I build clean, scalable solutions that improve production decisions and long-term asset value.'
        )}
      </p>
      <ArrowButton className="mt-7 sm:mt-8" href={EMAIL_HREF}>
        Email Sam
      </ArrowButton>
    </div>
  )
}

function About() {
  return (
    <section
      className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32"
      id="studio"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionBadge label="About Sam" number="1" />
        <h2 className="mb-12 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:mb-28 lg:px-12">
          Systems thinking, from the wellhead<br className="hidden sm:block" />
          to the assets that shape communities.
        </h2>

        <div className="px-5 sm:px-8 lg:hidden">
          <AboutCopy />
          <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:gap-5">
            <img
              alt="Production field infrastructure in warm evening light"
              className="aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl"
              loading="lazy"
              src={ABOUT_PRODUCTION_IMAGE}
            />
            <img
              alt="West Texas production and injection facility viewed as an integrated system"
              className="aspect-[900/600] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl"
              loading="lazy"
              src={ABOUT_FACILITIES_IMAGE}
            />
          </div>
        </div>

        <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-12 lg:grid xl:gap-8">
          <div className="self-end">
            <img
              alt="Production field infrastructure in warm evening light"
              className="aspect-[438/346] w-full rounded-2xl object-cover"
              loading="lazy"
              src={ABOUT_PRODUCTION_IMAGE}
            />
          </div>
          <div className="flex self-start justify-end">
            <AboutCopy desktop />
          </div>
          <div className="self-end">
            <img
              alt="West Texas production and injection facility viewed as an integrated system"
              className="aspect-[3/2] w-full rounded-2xl object-cover"
              loading="lazy"
              src={ABOUT_FACILITIES_IMAGE}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ResumeColumn({
  achievements,
  dates,
  eyebrow,
  organization,
  responsibilities,
  title,
}: {
  achievements: string[]
  dates: string
  eyebrow: string
  organization: string
  responsibilities: string[]
  title: string
}) {
  return (
    <article className="border-t border-white/15 pt-7 sm:pt-8 lg:pt-10">
      <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5824A] sm:mb-10 sm:text-[12px]">
        {eyebrow}
      </p>

      <div className="flex flex-col gap-3 border-b border-white/15 pb-7 sm:pb-8 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
        <div className="max-w-xl">
          <h3 className="text-[clamp(1.55rem,3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h3>
          <p className="mt-3 text-[15px] font-medium text-white/65 sm:text-[16px]">
            {organization}
          </p>
        </div>
        <time className="shrink-0 text-[12px] font-medium uppercase tracking-[0.12em] text-white/45 sm:text-[13px]">
          {dates}
        </time>
      </div>

      <ul className="space-y-4 py-7 sm:py-8" aria-label={`${eyebrow} details`}>
        {responsibilities.map((responsibility) => (
          <li
            className="grid grid-cols-[8px_1fr] gap-4 text-[14px] leading-[1.65] text-white/65 sm:text-[15px]"
            key={responsibility}
          >
            <span
              aria-hidden="true"
              className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-[#F26522]"
            />
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/15 pt-7 sm:pt-8">
        <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.13em] text-white/45">
          Key achievements
        </p>
        <ul className="space-y-4" aria-label={`${eyebrow} key achievements`}>
          {achievements.map((achievement) => (
            <li
              className="flex gap-3 text-[14px] font-medium leading-[1.55] text-white/90 sm:text-[15px]"
              key={achievement}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-white">
                <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Experience() {
  return (
    <section
      className="overflow-hidden bg-gray-900 py-16 text-white sm:py-20 lg:py-28"
      id="experience"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold leading-[12px] text-gray-900 sm:h-7 sm:w-7">
            2
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[12px] font-medium leading-[13px] text-white/80 sm:px-4 sm:py-1.5">
            Experience &amp; education
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="mb-12 max-w-5xl text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] sm:mb-16 lg:mb-20">
            Built in the field. Grounded in the fundamentals.
          </h2>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <ResumeColumn eyebrow="Experience" {...EXPERIENCE_DETAILS} />
            <ResumeColumn eyebrow="Education" {...EDUCATION_DETAILS} />
          </div>
        </div>
      </div>
    </section>
  )
}

function LinkGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ProductionCard() {
  return (
    <article>
      <a
        aria-label="Learn more about Sam's production engineering work"
        className="group relative block aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]"
        href={EMAIL_HREF}
      >
        <img
          alt="Production engineer reviewing field performance data beside operating equipment"
          className="h-full w-full object-cover"
          loading="lazy"
          src={PRODUCTION_SYSTEMS_IMAGE}
        />
        <span className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-end overflow-hidden rounded-full bg-white px-[11px] text-gray-900 transition-all duration-300 ease-in-out group-hover:w-[148px]">
          <span className="mr-auto whitespace-nowrap pl-1 text-[13px] font-medium opacity-0 transition-opacity duration-200 delay-0 group-hover:opacity-100 group-hover:delay-100">
            Learn more
          </span>
          <span className="shrink-0 -rotate-45 transition-transform duration-300 ease-in-out group-hover:rotate-0">
            <LinkGlyph />
          </span>
        </span>
      </a>
      <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
        Clean, scalable production workflows for well surveillance,
        optimization, and safer field decisions
      </p>
      <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
        Production systems
      </h3>
    </article>
  )
}

function RealEstateCard() {
  return (
    <article>
      <a
        aria-label="Learn more about Sam's real estate investing"
        className="group relative block aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#6b6b6b]"
        href={EMAIL_HREF}
      >
        <img
          alt="Real estate plans and performance data reviewed at a Texas multifamily property"
          className="h-full w-full object-cover"
          loading="lazy"
          src={REAL_ESTATE_PROJECT_IMAGE}
        />
        <span className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-end overflow-hidden rounded-full bg-gray-900 px-[11px] text-white transition-all duration-300 ease-in-out group-hover:w-[168px]">
          <span className="mr-auto whitespace-nowrap pl-1 text-[13px] font-medium opacity-0 transition-opacity duration-200 delay-0 group-hover:opacity-100 group-hover:delay-100">
            Learn more
          </span>
          <ArrowRight
            aria-hidden="true"
            className="h-[14px] w-[14px] shrink-0 -rotate-45 transition-transform duration-300 ease-in-out group-hover:rotate-0"
          />
        </span>
      </a>
      <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
        Disciplined underwriting and systems thinking applied to durable,
        long-horizon real estate assets
      </p>
      <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
        Real estate investing
      </h3>
    </article>
  )
}

function CaseStudies() {
  return (
    <section
      className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
      id="projects"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="[&>div>span:last-child]:border-gray-300">
          <SectionBadge label="Selected work" number="3" />
        </div>
        <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12">
          Engineering rigor. Investment discipline.
        </h2>
        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
          <ProductionCard />
          <RealEstateCard />
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      className="overflow-hidden bg-gray-900 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-28"
      id="connect"
    >
      <div className="mx-auto max-w-[1344px]">
        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold leading-none text-gray-900">
            4
          </span>
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-[12px] font-medium leading-[13px] text-white/80">
            Connect
          </span>
        </div>

        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.25rem,6vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Let&rsquo;s build something that lasts.
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-white/60 sm:text-[15px] lg:pb-2">
            Have a production challenge, investment idea, or worthwhile
            conversation in mind? Send Sam a note.
          </p>
        </div>

        <a
          aria-label="Open a new email to reach out to Sam"
          className="contact-cta group relative isolate flex min-h-[132px] w-full items-center justify-between overflow-hidden rounded-[2rem] bg-[#F26522] p-5 text-white shadow-[0_18px_60px_rgba(242,101,34,0.18)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(242,101,34,0.3)] sm:min-h-[176px] sm:rounded-[2.75rem] sm:p-8 lg:min-h-[208px] lg:p-10"
          href={CONTACT_HREF}
        >
          <span
            aria-hidden="true"
            className="contact-cta__glow absolute inset-y-0 -left-1/3 -z-10 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="flex items-center gap-3 text-[clamp(1.8rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] sm:gap-5">
            <Mail
              aria-hidden="true"
              className="h-7 w-7 shrink-0 stroke-[1.6] sm:h-10 sm:w-10 lg:h-12 lg:w-12"
            />
            <LargeTextRoll>Contact Sam</LargeTextRoll>
          </span>
          <span className="contact-cta__arrow flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#F26522] shadow-[0_8px_30px_rgba(115,40,5,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg] group-hover:scale-110 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
            <ArrowRight
              aria-hidden="true"
              className="h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              strokeWidth={1.6}
            />
          </span>
        </a>

        <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/40 sm:mt-6 sm:text-[12px]">
          <span>Based in Texas</span>
          <span>Opens your email app</span>
        </div>
      </div>
    </section>
  )
}

function App() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    document.getElementById(targetId)?.scrollIntoView()
  }, [])

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <CaseStudies />
      <Contact />
    </main>
  )
}

export default App
