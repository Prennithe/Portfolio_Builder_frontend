export default function BoldTemplate({ portfolio }) {
  const initials = portfolio.username
    ? portfolio.username
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'PB'

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white font-sans">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent opacity-95" />
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute left-0 top-40 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <nav className="flex items-center justify-between text-sm text-slate-300">
          <div className="font-semibold text-white">Portfolio</div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#experience" className="transition hover:text-white">Experience</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>
        </nav>

        <header className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="max-w-xl space-y-4">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">{portfolio.username || 'Your Name'}</h1>
              {portfolio.email && (
                <p className="text-lg leading-8 text-slate-300 sm:text-xl">Email: {portfolio.email}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={portfolio.email ? `mailto:${portfolio.email}` : '#contact'}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Contact
              </a>
              <a
                href={portfolio.projects?.length ? '#projects' : '#contact'}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-7 py-3 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                View work
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-full border border-slate-800 bg-slate-900/70 shadow-[0_35px_100px_-35px_rgba(15,23,42,0.9)]">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-transparent opacity-80" />
            <div className="flex h-full w-full items-center justify-center text-6xl font-black text-slate-200">{initials}</div>
            <div className="absolute bottom-6 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-2xl" />
          </div>
        </header>

        <main className="space-y-16 py-16">
          {portfolio.projects?.length > 0 && (
            <section id="projects">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Projects</p>
                  <h2 className="mt-4 text-3xl font-bold text-white">Recent project highlights</h2>
                </div>
                <span className="inline-flex rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {portfolio.projects.length} projects
                </span>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                {portfolio.projects.map((project) => (
                  <article key={project.id} className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 transition hover:border-slate-700 hover:bg-slate-900">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                      <span className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Project</span>
                    </div>
                    <p className="text-slate-300 leading-7">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-500 hover:text-white">
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-500 hover:text-white">
                          Live site
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {portfolio.skills?.length > 0 && (
            <section id="skills">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Skills</p>
                <h2 className="mt-4 text-3xl font-bold text-white">Core skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {portfolio.skills.map((skill) => (
                  <span key={skill.id} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200">
                    {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {portfolio.experiences?.length > 0 && (
            <section id="experience">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Experience</p>
                <h2 className="mt-4 text-3xl font-bold text-white">Professional experience</h2>
              </div>
              <div className="space-y-6">
                {portfolio.experiences.map((experience) => (
                  <div key={experience.id} className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
                    <h3 className="font-semibold text-white">{experience.role}</h3>
                    <p className="mt-2 text-sm text-slate-400">{experience.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{experience.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.certificates?.length > 0 && (
            <section id="certificates">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Certificates</p>
                <h2 className="mt-4 text-3xl font-bold text-white">Credentials</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {portfolio.certificates.map((certificate) => (
                  <div key={certificate.id} className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
                    <h3 className="font-semibold text-white">{certificate.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>
                    {certificate.fileUrl && (
                      <a href={certificate.fileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.internships?.length > 0 && (
            <section id="internships">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Internships</p>
                <h2 className="mt-4 text-3xl font-bold text-white">Internship experience</h2>
              </div>
              <div className="space-y-6">
                {portfolio.internships.map((internship) => (
                  <div key={internship.id} className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
                    <h3 className="font-semibold text-white">{internship.role}</h3>
                    <p className="mt-2 text-sm text-slate-400">{internship.company}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{internship.description}</p>
                    {internship.certificateUrl && (
                      <a href={internship.certificateUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
