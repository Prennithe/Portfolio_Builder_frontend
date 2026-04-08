import { motion } from 'framer-motion'

export default function DarkProTemplate({ portfolio }) {
  const stats = [
    { label: 'Projects', value: portfolio.projects?.length || 0 },
    { label: 'Experience', value: portfolio.experiences?.length || 0 },
    { label: 'Certificates', value: portfolio.certificates?.length || 0 },
  ]

  const description = portfolio.description || ''

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans">
      <header className="sticky top-0 z-30 border-b border-gray-900 bg-[#0b0b0b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <span className="text-lg font-black uppercase tracking-[0.35em] text-orange-500">LOGO</span>
            <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
              <a href="#home" className="transition hover:text-white">Home</a>
              <a href="#services" className="transition hover:text-white">Services</a>
              <a href="#about" className="transition hover:text-white">About me</a>
              <a href="#portfolio" className="transition hover:text-white">Portfolio</a>
              <a href="#contact" className="transition hover:text-white">Contact me</a>
            </nav>
          </div>
          <div>
            <a
              href={portfolio.email ? `mailto:${portfolio.email}` : '#contact'}
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 xl:grid-cols-[0.8fr_0.9fr] xl:items-center">
          <section id="home" className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Hi I am</p>
              <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">{portfolio.username || 'Your Name'}</h1>
              {description && <p className="max-w-2xl text-2xl font-semibold text-slate-300">{description}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`} className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400">
                  Hire Me
                </a>
              )}
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`} className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-orange-500 hover:text-white">
                  Download CV
                </a>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-gray-800 bg-gray-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                  <p className="mt-4 text-3xl font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] border border-gray-900 bg-gradient-to-br from-[#111111] via-[#111111] to-[#1d1d1d] p-8 shadow-2xl shadow-black/40">
            <div className="pointer-events-none absolute -right-10 top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="pointer-events-none absolute left-10 top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
            <div className="relative z-10 space-y-8">
              <div className="rounded-3xl border border-gray-800 bg-[#111111]/90 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
                <h2 className="mt-3 text-3xl font-bold text-white">{portfolio.username || 'Your Name'}</h2>
                {portfolio.email && <p className="mt-2 text-sm text-slate-400">{portfolio.email}</p>}
              </div>
              {portfolio.projects?.length > 0 && (
                <div className="rounded-3xl border border-gray-800 bg-[#111111]/90 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Featured Project</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{portfolio.projects[0].title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{portfolio.projects[0].description}</p>
                </div>
              )}
              {portfolio.skills?.length > 0 && (
                <div className="rounded-3xl border border-gray-800 bg-[#111111]/90 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top Skills</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {portfolio.skills.slice(0, 4).map((skill) => (
                      <span key={skill.id} className="rounded-full border border-gray-700 px-4 py-2 text-sm text-slate-300">
                        {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <section id="projects" className="mt-16 space-y-10">
          {portfolio.projects?.length > 0 && (
            <div id="projects-list">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Portfolio</p>
              <h2 className="mt-3 text-4xl font-bold text-white">Latest work</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {portfolio.projects.map((project) => (
                  <article key={project.id} className="rounded-[1.5rem] border border-gray-900 bg-[#111111]/90 p-6 transition hover:border-orange-500">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Project</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {portfolio.experiences?.length > 0 && (
            <div id="experience">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Experience</p>
              <h2 className="mt-3 text-4xl font-bold text-white">Professional background</h2>
              <div className="mt-8 space-y-4">
                {portfolio.experiences.map((experience) => (
                  <div key={experience.id} className="rounded-[1.5rem] border border-gray-900 bg-[#111111]/90 p-6">
                    <h3 className="font-semibold text-white">{experience.role}</h3>
                    <p className="mt-2 text-sm text-slate-400">{experience.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{experience.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portfolio.skills?.length > 0 && (
            <div id="skills">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Skills</p>
              <h2 className="mt-3 text-4xl font-bold text-white">Technical skills</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {portfolio.skills.map((skill) => (
                  <span key={skill.id} className="rounded-full border border-gray-700 px-4 py-2 text-sm text-slate-300">
                    {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          {portfolio.certificates?.length > 0 && (
            <div id="certificates">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Certificates</p>
              <h2 className="mt-3 text-4xl font-bold text-white">Credentials</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {portfolio.certificates.map((certificate) => (
                  <div key={certificate.id} className="rounded-[1.5rem] border border-gray-900 bg-[#111111]/90 p-6">
                    <h3 className="font-semibold text-white">{certificate.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>
                    {certificate.fileUrl && (
                      <a href={certificate.fileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-gray-700 px-4 py-2 text-sm text-slate-200 transition hover:border-orange-500">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {portfolio.internships?.length > 0 && (
            <div id="internships">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Internships</p>
              <h2 className="mt-3 text-4xl font-bold text-white">Internship experience</h2>
              <div className="mt-8 space-y-4">
                {portfolio.internships.map((internship) => (
                  <div key={internship.id} className="rounded-[1.5rem] border border-gray-900 bg-[#111111]/90 p-6">
                    <h3 className="font-semibold text-white">{internship.role}</h3>
                    <p className="mt-2 text-sm text-slate-400">{internship.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{internship.description}</p>
                    {internship.certificateUrl && (
                      <a href={internship.certificateUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-gray-700 px-4 py-2 text-sm text-slate-200 transition hover:border-orange-500">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
