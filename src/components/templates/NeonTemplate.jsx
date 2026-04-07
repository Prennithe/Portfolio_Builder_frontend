export default function NeonTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="px-10 pt-16 pb-10 border-b border-green-900">
        <p className="text-green-500 text-xs uppercase tracking-widest mb-2">[ portfolio ]</p>
        <h1 className="text-5xl font-black" style={{ textShadow: '0 0 20px #22c55e, 0 0 40px #22c55e' }}>
          {portfolio.username}
        </h1>
        <p className="text-green-600 mt-2">{portfolio.email}</p>
      </header>

      <main className="max-w-4xl mx-auto px-10 py-14 space-y-14">
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-500 mb-5">// Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.projects.map((p) => (
                <div key={p.id} className="border border-green-800 rounded-xl p-5 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition">
                  <h3 className="font-bold text-green-300">{p.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{p.description}</p>
                  <div className="flex gap-3 mt-4">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs text-green-500 hover:text-green-300 border border-green-800 px-3 py-1 rounded transition">GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs text-black bg-green-500 hover:bg-green-400 px-3 py-1 rounded font-semibold transition">Live</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-500 mb-5">// Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s) => (
                <span key={s.id} className="border border-green-800 text-green-400 text-sm px-4 py-2 rounded-full hover:border-green-500 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] transition">
                  {s.name} {s.level && <span className="text-green-700">· {s.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-500 mb-5">// Experience</h2>
            <div className="space-y-4">
              {portfolio.experiences.map((e) => (
                <div key={e.id} className="border-l-2 border-green-700 pl-5">
                  <h3 className="font-bold text-green-300">{e.role}</h3>
                  <p className="text-green-700 text-sm">{e.company}</p>
                  <p className="text-gray-400 text-sm mt-1">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-500 mb-5">// Certificates</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.certificates.map((c) => (
                <div key={c.id} className="border border-green-800 rounded-xl p-5">
                  <h3 className="font-bold text-green-300">{c.title}</h3>
                  <p className="text-green-700 text-sm">{c.issuer}</p>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-green-500 hover:text-green-300 mt-2 inline-block transition">View →</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-500 mb-5">// Internships</h2>
            <div className="space-y-4">
              {portfolio.internships.map((item) => (
                <div key={item.id} className="border-l-2 border-green-700 pl-5">
                  <h3 className="font-bold text-green-300">{item.role}</h3>
                  <p className="text-green-700 text-sm">{item.company}</p>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-xs text-green-500 hover:text-green-300 mt-1 inline-block transition">Certificate →</a>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
