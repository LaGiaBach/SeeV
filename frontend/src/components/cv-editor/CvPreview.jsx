import { useRef, useState } from 'react'
import { SECTION_META } from '../../data/mockCvDetails'
import EditableText from './EditableText'
import {
  updatePersonalField,
  addExperienceItem,
  updateExperienceItem,
  removeExperienceItem,
  addEducationItem,
  updateEducationItem,
  removeEducationItem,
  addSkill,
  updateSkill,
  removeSkill,
  reorderSections,
  updateCustomSection,
  removeCustomSection,
} from '../../utils/cvMutations'

// Class Tailwind phải viết literal (không nội suy) để JIT scan nhận diện được.
const PAPER_SIZES = {
  a4: 'max-w-[794px] min-h-[1123px]',
  letter: 'max-w-[816px] min-h-[1056px]',
}

const THEME_STYLES = {
  brand: { headingText: 'text-brand-700', headingBorder: 'border-brand-600', accent: 'text-brand-600', avatar: 'bg-brand-100 text-brand-700', pill: 'bg-brand-50 text-brand-700' },
  slate: { headingText: 'text-slate-700', headingBorder: 'border-slate-600', accent: 'text-slate-600', avatar: 'bg-slate-100 text-slate-700', pill: 'bg-slate-50 text-slate-700' },
  fuchsia: { headingText: 'text-fuchsia-700', headingBorder: 'border-fuchsia-600', accent: 'text-fuchsia-600', avatar: 'bg-fuchsia-100 text-fuchsia-700', pill: 'bg-fuchsia-50 text-fuchsia-700' },
  emerald: { headingText: 'text-emerald-700', headingBorder: 'border-emerald-600', accent: 'text-emerald-600', avatar: 'bg-emerald-100 text-emerald-700', pill: 'bg-emerald-50 text-emerald-700' },
  gray: { headingText: 'text-gray-700', headingBorder: 'border-gray-600', accent: 'text-gray-600', avatar: 'bg-gray-100 text-gray-700', pill: 'bg-gray-100 text-gray-700' },
  indigo: { headingText: 'text-indigo-700', headingBorder: 'border-indigo-600', accent: 'text-indigo-600', avatar: 'bg-indigo-100 text-indigo-700', pill: 'bg-indigo-50 text-indigo-700' },
  orange: { headingText: 'text-orange-700', headingBorder: 'border-orange-600', accent: 'text-orange-600', avatar: 'bg-orange-100 text-orange-700', pill: 'bg-orange-50 text-orange-700' },
  rose: { headingText: 'text-rose-700', headingBorder: 'border-rose-600', accent: 'text-rose-600', avatar: 'bg-rose-100 text-rose-700', pill: 'bg-rose-50 text-rose-700' },
  sky: { headingText: 'text-sky-700', headingBorder: 'border-sky-600', accent: 'text-sky-600', avatar: 'bg-sky-100 text-sky-700', pill: 'bg-sky-50 text-sky-700' },
  cyan: { headingText: 'text-cyan-700', headingBorder: 'border-cyan-600', accent: 'text-cyan-600', avatar: 'bg-cyan-100 text-cyan-700', pill: 'bg-cyan-50 text-cyan-700' },
  violet: { headingText: 'text-violet-700', headingBorder: 'border-violet-600', accent: 'text-violet-600', avatar: 'bg-violet-100 text-violet-700', pill: 'bg-violet-50 text-violet-700' },
  teal: { headingText: 'text-teal-700', headingBorder: 'border-teal-600', accent: 'text-teal-600', avatar: 'bg-teal-100 text-teal-700', pill: 'bg-teal-50 text-teal-700' },
  amber: { headingText: 'text-amber-700', headingBorder: 'border-amber-600', accent: 'text-amber-600', avatar: 'bg-amber-100 text-amber-700', pill: 'bg-amber-50 text-amber-700' },
}

const DRAG_HANDLE_CLASS =
  'print:hidden cursor-grab select-none text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-500 transition'
const REMOVE_BUTTON_CLASS = 'print:hidden opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition'
const ITEM_REMOVE_BUTTON_CLASS =
  'print:hidden absolute -right-1 -top-1 opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-500 transition leading-none px-1'
const ADD_BUTTON_CLASS =
  'print:hidden w-full rounded-lg border border-dashed border-gray-300 py-1.5 text-xs text-gray-400 hover:border-brand-400 hover:text-brand-600 transition'

