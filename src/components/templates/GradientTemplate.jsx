import { motion } from 'framer-motion'

export default function GradientTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white font-sans">
      <header className="text-center px-6 pt-20 pb-14">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black">{portfolio.username}</motion.h1>
        <p className="text-indigo-200 mt-2 text-lg">{portfolio.email}</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-16 space-y-12">
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-5">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.projects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-indigo-200 text-sm mt-2">{p.description}</p>
                  <div className="flex gap-3 mt-4">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs bg-white text-purple-700 hover:bg-indigo-100 px-3 py-1 rounded-full font-semibold transition">Live</a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-5">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s) => (
                <span key={s.id} className="bg-white/20 border border-white/30 text-white text-sm px-4 py-2 rounded-full">
                  {s.name} {s.level && <span className="text-indigo-200">· {s.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-5">Experience</h2>
            <div className="space-y-4">
              {portfolio.experiences.map((e) => (
                <div key={e.id} className="bg-white/10 border border-white/20 rounded-2xl p-5">
                  <h3 className="font-bold">{e.role}</h3>
                  <p className="text-pink-200 text-sm">{e.company}</p>
                  <p className="text-indigo-200 text-sm mt-2">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-5">Certificates</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.certificates.map((c) => (
                <div key={c.id} className="bg-white/10 border border-white/20 rounded-2xl p-5">
                  <h3 className="font-bold">{c.title}</h3>
                  <p className="text-pink-200 text-sm">{c.issuer}</p>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-white/70 hover:text-white mt-2 inline-block transition">View →</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-5">Internships</h2>
            <div className="space-y-4">
              {portfolio.internships.map((item) => (
                <div key={item.id} className="bg-white/10 border border-white/20 rounded-2xl p-5">
                  <h3 className="font-bold">{item.role}</h3>
                  <p className="text-pink-200 text-sm">{item.company}</p>
                  <p className="text-indigo-200 text-sm mt-2">{item.description}</p>
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
