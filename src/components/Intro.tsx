import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface IntroProps {
  name?: string
  onComplete?: () => void
}

/**
 * Simple fade intro:
 *   mount → name fades in (0.7s)
 *   hold 1.2s
 *   fade out (0.8s)
 *   onComplete fires
 */
export function Intro({ name = 'Soham Goud', onComplete }: IntroProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // hold duration before fade-out starts
    const holdMs = 1400
    // fade-out duration matches the exit transition below
    const fadeMs = 800

    const t1 = window.setTimeout(() => setVisible(false), holdMs)
    const t2 = window.setTimeout(() => onComplete?.(), holdMs + fadeMs)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-semibold tracking-tight text-paper text-center leading-none"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 11rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {name}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
