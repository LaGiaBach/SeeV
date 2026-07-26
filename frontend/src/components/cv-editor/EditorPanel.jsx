import { useState } from 'react'
import { SECTION_META } from '../../data/mockCvDetails'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
      />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</span>
      <textarea
        {...props}
        rows={3}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition resize-none"
      />
    </label>
  )
}

function EditorPanel({ cv, onChange }) {
  const [expanded, setExpanded] = useState('summary')
  const [dragIndex, setDragIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [skillInput, setSkillInput] = useState('')

  function updatePersonal(field, value) {
    onChange({ ...cv, personal: { ...cv.personal, [field]: value } })
  }

  function reorder(from, to) {
    const next = [...cv.sectionsOrder]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    onChange({ ...cv, sectionsOrder: next })
  }

  function handleDrop(index) {
    if (dragIndex !== null && dragIndex !== index) reorder(dragIndex, index)
    setDragIndex(null)
    setDragOverIndex(null)
  }

  function addExperience() {
    const item = { id: generateId(), role: '', company: '', start: '', end: '', description: '' }
    onChange({ ...cv, experience: [...cv.experience, item] })
  }

  function updateExperience(id, field, value) {
    onChange({
      ...cv,
      experience: cv.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  function removeExperience(id) {
    onChange({ ...cv, experience: cv.experience.filter((item) => item.id !== id) })
  }

  function addEducation() {
    const item = { id: generateId(), school: '', degree: '', start: '', end: '' }
    onChange({ ...cv, education: [...cv.education, item] })
  }

  function updateEducation(id, field, value) {
    onChange({
      ...cv,
      education: cv.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  function removeEducation(id) {
    onChange({ ...cv, education: cv.education.filter((item) => item.id !== id) })
  }

  function addSkill() {
    const value = skillInput.trim()
    if (!value) return
    onChange({ ...cv, skills: [...cv.skills, value] })
    setSkillInput('')
  }

  function removeSkill(index) {
    onChange({ ...cv, skills: cv.skills.filter((_, i) => i !== index) })
  }

  function renderSectionBody(key) {
    switch (key) {
      case 'summary':
        return (
          <TextArea
            label="Nội dung"
            value={cv.summary}
            onChange={(e) => onChange({ ...cv, summary: e.target.value })}
            placeholder="Mô tả ngắn gọn về bản thân, mục tiêu nghề nghiệp..."
          />
        )

      case 'experience':
        return (
          <div className="space-y-4">
            {cv.experience.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeExperience(item.id)}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Xoá mục này
                  </button>
                </div>
                <Field
                  label="Vị trí"
                  value={item.role}
                  onChange={(e) => updateExperience(item.id, 'role', e.target.value)}
                />
                <Field
                  label="Công ty"
                  value={item.company}
                  onChange={(e) => updateExperience(item.id, 'company', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Bắt đầu"
                    value={item.start}
                    onChange={(e) => updateExperience(item.id, 'start', e.target.value)}
                  />
                  <Field
                    label="Kết thúc"
                    value={item.end}
                    onChange={(e) => updateExperience(item.id, 'end', e.target.value)}
                  />
                </div>
                <TextArea
                  label="Mô tả"
                  value={item.description}
                  onChange={(e) => updateExperience(item.id, 'description', e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="w-full rounded-lg border border-dashed border-gray-300 dark:border-gray-600 py-2 text-sm text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 transition"
            >
              + Thêm kinh nghiệm
            </button>
          </div>
        )

      case 'education':
        return (
          <div className="space-y-4">
            {cv.education.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeEducation(item.id)}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Xoá mục này
                  </button>
                </div>
                <Field
                  label="Trường"
                  value={item.school}
                  onChange={(e) => updateEducation(item.id, 'school', e.target.value)}
                />
                <Field
                  label="Ngành / Bằng cấp"
                  value={item.degree}
                  onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Bắt đầu"
                    value={item.start}
                    onChange={(e) => updateEducation(item.id, 'start', e.target.value)}
                  />
                  <Field
                    label="Kết thúc"
                    value={item.end}
                    onChange={(e) => updateEducation(item.id, 'end', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="w-full rounded-lg border border-dashed border-gray-300 dark:border-gray-600 py-2 text-sm text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 transition"
            >
              + Thêm học vấn
            </button>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 rounded-full bg-brand-50 dark:bg-brand-500/15 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-400"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(i)} className="hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                placeholder="Nhập kỹ năng rồi Enter"
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
              <button
                type="button"
                onClick={addSkill}
                className="rounded-lg bg-brand-600 px-3 text-sm font-medium text-white hover:bg-brand-700 transition"
              >
                Thêm
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-96 shrink-0 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Thông tin cá nhân</h3>
        <Field label="Họ và tên" value={cv.personal.fullName} onChange={(e) => updatePersonal('fullName', e.target.value)} />
        <Field label="Vị trí ứng tuyển" value={cv.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} />
        <Field label="Email" value={cv.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} />
        <Field label="Số điện thoại" value={cv.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
        <Field label="Địa chỉ" value={cv.personal.address} onChange={(e) => updatePersonal('address', e.target.value)} />
      </div>

      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 px-1">
          Kéo biểu tượng ⠿ để sắp xếp lại thứ tự các mục trong CV
        </p>
        <div className="space-y-2">
          {cv.sectionsOrder.map((key, index) => (
            <div
              key={key}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOverIndex(index)
              }}
              onDragLeave={() => setDragOverIndex((prev) => (prev === index ? null : prev))}
              onDrop={() => handleDrop(index)}
              onDragEnd={() => {
                setDragIndex(null)
                setDragOverIndex(null)
              }}
              className={`rounded-lg border bg-gray-50 dark:bg-gray-900/50 transition ${
                dragOverIndex === index ? 'border-brand-400 ring-2 ring-brand-200 dark:ring-brand-500/30' : 'border-gray-200 dark:border-gray-700'
              } ${dragIndex === index ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="cursor-grab text-gray-400 select-none" title="Kéo để sắp xếp">
                  ⠿
                </span>
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => (prev === key ? null : key))}
                  className="flex-1 flex items-center justify-between text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {SECTION_META[key].label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 text-gray-400 transition-transform ${expanded === key ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {expanded === key && <div className="px-3 pb-3">{renderSectionBody(key)}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EditorPanel
