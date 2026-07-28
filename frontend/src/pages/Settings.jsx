import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ThemeToggle'

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
      />
    </label>
  )
}

function Card({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  )
}

// TODO: khi tích hợp API — GET/PUT /api/users/me cho hồ sơ, PUT /api/users/me/password
// cho đổi mật khẩu, DELETE /api/users/me cho xoá tài khoản.
function Settings() {
  const [collapsed, setCollapsed] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '' })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result)
    reader.readAsDataURL(file)
  }

  function handleSaveProfile(e) {
    e.preventDefault()
  }

  function handleChangePassword(e) {
    e.preventDefault()
    setPasswords({ current: '', next: '', confirm: '' })
  }

  function handleDeleteAccount() {
    if (window.confirm('Bạn có chắc muốn xoá tài khoản? Hành động này không thể hoàn tác.')) {
      // TODO: DELETE /api/users/me
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 h-16 flex items-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Cài đặt</h1>
        </header>

        <div className="p-6 max-w-2xl space-y-6">
          <Card title="Hồ sơ" description="Thông tin cá nhân hiển thị trên tài khoản của bạn.">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 rounded-full bg-brand-100 dark:bg-brand-500/15 overflow-hidden flex items-center justify-center text-xl font-semibold text-brand-700 dark:text-brand-400">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Ảnh đại diện" className="w-full h-full object-cover" />
                  ) : (
                    profile.fullName?.trim()?.charAt(0)?.toUpperCase() || '?'
                  )}
                </div>
                <label className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
                  Tải ảnh lên
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              <Field
                label="Họ và tên"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
              <Field
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <Field
                label="Số điện thoại"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />

              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 active:bg-brand-800 transition"
              >
                Lưu thay đổi
              </button>
            </form>
          </Card>

          <Card title="Đổi mật khẩu">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Field
                label="Mật khẩu hiện tại"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
              <Field
                label="Mật khẩu mới"
                type="password"
                value={passwords.next}
                onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
              />
              <Field
                label="Xác nhận mật khẩu mới"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />

              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 active:bg-brand-800 transition"
              >
                Cập nhật mật khẩu
              </button>
            </form>
          </Card>

          <Card title="Giao diện" description="Chuyển đổi giữa chế độ sáng và tối.">
            <ThemeToggle />
          </Card>

          <div className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-white dark:bg-gray-800 p-6">
            <h2 className="text-base font-semibold text-red-600 dark:text-red-400">Vùng nguy hiểm</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Xoá tài khoản sẽ xoá vĩnh viễn toàn bộ CV và dữ liệu liên quan.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="mt-4 rounded-lg border border-red-300 dark:border-red-500/40 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
            >
              Xoá tài khoản
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
