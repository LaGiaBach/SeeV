import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import CvCard from '../components/CvCard'
import ShareModal from '../components/ShareModal'
import { mockCvs } from '../data/mockCvs'

const SORT_OPTIONS = [
  { value: 'updated_desc', label: 'Cập nhật gần đây' },
  { value: 'updated_asc', label: 'Cập nhật lâu nhất' },
  { value: 'name_asc', label: 'Tên A-Z' },
  { value: 'name_desc', label: 'Tên Z-A' },
]

// TODO: thay mockCvs bằng dữ liệu từ GET /api/cvs khi tích hợp API
// TODO: onDelete -> DELETE /api/cvs/:id, onDuplicate -> POST /api/cvs, onPrint -> xuất bản in CV
function Dashboard() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [cvs, setCvs] = useState(mockCvs)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('updated_desc')
  const [shareTarget, setShareTarget] = useState(null)

  const visibleCvs = useMemo(() => {
    const filtered = cvs.filter((cv) => cv.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'updated_asc':
          return new Date(a.updatedAt) - new Date(b.updatedAt)
        case 'name_asc':
          return a.title.localeCompare(b.title)
        case 'name_desc':
          return b.title.localeCompare(a.title)
        case 'updated_desc':
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt)
      }
    })
  }, [cvs, searchTerm, sortBy])

  function handleDelete(cv) {
    setCvs((prev) => prev.filter((item) => item.id !== cv.id))
  }

  function handlePrint() {
    window.print()
  }

  function handleEdit(cv) {
    navigate(`/cv/${cv.id}`)
  }

  function handleDuplicate(cv) {
    const copy = { ...cv, id: `${cv.id}-copy-${Date.now()}`, title: `${cv.title} (Bản sao)`, updatedAt: new Date().toISOString() }
    setCvs((prev) => [copy, ...prev])
  }

  function handleShare(cv) {
    setShareTarget(cv)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">CV của tôi</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{cvs.length} CV đã tạo</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/cv/new')}
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 active:bg-brand-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tạo CV mới
          </button>
        </header>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm CV theo tên..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => navigate('/cv/new')}
              className="aspect-3/4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm font-medium">Tạo CV mới</span>
            </button>

            {visibleCvs.map((cv) => (
              <CvCard
                key={cv.id}
                cv={cv}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onShare={handleShare}
                onDelete={handleDelete}
                onPrint={handlePrint}
              />
            ))}
          </div>

          {cvs.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">Bạn chưa có CV nào. Hãy tạo CV đầu tiên!</p>
          )}

          {cvs.length > 0 && visibleCvs.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">Không tìm thấy CV nào phù hợp.</p>
          )}
        </div>
      </main>

      <ShareModal cv={shareTarget} onClose={() => setShareTarget(null)} />
    </div>
  )
}

export default Dashboard
