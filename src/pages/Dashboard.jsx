import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import SectionManager from '../components/dashboard/SectionManager'
import TemplateSelector, { TEMPLATES } from '../components/dashboard/TemplateSelector'
import { useTheme } from '../contexts/ThemeContext'

const SECTIONS = [
  { id: 'projects', label: 'Projects', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'skills', label: 'Skills', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: 'experiences', label: 'Experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4' },
  { id: 'certificates', label: 'Certificates', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { id: 'internships', label: 'Internships', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
]

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

  const handleTemplateUpdate = (selectedTemplate) => {
    setPortfolio((prev) => ({ ...prev, selectedTemplate }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 dark:bg-gray-950 bg-white">
        <div className="w-8 h-8 border-2 border-indigo-500 dark:border-indigo-500 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const activeSectionData = SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950 bg-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900/50 dark:bg-gray-900/50 bg-white/50 backdrop-blur border-r border-gray-800/50 dark:border-gray-800/50 border-gray-200/50">
        <div className="p-6 border-b border-gray-800/50 dark:border-gray-800/50 border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-white dark:text-white text-gray-900 font-semibold">Portfolio Builder</h2>
              <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-sm">@{username}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-indigo-600 dark:bg-indigo-600 bg-blue-600 text-white shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/25 shadow-blue-500/25'
                    : 'text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                </svg>
                <span className="font-medium">{section.label}</span>
                {portfolio?.[section.id] && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    activeSection === section.id ? 'bg-white/20 dark:bg-white/20 bg-black/20' : 'bg-gray-700 dark:bg-gray-700 bg-gray-200'
                  }`}>
                    {portfolio[section.id].length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800/50 dark:border-gray-800/50 border-gray-200/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-10 bg-gray-900/80 dark:bg-gray-900/80 bg-white/80 backdrop-blur border-b border-gray-800/50 dark:border-gray-800/50 border-gray-200/50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold text-white hidden md:block">Dashboard</h1>
              <div className="md:hidden">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeSectionData.icon} />
                    </svg>
                  </div>
                  <span className="text-white dark:text-white text-gray-900 font-semibold">{activeSectionData.label}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={`/portfolio/${username}`}
                target="_blank"
                className="hidden sm:flex items-center gap-2 text-sm text-indigo-400 dark:text-indigo-400 text-blue-600 hover:text-indigo-300 dark:hover:text-indigo-300 hover:text-blue-500 transition px-3 py-1.5 rounded-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/10 hover:bg-blue-500/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Portfolio
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:bg-gray-100 transition-all duration-200"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-gray-400 dark:text-gray-400 text-gray-600 hidden lg:block">Welcome back, {portfolio?.username}</span>
              <button
                onClick={handleLogout}
                className="md:hidden text-sm bg-gray-800 dark:bg-gray-800 bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-gray-300 text-white dark:text-white text-gray-900 px-3 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 dark:from-gray-900/50 dark:to-gray-800/50 from-white/50 to-gray-50/50 backdrop-blur border border-gray-800/50 dark:border-gray-800/50 border-gray-200/50 rounded-2xl p-6 mb-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-2">Welcome back, {portfolio?.username}! 👋</h2>
                <p className="text-gray-400 dark:text-gray-400 text-gray-600 mb-4">{portfolio?.email}</p>
                <div className="flex flex-wrap gap-4">
                  {SECTIONS.map((section) => (
                    <div key={section.id} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-500 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300 dark:text-gray-300 text-gray-700 capitalize">{section.id}:</span>
                      <span className="text-white dark:text-white text-gray-900 font-semibold">{portfolio?.[section.id]?.length || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="rounded-3xl bg-gray-800/80 dark:bg-gray-800/80 border border-gray-700/60 p-4 text-sm text-gray-300">
                  <div className="font-semibold text-white mb-1">Template selected</div>
                  <p className="leading-relaxed">
                    {portfolio?.selectedTemplate
                      ? TEMPLATES.find((item) => item.value === portfolio.selectedTemplate)?.label || 'Minimal'
                      : 'Pick one of the 5 featured templates below.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Template preview and selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900/50 dark:bg-gray-900/50 bg-white/50 backdrop-blur border border-gray-800/50 dark:border-gray-800/50 border-gray-200/50 rounded-2xl p-6 mb-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white dark:text-white text-gray-900">Choose your portfolio style</h3>
                <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-sm">Select one of the five curated templates to continue filling in your details.</p>
              </div>
              <div className="rounded-2xl bg-gray-800/80 border border-gray-700/60 px-4 py-3 text-sm text-gray-300">
                Current selection: <span className="font-semibold text-white">{TEMPLATES.find((item) => item.value === portfolio?.selectedTemplate)?.label || 'Minimal'}</span>
              </div>
            </div>
            <TemplateSelector
              current={portfolio?.selectedTemplate || 'minimal'}
              onUpdate={handleTemplateUpdate}
            />
          </motion.div>

          {/* Portfolio Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900/50 dark:bg-gray-900/50 bg-white/50 backdrop-blur border border-gray-800/50 dark:border-gray-800/50 border-gray-200/50 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white dark:text-white text-gray-900 mb-4">Portfolio Details</h3>
            
            {/* Mobile Tabs */}
            <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
                    activeSection === section.id
                      ? 'bg-indigo-600 dark:bg-indigo-600 bg-blue-600 text-white'
                      : 'bg-gray-800 dark:bg-gray-800 bg-gray-200 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>

            {/* Desktop Tabs */}
            <div className="hidden md:flex gap-2 mb-6 border-b border-gray-800/50 dark:border-gray-800/50 border-gray-200/50">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition font-medium ${
                    activeSection === section.id
                      ? 'bg-indigo-600 dark:bg-indigo-600 bg-blue-600 text-white border-b-2 border-white'
                      : 'text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                  <span>{section.label}</span>
                  {portfolio?.[section.id] && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeSection === section.id ? 'bg-white/20 dark:bg-white/20 bg-black/20' : 'bg-gray-700 dark:bg-gray-700 bg-gray-200'
                    }`}>
                      {portfolio[section.id].length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Section Manager */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500/20 dark:bg-indigo-500/20 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-400 dark:text-indigo-400 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeSectionData.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white dark:text-white text-gray-900">{activeSectionData.label}</h4>
                  <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-sm">Manage your {activeSectionData.label.toLowerCase()}</p>
                </div>
              </div>
              <SectionManager
                key={activeSection}
                section={activeSection}
                items={portfolio?.[activeSection] || []}
                onRefresh={fetchDashboard}
              />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
