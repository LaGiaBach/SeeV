import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const menuItems = [
  {
    to: '/dashboard',
    label: 'CV của tôi',
    icon: (
      <path d="M9 17.25v-6h6v6m-9-9V19a2 2 0 002 2h9a2 2 0 002-2V9M3 9l9-6 9 6" />
    ),
  },
  {
    to: '/templates',
    label: 'Mẫu CV',
    icon: (
      <path d="M4 5h16v3H4V5zm0 5h10v9H4v-9zm12 0h4v9h-4v-9z" />
    ),
  },
  {
    to: '/settings',
    label: 'Cài đặt',
    icon: (
      <>
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
  },
]

function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  return (
    <aside
      className={`h-screen shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <img src="/logo.png" alt="See V" className="w-9 h-9 rounded-full object-cover shrink-0" />
        {!collapsed && <span className="font-semibold text-gray-900 dark:text-white truncate">See V</span>}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 shrink-0"
              >
                {item.icon}
              </svg>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
        <ThemeToggle collapsed={collapsed} />

        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? 'Mở rộng menu' : 'Thu nhỏ menu'}
          className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Thu nhỏ menu</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
