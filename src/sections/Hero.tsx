import { profile } from '@/data/content'
import { motion } from 'framer-motion'
import { ShaderAnimation } from '@/components/ui/shader-animation'

const LANDING_NAV = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'work' },
  { id: 'contact', label: 'contact' },
  { id: 'education', label: 'more +' },
]

interface HeroProps {
  introDone: boolean
  landingActive: boolean
  onNavClick: (sectionId: string) => void
}

export function Hero({ introDone, landingActive, onNavClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* shader background — scoped to this section */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation className="absolute inset-0 w-full h-full" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 90%, #000 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* center content */}
      <div className="relative z-10 container-pad text-center max-w-5xl -mt-16 md:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-6">{profile.heroSubtext}</p>
        </motion.div>

        <motion.h1
          className="text-display-md md:text-display-lg font-medium tracking-tight text-balance"
          initial={{ opacity: 0, y: 24 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          I Build Things That <span className="text-muted">Can Actually</span> Ship
        </motion.h1>

        <motion.p
          className="mt-10 max-w-2xl mx-auto text-muted text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.heroBody}
        </motion.p>
      </div>

      {/* landing bottom nav — fades out once user enters the site */}
      <motion.nav
        aria-label="Landing navigation"
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10 px-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: introDone && landingActive ? 1 : 0,
          y: introDone && landingActive ? 0 : 12,
        }}
        transition={{
          duration: 0.6,
          delay: landingActive ? 0.5 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ pointerEvents: landingActive ? 'auto' : 'none' }}
      >
        <div className="flex items-end gap-5 sm:gap-8 md:gap-14">
          {LANDING_NAV.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="group text-left"
              aria-label={`Go to ${item.label}`}
            >
              {/* progress line — fills on hover */}
              <div className="h-px w-16 sm:w-20 md:w-28 bg-white/15 mb-3 overflow-hidden relative">
                <span className="absolute inset-y-0 left-0 w-0 bg-paper group-hover:w-full transition-[width] duration-700 ease-out-expo" />
              </div>

              {/* index + title */}
              <div className="flex items-baseline gap-2">
                <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] font-mono text-muted group-hover:text-paper transition-colors duration-500">
                  0{i + 1}
                </span>
                <span className="text-sm md:text-base font-medium tracking-tight text-paper/70 group-hover:text-paper transition-colors duration-500">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* subtle hint below */}
        <p className="mt-6 text-center text-[0.6rem] tracking-[0.25em] uppercase text-muted/60">
          Pick a destination
        </p>
      </motion.nav>

      {/* corner metadata — persist through landing + after */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-10 lg:left-16 text-[0.7rem] tracking-[0.2em] text-muted whitespace-pre-line z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {profile.availability}
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 lg:right-16 text-[0.7rem] tracking-[0.2em] text-muted text-right z-10 space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <div>linkedin</div>
        <div>email</div>
      </motion.div>
    </section>
  )
}
