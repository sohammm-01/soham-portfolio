import { Reveal } from '@/components/Reveal'

interface SectionTitleProps {
  label: string
}

export function SectionTitle({ label }: SectionTitleProps) {
  return (
    <div className="relative py-24 md:py-40 flex items-center justify-center overflow-hidden">
      <Reveal>
        <h2 className="relative z-10 text-display-xl font-medium tracking-tight text-center">
          {label}
        </h2>
      </Reveal>
    </div>
  )
}
