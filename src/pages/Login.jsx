import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'

export default function Login() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await api.post('/auth/register', form)
        setIsRegister(false)
        setForm({ username: form.username, email: '', password: '' })
      } else {
        const { data } = await api.post('/auth/login', {
          username: form.username,
          password: form.password,
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/5 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/5 dark:bg-purple-500/5 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-gray-900/90 dark:bg-gray-900/90 bg-white/90 backdrop-blur-xl border border-gray-800/50 dark:border-gray-800/50 border-gray-200/50 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white dark:text-white text-gray-900">Portfolio Builder</h1>
          <p className="text-gray-400 dark:text-gray-400 text-gray-600 mt-2 text-sm">
            {isRegister ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm text-gray-400 dark:text-gray-400 text-gray-600 mb-1">Username</label>
            <div className="relative">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 dark:bg-gray-800/50 bg-gray-100 border border-gray-700/50 dark:border-gray-700/50 border-gray-300/50 rounded-lg px-4 py-2.5 pl-10 text-white dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:border-blue-500 focus:bg-gray-800/70 dark:focus:bg-gray-800/70 focus:bg-gray-50 transition-all duration-200"
                placeholder="johndoe"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-500 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {isRegister && (
            <div className="relative">
              <label className="block text-sm text-gray-400 dark:text-gray-400 text-gray-600 mb-1">Email</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 dark:bg-gray-800/50 bg-gray-100 border border-gray-700/50 dark:border-gray-700/50 border-gray-300/50 rounded-lg px-4 py-2.5 pl-10 text-white dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:border-blue-500 focus:bg-gray-800/70 dark:focus:bg-gray-800/70 focus:bg-gray-50 transition-all duration-200"
                  placeholder="john@example.com"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-500 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          <div className="relative">
            <label className="block text-sm text-gray-400 dark:text-gray-400 text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 dark:bg-gray-800/50 bg-gray-100 border border-gray-700/50 dark:border-gray-700/50 border-gray-300/50 rounded-lg px-4 py-2.5 pl-10 pr-10 text-white dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:border-blue-500 focus:bg-gray-800/70 dark:focus:bg-gray-800/70 focus:bg-gray-50 transition-all duration-200"
                placeholder="••••••••"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-500 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-500 text-gray-400 hover:text-gray-400 dark:hover:text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-400 dark:text-red-400 text-red-600 text-sm bg-red-900/20 dark:bg-red-900/20 bg-red-50 border border-red-800/50 dark:border-red-800/50 border-red-200/50 rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-600 dark:to-purple-600 from-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 dark:hover:from-indigo-500 dark:hover:to-purple-500 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                {isRegister ? 'Create Account' : 'Sign In'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-500 text-gray-400 mt-6">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsRegister(!isRegister); setError('') }}
            className="text-indigo-400 dark:text-indigo-400 text-blue-600 hover:text-indigo-300 dark:hover:text-indigo-300 hover:text-blue-500 font-medium transition"
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
