import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-default"
    >
      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-2xl mb-5 group-hover:bg-indigo-500/25 group-hover:border-indigo-500/40 transition-all duration-300">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
