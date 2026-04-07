import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../api/axios'

const SECTION_CONFIG = {
  projects: {
    endpoint: '/projects',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'githubLink', label: 'GitHub URL', type: 'url' },
      { name: 'liveLink', label: 'Live URL', type: 'url' },
    ],
    display: (item) => item.title,
    sub: (item) => item.description,
  },
  skills: {
    endpoint: '/skills',
    fields: [
      { name: 'name', label: 'Skill Name', type: 'text' },
      { name: 'level', label: 'Level (Beginner/Intermediate/Expert)', type: 'text' },
    ],
    display: (item) => item.name,
    sub: (item) => item.level,
  },
  experiences: {
    endpoint: '/experiences',
    fields: [
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    display: (item) => item.role,
    sub: (item) => item.company,
  },
  certificates: {
    endpoint: '/certificates',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'issuer', label: 'Issuer', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'fileUrl', label: 'File URL', type: 'url' },
    ],
    display: (item) => item.title,
    sub: (item) => item.issuer,
  },
  internships: {
    endpoint: '/internships',
    fields: [
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'certificateUrl', label: 'Certificate URL', type: 'url' },
    ],
    display: (item) => item.role,
    sub: (item) => item.company,
  },
}

function buildEmpty(fields) {
  return fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})
}

export default function SectionManager({ section, items, onRefresh }) {
  const config = SECTION_CONFIG[section]
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(buildEmpty(config.fields))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setShowForm(false)
    setEditing(null)
    setForm(buildEmpty(config.fields))
  }, [section])

  const openAdd = () => {
    setEditing(null)
    setForm(buildEmpty(config.fields))
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditing(item.id)
    setForm(config.fields.reduce((acc, f) => ({ ...acc, [f.name]: item[f.name] || '' }), {}))
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        await api.put(`${config.endpoint}/${editing}`, form)
      } else {
        await api.post(config.endpoint, form)
      }
      setShowForm(false)
      onRefresh()
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    await api.delete(`${config.endpoint}/${id}`)
    onRefresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold capitalize text-white">{section}</h3>
        <button
          onClick={openAdd}
          className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition"
        >
          + Add
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4 space-y-3 overflow-hidden"
          >
            {config.fields.map((f) => (
              <div key={f.name}>
                <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none transition"
                  />
                ) : (
                  <input
                    type={f.type}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                {loading ? 'Saving...' : editing ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {items?.length === 0 && (
          <p className="text-gray-600 text-sm italic">No {section} added yet.</p>
        )}
        <AnimatePresence>
          {items?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-white">{config.display(item)}</p>
                {config.sub(item) && (
                  <p className="text-xs text-gray-400 mt-0.5">{config.sub(item)}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
