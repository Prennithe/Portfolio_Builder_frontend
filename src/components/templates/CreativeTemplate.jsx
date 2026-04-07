import { motion } from 'framer-motion'

export default function CreativeTemplate({ portfolio }) {
  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 font-sans">
      <header className="relative overflow-hidden bg-gradient-to-br from-pink-400 to-rose-500 text-white px-10 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black">
          {portfolio.username}
        </motion.h1>
        <p className="text-pink-100 mt-2 text-lg">{portfolio.email}</p>
        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-pink-50" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </header>

      <main className="max-w-4xl mx-auto px-8 pt-14 pb-16 space-y-14">
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-pink-400 mb-6">✦ Projects ✦</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {portfolio.projects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl p-6 shadow-md border border-pink-100">
                  <h3 className="font-bold text-gray-900">{p.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{p.description}</p>
                  <div className="flex gap-3 mt-4">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full hover:bg-pink-200 transition">GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-xs bg-rose-500 text-white px-3 py-1 rounded-full hover:bg-rose-600 transition">Live</a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-pink-400 mb-6">✦ Skills ✦</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {portfolio.skills.map((s) => (
                <span key={s.id} className="bg-white border border-pink-200 text-pink-700 text-sm px-4 py-2 rounded-full shadow-sm">
                  {s.name} {s.level && <span className="text-pink-400">· {s.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.experiences?.length > 0 && (
          <section>
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-pink-400 mb-6">✦ Experience ✦</h2>
            <div className="space-y-4">
              {portfolio.experiences.map((e) => (
                <div key={e.id} className="bg-white rounded-3xl p-6 shadow-md border border-pink-100">
                  <h3 className="font-bold text-gray-900">{e.role}</h3>
                  <p className="text-pink-500 text-sm">{e.company}</p>
                  <p className="text-gray-500 text-sm mt-2">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.certificates?.length > 0 && (
          <section>
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-pink-400 mb-6">✦ Certificates ✦</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.certificates.map((c) => (
                <div key={c.id} className="bg-white rounded-3xl p-5 shadow-md border border-pink-100 text-center">
                  <div className="text-3xl mb-2">🎀</div>
                  <h3 className="font-bold text-gray-900">{c.title}</h3>
                  <p className="text-pink-500 text-sm">{c.issuer}</p>
                  {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-pink-500 hover:underline mt-2 inline-block">View</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolio.internships?.length > 0 && (
          <section>
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-pink-400 mb-6">✦ Internships ✦</h2>
            <div className="space-y-4">
              {portfolio.internships.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-6 shadow-md border border-pink-100">
                  <h3 className="font-bold text-gray-900">{item.role}</h3>
                  <p className="text-pink-500 text-sm">{item.company}</p>
                  <p className="text-gray-500 text-sm mt-2">{item.description}</p>
                  {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-xs text-pink-500 hover:underline mt-1 inline-block">Certificate</a>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
