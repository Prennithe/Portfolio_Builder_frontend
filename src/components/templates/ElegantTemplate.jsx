export default function ElegantTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif">
      <header className="max-w-2xl mx-auto px-8 pt-20 pb-10 text-center border-b border-stone-200">
        <p className="text-stone-400 text-xs uppercase tracking-[0.3em] mb-3">Portfolio</p>
        <h1 className="text-4xl font-bold text-stone-900">{portfolio.username}</h1>
        <p className="text-stone-500 mt-3 italic">{portfolio.email}</p>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-16 space-y-16">
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-center text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">Projects</h2>
            <div className="space-y-8">
              {portfolio.projects.map((p) => (
                <div key={p.id} className="text-center">
                  <h3 className="text-xl font-bold text-stone-900">{p.title}</h3>
                  <p className="text-stone-500 mt-2 leading-relaxed">{p.description}</p>
                  <div className="flex justify-center gap-4 mt-3">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 transition">GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 transition">Live Demo</a>}
                  </div>
                  <div className="mt-6 border-b border-stone-200" />
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-center text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {portfolio.skills.map((s) => (
                <span key={s.id} className="text-stone-600 text-sm italic">
                  {s.name}{s.level ? ` (${s.level})` : ''} ·
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <h2 className="text-center text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">Experience</h2>
            <div className="space-y-8">
              {portfolio.experiences.map((e) => (
                <div key={e.id} className="text-center">
                  <h3 className="text-xl font-bold text-stone-900">{e.role}</h3>
                  <p className="text-stone-500 italic">{e.company}</p>
                  <p className="text-stone-500 mt-2 leading-relaxed">{e.description}</p>
                  <div className="mt-6 border-b border-stone-200" />
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <h2 className="text-center text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">Certificates</h2>
            <div className="space-y-6">
              {portfolio.certificates.map((c) => (
                <div key={c.id} className="text-center">
                  <h3 className="text-lg font-bold text-stone-900">{c.title}</h3>
                  <p className="text-stone-500 italic text-sm">{c.issuer}</p>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-stone-400 hover:text-stone-700 underline underline-offset-4 mt-1 inline-block transition">View Certificate</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <h2 className="text-center text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">Internships</h2>
            <div className="space-y-8">
              {portfolio.internships.map((item) => (
                <div key={item.id} className="text-center">
                  <h3 className="text-xl font-bold text-stone-900">{item.role}</h3>
                  <p className="text-stone-500 italic">{item.company}</p>
                  <p className="text-stone-500 mt-2 leading-relaxed">{item.description}</p>
                  {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-xs text-stone-400 hover:text-stone-700 underline underline-offset-4 mt-1 inline-block transition">Certificate</a>}
                  <div className="mt-6 border-b border-stone-200" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
