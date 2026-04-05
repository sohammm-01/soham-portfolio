import { scrollToId } from '@/hooks/useSmoothScroll'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'about', id: 'about' },
  { label: 'work', id: 'projects' },
  { label: 'contact', id: 'contact' },
]

interface NavProps {
  visible: boolean
}

export function Nav({ visible }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'backdrop-blur-md bg-black/20' : ''
      }`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <nav className="container-pad flex items-center justify-between py-5 text-sm">
        <button
          onClick={() => scrollToId('hero')}
          className="font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          Soham Goud
        </button>

        <div className="hidden md:flex items-center gap-10 text-muted">
          <span className="text-[0.7rem] tracking-[0.2em]">
            <span className="text-paper">IN</span> . MNPL
          </span>
        </div>

        <div className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="link-underline text-muted hover:text-paper transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <span className="hidden md:inline text-muted">more +</span>
        </div>
      </nav>
    </motion.header>
  )
}
