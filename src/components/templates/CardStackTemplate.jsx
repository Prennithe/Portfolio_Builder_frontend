import { motion } from 'framer-motion'

export default function CardStackTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <header className="bg-white shadow-sm py-12 px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">{portfolio.username}</h1>
        <p className="text-slate-500 mt-2">{portfolio.email}</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Projects</h2>
            <div className="space-y-4">
              {portfolio.projects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{p.description}</p>
                  <div className="flex gap-3 mt-3">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">Live</a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s) => (
                <span key={s.id} className="bg-white border border-slate-200 shadow-sm text-slate-700 text-sm px-3 py-1.5 rounded-xl">
                  {s.name} {s.level && <span className="text-slate-400 text-xs">· {s.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Experience</h2>
            <div className="space-y-4">
              {portfolio.experiences.map((e, i) => (
                <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900">{e.role}</h3>
                  <p className="text-blue-600 text-sm">{e.company}</p>
                  <p className="text-slate-500 text-sm mt-1">{e.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Certificates</h2>
            <div className="space-y-4">
              {portfolio.certificates.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900">{c.title}</h3>
                  <p className="text-slate-500 text-sm">{c.issuer}</p>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-2 inline-block">View</a>}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Internships</h2>
            <div className="space-y-4">
              {portfolio.internships.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900">{item.role}</h3>
                  <p className="text-blue-600 text-sm">{item.company}</p>
                  <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                  {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-2 inline-block">Certificate</a>}
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
