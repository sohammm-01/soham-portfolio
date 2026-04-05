import { Reveal } from '@/components/Reveal'
import { skills } from '@/data/content'

export function Skills() {
  return (
    <section id="skills" className="relative container-pad py-32 md:py-48">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-16 md:mb-24">MY MAIN SKILLS</p>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {skills.map((group, gi) => (
            <div
              key={group.group}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start border-t border-subtle pt-10"
            >
              <Reveal className="md:col-span-3" delay={0.05}>
                <p className="text-xs tracking-[0.18em] uppercase text-muted">
                  0{gi + 1} — {group.group}
                </p>
              </Reveal>

              <div className="md:col-span-9 space-y-2 md:space-y-3">
                {group.items.map((item, i) => (
                  <Reveal key={item} delay={0.1 + i * 0.04}>
                    <h3 className="text-display-md font-medium tracking-tight leading-[1.05] text-paper/95">
                      {item}
                    </h3>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
