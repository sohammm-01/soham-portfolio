import { NeuralNoise } from '@/components/ui/neural-noise'
import { Nav } from '@/components/Nav'
import { Intro } from '@/components/Intro'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { ProjectsCarousel } from '@/sections/ProjectsCarousel'
import { Education } from '@/sections/Education'
import { Contact } from '@/sections/Contact'
import { useSmoothScroll, scrollToId } from '@/hooks/useSmoothScroll'
import { useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  useSmoothScroll()
  const [introDone, setIntroDone] = useState(false)
  const [landingActive, setLandingActive] = useState(true)

  // Lock scroll while landing is active (covers intro → landing hero).
  // Unlock once the user picks a destination from the bottom nav.
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (landingActive) {
      lenis?.stop?.()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start?.()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [landingActive])

  const handleNavClick = useCallback((sectionId: string) => {
    setLandingActive(false)
    // wait one tick for Lenis to resume + layout to settle, then scroll
    window.setTimeout(() => scrollToId(sectionId), 60)
  }, [])

  // scroll-driven, very subtle backdrop blur over the WebGL canvas
  const { scrollY } = useScroll()
  const blurPx = useTransform(scrollY, [0, 600], [0, 3])
  const backdropFilter = useTransform(blurPx, (v) => `blur(${v}px)`)

  return (
    <>
      {/* fixed global shader background */}
      <NeuralNoise color={[0.9, 0.2, 0.4]} opacity={0.95} speed={0.001} />

      {/* scroll-driven blur veil */}
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ backdropFilter, WebkitBackdropFilter: backdropFilter }}
      />

      {/* edge vignette */}
      <div
        aria-hidden
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <Intro name="Soham Goud" onComplete={() => setIntroDone(true)} />
      <Nav visible={!landingActive} />

      <main className="relative z-10">
        <Hero
          introDone={introDone}
          landingActive={landingActive}
          onNavClick={handleNavClick}
        />
        <About />
        <ProjectsCarousel />
        <Education />
        <Contact />
      </main>
    </>
  )
}

export default App
