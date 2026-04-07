export default function ModernTemplate({ portfolio }) {
  const stats = [
    { label: 'Projects', value: portfolio.projects?.length || 0 },
    { label: 'Skills', value: portfolio.skills?.length || 0 },
    { label: 'Experience', value: portfolio.experiences?.length || 0 },
  ]

  const featuredProject = portfolio.projects?.[0]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 text-xl font-bold">
              {portfolio.username?.[0] || 'P'}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">{portfolio.username || 'Portfolio'}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-400 lg:flex">
            <a href="#projects" className="transition hover:text-slate-100">Projects</a>
            <a href="#skills" className="transition hover:text-slate-100">Skills</a>
            <a href="#experience" className="transition hover:text-slate-100">Experience</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <input
                type="search"
                placeholder="Search"
                className="h-11 w-52 rounded-2xl border border-slate-700 bg-slate-800 px-4 pr-10 text-sm text-slate-100 outline-none focus:border-slate-600"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z" />
                </svg>
              </span>
            </div>
            <button className="flex h-11 items-center justify-center rounded-2xl bg-slate-100 px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              Contact
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute left-0 top-12 h-32 w-32 rounded-full bg-slate-700/70 blur-3xl" />
        <div className="absolute right-0 top-24 h-36 w-36 rounded-full bg-slate-700/80 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div className="space-y-8">
            <div className="max-w-xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Design Portfolio</p>
              <h1 className="text-5xl font-black tracking-tight text-slate-50 sm:text-6xl">
                {portfolio.username || 'Your Portfolio'}
              </h1>
              {portfolio.email && <p className="max-w-xl text-base leading-8 text-slate-400">Contact: {portfolio.email}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-800 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0">
            <div className="rounded-[2rem] border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-slate-900/10">
              <div className="mb-4 flex items-center justify-between text-slate-100">
                <p className="text-xs uppercase tracking-[0.3em]">Featured</p>
                <div className="rounded-full border border-slate-700 px-3 py-1 text-xs">Live</div>
              </div>
              {featuredProject ? (
                <div className="space-y-4 rounded-[1.5rem] bg-slate-900 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Project</p>
                  <h2 className="text-2xl font-semibold text-white">{featuredProject.title}</h2>
                  <p className="text-sm leading-6 text-slate-300">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                    {featuredProject.githubLink && (
                      <a href={featuredProject.githubLink} target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 px-3 py-2 transition hover:bg-slate-800">
                        GitHub
                      </a>
                    )}
                    {featuredProject.liveLink && (
                      <a href={featuredProject.liveLink} target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 px-3 py-2 transition hover:bg-slate-800">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.5rem] bg-slate-900 p-5 text-slate-300">
                  <p>No featured project yet.</p>
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute -bottom-6 left-10 h-20 w-20 rounded-full bg-slate-800/70 blur-3xl" />
          </div>
        </div>
      </section>

      {portfolio.projects?.length > 0 && (
        <section id="projects" className="bg-slate-800 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projects</p>
              <h2 className="mt-4 text-4xl font-black text-slate-50">Project Showcase</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {portfolio.projects.slice(0, 4).map((project) => (
                <div key={project.id} className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Project</p>
                    <h3 className="mt-3 text-lg font-semibold text-slate-50">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {portfolio.skills?.length > 0 && (
        <section id="skills" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Skills</p>
              <h2 className="mt-4 text-4xl font-black text-slate-50">Core skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill) => (
                <span key={skill.id} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100">
                  {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
