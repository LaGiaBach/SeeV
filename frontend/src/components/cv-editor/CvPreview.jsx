import { SECTION_META } from '../../data/mockCvDetails'

// Class Tailwind phải viết literal (không nội suy) để JIT scan nhận diện được.
const THEME_STYLES = {
  brand: { heading: 'text-brand-700 border-brand-600', accent: 'text-brand-600', avatar: 'bg-brand-100 text-brand-700', pill: 'bg-brand-50 text-brand-700' },
  slate: { heading: 'text-slate-700 border-slate-600', accent: 'text-slate-600', avatar: 'bg-slate-100 text-slate-700', pill: 'bg-slate-50 text-slate-700' },
  fuchsia: { heading: 'text-fuchsia-700 border-fuchsia-600', accent: 'text-fuchsia-600', avatar: 'bg-fuchsia-100 text-fuchsia-700', pill: 'bg-fuchsia-50 text-fuchsia-700' },
  emerald: { heading: 'text-emerald-700 border-emerald-600', accent: 'text-emerald-600', avatar: 'bg-emerald-100 text-emerald-700', pill: 'bg-emerald-50 text-emerald-700' },
  gray: { heading: 'text-gray-700 border-gray-600', accent: 'text-gray-600', avatar: 'bg-gray-100 text-gray-700', pill: 'bg-gray-100 text-gray-700' },
  indigo: { heading: 'text-indigo-700 border-indigo-600', accent: 'text-indigo-600', avatar: 'bg-indigo-100 text-indigo-700', pill: 'bg-indigo-50 text-indigo-700' },
  orange: { heading: 'text-orange-700 border-orange-600', accent: 'text-orange-600', avatar: 'bg-orange-100 text-orange-700', pill: 'bg-orange-50 text-orange-700' },
  rose: { heading: 'text-rose-700 border-rose-600', accent: 'text-rose-600', avatar: 'bg-rose-100 text-rose-700', pill: 'bg-rose-50 text-rose-700' },
  sky: { heading: 'text-sky-700 border-sky-600', accent: 'text-sky-600', avatar: 'bg-sky-100 text-sky-700', pill: 'bg-sky-50 text-sky-700' },
  cyan: { heading: 'text-cyan-700 border-cyan-600', accent: 'text-cyan-600', avatar: 'bg-cyan-100 text-cyan-700', pill: 'bg-cyan-50 text-cyan-700' },
  violet: { heading: 'text-violet-700 border-violet-600', accent: 'text-violet-600', avatar: 'bg-violet-100 text-violet-700', pill: 'bg-violet-50 text-violet-700' },
  teal: { heading: 'text-teal-700 border-teal-600', accent: 'text-teal-600', avatar: 'bg-teal-100 text-teal-700', pill: 'bg-teal-50 text-teal-700' },
  amber: { heading: 'text-amber-700 border-amber-600', accent: 'text-amber-600', avatar: 'bg-amber-100 text-amber-700', pill: 'bg-amber-50 text-amber-700' },
}

function SectionHeading({ theme, children }) {
  return (
    <h2 className={`text-sm font-semibold uppercase tracking-wide pb-1 mb-3 border-b-2 ${theme.heading}`}>
      {children}
    </h2>
  )
}

function CvPreview({ cv }) {
  const { personal, summary, experience, education, skills, sectionsOrder } = cv
  const theme = THEME_STYLES[cv.themeColor] || THEME_STYLES.brand

  function renderSection(key) {
    switch (key) {
      case 'summary':
        if (!summary) return null
        return (
          <section key={key} className="mb-6">
            <SectionHeading theme={theme}>{SECTION_META.summary.label}</SectionHeading>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{summary}</p>
          </section>
        )

      case 'experience':
        if (!experience?.length) return null
        return (
          <section key={key} className="mb-6">
            <SectionHeading theme={theme}>{SECTION_META.experience.label}</SectionHeading>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {item.role}
                      {item.company && <span className="font-normal text-gray-600"> · {item.company}</span>}
                    </p>
                    <p className="shrink-0 text-xs text-gray-500">
                      {item.start} — {item.end}
                    </p>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed whitespace-pre-line">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )

      case 'education':
        if (!education?.length) return null
        return (
          <section key={key} className="mb-6">
            <SectionHeading theme={theme}>{SECTION_META.education.label}</SectionHeading>
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {item.degree}
                    {item.school && <span className="font-normal text-gray-600"> · {item.school}</span>}
                  </p>
                  <p className="shrink-0 text-xs text-gray-500">
                    {item.start} — {item.end}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )

      case 'skills':
        if (!skills?.length) return null
        return (
          <section key={key} className="mb-6">
            <SectionHeading theme={theme}>{SECTION_META.skills.label}</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className={`rounded-full px-3 py-1 text-xs font-medium ${theme.pill}`}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div
      id="cv-preview-page"
      className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-lg shadow-black/10 p-10 text-gray-900"
    >
      <header className="mb-8 pb-6 border-b border-gray-200 flex items-center gap-5">
        <div className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center text-2xl font-semibold ${theme.avatar}`}>
          {personal.fullName?.trim()?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{personal.fullName || 'Họ và tên'}</h1>
          <p className={`font-medium truncate ${theme.accent}`}>{personal.title || 'Vị trí ứng tuyển'}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.address && <span>{personal.address}</span>}
          </div>
        </div>
      </header>

      {sectionsOrder.map((key) => renderSection(key))}
    </div>
  )
}

export default CvPreview