function CvPreview({ cv, onChange }) {
  const { personal, experience, education, skills, sectionsOrder } = cv
  const theme = THEME_STYLES[cv.themeColor] || THEME_STYLES.brand
  const avatarInputRef = useRef(null)
  const [dragIndex, setDragIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  function handleAvatarPick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(updatePersonalField(cv, 'avatar', reader.result))
    reader.readAsDataURL(file)
  }

  function handleDrop(index) {
    if (dragIndex !== null && dragIndex !== index) onChange(reorderSections(cv, dragIndex, index))
    setDragIndex(null)
    setDragOverIndex(null)
  }

  function renderSectionShell(key, index, labelNode, content, { removable = false } = {}) {
    const highlighted = dragOverIndex === index && dragIndex !== index
    return (
      <section
        key={key}
        className="group relative mb-6"
        onDragOver={(e) => {
          e.preventDefault()
          setDragOverIndex(index)
        }}
        onDragLeave={() => setDragOverIndex((prev) => (prev === index ? null : prev))}
        onDrop={() => handleDrop(index)}
      >
        <div
          className={`flex items-center gap-2 pb-1 mb-3 border-b-2 transition ${theme.headingText} ${
            highlighted ? 'border-brand-400' : theme.headingBorder
          }`}
        >
          <span
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragEnd={() => {
              setDragIndex(null)
              setDragOverIndex(null)
            }}
            className={DRAG_HANDLE_CLASS}
            title="Kéo để sắp xếp"
          >
            ⠿
          </span>
          <h2 className="flex-1 text-sm font-semibold uppercase tracking-wide">{labelNode}</h2>
          {removable && (
            <button
              type="button"
              onClick={() => onChange(removeCustomSection(cv, key.slice('custom:'.length)))}
              className={REMOVE_BUTTON_CLASS}
              title="Xoá mục"
            >
              ×
            </button>
          )}
        </div>
        {content}
      </section>
    )
  }

  function renderSection(key, index) {
    if (key === 'summary') {
      return renderSectionShell(
        key,
        index,
        SECTION_META.summary.label,
        <EditableText
          as="p"
          value={cv.summary}
          onCommit={(v) => onChange({ ...cv, summary: v })}
          placeholder="Mô tả ngắn gọn về bản thân, mục tiêu nghề nghiệp..."
          multiline
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
        />
      )
    }

    if (key === 'experience') {
      return renderSectionShell(
        key,
        index,
        SECTION_META.experience.label,
        <div className="space-y-4">
          {experience.map((item) => (
            <div key={item.id} className="group/item relative">
              <button
                type="button"
                onClick={() => onChange(removeExperienceItem(cv, item.id))}
                className={ITEM_REMOVE_BUTTON_CLASS}
                title="Xoá mục này"
              >
                ×
              </button>
              <div className="flex items-baseline justify-between gap-2 pr-4">
                <p className="text-sm font-medium text-gray-900">
                  <EditableText
                    value={item.role}
                    onCommit={(v) => onChange(updateExperienceItem(cv, item.id, 'role', v))}
                    placeholder="Vị trí công việc"
                  />
                  {' · '}
                  <EditableText
                    value={item.company}
                    onCommit={(v) => onChange(updateExperienceItem(cv, item.id, 'company', v))}
                    placeholder="Tên công ty"
                    className="font-normal text-gray-600"
                  />
                </p>
                <p className="shrink-0 text-xs text-gray-500">
                  <EditableText
                    value={item.start}
                    onCommit={(v) => onChange(updateExperienceItem(cv, item.id, 'start', v))}
                    placeholder="Bắt đầu"
                  />
                  {' — '}
                  <EditableText
                    value={item.end}
                    onCommit={(v) => onChange(updateExperienceItem(cv, item.id, 'end', v))}
                    placeholder="Kết thúc"
                  />
                </p>
              </div>
              <EditableText
                as="p"
                value={item.description}
                onCommit={(v) => onChange(updateExperienceItem(cv, item.id, 'description', v))}
                placeholder="Mô tả công việc, trách nhiệm chính và thành tích đạt được..."
                multiline
                className="mt-1 text-sm text-gray-600 leading-relaxed whitespace-pre-line"
              />
            </div>
          ))}
          <button type="button" onClick={() => onChange(addExperienceItem(cv))} className={ADD_BUTTON_CLASS}>
            + Thêm kinh nghiệm
          </button>
        </div>
      )
    }

    if (key === 'education') {
      return renderSectionShell(
        key,
        index,
        SECTION_META.education.label,
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.id} className="group/item relative flex items-baseline justify-between gap-2 pr-4">
              <button
                type="button"
                onClick={() => onChange(removeEducationItem(cv, item.id))}
                className={ITEM_REMOVE_BUTTON_CLASS}
                title="Xoá mục này"
              >
                ×
              </button>
              <p className="text-sm font-medium text-gray-900">
                <EditableText
                  value={item.degree}
                  onCommit={(v) => onChange(updateEducationItem(cv, item.id, 'degree', v))}
                  placeholder="Ngành học"
                />
                {' · '}
                <EditableText
                  value={item.school}
                  onCommit={(v) => onChange(updateEducationItem(cv, item.id, 'school', v))}
                  placeholder="Tên trường"
                  className="font-normal text-gray-600"
                />
              </p>
              <p className="shrink-0 text-xs text-gray-500">
                <EditableText
                  value={item.start}
                  onCommit={(v) => onChange(updateEducationItem(cv, item.id, 'start', v))}
                  placeholder="Bắt đầu"
                />
                {' — '}
                <EditableText
                  value={item.end}
                  onCommit={(v) => onChange(updateEducationItem(cv, item.id, 'end', v))}
                  placeholder="Kết thúc"
                />
              </p>
            </div>
          ))}
          <button type="button" onClick={() => onChange(addEducationItem(cv))} className={ADD_BUTTON_CLASS}>
            + Thêm học vấn
          </button>
        </div>
      )
    }

    if (key === 'skills') {
      return renderSectionShell(
        key,
        index,
        SECTION_META.skills.label,
        <div className="flex flex-wrap items-center gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className={`group/skill relative flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${theme.pill}`}
            >
              <EditableText value={skill} onCommit={(v) => onChange(updateSkill(cv, i, v))} placeholder="Kỹ năng" />
              <button
                type="button"
                onClick={() => onChange(removeSkill(cv, i))}
                className="print:hidden opacity-0 group-hover/skill:opacity-100 hover:text-red-600 transition leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => onChange(addSkill(cv, 'Kỹ năng mới'))}
            className="print:hidden rounded-full border border-dashed border-gray-300 px-3 py-1 text-xs text-gray-400 hover:border-brand-400 hover:text-brand-600 transition"
          >
            + Thêm
          </button>
        </div>
      )
    }

    if (key.startsWith('custom:')) {
      const id = key.slice('custom:'.length)
      const section = cv.customSections?.find((s) => s.id === id)
      if (!section) return null
      return renderSectionShell(
        key,
        index,
        <EditableText value={section.title} onCommit={(v) => onChange(updateCustomSection(cv, id, 'title', v))} placeholder="Tiêu đề mục" />,
        <EditableText
          as="p"
          value={section.content}
          onCommit={(v) => onChange(updateCustomSection(cv, id, 'content', v))}
          placeholder="Chứng chỉ, dự án, giải thưởng..."
          multiline
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
        />,
        { removable: true }
      )
    }

    return null
  }

  return (
    <div
      id="cv-preview-page"
      className={`w-full ${PAPER_SIZES[cv.paperSize] || PAPER_SIZES.a4} bg-white shadow-lg shadow-black/10 p-10 text-gray-900`}
    >
      <header className="mb-8 pb-6 border-b border-gray-200 flex items-center gap-5">
        <div className="group/avatar relative shrink-0">
          <div className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-2xl font-semibold ${theme.avatar}`}>
            {personal.avatar ? (
              <img src={personal.avatar} alt={personal.fullName} className="w-full h-full object-cover" />
            ) : (
              personal.fullName?.trim()?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="print:hidden absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white text-[11px] font-medium opacity-0 group-hover/avatar:opacity-100 transition"
            title="Đổi ảnh đại diện"
          >
            Đổi ảnh
          </button>
          <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarPick} className="hidden" />
        </div>

        <div className="min-w-0 flex-1">
          <EditableText
            as="h1"
            value={personal.fullName}
            onCommit={(v) => onChange(updatePersonalField(cv, 'fullName', v))}
            placeholder="Họ và tên"
            className="text-2xl font-bold text-gray-900"
          />
          <EditableText
            value={personal.title}
            onCommit={(v) => onChange(updatePersonalField(cv, 'title', v))}
            placeholder="Vị trí ứng tuyển"
            className={`inline-block font-medium ${theme.accent}`}
          />
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <EditableText value={personal.email} onCommit={(v) => onChange(updatePersonalField(cv, 'email', v))} placeholder="Email" />
            <EditableText value={personal.phone} onCommit={(v) => onChange(updatePersonalField(cv, 'phone', v))} placeholder="Số điện thoại" />
            <EditableText value={personal.address} onCommit={(v) => onChange(updatePersonalField(cv, 'address', v))} placeholder="Địa chỉ" />
          </div>
        </div>
      </header>

      {sectionsOrder.map((key, index) => renderSection(key, index))}
    </div>
  )
}

export default CvPreview
