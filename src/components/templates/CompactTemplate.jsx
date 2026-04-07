export default function CompactTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans text-sm">
      <header className="bg-gray-800 text-white px-8 py-8">
        <h1 className="text-2xl font-bold">{portfolio.username}</h1>
        <p className="text-gray-300 mt-1">{portfolio.email}</p>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-8 grid md:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {portfolio.skills?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
              <div className="space-y-1">
                {portfolio.skills.map((s) => (
                  <div key={s.id} className="flex justify-between items-center bg-white border border-gray-200 rounded px-3 py-1.5">
                    <span className="font-medium text-gray-700">{s.name}</span>
                    {s.level && <span className="text-gray-400 text-xs">{s.level}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.certificates?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Certificates</h2>
              <div className="space-y-2">
                {portfolio.certificates.map((c) => (
                  <div key={c.id} className="bg-white border border-gray-200 rounded px-3 py-2">
                    <p className="font-medium text-gray-700">{c.title}</p>
                    <p className="text-gray-400 text-xs">{c.issuer}</p>
                    {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline">View</a>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6">
          {portfolio.projects?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Projects</h2>
              <div className="space-y-3">
                {portfolio.projects.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{p.title}</h3>
                      <div className="flex gap-2 ml-2 shrink-0">
                        {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline">GitHub</a>}
                        {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline">Live</a>}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.experiences?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Experience</h2>
              <div className="space-y-3">
                {portfolio.experiences.map((e) => (
                  <div key={e.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <h3 className="font-semibold text-gray-800">{e.role} <span className="text-gray-400 font-normal">@ {e.company}</span></h3>
                    <p className="text-gray-500 text-xs mt-1">{e.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.internships?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Internships</h2>
              <div className="space-y-3">
                {portfolio.internships.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <h3 className="font-semibold text-gray-800">{item.role} <span className="text-gray-400 font-normal">@ {item.company}</span></h3>
                    <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                    {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline">Certificate</a>}
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
