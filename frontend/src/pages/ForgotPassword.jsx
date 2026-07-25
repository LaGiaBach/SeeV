import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: gọi API quên mật khẩu
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 dark:bg-gray-900 px-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle variant="icon" />
      </div>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-brand-900/5 border border-brand-100 dark:border-gray-700 p-8">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="See V" className="w-16 h-16 rounded-full object-cover" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Quên mật khẩu</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-5">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Nếu email <span className="font-medium text-gray-900 dark:text-white">{email}</span> tồn tại trong hệ thống,
              chúng tôi đã gửi liên kết đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.
            </p>
            <Link
              to="/login"
              className="inline-block w-full rounded-lg bg-brand-600 py-2.5 text-white font-medium hover:bg-brand-700 active:bg-brand-800 transition"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email đã đăng ký"
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 py-2.5 text-white font-medium hover:bg-brand-700 active:bg-brand-800 transition"
            >
              Gửi liên kết đặt lại mật khẩu
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Đã nhớ mật khẩu?{' '}
          <Link to="/login" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
