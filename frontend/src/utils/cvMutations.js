// Các hàm thuần cập nhật state CV, dùng chung giữa EditorPanel (form bên trái)
// và CvPreview (chỉnh sửa trực tiếp trên canvas) để tránh lệch logic giữa 2 nơi.

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export function updatePersonalField(cv, field, value) {
  return { ...cv, personal: { ...cv.personal, [field]: value } }
}

export function addExperienceItem(cv) {
  const item = { id: generateId(), role: '', company: '', start: '', end: '', description: '' }
  return { ...cv, experience: [...cv.experience, item] }
}

export function updateExperienceItem(cv, id, field, value) {
  return { ...cv, experience: cv.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)) }
}

export function removeExperienceItem(cv, id) {
  return { ...cv, experience: cv.experience.filter((item) => item.id !== id) }
}

export function addEducationItem(cv) {
  const item = { id: generateId(), school: '', degree: '', start: '', end: '' }
  return { ...cv, education: [...cv.education, item] }
}

export function updateEducationItem(cv, id, field, value) {
  return { ...cv, education: cv.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)) }
}

export function removeEducationItem(cv, id) {
  return { ...cv, education: cv.education.filter((item) => item.id !== id) }
}

export function addSkill(cv, value) {
  const text = value.trim()
  if (!text) return cv
  return { ...cv, skills: [...cv.skills, text] }
}

export function updateSkill(cv, index, value) {
  return { ...cv, skills: cv.skills.map((s, i) => (i === index ? value : s)) }
}

export function removeSkill(cv, index) {
  return { ...cv, skills: cv.skills.filter((_, i) => i !== index) }
}

export function reorderSections(cv, from, to) {
  if (from === to) return cv
  const next = [...cv.sectionsOrder]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return { ...cv, sectionsOrder: next }
}

export function addCustomSection(cv) {
  const id = generateId()
  return {
    ...cv,
    customSections: [...(cv.customSections || []), { id, title: 'Mục mới', content: '' }],
    sectionsOrder: [...cv.sectionsOrder, `custom:${id}`],
  }
}

export function updateCustomSection(cv, id, field, value) {
  return { ...cv, customSections: cv.customSections.map((s) => (s.id === id ? { ...s, [field]: value } : s)) }
}

export function removeCustomSection(cv, id) {
  return {
    ...cv,
    customSections: cv.customSections.filter((s) => s.id !== id),
    sectionsOrder: cv.sectionsOrder.filter((key) => key !== `custom:${id}`),
  }
}
