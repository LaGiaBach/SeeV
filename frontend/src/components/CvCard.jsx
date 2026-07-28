import { useEffect, useRef, useState } from 'react'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function CvCard({ cv, onEdit, onDuplicate, onShare, onDelete, onPrint }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  function handleAction(action) {
    setMenuOpen(false)
    action?.(cv)
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-brand-900/5 hover:border-brand-200 dark:hover:border-brand-500/40 hover:z-10 transition">
      <div className={`relative rounded-t-2xl overflow-hidden aspect-3/4 bg-linear-to-br ${cv.accent} flex items-center justify-center`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="white"
          className="w-16 h-16 opacity-80"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m-9 5h12a2 2 0 002-2V6a2 2 0 00-2-2H8.5L5 7.5V19a2 2 0 002 2z"
          />
        </svg>

        <div ref={menuRef} className="absolute bottom-2 right-2">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 shadow hover:bg-white dark:hover:bg-gray-900 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full right-0 z-20 mb-2 w-36 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-lg">
              <button
                type="button"
                onClick={() => handleAction(onEdit)}
                className="block w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Chỉnh sửa
              </button>
              <button
                type="button"
                onClick={() => handleAction(onDuplicate)}
                className="block w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Sao chép
              </button>
              <button
                type="button"
                onClick={() => handleAction(onShare)}
                className="block w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Chia sẻ
              </button>
              <button
                type="button"
                onClick={() => handleAction(onPrint)}
                className="block w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                In
              </button>
              <button
                type="button"
                onClick={() => handleAction(onDelete)}
                className="block w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                Xoá
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white leading-snug line-clamp-2">{cv.title}</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Mẫu: {cv.template}</p>
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Cập nhật: {formatDate(cv.updatedAt)}</p>
      </div>
    </div>
  )
}

export default CvCard
