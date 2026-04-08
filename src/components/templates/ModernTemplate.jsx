export default function ModernTemplate({ portfolio }) {
  const stats = [
    { label: 'Projects',   value: portfolio.projects?.length    || 0 },
    { label: 'Skills',     value: portfolio.skills?.length      || 0 },
    { label: 'Experience', value: portfolio.experiences?.length || 0 },
  ]

  const featuredProject = portfolio.projects?.[0]
  const initials = portfolio.username
    ? portfolio.username.slice(0, 2).toUpperCase()
    : 'PB'

  return (
    <div className="min-h-screen bg-slate-800 text-slate-100 font-sans">

      {/* ── Navbar ── */}
      <header className="border-b border-slate-600/60 bg-slate-800/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo: initials */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white text-sm font-bold shadow-md shadow-indigo-500/30">
              {initials}
            </div>
            <p className="text-sm font-semibold text-slate-100">{portfolio.username || 'Portfolio'}</p>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <a href="#projects"     className="transition hover:text-white">Projects</a>
            <a href="#skills"       className="transition hover:text-white">Skills</a>
            <a href="#experience"   className="transition hover:text-white">Experience</a>
            <a href="#certificates" className="transition hover:text-white">Certificates</a>
            <a href="#internships"  className="transition hover:text-white">Internships</a>
          </nav>

          {/* CTA */}
          {portfolio.email && (
            <a
              href={`mailto:${portfolio.email}`}
              className="flex h-10 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 text-sm font-semibold text-white transition shadow-sm shadow-indigo-500/20"
            >
              Contact
            </a>
          )}
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-slate-800">
        <div className="absolute left-0 top-12 h-40 w-40 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute right-0 top-24 h-40 w-40 rounded-full bg-slate-600/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div className="space-y-8">
            <div className="max-w-xl space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Developer Portfolio</p>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
                {portfolio.username || 'Your Portfolio'}
              </h1>
              {portfolio.email && (
                <p className="max-w-xl text-base leading-8 text-slate-300">
                  Get in touch at{' '}
                  <a href={`mailto:${portfolio.email}`} className="text-indigo-400 hover:text-indigo-300 transition">
                    {portfolio.email}
                  </a>
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-700/60 border border-slate-600/50 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured project card */}
          <div className="relative mt-12 lg:mt-0">
            <div className="rounded-[2rem] border border-slate-600/60 bg-slate-700/50 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em]">Featured Project</p>
                <div className="rounded-full border border-slate-500 px-3 py-1 text-xs text-slate-300">Live</div>
              </div>
              {featuredProject ? (
                <div className="space-y-4 rounded-[1.5rem] bg-slate-800/80 p-5 border border-slate-600/40">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project</p>
                  <h2 className="text-2xl font-semibold text-white">{featuredProject.title}</h2>
                  <p className="text-sm leading-6 text-slate-300">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {featuredProject.githubLink && (
                      <a href={featuredProject.githubLink} target="_blank" rel="noreferrer"
                        className="rounded-full border border-slate-500 px-3 py-2 text-slate-200 transition hover:bg-slate-700">
                        GitHub
                      </a>
                    )}
                    {featuredProject.liveLink && (
                      <a href={featuredProject.liveLink} target="_blank" rel="noreferrer"
                        className="rounded-full bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-white transition">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.5rem] bg-slate-800/80 p-5 text-slate-400 border border-slate-600/40">
                  <p>No featured project yet.</p>
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute -bottom-6 left-10 h-20 w-20 rounded-full bg-indigo-600/15 blur-3xl" />
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      {portfolio.projects?.length > 0 && (
        <section id="projects" className="bg-slate-700/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Projects</p>
              <h2 className="mt-3 text-4xl font-black text-white">Project Showcase</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {portfolio.projects.slice(0, 4).map((project) => (
                <div key={project.id}
                  className="overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-800/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/40">
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project</p>
                    <h3 className="mt-3 text-base font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer"
                          className="text-xs border border-slate-500 px-3 py-1 rounded-full text-slate-300 hover:bg-slate-700 transition">
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer"
                          className="text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-full text-white transition">
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Skills ── */}
      {portfolio.skills?.length > 0 && (
        <section id="skills" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Skills</p>
              <h2 className="mt-3 text-4xl font-black text-white">Core Skills</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {portfolio.skills.map((skill) => (
                <span key={skill.id}
                  className="rounded-full border border-slate-600/60 bg-slate-700/50 px-4 py-2 text-sm text-slate-200 hover:border-indigo-500/50 hover:bg-slate-700 transition">
                  {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Experience ── */}
      {portfolio.experiences?.length > 0 && (
        <section id="experience" className="bg-slate-700/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Experience</p>
              <h2 className="mt-3 text-4xl font-black text-white">Professional Background</h2>
            </div>
            <div className="space-y-5">
              {portfolio.experiences.map((experience) => (
                <div key={experience.id}
                  className="rounded-2xl border border-slate-600/50 bg-slate-800/70 p-6 hover:border-indigo-500/40 transition">
                  <h3 className="font-semibold text-white">{experience.role}</h3>
                  <p className="mt-1 text-sm text-indigo-400">{experience.company}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{experience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Certificates ── */}
      {portfolio.certificates?.length > 0 && (
        <section id="certificates" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Certificates</p>
              <h2 className="mt-3 text-4xl font-black text-white">Credentials</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {portfolio.certificates.map((certificate) => (
                <div key={certificate.id}
                  className="rounded-2xl border border-slate-600/50 bg-slate-800/70 p-6 hover:border-indigo-500/40 transition">
                  <h3 className="font-semibold text-white">{certificate.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{certificate.issuer}</p>
                  {certificate.fileUrl && (
                    <a href={certificate.fileUrl} target="_blank" rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-slate-500 px-4 py-1.5 text-sm text-slate-200 transition hover:bg-slate-700">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Internships ── */}
      {portfolio.internships?.length > 0 && (
        <section id="internships" className="bg-slate-700/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Internships</p>
              <h2 className="mt-3 text-4xl font-black text-white">Internship Experience</h2>
            </div>
            <div className="space-y-5">
              {portfolio.internships.map((internship) => (
                <div key={internship.id}
                  className="rounded-2xl border border-slate-600/50 bg-slate-800/70 p-6 hover:border-indigo-500/40 transition">
                  <h3 className="font-semibold text-white">{internship.role}</h3>
                  <p className="mt-1 text-sm text-indigo-400">{internship.company}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{internship.description}</p>
                  {internship.certificateUrl && (
                    <a href={internship.certificateUrl} target="_blank" rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-slate-500 px-4 py-1.5 text-sm text-slate-200 transition hover:bg-slate-700">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
