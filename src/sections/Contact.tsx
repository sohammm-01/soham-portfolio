import { Reveal } from '@/components/Reveal'
import { contact } from '@/data/content'
import { ArrowUpRight } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="relative container-pad py-32 md:py-48 border-t border-subtle">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-10 md:mb-14">GET IN TOUCH</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display-md md:text-display-lg font-display font-semibold tracking-tight leading-[1.0] text-balance mb-16">
            Start a project?{' '}
            <a
              href={`mailto:${contact.email}`}
              className="text-paper link-underline hover:opacity-80 transition-opacity"
            >
              Let's talk →
            </a>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 border-t border-subtle pt-10">
          <Reveal className="md:col-span-6" delay={0.15}>
            <p className="eyebrow mb-3">EMAIL</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-xl md:text-2xl font-medium tracking-tight link-underline hover:opacity-80"
            >
              {contact.email}
            </a>
          </Reveal>

          <div className="md:col-span-6 md:pl-8">
            <Reveal delay={0.2}>
              <p className="eyebrow mb-3">ELSEWHERE</p>
              <ul className="space-y-3">
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-xl md:text-2xl font-medium tracking-tight hover:opacity-80 transition-opacity"
                    >
                      {s.label}
                      <ArrowUpRight
                        size={20}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3}>
          <footer className="mt-24 md:mt-32 pt-8 border-t border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs tracking-[0.15em] uppercase text-muted">
            <span>© {new Date().getFullYear()} Soham · Manipal, India</span>
            <span>Built with React + Vite · ✦</span>
          </footer>
        </Reveal>
      </div>
    </section>
  )
}
