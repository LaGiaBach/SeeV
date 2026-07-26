import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TemplateCard from '../components/TemplateCard'
import { cvTemplates, cvTemplateCategories } from '../data/cvTemplates'

// TODO: thay cvTemplates bằng dữ liệu từ GET /api/templates khi tích hợp API
function Templates() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Tất cả')

  const filtered =
    activeCategory === 'Tất cả'
      ? cvTemplates
      : cvTemplates.filter((t) => t.category === activeCategory)

  function handleUse(template) {
    navigate(`/cv/new?template=${template.id}`)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Mẫu CV</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{cvTemplates.length} mẫu có sẵn</p>
          </div>
        </header>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {cvTemplateCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-brand-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} onUse={handleUse} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
              Không có mẫu nào trong danh mục này.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Templates
