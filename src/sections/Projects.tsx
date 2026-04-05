import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { projects, type ProjectStatus } from '@/data/content'
import { ArrowUpRight } from 'lucide-react'

const statusStyles: Record<ProjectStatus, { dot: string; label: string }> = {
  live: { dot: 'bg-emerald-400', label: 'text-emerald-400' },
  progress: { dot: 'bg-sky-400', label: 'text-sky-400' },
  shipped: { dot: 'bg-white/80', label: 'text-white/80' },
}

export function Projects() {
  return (
    <section id="projects" className="relative">
      <SectionTitle label="work" blobSize={40} />

      <div className="container-pad pb-24 md:pb-40">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
          {projects.map((p, i) => {
            const s = statusStyles[p.status]
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group relative border-t border-subtle pt-8 md:pt-10 pb-8 md:pb-12 transition-colors duration-500 hover:border-white/30">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                    {/* index + status */}
                    <div className="md:col-span-2 flex md:flex-col gap-4 md:gap-3 items-start">
                      <span className="text-xs tracking-[0.2em] text-muted">
                        0{i + 1}
                      </span>
                      <span className={`inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase ${s.label}`}>
                        <span className={`size-1.5 rounded-full ${s.dot} animate-pulse`} />
                        {p.statusLabel}
                      </span>
                    </div>

                    {/* title + description */}
                    <div className="md:col-span-7">
                      <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-4 md:mb-5 text-balance">
                        {p.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl">
                        {p.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        {p.stack.map((tech) => (
                          <span key={tech} className="text-[0.7rem] tracking-[0.1em] uppercase text-paper/60">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* links */}
                    <div className="md:col-span-3 flex md:flex-col gap-3 md:items-end">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm link-underline hover:text-paper text-paper/80 transition-colors"
                        >
                          {l.label}
                          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
