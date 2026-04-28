import { Reveal } from '@/components/Reveal'
import { projects, type Project, type ProjectStatus } from '@/data/content'
import { ArrowUpRight } from 'lucide-react'

const statusConfig: Record<ProjectStatus, { dot: string; label: string }> = {
  live:     { dot: 'bg-emerald-400', label: 'text-emerald-400' },
  progress: { dot: 'bg-sky-400',     label: 'text-sky-400'     },
  shipped:  { dot: 'bg-white/60',    label: 'text-white/60'    },
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const s = statusConfig[project.status]

  return (
    <div className="border-t border-subtle py-16 md:py-20">
      {/* index + status */}
      <Reveal>
        <div className="flex items-center justify-between mb-7">
          <span className="font-mono text-xs tracking-[0.2em] text-muted">
            0{index + 1}
          </span>
          <span className={`inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase ${s.label}`}>
            <span className={`size-1.5 rounded-full ${s.dot}`} />
            {project.statusLabel}
          </span>
        </div>
      </Reveal>

      {/* title */}
      <Reveal delay={0.05}>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-normal tracking-tight leading-[1.0] mb-4 text-balance">
          {project.title}
        </h3>
      </Reveal>

      {/* highlight */}
      <Reveal delay={0.1}>
        <p className="text-xs tracking-[0.14em] uppercase text-muted mb-12">
          {project.highlight}
        </p>
      </Reveal>

      {/* description + stack + links */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <Reveal className="md:col-span-7" delay={0.12}>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            {project.description}
          </p>
        </Reveal>

        <Reveal className="md:col-span-5 md:pl-6" delay={0.18}>
          <div className="flex flex-wrap gap-2 mb-7">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[0.68rem] tracking-[0.08em] uppercase border border-white/12 text-paper/50 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm link-underline hover:text-paper text-paper/80 transition-colors"
              >
                {l.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export function ProjectsCarousel() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-pad max-w-7xl mx-auto">

        <Reveal>
          <p className="eyebrow mb-3">SELECTED WORK</p>
          <h2 className="text-display-md font-display font-normal tracking-tight mb-20 md:mb-28">projects</h2>
        </Reveal>

        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="border-t border-subtle" />
      </div>
    </section>
  )
}
