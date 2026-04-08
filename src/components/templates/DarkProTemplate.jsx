import { motion } from 'framer-motion'

export default function DarkProTemplate({ portfolio }) {
  const stats = [
    { label: 'Projects',     value: portfolio.projects?.length     || 0 },
    { label: 'Experience',   value: portfolio.experiences?.length  || 0 },
    { label: 'Certificates', value: portfolio.certificates?.length || 0 },
  ]

  const description = portfolio.description || ''

  const initials = portfolio.username
    ? portfolio.username.slice(0, 2).toUpperCase()
    : 'PB'

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo: initials + username */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-sm font-black text-black shadow-md shadow-orange-500/25">
              {initials}
            </span>
            <span className="hidden sm:block text-sm font-semibold text-slate-200">
              {portfolio.username || 'Portfolio'}
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center gap-7 text-sm text-slate-400 lg:flex">
            <a href="#projects"     className="transition hover:text-white">Projects</a>
            <a href="#experience"   className="transition hover:text-white">Experience</a>
            <a href="#skills"       className="transition hover:text-white">Skills</a>
            <a href="#certificates" className="transition hover:text-white">Certificates</a>
            <a href="#internships"  className="transition hover:text-white">Internships</a>
          </nav>

          {/* CTA */}
          <a
            href={portfolio.email ? `mailto:${portfolio.email}` : '#'}
            className="rounded-full bg-orange-500 hover:bg-orange-400 px-5 py-2 text-sm font-semibold text-black transition shadow-sm shadow-orange-500/20"
          >
            Contact
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">

        {/* ── Hero grid ── */}
        <div className="grid gap-12 xl:grid-cols-[0.8fr_0.9fr] xl:items-center">

          {/* Left: intro */}
          <section id="home" className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Hi, I am</p>
              <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
                {portfolio.username || 'Your Name'}
              </h1>
              {description && (
                <p className="max-w-2xl text-xl font-medium text-slate-300">{description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-6 py-2.5 text-sm font-semibold text-black transition">
                  Contact Me
                </a>
              )}
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-gray-700 hover:border-orange-500 px-6 py-2.5 text-sm text-slate-300 hover:text-white transition">
                  Download CV
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Right: profile card */}
          <section className="relative overflow-hidden rounded-[2rem] border border-gray-800 bg-gray-900/60 p-8 shadow-2xl shadow-black/30">
            <div className="pointer-events-none absolute -right-10 top-16 h-48 w-48 rounded-full bg-orange-500/8 blur-3xl" />
            <div className="pointer-events-none absolute left-10 top-24 h-64 w-64 rounded-full bg-white/3 blur-3xl" />

            <div className="relative z-10 space-y-6">
              {/* Profile */}
              <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{portfolio.username || 'Your Name'}</h2>
                {portfolio.email && (
                  <p className="mt-1 text-sm text-slate-400">{portfolio.email}</p>
                )}
              </div>

              {/* Featured project */}
              {portfolio.projects?.length > 0 && (
                <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Featured Project</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{portfolio.projects[0].title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{portfolio.projects[0].description}</p>
                </div>
              )}

              {/* Top skills */}
              {portfolio.skills?.length > 0 && (
                <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top Skills</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {portfolio.skills.slice(0, 4).map((skill) => (
                      <span key={skill.id}
                        className="rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1.5 text-xs text-slate-300">
                        {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── Sections ── */}
        <div className="mt-20 space-y-16">

          {/* Projects */}
          {portfolio.projects?.length > 0 && (
            <section id="projects">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Projects</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Latest Work</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {portfolio.projects.map((project) => (
                  <article key={project.id}
                    className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 transition hover:border-orange-500/60 hover:bg-gray-900/80">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Project</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer"
                          className="text-xs border border-gray-700 hover:border-orange-500/60 px-3 py-1.5 rounded-full text-slate-300 hover:text-white transition">
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer"
                          className="text-xs bg-orange-500 hover:bg-orange-400 px-3 py-1.5 rounded-full text-black font-medium transition">
                          Live
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {portfolio.experiences?.length > 0 && (
            <section id="experience">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Experience</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Professional Background</h2>
              <div className="mt-8 space-y-4">
                {portfolio.experiences.map((experience) => (
                  <div key={experience.id}
                    className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 hover:border-orange-500/40 transition">
                    <h3 className="font-semibold text-white">{experience.role}</h3>
                    <p className="mt-1 text-sm text-orange-400">{experience.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{experience.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {portfolio.skills?.length > 0 && (
            <section id="skills">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Skills</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Technical Skills</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {portfolio.skills.map((skill) => (
                  <span key={skill.id}
                    className="rounded-full border border-gray-700 bg-gray-900/60 px-4 py-2 text-sm text-slate-300 hover:border-orange-500/50 hover:text-white transition">
                    {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {portfolio.certificates?.length > 0 && (
            <section id="certificates">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Certificates</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Credentials</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {portfolio.certificates.map((certificate) => (
                  <div key={certificate.id}
                    className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 hover:border-orange-500/40 transition">
                    <h3 className="font-semibold text-white">{certificate.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{certificate.issuer}</p>
                    {certificate.fileUrl && (
                      <a href={certificate.fileUrl} target="_blank" rel="noreferrer"
                        className="mt-4 inline-flex rounded-full border border-gray-700 hover:border-orange-500/60 px-4 py-1.5 text-sm text-slate-300 hover:text-white transition">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Internships */}
          {portfolio.internships?.length > 0 && (
            <section id="internships">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Internships</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Internship Experience</h2>
              <div className="mt-8 space-y-4">
                {portfolio.internships.map((internship) => (
                  <div key={internship.id}
                    className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 hover:border-orange-500/40 transition">
                    <h3 className="font-semibold text-white">{internship.role}</h3>
                    <p className="mt-1 text-sm text-orange-400">{internship.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{internship.description}</p>
                    {internship.certificateUrl && (
                      <a href={internship.certificateUrl} target="_blank" rel="noreferrer"
                        className="mt-4 inline-flex rounded-full border border-gray-700 hover:border-orange-500/60 px-4 py-1.5 text-sm text-slate-300 hover:text-white transition">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  )
}
