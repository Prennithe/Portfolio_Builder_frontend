import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const SectionLabel = ({ children }) => (
  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5">
    {children}
  </p>
)

const GlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-2xl bg-white/10 border border-white/15 rounded-2xl shadow-xl shadow-black/20 ${className}`}>
    {children}
  </div>
)

export default function GlassTemplate({ portfolio }) {
  const initials = portfolio.username
    ? portfolio.username.slice(0, 2).toUpperCase()
    : 'PB'

  const stats = [
    { label: 'Projects',     value: portfolio.projects?.length     || 0 },
    { label: 'Skills',       value: portfolio.skills?.length       || 0 },
    { label: 'Experience',   value: portfolio.experiences?.length  || 0 },
    { label: 'Certificates', value: portfolio.certificates?.length || 0 },
  ]

  return (
    <div className="min-h-screen font-sans text-white"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #1a1a2e 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-purple-700/20 blur-[100px]" />
      </div>

      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/5 border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            {portfolio.username || 'Portfolio'}
          </span>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-white/60">
            {portfolio.projects?.length     > 0 && <a href="#projects"     className="hover:text-white transition-colors">Projects</a>}
            {portfolio.skills?.length       > 0 && <a href="#skills"       className="hover:text-white transition-colors">Skills</a>}
            {portfolio.experiences?.length  > 0 && <a href="#experience"   className="hover:text-white transition-colors">Experience</a>}
            {portfolio.certificates?.length > 0 && <a href="#certificates" className="hover:text-white transition-colors">Certificates</a>}
            {portfolio.internships?.length  > 0 && <a href="#internships"  className="hover:text-white transition-colors">Internships</a>}
          </nav>
          {portfolio.email && (
            <a
              href={`mailto:${portfolio.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
            >
              Contact
            </a>
          )}
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* ── Hero ── */}
        <motion.section
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
        >
          <GlassCard className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl font-black shadow-2xl shadow-violet-500/30 border border-white/20">
                  {initials}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/70 mb-2">Portfolio</p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                  {portfolio.username || 'Your Name'}
                </h1>
                {portfolio.email && (
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {portfolio.email}
                  </a>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>

        {/* ── Projects ── */}
        {portfolio.projects?.length > 0 && (
          <motion.section
            id="projects"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          >
            <SectionLabel>Projects</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                >
                  <GlassCard className="p-6 h-full flex flex-col hover:bg-white/15 transition-colors duration-300">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-white text-base leading-snug">{p.title}</h3>
                      <span className="shrink-0 w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-400/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </span>
                    </div>
                    {p.description && (
                      <p className="text-sm text-white/55 leading-relaxed flex-1">{p.description}</p>
                    )}
                    {(p.githubLink || p.liveLink) && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                        {p.githubLink && (
                          <a href={p.githubLink} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-lg transition-all duration-200">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                        )}
                        {p.liveLink && (
                          <a href={p.liveLink} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-lg transition-all duration-200">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live
                          </a>
                        )}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Skills ── */}
        {portfolio.skills?.length > 0 && (
          <motion.section
            id="skills"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          >
            <SectionLabel>Skills</SectionLabel>
            <GlassCard className="p-6">
              <div className="flex flex-wrap gap-2.5">
                {portfolio.skills.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-default"
                  >
                    {s.name}
                    {s.level && (
                      <span className="text-violet-300/80 text-xs">· {s.level}</span>
                    )}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.section>
        )}

        {/* ── Experience ── */}
        {portfolio.experiences?.length > 0 && (
          <motion.section
            id="experience"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          >
            <SectionLabel>Experience</SectionLabel>
            <div className="space-y-4">
              {portfolio.experiences.map((e, i) => (
                <motion.div
                  key={e.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                >
                  <GlassCard className="p-6 hover:bg-white/15 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white">{e.role}</h3>
                        <p className="text-sm text-violet-300/80 mt-0.5">{e.company}</p>
                        {e.description && (
                          <p className="text-sm text-white/50 mt-2 leading-relaxed">{e.description}</p>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Certificates ── */}
        {portfolio.certificates?.length > 0 && (
          <motion.section
            id="certificates"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          >
            <SectionLabel>Certificates</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.certificates.map((c, i) => (
                <motion.div
                  key={c.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                >
                  <GlassCard className="p-6 hover:bg-white/15 transition-colors duration-300">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm">{c.title}</h3>
                        <p className="text-xs text-white/50 mt-0.5">{c.issuer}</p>
                        {c.fileUrl && (
                          <a href={c.fileUrl} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-emerald-300/80 hover:text-emerald-300 mt-2 transition-colors">
                            View certificate
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Internships ── */}
        {portfolio.internships?.length > 0 && (
          <motion.section
            id="internships"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          >
            <SectionLabel>Internships</SectionLabel>
            <div className="space-y-4">
              {portfolio.internships.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                >
                  <GlassCard className="p-6 hover:bg-white/15 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white">{item.role}</h3>
                        <p className="text-sm text-pink-300/80 mt-0.5">{item.company}</p>
                        {item.description && (
                          <p className="text-sm text-white/50 mt-2 leading-relaxed">{item.description}</p>
                        )}
                        {item.certificateUrl && (
                          <a href={item.certificateUrl} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-pink-300/80 hover:text-pink-300 mt-2 transition-colors">
                            View certificate
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Footer ── */}
        <footer className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} {portfolio.username} · Built with Portfolio Builder</p>
        </footer>

      </div>
    </div>
  )
}
