import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import EditorPanel from '../components/cv-editor/EditorPanel'
import CvPreview from '../components/cv-editor/CvPreview'
import { mockCvDetails, createBlankCv, createSampleCv } from '../data/mockCvDetails'
import { cvTemplates } from '../data/cvTemplates'

// TODO: khi tích hợp API — CV đã lưu thì GET /api/cvs/:id, chọn mẫu thì
// GET /api/templates/:templateId; lưu bằng POST /api/cvs (mới) hoặc PUT /api/cvs/:id (đã có).
function CvEditor() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const templateId = searchParams.get('template')
  const navigate = useNavigate()

  const template = templateId ? cvTemplates.find((t) => t.id === templateId) : null

  const [cv, setCv] = useState(() => {
    if (id && mockCvDetails[id]) return structuredClone(mockCvDetails[id])
    if (template) {
      return {
        ...structuredClone(createSampleCv()),
        title: `CV mới - ${template.name}`,
        templateId: template.id,
        themeColor: template.color,
      }
    }
    return createBlankCv()
  })

  function handleSave() {
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <header className="shrink-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition shrink-0"
            title="Quay lại"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <input
            value={cv.title}
            onChange={(e) => setCv({ ...cv, title: e.target.value })}
            className="min-w-0 flex-1 rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-brand-500 bg-transparent px-2 py-1.5 text-base font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
          {template && (
            <span className="shrink-0 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
              Mẫu: {template.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            In
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 active:bg-brand-800 transition"
          >
            Lưu CV
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <EditorPanel cv={cv} onChange={setCv} />

        <div className="flex-1 overflow-y-auto py-8 flex justify-center">
          <CvPreview cv={cv} />
        </div>
      </div>
    </div>
  )
}

export default CvEditor
