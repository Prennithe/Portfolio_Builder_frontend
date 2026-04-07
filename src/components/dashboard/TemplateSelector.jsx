import { useState } from 'react'
import api from '../../api/axios'

export const TEMPLATES = [
  { value: 'minimal', label: 'Minimal', description: 'Clean, crisp, and easy to customize.' },
  { value: 'modern', label: 'Modern', description: 'Sophisticated layout with polished spacing.' },
  { value: 'dark', label: 'Dark Pro', description: 'Bold dark theme for a premium portfolio.' },
  { value: 'glass', label: 'Glass', description: 'Soft glassmorphism with polished highlights.' },
  { value: 'bold', label: 'Bold', description: 'Hero-first design with strong visual impact.' },
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
              className={`group rounded-3xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
                  : 'border-gray-700 bg-gray-900 hover:border-indigo-500 hover:bg-gray-900/80'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{template.label}</span>
                {selected && (
                  <span className="rounded-full bg-indigo-500 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white">
                    Selected
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">{template.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-indigo-300">
                <span>{selected ? 'Currently active' : 'Choose this layout'}</span>
                {!selected && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>
      {loading && <p className="text-sm text-gray-400">Saving your template choice...</p>}
    </div>
  )
}
