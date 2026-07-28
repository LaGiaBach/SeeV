// Cấu trúc dữ liệu 1 CV dùng cho trang editor.
// TODO: khi tích hợp API — CV đã lưu thì GET /api/cvs/:id, chọn mẫu thì
// GET /api/templates/:templateId để lấy dữ liệu mẫu tương ứng theme đã chọn.

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

export const mockCvDetails = {
  '1': {
    title: 'CV Frontend Developer',
    personal: {
      avatar: null,
      fullName: 'Trần Minh Khôi',
      title: 'Frontend Developer',
      email: 'khoi.tran@example.com',
      phone: '0912 345 678',
      address: 'Quận 1, TP. Hồ Chí Minh',
    },
    summary:
      'Frontend Developer với 3 năm kinh nghiệm xây dựng ứng dụng web bằng React. Yêu thích tối ưu hiệu năng và trải nghiệm người dùng.',
    experience: [
      {
        id: 'e1',
        role: 'Frontend Developer',
        company: 'Công ty ABC Tech',
        start: '2022',
        end: 'Hiện tại',
        description: 'Phát triển và bảo trì hệ thống dashboard nội bộ bằng React, Tailwind CSS.',
      },
      {
        id: 'e2',
        role: 'Junior Web Developer',
        company: 'Công ty XYZ Solutions',
        start: '2021',
        end: '2022',
        description: 'Xây dựng landing page và tối ưu SEO cho khách hàng.',
      },
    ],
    education: [
      { id: 'ed1', school: 'Đại học Bách Khoa TP.HCM', degree: 'Kỹ thuật phần mềm', start: '2017', end: '2021' },
    ],
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'REST API'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  },
  '2': {
    title: 'CV UI/UX Designer',
    personal: {
      avatar: null,
      fullName: 'Ngô Thị Bảo Trân',
      title: 'UI/UX Designer',
      email: 'tran.ngo@example.com',
      phone: '0987 654 321',
      address: 'Quận 3, TP. Hồ Chí Minh',
    },
    summary:
      'UI/UX Designer đam mê tạo ra trải nghiệm người dùng trực quan, thân thiện, có kinh nghiệm làm việc với Figma và design system.',
    experience: [
      {
        id: 'e1',
        role: 'UI/UX Designer',
        company: 'Studio Sáng Tạo',
        start: '2022',
        end: 'Hiện tại',
        description: 'Thiết kế giao diện ứng dụng di động và web, xây dựng design system.',
      },
    ],
    education: [{ id: 'ed1', school: 'Đại học Kiến trúc TP.HCM', degree: 'Thiết kế đồ họa', start: '2018', end: '2022' }],
    skills: ['Figma', 'Adobe XD', 'Design System', 'Prototyping'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  },
  '3': {
    title: 'CV Business Analyst',
    personal: {
      avatar: null,
      fullName: 'Lê Hoàng Nam',
      title: 'Business Analyst',
      email: 'nam.le@example.com',
      phone: '0909 123 456',
      address: 'Quận Bình Thạnh, TP. Hồ Chí Minh',
    },
    summary: 'Business Analyst có kinh nghiệm phân tích nghiệp vụ, thu thập yêu cầu và làm việc với đội ngũ kỹ thuật.',
    experience: [
      {
        id: 'e1',
        role: 'Business Analyst',
        company: 'Ngân hàng DEF',
        start: '2021',
        end: 'Hiện tại',
        description: 'Phân tích quy trình nghiệp vụ, viết tài liệu đặc tả yêu cầu (BRD, SRS).',
      },
    ],
    education: [{ id: 'ed1', school: 'Đại học Kinh tế TP.HCM', degree: 'Hệ thống thông tin quản lý', start: '2017', end: '2021' }],
    skills: ['Phân tích nghiệp vụ', 'SQL', 'Jira', 'Confluence'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  },
  '4': {
    title: 'CV Thực tập sinh Marketing',
    personal: {
      avatar: null,
      fullName: 'Phạm Thị Thu Hà',
      title: 'Thực tập sinh Marketing',
      email: 'ha.pham@example.com',
      phone: '0977 888 999',
      address: 'Quận Gò Vấp, TP. Hồ Chí Minh',
    },
    summary: 'Sinh viên năm cuối ngành Marketing, năng động, ham học hỏi, mong muốn tích lũy kinh nghiệm thực tế.',
    experience: [
      {
        id: 'e1',
        role: 'Cộng tác viên truyền thông',
        company: 'CLB Truyền thông trường',
        start: '2023',
        end: 'Hiện tại',
        description: 'Lên kế hoạch nội dung fanpage, hỗ trợ tổ chức sự kiện.',
      },
    ],
    education: [{ id: 'ed1', school: 'Đại học Kinh tế Tài chính', degree: 'Marketing', start: '2021', end: '2025' }],
    skills: ['Content Marketing', 'Canva', 'MS Office'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  },
  '5': {
    title: 'CV Kế toán tổng hợp',
    personal: {
      avatar: null,
      fullName: 'Đặng Văn Phúc',
      title: 'Kế toán tổng hợp',
      email: 'phuc.dang@example.com',
      phone: '0933 222 111',
      address: 'Quận Tân Bình, TP. Hồ Chí Minh',
    },
    summary: 'Kế toán tổng hợp với 4 năm kinh nghiệm, thành thạo phần mềm kế toán và quy định thuế hiện hành.',
    experience: [
      {
        id: 'e1',
        role: 'Kế toán tổng hợp',
        company: 'Công ty TNHH Thương mại GHI',
        start: '2020',
        end: 'Hiện tại',
        description: 'Lập báo cáo tài chính, kê khai thuế, đối soát công nợ.',
      },
    ],
    education: [{ id: 'ed1', school: 'Đại học Tài chính - Marketing', degree: 'Kế toán', start: '2016', end: '2020' }],
    skills: ['MISA', 'Excel', 'Thuế', 'Báo cáo tài chính'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  },
  '6': {
    title: 'CV Product Manager',
    personal: {
      avatar: null,
      fullName: 'Vũ Đức Anh',
      title: 'Product Manager',
      email: 'anh.vu@example.com',
      phone: '0966 555 444',
      address: 'Quận 7, TP. Hồ Chí Minh',
    },
    summary: 'Product Manager với kinh nghiệm dẫn dắt đội ngũ phát triển sản phẩm số từ ý tưởng đến ra mắt.',
    experience: [
      {
        id: 'e1',
        role: 'Product Manager',
        company: 'Công ty Công nghệ JKL',
        start: '2021',
        end: 'Hiện tại',
        description: 'Xây dựng roadmap sản phẩm, làm việc với Engineering và Design để triển khai tính năng.',
      },
    ],
    education: [{ id: 'ed1', school: 'Đại học Ngoại thương', degree: 'Quản trị kinh doanh', start: '2016', end: '2020' }],
    skills: ['Product Roadmap', 'Agile/Scrum', 'Data Analysis', 'Figma'],
    sectionsOrder: [...defaultSectionsOrder],
    customSections: [],
    paperSize: 'a4',
  },
}
