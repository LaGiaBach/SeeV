import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { loginUser } from '../lib/api'
import { saveSession } from '../utils/auth'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const data = await loginUser({ username, password })
      saveSession(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 dark:bg-gray-900 px-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle variant="icon" />
      </div>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-brand-900/5 border border-brand-100 dark:border-gray-700 p-8">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="See V" className="w-16 h-16 rounded-full object-cover" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Đăng nhập</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Chào mừng bạn quay lại See V</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="rounded-lg bg-red-50 dark:bg-red-500/10 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 pr-11 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-brand-600 focus:ring-brand-500"
              />
              Ghi nhớ đăng nhập
            </label>
            <Link to="/forgot-password" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-brand-600 py-2.5 text-white font-medium hover:bg-brand-700 active:bg-brand-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
