// Tên & phân loại lấy từ JSON Resume Theme Registry (https://registry.jsonresume.org/themes)
// — kho theme CV mã nguồn mở, mỗi theme là 1 npm package (jsonresume-theme-*)
// render trực tiếp từ dữ liệu CV theo chuẩn JSON Resume schema.
// Ảnh thumbnail hotlink từ https://jsonresume.org/img/themes/{id}.png (xem TemplateCard.jsx).
// `color` dùng để tô màu preview trong editor cho khớp với mẫu đã chọn (xem THEME_STYLES trong CvPreview.jsx).
// TODO: khi có API riêng, thay bằng GET /api/templates (hoặc gọi thẳng registry trên
// để lấy danh sách + render preview thật qua schema JSON Resume).
export const cvTemplates = [
  {
    id: 'executive-slate',
    name: 'Executive Slate',
    category: 'Chuyên nghiệp',
    source: 'jsonresume-theme-executive-slate',
    accent: 'from-slate-600 to-slate-800',
    color: 'slate',
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    category: 'Sáng tạo',
    source: 'jsonresume-theme-creative-studio',
    accent: 'from-fuchsia-400 to-pink-600',
    color: 'fuchsia',
  },
  {
    id: 'developer-mono',
    name: 'Developer Mono',
    category: 'Kỹ thuật',
    source: 'jsonresume-theme-developer-mono',
    accent: 'from-emerald-500 to-teal-700',
    color: 'emerald',
  },
  {
    id: 'minimalist-grid',
    name: 'Minimalist Grid',
    category: 'Tối giản',
    source: 'jsonresume-theme-minimalist-grid',
    accent: 'from-gray-400 to-gray-600',
    color: 'gray',
  },
  {
    id: 'academic-cv-lite',
    name: 'Academic CV Lite',
    category: 'Học thuật',
    source: 'jsonresume-theme-academic-cv-lite',
    accent: 'from-indigo-500 to-blue-700',
    color: 'indigo',
  },
  {
    id: 'sales-hunter',
    name: 'Sales Hunter',
    category: 'Kinh doanh',
    source: 'jsonresume-theme-sales-hunter',
    accent: 'from-orange-400 to-red-600',
    color: 'orange',
  },
  {
    id: 'marketing-narrative',
    name: 'Marketing Narrative',
    category: 'Marketing',
    source: 'jsonresume-theme-marketing-narrative',
    accent: 'from-rose-400 to-pink-600',
    color: 'rose',
  },
  {
    id: 'product-manager-canvas',
    name: 'Product Manager Canvas',
    category: 'Quản lý sản phẩm',
    source: 'jsonresume-theme-product-manager-canvas',
    accent: 'from-sky-500 to-cyan-700',
    color: 'sky',
  },
  {
    id: 'nordic-minimal',
    name: 'Nordic Minimal',
    category: 'Tối giản',
    source: 'jsonresume-theme-nordic-minimal',
    accent: 'from-cyan-400 to-sky-600',
    color: 'cyan',
  },
  {
    id: 'two-column-modernist',
    name: 'Two Column Modernist',
    category: 'Hiện đại',
    source: 'jsonresume-theme-two-column-modernist',
    accent: 'from-violet-500 to-purple-700',
    color: 'violet',
  },
  {
    id: 'government-standard',
    name: 'Government Standard',
    category: 'Hành chính',
    source: 'jsonresume-theme-government-standard',
    accent: 'from-teal-600 to-emerald-800',
    color: 'teal',
  },
  {
    id: 'writers-portfolio',
    name: "Writer's Portfolio",
    category: 'Portfolio',
    source: 'jsonresume-theme-writers-portfolio',
    accent: 'from-amber-400 to-orange-600',
    color: 'amber',
  },
]

export const cvTemplateCategories = ['Tất cả', ...new Set(cvTemplates.map((t) => t.category))]
