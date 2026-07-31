// Cấu trúc dữ liệu 1 CV dùng cho trang editor (CV đã lưu tải qua GET /api/cvs/:id).
// TODO: chọn mẫu thì GET /api/templates/:templateId để lấy dữ liệu mẫu tương ứng theme đã chọn.

export const SECTION_META = {
  summary: { label: 'Mục tiêu nghề nghiệp' },
  experience: { label: 'Kinh nghiệm làm việc' },
  education: { label: 'Học vấn' },
  skills: { label: 'Kỹ năng' },
}

export function getSectionLabel(cv, key) {
  if (key.startsWith('custom:')) {
    const id = key.slice('custom:'.length)
    return cv.customSections?.find((s) => s.id === id)?.title || 'Mục tùy chỉnh'
  }
  return SECTION_META[key]?.label || key
}

const defaultSectionsOrder = ['summary', 'experience', 'education', 'skills']

export function createBlankCv() {
  return {
    title: 'CV chưa đặt tên',
    personal: { fullName: '', title: '', email: '', phone: '', address: '', avatar: null },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  }
}

export function createSampleCv() {
  return {
    title: 'CV mới từ mẫu',
    personal: {
      avatar: null,
      fullName: 'Nguyễn Văn A',
      title: 'Vị trí ứng tuyển',
      email: 'email@example.com',
      phone: '0901 234 567',
      address: 'TP. Hồ Chí Minh',
    },
    summary:
      'Mô tả ngắn gọn về bản thân, mục tiêu nghề nghiệp và thế mạnh nổi bật của bạn để gây ấn tượng với nhà tuyển dụng.',
    experience: [
      {
        id: 'e1',
        role: 'Vị trí công việc',
        company: 'Tên công ty',
        start: '2023',
        end: 'Hiện tại',
        description: 'Mô tả công việc, trách nhiệm chính và thành tích đạt được.',
      },
    ],
    education: [{ id: 'ed1', school: 'Tên trường', degree: 'Ngành học', start: '2019', end: '2023' }],
    skills: ['Kỹ năng 1', 'Kỹ năng 2', 'Kỹ năng 3'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  }
}

