import { useTheme } from '../contexts/ThemeContext'

function SunIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  )
}

function ThemeToggle({ variant = 'row', collapsed = false }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Giao diện sáng' : 'Giao diện tối'

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        title={label}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={label}
      className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition ${
        collapsed ? 'justify-center' : ''
      }`}
    >
      {isDark ? <SunIcon className="w-5 h-5 shrink-0" /> : <MoonIcon className="w-5 h-5 shrink-0" />}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  )
}

export default ThemeToggle
