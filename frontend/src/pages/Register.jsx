import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: gọi API đăng ký
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg shadow-brand-900/5 border border-brand-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="See V" className="w-16 h-16 rounded-full object-cover" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Đăng ký</h1>
          <p className="mt-1 text-sm text-gray-500">Tạo tài khoản See V mới</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500 hover:text-brand-600"
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 py-2.5 text-white font-medium hover:bg-brand-700 active:bg-brand-800 transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
