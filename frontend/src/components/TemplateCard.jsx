import { useState } from 'react'

function TemplateCard({ template, onUse }) {
  const [imgError, setImgError] = useState(false)
  const thumbnailUrl = `https://jsonresume.org/img/themes/${template.id}.png`

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-brand-900/5 hover:border-brand-200 dark:hover:border-brand-500/40 transition">
      <div className="relative aspect-3/4 bg-gray-50 dark:bg-gray-900">
        {imgError ? (
          <div className={`absolute inset-0 bg-linear-to-br ${template.accent} flex items-center justify-center`}>
            <span className="text-3xl font-semibold text-white/90">{template.name.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={template.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
          <button
            type="button"
            onClick={() => onUse?.(template)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition"
          >
            Dùng mẫu này
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white leading-snug">{template.name}</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{template.category}</p>
      </div>
    </div>
  )
}

export default TemplateCard
