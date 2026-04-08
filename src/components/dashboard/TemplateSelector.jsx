import { useState } from 'react'
import api from '../../api/axios'

export const TEMPLATES = [
  { value: 'minimal', label: 'Minimal',  description: 'Clean, crisp, and easy to customize.' },
  { value: 'modern',  label: 'Modern',   description: 'Sophisticated layout with polished spacing.' },
  { value: 'dark',    label: 'Dark Pro', description: 'Bold dark theme for a premium portfolio.' },
  { value: 'glass',   label: 'Glass',    description: 'Soft glassmorphism with polished highlights.' },
  { value: 'bold',    label: 'Bold',     description: 'Hero-first design with strong visual impact.' },
]

export default function TemplateSelector({ current, onUpdate }) {
  const [loading, setLoading] = useState(false)

  const handleSelect = async (selectedTemplate) => {
    if (selectedTemplate === current) return
    setLoading(true)
    try {
      await api.put('/portfolio/template', { selectedTemplate })
      onUpdate(selectedTemplate)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {TEMPLATES.map((template) => {
          const selected = current === template.value
          return (
            <button
              key={template.value}
              type="button"
              onClick={() => handleSelect(template.value)}
              disabled={loading}
              className={`group rounded-2xl border p-4 text-left transition-all duration-300 disabled:cursor-not-allowed ${
                selected
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md shadow-indigo-500/15 ring-2 ring-indigo-500/30'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {/* Label row */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-sm font-semibold ${
                  selected
                    ? 'text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {template.label}
                </span>
                {selected && (
                  <span className="shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                    Selected
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`mt-2.5 text-xs leading-relaxed ${
                selected
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {template.description}
              </p>

              {/* Footer link */}
              <div className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${
                selected
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
              } transition-colors duration-200`}>
                <span>{selected ? 'Currently active' : 'Choose this layout'}</span>
                {!selected && (
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Saving your template choice…
        </div>
      )}
    </div>
  )
}
