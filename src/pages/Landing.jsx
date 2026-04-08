import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import FeatureCard from '../components/FeatureCard'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

const features = [
  {
    icon: '🚀',
    title: 'Easy Portfolio Creation',
    description: 'Set up your professional portfolio in minutes — no design skills or coding required.',
  },
  {
    icon: '⚡',
    title: 'Real-Time Editing',
    description: 'Add projects, skills, and experience instantly. Your portfolio updates live as you type.',
  },
  {
    icon: '🔐',
    title: 'Secure Authentication',
    description: 'JWT-based login keeps your account and data protected at all times.',
  },
  {
    icon: '📱',
    title: 'Fast & Responsive',
    description: 'Every portfolio looks pixel-perfect on mobile, tablet, and desktop.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center pt-20">
          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              The Developer Portfolio Builder
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Build Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Developer Portfolio
            </span>{' '}
            in Minutes
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Create stunning portfolios with a smooth and hassle-free experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/portfolio/pren"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
            >
              View Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-8 text-sm text-gray-600"
          >
            Free to use · No credit card required · Live in minutes
          </motion.p>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                stand out
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base">
              Powerful tools designed to help developers showcase their work professionally.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="relative rounded-3xl border border-indigo-500/25 p-14 overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                Start Building Your Portfolio{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>
              <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">
                Join developers who are already showcasing their work and landing opportunities.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition-all duration-200 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                Get Started — It's Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 Portfolio Builder. All rights reserved.</span>
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
