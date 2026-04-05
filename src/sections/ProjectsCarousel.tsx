import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type ProjectStatus } from '@/data/content'

const SLIDE_DURATION = 8000 // ms per project
const PROGRESS_TICK = 50

const statusStyles: Record<ProjectStatus, { dot: string; label: string }> = {
  live: { dot: 'bg-emerald-400', label: 'text-emerald-400' },
  progress: { dot: 'bg-sky-400', label: 'text-sky-400' },
  shipped: { dot: 'bg-white/80', label: 'text-white/80' },
}

/**
 * Split a string into character spans, each animated independently.
 * Space characters get a non-breaking span so layout holds.
 */
function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  const chars = Array.from(text)
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 0.04 * i,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  )
}

export function ProjectsCarousel() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(Date.now())

  const total = projects.length

  // auto-advance with progress
  useEffect(() => {
    if (paused) return
    lastTickRef.current = Date.now()
    const tick = () => {
      const now = Date.now()
      const dt = now - lastTickRef.current
      lastTickRef.current = now
      setProgress((p) => {
        const next = p + (dt / SLIDE_DURATION) * 100
        if (next >= 100) {
          setIndex((i) => (i + 1) % total)
          return 0
        }
        return next
      })
      rafRef.current = window.setTimeout(tick, PROGRESS_TICK) as unknown as number
    }
    rafRef.current = window.setTimeout(tick, PROGRESS_TICK) as unknown as number
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current)
    }
  }, [paused, total, index])

  const goTo = useCallback((i: number) => {
    if (i === index) return
    setIndex(i)
    setProgress(0)
  }, [index])

  const current = projects[index]
  const s = statusStyles[current.status]

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-pad w-full max-w-7xl mx-auto">
        {/* header row */}
        <div className="flex items-end justify-between mb-12 md:mb-20">
          <div>
            <p className="eyebrow mb-3">SELECTED WORK</p>
            <h2 className="text-display-md font-medium tracking-tight">projects</h2>
          </div>
          <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted flex items-baseline gap-1">
            <motion.span
              key={`num-${index}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-paper text-2xl md:text-3xl font-medium"
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
            <span>/ {String(total).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT — project content, swapped per index */}
          <div className="lg:col-span-7 min-h-[420px] md:min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* status */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="mb-6"
                >
                  <span
                    className={`inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase ${s.label}`}
                  >
                    <span className={`size-1.5 rounded-full ${s.dot} animate-pulse`} />
                    {current.statusLabel}
                  </span>
                </motion.div>

                {/* title with per-char reveal */}
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-8 text-balance">
                  <SplitChars text={current.title} />
                </h3>

                {/* description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + Array.from(current.title).length * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mb-8"
                >
                  {current.description}
                </motion.p>

                {/* tech + links */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {current.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[0.7rem] tracking-[0.1em] uppercase text-paper/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    {current.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm link-underline hover:text-paper text-paper/90 transition-colors"
                      >
                        {l.label}
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — navigation list w/ progress */}
          <nav
            className="lg:col-span-5 flex flex-col gap-1 lg:gap-2"
            aria-label="Projects navigation"
          >
            {projects.map((p, i) => {
              const isActive = i === index
              const fillWidth = isActive ? progress : i < index ? 100 : 0
              return (
                <button
                  key={p.title}
                  onClick={() => goTo(i)}
                  className={`group text-left py-4 md:py-5 transition-colors duration-500 ${
                    isActive ? 'text-paper' : 'text-paper/40 hover:text-paper/70'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {/* progress line */}
                  <div className="h-px w-full bg-white/10 mb-3 overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-paper"
                      animate={{ width: `${fillWidth}%` }}
                      transition={{
                        duration: isActive ? 0.05 : 0.3,
                        ease: 'linear',
                      }}
                    />
                  </div>
                  {/* title row */}
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs tracking-[0.18em] uppercase font-mono text-muted">
                      0{i + 1}
                    </span>
                    <span className="flex-1 text-sm md:text-base font-medium tracking-tight truncate">
                      {p.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        {/* hint */}
        <p className="mt-12 text-[0.65rem] tracking-[0.25em] text-muted/60 uppercase">
          {paused ? 'Paused — move cursor away to resume' : 'Auto-advancing · Hover to pause · Click to jump'}
        </p>
      </div>
    </section>
  )
}
