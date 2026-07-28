import Modal from '../Modal'

function formatTime(date) {
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function VersionHistoryModal({ open, onClose, history, onRestore }) {
  return (
    <Modal open={open} onClose={onClose} title="Lịch sử phiên bản">
      {history.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chưa có phiên bản nào được lưu. Bản ghi tự động xuất hiện khi bạn chỉnh sửa CV.
        </p>
      ) : (
        <ul className="space-y-2">
          {history.map((snapshot) => (
            <li
              key={snapshot.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5"
            >
              <span className="text-sm text-gray-700 dark:text-gray-200">{formatTime(snapshot.timestamp)}</span>
              <button
                type="button"
                onClick={() => {
                  onRestore(snapshot)
                  onClose()
                }}
                className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                Khôi phục
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Lịch sử hiện chỉ lưu tạm trong phiên làm việc này. Khi có backend, các phiên bản sẽ được lưu vĩnh viễn.
      </p>
    </Modal>
  )
}

export default VersionHistoryModal
