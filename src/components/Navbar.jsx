import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToFeatures = (e) => {
    e.preventDefault()
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Portfolio Builder
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <a
            href="#features"
            onClick={scrollToFeatures}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Features
          </a>
          <Link to="/login" className="hover:text-white transition-colors">Login</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm text-gray-300">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
            Home
          </Link>
          <a
            href="#features"
            onClick={scrollToFeatures}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Features
          </a>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}
