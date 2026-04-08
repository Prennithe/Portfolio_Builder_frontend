import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import SectionManager from '../components/dashboard/SectionManager'
import TemplateSelector, { TEMPLATES } from '../components/dashboard/TemplateSelector'
import { useTheme } from '../contexts/ThemeContext'

const SECTIONS = [
  { id: 'projects',     label: 'Projects',     icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'skills',       label: 'Skills',       icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: 'experiences',  label: 'Experience',   icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4' },
  { id: 'certificates', label: 'Certificates', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { id: 'internships',  label: 'Internships',  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.08, ease: 'easeOut' } }),
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('projects')
  const username = localStorage.getItem('username')
  const { isDark, toggleTheme } = useTheme()

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get('/dashboard')
      setPortfolio(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDashboard() }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const handleSidebarClick = (sectionId) => {
    setActiveSection(sectionId)
    setTimeout(() => {
      document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleTemplateUpdate = (selectedTemplate) => {
    setPortfolio((prev) => ({ ...prev, selectedTemplate }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const activeSectionData = SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white font-semibold text-sm">Portfolio Builder</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">@{username}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {SECTIONS.map((section) => {
            const active = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => handleSidebarClick(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                </svg>
                <span>{section.label}</span>
                {portfolio?.[section.id] && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {portfolio[section.id].length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top header */}
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">

            {/* Left: title / mobile section label */}
            <div className="flex items-center gap-3">
              <h1 className="text-base font-bold text-gray-900 dark:text-white hidden md:block">Dashboard</h1>
              <div className="md:hidden flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeSectionData.icon} />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{activeSectionData.label}</span>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              <Link
                to={`/portfolio/${username}`}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Portfolio
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {isDark ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <span className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                {portfolio?.username}
              </span>

              <button
                onClick={handleLogout}
                className="md:hidden text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">

          {/* ── Welcome card ── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Welcome back, {portfolio?.username}! 👋
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{portfolio?.email}</p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSidebarClick(section.id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 group"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                        </svg>
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {section.label}
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {portfolio?.[section.id]?.length || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active template badge */}
              <div className="shrink-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl px-5 py-4 min-w-[180px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">Active Template</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">
                  {TEMPLATES.find(t => t.value === portfolio?.selectedTemplate)?.label || 'Minimal'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Template selector card ── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Choose your portfolio style</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Pick one of the curated templates below.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                {TEMPLATES.find(t => t.value === portfolio?.selectedTemplate)?.label || 'Minimal'} selected
              </span>
            </div>
            <TemplateSelector
              current={portfolio?.selectedTemplate || 'minimal'}
              onUpdate={handleTemplateUpdate}
            />
          </motion.div>

          {/* ── Portfolio details card ── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Card header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Details</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your content for each section</p>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden flex gap-2 px-4 pt-4 pb-2 overflow-x-auto">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSidebarClick(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                  {section.label}
                </button>
              ))}
            </div>

            {/* Desktop tabs */}
            <div className="hidden md:flex gap-1 px-6 pt-4 border-b border-gray-200 dark:border-gray-800">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSidebarClick(section.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all duration-200 -mb-px ${
                    activeSection === section.id
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                  {section.label}
                  {portfolio?.[section.id] && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      activeSection === section.id
                        ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}>
                      {portfolio[section.id].length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Section content */}
            <div className="p-6">
              <motion.div
                key={activeSection}
                id={`section-${activeSection}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeSectionData.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">{activeSectionData.label}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage your {activeSectionData.label.toLowerCase()}</p>
                  </div>
                </div>

                <SectionManager
                  key={activeSection}
                  section={activeSection}
                  items={portfolio?.[activeSection] || []}
                  onRefresh={fetchDashboard}
                />
              </motion.div>
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  )
}
