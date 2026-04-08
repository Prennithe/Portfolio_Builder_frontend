import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function TemplateCard({ name, gradient, username }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 group"
    >
      <div className={`h-44 ${gradient} flex items-center justify-center relative overflow-hidden`}>
        <span className="text-white/30 text-6xl font-bold select-none">{name[0]}</span>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-white font-medium text-sm">{name}</span>
        <Link
          to={`/portfolio/${username}`}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
        >
          Preview
        </Link>
      </div>
    </motion.div>
  )
}
