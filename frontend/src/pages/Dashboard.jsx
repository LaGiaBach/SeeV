import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import CvCard from '../components/CvCard'
import { mockCvs } from '../data/mockCvs'

// TODO: thay mockCvs bằng dữ liệu từ GET /api/cvs khi tích hợp API
// TODO: onEdit -> điều hướng /cv/:id, onDelete -> DELETE /api/cvs/:id, onPrint -> xuất bản in CV
function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [cvs, setCvs] = useState(mockCvs)

  function handleDelete(cv) {
    setCvs((prev) => prev.filter((item) => item.id !== cv.id))
  }

  function handlePrint() {
    window.print()
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
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 active:bg-brand-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tạo CV mới
          </button>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              type="button"
              className="aspect-3/4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm font-medium">Tạo CV mới</span>
            </button>

            {cvs.map((cv) => (
              <CvCard key={cv.id} cv={cv} onDelete={handleDelete} onPrint={handlePrint} />
            ))}
          </div>

          {cvs.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">Bạn chưa có CV nào. Hãy tạo CV đầu tiên!</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
