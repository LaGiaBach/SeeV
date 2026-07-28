import { useRef } from 'react'

// contentEditable "không kiểm soát": chỉ commit giá trị lên state cha khi blur,
// không cập nhật khi đang gõ — tránh React re-render làm mất vị trí con trỏ.
function EditableText({ as: Tag = 'span', value, onCommit, placeholder, multiline = false, className = '' }) {
  const ref = useRef(null)

  function handleBlur() {
    const text = (ref.current?.innerText || '').replace(/\n+$/, '')
    if (text !== value) onCommit(text)
  }

  function handleKeyDown(e) {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      ref.current?.blur()
    }
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`cv-editable outline-none rounded px-0.5 -mx-0.5 focus:bg-brand-50 focus:ring-1 focus:ring-brand-300 transition ${className}`}
    >
      {value}
    </Tag>
  )
}

export default EditableText
