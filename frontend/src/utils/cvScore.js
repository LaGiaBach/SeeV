// Chấm điểm CV theo heuristic dựa trên độ đầy đủ dữ liệu.
// TODO: thay bằng gợi ý AI thật (Claude API) khi có backend — endpoint POST /api/cvs/:id/score.
const CHECKS = [
  { points: 10, test: (cv) => Boolean(cv.personal.avatar), suggestion: 'Thêm ảnh đại diện chuyên nghiệp để CV nổi bật hơn.' },
  { points: 10, test: (cv) => Boolean(cv.personal.fullName?.trim()), suggestion: 'Điền họ và tên đầy đủ.' },
  { points: 10, test: (cv) => Boolean(cv.personal.title?.trim()), suggestion: 'Điền vị trí ứng tuyển rõ ràng.' },
  { points: 10, test: (cv) => Boolean(cv.personal.email?.trim()), suggestion: 'Thêm email liên hệ.' },
  { points: 10, test: (cv) => Boolean(cv.personal.phone?.trim()), suggestion: 'Thêm số điện thoại liên hệ.' },
  { points: 15, test: (cv) => (cv.summary?.trim()?.length || 0) >= 30, suggestion: 'Viết mục tiêu nghề nghiệp dài hơn (ít nhất 30 ký tự) để làm nổi bật thế mạnh.' },
  { points: 15, test: (cv) => cv.experience?.length > 0 && cv.experience.every((e) => e.description?.trim()), suggestion: 'Thêm mô tả chi tiết cho từng kinh nghiệm làm việc.' },
  { points: 10, test: (cv) => cv.education?.length > 0, suggestion: 'Thêm ít nhất một mục học vấn.' },
  { points: 10, test: (cv) => (cv.skills?.length || 0) >= 3, suggestion: 'Thêm ít nhất 3 kỹ năng để tăng độ nổi bật.' },
]

export function computeCvScore(cv) {
  let score = 0
  const suggestions = []

  for (const check of CHECKS) {
    if (check.test(cv)) {
      score += check.points
    } else {
      suggestions.push(check.suggestion)
    }
  }

  let label = 'Yếu'
  if (score >= 90) label = 'Xuất sắc'
  else if (score >= 70) label = 'Tốt'
  else if (score >= 50) label = 'Khá'

  return { score, label, suggestions }
}
