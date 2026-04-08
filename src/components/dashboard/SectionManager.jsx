import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../api/axios'

const SECTION_CONFIG = {
  projects: {
    endpoint: '/projects',
    fields: [
      { name: 'title',       label: 'Title',       type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'githubLink',  label: 'GitHub URL',  type: 'url' },
      { name: 'liveLink',    label: 'Live URL',    type: 'url' },
    ],
    display: (item) => item.title,
    sub: (item) => item.description,
  },
  skills: {
    endpoint: '/skills',
    fields: [
      { name: 'name',  label: 'Skill Name',                      type: 'text' },
      { name: 'level', label: 'Level (Beginner/Intermediate/Expert)', type: 'text' },
    ],
    display: (item) => item.name,
    sub: (item) => item.level,
  },
  experiences: {
    endpoint: '/experiences',
    fields: [
      { name: 'company',     label: 'Company',     type: 'text' },
      { name: 'role',        label: 'Role',        type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    display: (item) => item.role,
    sub: (item) => item.company,
  },
  certificates: {
    endpoint: '/certificates',
    fields: [
      { name: 'title',       label: 'Title',       type: 'text' },
      { name: 'issuer',      label: 'Issuer',      type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'fileUrl',     label: 'File URL',    type: 'url' },
    ],
    display: (item) => item.title,
    sub: (item) => item.issuer,
  },
  internships: {
    endpoint: '/internships',
    fields: [
      { name: 'company',        label: 'Company',         type: 'text' },
      { name: 'role',           label: 'Role',            type: 'text' },
      { name: 'description',    label: 'Description',     type: 'textarea' },
      { name: 'certificateUrl', label: 'Certificate URL', type: 'url' },
    ],
    display: (item) => item.role,
    sub: (item) => item.company,
  },
}

function buildEmpty(fields) {
  return fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})
}

const inputBase =
  'w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'

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
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {items?.length || 0} {items?.length === 1 ? 'item' : 'items'}
        </p>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm shadow-indigo-500/20 transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/25"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      {/* Add / Edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-5 space-y-4"
          >
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
              {editing ? 'Edit entry' : 'New entry'}
            </h5>

            {config.fields.map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  {f.label}
                </label>
                {f.type === 'textarea' ? (
                  <textarea
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    rows={3}
                    className={`${inputBase} resize-none`}
                  />
                ) : (
                  <input
                    type={f.type}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className={inputBase}
                  />
                )}
              </div>
            ))}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </>
                ) : editing ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Items list */}
      <div className="space-y-2">
        {items?.length === 0 && (
          <div className="text-center py-10 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-400 dark:text-gray-500">No entries yet. Click <strong>Add</strong> to get started.</p>
          </div>
        )}

        <AnimatePresence>
          {items?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {config.display(item)}
                </p>
                {config.sub(item) && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {config.sub(item)}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 ml-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => openEdit(item)}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all duration-200"
                  title="Edit"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Delete"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
