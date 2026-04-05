import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface GradientBlobProps {
  className?: string
  size?: number // in vw
  parallax?: boolean
}

/**
 * Signature gradient orb: soft radial mix of magenta / violet / blue / teal
 * on a black canvas. Slowly drifts and scales. Used as a hero motif and
 * inline accent behind section headings.
 */
export function GradientBlob({ className = '', size = 70, parallax = true }: GradientBlobProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{
          y: parallax ? y : 0,
          width: `${size}vw`,
          height: `${size}vw`,
          maxWidth: '1100px',
          maxHeight: '1100px',
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-blob-drift"
      >
        {/* layered radial gradients to build depth */}
        <div
          className="absolute inset-0 rounded-full opacity-90"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.55) 0%, rgba(168, 85, 247, 0.45) 22%, rgba(59, 130, 246, 0.40) 44%, rgba(14, 165, 233, 0.25) 62%, rgba(0,0,0,0) 75%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-80 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 35% 40%, rgba(244, 114, 182, 0.6) 0%, rgba(139, 92, 246, 0.35) 30%, rgba(0,0,0,0) 60%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-70 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 65% 70%, rgba(56, 189, 248, 0.5) 0%, rgba(59, 130, 246, 0.3) 28%, rgba(0,0,0,0) 58%)',
            filter: 'blur(50px)',
          }}
        />
        {/* grain / noise overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}
        />
      </motion.div>
    </div>
  )
}
