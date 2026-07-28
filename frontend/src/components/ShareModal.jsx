import { useState } from 'react'
import Modal from './Modal'

function generateToken() {
  return Math.random().toString(36).slice(2, 10)
}

// TODO: khi tích hợp API — POST /api/cvs/:id/share để bật/tắt và lấy token thật.
function ShareModal({ cv, onClose }) {
  const [enabled, setEnabled] = useState(false)
  const [token] = useState(generateToken)
  const [copied, setCopied] = useState(false)

  const shareUrl = `https://seev.app/share/${token}`

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal open={Boolean(cv)} onClose={onClose} title="Chia sẻ CV">
      {cv && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chia sẻ công khai <span className="font-medium text-gray-700 dark:text-gray-200">{cv.title}</span> qua đường
            dẫn — bất kỳ ai có link đều xem được (chỉ xem, không chỉnh sửa).
          </p>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Bật chia sẻ công khai</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tắt để ẩn CV khỏi link đã chia sẻ</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={() => setEnabled((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                enabled ? 'bg-brand-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {enabled && (
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition"
              >
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

export default ShareModal
