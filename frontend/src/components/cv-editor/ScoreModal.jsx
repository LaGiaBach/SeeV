import Modal from '../Modal'
import { computeCvScore } from '../../utils/cvScore'

const LABEL_STYLES = {
  'Yếu': 'text-red-600 dark:text-red-400',
  'Khá': 'text-orange-600 dark:text-orange-400',
  'Tốt': 'text-brand-600 dark:text-brand-400',
  'Xuất sắc': 'text-emerald-600 dark:text-emerald-400',
}

function ScoreModal({ open, onClose, cv }) {
  if (!cv) return null
  const { score, label, suggestions } = computeCvScore(cv)

  return (
    <Modal open={open} onClose={onClose} title="Chấm điểm CV">
      <div className="flex items-center gap-5 mb-6">
        <div className="text-4xl font-bold text-gray-900 dark:text-white">{score}</div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${LABEL_STYLES[label]}`}>{label}</p>
          <div className="mt-1.5 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${score}%` }} />
          </div>
        </div>
      </div>

      {suggestions.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Gợi ý cải thiện</p>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mt-0.5 shrink-0 text-brand-600 dark:text-brand-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">CV của bạn đã rất đầy đủ, tuyệt vời!</p>
      )}

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Điểm số hiện tính theo quy tắc độ đầy đủ dữ liệu. Gợi ý từ AI sẽ được bổ sung sau.
      </p>
    </Modal>
  )
}

export default ScoreModal
