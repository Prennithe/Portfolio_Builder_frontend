export default function MinimalTemplate({ portfolio }) {
  const stats = [
    { label: 'Projects', value: portfolio.projects?.length || 0 },
    { label: 'Skills', value: portfolio.skills?.length || 0 },
    { label: 'Experience', value: portfolio.experiences?.length || 0 },
  ]

  const topSkills = portfolio.skills?.slice(0, 3) || []
  const topProject = portfolio.projects?.[0]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white/90 sticky top-0 z-20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Portfolio</p>
            <h1 className="text-3xl font-bold text-slate-950">{portfolio.username || 'Your Name'}</h1>
            {portfolio.email && <p className="mt-2 text-sm text-slate-500">{portfolio.email}</p>}
          </div>
          <div className="hidden gap-6 text-sm text-slate-600 md:flex">
            <a href="#projects" className="transition hover:text-slate-900">Projects</a>
            <a href="#skills" className="transition hover:text-slate-900">Skills</a>
            <a href="#experience" className="transition hover:text-slate-900">Experience</a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-start">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Design Portfolio</p>
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">{portfolio.username || 'Your Name'}</h2>
              {portfolio.email && <p className="max-w-2xl text-lg leading-8 text-slate-600">Reach out at {portfolio.email} to build your next portfolio.</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Overview</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">Portfolio Summary</h3>
            </div>
            {topProject ? (
              <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top Project</p>
                <h4 className="mt-3 text-lg font-semibold text-slate-950">{topProject.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{topProject.description}</p>
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                <p className="text-sm text-slate-600">Add your first project to highlight your work.</p>
              </div>
            )}
            {topSkills.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top Skills</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topSkills.map((skill) => (
                    <span key={skill.id} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                      {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {portfolio.projects?.length > 0 && (
          <section id="projects" className="mt-20">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Projects</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Selected work</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-3 py-1 transition hover:bg-slate-100">
                        GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-3 py-1 transition hover:bg-slate-100">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section id="skills" className="mt-20">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Skills</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Technical strengths</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill) => (
                <span key={skill.id} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                  {skill.name}{skill.level ? ` · ${skill.level}` : ''}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section id="experience" className="mt-20">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Experience</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Professional background</h2>
            </div>
            <div className="space-y-6">
              {portfolio.experiences.map((experience) => (
                <div key={experience.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-950">{experience.role}</h3>
                  <p className="mt-2 text-sm text-slate-600">{experience.company}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Certificates</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Credentials</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {portfolio.certificates.map((certificate) => (
                <div key={certificate.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-950">{certificate.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{certificate.issuer}</p>
                  {certificate.fileUrl && (
                    <a href={certificate.fileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section className="mt-20" id="internships">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Internships</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Internship experience</h2>
            </div>
            <div className="space-y-6">
              {portfolio.internships.map((internship) => (
                <div key={internship.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-950">{internship.role}</h3>
                  <p className="mt-2 text-sm text-slate-600">{internship.company}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{internship.description}</p>
                  {internship.certificateUrl && (
                    <a href={internship.certificateUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
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
  )
}
