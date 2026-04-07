import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

// Templates
import MinimalTemplate from '../components/templates/MinimalTemplate'
import ModernTemplate from '../components/templates/ModernTemplate'
import DarkProTemplate from '../components/templates/DarkProTemplate'
import GlassTemplate from '../components/templates/GlassTemplate'
import BoldTemplate from '../components/templates/BoldTemplate'

export default function Portfolio() {
  const { username } = useParams()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/portfolio/${username}`)
      .then(({ data }) => setPortfolio(data))
      .catch(() => setError('Portfolio not found.'))
      .finally(() => setLoading(false))
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 dark:bg-gray-950 bg-white">
        <div className="w-8 h-8 border-2 border-indigo-500 dark:border-indigo-500 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 dark:bg-gray-950 bg-white">
        <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-lg">{error}</p>
      </div>
    )
  }

  // TEMPLATE REGISTRY (Phase 2 system)
  const templates = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    dark: DarkProTemplate,
    glass: GlassTemplate,
    bold: BoldTemplate,
  }

  const templateKey = portfolio?.selectedTemplate || 'minimal'

  const TemplateComponent =
    templates[templateKey] || templates.minimal

  return <TemplateComponent portfolio={portfolio} />
}