import Modal from '../Modal'
import TemplateCard from '../TemplateCard'
import { cvTemplates } from '../../data/cvTemplates'

function TemplateSwitcherModal({ open, onClose, onSelect }) {
  function handleSelect(template) {
    onSelect(template)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Đổi mẫu" maxWidth="max-w-4xl">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Chọn mẫu mới — nội dung bạn đã nhập sẽ được giữ nguyên, chỉ đổi màu sắc/giao diện.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cvTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} onUse={handleSelect} />
        ))}
      </div>
    </Modal>
  )
}

export default TemplateSwitcherModal
