import { useState } from 'react'
import { getSectionLabel } from '../../data/mockCvDetails'
import {
  updatePersonalField,
  addExperienceItem,
  updateExperienceItem,
  removeExperienceItem,
  addEducationItem,
  updateEducationItem,
  removeEducationItem,
  addSkill as addSkillMutation,
  removeSkill as removeSkillMutation,
  reorderSections,
  addCustomSection as addCustomSectionMutation,
  updateCustomSection as updateCustomSectionMutation,
  removeCustomSection as removeCustomSectionMutation,
} from '../../utils/cvMutations'

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
    onChange(updatePersonalField(cv, field, value))
  }

  function handleDrop(index) {
    if (dragIndex !== null && dragIndex !== index) onChange(reorderSections(cv, dragIndex, index))
    setDragIndex(null)
    setDragOverIndex(null)
  }

  function addExperience() {
    onChange(addExperienceItem(cv))
  }

  function updateExperience(id, field, value) {
    onChange(updateExperienceItem(cv, id, field, value))
  }

  function removeExperience(id) {
    onChange(removeExperienceItem(cv, id))
  }

  function addEducation() {
    onChange(addEducationItem(cv))
  }

  function updateEducation(id, field, value) {
    onChange(updateEducationItem(cv, id, field, value))
  }

  function removeEducation(id) {
    onChange(removeEducationItem(cv, id))
  }

  function addSkill() {
    if (!skillInput.trim()) return
    onChange(addSkillMutation(cv, skillInput))
    setSkillInput('')
  }

  function removeSkill(index) {
    onChange(removeSkillMutation(cv, index))
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updatePersonal('avatar', reader.result)
    reader.readAsDataURL(file)
  }

  function addCustomSection() {
    const next = addCustomSectionMutation(cv)
    onChange(next)
    const newKey = next.sectionsOrder[next.sectionsOrder.length - 1]
    setExpanded(newKey)
  }

  function updateCustomSection(id, field, value) {
    onChange(updateCustomSectionMutation(cv, id, field, value))
  }

  function removeCustomSection(id) {
    onChange(removeCustomSectionMutation(cv, id))
  }

  function renderSectionBody(key) {
    if (key.startsWith('custom:')) {
      const id = key.slice('custom:'.length)
      const section = cv.customSections.find((s) => s.id === id)
      if (!section) return null
      return (
        <div className="space-y-2">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeCustomSection(id)}
              className="text-xs text-red-600 dark:text-red-400 hover:underline"
            >
              Xoá mục này
            </button>
          </div>
          <Field
            label="Tiêu đề mục"
            value={section.title}
            onChange={(e) => updateCustomSection(id, 'title', e.target.value)}
          />
          <TextArea
            label="Nội dung"
            value={section.content}
            onChange={(e) => updateCustomSection(id, 'content', e.target.value)}
            placeholder="Chứng chỉ, dự án, giải thưởng..."
          />
        </div>
      )
    }

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

        <div className="flex items-center gap-3 pb-2">
          <div className="w-14 h-14 shrink-0 rounded-full bg-brand-100 dark:bg-brand-500/15 overflow-hidden flex items-center justify-center text-lg font-semibold text-brand-700 dark:text-brand-400">
            {cv.personal.avatar ? (
              <img src={cv.personal.avatar} alt="Ảnh đại diện" className="w-full h-full object-cover" />
            ) : (
              cv.personal.fullName?.trim()?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer text-center">
              Tải ảnh lên
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            {cv.personal.avatar && (
              <button
                type="button"
                onClick={() => updatePersonal('avatar', null)}
                className="text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                Xoá ảnh
              </button>
            )}
          </div>
        </div>

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
                  {getSectionLabel(cv, key)}
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

        <button
          type="button"
          onClick={addCustomSection}
          className="mt-2 w-full rounded-lg border border-dashed border-gray-300 dark:border-gray-600 py-2 text-sm text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 transition"
        >
          + Thêm mục tùy chỉnh
        </button>
      </div>
    </div>
  )
}

export default EditorPanel
