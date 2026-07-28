import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import EditorPanel from '../components/cv-editor/EditorPanel'
import CvPreview from '../components/cv-editor/CvPreview'
import TemplateSwitcherModal from '../components/cv-editor/TemplateSwitcherModal'
import ScoreModal from '../components/cv-editor/ScoreModal'
import VersionHistoryModal from '../components/cv-editor/VersionHistoryModal'
import { mockCvDetails, createBlankCv, createSampleCv } from '../data/mockCvDetails'
import { cvTemplates } from '../data/cvTemplates'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

const PAPER_SIZE_OPTIONS = [
  { value: 'a4', label: 'A4' },
  { value: 'letter', label: 'Letter' },
]

const TOOLBAR_BUTTON_CLASS =
  'shrink-0 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition'

// TODO: khi tích hợp API — CV đã lưu thì GET /api/cvs/:id, chọn mẫu thì
// GET /api/templates/:templateId; lưu bằng POST /api/cvs (mới) hoặc PUT /api/cvs/:id (đã có).
// TODO: autosave/lịch sử phiên bản hiện chỉ lưu tạm trong bộ nhớ phiên làm việc,
// cần PUT /api/cvs/:id định kỳ + GET /api/cvs/:id/versions khi có backend.
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

  const [activeModal, setActiveModal] = useState(null)
  const [history, setHistory] = useState([])
  const [lastSavedAt, setLastSavedAt] = useState(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timeout = setTimeout(() => {
      setLastSavedAt(new Date())
      setHistory((prev) => [{ id: generateId(), timestamp: new Date(), cv: structuredClone(cv) }, ...prev].slice(0, 10))
    }, 1500)

    return () => clearTimeout(timeout)
  }, [cv])

  function handleSave() {
    navigate('/dashboard')
  }

  function handleSelectTemplate(newTemplate) {
    setCv((prev) => ({ ...prev, themeColor: newTemplate.color, templateId: newTemplate.id }))
  }

  function handleRestore(snapshot) {
    setCv(structuredClone(snapshot.cv))
  }

  return (
    <div className="print-cv-page flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
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

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500">
            {lastSavedAt ? `Đã lưu lúc ${lastSavedAt.toLocaleTimeString('vi-VN')}` : 'Chưa có thay đổi'}
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 active:bg-brand-800 transition"
          >
            Lưu CV
          </button>
        </div>
      </header>

      <div className="shrink-0 h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1 shrink-0">
          {PAPER_SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setCv({ ...cv, paperSize: opt.value })}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                (cv.paperSize || 'a4') === opt.value
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => setActiveModal('history')} className={TOOLBAR_BUTTON_CLASS}>
            Lịch sử
          </button>
          <button type="button" onClick={() => setActiveModal('score')} className={TOOLBAR_BUTTON_CLASS}>
            Chấm điểm CV
          </button>
          <button type="button" onClick={() => setActiveModal('template')} className={TOOLBAR_BUTTON_CLASS}>
            Đổi mẫu
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            title="Chọn 'Lưu dưới dạng PDF' trong hộp thoại in"
            className={TOOLBAR_BUTTON_CLASS}
          >
            Tải PDF
          </button>
          <button type="button" onClick={() => window.print()} className={TOOLBAR_BUTTON_CLASS}>
            In
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <EditorPanel cv={cv} onChange={setCv} />

        <div className="flex-1 overflow-y-auto py-8 flex justify-center">
          <CvPreview cv={cv} onChange={setCv} />
        </div>
      </div>

      <TemplateSwitcherModal
        open={activeModal === 'template'}
        onClose={() => setActiveModal(null)}
        onSelect={handleSelectTemplate}
      />
      <ScoreModal open={activeModal === 'score'} onClose={() => setActiveModal(null)} cv={cv} />
      <VersionHistoryModal
        open={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
        history={history}
        onRestore={handleRestore}
      />
    </div>
  )
}

export default CvEditor
