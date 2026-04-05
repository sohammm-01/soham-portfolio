import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { TextRevealByWord } from '@/components/ui/text-reveal'
import { about } from '@/data/content'

export function About() {
  return (
    <section id="about" className="relative">
      <SectionTitle label="about" />

      <div className="container-pad">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">{about.eyebrow}</p>
          </Reveal>
        </div>
      </div>

      {/* word-by-word scroll reveal — 200vh scroll runway */}
      <TextRevealByWord text={about.body} />

      <div className="container-pad pb-24 md:pb-40">
        <div className="max-w-5xl mx-auto flex justify-end">
          <Reveal delay={0.1}>
            <p className="text-xs text-muted max-w-[14rem] leading-relaxed">
              {about.footnote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
