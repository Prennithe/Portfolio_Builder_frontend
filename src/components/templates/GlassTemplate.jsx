import { motion } from 'framer-motion'

export default function GlassTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-700 to-blue-700 font-sans">
      <header className="text-center px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-block backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-12 py-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white">{portfolio.username}</h1>
          <p className="text-purple-200 mt-2">{portfolio.email}</p>
        </motion.div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-16 space-y-10">
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-4">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.projects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-purple-200 text-sm mt-2">{p.description}</p>
                  <div className="flex gap-3 mt-3">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs text-white/70 hover:text-white border border-white/30 px-3 py-1 rounded-lg transition">GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition">Live</a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s) => (
                <span key={s.id} className="backdrop-blur-xl bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                  {s.name} {s.level && <span className="text-purple-300">· {s.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-4">Experience</h2>
            <div className="space-y-4">
              {portfolio.experiences.map((e) => (
                <div key={e.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
                  <h3 className="font-semibold">{e.role}</h3>
                  <p className="text-purple-300 text-sm">{e.company}</p>
                  <p className="text-purple-200 text-sm mt-2">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-4">Certificates</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.certificates.map((c) => (
                <div key={c.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-purple-300 text-sm">{c.issuer}</p>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-white/70 hover:text-white mt-2 inline-block transition">View →</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-4">Internships</h2>
            <div className="space-y-4">
              {portfolio.internships.map((item) => (
                <div key={item.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
                  <h3 className="font-semibold">{item.role}</h3>
                  <p className="text-purple-300 text-sm">{item.company}</p>
                  <p className="text-purple-200 text-sm mt-2">{item.description}</p>
                  {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-xs text-white/70 hover:text-white mt-1 inline-block transition">Certificate →</a>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
