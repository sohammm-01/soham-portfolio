import { Reveal } from '@/components/Reveal'
import { education } from '@/data/content'

export function Education() {
  return (
    <section id="education" className="relative container-pad py-24 md:py-40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-12 md:mb-16">EDUCATION</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-subtle pt-10">
          <Reveal className="md:col-span-3" delay={0.05}>
            <p className="text-xs tracking-[0.18em] uppercase text-muted">
              {education.duration}
            </p>
            <p className="text-xs tracking-[0.18em] uppercase text-muted mt-2">
              {education.location}
            </p>
          </Reveal>

          <div className="md:col-span-9">
            <Reveal delay={0.1}>
              <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.15] text-balance">
                {education.institution}
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-3 text-muted text-base md:text-lg">{education.degree}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
