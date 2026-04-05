import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { skills } from '@/data/content'

const AUTO_ADVANCE = 6000 // ms

export function SkillsCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)
  const total = skills.length

  const goTo = useCallback(
    (next: number, dir: 1 | -1 = 1) => {
      setDirection(dir)
      setIndex(((next % total) + total) % total)
    },
    [total],
  )
  const next = useCallback(() => goTo(index + 1, 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo])

  // auto-advance
  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => next(), AUTO_ADVANCE)
    return () => window.clearTimeout(id)
  }, [index, paused, next])

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const group = skills[index]

  // slide variants — horizontal slide + fade
  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir * -60, opacity: 0 }),
  }

  return (
    <section
      id="skills"
      className="relative container-pad py-32 md:py-48"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div>
            <p className="eyebrow mb-3">MY MAIN SKILLS</p>
            <h2 className="text-display-md font-medium tracking-tight">toolkit</h2>
          </div>
          <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted flex items-baseline gap-1">
            <motion.span
              key={`num-${index}`}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-paper text-2xl md:text-3xl font-medium"
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
            <span>/ {String(total).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Card viewport */}
        <div className="relative">
          <div
            className="relative min-h-[420px] md:min-h-[480px] rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between"
              >
                {/* category eyebrow */}
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-muted mb-6">
                    0{index + 1} — category
                  </p>
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] text-balance">
                    {group.group}
                  </h3>
                </div>

                {/* skills list */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 md:gap-y-4 mt-10">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-baseline gap-3 border-b border-white/10 pb-3"
                    >
                      <span className="text-[0.65rem] tracking-[0.15em] text-muted font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg md:text-xl font-medium tracking-tight">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="mt-8 flex items-center justify-between">
            {/* dots */}
            <div className="flex items-center gap-3">
              {skills.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className="group relative h-2 flex items-center"
                  aria-label={`Go to skill ${i + 1}`}
                >
                  <span
                    className={`block h-px transition-all duration-500 ${
                      i === index ? 'w-12 bg-paper' : 'w-6 bg-white/25 group-hover:bg-white/60'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="size-11 md:size-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/5 hover:border-white/40 transition-all"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                className="size-11 md:size-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/5 hover:border-white/40 transition-all"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
