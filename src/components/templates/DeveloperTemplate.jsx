export default function DeveloperTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      {/* Terminal header bar */}
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 sticky top-0">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-gray-400 text-xs ml-3">portfolio ~ {portfolio.username}</span>
      </div>

      <main className="max-w-3xl mx-auto px-8 py-10 space-y-10">
        <div>
          <p className="text-gray-500 text-sm">$ whoami</p>
          <h1 className="text-3xl font-bold text-green-300 mt-1">{portfolio.username}</h1>
          <p className="text-green-600 text-sm">{portfolio.email}</p>
        </div>

        {portfolio.projects?.length > 0 && (
          <section>
            <p className="text-gray-500 text-sm mb-3">$ ls ./projects</p>
            <div className="space-y-3">
              {portfolio.projects.map((p) => (
                <div key={p.id} className="border border-green-900 bg-gray-900 rounded-lg p-4">
                  <p className="text-green-300 font-bold">{p.title}</p>
                  <p className="text-green-600 text-sm mt-1"># {p.description}</p>
                  <div className="flex gap-4 mt-2">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline">→ github</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline">→ live</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <p className="text-gray-500 text-sm mb-3">$ cat skills.json</p>
            <div className="border border-green-900 bg-gray-900 rounded-lg p-4">
              <p className="text-green-700 text-sm">{'{'}</p>
              {portfolio.skills.map((s, i) => (
                <p key={s.id} className="text-sm pl-4">
                  <span className="text-cyan-400">"{s.name}"</span>
                  <span className="text-green-700">: </span>
                  <span className="text-yellow-400">"{s.level || 'proficient'}"</span>
                  {i < portfolio.skills.length - 1 && <span className="text-green-700">,</span>}
                </p>
              ))}
              <p className="text-green-700 text-sm">{'}'}</p>
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <p className="text-gray-500 text-sm mb-3">$ git log --experience</p>
            <div className="space-y-3">
              {portfolio.experiences.map((e) => (
                <div key={e.id} className="border-l-2 border-green-800 pl-4">
                  <p className="text-green-300 font-bold">{e.role}</p>
                  <p className="text-cyan-600 text-sm">@ {e.company}</p>
                  <p className="text-green-700 text-sm mt-1"># {e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <p className="text-gray-500 text-sm mb-3">$ ls ./certificates</p>
            <div className="space-y-2">
              {portfolio.certificates.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-green-700">-rw-r--r--</span>
                  <span className="text-green-300">{c.title}</span>
                  <span className="text-green-700 text-xs">({c.issuer})</span>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-xs hover:underline">[open]</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <p className="text-gray-500 text-sm mb-3">$ git log --internships</p>
            <div className="space-y-3">
              {portfolio.internships.map((item) => (
                <div key={item.id} className="border-l-2 border-green-800 pl-4">
                  <p className="text-green-300 font-bold">{item.role}</p>
                  <p className="text-cyan-600 text-sm">@ {item.company}</p>
                  <p className="text-green-700 text-sm mt-1"># {item.description}</p>
                  {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-xs hover:underline">[certificate]</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="text-green-800 text-sm animate-pulse">█</p>
      </main>
    </div>
  )
}
